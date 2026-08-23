# Lesson audio: local personal-voice pipeline (issue #19)

Lesson recordings are **generated locally and never committed**. `static/audio/`
is gitignored; a fresh clone has no audio and the app says so honestly
(`audio.pending`) until you generate it.

## Generate

```sh
# default engine: mlx (personal voice)
npx tsx scripts/generate-audio.mts

# smoke-test without a personal reference (model default voice)
AUDIO_NO_CLONE=1 npx tsx scripts/generate-audio.mts

# dependency-free fallback (macOS say — the old placeholder)
AUDIO_ENGINE=say npx tsx scripts/generate-audio.mts
```

One-time setup for the mlx engine:

```sh
cd scripts/audio && uv venv --python 3.12 .venv && uv pip install --python .venv/bin/python "mlx-audio==0.5.0"
```

## The personal reference (private, outside the repo)

Zero-shot cloning needs one clean recording of the owner's voice:

| Path | Contents |
|---|---|
| `~/.ray-of-light/voice/reference.wav` | 10–30s clean speech, one speaker, no music |
| `~/.ray-of-light/voice/reference.txt` | the exact transcript of that recording |

These files are read at generation time and nothing else: never copied into
the repo, never logged beyond their path, never uploaded. All inference is
local MLX on Apple Silicon. The only network access is the one-time download
of the pinned model checkpoint (`scripts/audio/model.lock.json` — package,
checkpoint id, and revision are exact; `synth.py` downloads that revision and
nothing newer).

## Privacy and scope

- **Consent**: the owner's own voice, authorized by the owner for personal,
  noncommercial use in this project.
- **Output scope**: `personal-experimental`. Generated audio stays untracked
  and must never be committed, distributed, or presented as native speech.
- **Review**: none. Voice similarity does not establish native French or
  Tamil pronunciation — generated audio stays outside the native-review gate
  (`docs/NATIVE-REVIEW.md`) until a reviewer hears it.
- Provenance (engine, model lineage, consent, per-asset sha256, review state)
  is rewritten into `src/lib/content/audio-provenance.json` on every run and
  surfaced in the preview UI.

## Model cache

`synth.py` resolves the Hugging Face cache defensively: `ROL_HF_CACHE` env if
set, else the inherited `HF_HOME`/default **only if a real write probe
succeeds** (on this machine `~/.cache/huggingface` is a symlink to an external
drive that is not always mounted), else `~/.cache/huggingface-local`.

## When to regenerate

Any change to canonical line text (ports, fixes) invalidates that lesson's
recording and offsets — re-run the generator; it rewrites
`audio-offsets.json`, the per-asset hashes, and the provenance in one pass.
