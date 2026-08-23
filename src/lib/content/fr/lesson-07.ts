import type { Lesson } from '../../schemas/content';

/**
 * Lesson 7 — SYNTHESIS review of lessons 1–6.
 *
 * Recombines: greetings & introductions (1), ordering coffee (2),
 * numbers & paying (3), asking where something is (4), family (5),
 * daily routine (6) into one café scene. No new constructions; every
 * construction below is re-declared verbatim with `introducedIn`
 * pointing at its original lesson.
 */
export const lesson: Lesson = {
	id: 'fr-07',
	language: 'fr',
	index: 7,
	kind: 'synthesis',
	title: 'Un café avec Camille',
	situation:
		'Marie runs into Antoine at a café. He introduces his sister Camille; they order, pay, and chat about mornings.',
	level: 'A0',
	lines: [
		{
			id: 'fr-07-l01',
			lessonId: 'fr-07',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Bonjour Antoine ! Ça va ?',
			naturalEnglish: 'Hi Antoine! How are you?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-07.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 0,
				endMs: 2400
			},
			chunks: [],
			constructions: ['fr-bonjour-greeting', 'fr-ca-va-greeting'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-07-l02',
			lessonId: 'fr-07',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Ça va bien, merci ! Je te présente ma sœur, Camille.',
			naturalEnglish: "I'm doing well, thanks! Let me introduce my sister, Camille.",
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-07.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 2400,
				endMs: 6600
			},
			chunks: [
				{ label: 'Ça va bien, merci !', startMs: 2400, endMs: 4200 },
				{ label: 'Je te présente ma sœur, Camille.', startMs: 4200, endMs: 6600 }
			],
			constructions: ['fr-ca-va-greeting', 'fr-cest-mon-ma-noun'],
			notes: [
				{
					type: 'grammar',
					text: 'Possessives agree with the noun, not the owner: "sœur" is feminine, so it is "ma sœur" — whether a man or a woman is speaking.',
					anchor: 'ma sœur'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-07-l03',
			lessonId: 'fr-07',
			language: 'fr',
			register: 'spoken',
			targetScript: "Enchantée ! Moi, je m'appelle Marie.",
			naturalEnglish: "Nice to meet you! I'm Marie.",
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-07.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 6600,
				endMs: 9400
			},
			chunks: [],
			constructions: ['fr-je-mappelle-name'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-07-l04',
			lessonId: 'fr-07',
			language: 'fr',
			register: 'spoken',
			targetScript: "On commande ? Je voudrais un café et un croissant, s'il vous plaît.",
			naturalEnglish: "Shall we order? I'd like a coffee and a croissant, please.",
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-07.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 9400,
				endMs: 14200
			},
			chunks: [
				{ label: 'On commande ?', startMs: 9400, endMs: 10800 },
				{ label: 'Je voudrais un café et un croissant', startMs: 10800, endMs: 13100 },
				{ label: "s'il vous plaît", startMs: 13100, endMs: 14200 }
			],
			constructions: ['fr-je-voudrais-noun', 'fr-sil-vous-plait-politeness'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-07-l05',
			lessonId: 'fr-07',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Bien sûr. Ça fait quatre euros cinquante.',
			naturalEnglish: 'Of course. That comes to four euros fifty.',
			speaker: 'Le serveur',
			audio: {
				normalUrl: '/audio/fr/fr-07.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 14200,
				endMs: 17400
			},
			chunks: [],
			constructions: ['fr-ca-fait-amount'],
			notes: [
				{
					type: 'culture',
					text: 'Prices are spoken without "et" between euros and cents: "quatre euros cinquante", not "quatre euros et cinquante".',
					anchor: 'quatre euros cinquante'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-07-l06',
			lessonId: 'fr-07',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Pardon, où sont les toilettes ?',
			naturalEnglish: 'Excuse me, where is the bathroom?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-07.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 17400,
				endMs: 19900
			},
			chunks: [],
			constructions: ['fr-ou-est-question'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-07-l07',
			lessonId: 'fr-07',
			language: 'fr',
			register: 'spoken',
			targetScript: "C'est à gauche, juste à côté de la porte.",
			naturalEnglish: "It's on the left, right next to the door.",
			speaker: 'Le serveur',
			audio: {
				normalUrl: '/audio/fr/fr-07.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 19900,
				endMs: 22900
			},
			chunks: [],
			constructions: ['fr-cest-a-location'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-07-l08',
			lessonId: 'fr-07',
			language: 'fr',
			register: 'spoken',
			targetScript:
				'Moi, je me lève à sept heures tous les matins pour venir ici avant le travail.',
			naturalEnglish: 'Me, I get up at seven every morning to come here before work.',
			speaker: 'Camille',
			audio: {
				normalUrl: '/audio/fr/fr-07.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 22900,
				endMs: 27700
			},
			chunks: [
				{ label: 'Moi, je me lève à sept heures', startMs: 22900, endMs: 25000 },
				{ label: 'tous les matins', startMs: 25000, endMs: 25900 },
				{ label: 'pour venir ici avant le travail', startMs: 25900, endMs: 27700 }
			],
			constructions: ['fr-reflexive-daily', 'fr-a-plus-heure'],
			notes: [
				{
					type: 'pronunciation',
					text: 'Liaison: "sept heures" is pronounced as one flow, "sè-teur" — the final t of "sept" links onto "heures".',
					anchor: 'sept heures'
				}
			],
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
			gloss: 'hello / good day — the default daytime greeting',
			introducedIn: 'fr-01'
		},
		{
			id: 'fr-ca-va-greeting',
			language: 'fr',
			label: 'ça va ? / ça va bien',
			gloss: 'how are you? / I am fine — asking and answering how someone is',
			introducedIn: 'fr-01'
		},
		{
			id: 'fr-je-mappelle-name',
			language: 'fr',
			label: "je m'appelle + name",
			gloss: 'my name is … (lit. "I call myself …")',
			introducedIn: 'fr-01'
		},
		{
			id: 'fr-je-voudrais-noun',
			language: 'fr',
			label: 'je voudrais + noun',
			gloss: 'I would like … — polite ordering/requesting',
			introducedIn: 'fr-02'
		},
		{
			id: 'fr-sil-vous-plait-politeness',
			language: 'fr',
			label: "s'il vous plaît",
			gloss: 'please (formal/plural) — softens a request',
			introducedIn: 'fr-02'
		},
		{
			id: 'fr-ca-fait-amount',
			language: 'fr',
			label: 'ça fait + price',
			gloss: 'that comes to … — stating a total to pay',
			introducedIn: 'fr-03'
		},
		{
			id: 'fr-ou-est-question',
			language: 'fr',
			label: 'où est / où sont … ?',
			gloss: 'where is / where are …? — asking for a location',
			introducedIn: 'fr-04'
		},
		{
			id: 'fr-cest-a-location',
			language: 'fr',
			label: "c'est à + location",
			gloss: 'it is on/at … — giving a location (à gauche, à côté de …)',
			introducedIn: 'fr-04'
		},
		{
			id: 'fr-cest-mon-ma-noun',
			language: 'fr',
			label: 'mon / ma / mes + family member',
			gloss: 'my … — possessives agreeing with the noun',
			introducedIn: 'fr-05'
		},
		{
			id: 'fr-reflexive-daily',
			language: 'fr',
			label: 'je me lève (reflexive daily-routine verb)',
			gloss: 'I get up — reflexive pronoun + verb for routine actions',
			introducedIn: 'fr-06'
		},
		{
			id: 'fr-a-plus-heure',
			language: 'fr',
			label: 'à + clock time',
			gloss: 'at … o’clock — saying when something happens',
			introducedIn: 'fr-06'
		}
	],
	exercises: [
		{
			id: 'fr-07-e01',
			kind: 'comprehension',
			lessonId: 'fr-07',
			constructions: ['fr-ca-fait-amount'],
			prompt: 'The server says « Ça fait quatre euros cinquante. » What does he mean?',
			lineId: 'fr-07-l05',
			options: [
				'The total is four euros fifty.',
				'The café opens at four fifty.',
				'He is bringing four croissants and fifty coffees.',
				'Table four is free in fifty minutes.'
			],
			answerIndex: 0
		},
		{
			id: 'fr-07-e02',
			kind: 'recall',
			lessonId: 'fr-07',
			constructions: ['fr-je-voudrais-noun', 'fr-sil-vous-plait-politeness'],
			prompt: 'Order a coffee politely.',
			lineId: 'fr-07-l04',
			acceptedAnswers: [
				"Je voudrais un café, s'il vous plaît.",
				"Je voudrais un café s'il vous plaît",
				'Je voudrais un café.',
				"Un café, s'il vous plaît."
			],
			canonicalAnswer: "Je voudrais un café, s'il vous plaît.",
			hints: ['Start with « Je voudrais… »', "End with « s'il vous plaît »."]
		},
		{
			id: 'fr-07-e03',
			kind: 'completion',
			lessonId: 'fr-07',
			constructions: ['fr-ou-est-question'],
			prompt: 'Complete the question you would ask to find the train station.',
			template: 'Pardon, ___ est la gare ?',
			options: ['où', 'qui', 'quand'],
			answer: 'où',
			rule: '« Où » asks for a place: « Où est… ? » = "Where is…?" (« qui » = who, « quand » = when).'
		},
		{
			id: 'fr-07-e04',
			kind: 'transfer',
			lessonId: 'fr-07',
			constructions: ['fr-je-voudrais-noun', 'fr-sil-vous-plait-politeness'],
			prompt: 'What do you say to the baker?',
			situation:
				'You are at a bakery, not a café. You want a baguette and two croissants.',
			useConstruction: 'fr-je-voudrais-noun',
			exemplar: "Je voudrais une baguette et deux croissants, s'il vous plaît."
		},
		{
			id: 'fr-07-e05',
			kind: 'transfer',
			lessonId: 'fr-07',
			constructions: ['fr-ou-est-question'],
			prompt: 'What do you ask a passer-by?',
			situation:
				'You have just left the café and you are looking for the metro station.',
			useConstruction: 'fr-ou-est-question',
			exemplar: 'Pardon, où est la station de métro ?'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
