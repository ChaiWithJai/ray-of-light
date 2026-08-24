/**
 * First-run concept introductions (#36).
 *
 * The method asks for effort before it has earned trust: shadowing, producing
 * from memory, covering a column and transfer all land strangely on a first
 * encounter. Each technique therefore gets a short introduction the first time
 * the learner reaches it: what this is, why it works, what to do. Shown once,
 * dismissible, and always re-openable from the step.
 *
 * Copy register: instructional designer guiding a learner. What the method is
 * doing is explained to the learner as *their* technique, never as narration
 * of the interface. Grounded in docs/architecture-map.md (D1–D10) and the
 * flows in `flow.ts`; the method wiki (docs/design/method-wiki.md) is where
 * these introductions will eventually link onward.
 */

export type TechniqueIntroId =
	| 'assessment'
	| 'shadowing'
	| 'recall-wave'
	| 'cover-ladder'
	| 'transfer';

export type TechniqueIntro = {
	id: TechniqueIntroId;
	/** Short name of the technique, shown as the card title. */
	title: string;
	/** 2–4 short sentences: what this is, why it works, what to do. */
	body: string;
};

export const TECHNIQUE_INTROS: Record<TechniqueIntroId, TechniqueIntro> = {
	assessment: {
		id: 'assessment',
		title: 'A quick placement, not a test',
		body:
			'These three small samples of listening and speaking find the lesson where your ' +
			'course should begin. Starting at the right spot means your first sessions feel ' +
			'workable instead of trivial or overwhelming. Answer naturally and guess freely; ' +
			'nothing here is graded, and if it all feels unfamiliar you simply begin at lesson one.'
	},
	shadowing: {
		id: 'shadowing',
		title: 'Shadowing',
		body:
			'Shadowing means echoing the recording phrase by phrase, starting almost before the ' +
			'speaker finishes. Speaking this close behind a voice trains your mouth and ear ' +
			'together, so the rhythm and melody arrive with the words instead of after them. ' +
			'Stay at phrase length, keep up with the voice, and let precision be rough at first; ' +
			'it sharpens with every pass.'
	},
	'recall-wave': {
		id: 'recall-wave',
		title: 'Recall: saying it from memory',
		body:
			'So far you have been absorbing this lesson; today you produce it. You will see a ' +
			'line in English and say it in the language you are learning before any answer ' +
			'appears. Retrieving a phrase from memory a few days after meeting it is the single ' +
			'strongest way to make it stick. Try every line before revealing anything; a miss ' +
			'teaches the course exactly what to bring back for you.'
	},
	'cover-ladder': {
		id: 'cover-ladder',
		title: 'Covering a column',
		body:
			'The two covers let you remove support one step at a time, on purpose. Hide the ' +
			'English to check that the meaning now lives in the other language; hide the other ' +
			'language to try producing each line yourself. Reading with a little less help each ' +
			'pass is how the dialogue stops needing the page. Uncover whenever you need to; the ' +
			'ladder is yours to climb at your own pace.'
	},
	transfer: {
		id: 'transfer',
		title: 'Transfer: make it yours',
		body:
			'You met this pattern inside the dialogue; now you bend it to a moment the lesson ' +
			'never showed you. Reusing a known pattern in fresh circumstances is what turns a ' +
			'memorised line into language you own. Start from the pattern shown below, swap in ' +
			'what the prompt asks for, and build one sentence of your own.'
	}
};
