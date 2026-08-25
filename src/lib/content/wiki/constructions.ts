/**
 * Per-construction wiki entries (#47 phase W3, with #46 S2 and #49).
 *
 * The method wiki's other pages explain the course; these entries explain one
 * phrase pattern each. Nothing here is authored twice: an entry is assembled
 * from the curriculum itself (label, gloss, the lesson that introduces it, and
 * every line that exercises it) joined to the generated sprite cast, so a
 * construction cannot appear in the course without appearing here, and an entry
 * cannot cite a line the content does not actually mark.
 *
 * Capability state is deliberately *not* part of an entry. State belongs to the
 * learner, is derived from the evidence log at render time, and is honest about
 * absence: a pattern with no evidence reads as "not yet met", never as zero
 * progress the learner is failing at.
 */
import { COURSES } from '$lib/content/index.js';
import { spriteCastEntry, type SpriteCastEntry } from '$lib/content/sprite-cast.js';
import type { LanguageCode } from '$lib/schemas/content.js';
import { CONSTRUCTION_STATES, type ConstructionState } from '$lib/schemas/learner.js';
import { SPRITE_STAGES, spriteStage, type SpriteStage } from '$lib/sprites.js';

/* -------------------------------------------------------------------------- */
/* Shape                                                                      */
/* -------------------------------------------------------------------------- */

/** One line of course content that exercises the construction. */
export type ConstructionLineCitation = {
	lineId: string;
	lessonId: string;
	lessonIndex: number;
	lessonTitle: string;
	targetScript: string;
	transliteration?: string;
	naturalEnglish: string;
	/** True when this citation comes from the lesson that introduces the pattern. */
	introducing: boolean;
};

export type ConstructionEntry = {
	id: string;
	language: LanguageCode;
	label: string;
	gloss: string;
	/** The lesson credited with teaching it, already validated to exist. */
	introducedIn: {
		lessonId: string;
		index: number;
		title: string;
		situation: string;
	};
	/** Every line across the course whose `constructions` names this id. */
	lines: ConstructionLineCitation[];
	/**
	 * Lessons whose exercises work the pattern. A handful of constructions are
	 * taught through practice rather than through a marked dialogue line, and the
	 * entry says so instead of showing an empty list.
	 */
	exercisedInLessons: { lessonId: string; index: number; title: string }[];
	/** The character the sprite grammar draws for this pattern. */
	cast: SpriteCastEntry;
};

/* -------------------------------------------------------------------------- */
/* Assembly                                                                   */
/* -------------------------------------------------------------------------- */

function buildEntries(language: LanguageCode): ConstructionEntry[] {
	const course = COURSES[language];
	const lessonsByIndex = [...course.lessons].sort((a, b) => a.index - b.index);

	return [...course.constructions.values()]
		.map((construction) => {
			const cast = spriteCastEntry(construction.id);
			if (!cast) {
				throw new Error(
					`Construction "${construction.id}" has no sprite cast entry. ` +
						'Run: npx tsx scripts/generate-sprite-manifest.mts'
				);
			}
			const home = lessonsByIndex.find((l) => l.id === construction.introducedIn);
			if (!home) {
				throw new Error(
					`Construction "${construction.id}" is introduced in "${construction.introducedIn}", which is not a lesson in ${language}.`
				);
			}

			const lines: ConstructionLineCitation[] = [];
			const exercisedInLessons: { lessonId: string; index: number; title: string }[] = [];
			for (const lesson of lessonsByIndex) {
				const exercised = lesson.exercises.some(
					(exercise) =>
						exercise.constructions.includes(construction.id) ||
						(exercise.kind === 'transfer' && exercise.useConstruction === construction.id)
				);
				if (exercised) {
					exercisedInLessons.push({
						lessonId: lesson.id,
						index: lesson.index,
						title: lesson.title
					});
				}
				for (const line of lesson.lines) {
					if (!line.constructions.includes(construction.id)) continue;
					lines.push({
						lineId: line.id,
						lessonId: lesson.id,
						lessonIndex: lesson.index,
						lessonTitle: lesson.title,
						targetScript: line.targetScript,
						transliteration: line.transliteration,
						naturalEnglish: line.naturalEnglish,
						introducing: lesson.id === construction.introducedIn
					});
				}
			}

			return {
				id: construction.id,
				language,
				label: construction.label,
				gloss: construction.gloss,
				introducedIn: {
					lessonId: home.id,
					index: home.index,
					title: home.title,
					situation: home.situation
				},
				lines,
				exercisedInLessons,
				cast
			};
		})
		.sort((a, b) => a.introducedIn.index - b.introducedIn.index || a.label.localeCompare(b.label));
}

const ENTRIES = new Map<LanguageCode, ConstructionEntry[]>();

/** Every construction in a course, in the order the course teaches them. */
export function constructionEntries(language: LanguageCode): ConstructionEntry[] {
	let entries = ENTRIES.get(language);
	if (!entries) {
		entries = buildEntries(language);
		ENTRIES.set(language, entries);
	}
	return entries;
}

/**
 * One entry by id. Ids carry their language (`fr.je-voudrais`), so a link into
 * a construction page resolves without the caller knowing which course it came
 * from; an id no course declares resolves to nothing and the page says so.
 */
export function constructionEntry(id: string): ConstructionEntry | undefined {
	for (const language of Object.keys(COURSES) as LanguageCode[]) {
		const found = constructionEntries(language).find((entry) => entry.id === id);
		if (found) return found;
	}
	return undefined;
}

/** The href every surface uses to reach a construction's entry. */
export function constructionHref(id: string): string {
	return `/wiki/constructions/${id}`;
}

/* -------------------------------------------------------------------------- */
/* Grouping by capability state                                               */
/* -------------------------------------------------------------------------- */

/** How an unearned state reads to the learner. Never "0", never "locked". */
export const UNMET_LABEL = 'not yet met';

export function stageLabel(stage: SpriteStage): string {
	return stage === 'unmet' ? UNMET_LABEL : stage;
}

export type ConstructionGroup = {
	stage: SpriteStage;
	label: string;
	entries: ConstructionEntry[];
};

/**
 * The index's spine: what you own, strongest first, then what is still coming.
 * Empty states are dropped, so the page never lists a rung as a gap to fill.
 */
export function groupByState(
	entries: ConstructionEntry[],
	states: Map<string, ConstructionState>
): { owned: ConstructionGroup[]; coming: ConstructionGroup } {
	const byStage = new Map<SpriteStage, ConstructionEntry[]>(
		SPRITE_STAGES.map((stage) => [stage, [] as ConstructionEntry[]])
	);
	for (const entry of entries) {
		byStage.get(spriteStage(states.get(entry.id) ?? null))!.push(entry);
	}

	const owned = [...CONSTRUCTION_STATES]
		.reverse()
		.map((state) => ({ stage: state, label: state, entries: byStage.get(state)! }))
		.filter((group) => group.entries.length > 0);

	return {
		owned,
		coming: { stage: 'unmet', label: UNMET_LABEL, entries: byStage.get('unmet')! }
	};
}

/* -------------------------------------------------------------------------- */
/* Authored copy                                                              */
/* -------------------------------------------------------------------------- */

/**
 * The only hand-written words on these surfaces; everything else is content or
 * derivation. Kept here so the voice sweep can read them as data.
 */
export const CONSTRUCTION_COPY = {
	indexTitle: 'The patterns',
	indexLead:
		'Every phrase pattern this course teaches, each one showing where it stands for you right now.',
	ownedHeading: 'Yours so far',
	ownedLead: 'Patterns you have shown something with, strongest first.',
	comingHeading: 'Still coming',
	comingLead: 'Patterns waiting in lessons ahead. Each one starts climbing the day you work it.',
	nothingYet:
		'Nothing has been earned yet. Every pattern below starts climbing the first time you meet it inside a lesson.',
	stateHeading: 'Where this stands for you',
	unmetMeaning: 'You have not met this pattern yet.',
	unmetNext: 'It is introduced in the lesson below, and it starts climbing the moment you work it.',
	ladderLink: 'What each state means',
	introHeading: 'Where it is introduced',
	introLink: 'Find it in the book',
	linesHeading: 'Lines that use it',
	linesLead: 'Every line in the course marked as exercising this pattern.',
	noLines:
		'No dialogue line is marked with this pattern. You work it in the practice of the lessons below.',
	introducingMark: 'first appearance',
	exercisedHeading: 'Where you practise it',
	missing: 'No pattern with that name is taught in either course.',
	indexLink: 'All the patterns',
	entryLink: 'Open this pattern',
	otherCourse: (courseName: string) =>
		`This pattern belongs to the ${courseName} course, so your current course holds no evidence for it.`
} as const;
