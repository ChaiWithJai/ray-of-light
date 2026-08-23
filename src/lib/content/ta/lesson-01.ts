import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = {
	id: 'ta-01',
	language: 'ta',
	index: 1,
	kind: 'regular',
	title: 'Greetings & introductions',
	situation:
		'Priya and Arun meet for the first time at a friend’s housewarming in Chennai and introduce themselves.',
	level: 'A0',
	lines: [
		{
			id: 'ta-01-l01',
			lessonId: 'ta-01',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'வணக்கம்! நல்லா இருக்கீங்களா?',
			transliteration: 'vaṇakkam! nallaa irukkeengaḷaa?',
			literalEnglish: 'greeting! well are-you(polite)-QUESTION?',
			naturalEnglish: 'Hello! Are you doing well?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-01.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 0,
				endMs: 2800
			},
			chunks: [],
			constructions: ['ta-nalla-irukkeenga-wellbeing', 'ta-aa-yesno-question'],
			notes: [
				{
					type: 'culture',
					text: 'வணக்கம் (vaṇakkam) works at any time of day — spoken Tamil has no separate "good morning / good evening" in everyday use.',
					anchor: 'வணக்கம்'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-01-l02',
			lessonId: 'ta-01',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'நல்லா இருக்கேன். நீங்க எப்படி இருக்கீங்க?',
			transliteration: 'nallaa irukkeen. neenga eppaḍi irukkeenga?',
			literalEnglish: 'well am-I. you(polite) how are-you(polite)?',
			naturalEnglish: 'I’m doing well. How are you?',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-01.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 2800,
				endMs: 6400
			},
			chunks: [
				{ label: 'நல்லா இருக்கேன்', startMs: 2800, endMs: 4300 },
				{ label: 'நீங்க எப்படி இருக்கீங்க?', startMs: 4300, endMs: 6400 }
			],
			constructions: ['ta-eppadi-irukkeenga-how-are-you', 'ta-nalla-irukkeenga-wellbeing'],
			notes: [
				{
					type: 'morphology',
					text: 'இருக்கேன் (irukkeen) = irukk- "be" + -een "I"; இருக்கீங்க (irukkeenga) = irukk- + -eenga "you (polite)". The subject lives in the verb ending, so நான்/நீங்க can be dropped.',
					anchor: 'இருக்கீங்க'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-01-l03',
			lessonId: 'ta-01',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'நானும் நல்லா இருக்கேன். என் பேரு ப்ரியா.',
			transliteration: 'naanum nallaa irukkeen. en peru Priya.',
			literalEnglish: 'I-also well am. my name Priya.',
			naturalEnglish: 'I’m doing well too. My name is Priya.',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-01.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 6400,
				endMs: 10000
			},
			chunks: [],
			constructions: ['ta-en-peru-name', 'ta-nalla-irukkeenga-wellbeing'],
			notes: [
				{
					type: 'grammar',
					text: 'என் பேரு ப்ரியா has no word for "is" — spoken Tamil simply puts the two nouns side by side: "my name Priya".',
					anchor: 'என் பேரு ப்ரியா'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-01-l04',
			lessonId: 'ta-01',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'என் பேரு அருண். உங்க ஊரு எது?',
			transliteration: 'en peru Aruṇ. unga ooru edhu?',
			literalEnglish: 'my name Arun. your(polite) hometown which?',
			naturalEnglish: 'My name is Arun. Where are you from?',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-01.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 10000,
				endMs: 13400
			},
			chunks: [],
			constructions: ['ta-en-peru-name'],
			notes: [
				{
					type: 'culture',
					text: 'ஊரு (ooru) is your "native place" — asking உங்க ஊரு எது? is a standard, friendly getting-to-know-you question, even between two people who both live in Chennai.',
					anchor: 'ஊரு'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-01-l05',
			lessonId: 'ta-01',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'நான் சென்னைல இருக்கேன், அடையாறுல.',
			transliteration: 'naan Chennai-la irukkeen, Aḍaiyaaru-la.',
			literalEnglish: 'I Chennai-in am, Adyar-in.',
			naturalEnglish: 'I live in Chennai, in Adyar.',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-01.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 13400,
				endMs: 16600
			},
			chunks: [],
			constructions: ['ta-la-locative-irukken'],
			notes: [
				{
					type: 'morphology',
					text: 'The suffix -ல (-la) marks location and attaches straight onto the place name: சென்னைல = "in Chennai". Written Tamil uses -இல் (-il); spoken Chennai Tamil always says -la.',
					anchor: 'சென்னைல'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-01-l06',
			lessonId: 'ta-01',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அப்படியா? நானும் சென்னைதான், டி நகர்ல.',
			transliteration: 'appaḍiyaa? naanum Chennai-daan, T. Nagar-la.',
			literalEnglish: 'like-that-QUESTION? I-also Chennai-indeed, T. Nagar-in.',
			naturalEnglish: 'Oh really? I’m from Chennai too — T. Nagar.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-01.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 16600,
				endMs: 20000
			},
			chunks: [],
			constructions: ['ta-la-locative-irukken', 'ta-aa-yesno-question'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-01-l07',
			lessonId: 'ta-01',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'சூப்பர்! நீங்க என்ன பண்றீங்க?',
			transliteration: 'super! neenga enna paṇreenga?',
			literalEnglish: 'super! you(polite) what do-you(polite)?',
			naturalEnglish: 'Great! What do you do?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-01.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 20000,
				endMs: 22800
			},
			chunks: [],
			constructions: ['ta-enna-panreenga-occupation'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-01-l08',
			lessonId: 'ta-01',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'நான் ஒரு ஐடி கம்பெனில வேலை பண்றேன்.',
			transliteration: 'naan oru IT company-la veelai paṇreen.',
			literalEnglish: 'I one IT company-in work do-I.',
			naturalEnglish: 'I work at an IT company.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-01.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 22800,
				endMs: 26600
			},
			chunks: [
				{ label: 'நான் ஒரு ஐடி கம்பெனில', startMs: 22800, endMs: 24800 },
				{ label: 'வேலை பண்றேன்', startMs: 24800, endMs: 26600 }
			],
			constructions: ['ta-enna-panreenga-occupation', 'ta-la-locative-irukken'],
			notes: [
				{
					type: 'morphology',
					text: 'வேலை பண்றேன் (veelai paṇreen) is literally "work do-I": the object comes before the verb, and the -een ending on பண்றேன் already means "I". English word order (I do work) is reversed.',
					anchor: 'வேலை பண்றேன்'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-01-l09',
			lessonId: 'ta-01',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'உங்கள பார்த்ததுல ரொம்ப சந்தோஷம்!',
			transliteration: 'ungaḷa paatthadhu-la romba sandhosham!',
			literalEnglish: 'you(polite)-ACCUSATIVE having-met-in much happiness!',
			naturalEnglish: 'Really nice meeting you!',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-01.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 26600,
				endMs: 29800
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-01-l10',
			lessonId: 'ta-01',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'எனக்கும் தான்! சரி, அப்புறம் பார்க்கலாம்.',
			transliteration: 'enakkum daan! sari, appuram paakkalaam.',
			literalEnglish: 'to-me-also indeed! okay, later let-us-see.',
			naturalEnglish: 'Me too! Okay, see you later.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-01.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 29800,
				endMs: 33000
			},
			chunks: [],
			constructions: [],
			notes: [
				{
					type: 'pronunciation',
					text: 'பார்க்கலாம் collapses in speech: paakkalaam, with the ர் barely audible. The -laam ending means "let’s / we can", so அப்புறம் பார்க்கலாம் is the everyday "see you later".',
					anchor: 'பார்க்கலாம்'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		}
	],
	constructions: [
		{
			id: 'ta-vanakkam-greeting',
			language: 'ta',
			label: 'வணக்கம் greeting',
			gloss: 'the neutral all-purpose greeting',
			introducedIn: 'ta-01'
		},
		{
			id: 'ta-nalla-irukkeenga-wellbeing',
			language: 'ta',
			label: 'நல்லா இருக்கீங்களா? / நல்லா இருக்கேன்',
			gloss: 'asking and answering "are you well? / I’m well" with nallaa + irukk-',
			introducedIn: 'ta-01',
			notes: 'The all-purpose wellbeing exchange. nallaa "well" + a form of irukk- "be" with the person baked into the ending.'
		},
		{
			id: 'ta-aa-yesno-question',
			language: 'ta',
			label: 'verb/noun + -ஆ (yes-no question)',
			gloss: 'turn any statement into a yes-no question by adding -aa to the last word',
			introducedIn: 'ta-01',
			notes: 'irukkeenga "you are" → irukkeengaḷaa? "are you?"; appaḍi "like that" → appaḍiyaa? "really?"'
		},
		{
			id: 'ta-en-peru-name',
			language: 'ta',
			label: 'என் பேரு + name',
			gloss: '"my name is X" — no verb, just en peru + the name',
			introducedIn: 'ta-01',
			notes: 'unga peru enna? "what’s your name?" uses the same pattern with the question word enna.'
		},
		{
			id: 'ta-eppadi-irukkeenga-how-are-you',
			language: 'ta',
			label: 'எப்படி இருக்கீங்க?',
			gloss: '"how are you?" — eppaḍi "how" + irukkeenga "you (polite) are"',
			introducedIn: 'ta-01'
		},
		{
			id: 'ta-la-locative-irukken',
			language: 'ta',
			label: 'place + -ல இருக்கேன்',
			gloss: '"I am / I live in PLACE" — locative suffix -la on the place name',
			introducedIn: 'ta-01',
			notes: 'Spoken -la corresponds to written -il. Chennai-la, veettu-la "at home", company-la.'
		},
		{
			id: 'ta-enna-panreenga-occupation',
			language: 'ta',
			label: 'என்ன பண்றீங்க? / வேலை பண்றேன்',
			gloss: 'asking "what do you do?" and answering with veelai paṇreen "I work"',
			introducedIn: 'ta-01',
			notes: 'paṇṇu "do" is the workhorse spoken verb; written Tamil prefers sey.'
		}
	],
	exercises: [
		{
			kind: 'comprehension',
			id: 'ta-01-e01',
			lessonId: 'ta-01',
			constructions: ['ta-la-locative-irukken'],
			prompt: 'Priya says: நான் சென்னைல இருக்கேன், அடையாறுல. What is she telling Arun?',
			lineId: 'ta-01-l05',
			options: [
				'She lives in Chennai, in Adyar.',
				'She is travelling to Chennai tomorrow.',
				'She used to live in Adyar but moved away.',
				'She is asking where Adyar is.'
			],
			answerIndex: 0
		},
		{
			kind: 'comprehension',
			id: 'ta-01-e02',
			lessonId: 'ta-01',
			constructions: ['ta-enna-panreenga-occupation'],
			prompt: 'Arun answers: நான் ஒரு ஐடி கம்பெனில வேலை பண்றேன். What did Priya most likely ask him?',
			lineId: 'ta-01-l08',
			options: [
				'Where is your office?',
				'What do you do (for work)?',
				'Do you like your job?',
				'When do you start work?'
			],
			answerIndex: 1
		},
		{
			kind: 'recall',
			id: 'ta-01-e03',
			lessonId: 'ta-01',
			constructions: ['ta-en-peru-name'],
			prompt: 'Introduce yourself: say "My name is Kavya."',
			lineId: 'ta-01-l03',
			acceptedAnswers: [
				'என் பேரு காவ்யா',
				'என் பேரு காவ்யா.',
				'en peru Kavya',
				'en peru Kaavya',
				'என் பேர் காவ்யா'
			],
			canonicalAnswer: 'என் பேரு காவ்யா. (en peru Kavya.)',
			hints: ['Start with என் பேரு (en peru) — "my name".', 'No word for "is" — just add the name.']
		},
		{
			kind: 'recall',
			id: 'ta-01-e04',
			lessonId: 'ta-01',
			constructions: ['ta-eppadi-irukkeenga-how-are-you'],
			prompt: 'Ask someone politely: "How are you?"',
			lineId: 'ta-01-l02',
			acceptedAnswers: [
				'எப்படி இருக்கீங்க?',
				'எப்படி இருக்கீங்க',
				'நீங்க எப்படி இருக்கீங்க?',
				'eppadi irukkeenga?',
				'neenga eppadi irukkeenga?'
			],
			canonicalAnswer: 'எப்படி இருக்கீங்க? (eppaḍi irukkeenga?)',
			hints: ['எப்படி (eppaḍi) = "how".']
		},
		{
			kind: 'completion',
			id: 'ta-01-e05',
			lessonId: 'ta-01',
			constructions: ['ta-la-locative-irukken'],
			prompt: 'Complete: "I live in Madurai."',
			template: 'நான் மதுரை___ இருக்கேன்.',
			options: ['ல', 'ஆ', 'உம்', 'க்கு'],
			answer: 'ல',
			rule: 'The locative suffix -ல (-la) attaches to the place name: மதுரைல = "in Madurai".'
		},
		{
			kind: 'transfer',
			id: 'ta-01-e06',
			lessonId: 'ta-01',
			constructions: ['ta-aa-yesno-question'],
			prompt: 'Turn a statement into a question with -ஆ.',
			situation:
				'You run into a colleague at Marina Beach and are surprised. Ask "Are you well?" using the -aa question ending.',
			useConstruction: 'ta-aa-yesno-question',
			exemplar: 'நல்லா இருக்கீங்களா? (nallaa irukkeengaḷaa?)'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
