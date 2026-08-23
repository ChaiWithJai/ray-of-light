import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = {
	id: 'fr-01',
	language: 'fr',
	index: 1,
	kind: 'regular',
	title: 'Greetings & introductions',
	situation:
		'Marie and Antoine meet for the first time at a friend’s housewarming party in Paris and introduce themselves.',
	level: 'A0',
	lines: [
		{
			id: 'fr-01-l01',
			lessonId: 'fr-01',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Salut !',
			naturalEnglish: 'Hi!',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-01.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 0,
				endMs: 2000
			},
			chunks: [],
			constructions: [],
			notes: [
				{
					type: 'culture',
					text: 'Salut is the casual hello between friends and people your own age. With strangers, shopkeepers, or anyone older, open with "Bonjour" instead — skipping it reads as rude in France.',
					anchor: 'Salut'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-01-l02',
			lessonId: 'fr-01',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Salut ! Ça va ?',
			naturalEnglish: 'Hi! How’s it going?',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-01.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 2000,
				endMs: 4500
			},
			chunks: [],
			constructions: ['fr-ca-va-greeting'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-01-l03',
			lessonId: 'fr-01',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Ça va bien, merci. Et toi ?',
			naturalEnglish: 'I’m good, thanks. And you?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-01.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 4500,
				endMs: 7500
			},
			chunks: [],
			constructions: ['fr-ca-va-greeting', 'fr-et-toi-turn'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-01-l04',
			lessonId: 'fr-01',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Ça va. Je m’appelle Antoine. Et toi ?',
			naturalEnglish: 'I’m fine. My name is Antoine. What about you?',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-01.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 7500,
				endMs: 11500
			},
			chunks: [
				{ label: 'Ça va.', startMs: 7500, endMs: 8600 },
				{ label: 'Je m’appelle Antoine.', startMs: 8600, endMs: 10400 },
				{ label: 'Et toi ?', startMs: 10400, endMs: 11500 }
			],
			constructions: ['fr-ca-va-greeting', 'fr-je-mappelle-name', 'fr-et-toi-turn'],
			notes: [
				{
					type: 'grammar',
					text: 'Je m’appelle literally means "I call myself" — the verb is s’appeler, and the m’ is "myself". So you are not saying "my name is"; you are saying what you call yourself.',
					anchor: 'Je m’appelle'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-01-l05',
			lessonId: 'fr-01',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Moi, je m’appelle Marie. Enchantée !',
			naturalEnglish: 'My name is Marie. Nice to meet you!',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-01.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 11500,
				endMs: 15000
			},
			chunks: [],
			constructions: ['fr-je-mappelle-name'],
			notes: [
				{
					type: 'pronunciation',
					text: 'Enchantée sounds exactly like the masculine enchanté — the extra -e is written, never heard. Say roughly "on-shon-TAY", with both nasal vowels and no final consonant.',
					anchor: 'Enchantée'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-01-l06',
			lessonId: 'fr-01',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Enchanté ! Tu es d’ici ?',
			naturalEnglish: 'Nice to meet you! Are you from here?',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-01.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 15000,
				endMs: 17800
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-01-l07',
			lessonId: 'fr-01',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Non, je suis de Lyon. Et toi ?',
			naturalEnglish: 'No, I’m from Lyon. And you?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-01.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 17800,
				endMs: 20800
			},
			chunks: [],
			constructions: ['fr-je-suis-de-place', 'fr-et-toi-turn'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-01-l08',
			lessonId: 'fr-01',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Moi, je suis de Marseille, mais j’habite ici maintenant.',
			naturalEnglish: 'I’m from Marseille, but I live here now.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-01.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 20800,
				endMs: 25300
			},
			chunks: [
				{ label: 'Moi, je suis de Marseille,', startMs: 20800, endMs: 23000 },
				{ label: 'mais j’habite ici maintenant.', startMs: 23000, endMs: 25300 }
			],
			constructions: ['fr-je-suis-de-place'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-01-l09',
			lessonId: 'fr-01',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Ah, super ! Bienvenue à Paris.',
			naturalEnglish: 'Oh, great! Welcome to Paris.',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-01.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 25300,
				endMs: 28300
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-01-l10',
			lessonId: 'fr-01',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Merci ! À bientôt, Marie.',
			naturalEnglish: 'Thanks! See you soon, Marie.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-01.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 28300,
				endMs: 31300
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
			id: 'fr-bonjour-greeting',
			language: 'fr',
			label: 'bonjour (greeting)',
			gloss: 'the default daytime greeting',
			introducedIn: 'fr-01'
		},
		{
			id: 'fr-je-mappelle-name',
			language: 'fr',
			label: 'je m’appelle + nom',
			gloss: 'stating your name ("I call myself …")',
			introducedIn: 'fr-01'
		},
		{
			id: 'fr-ca-va-greeting',
			language: 'fr',
			label: 'ça va ? / ça va (bien)',
			gloss: 'asking and answering "how’s it going?" with the same two words',
			introducedIn: 'fr-01'
		},
		{
			id: 'fr-je-suis-de-place',
			language: 'fr',
			label: 'je suis de + ville',
			gloss: 'saying where you are from',
			introducedIn: 'fr-01'
		},
		{
			id: 'fr-et-toi-turn',
			language: 'fr',
			label: 'et toi ?',
			gloss: 'bouncing a question back to the other person ("and you?")',
			introducedIn: 'fr-01'
		}
	],
	exercises: [
		{
			kind: 'comprehension',
			id: 'fr-01-e01',
			lessonId: 'fr-01',
			constructions: ['fr-je-suis-de-place'],
			prompt: 'Marie says: « Non, je suis de Lyon. Et toi ? » What is she saying?',
			lineId: 'fr-01-l07',
			options: [
				'No, I’m from Lyon. And you?',
				'No, I’m going to Lyon. See you!',
				'Yes, I live in Lyon with you.',
				'No, I don’t like Lyon at all.'
			],
			answerIndex: 0
		},
		{
			kind: 'recall',
			id: 'fr-01-e02',
			lessonId: 'fr-01',
			constructions: ['fr-je-mappelle-name'],
			prompt: 'Introduce yourself: say "My name is Marie."',
			lineId: 'fr-01-l05',
			acceptedAnswers: [
				'Je m’appelle Marie.',
				'Je m’appelle Marie',
				"Je m'appelle Marie.",
				"Je m'appelle Marie",
				'Moi, je m’appelle Marie.',
				"Moi, je m'appelle Marie."
			],
			canonicalAnswer: 'Je m’appelle Marie.',
			hints: ['Literally: "I call-myself …"', 'It starts with « Je m’… »']
		},
		{
			kind: 'completion',
			id: 'fr-01-e03',
			lessonId: 'fr-01',
			constructions: ['fr-je-suis-de-place'],
			prompt: 'Complete Antoine’s sentence about where he is from.',
			template: 'Moi, je ___ de Marseille.',
			options: ['suis', 'es', 'm’appelle'],
			answer: 'suis',
			rule: 'To say where you are from, use « je suis de + ville » — suis is the je form of être (to be).'
		},
		{
			kind: 'transfer',
			id: 'fr-01-e04',
			lessonId: 'fr-01',
			constructions: ['fr-je-suis-de-place', 'fr-et-toi-turn'],
			prompt: 'Tell your partner where you are from, then bounce the question back to them.',
			situation:
				'You are at a language exchange in Montreal. Someone you have just met asks « Tu es d’ici ? » — you are actually from Toronto.',
			useConstruction: 'fr-je-suis-de-place',
			exemplar: 'Non, je suis de Toronto. Et toi ?'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
