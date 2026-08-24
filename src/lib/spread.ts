/**
 * Spread states and the support they remove.
 *
 * This is the table from the product model, made executable. The whole method is
 * "one stable spatial model with progressively removed support", so which column
 * is covered has to be *data* the layout reads — not a different screen.
 */
export const SPREAD_STATES = [
	'sound-exposure',
	'meaning-orientation',
	'parallel-reading',
	'target-reading',
	'shadowing',
	'comprehension',
	'active-retrieval'
] as const;

export type SpreadState = (typeof SPREAD_STATES)[number];

export type SpreadSupport = {
	targetVisible: boolean;
	sourceVisible: boolean;
	audio: 'playing' | 'segmented' | 'optional' | 'off';
	/** What the learner is being asked to do, shown above the spread. */
	instruction: string;
};

const SUPPORT: Record<SpreadState, SpreadSupport> = {
	'sound-exposure': {
		targetVisible: false,
		sourceVisible: false,
		audio: 'playing',
		instruction: 'Just listen, and let the voices become familiar.'
	},
	'meaning-orientation': {
		targetVisible: false,
		sourceVisible: true,
		audio: 'playing',
		instruction: 'Listen again, and follow the meaning only.'
	},
	'parallel-reading': {
		targetVisible: true,
		sourceVisible: true,
		audio: 'playing',
		instruction: 'Track both lines together. Tap a line to replay it.'
	},
	'target-reading': {
		targetVisible: true,
		sourceVisible: false,
		audio: 'optional',
		instruction: 'Read aloud. The meaning should come without the English.'
	},
	shadowing: {
		targetVisible: true,
		sourceVisible: false,
		audio: 'segmented',
		instruction: "Repeat each chunk right on the speaker's heels."
	},
	comprehension: {
		targetVisible: true,
		sourceVisible: false,
		audio: 'optional',
		instruction: 'Recover the meaning without looking.'
	},
	'active-retrieval': {
		targetVisible: false,
		sourceVisible: true,
		audio: 'off',
		instruction: 'Say it in the target language, line by line.'
	}
};

export function spreadSupport(state: SpreadState): SpreadSupport {
	return SUPPORT[state];
}

/** Which column the learner is producing, for labelling the covered cells. */
export function coveredLabel(state: SpreadState): string {
	if (state === 'active-retrieval') return 'your turn 🎙';
	if (state === 'sound-exposure') return 'listen first';
	return 'covered';
}
