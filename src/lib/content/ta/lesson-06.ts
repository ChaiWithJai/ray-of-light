import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = {
	id: 'ta-06',
	language: 'ta',
	index: 6,
	kind: 'regular',
	title: 'Daily routine',
	situation:
		'Priya asks Arun to walk her through an ordinary weekday — when he gets up, how he gets to the office, and when he sleeps.',
	level: 'A0',
	lines: [
		{
			id: 'ta-06-l01',
			lessonId: 'ta-06',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'நீங்க தினமும் எத்தனை மணிக்கு எழுந்திருக்கீங்க?',
			transliteration: 'neenga dhinamum ethanai manikku ezhundhirukkeenga?',
			literalEnglish: 'you every-day how-many hour-at get-up-you?',
			naturalEnglish: 'What time do you get up every day?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-06.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 0,
				endMs: 3600
			},
			chunks: [],
			constructions: ['ta-manikku-time', 'ta-habitual-present'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-06-l02',
			lessonId: 'ta-06',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'நான் ஆறு மணிக்கு எழுந்திருக்கறேன்.',
			transliteration: 'naan aaru manikku ezhundhirukkaren.',
			literalEnglish: 'I six hour-at get-up-I.',
			naturalEnglish: 'I get up at six.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-06.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 3600,
				endMs: 6400
			},
			chunks: [],
			constructions: ['ta-manikku-time', 'ta-habitual-present'],
			notes: [
				{
					type: 'morphology',
					text: 'The spoken present ends in -றேன் for "I" (எழுந்திருக்கறேன் "I get up") and -றீங்க for polite "you" (எழுந்திருக்கீங்க). With தினமும் it reads as a habit, not an ongoing action.',
					anchor: 'எழுந்திருக்கறேன்'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-06-l03',
			lessonId: 'ta-06',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அவ்வளவு சீக்கிரமா! அப்புறம் என்ன பண்றீங்க?',
			transliteration: 'avvalavu seekkiramaa! appuram enna pannreenga?',
			literalEnglish: 'that-much early-huh! afterwards what do-you?',
			naturalEnglish: 'That early! Then what do you do?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-06.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 6400,
				endMs: 9600
			},
			chunks: [],
			constructions: ['ta-appuram-then', 'ta-habitual-present'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-06-l04',
			lessonId: 'ta-06',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'காபி குடிச்சிட்டு பீச்ல வாக்கிங் போறேன்.',
			transliteration: 'coffee kudichittu beach-la walking poren.',
			literalEnglish: 'coffee having-drunk beach-in walking go-I.',
			naturalEnglish: 'I have my coffee and then go for a walk on the beach.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-06.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 9600,
				endMs: 13000
			},
			chunks: [
				{ label: 'காபி குடிச்சிட்டு (having drunk coffee)', startMs: 9600, endMs: 11300 },
				{ label: 'பீச்ல வாக்கிங் போறேன் (I go walking on the beach)', startMs: 11300, endMs: 13000 }
			],
			constructions: ['ta-ttu-sequential', 'ta-habitual-present'],
			notes: [
				{
					type: 'morphology',
					text: 'குடிச்சிட்டு = குடி + -ச்சிட்டு, the spoken "having done X" form. Tamil chains actions with this suffix instead of "and then": first verb takes -ட்டு/-ச்சிட்டு, only the last verb carries tense.',
					anchor: 'குடிச்சிட்டு'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-06-l05',
			lessonId: 'ta-06',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ஆபீஸுக்கு எத்தனை மணிக்கு போறீங்க?',
			transliteration: 'office-ukku ethanai manikku poreenga?',
			literalEnglish: 'office-to how-many hour-at go-you?',
			naturalEnglish: 'What time do you leave for the office?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-06.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 13000,
				endMs: 15800
			},
			chunks: [],
			constructions: ['ta-manikku-time', 'ta-habitual-present'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-06-l06',
			lessonId: 'ta-06',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'குளிச்சிட்டு ஒன்பது மணிக்கு பஸ்ல போறேன்.',
			transliteration: 'kulichittu onbadhu manikku bus-la poren.',
			literalEnglish: 'having-bathed nine hour-at bus-in go-I.',
			naturalEnglish: 'After a shower I take the bus at nine.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-06.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 15800,
				endMs: 19200
			},
			chunks: [
				{ label: 'குளிச்சிட்டு (having bathed)', startMs: 15800, endMs: 17000 },
				{ label: 'ஒன்பது மணிக்கு பஸ்ல போறேன் (at nine I go by bus)', startMs: 17000, endMs: 19200 }
			],
			constructions: ['ta-ttu-sequential', 'ta-manikku-time'],
			notes: [
				{
					type: 'grammar',
					text: '“At X o’clock” is number + மணிக்கு — மணி "hour" plus the dative -க்கு you saw with age. ஒன்பது மணிக்கு = at nine.',
					anchor: 'ஒன்பது மணிக்கு'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-06-l07',
			lessonId: 'ta-06',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'மதியம் எங்க சாப்பிடறீங்க?',
			transliteration: 'madhiyam enga saappidreenga?',
			literalEnglish: 'afternoon where eat-you?',
			naturalEnglish: 'Where do you have lunch?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-06.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 19200,
				endMs: 21800
			},
			chunks: [],
			constructions: ['ta-habitual-present'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-06-l08',
			lessonId: 'ta-06',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ஆபீஸ் கேண்டீன்லதான் சாப்பிடறேன்.',
			transliteration: 'office canteen-la-thaan saappidren.',
			literalEnglish: 'office canteen-in-EMPHASIS eat-I.',
			naturalEnglish: 'I just eat at the office canteen.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-06.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 21800,
				endMs: 24400
			},
			chunks: [],
			constructions: ['ta-habitual-present'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-06-l09',
			lessonId: 'ta-06',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ராத்திரி எத்தனை மணிக்கு தூங்கறீங்க?',
			transliteration: 'raathiri ethanai manikku thoongreenga?',
			literalEnglish: 'night how-many hour-at sleep-you?',
			naturalEnglish: 'What time do you go to sleep at night?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-06.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 24400,
				endMs: 27200
			},
			chunks: [],
			constructions: ['ta-manikku-time', 'ta-habitual-present'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-06-l10',
			lessonId: 'ta-06',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'சாப்பிட்டுட்டு கொஞ்சம் டிவி பாத்துட்டு பதினொண்ணு மணிக்கு தூங்கறேன்.',
			transliteration: 'saappittuttu konjam TV paathuttu pathinonnu manikku thoongaren.',
			literalEnglish: 'having-eaten a-little TV having-watched eleven hour-at sleep-I.',
			naturalEnglish: 'I have dinner, watch a bit of TV, and sleep at eleven.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-06.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 27200,
				endMs: 31600
			},
			chunks: [
				{ label: 'சாப்பிட்டுட்டு (having eaten)', startMs: 27200, endMs: 28500 },
				{ label: 'கொஞ்சம் டிவி பாத்துட்டு (having watched a little TV)', startMs: 28500, endMs: 30100 },
				{ label: 'பதினொண்ணு மணிக்கு தூங்கறேன் (at eleven I sleep)', startMs: 30100, endMs: 31600 }
			],
			constructions: ['ta-ttu-sequential', 'ta-manikku-time', 'ta-habitual-present'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		}
	],
	constructions: [
		{
			id: 'ta-habitual-present',
			language: 'ta',
			label: 'spoken present -றேன் / -றீங்க (habits)',
			gloss: 'I do / you (polite) do — spoken present used for daily habits',
			introducedIn: 'ta-06',
			notes: 'Spoken forms like போறேன், சாப்பிடறேன்; literary equivalents are போகிறேன், சாப்பிடுகிறேன்.'
		},
		{
			id: 'ta-manikku-time',
			language: 'ta',
			label: 'number + மணிக்கு "at X o’clock"',
			gloss: 'clock time with dative -க்கு: ஆறு மணிக்கு = at six',
			introducedIn: 'ta-06'
		},
		{
			id: 'ta-ttu-sequential',
			language: 'ta',
			label: '-ட்டு / -ச்சிட்டு "having done X"',
			gloss: 'chains actions: first verb takes -ட்டு, last verb carries tense',
			introducedIn: 'ta-06'
		},
		{
			id: 'ta-appuram-then',
			language: 'ta',
			label: 'அப்புறம் "then / after that"',
			gloss: 'sequencing word between sentences in a routine or story',
			introducedIn: 'ta-06'
		}
	],
	exercises: [
		{
			kind: 'comprehension',
			id: 'ta-06-e01',
			lessonId: 'ta-06',
			constructions: ['ta-ttu-sequential', 'ta-manikku-time'],
			prompt: 'When does Arun go to sleep?',
			lineId: 'ta-06-l10',
			options: [
				'At eleven, after dinner and a bit of TV',
				'At nine, right after dinner',
				'At six, before his beach walk'
			],
			answerIndex: 0
		},
		{
			kind: 'recall',
			id: 'ta-06-e02',
			lessonId: 'ta-06',
			constructions: ['ta-manikku-time', 'ta-habitual-present'],
			prompt: 'Say: “I get up at six o’clock.”',
			lineId: 'ta-06-l02',
			acceptedAnswers: [
				'நான் ஆறு மணிக்கு எழுந்திருக்கறேன்.',
				'ஆறு மணிக்கு எழுந்திருக்கறேன்.',
				'naan aaru manikku ezhundhirukkaren',
				'aaru manikku ezhundhirukkaren'
			],
			canonicalAnswer: 'நான் ஆறு மணிக்கு எழுந்திருக்கறேன்.',
			hints: ['“At six o’clock” = ஆறு மணிக்கு', 'The spoken “I …” present ends in -றேன்']
		},
		{
			kind: 'completion',
			id: 'ta-06-e03',
			lessonId: 'ta-06',
			constructions: ['ta-ttu-sequential'],
			prompt: 'Fill the gap: “I drink coffee and then go for a walk.”',
			template: 'காபி ___ வாக்கிங் போறேன்.',
			options: ['குடிச்சிட்டு', 'குடிக்க', 'குடிச்சேன்'],
			answer: 'குடிச்சிட்டு',
			rule: 'To chain two actions, the first verb takes -ச்சிட்டு/-ட்டு ("having done"): காபி குடிச்சிட்டு … போறேன். Only the final verb carries the tense.'
		},
		{
			kind: 'transfer',
			id: 'ta-06-e04',
			lessonId: 'ta-06',
			constructions: ['ta-ttu-sequential', 'ta-habitual-present'],
			prompt: 'Describe your own evening in Tamil.',
			situation:
				'A friend asks what you do after work. Say that you finish work, go home, and watch TV.',
			useConstruction: 'ta-ttu-sequential',
			exemplar: 'வேலை முடிச்சிட்டு வீட்டுக்கு போயி டிவி பாக்கறேன்.'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
