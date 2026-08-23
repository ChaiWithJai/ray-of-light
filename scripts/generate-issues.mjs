#!/usr/bin/env node
/**
 * Generates `issues/` from the product model in `docs/architecture-map.md`.
 *
 * Issues are kept as tracked markdown because this repo has no git remote yet.
 * Once it has one, `scripts/file-issues.sh` pushes them to GitHub verbatim.
 *
 * Run: node scripts/generate-issues.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'issues');

/* ------------------------------------------------------------------ */
/* Foundation                                                          */
/* ------------------------------------------------------------------ */

const foundation = [
	{
		id: 'F-01',
		slug: 'spread-state-machine',
		title: 'Build the spread as one component with nine states',
		labels: ['foundation', 'spread', 'architecture'],
		direction: 'D1, D2',
		body: `The design canvas draws 1d, 1e, 1f, 1i and 1m as separate artboards. They are
one bilingual spread in five of its states. Building them as five screens would
destroy the stable spatial model the whole method depends on.

Implement \`<Spread state={...} />\` covering all nine states:

| State | Target | Source | Audio | Required response |
| --- | --- | --- | --- | --- |
| \`sound-exposure\` | covered | covered | playing | listen |
| \`meaning-orientation\` | covered | visible | playing | follow meaning |
| \`parallel-reading\` | visible | visible | playing | track both lines |
| \`target-reading\` | visible | covered | optional | read aloud |
| \`shadowing\` | visible | covered | segmented | repeat immediately |
| \`comprehension\` | visible | covered | optional | recover meaning |
| \`active-retrieval\` | covered | visible | off initially | produce target |
| \`comparison\` | learner + canonical | visible | available | diagnose difference |
| \`transfer\` | new prompt | situational | optional | construct new sentence |

\`meaning-orientation\` and \`target-reading\` have no artboard in the design — they
fall out of the state table and must be built anyway.`,
		ac: [
			'A single mounted `Spread` transitions between all nine states without a route change',
			'Line boxes do not reflow when support is added or removed in any transition',
			'Line numbers stay shared and horizontally aligned across both columns in every state',
			'The current pair carries exactly one restrained highlight',
			'`meaning-orientation` and `target-reading` are implemented despite having no artboard'
		],
		deps: []
	},
	{
		id: 'F-02',
		slug: 'construction-state-and-evidence-log',
		title: 'Model construction state as derived evidence, not completion flags',
		labels: ['foundation', 'data-model', 'architecture'],
		direction: 'D3',
		body: `There is no "completed" flag anywhere in this product. Each *construction*
(\`je voudrais + noun\`, \`quantité + de\`) carries one of five states, and each
transition requires specific evidence.

| State | Definition | Evidence required |
| --- | --- | --- |
| \`exposed\` | Encountered in meaningful audio/text | Completed parallel reading |
| \`recognized\` | Understood when heard or read | Correct comprehension response |
| \`recalled\` | Produced from an L1 or situational cue | Successful delayed retrieval |
| \`stabilized\` | Recalled across spaced sessions | Repeated retrieval on ≥2 distinct days |
| \`transferable\` | Adapted to a new context | Novel, valid production |

The write model is an append-only evidence log. Construction state is *derived*,
never stored as a mutable field. This is what lets a lesson be finished while its
constructions remain unretrievable.`,
		ac: [
			'Evidence events are append-only and carry construction id, kind, outcome, and timestamp',
			'Construction state is a pure derivation over the evidence log',
			'`stabilized` requires retrievals on at least two distinct calendar days',
			'No API, store or schema anywhere exposes a lesson-level completion boolean',
			'Replaying the evidence log reproduces identical state'
		],
		deps: []
	},
	{
		id: 'F-03',
		slug: 'reading-anchor-input-abstraction',
		title: 'ReadingAnchor: joint attention with an accessible equivalent',
		labels: ['foundation', 'spread', 'accessibility'],
		direction: 'D5',
		body: `Two-finger tracking recreates joint attention across form and meaning. The
*effect* is required; the gesture is not. Multitouch must never be required to
progress.

One abstraction — \`ReadingAnchor\`, which reports the current pair — with three
interchangeable drivers:

1. **Two-touch** — one anchor per column, both move together, lifting one does not advance.
2. **Single cross-column guide** — the accessible default, already exposed in 1v as \`Two-finger tracking → single-guide\`.
3. **Keyboard** — ↑/↓ moves exactly one aligned pair.

On desktop, hovering either sentence highlights both.`,
		ac: [
			'All three drivers produce identical current-pair state',
			'Dragging either anchor moves both; lifting one anchor does not advance the lesson',
			'Audio follows the current pair regardless of which driver is active',
			'The lesson is fully completable with keyboard only',
			'The 1v setting switches drivers at runtime without losing position'
		],
		deps: ['F-01']
	},
	{
		id: 'F-04',
		slug: 'line-model-representation-layers',
		title: 'One line model with layered representations',
		labels: ['foundation', 'data-model', 'i18n'],
		direction: 'D7',
		body: `French needs target text and natural English. Tamil additionally needs script,
transliteration, literal English, and occasionally formal register. The renderer
must not branch on language.

A line carries an ordered list of representation layers; the active language
profile decides which render and in which order:

| Layer | French | Tamil |
| --- | --- | --- |
| \`target\` | ✓ | ✓ (spoken) |
| \`script\` | — | ✓ |
| \`transliteration\` | — | ✓ (temporary) |
| \`literal_source\` | optional | ✓ |
| \`natural_source\` | ✓ | ✓ |
| \`formal\` | — | only when meaningfully different |

Transliteration is a scaffold with a planned removal point (~L30), so its
visibility is part of the learner's progression, not a permanent preference.`,
		ac: [
			'`Fr`/`En` generalise into a `RepresentationStack` driven by the language profile',
			'No component branches on language code to decide what to render',
			'A Tamil line renders script + transliteration + literal + natural without bespoke components',
			'Transliteration visibility is progression-derived and can be nudged off around L30',
			'Adding a third language requires no renderer changes'
		],
		deps: []
	},
	{
		id: 'F-05',
		slug: 'navigation-shell',
		title: 'Navigation shell: exactly four destinations',
		labels: ['foundation', 'navigation'],
		direction: 'D6',
		body: `Today · Book · Phrases · Progress. Everything else lives inside a lesson or
under settings.

Vocabulary, grammar, pronunciation, exercises and AI chat explicitly do **not**
get top-level destinations — that fragments one coherent learning process into
product features.

The nav is a closed set. Adding a fifth destination re-opens this decision.`,
		ac: [
			'Exactly four destinations exist in the nav',
			'Lesson surfaces render without the tab bar (they are inside a session)',
			'Settings is reachable from Today, not from the tab bar',
			'A route that would need a fifth destination fails review instead of adding one'
		],
		deps: []
	},
	{
		id: 'F-06',
		slug: 'replace-shadcn-registry-dependency',
		title: 'Replace the shadcn-svelte registry dependency with Bits UI',
		labels: ['foundation', 'design-system', 'decision'],
		direction: '—',
		body: `\`shadcn-svelte.com\` is blocked by this environment's egress policy, so
\`shadcn-svelte init\`/\`add\` cannot run here. The components currently in
\`app/src/lib/components/ui/\` were vendored from the \`huntabyte/shadcn-svelte\`
GitHub repo at v1.5.0 — the same source the CLI copies from — so the app builds
and works. But the design system depends on a host we cannot reach.

**Alternatives evaluated (all verified installable from npm in this environment):**

| Package | Version | Kind | Fit |
| --- | --- | --- | --- |
| \`bits-ui\` | 2.19.0 | Headless primitives | **Recommended** |
| \`melt\` | 0.44.0 | Headless builders (Svelte 5 rewrite) | Strong, different idiom |
| \`@ark-ui/svelte\` | 5.24.0 | Headless, Zag-based state machines | Strong, heavier |
| \`@skeletonlabs/skeleton\` | 5.0.1 | Styled Tailwind system | Fights the sketch skin |
| \`flowbite-svelte\` | 1.33.1 | Styled components | Fights the sketch skin |
| \`daisyui\` | 5.7.21 | Pure-CSS Tailwind plugin | Good for skin, no behaviour |

**Recommendation: Bits UI directly, dropping the vendored shadcn layer.**

shadcn-svelte *is* bits-ui plus \`tailwind-variants\` plus copied source, by the
same maintainer. We already depend on bits-ui. Removing the middle layer removes
the registry dependency with zero visual change.

The migration is small because most vendored components are not bits-ui-backed:

| Vendored component | Uses bits-ui? | Migration |
| --- | --- | --- |
| \`slider\` | yes | Wrap \`bits-ui\` Slider directly in \`SketchSlider\` |
| \`tabs\` | yes | Wrap \`bits-ui\` Tabs directly in \`TabBar\` |
| \`progress\` | yes | Wrap \`bits-ui\` Progress directly in \`Rail\` |
| \`button\` | no | Plain \`<button>\` — fold into \`SketchButton\` |
| \`card\` | no | Plain \`<div>\` — fold into \`SketchCard\` |
| \`badge\` | no | Plain \`<span>\` — fold into \`Chip\`/\`Pill\` |
| \`input\`, \`textarea\` | no | Plain elements — fold into \`AnswerField\`/\`SearchField\` |

Deleting \`ui/\` also lets \`style-vega.css\` (1361 lines, of which we use a handful
of rules) go, and removes the base-layer/utilities-layer override dance in
\`app.css\` entirely — the sketch skin becomes the only skin.`,
		ac: [
			'`app/src/lib/components/ui/` and `src/lib/styles/style-vega.css` are removed',
			'`shadcn-svelte` and `components.json` are removed from the project',
			'`SketchSlider`, `TabBar` and `Rail` wrap bits-ui primitives directly',
			'The remaining wireframe components use plain elements plus tailwind-variants',
			'All 22 routes render byte-identically to before the migration (visual diff)',
			'`npm run check` and `npm run build` stay clean'
		],
		deps: []
	},
	{
		id: 'F-07',
		slug: 'audio-belongs-to-the-line',
		title: 'Audio binds to the target line, not to the screen',
		labels: ['foundation', 'audio', 'spread'],
		direction: 'D4',
		body: `Audio is attached to the target-language line. Tapping the French line replays
French. This is what makes sound ↔ form ↔ meaning a three-way mapping rather than
a sequence of steps, and it is why there is no global player chrome.

The transport in 1e (⏮ ▶ ⏭) operates on "current line", and the current line is
spread state — so transport and reading anchor are the same cursor.`,
		ac: [
			'Audio handles hang off the line model, not off screen-level state',
			'Tapping a target line replays that line',
			'Transport prev/next moves the reading anchor, and vice versa',
			'Segmented (chunk) playback for shadowing addresses the same line model',
			'No global/persistent player chrome exists anywhere'
		],
		deps: ['F-01', 'F-03']
	}
];

/* ------------------------------------------------------------------ */
/* Screens                                                             */
/* ------------------------------------------------------------------ */

const screens = [
	{
		n: 1, cid: '1a', slug: 'entry-assessment', title: 'Entry assessment',
		group: 'Onboarding & scheduling',
		sees: 'Short listening, reading and speaking samples',
		action: 'Respond naturally',
		fn: 'Establish starting difficulty',
		ability: 'Auditory processing, verbal knowledge, retrieval',
		spread: '—',
		components: ['PlayButton', 'Waveform', 'SketchButton', 'Chip', 'MicButton', 'ProductionCapture (new)'],
		data: ['Calibration item bank spanning A0–B1', 'Response capture (selection + speech)', 'Entry-lesson placement output'],
		ac: [
			'All three modalities (listen, read, speak) are sampled before placement',
			'No item is scored visibly to the learner — "no wrong answers" is literal',
			'Placement writes a starting lesson, not a level badge',
			'Speech sample is capturable and skippable without blocking placement'
		],
		deps: ['F-02']
	},
	{
		n: 2, cid: '1b', slug: 'learning-plan', title: 'Learning plan',
		group: 'Onboarding & scheduling',
		sees: 'Daily duration, target and projected lesson path',
		action: 'Choose commitment',
		fn: 'Goal-setting and expectation calibration',
		ability: 'Metacognition',
		spread: '—',
		components: ['Chip', 'Rail', 'SketchCard', 'SketchButton'],
		data: ['Duration → pacing model', 'Projected path derived from pacing + wave schedule', 'Goal tag (Travel/Family/Work/Reading)'],
		ac: [
			'The projected path shows the passive wave and the active wave as distinct phases',
			'The Day-50 active-wave milestone is stated explicitly, not implied',
			'Review days (every 7th lesson) are shown as built in, not extra',
			'Commitment sets scheduler pacing — it is not cosmetic',
			'No streak, badge or gamified reward appears'
		],
		deps: ['D-10']
	},
	{
		n: 3, cid: '1c', slug: 'today', title: 'Today',
		group: 'Onboarding & scheduling',
		sees: 'One new lesson and, after Day 49, one recall lesson',
		action: 'Begin session',
		fn: 'Reduce choice and maintain spacing',
		ability: 'Executive control',
		spread: '—',
		components: ['SketchCard', 'Pill', 'SketchButton', 'TabBar', 'ScheduleCard (new)'],
		data: ['Scheduler output: today\'s new lesson + due recall', 'Estimated duration per item'],
		ac: [
			'At most two items are ever offered',
			'The recall item only appears once the active wave has begun',
			'There is no lesson browser or "choose a lesson" affordance on this surface',
			'Copy reinforces the constraint ("Nothing else to choose. That\'s the point.")'
		],
		deps: ['D-10', 'F-05']
	},
	{
		n: 4, cid: '1d', slug: 'audio-preview', title: 'Audio preview',
		group: 'The lesson core',
		sees: 'Minimal player; no text initially',
		action: 'Listen without reading',
		fn: 'Unbiased sound perception',
		ability: 'Auditory processing',
		spread: 'sound-exposure',
		components: ['Spread (new, state=sound-exposure)', 'PlayButton', 'LineAudio (new)'],
		data: ['Full-lesson audio, normal speed', 'Listen-count state'],
		ac: [
			'No target text or translation is reachable in this state',
			'Listen count is tracked and gates the advance affordance',
			'This is a state of `Spread`, not a standalone route',
			'Advancing moves to `meaning-orientation` or `parallel-reading`, never straight to an exercise'
		],
		deps: ['F-01', 'F-07']
	},
	{
		n: 5, cid: '1e', slug: 'parallel-spread', title: 'Parallel spread',
		group: 'The lesson core',
		sees: 'French and English in aligned columns',
		action: 'Track corresponding lines',
		fn: 'Bind sound, form and meaning',
		ability: 'Verbal knowledge, working memory',
		spread: 'parallel-reading',
		components: ['Spread (new)', 'PairRow', 'RepresentationStack (new)', 'LineAudio (new)', 'ReadingAnchor (new)', 'NotesAnchor (new)'],
		data: ['Aligned line pairs with shared numbers', 'Per-line audio offsets', 'Word-anchored notes'],
		ac: [
			'Pairs stay horizontally aligned and share a sentence number',
			'Both columns scroll together — never independently',
			'Exactly one restrained highlight marks the current pair',
			'Tapping the target line replays its audio',
			'Either column can be covered without any layout change',
			'This state is the default entry point to the lesson core'
		],
		deps: ['F-01', 'F-03', 'F-04', 'F-07']
	},
	{
		n: 6, cid: '1f', slug: 'finger-tracking', title: 'Finger-tracking layer',
		group: 'The lesson core',
		sees: 'Two linked touchpoints or cursors',
		action: 'Move down both texts',
		fn: 'Joint attention across representations',
		ability: 'Attention, processing speed',
		spread: 'parallel-reading (input layer)',
		components: ['ReadingAnchor (new)', 'TrackPoint', 'PairRow'],
		data: ['Current-pair index', 'Anchor positions'],
		ac: [
			'Dragging either anchor moves both',
			'Lifting one anchor does not advance the lesson',
			'Audio follows the pair as the anchors move',
			'Desktop hover on either column highlights both',
			'↑/↓ moves exactly one aligned pair',
			'Single-guide mode is functionally equivalent and is the accessible default'
		],
		deps: ['F-03']
	},
	{
		n: 7, cid: '1g', slug: 'pronunciation', title: 'Pronunciation layer',
		group: 'The lesson core',
		sees: 'Active line, replay and waveform — not scoring-heavy',
		action: 'Listen and imitate',
		fn: 'Phonological encoding',
		ability: 'Auditory processing, speech motor control',
		spread: 'target-reading (overlay)',
		components: ['Waveform', 'MicButton', 'Chip', 'ProductionCapture (new)', 'LineAudio (new)'],
		data: ['Native audio, normal + slow', 'Learner recording', 'Phoneme/rough alignment for waveform display'],
		ac: [
			'Native and learner waveforms are shown for by-ear comparison',
			'No score, percentage, grade or red mark appears anywhere',
			'Normal and slow playback are both available',
			'Learner recordings are retained only as long as the comparison is on screen unless explicitly kept'
		],
		deps: ['D-08', 'D-09', 'F-07']
	},
	{
		n: 8, cid: '1h', slug: 'notes-drawer', title: 'Notes drawer',
		group: 'The lesson core',
		sees: 'Grammar and cultural note attached to a phrase',
		action: 'Inspect when necessary',
		fn: 'Just-in-time explanation',
		ability: 'Crystallized knowledge',
		spread: 'overlay on any state',
		components: ['NotesAnchor (new)', 'SketchCard', 'Muted'],
		data: ['Notes anchored to exact word/construction spans', 'Cultural notes distinct from grammar notes'],
		ac: [
			'Notes are anchored to a specific span, not to the lesson',
			'The drawer opens only on demand — never automatically',
			'The spread stays visible (dimmed) behind the drawer',
			'There is no grammar-chapter surface anywhere in the product',
			'Cultural notes are visually distinguishable from grammar notes'
		],
		deps: ['F-01', 'D-01']
	},
	{
		n: 9, cid: '1i', slug: 'comprehension-check', title: 'Comprehension check',
		group: 'Checks & exercises (passive wave)',
		sees: 'French visible; English covered',
		action: 'Explain or select meaning',
		fn: 'Remove translation dependency',
		ability: 'Comprehension, retrieval',
		spread: 'comprehension',
		components: ['Spread (new, state=comprehension)', 'CoveredCell', 'SketchButton', 'EvidenceRecorder (new)'],
		data: ['Distractor set per line', 'Peek/hint events'],
		ac: [
			'Layout is identical to `parallel-reading` with the source column covered',
			'Tap-and-hold peeks a covered line and records a hint event',
			'A correct response emits `recognized` evidence for the line\'s constructions',
			'A peeked line cannot produce `recognized` evidence on that attempt'
		],
		deps: ['F-01', 'F-02']
	},
	{
		n: 10, cid: '1j', slug: 'echo-practice', title: 'Echo practice',
		group: 'Checks & exercises (passive wave)',
		sees: 'French visible with segmented audio',
		action: 'Shadow the speaker',
		fn: 'Develop pronunciation and phrase chunking',
		ability: 'Auditory memory',
		spread: 'shadowing',
		components: ['Spread (new, state=shadowing)', 'Chip', 'Waveform', 'MicButton', 'LineAudio (new)'],
		data: ['Chunk boundaries per line', 'Chunk-level audio segments'],
		ac: [
			'Audio is segmented into chunks, not played word by word',
			'The current chunk is visually marked while playing',
			'Replay-chunk and whole-line controls both operate on the current line',
			'Learner repeats immediately after each chunk, on the speaker\'s heels'
		],
		deps: ['D-08', 'F-07']
	},
	{
		n: 11, cid: '1k', slug: 'translation-exercise', title: 'Translation exercise (target → source)',
		group: 'Checks & exercises (passive wave)',
		sees: 'French prompt with English response',
		action: 'Translate into English',
		fn: 'Confirm precise comprehension',
		ability: 'Verbal comprehension',
		spread: '—',
		components: ['SketchCard', 'AnswerField', 'SketchButton', 'MicButton', 'EvidenceRecorder (new)'],
		data: ['Accepted answer variants (2–5, human-reviewed)', 'Literal gloss per line'],
		ac: [
			'Typed and dictated responses are both accepted',
			'Feedback shows the literal gloss alongside the natural translation',
			'Accepted variants come from the reviewed variant set, not fuzzy matching alone',
			'A correct response emits `recognized` evidence'
		],
		deps: ['F-02', 'D-01']
	},
	{
		n: 12, cid: '1l', slug: 'completion-exercise', title: 'Completion exercise',
		group: 'Checks & exercises (passive wave)',
		sees: 'Sentence with one missing French element',
		action: 'Supply missing language',
		fn: 'Cue-supported retrieval',
		ability: 'Associative retrieval',
		spread: '—',
		components: ['SketchCard', 'Blank', 'Chip', 'SketchButton', 'EvidenceRecorder (new)'],
		data: ['Target construction per lesson', 'Distractor forms'],
		ac: [
			'The missing element is always the lesson\'s target construction — never an arbitrary word',
			'Feedback states the rule, not just correct/incorrect',
			'A correct response emits cue-supported retrieval evidence, weaker than free recall',
			'Distractors are the plausible confusions for that construction'
		],
		deps: ['F-02', 'D-01']
	},
	{
		n: 13, cid: '1m', slug: 'active-wave-spread', title: 'Active-wave spread',
		group: 'Active wave (Day 50+)',
		sees: 'Old English dialogue; French covered',
		action: 'Reconstruct French aloud',
		fn: 'Delayed generative retrieval',
		ability: 'Long-term retrieval, working memory',
		spread: 'active-retrieval',
		components: ['Spread (new, state=active-retrieval)', 'CoveredCell', 'MicButton', 'Chip', 'ProductionCapture (new)'],
		data: ['Lesson from ~49 days prior', 'Hint ladder (first word → full reveal)'],
		ac: [
			'Layout mirrors `parallel-reading` exactly, with the target column covered',
			'Production is spoken first; text entry is secondary',
			'Hint and reveal are graded, and each degrades the evidence recorded',
			'Successful unhinted production emits `recalled` evidence',
			'The lesson surfaced is the one due by the two-wave schedule, not a free choice'
		],
		deps: ['F-01', 'F-02', 'D-10']
	},
	{
		n: 14, cid: '1n', slug: 'answer-comparison', title: 'Answer comparison',
		group: 'Active wave (Day 50+)',
		sees: 'Learner production beside canonical French',
		action: 'Notice differences',
		fn: 'Correct the mental model',
		ability: 'Error discrimination',
		spread: 'comparison',
		components: ['DiffView (new)', 'Diff', 'SketchCard', 'SketchButton'],
		data: ['Learner production (text and/or transcript)', 'Canonical line', 'Difference explanation'],
		ac: [
			'The learner sees both forms and is asked to notice the difference before any explanation',
			'The explanation distinguishes spelling-only from audible differences',
			'The learner re-produces the corrected line before moving on',
			'No red X, score or penalty is shown',
			'Difficult lines are queued to resurface at 1 · 3 · 7 days'
		],
		deps: ['D-10', 'D-09']
	},
	{
		n: 15, cid: '1o', slug: 'transfer-challenge', title: 'Transfer challenge',
		group: 'Active wave (Day 50+)',
		sees: 'New situation using an old construction',
		action: 'Create a new sentence',
		fn: 'Generalize beyond memorization',
		ability: 'Fluid reasoning',
		spread: 'transfer',
		components: ['SketchCard', 'Chip', 'AnswerField', 'MicButton', 'EvidenceRecorder (new)'],
		data: ['Situation prompts (3 per lesson)', 'Named construction to reuse', 'Validity checking + reviewed exemplars'],
		ac: [
			'The situation is new; the construction is one the learner already owns',
			'The construction being exercised is named explicitly to the learner',
			'A novel valid production emits `transferable` evidence',
			'Validity is judged on construction use, not exact string match',
			'Prompts can be personalised to the learner\'s own situations'
		],
		deps: ['F-02', 'D-12']
	},
	{
		n: 16, cid: '1p', slug: 'error-repair', title: 'Error repair',
		group: 'Active wave (Day 50+)',
		sees: 'One recurring error in several contexts',
		action: 'Correct and reproduce',
		fn: 'Targeted discrimination and relearning',
		ability: 'Retrieval, verbal knowledge',
		spread: '—',
		components: ['SketchCard', 'Blank', 'Chip', 'Muted'],
		data: ['Error clustering over the evidence log', 'Multiple contexts for one confusion'],
		ac: [
			'Exactly one recurring error is addressed per session',
			'The same confusion is drilled across several different contexts',
			'The frequency of the error is surfaced ("seen 4× this week")',
			'There is no mixed "mistakes review" pile anywhere in the product',
			'The learner says each full sentence aloud after correcting'
		],
		deps: ['F-02']
	},
	{
		n: 17, cid: '1q', slug: 'lesson-closure', title: 'Lesson closure',
		group: 'Closure & consolidation',
		sees: 'Comprehension, production and effort check',
		action: 'Mark readiness',
		fn: 'Metacognitive calibration',
		ability: 'Metacognition',
		spread: '—',
		components: ['SketchSlider', 'Chip', 'SketchCard', 'SketchButton'],
		data: ['Self-rating: comprehension, production, effort', 'Feed into scheduling weights'],
		ac: [
			'Comprehension and production are rated separately',
			'Ratings measurably change when lines resurface',
			'The learner is told the ratings tune scheduling — that is what makes honesty rational',
			'No confetti, celebration, streak or score appears'
		],
		deps: ['D-10']
	},
	{
		n: 18, cid: '1r', slug: 'weekly-synthesis', title: 'Weekly synthesis',
		group: 'Closure & consolidation',
		sees: 'Six lessons condensed into patterns and dialogue',
		action: 'Review and perform',
		fn: 'Interleaving and consolidation',
		ability: 'Crystallized knowledge',
		spread: '—',
		components: ['SketchCard', 'Chip', 'Fr', 'SketchButton', 'SynthesisPerformer (new)'],
		data: ['Constructions met in the last six lessons', 'One new dialogue built only from old pieces'],
		ac: [
			'Fires on every 7th lesson automatically',
			'The dialogue introduces no new material — only recombination',
			'Patterns met are listed as constructions, not vocabulary',
			'The learner performs the dialogue aloud',
			'Copy makes the "nothing new today" contract explicit'
		],
		deps: ['D-10']
	},
	{
		n: 19, cid: '1s', slug: 'progress-map', title: 'Progress map',
		group: 'Book-wide surfaces (persistent nav)',
		sees: 'Lessons moving from exposed → recognized → recalled → stabilized → transferable',
		action: 'Inspect development',
		fn: 'Show capability rather than consumption',
		ability: 'Metacognition',
		spread: '—',
		components: ['StageMeter', 'SketchCard', 'Fr', 'TabBar'],
		data: ['Construction state derived from the evidence log'],
		ac: [
			'Progress is shown per construction, never per lesson',
			'All five states are legible at a glance',
			'No completion percentage, lesson count or streak appears',
			'A finished lesson with unretrievable constructions is visibly incomplete in capability terms',
			'Rendered entirely from derived state — no stored progress field'
		],
		deps: ['F-02', 'F-05']
	},
	{
		n: 20, cid: '1t', slug: 'phrase-library', title: 'Phrase library',
		group: 'Book-wide surfaces (persistent nav)',
		sees: 'Previously learned constructions in context',
		action: 'Search, listen or rehearse',
		fn: 'Support real-world reuse',
		ability: 'Crystallized knowledge',
		spread: '—',
		components: ['SearchField', 'Chip', 'SketchCard', 'PlayButton', 'SketchButton', 'TabBar'],
		data: ['Learned constructions with source lesson', 'Intent-style search index ("how do I ask for…")', 'Per-phrase audio'],
		ac: [
			'Only constructions the learner has actually met are listed',
			'Each entry cites its source lesson and keeps its original context',
			'Search is intent-shaped, not just substring matching',
			'Selected phrases can be rehearsed aloud as a set',
			'This is not a flashcard deck — no SRS cards, no ratings here'
		],
		deps: ['F-02', 'F-05']
	},
	{
		n: 21, cid: '1u', slug: 'conversation-bridge', title: 'Conversation bridge',
		group: 'Book-wide surfaces (persistent nav)',
		sees: 'Scenario constructed from learned material',
		action: 'Speak with AI or person',
		fn: 'Convert lessons into communication',
		ability: 'Retrieval, transfer',
		spread: '—',
		components: ['SketchCard', 'Chip', 'MicButton', 'Fr', 'ProductionCapture (new)'],
		data: ['Vocabulary/construction allowlist from lessons met', 'Scenario definitions', 'Constrained generation with a hard lexical bound'],
		ac: [
			'The partner only uses material from lessons the learner has met',
			'The constraint is stated to the learner and is verifiably enforced, not just prompted',
			'A stuck affordance offers a phrase the learner already owns',
			'Successful exchanges emit transfer evidence',
			'Out-of-bound generation is caught and regenerated, never shown'
		],
		deps: ['F-02', 'D-12']
	},
	{
		n: 22, cid: '1v', slug: 'settings', title: 'Settings / accessibility',
		group: 'Book-wide surfaces (persistent nav)',
		sees: 'Playback speed, text size, transliteration and reminder settings',
		action: 'Adjust environment',
		fn: 'Reduce irrelevant cognitive load',
		ability: 'Access support',
		spread: '—',
		components: ['SketchCard', 'Chip', 'SketchSlider', 'Pill'],
		data: ['Preferences store', 'Transliteration progression state'],
		ac: [
			'Every control reduces load — none teaches',
			'Two-finger tracking can be swapped for a single linked guide',
			'Transliteration is framed as a temporary scaffold with a nudge around L30',
			'Audio speed includes a slow-first-listen option',
			'Text size scales the spread without breaking pair alignment'
		],
		deps: ['F-03', 'F-04']
	}
];

/* ------------------------------------------------------------------ */
/* Data layer                                                          */
/* ------------------------------------------------------------------ */

const data = [
	{
		id: 'D-01', slug: 'canonical-content-schema',
		title: 'Canonical content schema and authoring format',
		labels: ['data', 'schema', 'content'],
		body: `Every teachable line is one record. French and Tamil share the schema; Tamil
populates more representation layers.

\`\`\`json
{
  "lesson": 12,
  "language": "ta",
  "register": "spoken",
  "dialect": "chennai_general",
  "target_script": "எனக்கு ஒரு காபி வேண்டும்.",
  "transliteration": "enakku oru kaapi vendum",
  "literal_english": "To me, one coffee is wanted.",
  "natural_english": "I'd like a coffee.",
  "audio": { "speaker": "ta_f_01", "normal": "...", "slow": "..." },
  "construction": "enakku + noun + vendum",
  "level": "A1",
  "source": "original",
  "review_status": "two_native_reviewers",
  "license": "owned"
}
\`\`\`

\`construction\` is the join key to the evidence log (F-02) and to the progress map.
It is the unit of learning — not the line, and not the lesson.`,
		ac: [
			'Schema is versioned and validated at build time',
			'`construction`, `source`, `license` and `review_status` are required',
			'French records validate without transliteration; Tamil records require it',
			'A line can carry chunk boundaries for shadowing and span anchors for notes',
			'Accepted answer variants (2–5) attach to productive prompts'
		],
		deps: []
	},
	{
		id: 'D-02', slug: 'content-build-pipeline',
		title: 'Content build pipeline: authoring → shipped artifacts',
		labels: ['data', 'pipeline', 'content'],
		body: `Authored content (dialogues, translations, notes, prompts) compiles into
immutable per-lesson bundles that the app prefetches whole.

Stages: **validate** (schema + provenance) → **align** (pair numbering, chunk
boundaries, note spans) → **index** (construction graph, phrase-library index) →
**bundle** (per-lesson JSON + audio manifest) → **sign** (content version).

The construction graph is what lets the scheduler know which constructions a
lesson exercises, and what the progress map renders against.`,
		ac: [
			'A lesson compiles to a single immutable, versioned bundle',
			'Build fails on schema violation or missing provenance',
			'The construction graph is derived at build time, not at runtime',
			'Content versions are addressable so evidence can cite what it was recorded against',
			'Rebuilding identical input produces identical output'
		],
		deps: ['D-01', 'D-11']
	},
	{
		id: 'D-03', slug: 'hydration-strategy',
		title: 'Hydration strategy: load boundaries, prerender vs SSR vs CSR',
		labels: ['data', 'hydration', 'sveltekit'],
		body: `Three classes of surface with different needs:

| Class | Surfaces | Strategy |
| --- | --- | --- |
| Static shell | Settings, Book browse | Prerender |
| Learner-derived | Today, Progress, Phrases | SSR with learner data, hydrate for interaction |
| Session-interactive | The whole lesson core | Shell SSR, lesson bundle prefetched, all state client-side |

The lesson core must not re-fetch mid-session (D9). Once a lesson starts, the
network is not on the critical path.`,
		ac: [
			'Lesson bundles are fetched once at session start and cached',
			'No lesson-core interaction triggers a network request on the critical path',
			'Progress and Today SSR with real derived state, not loading skeletons',
			'Hydration does not reset reading-anchor position',
			'The spread is interactive before audio finishes buffering'
		],
		deps: ['D-02', 'D-06']
	},
	{
		id: 'D-04', slug: 'content-to-view-model',
		title: 'Transformation: content record → spread view model',
		labels: ['data', 'transform'],
		body: `The renderer consumes a view model, not raw content records. The transform
resolves: which representation layers are active for this language profile and
progression (F-04, D7); which support is covered for the current spread state
(F-01); pair alignment and shared numbering; audio offsets per line and per chunk;
note span anchoring.

This is the single place language-specific and progression-specific decisions are
made. Components below it stay dumb.`,
		ac: [
			'One pure function maps (content, language profile, spread state, progression) → view model',
			'No component branches on language code',
			'Support visibility is resolved here, never in a component',
			'Transliteration visibility follows progression rules, not a raw setting',
			'The transform is unit-testable without a DOM'
		],
		deps: ['D-01', 'F-01', 'F-04']
	},
	{
		id: 'D-05', slug: 'api-surface',
		title: 'Networking: API surface',
		labels: ['data', 'networking', 'api'],
		body: `Deliberately small, because most work is local:

| Endpoint | Direction | Notes |
| --- | --- | --- |
| \`GET /content/manifest\` | down | Available lessons + content versions |
| \`GET /content/lesson/:id\` | down | Immutable bundle, long-cacheable |
| \`GET /audio/*\` | down | Immutable, CDN, range requests |
| \`POST /evidence\` | up | Batched append-only events |
| \`GET /learner/state\` | down | Derived state for a fresh device |
| \`POST /production\` | up | Optional speech artifacts |
| \`POST /conversation\` | both | Constrained partner turns (1u) |

Everything downward is immutable and cacheable. Everything upward is append-only
and idempotent by event id.`,
		ac: [
			'Content and audio responses are immutable and long-cacheable',
			'Evidence POSTs are idempotent by client-generated event id',
			'Evidence is batched, never one request per interaction',
			'A fresh device can rebuild full derived state from `/learner/state`',
			'The lesson core functions with every upward endpoint unavailable'
		],
		deps: ['D-02', 'F-02']
	},
	{
		id: 'D-06', slug: 'local-first-cache',
		title: 'Local-first cache and offline lesson prefetch',
		labels: ['data', 'offline', 'networking'],
		body: `A lesson is a bounded, prefetchable unit: text plus normal and slow audio. Both
today's new lesson and today's recall lesson should be resident before the session
starts.

Evidence is written locally first and synced opportunistically. Losing
connectivity mid-lesson must be invisible.`,
		ac: [
			'Today\'s scheduled lessons prefetch on app open',
			'A full lesson including audio completes with the network disabled',
			'Evidence written offline survives a reload and syncs later',
			'Cache eviction never removes a lesson scheduled within the next 7 days',
			'Storage pressure degrades slow audio first, never text'
		],
		deps: ['D-02', 'D-05']
	},
	{
		id: 'D-07', slug: 'evidence-sync-conflict',
		title: 'Evidence sync and conflict resolution',
		labels: ['data', 'sync', 'networking'],
		body: `Because the evidence log is append-only (F-02), sync is a merge of two event
sets rather than a conflict over mutable fields. Ordering is by event timestamp
with a client id tiebreak; derived state is recomputed after merge.

The one real hazard is clock skew affecting \`stabilized\`, which depends on
"distinct calendar days".`,
		ac: [
			'Sync merges event sets without any last-write-wins field overwrite',
			'Duplicate events are idempotent by event id',
			'Derived state is recomputed after every merge',
			'Distinct-day determination is resilient to client clock skew and timezone travel',
			'Two devices used offline on the same day converge correctly'
		],
		deps: ['F-02', 'D-05']
	},
	{
		id: 'D-08', slug: 'audio-pipeline',
		title: 'Audio pipeline: segmentation, speeds, alignment',
		labels: ['data', 'audio', 'pipeline'],
		body: `Every canonical line needs native audio at normal and repetition speed, plus
chunk boundaries for shadowing (1j) and rough phoneme alignment for the
pronunciation waveform (1g).

Slow audio is recorded, not time-stretched — pedagogically the two are not
equivalent.`,
		ac: [
			'Every canonical line has recorded normal and slow audio from the same speaker',
			'Chunk boundaries are phrase-level, never word-level',
			'Line-level offsets let the spread play a single line from a lesson-length file',
			'Alignment data is sufficient to draw a comparison waveform',
			'Audio is addressable per line, per chunk, and per lesson'
		],
		deps: ['D-01', 'D-02']
	},
	{
		id: 'D-09', slug: 'speech-capture-comparison',
		title: 'Speech capture and by-ear comparison (no scoring)',
		labels: ['data', 'audio', 'speech'],
		body: `Capture the learner's production for comparison (1g), reconstruction (1m) and
diagnosis (1n). Recognition may be used to *transcribe* for comparison — never to
*score* pronunciation.

D10 is a hard constraint here: no percentages, no grades, no red marks. The
learner compares by ear.`,
		ac: [
			'Recording works on mobile and desktop with an explicit permission flow',
			'Learner audio is retained only for the current comparison unless kept deliberately',
			'Transcription is used for difference detection, never for a pronunciation score',
			'No numeric pronunciation output exists in any API or UI',
			'Failure to transcribe degrades to by-ear comparison rather than blocking'
		],
		deps: ['D-08']
	},
	{
		id: 'D-10', slug: 'scheduling-engine',
		title: 'Scheduling engine: two waves, spacing, synthesis',
		labels: ['data', 'scheduling', 'core'],
		body: `Drives Today (1c), the active wave (1m), difficult-line resurfacing (1n),
weekly synthesis (1r) and pacing from the plan (1b).

Rules: passive wave from lesson 1; active wave begins ~Day 50, recalling the
lesson from ~49 days prior; every 7th lesson is synthesis; difficult lines
resurface at 1 · 3 · 7 days; self-ratings from 1q tune intervals; daily commitment
from 1b sets pacing.

The two-wave schedule sits *behind* the spread — it decides what appears, never
how it is presented.`,
		ac: [
			'The active wave begins on schedule and pairs each day with its ~49-day-prior lesson',
			'Every 7th lesson resolves to synthesis automatically',
			'Difficult lines resurface at 1 · 3 · 7 days',
			'Self-ratings measurably change subsequent intervals',
			'Today never offers more than one new plus one recall item',
			'Missed days reschedule without punishing the learner or collapsing the wave structure'
		],
		deps: ['F-02']
	},
	{
		id: 'D-11', slug: 'provenance-licensing',
		title: 'Provenance and licensing enforcement at ingest',
		labels: ['data', 'legal', 'pipeline'],
		body: `The sourcing model is: **own the canonical content, supplement with open
corpora, never source the curriculum from Assimil.** Assimil is the interaction
reference only.

| Layer | Use | Constraint |
| --- | --- | --- |
| Canonical dialogues | Curriculum | Original, owned, two native reviewers |
| Native audio | Curriculum | Commissioned for those exact lines |
| Tatoeba | Examples, assessment candidates | Per-record licence varies — import only supported licences |
| Common Voice (fr/ta) | Accent exposure, ASR testing | CC0; not a course |
| Universal Dependencies | Morphology/syntax annotation | Infrastructure, not teaching content |
| OPUS / Samanantar | Pattern research | Per-corpus licences; do not publish raw pairs blindly |
| Wiktionary | Dictionary layer | Editorial review required |
| FSI (public domain) | Structural/pronunciation reference | Dated — modernise, don't present as-is |

AI may draft variations; it may never certify canonical French or Tamil.`,
		ac: [
			'Every record carries `source`, `license`, `review_status`',
			'Content without two native reviewers cannot enter the canonical corpus',
			'Per-record licence checking on Tatoeba import — not blanket assumption',
			'Open-corpus material is structurally prevented from entering the teaching sequence',
			'A licence audit can be produced for any shipped lesson'
		],
		deps: ['D-01', 'D-02']
	},
	{
		id: 'D-12', slug: 'tamil-register-layers',
		title: 'Tamil register, script and transliteration handling',
		labels: ['data', 'i18n', 'content'],
		body: `Tamil requires modelling the gap between formal written Tamil and standard
spoken Tamil. Teaching only literary Tamil produces learners who can decode
writing but sound unnatural in conversation.

Default profile: **contemporary educated spoken Tamil, Chennai-oriented but
broadly intelligible, Tamil script plus temporary transliteration.**

Each line stores spoken form, script, transliteration, literal English, natural
English, and formal Tamil *only when meaningfully different*.`,
		ac: [
			'Register (`spoken`/`formal`) and dialect are explicit fields, never implied',
			'Formal Tamil renders only when it differs meaningfully from the spoken form',
			'Transliteration is a scaffold with a progression-driven removal path (~L30)',
			'Literal and natural English are separate layers, both available',
			'A second native reviewer checks naturalness, not just correctness'
		],
		deps: ['D-01', 'F-04']
	}
];

/* ------------------------------------------------------------------ */
/* Rendering                                                           */
/* ------------------------------------------------------------------ */

const list = (items) => items.map((i) => `- [ ] ${i}`).join('\n');
const refs = (items) => (items.length ? items.join(', ') : '—');

function frontmatter(title, labels) {
	return `---\ntitle: "${title}"\nlabels: [${labels.join(', ')}]\n---\n`;
}

function renderFoundation(f) {
	return `${frontmatter(`[${f.id}] ${f.title}`, f.labels)}
# ${f.id} · ${f.title}

**Direction:** ${f.direction} — see \`docs/architecture-map.md\`

${f.body}

## Acceptance criteria

${list(f.ac)}

## Depends on

${refs(f.deps)}
`;
}

function renderScreen(s) {
	return `${frontmatter(`[S-${String(s.n).padStart(2, '0')}] ${s.title}`, ['screen', 'surface'])}
# S-${String(s.n).padStart(2, '0')} · ${s.title}

Surface ${s.n} of 22 · canvas id \`${s.cid}\` · ${s.group}
Wireframe: \`app/src/lib/components/surfaces/${s.slug}.svelte\` → \`/surfaces/${s.slug}\`

## Matrix row

| | |
| --- | --- |
| **User sees** | ${s.sees} |
| **Primary action** | ${s.action} |
| **Instructional function** | ${s.fn} |
| **Ability exercised** | ${s.ability} |
| **Spread state** | \`${s.spread}\` |

## Components

${s.components.map((c) => `- \`${c}\``).join('\n')}

## Data

${s.data.map((d) => `- ${d}`).join('\n')}

## Acceptance criteria

${list(s.ac)}

## Depends on

${refs(s.deps)}
`;
}

function renderData(d) {
	return `${frontmatter(`[${d.id}] ${d.title}`, d.labels)}
# ${d.id} · ${d.title}

${d.body}

## Acceptance criteria

${list(d.ac)}

## Depends on

${refs(d.deps)}
`;
}

/* ------------------------------------------------------------------ */

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const written = [];

for (const f of foundation) {
	const file = `${f.id}-${f.slug}.md`;
	fs.writeFileSync(path.join(OUT, file), renderFoundation(f));
	written.push({ file, id: f.id, title: f.title, group: 'Foundation' });
}

for (const s of screens) {
	const id = `S-${String(s.n).padStart(2, '0')}`;
	const file = `${id}-${s.slug}.md`;
	fs.writeFileSync(path.join(OUT, file), renderScreen(s));
	written.push({ file, id, title: s.title, group: 'Screens' });
}

for (const d of data) {
	const file = `${d.id}-${d.slug}.md`;
	fs.writeFileSync(path.join(OUT, file), renderData(d));
	written.push({ file, id: d.id, title: d.title, group: 'Data layer' });
}

const groups = ['Foundation', 'Screens', 'Data layer'];
const index = `# Issues

Generated by \`scripts/generate-issues.mjs\` from the product model in
\`docs/architecture-map.md\`. **Edit the generator, not these files.**

This repo has no git remote yet, so issues live here as tracked markdown. Once a
remote exists, \`scripts/file-issues.sh\` pushes every file to GitHub verbatim
(front matter supplies title and labels).

${written.length} issues: ${groups
	.map((g) => `${written.filter((w) => w.group === g).length} ${g.toLowerCase()}`)
	.join(', ')}.

${groups
	.map(
		(g) => `## ${g}\n\n${written
			.filter((w) => w.group === g)
			.map((w) => `- [\`${w.id}\`](${w.file}) — ${w.title}`)
			.join('\n')}`
	)
	.join('\n\n')}
`;

fs.writeFileSync(path.join(OUT, 'README.md'), index);
console.log(`Wrote ${written.length} issues + index to issues/`);
