import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = {
	id: 'fr-12',
	language: 'fr',
	index: 12,
	kind: 'regular',
	title: 'Asking for help',
	situation:
		'Marie has lost her bag on the métro. At her hotel, she asks Julien at reception for help; he calls the lost-and-found office for her.',
	level: 'A1',
	lines: [
		{
			id: 'fr-12-l01',
			lessonId: 'fr-12',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Excusez-moi, vous pouvez m’aider ? J’ai un problème.',
			naturalEnglish: 'Excuse me, can you help me? I have a problem.',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-12.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 0,
				endMs: 3600
			},
			chunks: [
				{ label: 'Excusez-moi', startMs: 0, endMs: 1000 },
				{ label: 'vous pouvez m’aider ?', startMs: 1000, endMs: 2400 },
				{ label: 'J’ai un problème', startMs: 2400, endMs: 3600 }
			],
			constructions: ['fr-vous-pouvez-inf'],
			notes: [
				{
					type: 'grammar',
					text: 'In everyday speech a question is usually just the statement with rising intonation: “vous pouvez m’aider ?”. The inverted “pouvez-vous…?” is correct but sounds more formal.',
					anchor: 'vous pouvez m’aider'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-12-l02',
			lessonId: 'fr-12',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Bien sûr. Qu’est-ce qu’il y a ?',
			naturalEnglish: 'Of course. What’s the matter?',
			speaker: 'Julien',
			audio: {
				normalUrl: '/audio/fr/fr-12.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 3600,
				endMs: 6000
			},
			chunks: [],
			constructions: ['fr-quest-ce-quil-y-a'],
			notes: [
				{
					type: 'pronunciation',
					text: '“Qu’est-ce qu’il y a ?” compresses in fast speech to something like “kess-kya”. Listen for the rhythm rather than each written word.',
					anchor: 'Qu’est-ce qu’il y a'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-12-l03',
			lessonId: 'fr-12',
			language: 'fr',
			register: 'spoken',
			targetScript: 'J’ai perdu mon sac. Je crois que je l’ai laissé dans le métro.',
			naturalEnglish: 'I’ve lost my bag. I think I left it on the métro.',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-12.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 6000,
				endMs: 10200
			},
			chunks: [
				{ label: 'J’ai perdu mon sac', startMs: 6000, endMs: 7800 },
				{ label: 'Je crois que je l’ai laissé', startMs: 7800, endMs: 9200 },
				{ label: 'dans le métro', startMs: 9200, endMs: 10200 }
			],
			constructions: ['fr-jai-perdu-noun'],
			notes: [
				{
					type: 'grammar',
					text: '“J’ai perdu” is the passé composé: “avoir” in the present plus the past participle “perdu”. It is the everyday way to say something already happened.',
					anchor: 'J’ai perdu'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-12-l04',
			lessonId: 'fr-12',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Oh là là. Il y avait quoi dedans ?',
			naturalEnglish: 'Oh no. What was in it?',
			speaker: 'Julien',
			audio: {
				normalUrl: '/audio/fr/fr-12.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 10200,
				endMs: 12800
			},
			chunks: [],
			constructions: [],
			notes: [
				{
					type: 'culture',
					text: '“Oh là là” expresses sympathy or dismay — closer to “oh no” or “oh dear” than to the excited meaning English speakers often assume.',
					anchor: 'Oh là là'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-12-l05',
			lessonId: 'fr-12',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Mon portefeuille et mes clés. Et je cherche aussi mon téléphone.',
			naturalEnglish: 'My wallet and my keys. And I’m also looking for my phone.',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-12.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 12800,
				endMs: 16400
			},
			chunks: [],
			constructions: ['fr-je-cherche-noun'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-12-l06',
			lessonId: 'fr-12',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Vous pouvez appeler les objets trouvés. J’ai le numéro.',
			naturalEnglish: 'You can call the lost-and-found office. I have the number.',
			speaker: 'Julien',
			audio: {
				normalUrl: '/audio/fr/fr-12.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 16400,
				endMs: 19800
			},
			chunks: [],
			constructions: ['fr-vous-pouvez-inf'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-12-l07',
			lessonId: 'fr-12',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Vous pouvez composer le numéro pour moi ? Je suis un peu perdue.',
			naturalEnglish: 'Can you dial the number for me? I’m a bit lost.',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-12.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 19800,
				endMs: 23400
			},
			chunks: [],
			constructions: ['fr-vous-pouvez-inf'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-12-l08',
			lessonId: 'fr-12',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Pas de problème. Attendez… ça sonne.',
			naturalEnglish: 'No problem. Hold on… it’s ringing.',
			speaker: 'Julien',
			audio: {
				normalUrl: '/audio/fr/fr-12.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 23400,
				endMs: 26000
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-12-l09',
			lessonId: 'fr-12',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Merci, c’est vraiment gentil.',
			naturalEnglish: 'Thank you, that’s really kind.',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-12.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 26000,
				endMs: 28200
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-12-l10',
			lessonId: 'fr-12',
			language: 'fr',
			register: 'spoken',
			targetScript: 'De rien. On va retrouver votre sac, ne vous inquiétez pas.',
			naturalEnglish: 'You’re welcome. We’ll find your bag, don’t worry.',
			speaker: 'Julien',
			audio: {
				normalUrl: '/audio/fr/fr-12.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 28200,
				endMs: 31600
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
			id: 'fr-vous-pouvez-inf',
			language: 'fr',
			label: 'vous pouvez + infinitive ?',
			gloss: 'can you do X? (polite request for help)',
			introducedIn: 'fr-12',
			notes:
				'Statement word order with rising intonation is the normal spoken question. Also states possibility: “vous pouvez appeler…” = “you can call…”.'
		},
		{
			id: 'fr-jai-perdu-noun',
			language: 'fr',
			label: 'j’ai perdu + noun',
			gloss: 'I have lost X (passé composé)',
			introducedIn: 'fr-12',
			notes: 'First taste of the passé composé: “avoir” + past participle for completed events.'
		},
		{
			id: 'fr-je-cherche-noun',
			language: 'fr',
			label: 'je cherche + noun',
			gloss: 'I am looking for X',
			introducedIn: 'fr-04',
			notes: 'No preposition: “chercher” already contains the “for” — never “je cherche pour”.'
		},
		{
			id: 'fr-quest-ce-quil-y-a',
			language: 'fr',
			label: 'Qu’est-ce qu’il y a ?',
			gloss: 'what’s the matter? / what’s wrong?',
			introducedIn: 'fr-12'
		}
	],
	exercises: [
		{
			kind: 'comprehension',
			id: 'fr-12-e01',
			lessonId: 'fr-12',
			constructions: ['fr-jai-perdu-noun'],
			prompt:
				'Marie says: “J’ai perdu mon sac. Je crois que je l’ai laissé dans le métro.” What happened?',
			lineId: 'fr-12-l03',
			options: [
				'She lost her bag and thinks she left it on the métro.',
				'Someone stole her bag at the hotel reception.',
				'She lost her way to the métro station.',
				'She left her bag at the hotel on purpose.'
			],
			answerIndex: 0
		},
		{
			kind: 'recall',
			id: 'fr-12-e02',
			lessonId: 'fr-12',
			constructions: ['fr-vous-pouvez-inf'],
			prompt: 'Politely get a stranger’s attention and ask if they can help you.',
			lineId: 'fr-12-l01',
			acceptedAnswers: [
				'Excusez-moi, vous pouvez m’aider ?',
				'Excusez-moi, pouvez-vous m’aider ?',
				'Pardon, vous pouvez m’aider ?',
				'Vous pouvez m’aider, s’il vous plaît ?'
			],
			canonicalAnswer: 'Excusez-moi, vous pouvez m’aider ?',
			hints: [
				'Open with “Excusez-moi” or “Pardon”.',
				'“To help me” is “m’aider” — the m’ comes before the verb.'
			]
		},
		{
			kind: 'completion',
			id: 'fr-12-e03',
			lessonId: 'fr-12',
			constructions: ['fr-jai-perdu-noun'],
			prompt: 'Complete Marie’s explanation of her problem.',
			template: 'J’ai ___ mon portefeuille dans le bus.',
			options: ['perdu', 'cherche', 'pouvez', 'problème'],
			answer: 'perdu',
			rule: 'The passé composé takes “avoir” plus the past participle: “j’ai perdu” = “I lost / I have lost”.'
		},
		{
			kind: 'transfer',
			id: 'fr-12-e04',
			lessonId: 'fr-12',
			constructions: ['fr-je-cherche-noun', 'fr-vous-pouvez-inf'],
			prompt: 'Ask a station employee for help finding the platform.',
			situation:
				'You are at a big train station and cannot find platform 7. You stop a station employee.',
			useConstruction: 'fr-je-cherche-noun',
			exemplar: 'Excusez-moi, je cherche le quai numéro sept. Vous pouvez m’aider ?'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
