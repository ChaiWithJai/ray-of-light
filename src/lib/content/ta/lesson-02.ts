import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = {
	id: 'ta-02',
	language: 'ta',
	index: 2,
	kind: 'regular',
	title: 'Ordering tea & coffee',
	situation:
		'Priya stops at a roadside tea kadai in Mylapore and orders from Murugan, the tea-shop anna.',
	level: 'A0',
	lines: [
		{
			id: 'ta-02-l01',
			lessonId: 'ta-02',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அண்ணா, ஒரு டீ குடுங்க.',
			transliteration: 'aṇṇaa, oru tea kuḍunga.',
			literalEnglish: 'elder-brother, one tea give(polite).',
			naturalEnglish: 'Anna, one tea please.',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-02.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 0,
				endMs: 2600
			},
			chunks: [],
			constructions: ['ta-kudunga-request'],
			notes: [
				{
					type: 'culture',
					text: 'அண்ணா ("elder brother") is the standard friendly way to address a tea-shop or auto man in Chennai. No word for "please" is needed — the polite -nga ending on குடுங்க does that work.',
					anchor: 'அண்ணா'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-02-l02',
			lessonId: 'ta-02',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'சரிங்க. ஸ்ட்ராங்கா வேணுமா, லைட்டா வேணுமா?',
			transliteration: 'sari-nga. strong-aa veeṇumaa, light-aa veeṇumaa?',
			literalEnglish: 'okay(polite). strong-ly want-QUESTION, light-ly want-QUESTION?',
			naturalEnglish: 'Sure. Do you want it strong or light?',
			speaker: 'Murugan',
			audio: {
				normalUrl: '/audio/ta/ta-02.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 2600,
				endMs: 6200
			},
			chunks: [
				{ label: 'சரிங்க', startMs: 2600, endMs: 3600 },
				{ label: 'ஸ்ட்ராங்கா வேணுமா, லைட்டா வேணுமா?', startMs: 3600, endMs: 6200 }
			],
			constructions: ['ta-veenum-want', 'ta-aa-yesno-question'],
			notes: [
				{
					type: 'grammar',
					text: 'An either/or question in spoken Tamil is just two -aa questions in a row: veeṇumaa, veeṇumaa? — "want? want?" — and the listener picks one.',
					anchor: 'வேணுமா, லைட்டா வேணுமா'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-02-l03',
			lessonId: 'ta-02',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ஸ்ட்ராங்கா வேணும். சர்க்கரை கம்மியா போடுங்க.',
			transliteration: 'strong-aa veeṇum. sakkarai kammiyaa pooḍunga.',
			literalEnglish: 'strong-ly want. sugar less-ly put(polite).',
			naturalEnglish: 'Strong, please. And go easy on the sugar.',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-02.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 6200,
				endMs: 9800
			},
			chunks: [],
			constructions: ['ta-veenum-want', 'ta-kudunga-request'],
			notes: [
				{
					type: 'morphology',
					text: 'வேணும் (veeṇum) is the spoken form of literary வேண்டும் (veeṇḍum). The thing wanted comes BEFORE veeṇum, and the wanter is usually left unsaid: "strong want" = "I want it strong".',
					anchor: 'வேணும்'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-02-l04',
			lessonId: 'ta-02',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'சரி. வேற ஏதாவது வேணுமா?',
			transliteration: 'sari. veera eedhaavadhu veeṇumaa?',
			literalEnglish: 'okay. other anything want-QUESTION?',
			naturalEnglish: 'Okay. Anything else?',
			speaker: 'Murugan',
			audio: {
				normalUrl: '/audio/ta/ta-02.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 9800,
				endMs: 12600
			},
			chunks: [],
			constructions: ['ta-veenum-want', 'ta-aa-yesno-question'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-02-l05',
			lessonId: 'ta-02',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'பன் இருக்கா?',
			transliteration: 'bun irukkaa?',
			literalEnglish: 'bun exists-QUESTION?',
			naturalEnglish: 'Do you have buns?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-02.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 12600,
				endMs: 14800
			},
			chunks: [],
			constructions: ['ta-irukkaa-availability', 'ta-aa-yesno-question'],
			notes: [
				{
					type: 'grammar',
					text: 'To ask if a shop has something, you don’t say "do you have" — you ask if the thing exists: பன் இருக்கா? "bun is-there?". இருக்கு (irukku) is the spoken form of literary இருக்கிறது.',
					anchor: 'இருக்கா'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-02-l06',
			lessonId: 'ta-02',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'பன் இல்ல, பிஸ்கட் இருக்கு.',
			transliteration: 'bun illa, biscuit irukku.',
			literalEnglish: 'bun not-exists, biscuit exists.',
			naturalEnglish: 'No buns, but there are biscuits.',
			speaker: 'Murugan',
			audio: {
				normalUrl: '/audio/ta/ta-02.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 14800,
				endMs: 17600
			},
			chunks: [],
			constructions: ['ta-irukkaa-availability'],
			notes: [
				{
					type: 'grammar',
					text: 'இல்ல (illa) is the all-purpose spoken "no / not there / it isn’t". Paired with இருக்கு it gives you the whole availability system: irukku "we have it", illa "we don’t".',
					anchor: 'இல்ல'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-02-l07',
			lessonId: 'ta-02',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'பிஸ்கட் வேண்டாம், டீ மட்டும் போதும்.',
			transliteration: 'biscuit veeṇḍaam, tea maṭṭum poodhum.',
			literalEnglish: 'biscuit not-wanted, tea only enough.',
			naturalEnglish: 'No biscuits for me — just the tea is fine.',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-02.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 17600,
				endMs: 20800
			},
			chunks: [],
			constructions: ['ta-vendaam-refusal', 'ta-veenum-want'],
			notes: [
				{
					type: 'morphology',
					text: 'வேண்டாம் (veeṇḍaam) is the fixed negative of வேணும்: NOUN + veeṇḍaam = "I don’t want NOUN". Note the mismatch with English word order: the refused thing comes first.',
					anchor: 'வேண்டாம்'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-02-l08',
			lessonId: 'ta-02',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'இந்தாங்க டீ. சூடா இருக்கு, பார்த்து குடிங்க.',
			transliteration: 'indhaanga tea. sooḍaa irukku, paatthu kuḍinga.',
			literalEnglish: 'here-you-are(polite) tea. hot-ly it-is, having-seen drink(polite).',
			naturalEnglish: 'Here’s your tea. It’s hot — drink it carefully.',
			speaker: 'Murugan',
			audio: {
				normalUrl: '/audio/ta/ta-02.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 20800,
				endMs: 24400
			},
			chunks: [
				{ label: 'இந்தாங்க டீ', startMs: 20800, endMs: 22200 },
				{ label: 'சூடா இருக்கு, பார்த்து குடிங்க', startMs: 22200, endMs: 24400 }
			],
			constructions: ['ta-irukkaa-availability'],
			notes: [
				{
					type: 'pronunciation',
					text: 'இந்தாங்க (indhaanga) — "here you go (polite)" — is what you hear whenever anyone hands you anything, from tea to change.',
					anchor: 'இந்தாங்க'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-02-l09',
			lessonId: 'ta-02',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ம்ம், டீ செம்மையா இருக்கு அண்ணா!',
			transliteration: 'mm, tea semmaiyaa irukku aṇṇaa!',
			literalEnglish: 'mm, tea excellent-ly is elder-brother!',
			naturalEnglish: 'Mmm, the tea is excellent, anna!',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-02.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 24400,
				endMs: 27200
			},
			chunks: [],
			constructions: [],
			notes: [
				{
					type: 'culture',
					text: 'செம்மையா (semmaiyaa, often clipped to "semma") is current Chennai slang for "great / awesome" — you will hear it constantly.',
					anchor: 'செம்மையா'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-02-l10',
			lessonId: 'ta-02',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'நன்றிங்க! இன்னொரு தடவ வாங்க.',
			transliteration: 'nandri-nga! innoru dhaḍava vaanga.',
			literalEnglish: 'thanks(polite)! another time come(polite).',
			naturalEnglish: 'Thank you! Come again.',
			speaker: 'Murugan',
			audio: {
				normalUrl: '/audio/ta/ta-02.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 27200,
				endMs: 30000
			},
			chunks: [],
			constructions: ['ta-kudunga-request'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		}
	],
	constructions: [
		{
			id: 'ta-veenum-want',
			language: 'ta',
			label: 'NOUN + வேணும்',
			gloss: '"I want NOUN" — the wanted thing first, then veeṇum; spoken form of veeṇḍum',
			introducedIn: 'ta-02',
			notes: 'oru coffee veeṇum "I want a coffee". Add -aa for the question: veeṇumaa? "do you want?"'
		},
		{
			id: 'ta-vendaam-refusal',
			language: 'ta',
			label: 'NOUN + வேண்டாம்',
			gloss: '"I don’t want NOUN" — the fixed negative counterpart of veeṇum',
			introducedIn: 'ta-02',
			notes: 'sakkarai veeṇḍaam "no sugar (for me)". Also the polite way to wave off street vendors.'
		},
		{
			id: 'ta-kudunga-request',
			language: 'ta',
			label: 'NOUN + குடுங்க',
			gloss: 'polite request "please give me NOUN" — imperative kudu "give" + polite -nga',
			introducedIn: 'ta-02',
			notes: 'The -nga ending makes any imperative polite: pooḍunga "put", vaanga "come", sollunga "say". Spoken kudu- corresponds to written kodu-.'
		},
		{
			id: 'ta-irukkaa-availability',
			language: 'ta',
			label: 'NOUN + இருக்கா? / இருக்கு / இல்ல',
			gloss: 'asking and stating availability: "is there X?" — "there is" — "there isn’t"',
			introducedIn: 'ta-02',
			notes: 'irukku is the spoken form of literary irukkiradhu. bun irukkaa? — irukku / illa.'
		},
		{
			id: 'ta-aa-yesno-question',
			language: 'ta',
			label: 'verb/noun + -ஆ (yes-no question)',
			gloss: 'turn any statement into a yes-no question by adding -aa to the last word',
			introducedIn: 'ta-01',
			notes: 'Introduced in lesson 1; here it rides on veeṇum → veeṇumaa? and irukku → irukkaa?'
		}
	],
	exercises: [
		{
			kind: 'comprehension',
			id: 'ta-02-e01',
			lessonId: 'ta-02',
			constructions: ['ta-irukkaa-availability'],
			prompt: 'Murugan says: பன் இல்ல, பிஸ்கட் இருக்கு. What is he telling Priya?',
			lineId: 'ta-02-l06',
			options: [
				'They have both buns and biscuits.',
				'They have neither buns nor biscuits.',
				'They are out of buns but have biscuits.',
				'The biscuits are fresher than the buns.'
			],
			answerIndex: 2
		},
		{
			kind: 'comprehension',
			id: 'ta-02-e02',
			lessonId: 'ta-02',
			constructions: ['ta-vendaam-refusal'],
			prompt: 'Priya says: பிஸ்கட் வேண்டாம், டீ மட்டும் போதும். What does she decide?',
			lineId: 'ta-02-l07',
			options: [
				'She wants a biscuit with her tea.',
				'She doesn’t want a biscuit — just the tea.',
				'She wants biscuits instead of tea.',
				'She is asking how much the biscuits cost.'
			],
			answerIndex: 1
		},
		{
			kind: 'recall',
			id: 'ta-02-e03',
			lessonId: 'ta-02',
			constructions: ['ta-kudunga-request'],
			prompt: 'Order politely: "One coffee, please." (asking someone to give it to you)',
			lineId: 'ta-02-l01',
			acceptedAnswers: [
				'ஒரு காபி குடுங்க',
				'ஒரு காபி குடுங்க.',
				'oru kaapi kudunga',
				'oru coffee kudunga',
				'அண்ணா, ஒரு காபி குடுங்க'
			],
			canonicalAnswer: 'ஒரு காபி குடுங்க. (oru kaapi kuḍunga.)',
			hints: [
				'Pattern: ஒரு + item + குடுங்க.',
				'The polite -ங்க (-nga) ending replaces "please".'
			]
		},
		{
			kind: 'recall',
			id: 'ta-02-e04',
			lessonId: 'ta-02',
			constructions: ['ta-irukkaa-availability', 'ta-aa-yesno-question'],
			prompt: 'Ask the shopkeeper: "Do you have milk?" (paal = milk)',
			lineId: 'ta-02-l05',
			acceptedAnswers: ['பால் இருக்கா?', 'பால் இருக்கா', 'paal irukkaa?', 'paal irukkaa'],
			canonicalAnswer: 'பால் இருக்கா? (paal irukkaa?)',
			hints: ['Ask whether the milk "exists": NOUN + இருக்கா?']
		},
		{
			kind: 'completion',
			id: 'ta-02-e05',
			lessonId: 'ta-02',
			constructions: ['ta-veenum-want'],
			prompt: 'Complete: "I want one tea." — ஒரு டீ ___',
			template: 'ஒரு டீ ___.',
			options: ['வேணும்', 'வேண்டாம்', 'இல்ல', 'குடுங்க'],
			answer: 'வேணும்',
			rule: 'The wanted thing comes first, then வேணும் — "one tea want" = "I want one tea". வேண்டாம் would refuse it.'
		},
		{
			kind: 'transfer',
			id: 'ta-02-e06',
			lessonId: 'ta-02',
			constructions: ['ta-vendaam-refusal'],
			prompt: 'Refuse something politely with வேண்டாம்.',
			situation:
				'A street vendor outside your office offers you sundal, but you have just eaten lunch. Turn it down politely.',
			useConstruction: 'ta-vendaam-refusal',
			exemplar: 'சுண்டல் வேண்டாம், நன்றிங்க. (sundal veeṇḍaam, nandringa.)'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
