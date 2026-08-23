import type { Lesson } from '../../schemas/content';

/**
 * Lesson 12 — Asking for help (Tamil, Chennai spoken register).
 * Priya has left her phone on a bus and asks a stranger, Kumar, for help at the
 * bus stand. Spoken forms throughout (இருக்கு, ஆச்சு, தெரியாது, வரேன்), with
 * polite -ங்க forms because the speakers are strangers.
 */
export const lesson: Lesson = {
	id: 'ta-12',
	language: 'ta',
	index: 12,
	kind: 'regular',
	title: 'Asking for help',
	situation:
		'Priya realises she has left her phone on the bus. At the bus stand she stops a stranger, Kumar, asks for help, and he walks her to the enquiry office.',
	level: 'A1',
	lines: [
		{
			id: 'ta-12-l01',
			lessonId: 'ta-12',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ஸார், கொஞ்சம் ஹெல்ப் பண்ண முடியுமா?',
			transliteration: 'saar, konjam help panna mudiyumaa?',
			literalEnglish: 'Sir, a-little help to-do is-possible-QUESTION?',
			naturalEnglish: 'Sir, could you help me a little?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-12.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 0,
				endMs: 3800
			},
			chunks: [
				{ label: 'saar, konjam help panna', startMs: 0, endMs: 2200 },
				{ label: 'mudiyumaa', startMs: 2200, endMs: 3800 }
			],
			constructions: ['ta-mudiyumaa-request', 'ta-pannu-light-verb'],
			notes: [
				{
					type: 'culture',
					text: 'English loans like ஹெல்ப் with பண்ணு are completely normal in Chennai speech — ஹெல்ப் பண்ண முடியுமா sounds friendlier and more current than a fully literary equivalent.',
					anchor: 'ஹெல்ப் பண்ண'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-12-l02',
			lessonId: 'ta-12',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'சொல்லுங்க, என்ன ஆச்சு?',
			transliteration: 'sollunga, enna aachu?',
			literalEnglish: 'Say-you(polite), what happened?',
			naturalEnglish: 'Tell me, what happened?',
			speaker: 'Kumar',
			audio: {
				normalUrl: '/audio/ta/ta-12.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 3800,
				endMs: 6600
			},
			chunks: [],
			constructions: ['ta-nga-polite-imperative'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-12-l03',
			lessonId: 'ta-12',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'என் ஃபோன காணோம். பஸ்ல விட்டுட்டேன்னு நினைக்கிறேன்.',
			transliteration: 'en phone-a kaanom. bus-la vittutten-nu nenaikkiren.',
			literalEnglish: 'My phone-ACC not-to-be-seen. Bus-in left-completely-I-QUOTE think-I.',
			naturalEnglish: "My phone is missing. I think I left it on the bus.",
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-12.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 6600,
				endMs: 11000
			},
			chunks: [
				{ label: 'en phone-a kaanom', startMs: 6600, endMs: 8600 },
				{ label: 'bus-la vittutten-nu nenaikkiren', startMs: 8600, endMs: 11000 }
			],
			constructions: ['ta-nu-quotative', 'ta-ttu-completive'],
			notes: [
				{
					type: 'morphology',
					text: 'ஃபோன = ஃபோன் + spoken object marker -அ (written -ஐ: ஃபோனை). விட்டுட்டேன் = விடு "leave" + -ட்டு completive + past -ஏன்: "I went and left it (and it’s done)". The -னு after it quotes the whole clause into நினைக்கிறேன் "I think".',
					anchor: 'விட்டுட்டேன்னு'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-12-l04',
			lessonId: 'ta-12',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அய்யோ! எந்த பஸ்ல வந்தீங்க?',
			transliteration: 'ayyo! endha bus-la vandheenga?',
			literalEnglish: 'Oh-no! Which bus-in came-you(polite)?',
			naturalEnglish: 'Oh no! Which bus did you come on?',
			speaker: 'Kumar',
			audio: {
				normalUrl: '/audio/ta/ta-12.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 11000,
				endMs: 14200
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-12-l05',
			lessonId: 'ta-12',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'இருபத்தி ஒண்ணு. நம்பர் மட்டும் தான் ஞாபகம் இருக்கு.',
			transliteration: 'irubathi onnu. number mattum dhaan gnyaabagam irukku.',
			literalEnglish: 'Twenty one. Number only indeed memory is.',
			naturalEnglish: 'The 21. The number is all I remember.',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-12.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 14200,
				endMs: 17800
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-12-l06',
			lessonId: 'ta-12',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'கவலைப்படாதீங்க. அங்க இன்குயரி ஆஃபீஸ் இருக்கு.',
			transliteration: 'kavalaippadaadheenga. anga enquiry office irukku.',
			literalEnglish: 'Worry-do-not-you(polite). There enquiry office is.',
			naturalEnglish: "Don't worry. There's an enquiry office over there.",
			speaker: 'Kumar',
			audio: {
				normalUrl: '/audio/ta/ta-12.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 17800,
				endMs: 21400
			},
			chunks: [
				{ label: 'kavalaippadaadheenga', startMs: 17800, endMs: 19600 },
				{ label: 'anga enquiry office irukku', startMs: 19600, endMs: 21400 }
			],
			constructions: ['ta-aadheenga-negative-request'],
			notes: [
				{
					type: 'grammar',
					text: '-ாதீங்க is the polite "please don’t": கவலைப்படு "worry" → கவலைப்படாதீங்க "please don’t worry". With close friends or children the short form is -ாத: கவலைப்படாத.',
					anchor: 'கவலைப்படாதீங்க'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-12-l07',
			lessonId: 'ta-12',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'எங்க இருக்கு? எனக்கு இந்த ஏரியா தெரியாது.',
			transliteration: 'enga irukku? enakku indha area theriyaadhu.',
			literalEnglish: 'Where is? To-me this area not-known.',
			naturalEnglish: "Where is it? I don't know this area.",
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-12.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 21400,
				endMs: 24800
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-12-l08',
			lessonId: 'ta-12',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'வாங்க, நான் கூட வரேன். ஆஃபீஸ காமிக்கிறேன்.',
			transliteration: 'vaanga, naan kooda varen. office-a kaamikkiren.',
			literalEnglish: 'Come-you(polite), I along come-I. Office-ACC show-I.',
			naturalEnglish: "Come, I'll come with you. I'll show you the office.",
			speaker: 'Kumar',
			audio: {
				normalUrl: '/audio/ta/ta-12.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 24800,
				endMs: 28600
			},
			chunks: [],
			constructions: ['ta-nga-polite-imperative'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-12-l09',
			lessonId: 'ta-12',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ரொம்ப தாங்க்ஸ், ஸார். நீங்க பெரிய ஹெல்ப் பண்ணீங்க.',
			transliteration: 'romba thanks, saar. neenga periya help panneenga.',
			literalEnglish: 'Very thanks, sir. You(polite) big help did-you(polite).',
			naturalEnglish: "Thanks a lot, sir. You've been a big help.",
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-12.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 28600,
				endMs: 32200
			},
			chunks: [],
			constructions: ['ta-pannu-light-verb'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-12-l10',
			lessonId: 'ta-12',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'பரவாயில்ல. ஃபோன் கண்டிப்பா கிடைக்கும்.',
			transliteration: 'paravaayilla. phone kandippaa kedaikkum.',
			literalEnglish: 'No-matter. Phone definitely will-be-gotten.',
			naturalEnglish: "It's nothing. You'll definitely get the phone back.",
			speaker: 'Kumar',
			audio: {
				normalUrl: '/audio/ta/ta-12.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 32200,
				endMs: 35600
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		}
	],
	constructions: [
		{
			id: 'ta-mudiyumaa-request',
			language: 'ta',
			label: 'verb (infinitive) + முடியுமா? (could you…?)',
			gloss: 'Polite request via possibility: ஹெல்ப் பண்ண முடியுமா? "could you help?", தூக்க முடியுமா? "can you lift it?". The doer is left unsaid — softer than a direct command.',
			introducedIn: 'ta-12'
		},
		{
			id: 'ta-nga-polite-imperative',
			language: 'ta',
			label: 'verb + -ங்க (polite request)',
			gloss: 'Plural/polite imperative for strangers and elders: சொல்லுங்க "please tell", வாங்க "please come".',
			introducedIn: 'ta-03'
		},
		{
			id: 'ta-nu-quotative',
			language: 'ta',
			label: 'clause + -னு (that …)',
			gloss: 'Spoken quotative -னு (written என்று) hangs a whole clause onto verbs of saying/thinking: விட்டுட்டேன்னு நினைக்கிறேன் "I think that I left it".',
			introducedIn: 'ta-12'
		},
		{
			id: 'ta-ttu-completive',
			language: 'ta',
			label: 'verb + -ட்டு- (did it, and it’s done)',
			gloss: 'Completive -விடு/-ட்டு marks a finished, irreversible action: விட்டுட்டேன் "I (went and) left it", போயிட்டாங்க "they’ve left".',
			introducedIn: 'ta-12'
		},
		{
			id: 'ta-aadheenga-negative-request',
			language: 'ta',
			label: 'verb + -ாதீங்க (please don’t)',
			gloss: 'Polite negative imperative: கவலைப்படாதீங்க "please don’t worry", போகாதீங்க "please don’t go".',
			introducedIn: 'ta-12'
		},
		{
			id: 'ta-pannu-light-verb',
			language: 'ta',
			label: 'noun + பண்ணு (do X)',
			gloss: 'பண்ணு "do" turns nouns — very often English loans — into verbs: ஹெல்ப் பண்ணு "help", புக் பண்ணு "book".',
			introducedIn: 'ta-09'
		}
	],
	exercises: [
		{
			id: 'ta-12-e01',
			kind: 'comprehension',
			lessonId: 'ta-12',
			lineId: 'ta-12-l03',
			constructions: ['ta-nu-quotative', 'ta-ttu-completive'],
			prompt: 'Priya says "பஸ்ல விட்டுட்டேன்னு நினைக்கிறேன்." What is she saying?',
			options: [
				'She thinks she left her phone on the bus.',
				'She wants to leave on the next bus.',
				'She thinks the bus has already left.',
				'She left the bus because she was thinking.'
			],
			answerIndex: 0
		},
		{
			id: 'ta-12-e02',
			kind: 'recall',
			lessonId: 'ta-12',
			lineId: 'ta-12-l01',
			constructions: ['ta-mudiyumaa-request', 'ta-pannu-light-verb'],
			prompt: 'Stop a stranger and ask: "Could you help me a little?"',
			acceptedAnswers: [
				'கொஞ்சம் ஹெல்ப் பண்ண முடியுமா?',
				'ஸார், கொஞ்சம் ஹெல்ப் பண்ண முடியுமா?',
				'கொஞ்சம் உதவி பண்ண முடியுமா?',
				'konjam help panna mudiyumaa?',
				'konjam help panna mudiyuma?',
				'saar, konjam help panna mudiyumaa?'
			],
			canonicalAnswer: 'கொஞ்சம் ஹெல்ப் பண்ண முடியுமா?',
			hints: ['"A little" is கொஞ்சம்.', 'End with the infinitive + முடியுமா? — "is it possible to…?"']
		},
		{
			id: 'ta-12-e03',
			kind: 'completion',
			lessonId: 'ta-12',
			constructions: ['ta-aadheenga-negative-request'],
			prompt: 'Complete Kumar’s reassurance.',
			template: 'கவலைப்பட___! ஃபோன் கண்டிப்பா கிடைக்கும்.',
			options: ['ாதீங்க', 'ுங்க', 'லாம்'],
			answer: 'ாதீங்க',
			rule: '"Please don’t worry" takes the polite negative imperative -ாதீங்க. -ுங்க would politely order someone TO worry, and -லாம் ("may/let’s") makes no sense here.'
		},
		{
			id: 'ta-12-e04',
			kind: 'transfer',
			lessonId: 'ta-12',
			constructions: ['ta-mudiyumaa-request'],
			prompt: 'Ask for a different kind of help in a new place.',
			situation:
				'Your suitcase is too heavy at Chennai Central. Ask a porter whether he can lift it.',
			useConstruction: 'ta-mudiyumaa-request',
			exemplar: 'இந்த பேக்க தூக்க முடியுமா?'
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
