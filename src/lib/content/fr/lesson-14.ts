import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = {
	id: 'fr-14',
	language: 'fr',
	index: 14,
	kind: 'synthesis',
	title: 'Review: a Saturday plan',
	situation:
		'Review of lessons 8–13. Marie phones Antoine to confirm their Saturday market trip: likes and dislikes, a plan, a time, the bus, a favour, and how they are feeling — ending with a short performance where the learner plays one side of the call.',
	level: 'A1',
	lines: [
		{
			id: 'fr-14-l01',
			lessonId: 'fr-14',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Salut Antoine ! Samedi, on va faire le marché ensemble ?',
			naturalEnglish: 'Hi Antoine! Are we still doing the market together on Saturday?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-14.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 0,
				endMs: 3400
			},
			chunks: [],
			constructions: ['fr-on-va-inf-plan'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-14-l02',
			lessonId: 'fr-14',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Oui ! J’aime beaucoup le marché, mais je n’aime pas y aller trop tôt.',
			naturalEnglish: 'Yes! I really like the market, but I don’t like going too early.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-14.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 3400,
				endMs: 7600
			},
			chunks: [
				{ label: 'j’aime beaucoup le marché', startMs: 3400, endMs: 5300 },
				{ label: 'mais je n’aime pas', startMs: 5300, endMs: 6500 },
				{ label: 'y aller trop tôt', startMs: 6500, endMs: 7600 }
			],
			constructions: ['fr-jaime-noun', 'fr-je-naime-pas-dislike'],
			notes: [
				{
					type: 'grammar',
					text: 'The little word “y” stands in for the place already mentioned: “y aller” = “to go there”. It slots in right before the verb.',
					anchor: 'y aller'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-14-l03',
			lessonId: 'fr-14',
			language: 'fr',
			register: 'spoken',
			targetScript: 'D’accord. À quelle heure on part, alors ?',
			naturalEnglish: 'Okay. So what time are we leaving?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-14.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 7600,
				endMs: 10200
			},
			chunks: [],
			constructions: ['fr-a-quelle-heure'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-14-l04',
			lessonId: 'fr-14',
			language: 'fr',
			register: 'spoken',
			targetScript: 'À dix heures ? On prend le bus, c’est direct jusqu’au marché.',
			naturalEnglish: 'Ten o’clock? We’ll take the bus — it goes straight to the market.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-14.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 10200,
				endMs: 13900
			},
			chunks: [],
			constructions: ['fr-prendre-transport'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-14-l05',
			lessonId: 'fr-14',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Parfait. Tu peux m’aider à porter les sacs ? J’ai mal au dos cette semaine.',
			naturalEnglish: 'Perfect. Can you help me carry the bags? My back has been hurting this week.',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-14.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 13900,
				endMs: 18400
			},
			chunks: [
				{ label: 'tu peux m’aider', startMs: 13900, endMs: 15300 },
				{ label: 'à porter les sacs', startMs: 15300, endMs: 16800 },
				{ label: 'j’ai mal au dos', startMs: 16800, endMs: 18400 }
			],
			constructions: ['fr-vous-pouvez-inf', 'fr-avoir-mal-a'],
			notes: [
				{
					type: 'grammar',
					text: 'Between friends, “tu peux + infinitive ?” is the everyday way to ask for help. With strangers or in shops, switch to “vous pouvez … ?” or “pouvez-vous … ?”.',
					anchor: 'Tu peux m’aider'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-14-l06',
			lessonId: 'fr-14',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Bien sûr ! Et à part ça, tu te sens bien ?',
			naturalEnglish: 'Of course! And apart from that, are you feeling okay?',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-14.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 18400,
				endMs: 21400
			},
			chunks: [],
			constructions: ['fr-se-sentir-adj'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-14-l07',
			lessonId: 'fr-14',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Oui, je me sens bien, juste un peu fatiguée. À samedi, dix heures !',
			naturalEnglish: 'Yes, I feel fine, just a bit tired. See you Saturday, ten o’clock!',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-14.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 21400,
				endMs: 25200
			},
			chunks: [],
			constructions: ['fr-se-sentir-adj'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		}
	],
	constructions: [
		{
			id: 'fr-jaime-noun',
			language: 'fr',
			label: 'j’aime + noun/infinitive',
			gloss: 'Expressing likes: j’aime le marché, j’aime beaucoup danser.',
			introducedIn: 'fr-08'
		},
		{
			id: 'fr-je-naime-pas-dislike',
			language: 'fr',
			label: 'je n’aime pas …',
			gloss: 'Expressing dislikes: je n’aime pas y aller trop tôt.',
			introducedIn: 'fr-08'
		},
		{
			id: 'fr-on-va-inf-plan',
			language: 'fr',
			label: 'on va + infinitive',
			gloss: 'Making a plan with the near future: on va faire le marché samedi.',
			introducedIn: 'fr-09'
		},
		{
			id: 'fr-a-quelle-heure',
			language: 'fr',
			label: 'à quelle heure … ?',
			gloss: 'Asking about times and schedules: à quelle heure on part ?',
			introducedIn: 'fr-10'
		},
		{
			id: 'fr-prendre-transport',
			language: 'fr',
			label: 'prendre + le/la + transport',
			gloss: 'Taking a means of transport: on prend le bus, je prends le métro.',
			introducedIn: 'fr-11'
		},
		{
			id: 'fr-vous-pouvez-inf',
			language: 'fr',
			label: 'tu peux + infinitive ? (asking for help)',
			gloss: 'Informal request for help: tu peux m’aider à porter les sacs ?',
			introducedIn: 'fr-12'
		},
		{
			id: 'fr-se-sentir-adj',
			language: 'fr',
			label: 'je me sens + adjective',
			gloss: 'Saying how you feel with the reflexive verb “se sentir”: je me sens fatigué / nerveux / bien.',
			introducedIn: 'fr-13'
		},
		{
			id: 'fr-avoir-mal-a',
			language: 'fr',
			label: 'avoir mal à + body part',
			gloss: 'Describing pain: j’ai mal à la tête, j’ai mal au dos — literally “I have pain at the …”.',
			introducedIn: 'fr-13'
		}
	],
	exercises: [
		{
			kind: 'comprehension',
			id: 'fr-14-ex01',
			lessonId: 'fr-14',
			constructions: ['fr-vous-pouvez-inf', 'fr-avoir-mal-a'],
			prompt: 'Marie says: “Tu peux m’aider à porter les sacs ? J’ai mal au dos cette semaine.” Why does she ask for help?',
			lineId: 'fr-14-l05',
			options: [
				'Because her back hurts this week.',
				'Because the bags are at Antoine’s place.',
				'Because she is late for the bus.',
				'Because she doesn’t like the market.'
			],
			answerIndex: 0
		},
		{
			kind: 'recall',
			id: 'fr-14-ex02',
			lessonId: 'fr-14',
			constructions: ['fr-a-quelle-heure'],
			prompt: 'Ask in French: “What time are we leaving?”',
			lineId: 'fr-14-l03',
			acceptedAnswers: [
				'À quelle heure on part ?',
				'À quelle heure on part, alors ?',
				'On part à quelle heure ?',
				'À quelle heure est-ce qu’on part ?'
			],
			canonicalAnswer: 'À quelle heure on part ?',
			hints: ['Start with “À quelle heure …”', '“to leave” here is “partir” → “on part”']
		},
		{
			kind: 'recall',
			id: 'fr-14-ex03',
			lessonId: 'fr-14',
			constructions: ['fr-prendre-transport'],
			prompt: 'Say in French: “We’ll take the bus.”',
			lineId: 'fr-14-l04',
			acceptedAnswers: ['On prend le bus.', 'Nous prenons le bus.', 'On prend le bus'],
			canonicalAnswer: 'On prend le bus.',
			hints: ['Use “prendre” for transport', 'Spoken French prefers “on” to “nous”']
		},
		{
			kind: 'transfer',
			id: 'fr-14-ex04',
			lessonId: 'fr-14',
			constructions: ['fr-vous-pouvez-inf'],
			prompt: 'Ask a friend for help in a new situation.',
			situation:
				'You are moving to a new flat on Sunday and there are a lot of boxes. Ask your friend for help carrying them.',
			useConstruction: 'fr-vous-pouvez-inf',
			exemplar: 'Tu peux m’aider à porter les cartons dimanche ?'
		},
		{
			kind: 'transfer',
			id: 'fr-14-ex05',
			lessonId: 'fr-14',
			constructions: [
				'fr-jaime-noun',
				'fr-on-va-inf-plan',
				'fr-a-quelle-heure',
				'fr-prendre-transport',
				'fr-se-sentir-adj'
			],
			prompt: 'Short performance: play Marie’s side of a new phone call.',
			situation:
				'Perform your own version of the call: phone a friend, propose going to the cinema on Friday (say you like the cinema), agree on a time, decide which transport to take, and say how you are feeling today. Speak 4–5 sentences out loud.',
			useConstruction: 'fr-on-va-inf-plan',
			exemplar:
				'Salut ! Vendredi, on va au cinéma ensemble ? J’aime beaucoup ce cinéma. On part à sept heures et on prend le métro ? Moi, je me sens en forme aujourd’hui !'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
