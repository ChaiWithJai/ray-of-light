import json, os

BASE = os.path.dirname(os.path.abspath(__file__))
SHOTS = os.path.join(BASE, "shots")

META = {
    "01-language": ("onboarding", "Language choice — identity cards"),
    "02-assessment": ("onboarding", "Entry assessment (untouched)"),
    "03-plan": ("onboarding", "Daily plan — default start"),
    "04-today-fresh": ("today", "Today, first ever visit"),
    "05-preview": ("lesson", "Audio-first preview (the dark stage)"),
    "06-spread": ("lesson", "Parallel spread — both columns"),
    "07-spread-covered": ("lesson", "Spread with EN covered"),
    "08-comprehension": ("lesson", "Comprehension check"),
    "09-shadow": ("lesson", "Echo/shadow practice"),
    "10-translate": ("lesson", "Translation exercise, pre-attempt"),
    "11-translate-revealed": ("lesson", "Translation after check (reveal)"),
    "12-completion": ("lesson", "Completion exercise"),
    "13-transfer": ("lesson", "Transfer challenge, pre-attempt"),
    "14-transfer-checked": ("lesson", "Transfer graded against criteria"),
    "15-closure": ("lesson", "Lesson closure / calibration"),
    "16-today-complete": ("today", "Today after finishing the session"),
    "17-today-recall-paired": ("recall", "Day 4 — new lesson + recall paired"),
    "18-recall": ("recall", "Active recall — English cue, target covered"),
    "19-recall-attempted": ("recall", "Recall with an attempt typed"),
    "20-compare-miss": ("recall", "Comparison after a WRONG attempt"),
    "21-compare-revealed": ("recall", "Canonical line revealed after attempt"),
    "22-today-resurface": ("resurface", "Today with a due 'Worth another look' card"),
    "23-progress": ("destinations", "Progress map — capability states"),
    "24-book": ("destinations", "Book — course listing"),
    "25-phrases": ("destinations", "Phrase library"),
    "26-settings": ("destinations", "Settings"),
    "27-assessment-answered": ("placement", "Assessment with heard+spoke chosen"),
    "28-plan-placed": ("placement", "Plan showing placement at lesson 3"),
    "29-today-placed": ("placement", "Today starting at the placed lesson"),
    "30-ta-today": ("tamil", "Tamil Today"),
    "31-ta-spread": ("tamil", "Tamil spread — script + transliteration + gloss"),
    "32-ta-notes": ("tamil", "Tamil notes drawer open"),
}

files = os.listdir(SHOTS)
samples = []
for i, (slug, (flow, desc)) in enumerate(sorted(META.items())):
    desktop = f"{slug}.desktop.png"
    mobile = f"{slug}.mobile.png"
    if desktop not in files and mobile not in files:
        continue
    samples.append({
        "id": slug,
        "order": i,
        "flow": flow,
        "title": desc,
        "desktop": f"shots/{desktop}" if desktop in files else None,
        "mobile": f"shots/{mobile}" if mobile in files else None,
    })

with open(os.path.join(BASE, "samples.json"), "w") as f:
    json.dump(samples, f, indent=1)
print(f"{len(samples)} samples")
