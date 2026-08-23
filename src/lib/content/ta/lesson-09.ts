import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = {
	id: 'ta-09',
	language: 'ta',
	index: 9,
	kind: 'regular',
	title: 'Making plans',
	situation:
		'Priya and Arun are on the phone on a Thursday evening, making plans to see a movie together on Saturday.',
	level: 'A1',
	lines: [
		{
			id: 'ta-09-l01',
			lessonId: 'ta-09',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'பிரியா, சனிக்கிழமை என்ன பண்றே?',
			transliteration: 'Priya, sanikkizhamai enna panre?',
			literalEnglish: 'Priya, Saturday what doing-you?',
			naturalEnglish: 'Priya, what are you doing on Saturday?',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-09.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 0,
				endMs: 3000
			},
			chunks: [],
			constructions: ['ta-pannu-light-verb'],
			notes: [
				{
					type: 'morphology',
					text: 'பண்றே (panre) = பண்ணு "do" + present + informal you. Spoken Tamil drops the literary -கிறாய்; you will hear பண்றே, not செய்கிறாய்.',
					anchor: 'பண்றே'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-09-l02',
			lessonId: 'ta-09',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ஒண்ணும் இல்ல, ஃப்ரீயா இருக்கேன்.',
			transliteration: 'onnum illa, free-yaa irukken.',
			literalEnglish: 'anything not, free-ly am-I.',
			naturalEnglish: "Nothing at all, I'm free.",
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-09.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 3000,
				endMs: 5800
			},
			chunks: [],
			constructions: [],
			notes: [
				{
					type: 'grammar',
					text: 'English loanwords slot straight into spoken Chennai Tamil: ஃப்ரீ "free" takes the adverbial ending -ஆ (free-yaa) exactly like a native word.',
					anchor: 'ஃப்ரீயா'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-09-l03',
			lessonId: 'ta-09',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அப்போ சினிமாவுக்கு போலாமா?',
			transliteration: 'appo cinemavukku polaamaa?',
			literalEnglish: 'then cinema-to go-shall-we-QUESTION?',
			naturalEnglish: 'Then shall we go to a movie?',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-09.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 5800,
				endMs: 8600
			},
			chunks: [],
			constructions: ['ta-laam-hortative', 'ta-aa-yesno-question'],
			notes: [
				{
					type: 'morphology',
					text: 'போலாமா = போ "go" + -லாம் "let\'s / may" + -ஆ question suffix. Three pieces stack onto one verb; English needs a whole clause ("shall we go?") for the same job.',
					anchor: 'போலாமா'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-09-l04',
			lessonId: 'ta-09',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'சூப்பர் ஐடியா! எந்த படம் பார்க்கலாம்?',
			transliteration: 'super idea! endha padam paarkkalaam?',
			literalEnglish: 'super idea! which movie watch-shall-we?',
			naturalEnglish: 'Great idea! Which movie should we watch?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-09.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 8600,
				endMs: 11400
			},
			chunks: [],
			constructions: ['ta-laam-hortative'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-09-l05',
			lessonId: 'ta-09',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'புது தமிழ் படம் ஒண்ணு வந்திருக்கு, நல்லா இருக்குன்னு சொல்றாங்க.',
			transliteration: 'pudhu Tamil padam onnu vandhirukku, nallaa irukku-nnu solraanga.',
			literalEnglish: 'new Tamil movie one has-come, good is-QUOTE say-they.',
			naturalEnglish: "A new Tamil movie is out — they say it's good.",
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-09.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 11400,
				endMs: 16000
			},
			chunks: [
				{ label: 'a new Tamil movie is out', startMs: 11400, endMs: 13800 },
				{ label: "they say it's good", startMs: 13800, endMs: 16000 }
			],
			constructions: [],
			notes: [
				{
					type: 'grammar',
					text: 'இருக்குன்னு = இருக்கு + -ன்னு, the spoken quotative ("that it is"). It wraps reported speech: X-ன்னு சொல்றாங்க = "they say that X". The literary form is என்று.',
					anchor: 'இருக்குன்னு'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-09-l06',
			lessonId: 'ta-09',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ஓகே, டிக்கெட் நான் புக் பண்றேன்.',
			transliteration: 'okay, ticket naan book panren.',
			literalEnglish: 'okay, ticket I book do-will-I.',
			naturalEnglish: "Okay, I'll book the tickets.",
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-09.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 16000,
				endMs: 18800
			},
			chunks: [],
			constructions: ['ta-pannu-light-verb', 'ta-ren-first-person'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-09-l07',
			lessonId: 'ta-09',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'மதியம் ஷோவா, இல்ல நைட் ஷோவா?',
			transliteration: 'madhiyam show-vaa, illa night show-vaa?',
			literalEnglish: 'afternoon show-QUESTION, or night show-QUESTION?',
			naturalEnglish: 'Afternoon show, or the night show?',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-09.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 18800,
				endMs: 21600
			},
			chunks: [],
			constructions: ['ta-aa-yesno-question'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-09-l08',
			lessonId: 'ta-09',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'நைட் ஷோவே பெட்டர். அப்புறம் சாப்பிடலாம்.',
			transliteration: 'night show-ve better. appuram saapidalaam.',
			literalEnglish: 'night show-EMPHASIS better. afterwards eat-let-us.',
			naturalEnglish: 'The night show is better. We can grab dinner afterwards.',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-09.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 21600,
				endMs: 25200
			},
			chunks: [],
			constructions: ['ta-laam-hortative'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-09-l09',
			lessonId: 'ta-09',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'சரி, நான் ஆறு மணிக்கு உன் வீட்டுக்கு வர்றேன்.',
			transliteration: 'sari, naan aaru manikku un veettukku varren.',
			literalEnglish: 'okay, I six o-clock-at your house-to come-will-I.',
			naturalEnglish: "Okay, I'll come to your place at six.",
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-09.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 25200,
				endMs: 29400
			},
			chunks: [
				{ label: "okay, I'll come", startMs: 25200, endMs: 26600 },
				{ label: 'at six', startMs: 26600, endMs: 27800 },
				{ label: 'to your place', startMs: 27800, endMs: 29400 }
			],
			constructions: ['ta-ren-first-person'],
			notes: [
				{
					type: 'grammar',
					text: 'மணிக்கு = மணி "o\'clock" + dative -க்கு. Tamil marks clock times with -க்கு where English uses "at". You will drill this in the next lesson.',
					anchor: 'மணிக்கு'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-09-l10',
			lessonId: 'ta-09',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'சரி, அப்போ சனிக்கிழமை பார்க்கலாம்!',
			transliteration: 'sari, appo sanikkizhamai paarkkalaam!',
			literalEnglish: 'okay, then Saturday see-let-us!',
			naturalEnglish: 'Okay, see you Saturday then!',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-09.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 29400,
				endMs: 32200
			},
			chunks: [],
			constructions: ['ta-laam-hortative'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		}
	],
	constructions: [
		{
			id: 'ta-laam-hortative',
			language: 'ta',
			label: 'verb + -லாம் (let’s / shall we)',
			gloss: 'Suggests a shared action or open possibility: போலாம் "let\'s go", சாப்பிடலாம் "we can eat". With the question suffix -ஆ it becomes a proposal: போலாமா? "shall we go?"',
			introducedIn: 'ta-09'
		},
		{
			id: 'ta-aa-yesno-question',
			language: 'ta',
			label: '-ஆ yes/no question suffix',
			gloss: 'Turns any statement or word into a yes/no question by suffixing -ஆ: ஷோவா? "the show?", போலாமா? "shall we go?". No word-order change, unlike English.',
			introducedIn: 'ta-01'
		},
		{
			id: 'ta-pannu-light-verb',
			language: 'ta',
			label: 'X பண்ணு (do X)',
			gloss: 'The all-purpose spoken verb பண்ணு "do" combines with nouns — especially English loans — to make new verbs: புக் பண்ணு "book", பிளான் பண்ணு "plan".',
			introducedIn: 'ta-09'
		},
		{
			id: 'ta-ren-first-person',
			language: 'ta',
			label: 'verb + -றேன் (I do / I’ll)',
			gloss: 'The spoken first-person ending -றேன்: வர்றேன் "I\'m coming / I\'ll come", பண்றேன் "I\'ll do it". Commits the speaker to the action, like English "I\'ll".',
			introducedIn: 'ta-09'
		}
	],
	exercises: [
		{
			kind: 'comprehension',
			id: 'ta-09-e01',
			lessonId: 'ta-09',
			constructions: ['ta-laam-hortative', 'ta-aa-yesno-question'],
			prompt: 'Arun says: «அப்போ சினிமாவுக்கு போலாமா?» What is he doing?',
			lineId: 'ta-09-l03',
			options: [
				'Suggesting they go to a movie together',
				'Saying he already went to a movie',
				'Asking where the cinema is',
				'Telling Priya not to go to the movie'
			],
			answerIndex: 0
		},
		{
			kind: 'recall',
			id: 'ta-09-e02',
			lessonId: 'ta-09',
			constructions: ['ta-laam-hortative', 'ta-aa-yesno-question'],
			prompt: 'Your friend is free this evening. Suggest: "Shall we go to a movie?"',
			lineId: 'ta-09-l03',
			acceptedAnswers: [
				'சினிமாவுக்கு போலாமா?',
				'சினிமாவுக்கு போலாமா',
				'cinemavukku polaamaa',
				'cinemavukku polama',
				'sinimavukku polaamaa',
				'படத்துக்கு போலாமா?'
			],
			canonicalAnswer: 'சினிமாவுக்கு போலாமா?',
			hints: ['Destination takes -உக்கு "to".', 'Suggestion = verb + -லாம், then -ஆ to make it a question.']
		},
		{
			kind: 'completion',
			id: 'ta-09-e03',
			lessonId: 'ta-09',
			constructions: ['ta-laam-hortative'],
			prompt: 'Complete the suggestion: "We can have coffee together afterwards."',
			template: 'அப்புறம் சேர்ந்து காபி குடிக்க___.',
			options: ['லாம்', 'றேன்', 'ஆ'],
			answer: 'லாம்',
			rule: 'A shared suggestion ("let\'s / we can") takes -லாம் on the verb stem: குடிக்கலாம் "let\'s drink".'
		},
		{
			kind: 'transfer',
			id: 'ta-09-e04',
			lessonId: 'ta-09',
			constructions: ['ta-laam-hortative', 'ta-aa-yesno-question'],
			prompt: 'Make a new plan using the suggestion pattern.',
			situation:
				'A friend tells you they are free on Sunday. Suggest going to the beach together.',
			useConstruction: 'ta-laam-hortative',
			exemplar: 'ஞாயித்துக்கிழமை பீச்சுக்கு போலாமா? (gnyaayithukkizhamai beach-ukku polaamaa?)'
		},
		{
			kind: 'recall',
			id: 'ta-09-e05',
			lessonId: 'ta-09',
			constructions: ['ta-pannu-light-verb', 'ta-ren-first-person'],
			prompt: 'Offer to handle it: "I\'ll book the tickets."',
			lineId: 'ta-09-l06',
			acceptedAnswers: [
				'டிக்கெட் நான் புக் பண்றேன்.',
				'நான் டிக்கெட் புக் பண்றேன்',
				'ticket naan book panren',
				'naan ticket book panren'
			],
			canonicalAnswer: 'டிக்கெட் நான் புக் பண்றேன்.',
			hints: ['Use the English loan + பண்ணு.', 'First person "I\'ll" = -றேன் ending.']
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
