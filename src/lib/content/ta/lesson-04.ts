import type { Lesson } from '../../schemas/content';

/**
 * Lesson 4 — Asking where something is.
 * Priya stops a passer-by in T. Nagar to find a pharmacy and the bus stop.
 * Contemporary educated spoken Tamil (Chennai).
 */
export const lesson: Lesson = {
	id: 'ta-04',
	language: 'ta',
	index: 4,
	kind: 'regular',
	title: 'Asking where something is',
	situation:
		'Priya stops Arun on a busy street to ask where the pharmacy is, gets simple directions, and checks where the bus stop is.',
	level: 'A0',
	lines: [
		{
			id: 'ta-04-l01',
			lessonId: 'ta-04',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அண்ணா, இங்க பக்கத்துல மெடிக்கல் ஷாப் இருக்கா?',
			transliteration: 'aNNaa, inga pakkaththula medical shop irukkaa?',
			literalEnglish: 'Elder-brother, here nearby-in medical shop is-there-QUESTION?',
			naturalEnglish: 'Excuse me, is there a pharmacy near here?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-04.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 0,
				endMs: 3800
			},
			chunks: [
				{ label: 'அண்ணா, இங்க பக்கத்துல', startMs: 0, endMs: 1900 },
				{ label: 'மெடிக்கல் ஷாப் இருக்கா?', startMs: 1900, endMs: 3800 }
			],
			constructions: ['ta-position-postposition-la', 'ta-aa-yesno-question'],
			notes: [
				{
					type: 'culture',
					text: 'A pharmacy is universally called a மெடிக்கல் ஷாப் ("medical shop") in Chennai — asking for a "pharmacy" may get blank looks. English loans like this are normal spoken Tamil.',
					anchor: 'மெடிக்கல் ஷாப்'
				},
				{
					type: 'morphology',
					text: 'பக்கத்துல = பக்கம் "side/nearness" + locative -ல: "in the vicinity". English "near here" hides that Tamil says "here nearness-in".',
					anchor: 'பக்கத்துல'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-04-l02',
			lessonId: 'ta-04',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'இருக்கு, மேடம். அந்த சிக்னல் பக்கத்துல இருக்கு.',
			transliteration: 'irukku, madam. andha signal pakkaththula irukku.',
			literalEnglish: 'Is-there, madam. That signal nearness-in is-there.',
			naturalEnglish: 'Yes there is, madam. It is next to that traffic signal.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-04.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 3800,
				endMs: 7200
			},
			chunks: [],
			constructions: ['ta-position-postposition-la'],
			notes: [
				{
					type: 'culture',
					text: 'சிக்னல் ("signal") means a traffic light and is a standard Chennai landmark for giving directions.',
					anchor: 'சிக்னல்'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-04-l03',
			lessonId: 'ta-04',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'சிக்னல் எங்க இருக்கு?',
			transliteration: 'signal enga irukku?',
			literalEnglish: 'Signal where is?',
			naturalEnglish: 'Where is the signal?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-04.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 7200,
				endMs: 9600
			},
			chunks: [],
			constructions: ['ta-enga-irukku-where'],
			notes: [
				{
					type: 'grammar',
					text: 'The all-purpose "where is X?" pattern: X + எங்க + இருக்கு. எங்க is spoken for literary எங்கே, இருக்கு for இருக்கிறது. The thing you are looking for comes first.',
					anchor: 'எங்க இருக்கு'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-04-l04',
			lessonId: 'ta-04',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'இந்த ரோட்ல நேரா போங்க.',
			transliteration: 'indha road-la neraa ponga.',
			literalEnglish: 'This road-on straight go-you(polite).',
			naturalEnglish: 'Go straight along this road.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-04.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 9600,
				endMs: 12200
			},
			chunks: [],
			constructions: ['ta-la-locative', 'ta-nga-polite-imperative'],
			notes: [
				{
					type: 'morphology',
					text: 'ரோட்ல = "road" + locative -ல ("on/in/at"). The suffix -ல does the work of English prepositions on/in/at, but attaches to the END of the noun: road-la = "on the road".',
					anchor: 'ரோட்ல'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-04-l05',
			lessonId: 'ta-04',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அப்புறம் லெப்ட்ல திரும்புங்க.',
			transliteration: 'appuRam left-la thirumbunga.',
			literalEnglish: 'Afterwards left-at turn-you(polite).',
			naturalEnglish: 'Then turn left.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-04.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 12200,
				endMs: 14800
			},
			chunks: [],
			constructions: ['ta-la-locative', 'ta-nga-polite-imperative'],
			notes: [
				{
					type: 'culture',
					text: 'Directions in Chennai freely mix English "left"/"right" into Tamil: லெப்ட்ல திரும்புங்க, ரைட்ல போங்க. The pure Tamil இடது/வலது is understood but sounds bookish on the street.',
					anchor: 'லெப்ட்ல'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-04-l06',
			lessonId: 'ta-04',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'பஸ் ஸ்டாப்பும் அங்க தான் இருக்கா?',
			transliteration: 'bus stop-um anga dhaan irukkaa?',
			literalEnglish: 'Bus stop-also there EMPHASIS is-QUESTION?',
			naturalEnglish: 'Is the bus stop there too?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-04.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 14800,
				endMs: 17700
			},
			chunks: [],
			constructions: ['ta-aa-yesno-question'],
			notes: [
				{
					type: 'grammar',
					text: 'Two little suffixes do a lot here: -உம் on ஸ்டாப்பும் means "also", and தான் adds emphasis ("right there"). Both follow the word they modify.',
					anchor: 'ஸ்டாப்பும் அங்க தான்'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-04-l07',
			lessonId: 'ta-04',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'இல்ல, பஸ் ஸ்டாப் கோவில் எதிர்ல இருக்கு.',
			transliteration: 'illa, bus stop kovil edhirla irukku.',
			literalEnglish: 'No, bus stop temple opposite-at is.',
			naturalEnglish: 'No, the bus stop is opposite the temple.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-04.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 17700,
				endMs: 21000
			},
			chunks: [
				{ label: 'இல்ல', startMs: 17700, endMs: 18500 },
				{ label: 'பஸ் ஸ்டாப் கோவில் எதிர்ல இருக்கு', startMs: 18500, endMs: 21000 }
			],
			constructions: ['ta-position-postposition-la'],
			notes: [
				{
					type: 'morphology',
					text: 'எதிர்ல = எதிர் "opposite side" + -ல. Position words like பக்கத்துல (next to), எதிர்ல (opposite), உள்ள (inside) come AFTER the landmark: கோவில் எதிர்ல = "temple opposite-at" = "opposite the temple".',
					anchor: 'கோவில் எதிர்ல'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-04-l08',
			lessonId: 'ta-04',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'கோவில் இங்க இருந்து தூரமா?',
			transliteration: 'kovil inga irundhu dhooramaa?',
			literalEnglish: 'Temple here from far-QUESTION?',
			naturalEnglish: 'Is the temple far from here?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-04.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 21000,
				endMs: 23800
			},
			chunks: [],
			constructions: ['ta-aa-yesno-question'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-04-l09',
			lessonId: 'ta-04',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'இல்ல, ரொம்ப பக்கம். ரெண்டு நிமிஷம் தான்.',
			transliteration: 'illa, romba pakkam. reNdu nimisham dhaan.',
			literalEnglish: 'No, very near. Two minute only.',
			naturalEnglish: 'No, it is very close. Just two minutes.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-04.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 23800,
				endMs: 26700
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-04-l10',
			lessonId: 'ta-04',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ரொம்ப தேங்க்ஸ், அண்ணா!',
			transliteration: 'romba thanks, aNNaa!',
			literalEnglish: 'Very thanks, elder-brother!',
			naturalEnglish: 'Thanks a lot!',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-04.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 26700,
				endMs: 28900
			},
			chunks: [],
			constructions: [],
			notes: [
				{
					type: 'culture',
					text: 'ரொம்ப தேங்க்ஸ் (English "thanks" with Tamil ரொம்ப "very") is the everyday way to thank a stranger in Chennai. The pure Tamil நன்றி is common in writing and announcements but sounds formal in speech.',
					anchor: 'ரொம்ப தேங்க்ஸ்'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		}
	],
	constructions: [
		{
			id: 'ta-enga-irukku-where',
			language: 'ta',
			label: 'NOUN + எங்க இருக்கு? (where is …?)',
			gloss: 'asking location: thing + enga (where) + irukku (is)',
			introducedIn: 'ta-04',
			notes:
				'Spoken forms: எங்க for literary எங்கே, இருக்கு for இருக்கிறது. The sought item always comes first.'
		},
		{
			id: 'ta-la-locative',
			language: 'ta',
			label: 'NOUN + -ல (in/on/at)',
			gloss: 'locative case suffix -la marks place (road-la "on the road")',
			introducedIn: 'ta-04',
			notes: 'Spoken -ல corresponds to literary -இல்; it does the work of English in/on/at but is suffixed.'
		},
		{
			id: 'ta-position-postposition-la',
			language: 'ta',
			label: 'LANDMARK + பக்கத்துல / எதிர்ல (next to / opposite)',
			gloss: 'position postpositions built on -la: pakkaththula (near), edhirla (opposite)',
			introducedIn: 'ta-04',
			notes:
				'The landmark comes first, the position word after: kovil edhirla = "opposite the temple".'
		},
		{
			id: 'ta-nga-polite-imperative',
			language: 'ta',
			label: 'VERB + -ங்க (polite request)',
			gloss: 'polite imperative: verb stem + -nga (ponga "please go", thirumbunga "please turn")',
			introducedIn: 'ta-03',
			notes: 'Introduced in lesson 3 with kudunga; reused here for directions: ponga, thirumbunga.'
		},
		{
			id: 'ta-aa-yesno-question',
			language: 'ta',
			label: 'STATEMENT + -ஆ (yes-no question)',
			gloss: 'question suffix -aa turns a statement into a yes-no question (irukku → irukkaa?)',
			introducedIn: 'ta-01',
			notes: 'Introduced in lesson 3; here also on adjectives: dhooram → dhooramaa? ("is it far?").'
		}
	],
	exercises: [
		{
			id: 'ta-04-e01',
			lessonId: 'ta-04',
			kind: 'comprehension',
			constructions: ['ta-position-postposition-la'],
			prompt: 'Arun says "பஸ் ஸ்டாப் கோவில் எதிர்ல இருக்கு." Where is the bus stop?',
			lineId: 'ta-04-l07',
			options: [
				'Inside the temple.',
				'Opposite the temple.',
				'Next to the signal.',
				'Far from the temple.'
			],
			answerIndex: 1
		},
		{
			id: 'ta-04-e02',
			lessonId: 'ta-04',
			kind: 'comprehension',
			constructions: ['ta-la-locative', 'ta-nga-polite-imperative'],
			prompt: 'Arun tells Priya "இந்த ரோட்ல நேரா போங்க." What should she do?',
			lineId: 'ta-04-l04',
			options: [
				'Turn left at the road.',
				'Wait at the road.',
				'Go straight along this road.',
				'Cross to the other road.'
			],
			answerIndex: 2
		},
		{
			id: 'ta-04-e03',
			lessonId: 'ta-04',
			kind: 'recall',
			constructions: ['ta-enga-irukku-where'],
			prompt: 'Ask a stranger: "Where is the bus stop?"',
			acceptedAnswers: [
				'பஸ் ஸ்டாப் எங்க இருக்கு?',
				'அண்ணா, பஸ் ஸ்டாப் எங்க இருக்கு?',
				'bus stop enga irukku?',
				'anna, bus stop enga irukku?'
			],
			canonicalAnswer: 'பஸ் ஸ்டாப் எங்க இருக்கு?',
			hints: [
				'The thing you are looking for comes first.',
				'"Where is …?" is … எங்க இருக்கு? (enga irukku).'
			]
		},
		{
			id: 'ta-04-e04',
			lessonId: 'ta-04',
			kind: 'recall',
			constructions: ['ta-aa-yesno-question', 'ta-position-postposition-la'],
			prompt: 'Ask: "Is there a medical shop near here?"',
			lineId: 'ta-04-l01',
			acceptedAnswers: [
				'இங்க பக்கத்துல மெடிக்கல் ஷாப் இருக்கா?',
				'அண்ணா, இங்க பக்கத்துல மெடிக்கல் ஷாப் இருக்கா?',
				'inga pakkathula medical shop irukkaa?',
				'inga pakkaththula medical shop irukkaa?'
			],
			canonicalAnswer: 'இங்க பக்கத்துல மெடிக்கல் ஷாப் இருக்கா?',
			hints: ['"Near here" = இங்க பக்கத்துல.', 'Turn இருக்கு into a question with -ஆ: இருக்கா?']
		},
		{
			id: 'ta-04-e05',
			lessonId: 'ta-04',
			kind: 'completion',
			constructions: ['ta-enga-irukku-where'],
			prompt: 'Complete Priya\'s question about the signal.',
			template: 'சிக்னல் ___ இருக்கு?',
			options: ['எங்க', 'எவ்ளோ', 'அங்க'],
			answer: 'எங்க',
			rule: '"Where is X?" is X + எங்க இருக்கு?; எவ்ளோ asks "how much" and அங்க means "there".'
		},
		{
			id: 'ta-04-e06',
			lessonId: 'ta-04',
			kind: 'transfer',
			constructions: ['ta-enga-irukku-where', 'ta-position-postposition-la'],
			prompt: 'You just got off the bus in a new neighbourhood and need an ATM (ஏடிஎம்).',
			situation:
				'Stop a passer-by and ask where the ATM is — the same move you made for the signal, with a new target. Then confirm your guess that it is next to the bank (பேங்க் / bank).',
			useConstruction: 'ta-enga-irukku-where',
			exemplar: 'அண்ணா, ஏடிஎம் எங்க இருக்கு? பேங்க் பக்கத்துல இருக்கா?'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
