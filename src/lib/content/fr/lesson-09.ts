import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = {
	id: 'fr-09',
	language: 'fr',
	index: 9,
	kind: 'regular',
	title: 'Making plans',
	situation:
		'Marie and Antoine run into each other after work and make plans to see a film this weekend.',
	level: 'A1',
	lines: [
		{
			id: 'fr-09-l01',
			lessonId: 'fr-09',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Antoine ! Tu es libre ce week-end ?',
			naturalEnglish: 'Antoine! Are you free this weekend?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-09.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 0,
				endMs: 2800
			},
			chunks: [],
			constructions: ['fr-tu-es-libre'],
			notes: [
				{
					type: 'culture',
					text: 'French speakers borrow the English word « week-end » (with a hyphen). It is masculine: le week-end.',
					anchor: 'week-end'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-09-l02',
			lessonId: 'fr-09',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Samedi soir, oui. Pourquoi ?',
			naturalEnglish: 'Saturday evening, yes. Why?',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-09.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 2800,
				endMs: 5200
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-09-l03',
			lessonId: 'fr-09',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Ça te dit d’aller au cinéma ?',
			naturalEnglish: 'Do you feel like going to the movies?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-09.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 5200,
				endMs: 8000
			},
			chunks: [],
			constructions: ['fr-ca-te-dit-de-inf'],
			notes: [
				{
					type: 'grammar',
					text: '« Ça te dit de + infinitive » is the everyday way to invite someone: literally "does that say (anything) to you". The de contracts to d’ before a vowel.',
					anchor: 'Ça te dit d’aller'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-09-l04',
			lessonId: 'fr-09',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Bonne idée ! Il y a le nouveau film de science-fiction.',
			naturalEnglish: 'Good idea! The new science-fiction film is playing.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-09.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 8000,
				endMs: 12200
			},
			chunks: [
				{ label: 'Bonne idée !', startMs: 8000, endMs: 9400 },
				{ label: 'Il y a le nouveau film', startMs: 9400, endMs: 11000 },
				{ label: 'de science-fiction', startMs: 11000, endMs: 12200 }
			],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-09-l05',
			lessonId: 'fr-09',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Parfait. On va prendre les billets sur internet ?',
			naturalEnglish: 'Perfect. Shall we get the tickets online?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-09.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 12200,
				endMs: 15600
			},
			chunks: [],
			constructions: ['fr-on-va-inf-plan'],
			notes: [
				{
					type: 'grammar',
					text: 'Spoken French uses « on » instead of « nous » for "we". « On va + infinitive » states a plan in the near future: "we are going to…".',
					anchor: 'On va prendre'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-09-l06',
			lessonId: 'fr-09',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Oui, je vais faire ça ce soir.',
			naturalEnglish: 'Yes, I will do that tonight.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-09.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 15600,
				endMs: 18400
			},
			chunks: [],
			constructions: ['fr-on-va-inf-plan'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-09-l07',
			lessonId: 'fr-09',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Et avant le film, on pourrait manger quelque chose.',
			naturalEnglish: 'And before the film, we could grab something to eat.',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-09.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 18400,
				endMs: 22600
			},
			chunks: [
				{ label: 'Et avant le film', startMs: 18400, endMs: 20200 },
				{ label: 'on pourrait manger quelque chose', startMs: 20200, endMs: 22600 }
			],
			constructions: ['fr-on-pourrait-inf'],
			notes: [
				{
					type: 'grammar',
					text: '« On pourrait + infinitive » ("we could…") softens a suggestion — less direct than « on va », more tentative than a question.',
					anchor: 'on pourrait manger'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-09-l08',
			lessonId: 'fr-09',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Avec plaisir. La pizzeria à côté du cinéma est très bien.',
			naturalEnglish: 'With pleasure. The pizzeria next to the cinema is really good.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-09.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 22600,
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
			id: 'fr-09-l09',
			lessonId: 'fr-09',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Alors on se retrouve devant le cinéma à sept heures ?',
			naturalEnglish: 'So shall we meet in front of the cinema at seven?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-09.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 26800,
				endMs: 30400
			},
			chunks: [
				{ label: 'Alors on se retrouve', startMs: 26800, endMs: 28400 },
				{ label: 'devant le cinéma à sept heures', startMs: 28400, endMs: 30400 }
			],
			constructions: ['fr-on-se-retrouve'],
			notes: [
				{
					type: 'pronunciation',
					text: 'In « sept heures » the final t links to the vowel: say "sè-teur". This liaison is obligatory with numbers before heures.',
					anchor: 'sept heures'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-09-l10',
			lessonId: 'fr-09',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Ça marche. À samedi !',
			naturalEnglish: 'Works for me. See you Saturday!',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-09.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 30400,
				endMs: 32800
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
			id: 'fr-tu-es-libre',
			language: 'fr',
			label: 'tu es libre + time ?',
			gloss: 'asking whether someone is free at a given time',
			introducedIn: 'fr-09'
		},
		{
			id: 'fr-ca-te-dit-de-inf',
			language: 'fr',
			label: 'ça te dit de + infinitive ?',
			gloss: 'informal invitation: "do you feel like …-ing?"',
			introducedIn: 'fr-09'
		},
		{
			id: 'fr-on-va-inf-plan',
			language: 'fr',
			label: 'on va + infinitive',
			gloss: 'near-future plan: "we are going to …"',
			introducedIn: 'fr-09'
		},
		{
			id: 'fr-on-pourrait-inf',
			language: 'fr',
			label: 'on pourrait + infinitive',
			gloss: 'soft suggestion: "we could …"',
			introducedIn: 'fr-09'
		},
		{
			id: 'fr-on-se-retrouve',
			language: 'fr',
			label: 'on se retrouve + place/time',
			gloss: 'arranging a meeting point: "we meet (each other) at …"',
			introducedIn: 'fr-09'
		}
	],
	exercises: [
		{
			kind: 'comprehension',
			id: 'fr-09-e01',
			lessonId: 'fr-09',
			constructions: ['fr-ca-te-dit-de-inf'],
			prompt: 'Marie says: « Ça te dit d’aller au cinéma ? » What is she doing?',
			lineId: 'fr-09-l03',
			options: [
				'Telling Antoine she already saw the film',
				'Inviting Antoine to go to the movies',
				'Asking Antoine where the cinema is',
				'Asking Antoine to buy her a ticket'
			],
			answerIndex: 1
		},
		{
			kind: 'comprehension',
			id: 'fr-09-e02',
			lessonId: 'fr-09',
			constructions: ['fr-on-se-retrouve'],
			prompt: 'Where and when do Marie and Antoine agree to meet?',
			lineId: 'fr-09-l09',
			options: [
				'At the pizzeria at eight',
				'In front of the cinema at seven',
				'At Marie’s place on Sunday',
				'Inside the cinema at six'
			],
			answerIndex: 1
		},
		{
			kind: 'recall',
			id: 'fr-09-e03',
			lessonId: 'fr-09',
			constructions: ['fr-tu-es-libre'],
			prompt: 'Ask a friend: "Are you free this weekend?"',
			lineId: 'fr-09-l01',
			acceptedAnswers: [
				'Tu es libre ce week-end ?',
				'Tu es libre ce weekend ?',
				'Est-ce que tu es libre ce week-end ?',
				'T’es libre ce week-end ?'
			],
			canonicalAnswer: 'Tu es libre ce week-end ?',
			hints: ['Start with « Tu es… »', '"free" is « libre »']
		},
		{
			kind: 'recall',
			id: 'fr-09-e04',
			lessonId: 'fr-09',
			constructions: ['fr-ca-te-dit-de-inf'],
			prompt: 'Invite a friend: "Do you feel like eating a pizza?"',
			acceptedAnswers: [
				'Ça te dit de manger une pizza ?',
				'Ça te dit une pizza ?',
				'Est-ce que ça te dit de manger une pizza ?'
			],
			canonicalAnswer: 'Ça te dit de manger une pizza ?',
			hints: ['Use « Ça te dit de… »', '"to eat" is « manger »']
		},
		{
			kind: 'completion',
			id: 'fr-09-e05',
			lessonId: 'fr-09',
			constructions: ['fr-on-va-inf-plan'],
			prompt: 'Complete the plan for tomorrow.',
			template: 'Demain, on ___ visiter le musée.',
			options: ['va', 'vas', 'allez', 'vont'],
			answer: 'va',
			rule: 'With « on », aller takes the third-person singular form « va »: on va + infinitive for a near-future plan.'
		},
		{
			kind: 'completion',
			id: 'fr-09-e06',
			lessonId: 'fr-09',
			constructions: ['fr-on-se-retrouve'],
			prompt: 'Complete the meeting arrangement.',
			template: 'On se ___ devant la gare à six heures ?',
			options: ['retrouve', 'retrouves', 'retrouvent', 'retrouver'],
			answer: 'retrouve',
			rule: '« On » always takes the third-person singular verb form, even though it means "we": on se retrouve.'
		},
		{
			kind: 'transfer',
			id: 'fr-09-e07',
			lessonId: 'fr-09',
			constructions: ['fr-on-pourrait-inf'],
			prompt: 'Suggest a plan to a friend for Sunday.',
			situation:
				'It is a sunny Sunday and your friend is bored. Softly suggest that the two of you could take a walk in the park.',
			useConstruction: 'fr-on-pourrait-inf',
			exemplar: 'On pourrait faire une promenade dans le parc.'
		},
		{
			kind: 'transfer',
			id: 'fr-09-e08',
			lessonId: 'fr-09',
			constructions: ['fr-on-se-retrouve'],
			prompt: 'Arrange where to meet.',
			situation:
				'You and a colleague are going to a concert tonight. Propose meeting in front of the metro station at eight.',
			useConstruction: 'fr-on-se-retrouve',
			exemplar: 'On se retrouve devant la station de métro à huit heures ?'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
