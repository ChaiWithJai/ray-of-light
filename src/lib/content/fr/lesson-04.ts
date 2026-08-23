import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = {
	id: 'fr-04',
	language: 'fr',
	index: 4,
	kind: 'regular',
	title: 'Asking where something is',
	situation: 'Léa stops a passer-by in the street to find a pharmacy and the metro.',
	level: 'A0',
	lines: [
		{
			id: 'fr-04-l01',
			lessonId: 'fr-04',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Excusez-moi, monsieur. Je cherche une pharmacie.',
			naturalEnglish: "Excuse me, sir. I'm looking for a pharmacy.",
			speaker: 'Léa',
			audio: {
				normalUrl: '/audio/fr/fr-04.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 0,
				endMs: 3600
			},
			chunks: [
				{ label: 'Excusez-moi, monsieur', startMs: 0, endMs: 1800 },
				{ label: 'Je cherche une pharmacie', startMs: 1800, endMs: 3600 }
			],
			constructions: ['fr-je-cherche-noun'],
			notes: [
				{
					type: 'culture',
					text: 'Always open with "Excusez-moi, monsieur / madame" before asking a stranger anything — launching straight into the question sounds abrupt in France.',
					anchor: 'Excusez-moi'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-04-l02',
			lessonId: 'fr-04',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Une pharmacie ? Il y en a une rue de la Gare, juste à côté de la boulangerie.',
			naturalEnglish: "A pharmacy? There's one on Rue de la Gare, right next to the bakery.",
			speaker: 'Karim',
			audio: {
				normalUrl: '/audio/fr/fr-04.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 3600,
				endMs: 8400
			},
			chunks: [
				{ label: 'Une pharmacie ?', startMs: 3600, endMs: 4600 },
				{ label: 'Il y en a une rue de la Gare', startMs: 4600, endMs: 6600 },
				{ label: 'juste à côté de la boulangerie', startMs: 6600, endMs: 8400 }
			],
			constructions: ['fr-il-y-a-existence', 'fr-a-cote-de-location'],
			notes: [
				{
					type: 'grammar',
					text: '"Il y en a une" = "there is one (of them)". For now, treat it as a fixed chunk answering "is there a…?" — the little word "en" replaces the thing already mentioned.',
					anchor: 'Il y en a une'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-04-l03',
			lessonId: 'fr-04',
			language: 'fr',
			register: 'spoken',
			targetScript: "C'est loin d'ici ?",
			naturalEnglish: 'Is it far from here?',
			speaker: 'Léa',
			audio: {
				normalUrl: '/audio/fr/fr-04.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 8400,
				endMs: 10800
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-04-l04',
			lessonId: 'fr-04',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Non, non, c’est à cinq minutes à pied. Vous continuez tout droit.',
			naturalEnglish: 'No, no, it’s five minutes on foot. You keep going straight ahead.',
			speaker: 'Karim',
			audio: {
				normalUrl: '/audio/fr/fr-04.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 10800,
				endMs: 14800
			},
			chunks: [],
			constructions: ['fr-directions-chunk'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-04-l05',
			lessonId: 'fr-04',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Et après, vous tournez à gauche à la boulangerie. La pharmacie est juste là.',
			naturalEnglish: 'And then you turn left at the bakery. The pharmacy is right there.',
			speaker: 'Karim',
			audio: {
				normalUrl: '/audio/fr/fr-04.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 14800,
				endMs: 19400
			},
			chunks: [
				{ label: 'Et après, vous tournez à gauche', startMs: 14800, endMs: 16800 },
				{ label: 'à la boulangerie', startMs: 16800, endMs: 17900 },
				{ label: 'La pharmacie est juste là', startMs: 17900, endMs: 19400 }
			],
			constructions: ['fr-directions-chunk'],
			notes: [
				{
					type: 'pronunciation',
					text: '"Gauche" rhymes with "oh" plus "sh": [goʃ]. Keep "à gauche" and "à droite" as ready-made chunks — you will hear them in every set of directions.',
					anchor: 'à gauche'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-04-l06',
			lessonId: 'fr-04',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Parfait, merci. Et où est la station de métro, s’il vous plaît ?',
			naturalEnglish: 'Perfect, thanks. And where is the metro station, please?',
			speaker: 'Léa',
			audio: {
				normalUrl: '/audio/fr/fr-04.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 19400,
				endMs: 23400
			},
			chunks: [],
			constructions: ['fr-ou-est-question'],
			notes: [
				{
					type: 'grammar',
					text: '"Où est + singular noun ?" is the direct way to ask where something is. With a plural, the verb changes: "Où sont les toilettes ?".',
					anchor: 'où est la station'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-04-l07',
			lessonId: 'fr-04',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Le métro ? C’est de l’autre côté, en face du supermarché.',
			naturalEnglish: 'The metro? It’s on the other side, opposite the supermarket.',
			speaker: 'Karim',
			audio: {
				normalUrl: '/audio/fr/fr-04.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 23400,
				endMs: 27400
			},
			chunks: [],
			constructions: ['fr-a-cote-de-location'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-04-l08',
			lessonId: 'fr-04',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Il y a aussi un arrêt de bus près d’ici ?',
			naturalEnglish: 'Is there also a bus stop near here?',
			speaker: 'Léa',
			audio: {
				normalUrl: '/audio/fr/fr-04.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 27400,
				endMs: 30600
			},
			chunks: [],
			constructions: ['fr-il-y-a-existence'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-04-l09',
			lessonId: 'fr-04',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Oui, juste devant la station. Vous ne pouvez pas le rater.',
			naturalEnglish: 'Yes, right in front of the station. You can’t miss it.',
			speaker: 'Karim',
			audio: {
				normalUrl: '/audio/fr/fr-04.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 30600,
				endMs: 34200
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-04-l10',
			lessonId: 'fr-04',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Merci beaucoup, monsieur. Bonne journée !',
			naturalEnglish: 'Thank you very much, sir. Have a good day!',
			speaker: 'Léa',
			audio: {
				normalUrl: '/audio/fr/fr-04.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 34200,
				endMs: 36800
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
			id: 'fr-cest-a-location',
			language: 'fr',
			label: 'c’est à + location',
			gloss: 'it’s at/on + location',
			introducedIn: 'fr-04'
		},
		{
			id: 'fr-ou-est-question',
			language: 'fr',
			label: 'où est + noun ?',
			gloss: 'where is the X?',
			introducedIn: 'fr-04',
			notes: 'Direct location question; plural takes "où sont…".'
		},
		{
			id: 'fr-je-cherche-noun',
			language: 'fr',
			label: 'je cherche + noun',
			gloss: 'I am looking for + noun (polite way to open a where-question)',
			introducedIn: 'fr-04',
			notes: 'Stating what you are looking for invites directions without a direct interrogative.'
		},
		{
			id: 'fr-il-y-a-existence',
			language: 'fr',
			label: 'il y a + noun',
			gloss: 'there is / there are; "il y a … ?" with rising intonation asks "is there…?"',
			introducedIn: 'fr-04',
			notes: 'Invariable chunk regardless of singular or plural.'
		},
		{
			id: 'fr-a-cote-de-location',
			language: 'fr',
			label: 'à côté de / en face de + place',
			gloss: 'next to / opposite + place',
			introducedIn: 'fr-04',
			notes: '"De" contracts: "du supermarché", "de la boulangerie", "de l\'hôtel".'
		},
		{
			id: 'fr-directions-chunk',
			language: 'fr',
			label: 'tout droit / à gauche / à droite',
			gloss: 'straight ahead / to the left / to the right, with "vous continuez / vous tournez"',
			introducedIn: 'fr-04',
			notes: 'The three direction chunks every street answer is built from.'
		}
	],
	exercises: [
		{
			kind: 'comprehension',
			id: 'fr-04-e01',
			lessonId: 'fr-04',
			constructions: ['fr-directions-chunk'],
			prompt: 'Karim says: "Et après, vous tournez à gauche à la boulangerie." What should Léa do at the bakery?',
			lineId: 'fr-04-l05',
			options: ['Keep going straight', 'Turn left', 'Turn right', 'Cross the street'],
			answerIndex: 1
		},
		{
			kind: 'comprehension',
			id: 'fr-04-e02',
			lessonId: 'fr-04',
			constructions: ['fr-a-cote-de-location'],
			prompt: 'Where is the metro station, according to Karim?',
			lineId: 'fr-04-l07',
			options: [
				'Next to the bakery',
				'Five minutes past the pharmacy',
				'On the other side, opposite the supermarket'
			],
			answerIndex: 2
		},
		{
			kind: 'recall',
			id: 'fr-04-e03',
			lessonId: 'fr-04',
			constructions: ['fr-ou-est-question'],
			prompt: 'Ask where the metro station is (politely).',
			lineId: 'fr-04-l06',
			acceptedAnswers: [
				'Où est la station de métro, s’il vous plaît ?',
				'Où est la station de métro ?',
				'Où est le métro, s’il vous plaît ?',
				'Où est le métro ?'
			],
			canonicalAnswer: 'Où est la station de métro, s’il vous plaît ?',
			hints: ['Start with "où est…"', 'Add "s’il vous plaît" to soften it.']
		},
		{
			kind: 'recall',
			id: 'fr-04-e04',
			lessonId: 'fr-04',
			constructions: ['fr-je-cherche-noun'],
			prompt: 'Stop a stranger and say you are looking for a pharmacy.',
			lineId: 'fr-04-l01',
			acceptedAnswers: [
				'Excusez-moi, je cherche une pharmacie.',
				'Excusez-moi, monsieur, je cherche une pharmacie.',
				'Je cherche une pharmacie.'
			],
			canonicalAnswer: 'Excusez-moi, je cherche une pharmacie.',
			hints: ['Open with "excusez-moi".']
		},
		{
			kind: 'completion',
			id: 'fr-04-e05',
			lessonId: 'fr-04',
			constructions: ['fr-il-y-a-existence'],
			prompt: 'Complete the question about a bank nearby.',
			template: '___ une banque près d’ici ?',
			options: ['Il y a', 'Où est', 'C’est combien'],
			answer: 'Il y a',
			rule: 'Asking whether something exists nearby uses "il y a + noun ?"; "où est" asks for the location of a specific known thing.'
		},
		{
			kind: 'transfer',
			id: 'fr-04-e06',
			lessonId: 'fr-04',
			constructions: ['fr-ou-est-question'],
			prompt: 'Ask where something new is.',
			situation: 'You are in a café and need the toilets. Ask a waiter where they are — careful, "les toilettes" is plural.',
			useConstruction: 'fr-ou-est-question',
			exemplar: 'Où sont les toilettes, s’il vous plaît ?'
		},
		{
			kind: 'transfer',
			id: 'fr-04-e07',
			lessonId: 'fr-04',
			constructions: ['fr-il-y-a-existence'],
			prompt: 'Ask whether something exists nearby.',
			situation: 'Your phone is dead and you need cash. Ask a passer-by if there is an ATM ("un distributeur") near here.',
			useConstruction: 'fr-il-y-a-existence',
			exemplar: 'Il y a un distributeur près d’ici ?'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
