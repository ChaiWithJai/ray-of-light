import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = {
	id: 'fr-11',
	language: 'fr',
	index: 11,
	kind: 'regular',
	title: 'Transportation',
	situation:
		'Marie stops Antoine outside a métro station to ask how to get to Gare de Lyon; he explains which line to take, where to get off, and how to buy a ticket.',
	level: 'A1',
	lines: [
		{
			id: 'fr-11-l01',
			lessonId: 'fr-11',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Pardon, pour aller à la gare de Lyon, s’il vous plaît ?',
			naturalEnglish: 'Excuse me, how do I get to Gare de Lyon, please?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-11.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 0,
				endMs: 3400
			},
			chunks: [
				{ label: 'Pardon', startMs: 0, endMs: 800 },
				{ label: 'pour aller à la gare de Lyon', startMs: 800, endMs: 2500 },
				{ label: 's’il vous plaît', startMs: 2500, endMs: 3400 }
			],
			constructions: ['fr-pour-aller-a'],
			notes: [
				{
					type: 'grammar',
					text: '“Pour aller à…?” is the standard way to ask for directions — literally “in order to go to…?”, with the “how do I” left unsaid. Everyone will understand you.',
					anchor: 'pour aller à'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-11-l02',
			lessonId: 'fr-11',
			language: 'fr',
			register: 'spoken',
			targetScript: 'C’est facile. Vous prenez le métro, ligne quatorze.',
			naturalEnglish: 'It’s easy. You take the métro, line fourteen.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-11.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 3400,
				endMs: 6800
			},
			chunks: [],
			constructions: ['fr-prendre-transport'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-11-l03',
			lessonId: 'fr-11',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Il faut changer quelque part ?',
			naturalEnglish: 'Do I have to change anywhere?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-11.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 6800,
				endMs: 9200
			},
			chunks: [],
			constructions: ['fr-il-faut-inf'],
			notes: [
				{
					type: 'grammar',
					text: '“Il faut + infinitive” means “one has to / you need to”. It is impersonal: the same form works whether it is you, me, or everyone who has to do it.',
					anchor: 'Il faut changer'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-11-l04',
			lessonId: 'fr-11',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Non, c’est direct. Vous descendez à Gare de Lyon.',
			naturalEnglish: 'No, it’s direct. You get off at Gare de Lyon.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-11.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 9200,
				endMs: 12600
			},
			chunks: [],
			constructions: ['fr-descendre-a'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-11-l05',
			lessonId: 'fr-11',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Super. Et pour acheter un ticket ?',
			naturalEnglish: 'Great. And how do I buy a ticket?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-11.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 12600,
				endMs: 15000
			},
			chunks: [],
			constructions: ['fr-pour-aller-a'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-11-l06',
			lessonId: 'fr-11',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Il faut prendre un ticket à la machine, juste là-bas.',
			naturalEnglish: 'You have to get a ticket from the machine, just over there.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-11.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 15000,
				endMs: 18400
			},
			chunks: [
				{ label: 'Il faut prendre un ticket', startMs: 15000, endMs: 16800 },
				{ label: 'à la machine, juste là-bas', startMs: 16800, endMs: 18400 }
			],
			constructions: ['fr-il-faut-inf', 'fr-prendre-transport'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-11-l07',
			lessonId: 'fr-11',
			language: 'fr',
			register: 'spoken',
			targetScript: 'C’est combien, un ticket ?',
			naturalEnglish: 'How much is a ticket?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-11.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 18400,
				endMs: 20600
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-11-l08',
			lessonId: 'fr-11',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Deux euros quinze. Sinon, vous pouvez prendre le bus, le quatre-vingt-onze.',
			naturalEnglish: 'Two euros fifteen. Otherwise, you can take the bus, the ninety-one.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-11.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 20600,
				endMs: 25000
			},
			chunks: [
				{ label: 'Deux euros quinze', startMs: 20600, endMs: 22000 },
				{ label: 'Sinon, vous pouvez prendre le bus', startMs: 22000, endMs: 23800 },
				{ label: 'le quatre-vingt-onze', startMs: 23800, endMs: 25000 }
			],
			constructions: ['fr-prendre-transport'],
			notes: [
				{
					type: 'pronunciation',
					text: '“Quatre-vingt-onze” (91) is literally “four-twenty-eleven”. Bus numbers are read as one number, never digit by digit.',
					anchor: 'quatre-vingt-onze'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-11-l09',
			lessonId: 'fr-11',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Non, le métro, c’est plus rapide. Merci beaucoup !',
			naturalEnglish: 'No, the métro is faster. Thanks a lot!',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-11.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 25000,
				endMs: 27800
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-11-l10',
			lessonId: 'fr-11',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Je vous en prie. Bon voyage !',
			naturalEnglish: 'You’re welcome. Have a good trip!',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-11.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 27800,
				endMs: 30200
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
			id: 'fr-pour-aller-a',
			language: 'fr',
			label: 'pour aller à + place ?',
			gloss: 'how do I get to X? (lit. “for to-go to X?”)',
			introducedIn: 'fr-11',
			notes:
				'Works with any destination, and more generally “pour + infinitive ?” asks how to do anything: “pour acheter un ticket ?”.'
		},
		{
			id: 'fr-prendre-transport',
			language: 'fr',
			label: 'prendre + le/la + [transport]',
			gloss: 'take the métro / bus / train',
			introducedIn: 'fr-11'
		},
		{
			id: 'fr-il-faut-inf',
			language: 'fr',
			label: 'il faut + infinitive',
			gloss: 'one has to / you need to do X',
			introducedIn: 'fr-11',
			notes: 'Impersonal — the subject is always “il” no matter who has to act.'
		},
		{
			id: 'fr-descendre-a',
			language: 'fr',
			label: 'descendre à + stop',
			gloss: 'get off at X',
			introducedIn: 'fr-11'
		}
	],
	exercises: [
		{
			kind: 'comprehension',
			id: 'fr-11-e01',
			lessonId: 'fr-11',
			constructions: ['fr-descendre-a'],
			prompt: 'Antoine says: “Non, c’est direct. Vous descendez à Gare de Lyon.” What does he mean?',
			lineId: 'fr-11-l04',
			options: [
				'The line is closed; she should take a taxi to Gare de Lyon.',
				'No change needed; she gets off at Gare de Lyon.',
				'She must change trains twice before Gare de Lyon.',
				'The train goes down a hill near Gare de Lyon.'
			],
			answerIndex: 1
		},
		{
			kind: 'recall',
			id: 'fr-11-e02',
			lessonId: 'fr-11',
			constructions: ['fr-pour-aller-a'],
			prompt: 'Politely ask a stranger how to get to the train station.',
			lineId: 'fr-11-l01',
			acceptedAnswers: [
				'Pardon, pour aller à la gare, s’il vous plaît ?',
				'Pour aller à la gare, s’il vous plaît ?',
				'Excusez-moi, pour aller à la gare ?',
				'Pardon, pour aller à la gare ?'
			],
			canonicalAnswer: 'Pardon, pour aller à la gare, s’il vous plaît ?',
			hints: ['Start with “Pardon” or “Excusez-moi”.', 'The question pattern is “pour aller à…?”']
		},
		{
			kind: 'completion',
			id: 'fr-11-e03',
			lessonId: 'fr-11',
			constructions: ['fr-il-faut-inf'],
			prompt: 'Complete Antoine’s advice about the ticket machine.',
			template: '___ prendre un ticket à la machine.',
			options: ['Il faut', 'Vous descendez', 'Pour aller', 'C’est combien'],
			answer: 'Il faut',
			rule: '“Il faut + infinitive” expresses what one has to do; the verb after it stays in the infinitive.'
		},
		{
			kind: 'transfer',
			id: 'fr-11-e04',
			lessonId: 'fr-11',
			constructions: ['fr-prendre-transport', 'fr-descendre-a'],
			prompt: 'Tell your friend which transport to take and where to get off.',
			situation:
				'A friend is visiting you and wants to reach the Louvre from your apartment. You know they should take métro line 1 and get off at Palais-Royal.',
			useConstruction: 'fr-prendre-transport',
			exemplar: 'Tu prends le métro, ligne un, et tu descends à Palais-Royal.'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
