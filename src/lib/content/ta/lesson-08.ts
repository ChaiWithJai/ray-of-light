import type { Lesson } from '../../schemas/content';

/**
 * Lesson 8 — Likes & dislikes.
 * Core pattern: the dative-subject construction X-க்கு Y பிடிக்கும்
 * ("to-X Y is-pleasing" = X likes Y) and its negative பிடிக்காது.
 */
export const lesson: Lesson = {
	id: 'ta-08',
	language: 'ta',
	index: 8,
	kind: 'regular',
	title: 'உங்களுக்கு என்ன பிடிக்கும்?',
	situation:
		'Priya and Arun sit down at a tiffin place and figure out what to order — trading what they love, what they cannot stand, and which drink beats the other.',
	level: 'A1',
	lines: [
		{
			id: 'ta-08-l01',
			lessonId: 'ta-08',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'பிரியா, உங்களுக்கு என்ன சாப்பாடு பிடிக்கும்?',
			transliteration: 'Priya, ungalukku enna saappaadu pidikkum?',
			literalEnglish: 'Priya, to-you(polite) what food is-pleasing?',
			naturalEnglish: 'Priya, what food do you like?',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-08.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 0,
				endMs: 3400
			},
			chunks: [],
			constructions: ['ta-pidikkum-dative-like'],
			notes: [
				{
					type: 'morphology',
					text: 'Liking is a dative-subject construction: the person who likes takes -க்கு (ungalukku "to you", enakku "to me"), and பிடிக்கும் stays fixed regardless of who likes. Literally "to-you food is-pleasing".',
					anchor: 'உங்களுக்கு'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-08-l02',
			lessonId: 'ta-08',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'எனக்கு தோசை ரொம்ப பிடிக்கும். உங்களுக்கு?',
			transliteration: 'enakku dosai romba pidikkum. ungalukku?',
			literalEnglish: 'to-me dosai very is-pleasing. to-you(polite)?',
			naturalEnglish: 'I really like dosa. What about you?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-08.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 3400,
				endMs: 6800
			},
			chunks: [],
			constructions: ['ta-pidikkum-dative-like', 'ta-romba-intensifier'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-08-l03',
			lessonId: 'ta-08',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'எனக்கு இட்லி பிடிக்கும், ஆனா பொங்கல் பிடிக்காது.',
			transliteration: 'enakku idli pidikkum, aanaa pongal pidikkaadhu.',
			literalEnglish: 'to-me idli is-pleasing, but pongal is-not-pleasing.',
			naturalEnglish: "I like idli, but I don't like pongal.",
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-08.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 6800,
				endMs: 10800
			},
			chunks: [
				{ label: 'enakku idli pidikkum', startMs: 6800, endMs: 8600 },
				{ label: 'aanaa pongal pidikkaadhu', startMs: 8600, endMs: 10800 }
			],
			constructions: ['ta-pidikkum-dative-like', 'ta-pidikkaadhu-neg-like'],
			notes: [
				{
					type: 'grammar',
					text: 'The negative of பிடிக்கும் is பிடிக்காது — one fixed form for every liker: enakku pidikkaadhu "I don\'t like it", avangalukku pidikkaadhu "she doesn\'t like it".',
					anchor: 'பிடிக்காது'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-08-l04',
			lessonId: 'ta-08',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ஏன்? பொங்கல் நல்லா இருக்குமே!',
			transliteration: 'een? pongal nallaa irukkume!',
			literalEnglish: 'why? pongal well is-EMPHASIS!',
			naturalEnglish: "Why? Pongal is so good!",
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-08.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 10800,
				endMs: 13400
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-08-l05',
			lessonId: 'ta-08',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'எனக்கு அது ரொம்ப ஹெவியா இருக்கு. காலைல லைட்டா சாப்பிடணும்.',
			transliteration: 'enakku adhu romba heavy-aa irukku. kaalaila light-aa saapidanum.',
			literalEnglish: 'to-me that very heavy-ly is. morning-in light-ly eat-must.',
			naturalEnglish: 'It sits too heavy for me. In the morning I need to eat light.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-08.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 13400,
				endMs: 17800
			},
			chunks: [
				{ label: 'enakku adhu romba heavy-aa irukku', startMs: 13400, endMs: 15800 },
				{ label: 'kaalaila light-aa saapidanum', startMs: 15800, endMs: 17800 }
			],
			constructions: ['ta-romba-intensifier'],
			notes: [
				{
					type: 'culture',
					text: 'English loanwords like "heavy" and "light" are completely normal in spoken Chennai Tamil, and they take Tamil adverbial -ஆ just like native words: heavy-aa, light-aa.',
					anchor: 'ஹெவியா'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-08-l06',
			lessonId: 'ta-08',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'சரி. காபியா, டீயா? எது பிடிக்கும்?',
			transliteration: 'sari. kaapiyaa, tea-yaa? edhu pidikkum?',
			literalEnglish: 'okay. coffee-or, tea-or? which is-pleasing?',
			naturalEnglish: 'Okay. Coffee or tea? Which do you like?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-08.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 17800,
				endMs: 20800
			},
			chunks: [],
			constructions: ['ta-pidikkum-dative-like'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-08-l07',
			lessonId: 'ta-08',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'டீயை விட காபி தான் எனக்கு பிடிக்கும்.',
			transliteration: 'tea-ya vida kaapi dhaan enakku pidikkum.',
			literalEnglish: 'tea-ACC than coffee EMPHASIS to-me is-pleasing.',
			naturalEnglish: 'I like coffee more than tea.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-08.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 20800,
				endMs: 24200
			},
			chunks: [],
			constructions: ['ta-vida-comparative', 'ta-pidikkum-dative-like'],
			notes: [
				{
					type: 'morphology',
					text: 'Comparison uses விட after the accusative: tea-ya vida kaapi = "coffee, compared to tea". English word order flips this — the thing being beaten comes FIRST in Tamil. தான் adds "it\'s coffee (that) I like".',
					anchor: 'விட'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-08-l08',
			lessonId: 'ta-08',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'எனக்கும் காபி பிடிக்கும், ஆனா ராத்திரி குடிக்க மாட்டேன்.',
			transliteration: 'enakkum kaapi pidikkum, aanaa raathiri kudikka maatten.',
			literalEnglish: 'to-me-also coffee is-pleasing, but night to-drink will-not-I.',
			naturalEnglish: "I like coffee too, but I won't drink it at night.",
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-08.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 24200,
				endMs: 28400
			},
			chunks: [],
			constructions: ['ta-pidikkum-dative-like'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-08-l09',
			lessonId: 'ta-08',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அப்போ ரெண்டு காபி சொல்லலாமா?',
			transliteration: 'appo rendu kaapi sollalaamaa?',
			literalEnglish: 'then two coffee say-shall-we-QUESTION?',
			naturalEnglish: 'Then shall we order two coffees?',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-08.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 28400,
				endMs: 31000
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-08-l10',
			lessonId: 'ta-08',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'சொல்லுங்க! இந்த கடை காபி எனக்கு ரொம்ப பிடிக்கும்.',
			transliteration: 'sollunga! indha kadai kaapi enakku romba pidikkum.',
			literalEnglish: 'say(polite)! this shop coffee to-me very is-pleasing.',
			naturalEnglish: "Go ahead! I love this place's coffee.",
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-08.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 31000,
				endMs: 34600
			},
			chunks: [],
			constructions: ['ta-pidikkum-dative-like', 'ta-romba-intensifier'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		}
	],
	constructions: [
		{
			id: 'ta-pidikkum-dative-like',
			language: 'ta',
			label: 'X-க்கு Y பிடிக்கும் (X likes Y)',
			gloss: 'Dative-subject liking: the liker takes -க்கு, the liked thing is bare, பிடிக்கும் is invariant.',
			introducedIn: 'ta-08'
		},
		{
			id: 'ta-pidikkaadhu-neg-like',
			language: 'ta',
			label: 'X-க்கு Y பிடிக்காது (X does not like Y)',
			gloss: 'Invariant negative of pidikkum; same dative-subject frame.',
			introducedIn: 'ta-08'
		},
		{
			id: 'ta-romba-intensifier',
			language: 'ta',
			label: 'ரொம்ப + adjective/verb (very, really)',
			gloss: 'romba intensifies what follows: romba pidikkum "really like", romba nallaa "very well".',
			introducedIn: 'ta-08'
		},
		{
			id: 'ta-vida-comparative',
			language: 'ta',
			label: 'X-ஐ விட Y (Y more than X)',
			gloss: 'Comparison: accusative + vida marks the standard; the preferred thing follows.',
			introducedIn: 'ta-08'
		}
	],
	exercises: [
		{
			kind: 'comprehension',
			id: 'ta-08-e01',
			lessonId: 'ta-08',
			constructions: ['ta-pidikkum-dative-like', 'ta-pidikkaadhu-neg-like'],
			prompt: 'What is Arun saying in this line?',
			lineId: 'ta-08-l03',
			options: [
				'He likes idli but not pongal',
				'He likes pongal but not idli',
				'He dislikes both idli and pongal',
				'He wants to order idli and pongal'
			],
			answerIndex: 0
		},
		{
			kind: 'recall',
			id: 'ta-08-e02',
			lessonId: 'ta-08',
			constructions: ['ta-pidikkum-dative-like', 'ta-romba-intensifier'],
			prompt: 'Say: "I really like dosa."',
			lineId: 'ta-08-l02',
			acceptedAnswers: [
				'எனக்கு தோசை ரொம்ப பிடிக்கும்',
				'எனக்கு ரொம்ப தோசை பிடிக்கும்',
				'enakku dosai romba pidikkum',
				'enakku thosai romba pidikkum'
			],
			canonicalAnswer: 'எனக்கு தோசை ரொம்ப பிடிக்கும்.',
			hints: ['The liker takes -க்கு: enakku = "to me"', 'romba = really/very']
		},
		{
			kind: 'completion',
			id: 'ta-08-e03',
			lessonId: 'ta-08',
			constructions: ['ta-pidikkum-dative-like', 'ta-pidikkaadhu-neg-like'],
			prompt: 'Fill the gap so the sentence means "I like coffee, but I don\'t like tea."',
			template: 'எனக்கு காபி ___, ஆனா டீ பிடிக்காது.',
			options: ['பிடிக்கும்', 'பிடிக்காது', 'வேணும்', 'இருக்கு'],
			answer: 'பிடிக்கும்',
			rule: 'Liking uses the invariant பிடிக்கும் with a dative liker (enakku); the contrastive second clause already carries the negative பிடிக்காது.'
		},
		{
			kind: 'transfer',
			id: 'ta-08-e04',
			lessonId: 'ta-08',
			constructions: ['ta-vida-comparative', 'ta-pidikkum-dative-like'],
			prompt: 'State a preference between two things in a new domain.',
			situation:
				'A friend asks what kind of movies you enjoy. Tell them you like comedy films more than action films.',
			useConstruction: 'ta-vida-comparative',
			exemplar: 'ஆக்ஷன் படத்தை விட காமெடி படம் தான் எனக்கு பிடிக்கும்.'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
