import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = {
	id: 'fr-05',
	language: 'fr',
	index: 5,
	kind: 'regular',
	title: 'Family & relationships',
	situation:
		'Marie shows Antoine a photo of her family on her phone; they talk about siblings, names and ages.',
	level: 'A0',
	lines: [
		{
			id: 'fr-05-l01',
			lessonId: 'fr-05',
			language: 'fr',
			register: 'spoken',
			targetScript: "C'est une photo de ta famille ?",
			naturalEnglish: 'Is that a photo of your family?',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-05.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 0,
				endMs: 2600
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-05-l02',
			lessonId: 'fr-05',
			language: 'fr',
			register: 'spoken',
			targetScript: "Oui ! Là, c'est mon frère, Lucas.",
			naturalEnglish: "Yes! There, that's my brother, Lucas.",
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-05.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 2600,
				endMs: 5400
			},
			chunks: [],
			constructions: ['fr-cest-mon-ma-noun'],
			notes: [
				{
					type: 'grammar',
					text: "“C'est mon…” (masculine) / “c'est ma…” (feminine) is the everyday way to point someone out: c'est mon frère, c'est ma mère. The possessive agrees with the noun, not with the speaker.",
					anchor: "c'est mon frère"
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-05-l03',
			lessonId: 'fr-05',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Tu as aussi une sœur ?',
			naturalEnglish: 'Do you also have a sister?',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-05.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 5400,
				endMs: 7800
			},
			chunks: [],
			constructions: ['fr-avoir-family'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-05-l04',
			lessonId: 'fr-05',
			language: 'fr',
			register: 'spoken',
			targetScript: "Oui, j'ai deux sœurs. Elles habitent à Lyon.",
			naturalEnglish: 'Yes, I have two sisters. They live in Lyon.',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-05.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 7800,
				endMs: 12000
			},
			chunks: [
				{ label: "j'ai deux sœurs", startMs: 7800, endMs: 9700 },
				{ label: 'elles habitent à Lyon', startMs: 9700, endMs: 12000 }
			],
			constructions: ['fr-avoir-family'],
			notes: [
				{
					type: 'pronunciation',
					text: 'In “elles habitent”, the final -ent of the verb is silent and the s of elles links into the vowel: “elles‿habitent” sounds like “elz-abit”.',
					anchor: 'Elles habitent'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-05-l05',
			lessonId: 'fr-05',
			language: 'fr',
			register: 'spoken',
			targetScript: "Et là, c'est ta mère ?",
			naturalEnglish: "And there, is that your mother?",
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-05.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 12000,
				endMs: 14200
			},
			chunks: [],
			constructions: ['fr-cest-mon-ma-noun'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-05-l06',
			lessonId: 'fr-05',
			language: 'fr',
			register: 'spoken',
			targetScript: "Oui, c'est ma mère. Elle s'appelle Claire.",
			naturalEnglish: "Yes, that's my mother. Her name is Claire.",
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-05.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 14200,
				endMs: 18000
			},
			chunks: [
				{ label: "c'est ma mère", startMs: 14200, endMs: 16000 },
				{ label: "elle s'appelle Claire", startMs: 16000, endMs: 18000 }
			],
			constructions: ['fr-cest-mon-ma-noun', 'fr-il-elle-sappelle'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-05-l07',
			lessonId: 'fr-05',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Et ton frère, il a quel âge ?',
			naturalEnglish: 'And your brother, how old is he?',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-05.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 18000,
				endMs: 20800
			},
			chunks: [],
			constructions: ['fr-avoir-age'],
			notes: [
				{
					type: 'grammar',
					text: 'French uses avoir (to have) for age, never être: “il a quel âge ?” is literally “he has what age?”. In relaxed speech the question word often stays at the end.',
					anchor: 'il a quel âge'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-05-l08',
			lessonId: 'fr-05',
			language: 'fr',
			register: 'spoken',
			targetScript: "Il a dix-neuf ans. C'est le petit dernier !",
			naturalEnglish: "He's nineteen. He's the baby of the family!",
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-05.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 20800,
				endMs: 24400
			},
			chunks: [],
			constructions: ['fr-avoir-age'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-05-l09',
			lessonId: 'fr-05',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Moi, je suis fils unique.',
			naturalEnglish: "Me, I'm an only child.",
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-05.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 24400,
				endMs: 26800
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-05-l10',
			lessonId: 'fr-05',
			language: 'fr',
			register: 'spoken',
			targetScript: "Ah bon ? C'est calme chez toi, alors !",
			naturalEnglish: "Really? It's quiet at your place, then!",
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-05.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 26800,
				endMs: 29600
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		}
	],
	constructions: [
		{
			id: 'fr-cest-mon-ma-noun',
			language: 'fr',
			label: "c'est mon / ma + noun",
			gloss: 'pointing someone out: this/that is my …',
			introducedIn: 'fr-05',
			notes: 'mon before masculine nouns (and vowel-initial feminine nouns), ma before feminine nouns.'
		},
		{
			id: 'fr-avoir-family',
			language: 'fr',
			label: "j'ai / tu as + family member",
			gloss: 'saying who is in your family with avoir',
			introducedIn: 'fr-05'
		},
		{
			id: 'fr-il-elle-sappelle',
			language: 'fr',
			label: "il / elle s'appelle + name",
			gloss: 'giving a third person’s name',
			introducedIn: 'fr-05'
		},
		{
			id: 'fr-avoir-age',
			language: 'fr',
			label: 'il / elle a + number + ans',
			gloss: 'asking and giving ages with avoir',
			introducedIn: 'fr-05'
		}
	],
	exercises: [
		{
			id: 'fr-05-e01',
			kind: 'comprehension',
			lessonId: 'fr-05',
			constructions: ['fr-avoir-family'],
			prompt: 'Marie says: “Oui, j\'ai deux sœurs. Elles habitent à Lyon.” What does she mean?',
			lineId: 'fr-05-l04',
			options: [
				'She has two sisters who live in Lyon.',
				'She has one sister who works in Lyon.',
				'Her two brothers are visiting Lyon.',
				'She used to live in Lyon with her sisters.'
			],
			answerIndex: 0
		},
		{
			id: 'fr-05-e02',
			kind: 'recall',
			lessonId: 'fr-05',
			constructions: ['fr-il-elle-sappelle'],
			prompt: 'A friend points at your mother in a photo. Say: “Her name is Claire.”',
			lineId: 'fr-05-l06',
			acceptedAnswers: [
				"Elle s'appelle Claire.",
				"Elle s'appelle Claire",
				"elle s'appelle claire",
				"Ma mère s'appelle Claire."
			],
			canonicalAnswer: "Elle s'appelle Claire.",
			hints: ['Use the same verb as “je m\'appelle”, but for “she”.', "Starts with “Elle s'app…”"]
		},
		{
			id: 'fr-05-e03',
			kind: 'completion',
			lessonId: 'fr-05',
			constructions: ['fr-avoir-age'],
			prompt: 'Complete Marie’s answer about her brother’s age.',
			template: 'Il ___ dix-neuf ans.',
			options: ['a', 'est', 'as', 'ai'],
			answer: 'a',
			rule: 'Age uses avoir, and the il/elle form of avoir is “a”: il a dix-neuf ans.'
		},
		{
			id: 'fr-05-e04',
			kind: 'transfer',
			lessonId: 'fr-05',
			constructions: ['fr-cest-mon-ma-noun'],
			prompt: 'Introduce someone in a new photo.',
			situation:
				'You are showing a colleague a photo from a wedding. You want to point out your sister in the picture.',
			useConstruction: 'fr-cest-mon-ma-noun',
			exemplar: "Là, c'est ma sœur, Émilie."
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
