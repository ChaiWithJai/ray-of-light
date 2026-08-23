"""Local-only sentence synthesis for issue #19.

Zero-shot personal-voice cloning via mlx-audio on Apple Silicon. One sentence
in, one WAV out. The orchestrator (scripts/generate-audio.mts, AUDIO_ENGINE=mlx)
calls this per line and handles concat/offsets/encoding exactly as it does for
the `say` engine.

Privacy contract (issue #19):
- Reference recordings and transcripts live OUTSIDE the repo at
  ~/.ray-of-light/voice/reference.wav + reference.txt. They are read, never
  copied anywhere, never logged beyond their path, never uploaded.
- All inference is local (MLX). No hosted service is contacted except the
  one-time Hugging Face checkpoint download, which contains no personal data.
- Output scope is personal-experimental: cloned-voice audio is generated into
  an untracked static/audio/ and must never be committed or distributed.

Usage:
  uv run synth.py --text "..." --lang fr --out /tmp/line.wav
  uv run synth.py --text "..." --lang ta --out /tmp/line.wav --no-clone

--no-clone uses the model's default voice (pipeline smoke test only).
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

# Deterministic model cache, resolved BEFORE huggingface_hub is imported so a
# shell profile pointing HF_HOME at a flaky external drive cannot break
# generation. Honor ROL_HF_CACHE explicitly; otherwise use the inherited
# HF_HOME only if a REAL write probe succeeds (a mount that exists but flaps
# passes os.access and then dies mid-download); else fall back local.


def _writable(root: str) -> bool:
    try:
        probe_dir = Path(root) / "hub"
        probe_dir.mkdir(parents=True, exist_ok=True)
        probe = probe_dir / ".rol-write-probe"
        probe.write_text("ok")
        probe.unlink()
        return True
    except OSError:
        return False


_cache = os.environ.get("ROL_HF_CACHE")
if _cache is None:
    # Candidates in order. Note ~/.cache/huggingface is commonly a symlink to
    # an external drive on this machine — the write probe follows it, so an
    # unmounted drive falls through to ~/.cache/huggingface-local.
    candidates = [
        os.environ.get("HF_HOME"),
        str(Path.home() / ".cache" / "huggingface"),
        str(Path.home() / ".cache" / "huggingface-local"),
    ]
    _cache = next((c for c in candidates if c and _writable(c)), candidates[-1])
os.environ["HF_HOME"] = _cache
os.environ["HF_HUB_CACHE"] = str(Path(_cache) / "hub")
os.environ["HF_XET_CACHE"] = str(Path(_cache) / "xet")

LOCK = json.loads((Path(__file__).parent / "model.lock.json").read_text())
VOICE_DIR = Path.home() / ".ray-of-light" / "voice"
REF_WAV = VOICE_DIR / "reference.wav"
REF_TXT = VOICE_DIR / "reference.txt"

LANG_TAGS = {"fr": "fr", "ta": "ta"}


def die(msg: str) -> None:
    print(f"synth.py: {msg}", file=sys.stderr)
    sys.exit(1)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--text", required=True)
    ap.add_argument("--lang", required=True, choices=sorted(LANG_TAGS))
    ap.add_argument("--out", required=True)
    ap.add_argument(
        "--no-clone",
        action="store_true",
        help="use the model's default voice instead of the personal reference (smoke test)",
    )
    args = ap.parse_args()

    ref_audio = None
    ref_text = None
    if not args.no_clone:
        if not REF_WAV.exists() or not REF_TXT.exists():
            die(
                "personal reference not found.\n"
                f"  Put a clean 10-30s recording at {REF_WAV}\n"
                f"  and its exact transcript at    {REF_TXT}\n"
                "  (they stay outside the repo and are never uploaded), or pass --no-clone."
            )
        ref_audio = str(REF_WAV)
        ref_text = REF_TXT.read_text().strip()

    # Materialize exactly the pinned checkpoint revision, then run fully local
    # MLX inference against the local path — the pin is enforced, not advisory.
    from huggingface_hub import snapshot_download

    model_dir = snapshot_download(LOCK["model"], revision=LOCK["revision"])

    from mlx_audio.tts.generate import generate_audio  # local MLX inference

    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    generate_audio(
        text=args.text,
        model=model_dir,
        ref_audio=ref_audio,
        ref_text=ref_text,
        lang_code=LANG_TAGS[args.lang],
        file_prefix=str(out.with_suffix("")),
        audio_format="wav",
        join_audio=True,
        verbose=False,
    )
    if not out.exists():
        # mlx-audio may suffix an index; normalize to the asked-for path.
        candidates = sorted(out.parent.glob(out.stem + "*.wav"))
        if not candidates:
            die("model produced no audio")
        candidates[0].rename(out)


if __name__ == "__main__":
    main()
