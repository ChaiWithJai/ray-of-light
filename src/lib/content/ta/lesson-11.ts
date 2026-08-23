import type { Lesson } from '../../schemas/content';

/**
 * Lesson 11 — Transportation (Tamil, Chennai spoken register).
 * Priya needs to get to T. Nagar; Arun weighs up bus, metro and auto with her.
 * All target text is contemporary educated spoken Tamil (e.g. இருக்கு, போலாம்,
 * ஆகும், போறேன்), not the literary written forms.
 */
export const lesson: Lesson = {
	id: 'ta-11',
	language: 'ta',
	index: 11,
	kind: 'regular',
	title: 'Transportation',
	situation:
		'Priya has to get to T. Nagar. Arun helps her choose between the bus, the metro and an auto, and they talk about time and fares.',
	level: 'A1',
	lines: [
		{
			id: 'ta-11-l01',
			lessonId: 'ta-11',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அருண், நான் டி. நகர் போகணும். எப்படி போறது?',
			transliteration: 'Arun, naan T. Nagar poganum. eppadi poradhu?',
			literalEnglish: 'Arun, I T. Nagar go-must. How going?',
			naturalEnglish: 'Arun, I need to get to T. Nagar. How do I go?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-11.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 0,
				endMs: 4200
			},
			chunks: [
				{ label: 'naan T. Nagar poganum', startMs: 0, endMs: 2400 },
				{ label: 'eppadi poradhu', startMs: 2400, endMs: 4200 }
			],
			constructions: ['ta-num-obligation'],
			notes: [
				{
					type: 'morphology',
					text: 'போகணும் = போக (go) + -ணும் "must/need to". Spoken Tamil uses -ணும் where written Tamil has வேண்டும்: போக வேண்டும் → போகணும்.',
					anchor: 'போகணும்'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-11-l02',
			lessonId: 'ta-11',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'பஸ்ல போலாம், இல்லனா ஆட்டோல போலாம்.',
			transliteration: 'bus-la polaam, illana auto-la polaam.',
			literalEnglish: 'Bus-in go-may, if-not auto-in go-may.',
			naturalEnglish: 'You can go by bus, or else by auto.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-11.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 4200,
				endMs: 8000
			},
			chunks: [
				{ label: 'bus-la polaam', startMs: 4200, endMs: 6000 },
				{ label: 'illana auto-la polaam', startMs: 6000, endMs: 8000 }
			],
			constructions: ['ta-la-instrumental-transport', 'ta-laam-potential'],
			notes: [
				{
					type: 'morphology',
					text: 'The same spoken suffix -ல marks both location ("in the bus") and means of transport ("by bus"). English needs "by"; Tamil just adds -ல to the vehicle.',
					anchor: 'பஸ்ல'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-11-l03',
			lessonId: 'ta-11',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'பஸ்ல எவ்வளவு நேரம் ஆகும்?',
			transliteration: 'bus-la evlavu neram aagum?',
			literalEnglish: 'Bus-in how-much time will-become?',
			naturalEnglish: 'How long will it take by bus?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-11.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 8000,
				endMs: 11200
			},
			chunks: [],
			constructions: ['ta-la-instrumental-transport', 'ta-aagum-future-neuter'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-11-l04',
			lessonId: 'ta-11',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ட்ராஃபிக் இருந்தா ஒரு மணி நேரம் ஆகும்.',
			transliteration: 'traffic irundhaa oru mani neram aagum.',
			literalEnglish: 'Traffic if-is one hour time will-become.',
			naturalEnglish: "If there's traffic it'll take an hour.",
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-11.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 11200,
				endMs: 15000
			},
			chunks: [],
			constructions: ['ta-naa-conditional', 'ta-aagum-future-neuter'],
			notes: [
				{
					type: 'grammar',
					text: 'இருந்தா is the spoken conditional: written இருந்தால் drops the final -ல். "If X, then Y" needs no word for "if" — the -ஆ ending on the verb does the whole job.',
					anchor: 'இருந்தா'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-11-l05',
			lessonId: 'ta-11',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அப்போ மெட்ரோ இருக்கா?',
			transliteration: 'appo metro irukkaa?',
			literalEnglish: 'Then metro is-it?',
			naturalEnglish: 'Then is there a metro?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-11.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 15000,
				endMs: 17600
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-11-l06',
			lessonId: 'ta-11',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'இருக்கு, ஆனா ஸ்டேஷன் கொஞ்சம் தூரம்.',
			transliteration: 'irukku, aanaa station konjam dhooram.',
			literalEnglish: 'Is, but station a-little distance.',
			naturalEnglish: "There is, but the station is a bit far.",
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-11.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 17600,
				endMs: 21000
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-11-l07',
			lessonId: 'ta-11',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'சரி, ஆட்டோல போறேன். எவ்வளவு ஆகும்?',
			transliteration: 'sari, auto-la poren. evlavu aagum?',
			literalEnglish: 'Okay, auto-in go-I. How-much will-become?',
			naturalEnglish: "Okay, I'll go by auto. How much will it cost?",
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-11.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 21000,
				endMs: 24800
			},
			chunks: [],
			constructions: ['ta-la-instrumental-transport', 'ta-aagum-future-neuter'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-11-l08',
			lessonId: 'ta-11',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'மீட்டர்ல போனா நூத்தி அம்பது ரூபா ஆகும்.',
			transliteration: 'meter-la ponaa noothi ambadhu roobaa aagum.',
			literalEnglish: 'Meter-in if-go hundred-and fifty rupees will-become.',
			naturalEnglish: "If you go by the meter it'll be a hundred and fifty rupees.",
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-11.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 24800,
				endMs: 28800
			},
			chunks: [
				{ label: 'meter-la ponaa', startMs: 24800, endMs: 26600 },
				{ label: 'noothi ambadhu roobaa aagum', startMs: 26600, endMs: 28800 }
			],
			constructions: ['ta-naa-conditional', 'ta-aagum-future-neuter'],
			notes: [
				{
					type: 'culture',
					text: 'Chennai autos are famous for not using the meter — "மீட்டர்ல போனா" is a real negotiation move. Many riders now book autos through Ola/Uber/Rapido apps to get a fixed fare.',
					anchor: 'மீட்டர்ல'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-11-l09',
			lessonId: 'ta-11',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ஓகே, நான் ஓலா புக் பண்றேன்.',
			transliteration: 'okay, naan Ola book panren.',
			literalEnglish: 'Okay, I Ola book do-I.',
			naturalEnglish: "Okay, I'll book an Ola.",
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-11.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 28800,
				endMs: 31800
			},
			chunks: [],
			constructions: ['ta-pannu-light-verb'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-11-l10',
			lessonId: 'ta-11',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'நல்லது! பத்து நிமிஷத்துல வண்டி வரும்.',
			transliteration: 'nalladhu! patthu nimishathula vandi varum.',
			literalEnglish: 'Good! Ten minutes-in vehicle will-come.',
			naturalEnglish: 'Great! The car will be here in ten minutes.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-11.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 31800,
				endMs: 35400
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
			id: 'ta-num-obligation',
			language: 'ta',
			label: 'verb + -ணும் (must / need to)',
			gloss: 'Spoken necessitative: போகணும் "have to go", வாங்கணும் "need to buy". Written Tamil uses வேண்டும் instead.',
			introducedIn: 'ta-10'
		},
		{
			id: 'ta-la-instrumental-transport',
			language: 'ta',
			label: 'vehicle + -ல (by bus / by auto)',
			gloss: 'The spoken locative -ல on a vehicle expresses means of transport: பஸ்ல "by bus", ஆட்டோல "by auto".',
			introducedIn: 'ta-11'
		},
		{
			id: 'ta-laam-potential',
			language: 'ta',
			label: 'verb + -லாம் (can / let’s)',
			gloss: 'Suggestion or possibility: போலாம் "we can go / let’s go". Add the question -ஆ for "shall we…?": போலாமா?',
			introducedIn: 'ta-11'
		},
		{
			id: 'ta-naa-conditional',
			language: 'ta',
			label: 'verb + -னா / -ந்தா (if …)',
			gloss: 'Spoken conditional built on the past stem: போனா "if (you) go", இருந்தா "if there is". Written form keeps the final -ல்: போனால், இருந்தால்.',
			introducedIn: 'ta-11'
		},
		{
			id: 'ta-aagum-future-neuter',
			language: 'ta',
			label: '(எவ்வளவு …) ஆகும் (it will take / cost)',
			gloss: 'Neuter future ஆகும் "it will become" covers both duration and price: எவ்வளவு நேரம் ஆகும்? "how long will it take?", எவ்வளவு ஆகும்? "how much will it cost?"',
			introducedIn: 'ta-11'
		},
		{
			id: 'ta-pannu-light-verb',
			language: 'ta',
			label: 'noun + பண்ணு (do X)',
			gloss: 'பண்ணு "do" turns nouns — very often English loans — into verbs: புக் பண்றேன் "I’ll book", ஹெல்ப் பண்ணு "help".',
			introducedIn: 'ta-09'
		}
	],
	exercises: [
		{
			id: 'ta-11-e01',
			kind: 'comprehension',
			lessonId: 'ta-11',
			lineId: 'ta-11-l04',
			constructions: ['ta-naa-conditional'],
			prompt: 'Arun says "ட்ராஃபிக் இருந்தா ஒரு மணி நேரம் ஆகும்." What does he mean?',
			options: [
				'If there is traffic, the bus will take an hour.',
				'The bus comes once every hour.',
				'There is always traffic for one hour.',
				'The bus stops running after an hour.'
			],
			answerIndex: 0
		},
		{
			id: 'ta-11-e02',
			kind: 'recall',
			lessonId: 'ta-11',
			lineId: 'ta-11-l03',
			constructions: ['ta-la-instrumental-transport', 'ta-aagum-future-neuter'],
			prompt: 'Ask: "How long will it take by bus?"',
			acceptedAnswers: [
				'பஸ்ல எவ்வளவு நேரம் ஆகும்?',
				'பஸ்ல எவ்ளோ நேரம் ஆகும்?',
				'bus-la evlavu neram aagum?',
				'basla evlavu neram aagum?',
				'busla evvalavu neram aagum?'
			],
			canonicalAnswer: 'பஸ்ல எவ்வளவு நேரம் ஆகும்?',
			hints: ['"By bus" is just பஸ் + -ல.', 'For "will it take", use ஆகும்.']
		},
		{
			id: 'ta-11-e03',
			kind: 'completion',
			lessonId: 'ta-11',
			constructions: ['ta-naa-conditional'],
			prompt: 'Complete Arun’s line about the meter.',
			template: 'மீட்டர்ல ___ நூத்தி அம்பது ரூபா ஆகும்.',
			options: ['போனா', 'போறேன்', 'போலாம்'],
			answer: 'போனா',
			rule: '"If you go" needs the spoken conditional: past stem போன- + -ஆ → போனா. போறேன் is "I go" and போலாம் is "let’s go" — neither means "if".'
		},
		{
			id: 'ta-11-e04',
			kind: 'transfer',
			lessonId: 'ta-11',
			constructions: ['ta-la-instrumental-transport', 'ta-laam-potential'],
			prompt: 'Suggest going somewhere new by a different vehicle.',
			situation:
				'You are at Chennai Central with a friend and want to suggest going to the beach by train.',
			useConstruction: 'ta-la-instrumental-transport',
			exemplar: 'ட்ரெயின்ல பீச்சுக்கு போலாமா?'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
