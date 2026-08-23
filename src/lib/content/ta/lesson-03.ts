import type { Lesson } from '../../schemas/content';

/**
 * Lesson 3 — Numbers & paying.
 * Priya buys fruit and water at a small street-corner shop in Chennai and pays
 * with a hundred-rupee note. Contemporary educated spoken Tamil (Chennai).
 */
export const lesson: Lesson = {
	id: 'ta-03',
	language: 'ta',
	index: 3,
	kind: 'regular',
	title: 'Numbers & paying',
	situation:
		'Priya buys bananas and a bottle of water at a small shop, asks prices, and pays with a 100-rupee note.',
	level: 'A0',
	lines: [
		{
			id: 'ta-03-l01',
			lessonId: 'ta-03',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அண்ணா, இந்த வாழைப்பழம் எவ்ளோ?',
			transliteration: 'aNNaa, indha vaazhaippazham evLo?',
			literalEnglish: 'Elder-brother, this banana how-much?',
			naturalEnglish: 'Excuse me, how much are these bananas?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-03.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 0,
				endMs: 3200
			},
			chunks: [],
			constructions: ['ta-evlo-price-question'],
			notes: [
				{
					type: 'culture',
					text: 'அண்ணா ("elder brother") is the standard friendly way to address a male shopkeeper or auto driver in Chennai — it is polite, not familial. Women of similar age are addressed as அக்கா ("elder sister").',
					anchor: 'அண்ணா'
				},
				{
					type: 'grammar',
					text: 'எவ்ளோ is the spoken contraction of literary எவ்வளவு ("how much"). Price questions need no verb: "இந்த X எவ்ளோ?" is a complete sentence.',
					anchor: 'எவ்ளோ'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-03-l02',
			lessonId: 'ta-03',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ஒரு பழம் அஞ்சு ரூபா, மேடம்.',
			transliteration: 'oru pazham anju roobaa, madam.',
			literalEnglish: 'One fruit five rupee, madam.',
			naturalEnglish: 'Five rupees a piece, madam.',
			speaker: 'Murugan',
			audio: {
				normalUrl: '/audio/ta/ta-03.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 3200,
				endMs: 6100
			},
			chunks: [],
			constructions: ['ta-numeral-noun-counting'],
			notes: [
				{
					type: 'morphology',
					text: 'Counted nouns stay singular in Tamil: அஞ்சு ரூபா is literally "five rupee". No plural marker after a numeral. அஞ்சு is the spoken form of ஐந்து, ரூபா of ரூபாய்.',
					anchor: 'அஞ்சு ரூபா'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-03-l03',
			lessonId: 'ta-03',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'சரி, ஆறு பழம் குடுங்க.',
			transliteration: 'sari, aaRu pazham kudunga.',
			literalEnglish: 'Okay, six fruit give-you(polite).',
			naturalEnglish: 'Okay, give me six bananas.',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-03.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 6100,
				endMs: 8900
			},
			chunks: [],
			constructions: ['ta-numeral-noun-counting', 'ta-nga-polite-imperative'],
			notes: [
				{
					type: 'morphology',
					text: 'குடுங்க = spoken குடு ("give", literary கொடு) + polite imperative -ங்க. The -ங்க ending turns any command into a polite request; you will hear it constantly (வாங்க "come", சொல்லுங்க "say").',
					anchor: 'குடுங்க'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-03-l04',
			lessonId: 'ta-03',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ஆறு பழம் முப்பது ரூபா ஆகும், மேடம்.',
			transliteration: 'aaRu pazham muppadhu roobaa aagum, madam.',
			literalEnglish: 'Six fruit thirty rupee will-become, madam.',
			naturalEnglish: 'Six bananas will come to thirty rupees, madam.',
			speaker: 'Murugan',
			audio: {
				normalUrl: '/audio/ta/ta-03.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 8900,
				endMs: 12400
			},
			chunks: [
				{ label: 'ஆறு பழம்', startMs: 8900, endMs: 10200 },
				{ label: 'முப்பது ரூபா ஆகும்', startMs: 10200, endMs: 11700 },
				{ label: 'மேடம்', startMs: 11700, endMs: 12400 }
			],
			constructions: ['ta-numeral-noun-counting', 'ta-aagum-cost'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-03-l05',
			lessonId: 'ta-03',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'இந்த தண்ணி பாட்டில் எவ்ளோ?',
			transliteration: 'indha thaNNi bottle evLo?',
			literalEnglish: 'This water bottle how-much?',
			naturalEnglish: 'How much is this water bottle?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-03.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 12400,
				endMs: 15100
			},
			chunks: [],
			constructions: ['ta-evlo-price-question'],
			notes: [
				{
					type: 'culture',
					text: 'தண்ணி (spoken; literary தண்ணீர்) is everyday Chennai speech for "water". English loanwords like "bottle" are completely normal in spoken Tamil and are written in Tamil script.',
					anchor: 'தண்ணி பாட்டில்'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-03-l06',
			lessonId: 'ta-03',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அது இருபது ரூபா.',
			transliteration: 'adhu irubadhu roobaa.',
			literalEnglish: 'That twenty rupee.',
			naturalEnglish: 'That one is twenty rupees.',
			speaker: 'Murugan',
			audio: {
				normalUrl: '/audio/ta/ta-03.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 15100,
				endMs: 17500
			},
			chunks: [],
			constructions: ['ta-numeral-noun-counting'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-03-l07',
			lessonId: 'ta-03',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'மொத்தம் எவ்ளோ ஆகுது?',
			transliteration: 'moththam evLo aagudhu?',
			literalEnglish: 'Total how-much becomes?',
			naturalEnglish: 'How much does it come to in total?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-03.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 17500,
				endMs: 20100
			},
			chunks: [],
			constructions: ['ta-evlo-price-question', 'ta-aagum-cost'],
			notes: [
				{
					type: 'morphology',
					text: 'ஆகுது is the spoken present of ஆகு "become" (literary ஆகிறது). With prices, ஆகுது/ஆகும் means "comes to / will come to". English "How much does it cost?" hides that Tamil literally says "how much becomes?".',
					anchor: 'ஆகுது'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-03-l08',
			lessonId: 'ta-03',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'மொத்தம் அம்பது ரூபா, மேடம்.',
			transliteration: 'moththam ambadhu roobaa, madam.',
			literalEnglish: 'Total fifty rupee, madam.',
			naturalEnglish: 'Fifty rupees in total, madam.',
			speaker: 'Murugan',
			audio: {
				normalUrl: '/audio/ta/ta-03.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 20100,
				endMs: 22700
			},
			chunks: [],
			constructions: ['ta-numeral-noun-counting'],
			notes: [
				{
					type: 'pronunciation',
					text: 'அம்பது is how ஐம்பது ("fifty") sounds in everyday Chennai speech — the initial ஐ- of numerals flattens to அ- (compare அஞ்சு for ஐந்து "five").',
					anchor: 'அம்பது'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-03-l09',
			lessonId: 'ta-03',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'இந்தாங்க, நூறு ரூபா. சில்லறை இருக்கா?',
			transliteration: 'indhaanga, nooRu roobaa. chillaRai irukkaa?',
			literalEnglish: 'Here-you-go(polite), hundred rupee. Change is-there-QUESTION?',
			naturalEnglish: 'Here you go, a hundred rupees. Do you have change?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-03.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 22700,
				endMs: 26600
			},
			chunks: [
				{ label: 'இந்தாங்க, நூறு ரூபா', startMs: 22700, endMs: 24800 },
				{ label: 'சில்லறை இருக்கா?', startMs: 24800, endMs: 26600 }
			],
			constructions: ['ta-numeral-noun-counting', 'ta-aa-yesno-question'],
			notes: [
				{
					type: 'morphology',
					text: 'இருக்கா = இருக்கு (spoken "is/exists"; literary இருக்கிறது) + question suffix -ஆ. Any statement becomes a yes-no question by adding -ஆ to the last word — no word-order change, unlike English "Is there…?".',
					anchor: 'இருக்கா'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-03-l10',
			lessonId: 'ta-03',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'இருக்கு, மேடம். இந்தாங்க, அம்பது ரூபா.',
			transliteration: 'irukku, madam. indhaanga, ambadhu roobaa.',
			literalEnglish: 'Is-there, madam. Here-you-go(polite), fifty rupee.',
			naturalEnglish: 'Yes I do, madam. Here you go, fifty rupees.',
			speaker: 'Murugan',
			audio: {
				normalUrl: '/audio/ta/ta-03.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 26600,
				endMs: 29900
			},
			chunks: [],
			constructions: ['ta-numeral-noun-counting'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		}
	],
	constructions: [
		{
			id: 'ta-evlo-price-question',
			language: 'ta',
			label: 'NOUN + எவ்ளோ? (price question)',
			gloss: 'how much is/are NOUN? — verbless price question with spoken evLo',
			introducedIn: 'ta-03',
			notes:
				'எவ்ளோ is the spoken contraction of எவ்வளவு. "இந்த X எவ்ளோ?" needs no verb; add மொத்தம் for "in total".'
		},
		{
			id: 'ta-numeral-noun-counting',
			language: 'ta',
			label: 'NUMERAL + singular NOUN',
			gloss: 'counting: numeral plus unmarked singular noun (aaRu pazham "six banana(s)")',
			introducedIn: 'ta-03',
			notes:
				'Nouns take no plural marker after a numeral. Spoken numerals: onnu, reNdu, moonu, naalu, anju, aaRu, muppadhu, ambadhu, nooRu.'
		},
		{
			id: 'ta-nga-polite-imperative',
			language: 'ta',
			label: 'VERB + -ங்க (polite request)',
			gloss: 'polite imperative: verb stem + -nga (kudunga "please give")',
			introducedIn: 'ta-03',
			notes: 'Attaches to the spoken verb stem: kudu → kudunga, vaa → vaanga, sollu → sollunga.'
		},
		{
			id: 'ta-aagum-cost',
			language: 'ta',
			label: 'PRICE + ஆகும்/ஆகுது (comes to)',
			gloss: 'stating a total: amount + aagum (will come to) / aagudhu (comes to)',
			introducedIn: 'ta-03',
			notes: 'Literally "becomes". moththam evLo aagudhu? = "what does the total come to?"'
		},
		{
			id: 'ta-aa-yesno-question',
			language: 'ta',
			label: 'STATEMENT + -ஆ (yes-no question)',
			gloss: 'question suffix -aa turns a statement into a yes-no question (irukku → irukkaa?)',
			introducedIn: 'ta-01',
			notes: 'No word-order change; -aa attaches to the final word of the statement.'
		}
	],
	exercises: [
		{
			id: 'ta-03-e01',
			lessonId: 'ta-03',
			kind: 'comprehension',
			constructions: ['ta-aagum-cost', 'ta-numeral-noun-counting'],
			prompt: 'Murugan says "ஆறு பழம் முப்பது ரூபா ஆகும், மேடம்." What does he mean?',
			lineId: 'ta-03-l04',
			options: [
				'Six bananas will come to thirty rupees.',
				'Three bananas cost sixty rupees.',
				'The bananas are sold out.',
				'He only accepts exact change.'
			],
			answerIndex: 0
		},
		{
			id: 'ta-03-e02',
			lessonId: 'ta-03',
			kind: 'comprehension',
			constructions: ['ta-aa-yesno-question'],
			prompt: 'Priya hands over a hundred rupees and asks "சில்லறை இருக்கா?" What is she asking?',
			lineId: 'ta-03-l09',
			options: [
				'Whether the shop is open.',
				'Whether the shopkeeper has change.',
				'Whether the water is cold.',
				'Whether she can pay later.'
			],
			answerIndex: 1
		},
		{
			id: 'ta-03-e03',
			lessonId: 'ta-03',
			kind: 'recall',
			constructions: ['ta-evlo-price-question'],
			prompt: 'Ask a shopkeeper: "How much are these bananas?"',
			lineId: 'ta-03-l01',
			acceptedAnswers: [
				'இந்த வாழைப்பழம் எவ்ளோ?',
				'அண்ணா, இந்த வாழைப்பழம் எவ்ளோ?',
				'indha vaazhaippazham evlo?',
				'anna, indha vaazhaippazham evlo?'
			],
			canonicalAnswer: 'அண்ணா, இந்த வாழைப்பழம் எவ்ளோ?',
			hints: ['"How much" in spoken Tamil is எவ்ளோ (evLo).', 'No verb needed: "this banana how-much?"']
		},
		{
			id: 'ta-03-e04',
			lessonId: 'ta-03',
			kind: 'recall',
			constructions: ['ta-numeral-noun-counting', 'ta-nga-polite-imperative'],
			prompt: 'Politely ask the shopkeeper to give you two water bottles.',
			acceptedAnswers: [
				'ரெண்டு தண்ணி பாட்டில் குடுங்க.',
				'ரெண்டு தண்ணி பாட்டில் குடுங்க',
				'rendu thanni bottle kudunga',
				'reNdu thaNNi bottle kudunga'
			],
			canonicalAnswer: 'ரெண்டு தண்ணி பாட்டில் குடுங்க.',
			hints: ['"Two" in spoken Tamil is ரெண்டு (reNdu).', 'End with the polite request form of "give": குடுங்க.']
		},
		{
			id: 'ta-03-e05',
			lessonId: 'ta-03',
			kind: 'completion',
			constructions: ['ta-aagum-cost'],
			prompt: 'Complete Priya\'s question about the total.',
			template: 'மொத்தம் எவ்ளோ ___?',
			options: ['ஆகுது', 'இருக்கா', 'குடுங்க'],
			answer: 'ஆகுது',
			rule: 'Totals are stated with ஆகு "become": மொத்தம் எவ்ளோ ஆகுது? = "how much does the total come to?"'
		},
		{
			id: 'ta-03-e06',
			lessonId: 'ta-03',
			kind: 'transfer',
			constructions: ['ta-evlo-price-question', 'ta-nga-polite-imperative'],
			prompt: 'You are at a fruit stall and want mangoes (மாம்பழம் / maampazham).',
			situation:
				'Ask the price of a mango, then ask the vendor to give you four of them — the same moves you made for bananas, with a new fruit and a new number (naalu = four).',
			useConstruction: 'ta-evlo-price-question',
			exemplar: 'அண்ணா, இந்த மாம்பழம் எவ்ளோ? நாலு பழம் குடுங்க.'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
