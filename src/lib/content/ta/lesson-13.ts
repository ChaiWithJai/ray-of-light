import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = {
	id: 'ta-13',
	language: 'ta',
	index: 13,
	kind: 'regular',
	title: 'Describing how one feels',
	situation:
		'Priya notices her colleague Arun looking worn out at the office and asks him how he is feeling.',
	level: 'A1',
	lines: [
		{
			id: 'ta-13-l01',
			lessonId: 'ta-13',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அருண், என்ன ஆச்சு? ரொம்ப சோர்வா இருக்கியே.',
			transliteration: 'aruṇ, enna aachu? romba sorvaa irukkiye.',
			literalEnglish: 'Arun, what happened? very tired-ly you-are-see.',
			naturalEnglish: "Arun, what happened? You look really tired.",
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-13.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 0,
				endMs: 3600
			},
			chunks: [
				{ label: 'enna aachu? (what happened?)', startMs: 800, endMs: 1900 },
				{ label: 'romba sorvaa irukkiye (you look really tired)', startMs: 1900, endMs: 3600 }
			],
			constructions: ['ta-enna-aachu', 'ta-aa-irukku-feeling'],
			notes: [
				{
					type: 'morphology',
					text: "The suffix -ஆ (-aa) turns a quality noun into a state adverb: சோர்வு 'tiredness' → சோர்வா 'tiredly / in a tired state'. Paired with a form of இரு 'be', it is THE everyday way to say how someone feels or seems.",
					anchor: 'சோர்வா இருக்கியே'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-13-l02',
			lessonId: 'ta-13',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ஒண்ணுமில்ல. கொஞ்சம் தலை வலிக்குது, அவ்ளோதான்.',
			transliteration: 'onnumilla. konjam thala valikkudhu, avlodhaan.',
			literalEnglish: 'one-thing-not. a-little head is-paining, that-much-only.',
			naturalEnglish: "It's nothing. I just have a bit of a headache, that's all.",
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-13.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 3600,
				endMs: 7200
			},
			chunks: [],
			constructions: ['ta-valikkudhu-pain', 'ta-konjam-softener'],
			notes: [
				{
					type: 'morphology',
					text: "Pain is expressed with the body part as subject: தலை வலிக்குது 'head is-hurting' — spoken Chennai வலிக்குது for literary வலிக்கிறது. There is no 'I have' here; the ache itself does the verb work.",
					anchor: 'தலை வலிக்குது'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-13-l03',
			lessonId: 'ta-13',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ஐயோ, காலைலேர்ந்தே அப்படியா? ஜுரம் ஏதாவது இருக்கா?',
			transliteration: 'aiyo, kaalailerndhe appadiyaa? juram edhaavadhu irukkaa?',
			literalEnglish: 'oh-no, morning-from-EMPH like-that-Q? fever anything is-Q?',
			naturalEnglish: 'Oh no, has it been like that since morning? Do you have any fever?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-13.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 7200,
				endMs: 10900
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-13-l04',
			lessonId: 'ta-13',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'இல்ல, ஜுரம் இல்ல. ஆனா உடம்பு ரொம்ப சோர்வா இருக்கு.',
			transliteration: 'illa, juram illa. aanaa odambu romba sorvaa irukku.',
			literalEnglish: 'no, fever not. but body very tired-ly is.',
			naturalEnglish: "No, no fever. But my body feels completely drained.",
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-13.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 10900,
				endMs: 14400
			},
			chunks: [],
			constructions: ['ta-aa-irukku-feeling'],
			notes: [
				{
					type: 'pronunciation',
					text: "இருக்கு (irukku) is the contemporary spoken form of literary இருக்கிறது; you will hear இருக்கு in every Chennai conversation and இருக்கிறது almost only in writing or news reading.",
					anchor: 'இருக்கு'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-13-l05',
			lessonId: 'ta-13',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'நேத்து ராத்திரி சரியா தூங்கலையா?',
			transliteration: 'nethu raathiri sariyaa thoongalaiyaa?',
			literalEnglish: 'yesterday night properly slept-not-Q?',
			naturalEnglish: "Didn't you sleep properly last night?",
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-13.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 14400,
				endMs: 17300
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-13-l06',
			lessonId: 'ta-13',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'இல்ல, ரெண்டு மணிக்குத்தான் தூங்கினேன். அதான் எனக்கு இப்படி இருக்கு.',
			transliteration: 'illa, rendu manikku-dhaan thoonginen. adhaan enakku ippadi irukku.',
			literalEnglish: 'no, two o-clock-at-only slept-I. that-only to-me like-this is.',
			naturalEnglish: "No, I only fell asleep at two. That's why I feel like this.",
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-13.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 17300,
				endMs: 21400
			},
			chunks: [
				{ label: 'rendu manikku-dhaan thoonginen (I only slept at two)', startMs: 17600, endMs: 19500 },
				{ label: 'adhaan enakku ippadi irukku (that is why I feel like this)', startMs: 19500, endMs: 21400 }
			],
			constructions: ['ta-enakku-dative-experiencer'],
			notes: [
				{
					type: 'morphology',
					text: "Feelings sit on a dative experiencer: எனக்கு 'to-me' + state + இருக்கு. Tamil says 'to-me like-this is', not 'I am like this' — the feeler is marked with -க்கு, never as the subject.",
					anchor: 'எனக்கு இப்படி இருக்கு'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-13-l07',
			lessonId: 'ta-13',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அப்போ கொஞ்சம் டீ குடிச்சிட்டு ரெஸ்ட் எடு. நல்லா இருக்கும்.',
			transliteration: 'appo konjam tea kudichittu rest edu. nallaa irukkum.',
			literalEnglish: 'then a-little tea having-drunk rest take. well it-will-be.',
			naturalEnglish: "Then have a little tea and take some rest. You'll feel better.",
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-13.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 21400,
				endMs: 25000
			},
			chunks: [],
			constructions: ['ta-konjam-softener'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-13-l08',
			lessonId: 'ta-13',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'சரி. இப்பவே கொஞ்சம் பரவால்ல, கவலைப்படாதே.',
			transliteration: 'sari. ippave konjam paravaalla, kavalaippadaadhe.',
			literalEnglish: 'okay. now-EMPH a-little not-bad, worry-do-not.',
			naturalEnglish: "Okay. I'm already feeling a bit better, don't worry.",
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-13.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 25000,
				endMs: 28400
			},
			chunks: [],
			constructions: ['ta-paravaalla-its-okay', 'ta-konjam-softener'],
			notes: [
				{
					type: 'culture',
					text: "பரவால்ல ('not bad / it's okay / I'm alright') is one of the most-used feeling words in Chennai — the spoken squeeze of பரவாயில்லை. It downplays both pain and praise: ask how the film was and பரவால்ல means 'decent'.",
					anchor: 'பரவால்ல'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-13-l09',
			lessonId: 'ta-13',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'சாயந்திரம் இன்னும் வலிச்சா, டாக்டர் கிட்ட போயிடு.',
			transliteration: 'saayandhiram innum valichaa, doctor kitta poyidu.',
			literalEnglish: 'evening still if-it-pains, doctor near go-off.',
			naturalEnglish: 'If it still hurts in the evening, go see a doctor.',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-13.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 28400,
				endMs: 31900
			},
			chunks: [],
			constructions: ['ta-valikkudhu-pain'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-13-l10',
			lessonId: 'ta-13',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'சரிம்மா. உன்கிட்ட பேசினதுலயே மனசு லேசா இருக்கு.',
			transliteration: 'sarimmaa. un-kitta pesinadhulaye manasu lesaa irukku.',
			literalEnglish: 'okay-dear. you-near in-having-spoken-EMPH mind light-ly is.',
			naturalEnglish: 'Alright. Just talking to you has made me feel lighter.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-13.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 31900,
				endMs: 35800
			},
			chunks: [],
			constructions: ['ta-aa-irukku-feeling'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		}
	],
	constructions: [
		{
			id: 'ta-aa-irukku-feeling',
			language: 'ta',
			label: 'STATE + -aa irukku (feeling/seeming)',
			gloss: "quality noun/adjective + -ஆ + இருக்கு: 'is/feels X-ly' — sorvaa irukku 'feels tired', lesaa irukku 'feels light'",
			introducedIn: 'ta-13'
		},
		{
			id: 'ta-enakku-dative-experiencer',
			language: 'ta',
			label: 'enakku + state (dative experiencer)',
			gloss: "the person feeling something is marked dative (-க்கு): enakku ippadi irukku 'to-me like-this is' = 'I feel like this'",
			introducedIn: 'ta-13'
		},
		{
			id: 'ta-valikkudhu-pain',
			language: 'ta',
			label: 'BODY PART + valikkudhu',
			gloss: "body part as subject of the pain verb: thala valikkudhu 'head is-hurting' = 'I have a headache'",
			introducedIn: 'ta-13'
		},
		{
			id: 'ta-enna-aachu',
			language: 'ta',
			label: 'enna aachu? (what happened?)',
			gloss: "the everyday spoken opener for asking what's wrong: enna aachu? — aachu is the spoken past of aagu 'become/happen'",
			introducedIn: 'ta-13'
		},
		{
			id: 'ta-konjam-softener',
			language: 'ta',
			label: 'konjam (a little, softener)',
			gloss: "konjam 'a little' downplays symptoms and softens imperatives: konjam thala valikkudhu, konjam rest edu",
			introducedIn: 'ta-13'
		},
		{
			id: 'ta-paravaalla-its-okay',
			language: 'ta',
			label: "paravaalla (it's okay / not bad)",
			gloss: "spoken contraction of paravaayillai; states that things are tolerable: ippa paravaalla 'I'm okay now'",
			introducedIn: 'ta-13'
		}
	],
	exercises: [
		{
			kind: 'comprehension',
			id: 'ta-13-e01',
			lessonId: 'ta-13',
			constructions: ['ta-valikkudhu-pain', 'ta-konjam-softener'],
			prompt: 'Arun says: "ஒண்ணுமில்ல. கொஞ்சம் தலை வலிக்குது, அவ்ளோதான்." What does he mean?',
			lineId: 'ta-13-l02',
			options: [
				'He has a slight headache but nothing serious.',
				'He has a high fever and needs a doctor.',
				'His head is fine but his stomach hurts.',
				'He is very angry with Priya.'
			],
			answerIndex: 0
		},
		{
			kind: 'comprehension',
			id: 'ta-13-e02',
			lessonId: 'ta-13',
			constructions: ['ta-enakku-dative-experiencer'],
			prompt: 'Why does Arun say he feels this way ("அதான் எனக்கு இப்படி இருக்கு")?',
			lineId: 'ta-13-l06',
			options: [
				'He skipped breakfast this morning.',
				'He only fell asleep at two in the night.',
				'He walked to the office in the heat.',
				'He has been working out too hard.'
			],
			answerIndex: 1
		},
		{
			kind: 'recall',
			id: 'ta-13-e03',
			lessonId: 'ta-13',
			constructions: ['ta-valikkudhu-pain', 'ta-konjam-softener'],
			prompt: 'Say in spoken Tamil: "I have a bit of a headache."',
			lineId: 'ta-13-l02',
			acceptedAnswers: [
				'கொஞ்சம் தலை வலிக்குது',
				'konjam thala valikkudhu',
				'konjam thalai valikkudhu',
				'எனக்கு கொஞ்சம் தலை வலிக்குது',
				'enakku konjam thala valikkudhu'
			],
			canonicalAnswer: 'கொஞ்சம் தலை வலிக்குது (konjam thala valikkudhu)',
			hints: [
				"The body part is the subject: 'head is-paining'.",
				"Soften it with கொஞ்சம் (konjam) 'a little'."
			]
		},
		{
			kind: 'recall',
			id: 'ta-13-e04',
			lessonId: 'ta-13',
			constructions: ['ta-paravaalla-its-okay'],
			prompt: 'A friend asks if you are okay. Say: "I\'m okay now, don\'t worry."',
			lineId: 'ta-13-l08',
			acceptedAnswers: [
				'இப்ப பரவால்ல, கவலைப்படாதே',
				'ippa paravaalla, kavalaippadaadhe',
				'இப்ப பரவால்ல',
				'ippa paravaalla',
				'இப்பவே பரவால்ல, கவலைப்படாதே'
			],
			canonicalAnswer: 'இப்ப பரவால்ல, கவலைப்படாதே (ippa paravaalla, kavalaippadaadhe)',
			hints: ["'Not bad / okay' is one word: பரவால்ல."]
		},
		{
			kind: 'completion',
			id: 'ta-13-e05',
			lessonId: 'ta-13',
			constructions: ['ta-aa-irukku-feeling'],
			prompt: 'Complete Arun\'s line: "But my body feels completely drained."',
			template: 'ஆனா உடம்பு ரொம்ப ___ இருக்கு.',
			options: ['சோர்வா', 'சோர்வு', 'சோர்வான', 'சோர்ந்த'],
			answer: 'சோர்வா',
			rule: "Before இருக்கு the state takes the adverbial -ஆ: சோர்வு 'tiredness' → சோர்வா 'tiredly'. The bare noun சோர்வு cannot sit in this slot."
		},
		{
			kind: 'transfer',
			id: 'ta-13-e06',
			lessonId: 'ta-13',
			constructions: ['ta-aa-irukku-feeling'],
			prompt: 'Use the -aa irukku pattern in a brand-new situation.',
			situation:
				'Your friend just got a job offer and asks how you feel about the good news. Tell them you are feeling very happy today.',
			useConstruction: 'ta-aa-irukku-feeling',
			exemplar: 'இன்னைக்கு ரொம்ப சந்தோஷமா இருக்கு. (innaikku romba sandhoshamaa irukku.)'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
