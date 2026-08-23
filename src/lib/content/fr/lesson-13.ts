import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = {
	id: 'fr-13',
	language: 'fr',
	index: 13,
	kind: 'regular',
	title: 'Describing how one feels',
	situation:
		'Marie runs into Antoine at the office kitchen. He looks exhausted, and she asks him how he is feeling.',
	level: 'A1',
	lines: [
		{
			id: 'fr-13-l01',
			lessonId: 'fr-13',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Antoine, ça ne va pas ? Tu as l’air fatigué.',
			naturalEnglish: 'Antoine, is something wrong? You look tired.',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-13.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 0,
				endMs: 3200
			},
			chunks: [],
			constructions: ['fr-avoir-l-air-adj'],
			notes: [
				{
					type: 'grammar',
					text: '“Tu as l’air + adjective” means “you look/seem …”. The adjective agrees with the person you are describing: “tu as l’air fatiguée” for a woman.',
					anchor: 'Tu as l’air fatigué'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-13-l02',
			lessonId: 'fr-13',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Oui, je me sens vraiment fatigué aujourd’hui.',
			naturalEnglish: 'Yeah, I feel really tired today.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-13.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 3200,
				endMs: 6400
			},
			chunks: [],
			constructions: ['fr-se-sentir-adj'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-13-l03',
			lessonId: 'fr-13',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Et en plus, j’ai mal à la tête depuis ce matin.',
			naturalEnglish: 'And on top of that, I’ve had a headache since this morning.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-13.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 6400,
				endMs: 10100
			},
			chunks: [
				{ label: 'et en plus', startMs: 6400, endMs: 7400 },
				{ label: 'j’ai mal à la tête', startMs: 7400, endMs: 8900 },
				{ label: 'depuis ce matin', startMs: 8900, endMs: 10100 }
			],
			constructions: ['fr-avoir-mal-a'],
			notes: [
				{
					type: 'grammar',
					text: 'French says “to have pain at” a body part: “j’ai mal à la tête” (head), “au ventre” (stomach), “aux jambes” (legs). “À” contracts with the article: à + le → au, à + les → aux.',
					anchor: 'j’ai mal à la tête'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-13-l04',
			lessonId: 'fr-13',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Oh là là. Tu es malade, tu crois ?',
			naturalEnglish: 'Oh no. Do you think you’re sick?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-13.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 10100,
				endMs: 12600
			},
			chunks: [],
			constructions: ['fr-etre-adj-etat'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-13-l05',
			lessonId: 'fr-13',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Non, je ne suis pas malade. Je suis juste très stressé en ce moment.',
			naturalEnglish: 'No, I’m not sick. I’m just really stressed at the moment.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-13.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 12600,
				endMs: 16900
			},
			chunks: [
				{ label: 'je ne suis pas malade', startMs: 12600, endMs: 14300 },
				{ label: 'je suis juste très stressé', startMs: 14300, endMs: 15900 },
				{ label: 'en ce moment', startMs: 15900, endMs: 16900 }
			],
			constructions: ['fr-etre-adj-etat'],
			notes: [
				{
					type: 'pronunciation',
					text: 'In everyday speech the “ne” often disappears: you will hear “je suis pas malade”. Both are fine; the full “ne … pas” is safer when writing.',
					anchor: 'je ne suis pas malade'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-13-l06',
			lessonId: 'fr-13',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Le travail, c’est beaucoup en ce moment ?',
			naturalEnglish: 'Is work a lot right now?',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-13.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 16900,
				endMs: 19400
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-13-l07',
			lessonId: 'fr-13',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Oui, et je dors mal. Je me sens un peu nerveux le soir.',
			naturalEnglish: 'Yes, and I’m sleeping badly. I feel a bit on edge in the evening.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-13.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 19400,
				endMs: 23200
			},
			chunks: [],
			constructions: ['fr-se-sentir-adj'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-13-l08',
			lessonId: 'fr-13',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Bois un thé et rentre tôt ce soir. Le repos, ça aide.',
			naturalEnglish: 'Have a tea and go home early tonight. Rest helps.',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-13.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 23200,
				endMs: 26600
			},
			chunks: [],
			constructions: [],
			notes: [
				{
					type: 'culture',
					text: 'Herbal tea (“une tisane”) is the classic French home remedy for stress or poor sleep — offering one is a small gesture of care.',
					anchor: 'Bois un thé'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-13-l09',
			lessonId: 'fr-13',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Tu as raison. Merci, Marie. Ça va déjà mieux.',
			naturalEnglish: 'You’re right. Thanks, Marie. I already feel better.',
			speaker: 'Antoine',
			audio: {
				normalUrl: '/audio/fr/fr-13.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 26600,
				endMs: 29800
			},
			chunks: [],
			constructions: ['fr-ca-va-mieux'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'fr-13-l10',
			lessonId: 'fr-13',
			language: 'fr',
			register: 'spoken',
			targetScript: 'Super. Et si demain ça ne va pas mieux, va chez le médecin !',
			naturalEnglish: 'Great. And if it’s not better tomorrow, go see the doctor!',
			speaker: 'Marie',
			audio: {
				normalUrl: '/audio/fr/fr-13.mp3',
				speakerId: 'fr-speaker-1',
				startMs: 29800,
				endMs: 33400
			},
			chunks: [],
			constructions: ['fr-ca-va-mieux'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		}
	],
	constructions: [
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
			gloss: 'Describing pain: j’ai mal à la tête, j’ai mal au ventre — literally “I have pain at the …”.',
			introducedIn: 'fr-13'
		},
		{
			id: 'fr-etre-adj-etat',
			language: 'fr',
			label: 'être + state adjective',
			gloss: 'States with “être”: je suis malade / stressé / content — the adjective agrees with the speaker.',
			introducedIn: 'fr-13'
		},
		{
			id: 'fr-avoir-l-air-adj',
			language: 'fr',
			label: 'avoir l’air + adjective',
			gloss: 'Saying how someone looks or seems: tu as l’air fatigué, elle a l’air contente.',
			introducedIn: 'fr-13'
		},
		{
			id: 'fr-ca-va-mieux',
			language: 'fr',
			label: 'ça va mieux',
			gloss: 'Saying things are improving: ça va mieux / ça va déjà mieux — “it’s (already) better”.',
			introducedIn: 'fr-13'
		}
	],
	exercises: [
		{
			kind: 'comprehension',
			id: 'fr-13-ex01',
			lessonId: 'fr-13',
			constructions: ['fr-avoir-mal-a'],
			prompt: 'Antoine says: “Et en plus, j’ai mal à la tête depuis ce matin.” What is he telling Marie?',
			lineId: 'fr-13-l03',
			options: [
				'He has had a headache since this morning.',
				'He hurt his hand this morning.',
				'He has been at work since this morning.',
				'He forgot his tea this morning.'
			],
			answerIndex: 0
		},
		{
			kind: 'comprehension',
			id: 'fr-13-ex02',
			lessonId: 'fr-13',
			constructions: ['fr-etre-adj-etat'],
			prompt: 'Antoine says: “Non, je ne suis pas malade. Je suis juste très stressé en ce moment.” What does he mean?',
			lineId: 'fr-13-l05',
			options: [
				'He is sick and stressed.',
				'He is not sick, just very stressed right now.',
				'He was sick last week.',
				'He is never stressed at work.'
			],
			answerIndex: 1
		},
		{
			kind: 'recall',
			id: 'fr-13-ex03',
			lessonId: 'fr-13',
			constructions: ['fr-se-sentir-adj'],
			prompt: 'Say in French: “I feel really tired today.”',
			lineId: 'fr-13-l02',
			acceptedAnswers: [
				'Je me sens vraiment fatigué aujourd’hui.',
				'Je me sens vraiment fatiguée aujourd’hui.',
				'Je me sens très fatigué aujourd’hui.',
				'Je me sens très fatiguée aujourd’hui.'
			],
			canonicalAnswer: 'Je me sens vraiment fatigué aujourd’hui.',
			hints: ['Start with “Je me sens …”', '“really” here is “vraiment” (or “très” = very)']
		},
		{
			kind: 'recall',
			id: 'fr-13-ex04',
			lessonId: 'fr-13',
			constructions: ['fr-avoir-mal-a'],
			prompt: 'Say in French: “I have a headache.”',
			acceptedAnswers: ['J’ai mal à la tête.', 'Jai mal a la tete.', 'J’ai mal à la tête'],
			canonicalAnswer: 'J’ai mal à la tête.',
			hints: ['French uses “avoir mal à + body part”', 'Head = “la tête”']
		},
		{
			kind: 'completion',
			id: 'fr-13-ex05',
			lessonId: 'fr-13',
			constructions: ['fr-avoir-mal-a'],
			prompt: 'Complete the sentence: your stomach hurts.',
			template: 'J’ai mal ___ ventre.',
			options: ['au', 'à la', 'aux', 'à'],
			answer: 'au',
			rule: '“À” contracts with the masculine article “le”: à + le ventre → au ventre. Feminine keeps “à la” (à la tête), plural becomes “aux” (aux jambes).'
		},
		{
			kind: 'transfer',
			id: 'fr-13-ex06',
			lessonId: 'fr-13',
			constructions: ['fr-se-sentir-adj'],
			prompt: 'Tell your friend how you feel before the exam.',
			situation:
				'It is the morning of your French exam and a friend asks how you are doing. Say that you feel a bit nervous.',
			useConstruction: 'fr-se-sentir-adj',
			exemplar: 'Je me sens un peu nerveux ce matin.'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
