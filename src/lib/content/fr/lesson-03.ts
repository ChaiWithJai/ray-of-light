import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = {
	id: 'fr-03',
	language: 'fr',
	index: 3,
	kind: 'regular',
	title: 'Numbers & paying',
	situation: 'Marie buys fruit at a market stall and pays by card.',
	level: 'A0',
	lines: [
		{
			id: 'fr-03-l01',
			lessonId: 'fr-03',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Bonjour madame ! Vous désirez ?',
			naturalEnglish: 'Hello! What would you like?',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-03.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 0,
				endMs: 2800
			},
			chunks: [],
			constructions: [],
			notes: [
				{
					type: 'culture',
					text: 'Market vendors often greet customers with "madame" or "monsieur". "Vous désirez ?" is the standard shopkeeper opener, literally "you desire?".',
					anchor: 'Vous désirez'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-03-l02',
			lessonId: 'fr-03',
			language: 'fr',
			register: 'spoken',
			targetScript: "Bonjour ! Je vais prendre un kilo de pommes, s'il vous plaît.",
			naturalEnglish: "Hello! I'll take a kilo of apples, please.",
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-03.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 2800,
				endMs: 6800
			},
			chunks: [
				{ label: 'Bonjour !', startMs: 2800, endMs: 3600 },
				{ label: 'Je vais prendre', startMs: 3600, endMs: 4800 },
				{ label: 'un kilo de pommes', startMs: 4800, endMs: 5900 },
				{ label: "s'il vous plaît", startMs: 5900, endMs: 6800 }
			],
			constructions: ['fr-je-vais-prendre-noun'],
			notes: [
				{
					type: 'grammar',
					text: '"Je vais prendre" (I am going to take) is how people actually order and buy in shops — softer and more common in speech than a bare "je prends".',
					anchor: 'Je vais prendre'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-03-l03',
			lessonId: 'fr-03',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Très bien. Et avec ça ?',
			naturalEnglish: 'Very good. Anything else?',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-03.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 6800,
				endMs: 9200
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-03-l04',
			lessonId: 'fr-03',
			language: 'fr',
			register: 'spoken',
			targetScript: "C'est combien, les fraises ?",
			naturalEnglish: 'How much are the strawberries?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-03.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 9200,
				endMs: 12000
			},
			chunks: [],
			constructions: ['fr-cest-combien-question'],
			notes: [
				{
					type: 'grammar',
					text: 'Spoken French loves this pattern: state the question first ("c\'est combien"), then name the thing after a comma. You will hear it far more often than "Combien coûtent les fraises ?".',
					anchor: "C'est combien"
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-03-l05',
			lessonId: 'fr-03',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Trois euros cinquante la barquette.',
			naturalEnglish: 'Three euros fifty a punnet.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-03.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 12000,
				endMs: 14800
			},
			chunks: [],
			constructions: ['fr-numbers-1-20'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-03-l06',
			lessonId: 'fr-03',
			language: 'fr',
			register: 'spoken',
			targetScript: "Alors deux barquettes, s'il vous plaît. Ça fait combien en tout ?",
			naturalEnglish: 'Two punnets then, please. How much is that altogether?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-03.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 14800,
				endMs: 19000
			},
			chunks: [
				{ label: 'Alors deux barquettes', startMs: 14800, endMs: 16200 },
				{ label: "s'il vous plaît", startMs: 16200, endMs: 17200 },
				{ label: 'Ça fait combien en tout ?', startMs: 17200, endMs: 19000 }
			],
			constructions: ['fr-ca-fait-amount', 'fr-numbers-1-20'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-03-l07',
			lessonId: 'fr-03',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Alors... quatre, sept... ça fait neuf euros vingt.',
			naturalEnglish: "Let's see... four, seven... that comes to nine euros twenty.",
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-03.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 19000,
				endMs: 23000
			},
			chunks: [
				{ label: 'Alors... quatre, sept...', startMs: 19000, endMs: 21200 },
				{ label: 'ça fait neuf euros vingt', startMs: 21200, endMs: 23000 }
			],
			constructions: ['fr-ca-fait-amount', 'fr-numbers-1-20'],
			notes: [
				{
					type: 'pronunciation',
					text: 'In prices, the "f" of "neuf" is pronounced [v] before "euros": "neuf euros" sounds like "neu-veuros". The same liaison happens with "ans" (years).',
					anchor: 'neuf euros'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-03-l08',
			lessonId: 'fr-03',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Je peux payer par carte ?',
			naturalEnglish: 'Can I pay by card?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-03.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 23000,
				endMs: 25600
			},
			chunks: [],
			constructions: ['fr-payer-par-carte'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-03-l09',
			lessonId: 'fr-03',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Bien sûr, pas de problème. Vous pouvez taper votre code.',
			naturalEnglish: 'Of course, no problem. You can enter your PIN.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-03.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 25600,
				endMs: 29200
			},
			chunks: [],
			constructions: ['fr-payer-par-carte'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-03-l10',
			lessonId: 'fr-03',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Voilà. Merci, bonne journée !',
			naturalEnglish: 'There we go. Thanks, have a nice day!',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-03.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 29200,
				endMs: 31800
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-03-l11',
			lessonId: 'fr-03',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Merci à vous, au revoir !',
			naturalEnglish: 'Thank you, goodbye!',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-03.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 31800,
				endMs: 34200
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
			id: 'fr-je-vais-prendre-noun',
			language: 'fr',
			label: 'je vais prendre + noun',
			gloss: "I'll take / I'll have (ordering or buying something)",
			introducedIn: 'fr-03',
			notes: 'The default way to say what you are buying or ordering; near-future "aller + infinitive" used as a polite present.'
		},
		{
			id: 'fr-cest-combien-question',
			language: 'fr',
			label: "c'est combien(, + noun) ?",
			gloss: 'how much is it / how much are the X?',
			introducedIn: 'fr-03',
			notes: 'The everyday spoken price question; the thing being priced is tagged on after a comma.'
		},
		{
			id: 'fr-ca-fait-amount',
			language: 'fr',
			label: 'ça fait + amount',
			gloss: 'that comes to + amount; "ça fait combien ?" = how much does that come to?',
			introducedIn: 'fr-03',
			notes: 'Used for totals; contrast with "c\'est combien" which asks the price of one item.'
		},
		{
			id: 'fr-numbers-1-20',
			language: 'fr',
			label: 'numbers 1–20 in prices',
			gloss: 'un, deux, trois … vingt, used in "X euros Y" price format',
			introducedIn: 'fr-03',
			notes: 'Prices are read "neuf euros vingt" — euros first, cents after, no word for "and".'
		},
		{
			id: 'fr-payer-par-carte',
			language: 'fr',
			label: 'payer par carte / en espèces',
			gloss: 'to pay by card / in cash; "je peux payer par carte ?" = can I pay by card?',
			introducedIn: 'fr-03',
			notes: 'Intonation question "je peux + infinitive ?" is the normal spoken way to ask permission.'
		}
	],
	exercises: [
		{
			kind: 'comprehension',
			id: 'fr-03-e01',
			lessonId: 'fr-03',
			constructions: ['fr-ca-fait-amount', 'fr-numbers-1-20'],
			prompt: 'Antoine says: "Alors... quatre, sept... ça fait neuf euros vingt." What is Marie\'s total?',
			lineId: 'fr-03-l07',
			options: ['4.70 euros', '9.20 euros', '7.90 euros', '20.09 euros'],
			answerIndex: 1
		},
		{
			kind: 'comprehension',
			id: 'fr-03-e02',
			lessonId: 'fr-03',
			constructions: ['fr-cest-combien-question'],
			prompt: 'When Marie asks "C\'est combien, les fraises ?", what does she want to know?',
			lineId: 'fr-03-l04',
			options: [
				'Whether the strawberries are fresh',
				'Where the strawberries come from',
				'How much the strawberries cost'
			],
			answerIndex: 2
		},
		{
			kind: 'recall',
			id: 'fr-03-e03',
			lessonId: 'fr-03',
			constructions: ['fr-payer-par-carte'],
			prompt: 'Ask if you can pay by card.',
			lineId: 'fr-03-l08',
			acceptedAnswers: [
				'Je peux payer par carte ?',
				'Est-ce que je peux payer par carte ?',
				'On peut payer par carte ?'
			],
			canonicalAnswer: 'Je peux payer par carte ?',
			hints: ['Start with "je peux…"', '"By card" is "par carte".']
		},
		{
			kind: 'recall',
			id: 'fr-03-e04',
			lessonId: 'fr-03',
			constructions: ['fr-je-vais-prendre-noun'],
			prompt: 'Say: "I\'ll take a kilo of apples, please."',
			lineId: 'fr-03-l02',
			acceptedAnswers: [
				"Je vais prendre un kilo de pommes, s'il vous plaît.",
				'Je vais prendre un kilo de pommes.',
				"Je prends un kilo de pommes, s'il vous plaît."
			],
			canonicalAnswer: "Je vais prendre un kilo de pommes, s'il vous plaît.",
			hints: ['Use "je vais prendre…"']
		},
		{
			kind: 'completion',
			id: 'fr-03-e05',
			lessonId: 'fr-03',
			constructions: ['fr-ca-fait-amount'],
			prompt: 'Complete the vendor giving the total.',
			template: '___ douze euros cinquante en tout.',
			options: ['Ça fait', "C'est combien", 'Je vais prendre'],
			answer: 'Ça fait',
			rule: 'Totals are announced with "ça fait + amount"; "c\'est combien" asks a price, it does not state one.'
		},
		{
			kind: 'transfer',
			id: 'fr-03-e06',
			lessonId: 'fr-03',
			constructions: ['fr-cest-combien-question'],
			prompt: 'Ask the price of something new.',
			situation: 'You are in a boulangerie and spot croissants behind the glass. Ask how much the croissants are.',
			useConstruction: 'fr-cest-combien-question',
			exemplar: "C'est combien, les croissants ?"
		},
		{
			kind: 'transfer',
			id: 'fr-03-e07',
			lessonId: 'fr-03',
			constructions: ['fr-je-vais-prendre-noun'],
			prompt: 'Buy something new.',
			situation: 'At the same boulangerie, you decide to buy two croissants. Tell the baker.',
			useConstruction: 'fr-je-vais-prendre-noun',
			exemplar: "Je vais prendre deux croissants, s'il vous plaît."
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
