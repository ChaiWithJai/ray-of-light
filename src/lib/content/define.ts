/**
 * Compact authoring format for canonical lessons.
 *
 * Authoring a lesson by writing full `Lesson` objects means writing the same
 * provenance block, id scheme and audio stanza 28 times. `defineLesson` takes the
 * parts that actually differ per lesson and expands them into schema-valid
 * records, so the content files stay readable as *content*.
 *
 * Nothing here relaxes validation — everything it produces still goes through
 * `Lesson.parse` in `content/index.ts`.
 */
import type {
	CefrLevel,
	Construction,
	Exercise,
	LanguageCode,
	LessonKind,
	LessonLine,
	LineNote,
	Provenance,
	Register
} from '$lib/schemas/content.js';

/** Roughly 4 seconds per line. Real offsets land here once audio is recorded. */
const APPROX_LINE_MS = 4000;

export type AuthoredLine = {
	/** Native script. For French, the French text. */
	target: string;
	/** Natural English. Always required. */
	english: string;
	/** Tamil only: pronunciation scaffold. */
	translit?: string;
	/** Tamil only: reveals the target structure. */
	literal?: string;
	speaker?: string;
	constructions?: string[];
	notes?: LineNote[];
	/** Phrase-level chunk labels for shadowing. */
	chunks?: string[];
};

/** `[id, label, gloss]` — the three things a construction needs to be teachable. */
export type AuthoredConstruction = [id: string, label: string, gloss: string];

export type AuthoredLesson = {
	index: number;
	title: string;
	situation: string;
	level: CefrLevel;
	kind?: LessonKind;
	constructions: AuthoredConstruction[];
	lines: AuthoredLine[];
	exercises: AuthoredExercise[];
};

export type AuthoredExercise =
	| {
			kind: 'comprehension';
			lineIndex: number;
			prompt: string;
			options: string[];
			answerIndex: number;
			constructions?: string[];
	  }
	| {
			kind: 'recall';
			prompt: string;
			canonical: string;
			accepted?: string[];
			hints?: string[];
			lineIndex?: number;
			constructions?: string[];
	  }
	| {
			kind: 'completion';
			prompt: string;
			template: string;
			options: string[];
			answer: string;
			rule: string;
			constructions?: string[];
	  }
	| {
			kind: 'transfer';
			prompt: string;
			situation: string;
			use: string;
			exemplar: string;
			constructions?: string[];
	  };

export type LanguageProfile = {
	language: LanguageCode;
	register: Register;
	dialect?: string;
	speakerId: string;
	/** Prefix for lesson ids, e.g. `fr` gives `fr-01`. */
	idPrefix: string;
	provenance: Provenance;
};

export function lessonId(profile: LanguageProfile, index: number): string {
	return `${profile.idPrefix}-${String(index).padStart(2, '0')}`;
}

/** Namespaced so French and Tamil constructions never collide. */
export function constructionId(profile: LanguageProfile, id: string): string {
	return `${profile.language}.${id}`;
}

function buildLine(
	profile: LanguageProfile,
	lesson: AuthoredLesson,
	line: AuthoredLine,
	i: number
): LessonLine {
	const id = `${lessonId(profile, lesson.index)}-l${i + 1}`;
	const startMs = i * APPROX_LINE_MS;
	const endMs = startMs + APPROX_LINE_MS;

	return {
		id,
		lessonId: lessonId(profile, lesson.index),
		language: profile.language,
		register: profile.register,
		dialect: profile.dialect,
		targetScript: line.target,
		transliteration: line.translit,
		literalEnglish: line.literal,
		naturalEnglish: line.english,
		speaker: line.speaker,
		audio: {
			// The path the recording will occupy. `pending` keeps the UI honest
			// until it exists — see docs/ISSUE-1-LIMITATIONS.md L1.
			normalUrl: `/audio/${profile.language}/${lessonId(profile, lesson.index)}.mp3`,
			speakerId: profile.speakerId,
			startMs,
			endMs,
			pending: true
		},
		chunks: (line.chunks ?? []).map((label, c) => ({
			label,
			startMs: startMs + c * 900,
			endMs: startMs + (c + 1) * 900
		})),
		constructions: (line.constructions ?? []).map((c) => constructionId(profile, c)),
		notes: line.notes ?? [],
		source: profile.provenance.source,
		license: profile.provenance.license,
		reviewStatus: profile.provenance.reviewStatus
	};
}

function buildExercise(
	profile: LanguageProfile,
	lesson: AuthoredLesson,
	ex: AuthoredExercise,
	i: number
): Exercise {
	const lid = lessonId(profile, lesson.index);
	const base = {
		id: `${lid}-x${i + 1}`,
		lessonId: lid,
		constructions: (ex.constructions ?? []).map((c) => constructionId(profile, c))
	};

	switch (ex.kind) {
		case 'comprehension':
			return {
				...base,
				kind: 'comprehension',
				prompt: ex.prompt,
				lineId: `${lid}-l${ex.lineIndex + 1}`,
				options: ex.options,
				answerIndex: ex.answerIndex
			};
		case 'recall':
			return {
				...base,
				kind: 'recall',
				prompt: ex.prompt,
				lineId: ex.lineIndex === undefined ? undefined : `${lid}-l${ex.lineIndex + 1}`,
				canonicalAnswer: ex.canonical,
				acceptedAnswers: ex.accepted ?? [ex.canonical],
				hints: ex.hints ?? []
			};
		case 'completion':
			return {
				...base,
				kind: 'completion',
				prompt: ex.prompt,
				template: ex.template,
				options: ex.options,
				answer: ex.answer,
				rule: ex.rule
			};
		case 'transfer':
			return {
				...base,
				kind: 'transfer',
				prompt: ex.prompt,
				situation: ex.situation,
				useConstruction: constructionId(profile, ex.use),
				exemplar: ex.exemplar
			};
	}
}

/** Expand one authored lesson into a full, schema-shaped `Lesson`. */
export function defineLesson(profile: LanguageProfile, authored: AuthoredLesson) {
	const lid = lessonId(profile, authored.index);
	const kind: LessonKind = authored.kind ?? (authored.index % 7 === 0 ? 'synthesis' : 'regular');

	const constructions: Construction[] = authored.constructions.map(([id, label, gloss]) => ({
		id: constructionId(profile, id),
		language: profile.language,
		label,
		gloss,
		introducedIn: lid
	}));

	return {
		id: lid,
		language: profile.language,
		index: authored.index,
		kind,
		title: authored.title,
		situation: authored.situation,
		level: authored.level,
		lines: authored.lines.map((line, i) => buildLine(profile, authored, line, i)),
		constructions,
		exercises: authored.exercises.map((ex, i) => buildExercise(profile, authored, ex, i)),
		provenance: profile.provenance
	};
}

/**
 * Synthesis lessons recombine constructions from earlier lessons, so they
 * reference ids they do not introduce. `Lesson` requires every referenced
 * construction to be declared, so carry the earlier definitions forward.
 */
export function carryConstructions(
	lessons: { constructions: Construction[] }[],
	ids: string[]
): Construction[] {
	const all = new Map(lessons.flatMap((l) => l.constructions).map((c) => [c.id, c]));
	return ids.map((id) => {
		const found = all.get(id);
		if (!found) throw new Error(`carryConstructions: unknown construction "${id}"`);
		return found;
	});
}
