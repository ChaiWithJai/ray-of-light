import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = {
	id: 'fr-06',
	language: 'fr',
	index: 6,
	kind: 'regular',
	title: 'Daily routine',
	situation:
		'Antoine notices Marie looks tired at work; they compare their daily routines — waking up, work hours and bedtimes.',
	level: 'A0',
	lines: [
		{
			id: 'fr-06-l01',
			lessonId: 'fr-06',
			language: 'fr',
			register: 'spoken',
			targetScript: "Tu as l'air fatiguée. Tu dors bien ?",
			naturalEnglish: 'You look tired. Are you sleeping well?',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-06.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 0,
				endMs: 3200
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-06-l02',
			lessonId: 'fr-06',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Pas trop. Je me lève à six heures tous les jours.',
			naturalEnglish: "Not really. I get up at six o'clock every day.",
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-06.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 3200,
				endMs: 7600
			},
			chunks: [
				{ label: 'pas trop', startMs: 3200, endMs: 4300 },
				{ label: 'je me lève à six heures', startMs: 4300, endMs: 6300 },
				{ label: 'tous les jours', startMs: 6300, endMs: 7600 }
			],
			constructions: ['fr-reflexive-daily', 'fr-a-plus-heure', 'fr-tous-les-frequency'],
			notes: [
				{
					type: 'grammar',
					text: 'Daily-routine verbs like se lever (get up) and se coucher (go to bed) are reflexive: the little pronoun me/te/se changes with the subject — je me lève, tu te lèves, il se lève.',
					anchor: 'Je me lève'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-06-l03',
			lessonId: 'fr-06',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Six heures ? Pourquoi si tôt ?',
			naturalEnglish: "Six o'clock? Why so early?",
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-06.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 7600,
				endMs: 10000
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-06-l04',
			lessonId: 'fr-06',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Je commence le travail à sept heures et demie.',
			naturalEnglish: 'I start work at half past seven.',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-06.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 10000,
				endMs: 13600
			},
			chunks: [],
			constructions: ['fr-a-plus-heure'],
			notes: [
				{
					type: 'grammar',
					text: '“À + time” says when something happens: à six heures, à sept heures et demie (half past), à huit heures et quart (quarter past).',
					anchor: 'à sept heures et demie'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-06-l05',
			lessonId: 'fr-06',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Et le soir, tu te couches à quelle heure ?',
			naturalEnglish: 'And in the evening, what time do you go to bed?',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-06.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 13600,
				endMs: 17000
			},
			chunks: [],
			constructions: ['fr-reflexive-daily', 'fr-a-plus-heure'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-06-l06',
			lessonId: 'fr-06',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Vers minuit… Je regarde des séries après le dîner.',
			naturalEnglish: 'Around midnight… I watch series after dinner.',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-06.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 17000,
				endMs: 20800
			},
			chunks: [],
			constructions: [],
			notes: [
				{
					type: 'culture',
					text: 'Dîner is the evening meal in France (typically around 19h30–20h30). The midday meal is le déjeuner — watch out, in parts of Belgium, Switzerland and Québec the names shift by one meal.',
					anchor: 'le dîner'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-06-l07',
			lessonId: 'fr-06',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Moi, je me couche à dix heures tous les soirs.',
			naturalEnglish: "Me, I go to bed at ten o'clock every night.",
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-06.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 20800,
				endMs: 24600
			},
			chunks: [
				{ label: 'je me couche à dix heures', startMs: 20800, endMs: 23200 },
				{ label: 'tous les soirs', startMs: 23200, endMs: 24600 }
			],
			constructions: ['fr-reflexive-daily', 'fr-a-plus-heure', 'fr-tous-les-frequency'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-06-l08',
			lessonId: 'fr-06',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Tous les soirs ? Tu es très sage !',
			naturalEnglish: 'Every night? You are very well-behaved!',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-06.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 24600,
				endMs: 27200
			},
			chunks: [],
			constructions: ['fr-tous-les-frequency'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-06-l09',
			lessonId: 'fr-06',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Le matin, je me douche, je prends un café, et ça va.',
			naturalEnglish: "In the morning I shower, I have a coffee, and I'm fine.",
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-06.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 27200,
				endMs: 31400
			},
			chunks: [],
			constructions: ['fr-reflexive-daily'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-06-l10',
			lessonId: 'fr-06',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Bon, ce soir, je me couche tôt. Promis !',
			naturalEnglish: "Okay, tonight I'm going to bed early. Promise!",
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-06.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 31400,
				endMs: 34400
			},
			chunks: [],
			constructions: ['fr-reflexive-daily'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		}
	],
	constructions: [
		{
			id: 'fr-reflexive-daily',
			language: 'fr',
			label: 'je me lève / je me couche',
			gloss: 'daily-routine reflexive verbs (get up, go to bed, shower)',
			introducedIn: 'fr-06',
			notes: 'The reflexive pronoun agrees with the subject: je me…, tu te…, il/elle se….'
		},
		{
			id: 'fr-a-plus-heure',
			language: 'fr',
			label: 'à + heure',
			gloss: 'saying at what time something happens',
			introducedIn: 'fr-06'
		},
		{
			id: 'fr-tous-les-frequency',
			language: 'fr',
			label: 'tous les jours / tous les soirs',
			gloss: 'expressing everyday frequency',
			introducedIn: 'fr-06'
		}
	],
	exercises: [
		{
			id: 'fr-06-e01',
			kind: 'comprehension',
			lessonId: 'fr-06',
			constructions: ['fr-reflexive-daily', 'fr-a-plus-heure', 'fr-tous-les-frequency'],
			prompt: 'Marie says: “Je me lève à six heures tous les jours.” What does she mean?',
			lineId: 'fr-06-l02',
			options: [
				'She gets up at six every day.',
				'She goes to bed at six every day.',
				'She gets up at seven on weekdays only.',
				'She wakes her kids up at six.'
			],
			answerIndex: 0
		},
		{
			id: 'fr-06-e02',
			kind: 'recall',
			lessonId: 'fr-06',
			constructions: ['fr-reflexive-daily', 'fr-a-plus-heure'],
			prompt: 'Tell a friend: “I go to bed at ten o\'clock.”',
			lineId: 'fr-06-l07',
			acceptedAnswers: [
				'Je me couche à dix heures.',
				'Je me couche à dix heures',
				'je me couche à dix heures',
				'Je me couche à 10 heures.'
			],
			canonicalAnswer: 'Je me couche à dix heures.',
			hints: ['“Go to bed” is a reflexive verb: se coucher.', 'Time uses “à”: à dix heures.']
		},
		{
			id: 'fr-06-e03',
			kind: 'completion',
			lessonId: 'fr-06',
			constructions: ['fr-reflexive-daily'],
			prompt: 'Complete Antoine’s question to Marie about her bedtime.',
			template: 'Tu ___ couches à quelle heure ?',
			options: ['te', 'me', 'se', 'nous'],
			answer: 'te',
			rule: 'The reflexive pronoun matches the subject: tu → te, so “tu te couches”.'
		},
		{
			id: 'fr-06-e04',
			kind: 'transfer',
			lessonId: 'fr-06',
			constructions: ['fr-a-plus-heure'],
			prompt: 'Describe a new part of your routine.',
			situation:
				'A colleague asks about your lunch break. Tell them you eat at one o\'clock.',
			useConstruction: 'fr-a-plus-heure',
			exemplar: 'Je mange à une heure.'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
