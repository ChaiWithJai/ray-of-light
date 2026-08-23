import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = {
	id: 'fr-10',
	language: 'fr',
	index: 10,
	kind: 'regular',
	title: 'Time & schedules',
	situation:
		'Antoine has a new job and Marie asks him about his daily schedule — start times, lunch, and evenings.',
	level: 'A1',
	lines: [
		{
			id: 'fr-10-l01',
			lessonId: 'fr-10',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Alors, ce nouveau travail ? Tu commences à quelle heure ?',
			naturalEnglish: 'So, this new job? What time do you start?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-10.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 0,
				endMs: 3800
			},
			chunks: [
				{ label: 'Alors, ce nouveau travail ?', startMs: 0, endMs: 1800 },
				{ label: 'Tu commences à quelle heure ?', startMs: 1800, endMs: 3800 }
			],
			constructions: ['fr-a-quelle-heure'],
			notes: [
				{
					type: 'grammar',
					text: 'In spoken French the question word often stays at the end: « Tu commences à quelle heure ? » rather than « À quelle heure commences-tu ? ».',
					anchor: 'à quelle heure'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-10-l02',
			lessonId: 'fr-10',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Je commence à neuf heures, tous les jours.',
			naturalEnglish: 'I start at nine, every day.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-10.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 3800,
				endMs: 6800
			},
			chunks: [],
			constructions: ['fr-verbe-a-heure', 'fr-tous-les-habitual'],
			notes: [
				{
					type: 'pronunciation',
					text: 'In « neuf heures » the f is pronounced like a v: "neu-veur". This happens only before heures and ans.',
					anchor: 'neuf heures'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-10-l03',
			lessonId: 'fr-10',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Neuf heures, c’est bien. Et tu finis quand ?',
			naturalEnglish: 'Nine o’clock, that’s nice. And when do you finish?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-10.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 6800,
				endMs: 9800
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-10-l04',
			lessonId: 'fr-10',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Je travaille de neuf heures à dix-huit heures.',
			naturalEnglish: 'I work from nine to six.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-10.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 9800,
				endMs: 13200
			},
			chunks: [
				{ label: 'Je travaille', startMs: 9800, endMs: 11000 },
				{ label: 'de neuf heures à dix-huit heures', startMs: 11000, endMs: 13200 }
			],
			constructions: ['fr-de-a-duree'],
			notes: [
				{
					type: 'culture',
					text: 'Schedules in France use the 24-hour clock: « dix-huit heures » (18h) is 6 p.m. In casual talk people also say « six heures du soir ».',
					anchor: 'dix-huit heures'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-10-l05',
			lessonId: 'fr-10',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Et la pause déjeuner, c’est à quelle heure ?',
			naturalEnglish: 'And the lunch break, what time is it at?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-10.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 13200,
				endMs: 16200
			},
			chunks: [],
			constructions: ['fr-a-quelle-heure'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-10-l06',
			lessonId: 'fr-10',
			language: 'fr',
			register: 'spoken',
			targetScript: 'À midi et demi. On mange ensemble, toute l’équipe.',
			naturalEnglish: 'At half past twelve. We eat together, the whole team.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-10.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 16200,
				endMs: 19800
			},
			chunks: [],
			constructions: ['fr-verbe-a-heure'],
			notes: [
				{
					type: 'grammar',
					text: 'With midi and minuit, "half past" is « et demi » without -e: midi et demi. With heures it takes -e: deux heures et demie.',
					anchor: 'midi et demi'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-10-l07',
			lessonId: 'fr-10',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Tu as le temps le soir, alors ?',
			naturalEnglish: 'So you have time in the evenings?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-10.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 19800,
				endMs: 22400
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-10-l08',
			lessonId: 'fr-10',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Oui. Tous les mardis, je joue au foot avec des collègues.',
			naturalEnglish: 'Yes. Every Tuesday I play football with some colleagues.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-10.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 22400,
				endMs: 26400
			},
			chunks: [
				{ label: 'Tous les mardis', startMs: 22400, endMs: 24000 },
				{ label: 'je joue au foot avec des collègues', startMs: 24000, endMs: 26400 }
			],
			constructions: ['fr-tous-les-habitual'],
			notes: [
				{
					type: 'grammar',
					text: '« Tous les + plural day » expresses a weekly habit: tous les mardis = every Tuesday. Note the plural -s on the day.',
					anchor: 'Tous les mardis'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-10-l09',
			lessonId: 'fr-10',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Quelle heure est-il, au fait ?',
			naturalEnglish: 'What time is it, by the way?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-10.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 26400,
				endMs: 28800
			},
			chunks: [],
			constructions: ['fr-il-est-heure'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-10-l10',
			lessonId: 'fr-10',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Il est sept heures moins le quart. On y va ?',
			naturalEnglish: 'It’s a quarter to seven. Shall we go?',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-10.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 28800,
				endMs: 32200
			},
			chunks: [],
			constructions: ['fr-il-est-heure'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		}
	],
	constructions: [
		{
			id: 'fr-a-quelle-heure',
			language: 'fr',
			label: '… à quelle heure ?',
			gloss: 'asking at what time something happens',
			introducedIn: 'fr-10'
		},
		{
			id: 'fr-il-est-heure',
			language: 'fr',
			label: 'il est + heure',
			gloss: 'telling the time: "it is … o’clock"',
			introducedIn: 'fr-10'
		},
		{
			id: 'fr-verbe-a-heure',
			language: 'fr',
			label: 'verb + à + time',
			gloss: 'saying at what time an event happens',
			introducedIn: 'fr-10'
		},
		{
			id: 'fr-de-a-duree',
			language: 'fr',
			label: 'de + time + à + time',
			gloss: 'a span: "from … to …"',
			introducedIn: 'fr-10'
		},
		{
			id: 'fr-tous-les-habitual',
			language: 'fr',
			label: 'tous les + plural day/noun',
			gloss: 'a regular habit: "every …"',
			introducedIn: 'fr-10'
		}
	],
	exercises: [
		{
			kind: 'comprehension',
			id: 'fr-10-e01',
			lessonId: 'fr-10',
			constructions: ['fr-de-a-duree'],
			prompt: 'Antoine says: « Je travaille de neuf heures à dix-huit heures. » What are his working hours?',
			lineId: 'fr-10-l04',
			options: [
				'From 9 a.m. to 6 p.m.',
				'From 9 a.m. to 8 p.m.',
				'From 8 a.m. to 6 p.m.',
				'From noon to 6 p.m.'
			],
			answerIndex: 0
		},
		{
			kind: 'comprehension',
			id: 'fr-10-e02',
			lessonId: 'fr-10',
			constructions: ['fr-il-est-heure'],
			prompt: 'Antoine says: « Il est sept heures moins le quart. » What time is it?',
			lineId: 'fr-10-l10',
			options: ['7:15', '6:45', '7:45', '6:15'],
			answerIndex: 1
		},
		{
			kind: 'recall',
			id: 'fr-10-e03',
			lessonId: 'fr-10',
			constructions: ['fr-a-quelle-heure'],
			prompt: 'Ask a friend: "What time do you start?"',
			lineId: 'fr-10-l01',
			acceptedAnswers: [
				'Tu commences à quelle heure ?',
				'À quelle heure tu commences ?',
				'À quelle heure est-ce que tu commences ?'
			],
			canonicalAnswer: 'Tu commences à quelle heure ?',
			hints: ['"to start" is « commencer »', 'Put « à quelle heure » at the end, spoken style']
		},
		{
			kind: 'recall',
			id: 'fr-10-e04',
			lessonId: 'fr-10',
			constructions: ['fr-de-a-duree'],
			prompt: 'Say: "I work from ten to five." (use the 24-hour « dix-sept heures » or « cinq heures »)',
			lineId: 'fr-10-l04',
			acceptedAnswers: [
				'Je travaille de dix heures à dix-sept heures.',
				'Je travaille de dix heures à cinq heures.',
				'Je travaille de 10 heures à 17 heures.'
			],
			canonicalAnswer: 'Je travaille de dix heures à dix-sept heures.',
			hints: ['Pattern: de … à …', 'Start with « Je travaille »']
		},
		{
			kind: 'completion',
			id: 'fr-10-e05',
			lessonId: 'fr-10',
			constructions: ['fr-il-est-heure'],
			prompt: 'Complete the answer to « Quelle heure est-il ? »',
			template: '___ est trois heures et demie.',
			options: ['Il', 'Elle', 'On', 'Ce'],
			answer: 'Il',
			rule: 'Telling the time always uses impersonal « il »: il est + heure, whatever the hour.'
		},
		{
			kind: 'completion',
			id: 'fr-10-e06',
			lessonId: 'fr-10',
			constructions: ['fr-tous-les-habitual'],
			prompt: 'Complete the sentence about a weekly habit.',
			template: '___ les samedis, je fais le marché.',
			options: ['Tous', 'Tout', 'Toutes', 'Toute'],
			answer: 'Tous',
			rule: 'Before a masculine plural noun like « les samedis », "every" is « tous »: tous les samedis.'
		},
		{
			kind: 'transfer',
			id: 'fr-10-e07',
			lessonId: 'fr-10',
			constructions: ['fr-de-a-duree'],
			prompt: 'Describe an opening schedule.',
			situation:
				'A tourist asks about the bakery near your flat. Tell them it is open from seven in the morning to eight in the evening.',
			useConstruction: 'fr-de-a-duree',
			exemplar: 'La boulangerie est ouverte de sept heures à vingt heures.'
		},
		{
			kind: 'transfer',
			id: 'fr-10-e08',
			lessonId: 'fr-10',
			constructions: ['fr-tous-les-habitual'],
			prompt: 'Talk about your own routine.',
			situation:
				'A new friend asks what you do to relax. Tell them that every Sunday you go to the swimming pool.',
			useConstruction: 'fr-tous-les-habitual',
			exemplar: 'Tous les dimanches, je vais à la piscine.'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
