import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = {
	id: 'ta-05',
	language: 'ta',
	index: 5,
	kind: 'regular',
	title: 'Family & relationships',
	situation:
		'Priya and Arun chat over tea; Priya asks Arun who is in his family and about his siblings.',
	level: 'A0',
	lines: [
		{
			id: 'ta-05-l01',
			lessonId: 'ta-05',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'உங்க வீட்ல யாரு யாரு இருக்காங்க?',
			transliteration: 'unga veettla yaaru yaaru irukkaanga?',
			literalEnglish: 'your house-in who who are-they?',
			naturalEnglish: 'Who all are there in your family?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-05.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 0,
				endMs: 3200
			},
			chunks: [],
			constructions: ['ta-yaaru-who', 'ta-irukkaanga-plural-be'],
			notes: [
				{
					type: 'grammar',
					text: 'Doubling the question word — யாரு யாரு "who who" — asks for a full list: "who all?". Very common in spoken Tamil.',
					anchor: 'யாரு யாரு'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-05-l02',
			lessonId: 'ta-05',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'என் வீட்ல அம்மா, அப்பா, ஒரு தம்பி இருக்காங்க.',
			transliteration: 'en veettla amma, appa, oru thambi irukkaanga.',
			literalEnglish: 'my house-in mom, dad, one younger-brother are-they.',
			naturalEnglish: 'At home there’s my mom, my dad and one younger brother.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-05.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 3200,
				endMs: 7000
			},
			chunks: [
				{ label: 'என் வீட்ல (in my house)', startMs: 3200, endMs: 4300 },
				{ label: 'அம்மா, அப்பா, ஒரு தம்பி (mom, dad, one younger brother)', startMs: 4300, endMs: 6100 },
				{ label: 'இருக்காங்க (they are)', startMs: 6100, endMs: 7000 }
			],
			constructions: ['ta-irukkaanga-plural-be'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-05-l03',
			lessonId: 'ta-05',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'உங்க தம்பிக்கு என்ன வயசு?',
			transliteration: 'unga thambikku enna vayasu?',
			literalEnglish: 'your younger-brother-to what age?',
			naturalEnglish: 'How old is your younger brother?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-05.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 7000,
				endMs: 9600
			},
			chunks: [],
			constructions: ['ta-kku-dative'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-05-l04',
			lessonId: 'ta-05',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அவனுக்கு பதினெட்டு வயசு, காலேஜ்ல படிக்கறான்.',
			transliteration: 'avanukku pathinettu vayasu, college-la padikkaraan.',
			literalEnglish: 'him-to eighteen age, college-in studies-he.',
			naturalEnglish: 'He’s eighteen — he’s studying in college.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-05.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 9600,
				endMs: 13400
			},
			chunks: [
				{ label: 'அவனுக்கு பதினெட்டு வயசு (he is eighteen)', startMs: 9600, endMs: 11600 },
				{ label: 'காலேஜ்ல படிக்கறான் (he studies in college)', startMs: 11600, endMs: 13400 }
			],
			constructions: ['ta-kku-dative'],
			notes: [
				{
					type: 'morphology',
					text: 'Tamil says age with the dative: அவனுக்கு (avan + -ukku, "to him") + number + வயசு. Literally "to him eighteen age" — there is no verb "to be X years old".',
					anchor: 'அவனுக்கு பதினெட்டு வயசு'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-05-l05',
			lessonId: 'ta-05',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அக்கா தங்கச்சி இல்லையா?',
			transliteration: 'akka thangachi illaiyaa?',
			literalEnglish: 'elder-sister younger-sister not-QUESTION?',
			naturalEnglish: 'No sisters, then?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-05.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 13400,
				endMs: 15900
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-05-l06',
			lessonId: 'ta-05',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'இருக்காங்க, என்னோட அக்கா பெங்களூர்ல இருக்காங்க.',
			transliteration: 'irukkaanga, ennoda akka Bengaluru-la irukkaanga.',
			literalEnglish: 'is-she, my elder-sister Bengaluru-in is-she.',
			naturalEnglish: 'I do — my elder sister lives in Bengaluru.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-05.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 15900,
				endMs: 19600
			},
			chunks: [],
			constructions: ['ta-oda-possessive', 'ta-irukkaanga-plural-be'],
			notes: [
				{
					type: 'morphology',
					text: 'என்னோட = என் + -ஓட, the spoken possessive suffix ("my"). It attaches to any person word: உங்களோட (your), அவனோட (his). Note also that a respected single person (elder sister) still takes the plural-shaped இருக்காங்க.',
					anchor: 'என்னோட'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-05-l07',
			lessonId: 'ta-05',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அக்காவுக்கு கல்யாணம் ஆச்சா?',
			transliteration: 'akkaavukku kalyaanam aachaa?',
			literalEnglish: 'elder-sister-to marriage happened-QUESTION?',
			naturalEnglish: 'Is your sister married?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-05.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 19600,
				endMs: 22300
			},
			chunks: [],
			constructions: ['ta-kku-dative'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-05-l08',
			lessonId: 'ta-05',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ஆமா, அவங்க ஹஸ்பெண்ட் சாஃப்ட்வேர் கம்பெனில வேலை பண்றாரு.',
			transliteration: 'aamaa, avanga husband software company-la velai pannraaru.',
			literalEnglish: 'yes, her husband software company-in work does-he-honorific.',
			naturalEnglish: 'Yeah — her husband works at a software company.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-05.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 22300,
				endMs: 26400
			},
			chunks: [],
			constructions: ['ta-oda-possessive'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-05-l09',
			lessonId: 'ta-05',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'உங்க அம்மா அப்பா எங்க இருக்காங்க?',
			transliteration: 'unga amma appa enga irukkaanga?',
			literalEnglish: 'your mom dad where are-they?',
			naturalEnglish: 'Where do your parents live?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-05.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 26400,
				endMs: 29200
			},
			chunks: [],
			constructions: ['ta-irukkaanga-plural-be'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-05-l10',
			lessonId: 'ta-05',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'எங்ககூட சென்னைலதான் இருக்காங்க.',
			transliteration: 'engakooda Chennai-la-thaan irukkaanga.',
			literalEnglish: 'us-with Chennai-in-EMPHASIS are-they.',
			naturalEnglish: 'They live right here in Chennai, with us.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-05.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 29200,
				endMs: 32200
			},
			chunks: [],
			constructions: ['ta-irukkaanga-plural-be'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		}
	],
	constructions: [
		{
			id: 'ta-yaaru-who',
			language: 'ta',
			label: 'யாரு "who" questions',
			gloss: 'who (spoken யாரு; doubled யாரு யாரு = "who all")',
			introducedIn: 'ta-05'
		},
		{
			id: 'ta-irukkaanga-plural-be',
			language: 'ta',
			label: 'இருக்காங்க "they are / (s)he (hon.) is"',
			gloss: 'spoken plural/honorific of இரு — used for family members, elders, groups',
			introducedIn: 'ta-05',
			notes: 'Spoken form; literary equivalent is இருக்கிறார்கள்.'
		},
		{
			id: 'ta-oda-possessive',
			language: 'ta',
			label: '-ஓட possessive (என்னோட அக்கா)',
			gloss: 'X-oda Y = X’s Y; spoken possessive suffix alongside bare என்/உங்க',
			introducedIn: 'ta-05'
		},
		{
			id: 'ta-kku-dative',
			language: 'ta',
			label: '-க்கு dative (அவனுக்கு பதினெட்டு வயசு)',
			gloss: 'to/for X — carries age (X-kku N vayasu) and experiencer states like marriage',
			introducedIn: 'ta-05'
		}
	],
	exercises: [
		{
			kind: 'comprehension',
			id: 'ta-05-e01',
			lessonId: 'ta-05',
			constructions: ['ta-kku-dative'],
			prompt: 'What does Arun say about his younger brother?',
			lineId: 'ta-05-l04',
			options: [
				'He is eighteen and studying in college',
				'He works at a software company',
				'He lives in Bengaluru with their sister'
			],
			answerIndex: 0
		},
		{
			kind: 'recall',
			id: 'ta-05-e02',
			lessonId: 'ta-05',
			constructions: ['ta-kku-dative'],
			prompt: 'Ask someone: “How old is your younger brother?”',
			lineId: 'ta-05-l03',
			acceptedAnswers: [
				'உங்க தம்பிக்கு என்ன வயசு?',
				'உங்க தம்பிக்கு எத்தனை வயசு?',
				'unga thambikku enna vayasu?',
				'unga thambikku ethanai vayasu?'
			],
			canonicalAnswer: 'உங்க தம்பிக்கு என்ன வயசு?',
			hints: ['Age goes on the person with dative -க்கு', 'வயசு = age']
		},
		{
			kind: 'completion',
			id: 'ta-05-e03',
			lessonId: 'ta-05',
			constructions: ['ta-oda-possessive'],
			prompt: 'Fill the gap: “My elder sister lives in Bengaluru.”',
			template: '___ அக்கா பெங்களூர்ல இருக்காங்க.',
			options: ['என்னோட', 'எனக்கு', 'நான்'],
			answer: 'என்னோட',
			rule: 'Possession before a noun uses -ஓட (or bare என்/உங்க): என்னோட அக்கா = my elder sister. எனக்கு is the dative “to me”, not a possessive.'
		},
		{
			kind: 'transfer',
			id: 'ta-05-e04',
			lessonId: 'ta-05',
			constructions: ['ta-irukkaanga-plural-be'],
			prompt: 'Answer the question in Tamil for your own (imagined) family.',
			situation:
				'A new colleague asks who is in your family. Tell them your mom and dad live in Madurai.',
			useConstruction: 'ta-irukkaanga-plural-be',
			exemplar: 'என் அம்மா அப்பா மதுரைல இருக்காங்க.'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
