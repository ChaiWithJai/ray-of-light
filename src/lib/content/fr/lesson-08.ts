import type { Lesson } from '../../schemas/content';

/**
 * Lesson 8 — Likes & dislikes (regular, A1).
 *
 * Marie and Antoine pick music for tonight's party and discover
 * what each other loves, likes, and cannot stand.
 */
export const lesson: Lesson = {
	id: 'fr-08',
	language: 'fr',
	index: 8,
	kind: 'regular',
	title: "J'adore, je déteste",
	situation:
		'Marie and Antoine are choosing music for a party tonight and compare their tastes in music and weekend activities.',
	level: 'A1',
	lines: [
		{
			id: 'fr-08-l01',
			lessonId: 'fr-08',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Tu aimes la musique française, Marie ?',
			naturalEnglish: 'Do you like French music, Marie?',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-08.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 0,
				endMs: 2800
			},
			chunks: [],
			constructions: ['fr-jaime-noun'],
			notes: [
				{
					type: 'grammar',
					text: 'After « aimer », French uses the definite article for general likes: « la musique », « le rap », « les chansons » — where English drops it ("I like music").',
					anchor: 'la musique'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-08-l02',
			lessonId: 'fr-08',
			language: 'fr',
			register: 'spoken',
			targetScript: "Oui, j'adore ! Surtout les chansons des années soixante.",
			naturalEnglish: 'Yes, I love it! Especially songs from the sixties.',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-08.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 2800,
				endMs: 6400
			},
			chunks: [],
			constructions: ['fr-adorer-detester'],
			notes: [
				{
					type: 'pronunciation',
					text: 'Elision: « je » loses its vowel before a vowel sound — « j\'adore », never « je adore ». Same pattern as « j\'aime ».',
					anchor: "j'adore"
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-08-l03',
			lessonId: 'fr-08',
			language: 'fr',
			register: 'spoken',
			targetScript: "Moi aussi. Mais je n'aime pas trop le rap.",
			naturalEnglish: "Me too. But I don't really like rap.",
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-08.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 6400,
				endMs: 9600
			},
			chunks: [],
			constructions: ['fr-moi-aussi-non-plus', 'fr-je-naime-pas-dislike'],
			notes: [
				{
					type: 'grammar',
					text: 'Negation wraps the verb: « ne … pas » around « aime », with « ne » eliding to « n\' » before a vowel. « Trop » softens it: "not that much".',
					anchor: "n'aime pas trop"
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-08-l04',
			lessonId: 'fr-08',
			language: 'fr',
			register: 'spoken',
			targetScript: "Ah bon ? Moi, j'aime bien le rap. Ça bouge !",
			naturalEnglish: 'Really? Me, I quite like rap. It has energy!',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-08.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 9600,
				endMs: 12800
			},
			chunks: [],
			constructions: ['fr-jaime-noun'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-08-l05',
			lessonId: 'fr-08',
			language: 'fr',
			register: 'spoken',
			targetScript: "Et le jazz ? Moi, j'aime beaucoup le jazz. Et toi ?",
			naturalEnglish: 'And jazz? Me, I like jazz a lot. What about you?',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-08.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 12800,
				endMs: 16600
			},
			chunks: [
				{ label: 'Et le jazz ?', startMs: 12800, endMs: 14000 },
				{ label: "Moi, j'aime beaucoup le jazz.", startMs: 14000, endMs: 15800 },
				{ label: 'Et toi ?', startMs: 15800, endMs: 16600 }
			],
			constructions: ['fr-jaime-noun'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-08-l06',
			lessonId: 'fr-08',
			language: 'fr',
			register: 'spoken',
			targetScript: "Moi non. Je déteste le jazz, c'est trop lent.",
			naturalEnglish: "Not me. I hate jazz, it's too slow.",
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-08.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 16600,
				endMs: 19800
			},
			chunks: [],
			constructions: ['fr-adorer-detester', 'fr-moi-aussi-non-plus'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-08-l07',
			lessonId: 'fr-08',
			language: 'fr',
			register: 'spoken',
			targetScript: "Et qu'est-ce que tu aimes faire le week-end ?",
			naturalEnglish: 'And what do you like doing on weekends?',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-08.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 19800,
				endMs: 22800
			},
			chunks: [],
			constructions: ['fr-aimer-infinitive'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-08-l08',
			lessonId: 'fr-08',
			language: 'fr',
			register: 'spoken',
			targetScript: "J'aime danser et j'aime cuisiner. Mais je n'aime pas faire le ménage !",
			naturalEnglish: "I like dancing and I like cooking. But I don't like doing housework!",
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-08.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 22800,
				endMs: 27400
			},
			chunks: [
				{ label: "J'aime danser", startMs: 22800, endMs: 24000 },
				{ label: "et j'aime cuisiner", startMs: 24000, endMs: 25300 },
				{ label: "mais je n'aime pas faire le ménage", startMs: 25300, endMs: 27400 }
			],
			constructions: ['fr-aimer-infinitive', 'fr-je-naime-pas-dislike'],
			notes: [
				{
					type: 'grammar',
					text: 'To say you like an activity, « aimer » is followed directly by the infinitive: « j\'aime danser » — no "to", no "-ing".',
					anchor: "J'aime danser"
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-08-l09',
			lessonId: 'fr-08',
			language: 'fr',
			register: 'spoken',
			targetScript:
				'Moi non plus ! Alors, on met de la chanson française pour la fête ce soir ?',
			naturalEnglish: 'Me neither! So, shall we put on French songs for the party tonight?',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-08.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 27400,
				endMs: 31600
			},
			chunks: [
				{ label: 'Moi non plus !', startMs: 27400, endMs: 28600 },
				{ label: 'Alors, on met de la chanson française', startMs: 28600, endMs: 30500 },
				{ label: 'pour la fête ce soir ?', startMs: 30500, endMs: 31600 }
			],
			constructions: ['fr-moi-aussi-non-plus'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-08-l10',
			lessonId: 'fr-08',
			language: 'fr',
			register: 'spoken',
			targetScript: "Parfait, j'adore cette idée !",
			naturalEnglish: 'Perfect, I love that idea!',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-08.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 31600,
				endMs: 34200
			},
			chunks: [],
			constructions: ['fr-adorer-detester'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		}
	],
	constructions: [
		{
			id: 'fr-jaime-noun',
			language: 'fr',
			label: "j'aime + le/la/les + noun",
			gloss: 'I like … — liking a thing, with the definite article for general likes',
			introducedIn: 'fr-08'
		},
		{
			id: 'fr-aimer-infinitive',
			language: 'fr',
			label: "j'aime + infinitive",
			gloss: 'I like doing … — liking an activity, verb straight to the infinitive',
			introducedIn: 'fr-08'
		},
		{
			id: 'fr-je-naime-pas-dislike',
			language: 'fr',
			label: "je n'aime pas + noun/infinitive",
			gloss: "I don't like … — ne…pas negation wrapped around aimer",
			introducedIn: 'fr-08'
		},
		{
			id: 'fr-adorer-detester',
			language: 'fr',
			label: "j'adore / je déteste",
			gloss: 'I love / I hate — the strong ends of the liking scale',
			introducedIn: 'fr-08'
		},
		{
			id: 'fr-moi-aussi-non-plus',
			language: 'fr',
			label: 'moi aussi / moi non / moi non plus',
			gloss: 'me too / not me / me neither — agreeing or disagreeing with a stated taste',
			introducedIn: 'fr-08'
		}
	],
	exercises: [
		{
			id: 'fr-08-e01',
			kind: 'comprehension',
			lessonId: 'fr-08',
			constructions: ['fr-adorer-detester'],
			prompt: 'Marie says « Je déteste le jazz, c\'est trop lent. » What does she mean?',
			lineId: 'fr-08-l06',
			options: [
				'She hates jazz because it is too slow.',
				'She loves jazz because it is relaxing.',
				'She thinks jazz is too loud.',
				'She wants to learn to play jazz.'
			],
			answerIndex: 0
		},
		{
			id: 'fr-08-e02',
			kind: 'comprehension',
			lessonId: 'fr-08',
			constructions: ['fr-moi-aussi-non-plus'],
			prompt: 'Marie says she does not like housework, and Antoine answers « Moi non plus ! » What is he saying?',
			lineId: 'fr-08-l09',
			options: [
				'He does not like housework either.',
				'He loves housework.',
				'He wants Marie to do the housework.',
				'He has already done the housework.'
			],
			answerIndex: 0
		},
		{
			id: 'fr-08-e03',
			kind: 'recall',
			lessonId: 'fr-08',
			constructions: ['fr-je-naime-pas-dislike'],
			prompt: "Say that you don't like coffee.",
			lineId: 'fr-08-l03',
			acceptedAnswers: [
				"Je n'aime pas le café.",
				"Je n'aime pas le café",
				"Moi, je n'aime pas le café."
			],
			canonicalAnswer: "Je n'aime pas le café.",
			hints: ['Wrap the verb with « ne … pas ».', 'Keep the article: « le café ».']
		},
		{
			id: 'fr-08-e04',
			kind: 'recall',
			lessonId: 'fr-08',
			constructions: ['fr-aimer-infinitive'],
			prompt: 'Say that you like dancing.',
			lineId: 'fr-08-l08',
			acceptedAnswers: ["J'aime danser.", "J'aime danser", "Moi, j'aime danser."],
			canonicalAnswer: "J'aime danser.",
			hints: ['« aimer » + infinitive, no word in between.']
		},
		{
			id: 'fr-08-e05',
			kind: 'completion',
			lessonId: 'fr-08',
			constructions: ['fr-jaime-noun'],
			prompt: 'Choose the right article to say you like music in general.',
			template: "J'aime ___ musique.",
			options: ['la', 'une', 'du'],
			answer: 'la',
			rule: 'After « aimer », general likes take the definite article: « j\'aime la musique », even though English says "I like music" with no article.'
		},
		{
			id: 'fr-08-e06',
			kind: 'transfer',
			lessonId: 'fr-08',
			constructions: ['fr-jaime-noun', 'fr-adorer-detester'],
			prompt: 'What do you answer?',
			situation:
				'A new colleague asks you over lunch what kind of films you like.',
			useConstruction: 'fr-jaime-noun',
			exemplar: "J'aime beaucoup les comédies, mais je déteste les films d'horreur."
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
