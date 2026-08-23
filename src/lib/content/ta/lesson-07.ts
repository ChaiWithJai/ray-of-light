import type { Lesson } from '../../schemas/content';

/**
 * Lesson 7 — REVIEW (synthesis of lessons 1-6).
 * Recombines: greetings (1), ordering tea (2), numbers & paying (3),
 * asking where (4), family (5), daily routine (6). No new constructions.
 */
export const lesson: Lesson = {
	id: 'ta-07',
	language: 'ta',
	index: 7,
	kind: 'synthesis',
	title: 'ஒரு டீ, ஒரு அரட்டை',
	situation:
		'Priya runs into Arun on the street in Chennai. They find a tea stall, order, pay, and catch up about family and daily routines — everything from lessons 1-6 in one scene.',
	level: 'A0',
	lines: [
		{
			id: 'ta-07-l01',
			lessonId: 'ta-07',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'வணக்கம் அருண்! எப்படி இருக்கீங்க?',
			transliteration: 'vanakkam Arun! eppadi irukkeenga?',
			literalEnglish: 'greetings Arun! how are-you(polite)?',
			naturalEnglish: 'Hi Arun! How are you?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-07.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 0,
				endMs: 3200
			},
			chunks: [],
			constructions: ['ta-vanakkam-greeting', 'ta-eppadi-irukkeenga-how-are-you'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-07-l02',
			lessonId: 'ta-07',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'நல்லா இருக்கேன், நீங்க? இந்த பக்கத்துல நல்ல டீ கடை எங்க இருக்கு?',
			transliteration: 'nallaa irukken, neenga? indha pakkathula nalla tea kadai enga irukku?',
			literalEnglish: 'well am-I, you(polite)? this side-in good tea shop where is?',
			naturalEnglish: "I'm good, and you? Where's a good tea shop around here?",
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-07.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 3200,
				endMs: 7800
			},
			chunks: [
				{ label: 'nallaa irukken, neenga?', startMs: 3200, endMs: 5000 },
				{ label: 'indha pakkathula', startMs: 5000, endMs: 6200 },
				{ label: 'nalla tea kadai enga irukku?', startMs: 6200, endMs: 7800 }
			],
			constructions: ['ta-enga-irukku-where'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-07-l03',
			lessonId: 'ta-07',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அதோ, பஸ் ஸ்டாப் பக்கத்துல இருக்கு. வாங்க, போகலாம்.',
			transliteration: 'adho, bus stop pakkathula irukku. vaanga, pogalaam.',
			literalEnglish: 'there-look, bus stop near-in is. come(polite), go-let-us.',
			naturalEnglish: "There, right next to the bus stop. Come on, let's go.",
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-07.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 7800,
				endMs: 11600
			},
			chunks: [],
			constructions: ['ta-enga-irukku-where'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-07-l04',
			lessonId: 'ta-07',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அண்ணா, ரெண்டு டீ வேணும். சக்கரை கம்மியா போடுங்க.',
			transliteration: 'annaa, rendu tea veenum. sakkarai kammiyaa podunga.',
			literalEnglish: 'elder-brother, two tea wanted. sugar less-ly put(polite).',
			naturalEnglish: 'Anna, two teas please. Go easy on the sugar.',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-07.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 11600,
				endMs: 15800
			},
			chunks: [
				{ label: 'annaa, rendu tea veenum', startMs: 11600, endMs: 13800 },
				{ label: 'sakkarai kammiyaa podunga', startMs: 13800, endMs: 15800 }
			],
			constructions: ['ta-veenum-want', 'ta-nga-polite-imperative'],
			notes: [
				{
					type: 'culture',
					text: 'Strangers at shops are addressed with kinship terms: அண்ணா (annaa, "elder brother") to a man your age or older, தம்பி (thambi, "younger brother") to a younger man. It is friendly, not familial.',
					anchor: 'அண்ணா'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-07-l05',
			lessonId: 'ta-07',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'டீ நல்லா இருக்கு! அண்ணா, எவ்ளோ ஆச்சு?',
			transliteration: 'tea nallaa irukku! annaa, evlo aachu?',
			literalEnglish: 'tea well is! elder-brother, how-much became?',
			naturalEnglish: 'The tea is great! Anna, how much do we owe you?',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-07.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 15800,
				endMs: 19200
			},
			chunks: [],
			constructions: ['ta-evlo-price-question'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-07-l06',
			lessonId: 'ta-07',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'முப்பது ரூபா, தம்பி.',
			transliteration: 'muppadhu roobaa, thambi.',
			literalEnglish: 'thirty rupee, younger-brother.',
			naturalEnglish: 'Thirty rupees, thambi.',
			speaker: 'Murugan',
			audio: {
				normalUrl: '/audio/ta/ta-07.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 19200,
				endMs: 21600
			},
			chunks: [],
			constructions: ['ta-evlo-price-question'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-07-l07',
			lessonId: 'ta-07',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அருண், உங்க அம்மா எப்படி இருக்காங்க?',
			transliteration: 'Arun, unga ammaa eppadi irukkaanga?',
			literalEnglish: 'Arun, your(polite) mother how is-she(polite)?',
			naturalEnglish: "Arun, how's your mother doing?",
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-07.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 21600,
				endMs: 25200
			},
			chunks: [],
			constructions: ['ta-oda-possessive', 'ta-eppadi-irukkeenga-how-are-you'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-07-l08',
			lessonId: 'ta-07',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'நல்லா இருக்காங்க. தினமும் காலைல ஆறு மணிக்கு எந்திரிச்சு நடக்க போறாங்க.',
			transliteration: 'nallaa irukkaanga. dhinamum kaalaila aaru manikku endhirichu nadakka poraanga.',
			literalEnglish:
				'well is-she(polite). daily morning-in six o-clock-at having-gotten-up to-walk goes-she(polite).',
			naturalEnglish: "She's doing well. Every day she gets up at six and goes for a walk.",
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-07.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 25200,
				endMs: 30400
			},
			chunks: [
				{ label: 'nallaa irukkaanga', startMs: 25200, endMs: 26800 },
				{ label: 'dhinamum kaalaila aaru manikku', startMs: 26800, endMs: 28600 },
				{ label: 'endhirichu nadakka poraanga', startMs: 28600, endMs: 30400 }
			],
			constructions: ['ta-habitual-present', 'ta-manikku-time'],
			notes: [
				{
					type: 'morphology',
					text: 'எந்திரிச்சு (endhirichu) is a spoken past participle: "having gotten up". Tamil chains actions with participles where English uses "and": gets-up-HAVING walk-goes. The time phrase takes dative -க்கு: ஆறு மணிக்கு = "at six o\'clock".',
					anchor: 'ஆறு மணிக்கு எந்திரிச்சு'
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
			gloss: 'All-purpose greeting: hello / good day.',
			introducedIn: 'ta-01'
		},
		{
			id: 'ta-eppadi-irukkeenga-how-are-you',
			language: 'ta',
			label: 'எப்படி இருக்கீங்க? (how are you)',
			gloss: 'eppadi + spoken irukk- forms to ask how someone is doing.',
			introducedIn: 'ta-01'
		},
		{
			id: 'ta-veenum-want',
			language: 'ta',
			label: 'NOUN + வேணும் (want/need)',
			gloss: 'Spoken வேணும் states a want or order: "rendu tea veenum".',
			introducedIn: 'ta-02'
		},
		{
			id: 'ta-nga-polite-imperative',
			language: 'ta',
			label: 'verb + -ங்க polite imperative (kudunga, podunga)',
			gloss: 'The -ங்க ending makes a request polite: kudunga "please give".',
			introducedIn: 'ta-03'
		},
		{
			id: 'ta-evlo-price-question',
			language: 'ta',
			label: 'எவ்ளோ ஆச்சு? (how much is it)',
			gloss: 'Spoken evlo aachu asks the total when paying; answered with number + roobaa.',
			introducedIn: 'ta-03'
		},
		{
			id: 'ta-enga-irukku-where',
			language: 'ta',
			label: 'X எங்க இருக்கு? (where is X)',
			gloss: 'enga + spoken irukku asks/states location, with locative -ல (pakkathula).',
			introducedIn: 'ta-04'
		},
		{
			id: 'ta-oda-possessive',
			language: 'ta',
			label: 'என் / உங்க + kin term (my/your family)',
			gloss: 'Possessive pronoun before a kinship term: unga ammaa "your mother".',
			introducedIn: 'ta-05'
		},
		{
			id: 'ta-habitual-present',
			language: 'ta',
			label: 'verb + -றேன்/-றாங்க habitual present',
			gloss: 'Spoken present -r- forms describe routines: poren "I go", poraanga "she goes".',
			introducedIn: 'ta-06'
		},
		{
			id: 'ta-manikku-time',
			language: 'ta',
			label: 'TIME + மணிக்கு (at X o\'clock)',
			gloss: 'Clock times take dative -க்கு: aaru manikku "at six".',
			introducedIn: 'ta-06'
		}
	],
	exercises: [
		{
			kind: 'comprehension',
			id: 'ta-07-e01',
			lessonId: 'ta-07',
			constructions: ['ta-evlo-price-question'],
			prompt: 'Arun asks "annaa, evlo aachu?" — what does he want to know?',
			lineId: 'ta-07-l05',
			options: [
				'How much the teas cost',
				'Where the tea shop is',
				'How the shopkeeper is doing',
				'What time the shop closes'
			],
			answerIndex: 0
		},
		{
			kind: 'recall',
			id: 'ta-07-e02',
			lessonId: 'ta-07',
			constructions: ['ta-veenum-want'],
			prompt: 'You are at a tea stall. Order two teas.',
			lineId: 'ta-07-l04',
			acceptedAnswers: [
				'ரெண்டு டீ வேணும்',
				'அண்ணா, ரெண்டு டீ வேணும்',
				'rendu tea veenum',
				'annaa, rendu tea veenum'
			],
			canonicalAnswer: 'அண்ணா, ரெண்டு டீ வேணும்.',
			hints: ['rendu = two', 'Wanting something is NOUN + வேணும்']
		},
		{
			kind: 'transfer',
			id: 'ta-07-e03',
			lessonId: 'ta-07',
			constructions: ['ta-veenum-want', 'ta-evlo-price-question'],
			prompt: 'Order for yourself in a new shop, then ask the total.',
			situation:
				'You walk into a bakery you have never been to, want two coffees and one bun, and need to know what you owe.',
			useConstruction: 'ta-veenum-want',
			exemplar: 'அண்ணா, ரெண்டு காபி, ஒரு பன் வேணும். எவ்ளோ ஆச்சு?'
		},
		{
			kind: 'transfer',
			id: 'ta-07-e04',
			lessonId: 'ta-07',
			constructions: ['ta-enga-irukku-where'],
			prompt: 'Ask where something is in a new place.',
			situation:
				'You are at a railway station for the first time and need to find the ticket counter.',
			useConstruction: 'ta-enga-irukku-where',
			exemplar: 'அண்ணா, டிக்கெட் கவுண்ட்டர் எங்க இருக்கு?'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
