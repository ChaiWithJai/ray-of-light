/**
 * The method wiki content module (#47).
 *
 * A typed, learner-voiced projection of the methodology that already lives in
 * docs/architecture-map.md, `flow.ts` and the schemas. Three reading modes use
 * it: the glossary popover (quick reference), the stuck panel (unblocking
 * mid-exercise) and the full /wiki pages (deliberate deep dives).
 *
 * The module, not the routes, is the substrate: it ships in the main bundle so
 * popovers and stuck panels work offline mid-lesson with zero fetches, and the
 * Bonsai aside harness (#48) will consume the same `WikiPage[]` as its
 * retrieval corpus. Numbers and enums are interpolated from the schemas, so
 * the wiki cannot state something the code contradicts.
 *
 * Copy register: an instructional designer guiding a learner. Techniques are
 * described as the learner's own moves, never as narration of the interface.
 */
import { z } from 'zod';
import { PASSIVE_FLOW, RECALL_FLOW, type StepId } from '$lib/flow.js';
import type { TechniqueIntroId } from '$lib/intros.js';
import { CONSTRUCTION_STATES, type ConstructionState } from '$lib/schemas/learner.js';
import { POC_WAVE_CONFIG } from '$lib/schemas/schedule.js';

/* -------------------------------------------------------------------------- */
/* Schema                                                                     */
/* -------------------------------------------------------------------------- */

export const WikiSection = z.object({
	heading: z.string().min(1),
	paragraphs: z.array(z.string().min(1)).min(1)
});
export type WikiSection = z.infer<typeof WikiSection>;

export const WikiPage = z.object({
	slug: z.string().min(1),
	section: z.enum(['method', 'capability', 'technique']),
	title: z.string().min(1),
	/** One guiding sentence under the title. */
	lead: z.string().min(1),
	/**
	 * The unblocking answer, front-loaded (job 1: stuck). At most five short
	 * lines; the stuck panel renders exactly these and nothing else.
	 */
	unstuck: z.array(z.string().min(1)).min(1).max(5),
	/** The deep-dive body (job 2), read top to bottom on the full page. */
	sections: z.array(WikiSection).min(1),
	/** Glossary ids this page leans on; rendered as "related terms". */
	terms: z.array(z.string()).default([])
});
export type WikiPage = z.infer<typeof WikiPage>;

/** Popover budget: one sentence that fits a small in-place bubble. */
export const GLOSSARY_ONE_LINER_MAX = 160;

export const GlossaryEntry = z.object({
	id: z.string().min(1),
	term: z.string().min(1),
	oneLiner: z.string().min(1).max(GLOSSARY_ONE_LINER_MAX),
	body: z.array(z.string().min(1)).min(1)
});
export type GlossaryEntry = z.infer<typeof GlossaryEntry>;

/* -------------------------------------------------------------------------- */
/* Numbers from the code, not from memory                                     */
/* -------------------------------------------------------------------------- */

/** "1 · 3 · 7" — rendered wherever the resurface ladder is mentioned. */
export const RESURFACE_LADDER_TEXT = POC_WAVE_CONFIG.resurfaceLadderDays.join(' · ');

const PASSIVE_STEPS = PASSIVE_FLOW.length;
const RECALL_STEPS = RECALL_FLOW.length;
const ACTIVE_WAVE_STARTS = POC_WAVE_CONFIG.activeWaveStartsAtLesson;
const ACTIVE_WAVE_LAG = POC_WAVE_CONFIG.activeWaveLagLessons;
const SYNTHESIS_EVERY = POC_WAVE_CONFIG.synthesisEvery;
const LADDER_ARROW = CONSTRUCTION_STATES.join(' → ');

/* -------------------------------------------------------------------------- */
/* Glossary                                                                   */
/* -------------------------------------------------------------------------- */

const GLOSSARY_SOURCE: GlossaryEntry[] = [
	{
		id: 'construction',
		term: 'construction',
		oneLiner:
			'A reusable phrase pattern, like "je voudrais …", that you refill with new words to say new things.',
		body: [
			'A construction is a phrase pattern you can reuse. "Je voudrais un café" carries the pattern "je voudrais …", and once that pattern is yours you can ask for a table, a ticket or directions with it. Constructions, not isolated words, are what this course tracks.',
			'Every construction you meet climbs the same capability ladder: ' +
				LADDER_ARROW +
				'. The Progress page shows where each one stands, and the capability page of this wiki explains what each state means.'
		]
	},
	{
		id: 'wave',
		term: 'wave',
		oneLiner:
			'One of the two passes through the course: first absorbing lessons, later producing them again from English.',
		body: [
			'The course moves in two waves. In the passive wave you meet each lesson fresh: listen, read, understand, echo. In the active wave the same lesson returns days later and you produce its lines from the English, from memory.',
			'The gap between the waves is deliberate. Retrieving a phrase after a delay is what makes it stick, so the active wave starts at lesson ' +
				ACTIVE_WAVE_STARTS +
				' and always recalls a lesson from ' +
				ACTIVE_WAVE_LAG +
				' lessons back.'
		]
	},
	{
		id: 'spread',
		term: 'spread',
		oneLiner:
			'The two-column reading page: the language you are learning on one side, English on the other, line by line.',
		body: [
			'The spread shows the dialogue as aligned pairs: each line in the language you are learning sits beside its English. You read both together, letting your eyes and ears connect sound, form and meaning in one pass.',
			'The spread stays put through the whole lesson. What changes is how much support is visible on it: covers hide one column or the other as you get stronger, and every line stays exactly where it was.'
		]
	},
	{
		id: 'support',
		term: 'support',
		oneLiner:
			'The help currently visible, like audio, the English column or the script. Learning here means gradually needing less of it.',
		body: [
			'Support is everything propping you up at a given moment: the recording, the English translation, the transliteration, the visible text itself. Each step of a lesson shows a particular amount of it.',
			'The guiding question of the whole method is which support you still need and which can go next. Covering a column, echoing without text and recalling from English alone are all the same move: one piece of support removed, on purpose, when you are ready.'
		]
	},
	{
		id: 'evidence',
		term: 'evidence',
		oneLiner:
			'Something you did that shows capability, like a correct recall. States are earned by evidence, never by finishing pages.',
		body: [
			'Evidence is a record of something you actually did: read a line in parallel, answered a comprehension check, produced a line from English after a delay, used a pattern in a new situation of your own.',
			'Each construction’s state is derived from its evidence. A hint or a peek still counts as useful practice, and it simply grants no new state for that attempt. That is why honest attempts teach the course more than lucky ones.'
		]
	},
	{
		id: 'resurface',
		term: 'resurface',
		oneLiner:
			'A tricky line returning for another attempt after ' +
			RESURFACE_LADDER_TEXT +
			' days, spaced so each retrieval strengthens it.',
		body: [
			'When a line gives you trouble, it comes back: after ' +
				RESURFACE_LADDER_TEXT +
				' days, each return a fresh chance to retrieve it. The spacing grows because each successful retrieval buys the memory more time.',
			'Your closure ratings tune this. Rate a lesson honestly as harder and its lines return sooner; rate it easy and they wait longer. Honesty makes the schedule yours.'
		]
	},
	{
		id: 'synthesis',
		term: 'synthesis',
		oneLiner:
			'The weekly lesson that reassembles patterns from the previous lessons into new combinations, adding nothing new.',
		body: [
			'Every ' +
				SYNTHESIS_EVERY +
				'th lesson is a synthesis: it introduces nothing and instead recombines the patterns of the week into fresh dialogue. Meeting known pieces in new arrangements is where they start behaving like language rather than lesson lines.',
			'Synthesis lessons still open with audio, like every session, and still end with a transfer prompt of your own.'
		]
	},
	{
		id: 'placement',
		term: 'placement',
		oneLiner:
			'Where the three-sample entry check starts your course. It moves your starting lesson and grants nothing else.',
		body: [
			'Placement is the result of the short listening and speaking check at the start. It exists to find the lesson where the course should begin for you, so your first sessions feel workable rather than trivial or overwhelming.',
			'Placement only chooses your starting point. Lessons it skips stay unworked, and their constructions wait for real evidence from you before they climb anywhere.'
		]
	}
];

/* -------------------------------------------------------------------------- */
/* Capability page, generated from the schema                                 */
/* -------------------------------------------------------------------------- */

/**
 * Learner-voiced meaning and evidence for each state. Keyed by
 * `ConstructionState`, so adding a state to the schema fails compilation here
 * until its copy exists; a conformance test also checks the rendered page.
 */
export const CAPABILITY_STATE_COPY: Record<
	ConstructionState,
	{ meaning: string; earns: string }
> = {
	exposed: {
		meaning: 'You have met this pattern inside a lesson, in meaningful audio and text.',
		earns: 'Reading its line on the spread, both columns together, earns this.'
	},
	recognized: {
		meaning: 'You understand the pattern when you hear or read it.',
		earns: 'A correct comprehension answer or a correct completion, with no peek, earns this.'
	},
	recalled: {
		meaning: 'You can produce the pattern yourself, starting from the English.',
		earns: 'Saying the line from its English cue days after meeting it, unaided, earns this.'
	},
	stabilized: {
		meaning: 'The pattern comes back reliably, not just on one good day.',
		earns:
			'Successful retrieval on at least two separate days earns this. No single session can, which is the point of it.'
	},
	transferable: {
		meaning: 'You can bend the pattern to situations the lessons never showed you.',
		earns: 'A new, valid sentence of your own built on the pattern earns this.'
	}
};

const capabilityPage: WikiPage = {
	slug: 'capability',
	section: 'capability',
	title: 'The capability ladder',
	lead:
		'Every phrase pattern you meet climbs five states: ' +
		LADDER_ARROW +
		'. Each state is earned by something you did.',
	unstuck: [
		'Progress here tracks what you can do with each pattern, not which pages you finished.',
		'A pattern climbs when you show something new with it: understand it, produce it, reuse it.',
		'A lesson can be finished while its patterns still sit low on the ladder. That is normal early on.',
		'Hints keep an attempt useful as practice while leaving the state where it was.'
	],
	sections: [
		{
			heading: 'How the ladder works',
			paragraphs: [
				'Each construction you meet carries one of five states, in strictly increasing order of what you have shown with it. The state comes from evidence: concrete things you did in sessions, recorded as you did them.',
				'The ladder climbs one honest attempt at a time. Nothing on it can be bought by rereading, and nothing on it decays into blame; a miss simply tells the course what to bring back for you.'
			]
		},
		...CONSTRUCTION_STATES.map((state) => ({
			heading: state,
			paragraphs: [CAPABILITY_STATE_COPY[state].meaning, CAPABILITY_STATE_COPY[state].earns]
		})),
		{
			heading: 'Why hints cap an attempt',
			paragraphs: [
				'Taking a hint or a peek keeps you moving, and the attempt still counts as practice. It grants no new state because the point of a state is that you earned it unaided; the next clean attempt is always yours to take.'
			]
		}
	],
	terms: ['construction', 'evidence', 'resurface']
};

/* -------------------------------------------------------------------------- */
/* Method page                                                                */
/* -------------------------------------------------------------------------- */

const methodPage: WikiPage = {
	slug: 'method',
	section: 'method',
	title: 'How this course works',
	lead: 'Two waves through the same lessons: absorb first, produce later, with support removed one step at a time.',
	unstuck: [
		'Every session starts with sound before any text. Let your ears go first.',
		'New lessons absorb; recall sessions days later ask you to produce from English.',
		'Support leaves one piece at a time, and only when you are ready for it to go.',
		'Progress is measured by what you can do with each pattern, never by pages finished.'
	],
	sections: [
		{
			heading: 'The two waves',
			paragraphs: [
				'You move through the course twice. The passive wave meets each lesson fresh: listen first, then read the spread in both languages, check understanding, echo the voice, and finish by making one pattern your own. A full new-lesson session runs ' +
					PASSIVE_STEPS +
					' steps.',
				'From lesson ' +
					ACTIVE_WAVE_STARTS +
					' the active wave joins it: each day also returns a lesson from ' +
					ACTIVE_WAVE_LAG +
					' lessons back, and you say its lines from the English, from memory, in a short ' +
					RECALL_STEPS +
					'-step session. The delay is the ingredient; retrieving after days apart is what makes lines stay.'
			]
		},
		{
			heading: 'Why sound comes first',
			paragraphs: [
				'Language reaches you as sound before it is ever spelling. Opening every session with audio, before any text is visible, lets the melody and rhythm settle in first, so that when the written line appears it confirms what your ear already holds.',
				'This is also why lines are replayed by tapping them, and why echoing the voice comes before translating it: ear, mouth, eye, in that order.'
			]
		},
		{
			heading: 'Support that leaves on purpose',
			paragraphs: [
				'Every step shows a deliberate amount of support: the recording, the English column, the visible text. Learning here is the scheduled departure of that support. You cover a column, then produce without the page, then produce days later from English alone.',
				'You control the pace inside each step. Uncover when you need to; the ladder is climbed at your speed, and an honest step back costs nothing.'
			]
		},
		{
			heading: 'Where you end up',
			paragraphs: [
				'Each week closes with a synthesis lesson, every ' +
					SYNTHESIS_EVERY +
					'th, which reassembles the week’s patterns into new dialogue. Across the course, each pattern you meet climbs the capability ladder: ' +
					LADDER_ARROW +
					'. By the end the patterns are not lines you remember from a book; they are moves you make in situations of your own.'
			]
		}
	],
	terms: ['wave', 'support', 'synthesis', 'construction']
};

/* -------------------------------------------------------------------------- */
/* Technique pages                                                            */
/* -------------------------------------------------------------------------- */

const techniquePages: WikiPage[] = [
	{
		slug: 'parallel-reading',
		section: 'technique',
		title: 'Parallel reading',
		lead: 'Reading both languages at once, line by line, while the audio plays.',
		unstuck: [
			'Track the pair of lines together: one finger or your eyes on each column.',
			'Tap any line to hear it again; replay as often as you like.',
			'Read for the shape of the whole line, not word-for-word equations.',
			'If a line stays opaque, listen to it twice more before rereading it.'
		],
		sections: [
			{
				heading: 'What this is',
				paragraphs: [
					'The spread shows each line beside its English. You read them together while the recording plays, holding sound, spelling and meaning in one glance. On a touch screen your fingers can rest on both columns at once; on a keyboard the arrow keys move you one aligned pair at a time.'
				]
			},
			{
				heading: 'Why it works',
				paragraphs: [
					'Meeting sound, form and meaning together builds one three-way connection instead of three separate facts. The English column is there precisely so you never stop to wonder what something means; understanding is handed to you, and your attention is free to absorb how the language says it.'
				]
			}
		],
		terms: ['spread', 'support', 'construction']
	},
	{
		slug: 'cover-ladder',
		section: 'technique',
		title: 'The cover ladder',
		lead: 'Removing one column of support at a time, on purpose, at your own pace.',
		unstuck: [
			'Covers are yours to control. Uncover whenever you need to; there is no penalty.',
			'Hide the English first to check the meaning now lives in the other language.',
			'Hide the other language to try producing each line yourself.',
			'Work line by line. One honest attempt per line beats a fast full pass.'
		],
		sections: [
			{
				heading: 'What this is',
				paragraphs: [
					'The two covers hide one column of the spread at a time. Covering English tests understanding; covering the language you are learning tests production. Each cover is one rung: a little less help than the step before, taken when you choose.'
				]
			},
			{
				heading: 'Why it works',
				paragraphs: [
					'Reading with slightly less support each pass is how a dialogue stops needing the page. The attempt matters more than the outcome: reaching for a line and missing it, then uncovering, marks that line for your memory far better than rereading it ever would.'
				]
			}
		],
		terms: ['support', 'spread', 'evidence']
	},
	{
		slug: 'shadowing',
		section: 'technique',
		title: 'Shadowing',
		lead: 'Echoing the recording phrase by phrase, close behind the voice.',
		unstuck: [
			'Start speaking almost before the voice finishes; stay right on its heels.',
			'Match the melody and rhythm first. Exact sounds sharpen later.',
			'Stay at phrase length. If you fall behind, replay the phrase and rejoin.',
			'Rough is fine. Every pass gets closer.'
		],
		sections: [
			{
				heading: 'What this is',
				paragraphs: [
					'Shadowing means repeating each phrase almost simultaneously with the recording, like an interpreter warming up. You are not reading aloud; you are riding the voice, staying close enough that its timing becomes your timing.'
				]
			},
			{
				heading: 'Why it works',
				paragraphs: [
					'Speaking this close behind a voice trains your mouth and your ear together, so rhythm and melody arrive with the words instead of after them. Pronunciation grows out of imitation under time pressure far faster than out of studying sounds one by one.'
				]
			}
		],
		terms: ['support', 'wave']
	},
	{
		slug: 'recall-wave',
		section: 'technique',
		title: 'Recall: the active wave',
		lead: 'Producing a line from its English cue, days after you first met it.',
		unstuck: [
			'Say or type your attempt before revealing anything, even a rough one.',
			'A miss is useful: it tells the course exactly what to bring back for you.',
			'If you are blank, take the first-sound hint rather than revealing the line.',
			'After comparing, say the corrected line aloud once or twice.'
		],
		sections: [
			{
				heading: 'What this is',
				paragraphs: [
					'A recall session returns a lesson you met days ago and shows you only the English. You produce each line in the language you are learning, from memory, then compare your version with the original and spot the differences yourself.'
				]
			},
			{
				heading: 'Why it works',
				paragraphs: [
					'Retrieving a phrase from memory after a delay is the single strongest way to make it stay. The effort of reaching is the treatment; even an unsuccessful reach strengthens the trace, which is why attempting before revealing matters so much.',
					'Lines that resist you return on the ' +
						RESURFACE_LADDER_TEXT +
						' day ladder, each return spaced further out as the line gets stronger.'
				]
			}
		],
		terms: ['wave', 'resurface', 'evidence']
	},
	{
		slug: 'transfer',
		section: 'technique',
		title: 'Transfer: make it yours',
		lead: 'Bending a pattern you met in the dialogue to a situation the lesson never showed.',
		unstuck: [
			'Start from the pattern shown on the step; it already carries the grammar you need.',
			'Swap in what the new situation asks for, one piece at a time.',
			'Build one sentence. Short and yours beats long and borrowed.',
			'Say it aloud once it stands; speaking seals it.'
		],
		sections: [
			{
				heading: 'What this is',
				paragraphs: [
					'Every lesson ends with a transfer prompt: a fresh situation, and a pattern from the dialogue to meet it with. You reuse the pattern with new words to say something the lesson never said.'
				]
			},
			{
				heading: 'Why it works',
				paragraphs: [
					'Reusing a known pattern in fresh circumstances is what turns a memorised line into language you own. It is also the top of the capability ladder: a pattern you can transfer is one you can take out of the course and into the world.'
				]
			}
		],
		terms: ['construction', 'evidence']
	},
	{
		slug: 'synthesis',
		section: 'technique',
		title: 'Weekly synthesis',
		lead: 'Reassembling the week’s patterns into new dialogue, adding nothing new.',
		unstuck: [
			'Nothing here is new. Every line is built from patterns you have already met.',
			'If a line feels foreign, find which earlier lesson its pattern came from.',
			'Read for recognition first; production comes at the transfer step.'
		],
		sections: [
			{
				heading: 'What this is',
				paragraphs: [
					'Every ' +
						SYNTHESIS_EVERY +
						'th lesson is a synthesis. It introduces no new material; instead it recombines the week’s patterns into fresh conversation, and like every session it opens with audio and ends with a transfer of your own.'
				]
			},
			{
				heading: 'Why it works',
				paragraphs: [
					'Patterns learned inside one dialogue can stay glued to it. Meeting them rearranged, in new company, is what frees them; recognising a known move in an unknown line is a small act of transfer, practised a dozen times per synthesis.'
				]
			}
		],
		terms: ['synthesis', 'construction']
	},
	{
		slug: 'resurfacing',
		section: 'technique',
		title: 'Resurfacing',
		lead: 'Tricky lines returning after ' + RESURFACE_LADDER_TEXT + ' days, tuned by your own ratings.',
		unstuck: [
			'A line coming back is the system working, not a verdict on you.',
			'Treat each return as a fresh recall: attempt first, reveal after.',
			'Rate closure honestly. Harder ratings bring lines back sooner, which is what you want.'
		],
		sections: [
			{
				heading: 'What this is',
				paragraphs: [
					'Lines that resisted you return for another attempt after ' +
						RESURFACE_LADDER_TEXT +
						' days. Each successful retrieval pushes the next return further out; each miss brings it closer. The end-of-lesson ratings you give feed this schedule directly.'
				]
			},
			{
				heading: 'Why it works',
				paragraphs: [
					'Memory is strengthened most by retrieval at the edge of forgetting, and the growing gaps aim each return at that edge. Honesty is what tunes the aim: your ratings change when lines return, so an honest "too hard" buys you exactly the practice you need.'
				]
			}
		],
		terms: ['resurface', 'evidence', 'support']
	}
];

/* -------------------------------------------------------------------------- */
/* Assembled, validated collections                                           */
/* -------------------------------------------------------------------------- */

export const WIKI_PAGES: WikiPage[] = [methodPage, capabilityPage, ...techniquePages].map((p) =>
	WikiPage.parse(p)
);

export const GLOSSARY: GlossaryEntry[] = GLOSSARY_SOURCE.map((e) => GlossaryEntry.parse(e));

export function wikiPage(slug: string): WikiPage | undefined {
	return WIKI_PAGES.find((p) => p.slug === slug);
}

export function glossaryEntry(id: string): GlossaryEntry | undefined {
	return GLOSSARY.find((e) => e.id === id);
}

export const TECHNIQUE_PAGES: WikiPage[] = WIKI_PAGES.filter((p) => p.section === 'technique');

/* -------------------------------------------------------------------------- */
/* Contextual maps                                                            */
/* -------------------------------------------------------------------------- */

/**
 * StepId → wiki page slug: which page unblocks each step (the static map the
 * spec asks for next to `flow.ts`'s STEP_DEFS). Total over StepId, so a new
 * step fails compilation here until it names its page; a conformance test
 * additionally checks each slug resolves.
 */
export const STEP_TECHNIQUE: Record<StepId, string> = {
	preview: 'parallel-reading',
	spread: 'parallel-reading',
	comprehension: 'parallel-reading',
	shadow: 'shadowing',
	translate: 'cover-ladder',
	completion: 'cover-ladder',
	transfer: 'transfer',
	closure: 'resurfacing',
	recall: 'recall-wave',
	compare: 'recall-wave',
	synthesis: 'synthesis'
};

export function techniqueForStep(step: StepId): WikiPage {
	const page = wikiPage(STEP_TECHNIQUE[step]);
	if (!page) throw new Error(`No wiki page for step ${step}`);
	return page;
}

/** TechniqueIntroId → the page its "learn more" opens. */
export const INTRO_PAGE: Record<TechniqueIntroId, string> = {
	assessment: 'method',
	shadowing: 'shadowing',
	'recall-wave': 'recall-wave',
	'cover-ladder': 'cover-ladder',
	transfer: 'transfer'
};
