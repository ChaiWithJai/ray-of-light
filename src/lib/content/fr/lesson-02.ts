import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = {
	id: 'fr-02',
	language: 'fr',
	index: 2,
	kind: 'regular',
	title: 'Ordering tea & coffee',
	situation:
		'Léa orders a coffee for herself and a mint tea for a friend at the counter of a small café; Karim is serving.',
	level: 'A0',
	lines: [
		{
			id: 'fr-02-l01',
			lessonId: 'fr-02',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Bonjour ! Vous désirez ?',
			naturalEnglish: 'Hello! What can I get you?',
			speaker: 'Karim',
			audio: {
				normalUrl: '/audio/fr/fr-02.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 0,
				endMs: 2500
			},
			chunks: [],
			constructions: [],
			notes: [
				{
					type: 'culture',
					text: 'The exchange of « Bonjour » before anything else is non-negotiable in French shops and cafés. Ordering without it marks you as rude, not just foreign.',
					anchor: 'Bonjour'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-02-l02',
			lessonId: 'fr-02',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Bonjour ! Je voudrais un café, s’il vous plaît.',
			naturalEnglish: 'Hello! I’d like a coffee, please.',
			speaker: 'Léa',
			audio: {
				normalUrl: '/audio/fr/fr-02.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 2500,
				endMs: 6500
			},
			chunks: [
				{ label: 'Bonjour !', startMs: 2500, endMs: 3600 },
				{ label: 'Je voudrais un café,', startMs: 3600, endMs: 5300 },
				{ label: 's’il vous plaît.', startMs: 5300, endMs: 6500 }
			],
			constructions: ['fr-je-voudrais-noun', 'fr-un-une-noun', 'fr-sil-vous-plait-politeness'],
			notes: [
				{
					type: 'grammar',
					text: 'Je voudrais ("I would like") is the polite way to ask for anything. « Je veux » ("I want") is grammatical but sounds blunt, almost childish, when ordering.',
					anchor: 'Je voudrais'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-02-l03',
			lessonId: 'fr-02',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Un café… Et avec ça ?',
			naturalEnglish: 'One coffee… Anything else?',
			speaker: 'Karim',
			audio: {
				normalUrl: '/audio/fr/fr-02.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 6500,
				endMs: 9000
			},
			chunks: [],
			constructions: ['fr-un-une-noun'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-02-l04',
			lessonId: 'fr-02',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Est-ce que vous avez du thé à la menthe ?',
			naturalEnglish: 'Do you have mint tea?',
			speaker: 'Léa',
			audio: {
				normalUrl: '/audio/fr/fr-02.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 9000,
				endMs: 12500
			},
			chunks: [
				{ label: 'Est-ce que vous avez', startMs: 9000, endMs: 10800 },
				{ label: 'du thé à la menthe ?', startMs: 10800, endMs: 12500 }
			],
			constructions: ['fr-est-ce-que-question'],
			notes: [
				{
					type: 'grammar',
					text: 'Est-ce que (literally "is it that…") turns any statement into a yes/no question without changing the word order: « vous avez du thé » → « Est-ce que vous avez du thé ? »',
					anchor: 'Est-ce que'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-02-l05',
			lessonId: 'fr-02',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Oui, bien sûr. Un thé à la menthe aussi ?',
			naturalEnglish: 'Yes, of course. A mint tea as well?',
			speaker: 'Karim',
			audio: {
				normalUrl: '/audio/fr/fr-02.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 12500,
				endMs: 15800
			},
			chunks: [],
			constructions: ['fr-un-une-noun'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-02-l06',
			lessonId: 'fr-02',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Oui, pour mon ami. Il arrive dans cinq minutes.',
			naturalEnglish: 'Yes, for my friend. He’ll be here in five minutes.',
			speaker: 'Léa',
			audio: {
				normalUrl: '/audio/fr/fr-02.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 15800,
				endMs: 19500
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-02-l07',
			lessonId: 'fr-02',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Très bien. Sur place ou à emporter ?',
			naturalEnglish: 'Very good. For here or to go?',
			speaker: 'Karim',
			audio: {
				normalUrl: '/audio/fr/fr-02.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 19500,
				endMs: 22500
			},
			chunks: [],
			constructions: [],
			notes: [
				{
					type: 'culture',
					text: '« Sur place ou à emporter ? » is the standard counter question everywhere in France. « Sur place » = drinking it there; « à emporter » = taking it away — often cheaper, since table service can carry a surcharge.',
					anchor: 'Sur place ou à emporter'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-02-l08',
			lessonId: 'fr-02',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Sur place, s’il vous plaît.',
			naturalEnglish: 'For here, please.',
			speaker: 'Léa',
			audio: {
				normalUrl: '/audio/fr/fr-02.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 22500,
				endMs: 25000
			},
			chunks: [],
			constructions: ['fr-sil-vous-plait-politeness'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-02-l09',
			lessonId: 'fr-02',
			language: 'fr',
			register: 'spoken',
			targetScript: 'D’accord. Je vous apporte ça tout de suite.',
			naturalEnglish: 'All right. I’ll bring that right over.',
			speaker: 'Karim',
			audio: {
				normalUrl: '/audio/fr/fr-02.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 25000,
				endMs: 28500
			},
			chunks: [
				{ label: 'D’accord.', startMs: 25000, endMs: 26100 },
				{ label: 'Je vous apporte ça tout de suite.', startMs: 26100, endMs: 28500 }
			],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-02-l10',
			lessonId: 'fr-02',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Merci beaucoup !',
			naturalEnglish: 'Thanks a lot!',
			speaker: 'Léa',
			audio: {
				normalUrl: '/audio/fr/fr-02.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 28500,
				endMs: 30500
			},
			chunks: [],
			constructions: ['fr-sil-vous-plait-politeness'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		}
	],
	constructions: [
		{
			id: 'fr-je-voudrais-noun',
			language: 'fr',
			label: 'je voudrais + nom',
			gloss: 'politely asking for something ("I would like …")',
			introducedIn: 'fr-02'
		},
		{
			id: 'fr-est-ce-que-question',
			language: 'fr',
			label: 'est-ce que + phrase',
			gloss: 'turning a statement into a yes/no question without inversion',
			introducedIn: 'fr-02'
		},
		{
			id: 'fr-un-une-noun',
			language: 'fr',
			label: 'un / une + nom',
			gloss: 'ordering one of something — the article carries the noun’s gender (un café, une eau)',
			introducedIn: 'fr-02'
		},
		{
			id: 'fr-sil-vous-plait-politeness',
			language: 'fr',
			label: 's’il vous plaît / merci',
			gloss: 'the politeness pair that frames every café request',
			introducedIn: 'fr-02'
		}
	],
	exercises: [
		{
			kind: 'comprehension',
			id: 'fr-02-e01',
			lessonId: 'fr-02',
			constructions: [],
			prompt: 'Karim asks: « Sur place ou à emporter ? » What does he want to know?',
			lineId: 'fr-02-l07',
			options: [
				'Whether Léa will drink it there or take it away',
				'Whether Léa wants sugar or milk',
				'Whether Léa will pay by card or in cash',
				'Whether Léa wants a large or a small cup'
			],
			answerIndex: 0
		},
		{
			kind: 'recall',
			id: 'fr-02-e02',
			lessonId: 'fr-02',
			constructions: ['fr-je-voudrais-noun', 'fr-sil-vous-plait-politeness'],
			prompt: 'Order politely: say "I’d like a coffee, please."',
			lineId: 'fr-02-l02',
			acceptedAnswers: [
				'Je voudrais un café, s’il vous plaît.',
				'Je voudrais un café, s’il vous plaît',
				"Je voudrais un café, s'il vous plaît.",
				"Je voudrais un café, s'il vous plaît",
				'Je voudrais un café s’il vous plaît.',
				"Je voudrais un café s'il vous plaît."
			],
			canonicalAnswer: 'Je voudrais un café, s’il vous plaît.',
			hints: ['Start with the polite "I would like…"', 'Don’t forget « s’il vous plaît » at the end.']
		},
		{
			kind: 'completion',
			id: 'fr-02-e03',
			lessonId: 'fr-02',
			constructions: ['fr-est-ce-que-question'],
			prompt: 'Complete the question to ask whether they have hot chocolate.',
			template: '___ vous avez du chocolat chaud ?',
			options: ['Est-ce que', 'Je voudrais', 'S’il vous plaît'],
			answer: 'Est-ce que',
			rule: 'Put « est-ce que » in front of a statement to turn it into a yes/no question — the word order after it does not change.'
		},
		{
			kind: 'transfer',
			id: 'fr-02-e04',
			lessonId: 'fr-02',
			constructions: ['fr-je-voudrais-noun', 'fr-sil-vous-plait-politeness'],
			prompt: 'Order a croissant politely.',
			situation:
				'You are at a bakery in Nice the next morning. You greet the baker and want one croissant.',
			useConstruction: 'fr-je-voudrais-noun',
			exemplar: 'Bonjour ! Je voudrais un croissant, s’il vous plaît.'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
