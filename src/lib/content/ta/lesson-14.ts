import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = {
	id: 'ta-14',
	language: 'ta',
	index: 14,
	kind: 'synthesis',
	title: 'Review: an evening out, start to finish',
	situation:
		'Short performance recombining lessons 8-13: Priya and Arun plan a beach evening — likes, timing, the bus, a small favour, and how they are feeling.',
	level: 'A1',
	lines: [
		{
			id: 'ta-14-l01',
			lessonId: 'ta-14',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அருண், இன்னைக்கு சாயந்திரம் ஃப்ரீயா இருக்கியா? பீச்சுக்கு போலாமா?',
			transliteration: 'aruṇ, innaikku saayandhiram freeyaa irukkiyaa? beach-ukku polaamaa?',
			literalEnglish: 'Arun, today evening free-ly are-you-Q? beach-to let-us-go-Q?',
			naturalEnglish: 'Arun, are you free this evening? Shall we go to the beach?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-14.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 0,
				endMs: 4000
			},
			chunks: [
				{ label: 'innaikku saayandhiram freeyaa irukkiyaa? (are you free this evening?)', startMs: 400, endMs: 2400 },
				{ label: 'beach-ukku polaamaa? (shall we go to the beach?)', startMs: 2400, endMs: 4000 }
			],
			constructions: ['ta-aa-irukku-feeling', 'ta-laam-hortative'],
			notes: [
				{
					type: 'grammar',
					text: "Two review patterns in one breath: the -ஆ இருக்கு state question from lesson 13 (ஃப்ரீயா இருக்கியா?) and the -லாம் 'shall we' suggestion from lesson 9 (போலாமா?).",
					anchor: 'போலாமா'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-14-l02',
			lessonId: 'ta-14',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'போலாம்! எனக்கு பீச்சுன்னா ரொம்ப புடிக்கும்.',
			transliteration: 'polaam! enakku beach-nnaa romba pudikkum.',
			literalEnglish: 'let-us-go! to-me beach-if-say very is-liked.',
			naturalEnglish: "Let's go! I really love the beach.",
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-14.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 4000,
				endMs: 7200
			},
			chunks: [],
			constructions: ['ta-laam-hortative', 'ta-pidikkum-dative-like'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-14-l03',
			lessonId: 'ta-14',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அப்போ ஆறு மணிக்கு பஸ் ஸ்டாப்ல சந்திக்கலாமா?',
			transliteration: 'appo aaru manikku bus stop-la sandhikkalaamaa?',
			literalEnglish: 'then six o-clock-at bus stop-in shall-we-meet-Q?',
			naturalEnglish: 'Then shall we meet at the bus stop at six?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-14.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 7200,
				endMs: 10600
			},
			chunks: [],
			constructions: ['ta-manikku-time', 'ta-laam-hortative'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-14-l04',
			lessonId: 'ta-14',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ஆறு மணிக்கு சரி. நாம பஸ்ல போலாமா, இல்ல ஆட்டோல போலாமா?',
			transliteration: 'aaru manikku sari. naama bus-la polaamaa, illa auto-la polaamaa?',
			literalEnglish: 'six o-clock-at okay. we bus-in shall-we-go-Q, or auto-in shall-we-go-Q?',
			naturalEnglish: 'Six is fine. Shall we take the bus, or go by auto?',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-14.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 10600,
				endMs: 14400
			},
			chunks: [],
			constructions: ['ta-manikku-time', 'ta-la-instrumental-transport', 'ta-laam-hortative'],
			notes: [
				{
					type: 'morphology',
					text: "Vehicle + -ல (-la) is 'by/in that vehicle' (lesson 11): பஸ்ல 'by bus', ஆட்டோல 'by auto'. English needs a preposition; Tamil hangs the case ending straight off the vehicle.",
					anchor: 'பஸ்ல'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-14-l05',
			lessonId: 'ta-14',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'பஸ்ல போலாம். ஆனா எனக்கு ரூட் தெரியாது — உன் தம்பி கிட்ட கொஞ்சம் கேக்க முடியுமா?',
			transliteration: 'bus-la polaam. aanaa enakku route theriyaadhu — un thambi kitta konjam kekka mudiyumaa?',
			literalEnglish: 'bus-in let-us-go. but to-me route is-not-known — your younger-brother near a-little to-ask is-possible-Q?',
			naturalEnglish: "Let's take the bus. But I don't know the route — could you ask your brother?",
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-14.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 14400,
				endMs: 18900
			},
			chunks: [
				{ label: 'enakku route theriyaadhu (I do not know the route)', startMs: 15600, endMs: 17100 },
				{ label: 'konjam kekka mudiyumaa? (could you ask?)', startMs: 17100, endMs: 18900 }
			],
			constructions: [
				'ta-la-instrumental-transport',
				'ta-enakku-dative-experiencer',
				'ta-mudiyumaa-request',
				'ta-konjam-softener'
			],
			notes: [
				{
					type: 'morphology',
					text: "எனக்கு ... தெரியாது runs on the same dative-experiencer frame as feelings (lesson 13): knowledge, like comfort or pain, sits 'to' the person — 'to-me route not-known'.",
					anchor: 'எனக்கு ரூட் தெரியாது'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-14-l06',
			lessonId: 'ta-14',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'முடியும், கேக்கறேன். காலைல தலை வலிச்சுது, ஆனா இப்ப பரவால்ல, நல்லா இருக்கு.',
			transliteration: 'mudiyum, kekkaren. kaalaila thala valichudhu, aanaa ippa paravaalla, nallaa irukku.',
			literalEnglish: 'is-possible, ask-I. morning-in head pained, but now not-bad, well-ly is.',
			naturalEnglish: "Sure, I'll ask him. My head hurt in the morning, but I'm fine now, feeling good.",
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-14.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 18900,
				endMs: 23400
			},
			chunks: [],
			constructions: ['ta-mudiyumaa-request', 'ta-valikkudhu-pain', 'ta-paravaalla-its-okay', 'ta-aa-irukku-feeling'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-14-l07',
			lessonId: 'ta-14',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'சூப்பர்! அப்போ சாயந்திரம் ஆறு மணிக்கு பாக்கலாம்!',
			transliteration: 'super! appo saayandhiram aaru manikku paakkalaam!',
			literalEnglish: 'super! then evening six o-clock-at let-us-see!',
			naturalEnglish: 'Great! See you at six this evening, then!',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-14.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 23400,
				endMs: 26600
			},
			chunks: [],
			constructions: ['ta-manikku-time', 'ta-laam-hortative'],
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
			label: 'enakku ... pidikkum (liking)',
			gloss: "dative experiencer + pidikkum: enakku beach pudikkum 'to-me beach is-liked' = 'I like the beach'",
			introducedIn: 'ta-08'
		},
		{
			id: 'ta-laam-hortative',
			language: 'ta',
			label: "VERB + -laam (let's / shall we)",
			gloss: "hortative -லாம் on the verb stem proposes joint action: polaam 'let's go', paakkalaam 'let's see'; add -aa for 'shall we?'",
			introducedIn: 'ta-09'
		},
		{
			id: 'ta-manikku-time',
			language: 'ta',
			label: "NUMBER + manikku (at X o'clock)",
			gloss: "clock time takes dative -க்கு: aaru manikku 'at six o'clock'",
			introducedIn: 'ta-06'
		},
		{
			id: 'ta-la-instrumental-transport',
			language: 'ta',
			label: 'VEHICLE + -la (by bus/auto/train)',
			gloss: "locative -ல on a vehicle means travelling by it: bus-la po 'go by bus'",
			introducedIn: 'ta-11'
		},
		{
			id: 'ta-mudiyumaa-request',
			language: 'ta',
			label: 'VERB-a mudiyumaa? (could you...?)',
			gloss: "infinitive + mudiyumaa 'is it possible?' makes a polite request: kekka mudiyumaa? 'could you ask?'; answer mudiyum 'I can'",
			introducedIn: 'ta-12'
		},
		{
			id: 'ta-aa-irukku-feeling',
			language: 'ta',
			label: 'STATE + -aa irukku (feeling/seeming)',
			gloss: "quality noun/adjective + -ஆ + இருக்கு: 'is/feels X-ly' — sorvaa irukku 'feels tired', nallaa irukku 'feels good'",
			introducedIn: 'ta-13'
		},
		{
			id: 'ta-enakku-dative-experiencer',
			language: 'ta',
			label: 'enakku + state (dative experiencer)',
			gloss: "the person feeling or knowing something is marked dative (-க்கு): enakku route theriyaadhu 'to-me route not-known'",
			introducedIn: 'ta-13'
		},
		{
			id: 'ta-valikkudhu-pain',
			language: 'ta',
			label: 'BODY PART + valikkudhu',
			gloss: "body part as subject of the pain verb: thala valichudhu 'head pained' = 'I had a headache'",
			introducedIn: 'ta-13'
		},
		{
			id: 'ta-paravaalla-its-okay',
			language: 'ta',
			label: "paravaalla (it's okay / not bad)",
			gloss: "spoken contraction of paravaayillai; states that things are tolerable: ippa paravaalla 'I'm okay now'",
			introducedIn: 'ta-13'
		},
		{
			id: 'ta-konjam-softener',
			language: 'ta',
			label: 'konjam (a little, softener)',
			gloss: "konjam 'a little' softens requests and downplays symptoms: konjam kekka mudiyumaa?",
			introducedIn: 'ta-13'
		}
	],
	exercises: [
		{
			kind: 'comprehension',
			id: 'ta-14-e01',
			lessonId: 'ta-14',
			constructions: ['ta-mudiyumaa-request', 'ta-enakku-dative-experiencer'],
			prompt: 'Priya says: "எனக்கு ரூட் தெரியாது — உன் தம்பி கிட்ட கொஞ்சம் கேக்க முடியுமா?" What is she doing?',
			lineId: 'ta-14-l05',
			options: [
				'Saying she knows the route and will guide them.',
				"Admitting she doesn't know the route and asking Arun to check with his brother.",
				'Telling Arun his brother should come to the beach too.',
				'Complaining that the bus route has changed.'
			],
			answerIndex: 1
		},
		{
			kind: 'recall',
			id: 'ta-14-e02',
			lessonId: 'ta-14',
			constructions: ['ta-laam-hortative', 'ta-manikku-time'],
			prompt: 'Suggest to a friend: "Shall we meet at six o\'clock?"',
			lineId: 'ta-14-l03',
			acceptedAnswers: [
				'ஆறு மணிக்கு சந்திக்கலாமா?',
				'aaru manikku sandhikkalaamaa?',
				'ஆறு மணிக்கு பாக்கலாமா?',
				'aaru manikku paakkalaamaa?'
			],
			canonicalAnswer: 'ஆறு மணிக்கு சந்திக்கலாமா? (aaru manikku sandhikkalaamaa?)',
			hints: [
				"Clock time takes -க்கு: ஆறு மணிக்கு 'at six'.",
				"'Shall we' is -லாமா on the verb stem."
			]
		},
		{
			kind: 'transfer',
			id: 'ta-14-e03',
			lessonId: 'ta-14',
			constructions: ['ta-mudiyumaa-request', 'ta-konjam-softener'],
			prompt: 'Reuse the polite-request pattern in a new setting.',
			situation:
				'You are at a crowded Chennai railway station with a heavy suitcase. Politely ask a porter whether he can help you carry it.',
			useConstruction: 'ta-mudiyumaa-request',
			exemplar: 'இந்த பையை கொஞ்சம் தூக்க முடியுமா? (indha paiyai konjam thookka mudiyumaa?)'
		},
		{
			kind: 'transfer',
			id: 'ta-14-e04',
			lessonId: 'ta-14',
			constructions: ['ta-pidikkum-dative-like', 'ta-aa-irukku-feeling'],
			prompt: 'Combine a like with a feeling in one new utterance.',
			situation:
				'At the beach, your friend hands you sundal (a beach snack) and asks how you feel. Say you love sundal and you are feeling very happy.',
			useConstruction: 'ta-pidikkum-dative-like',
			exemplar:
				'எனக்கு சுண்டல் ரொம்ப புடிக்கும் — இப்ப ரொம்ப சந்தோஷமா இருக்கு! (enakku sundal romba pudikkum — ippa romba sandhoshamaa irukku!)'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
