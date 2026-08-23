import type { Lesson } from '../../schemas/content';

export const lesson: Lesson = {
	id: 'ta-10',
	language: 'ta',
	index: 10,
	kind: 'regular',
	title: 'Time & schedules',
	situation:
		"Priya and Arun chat over evening tea about Arun's weekday routine — when he gets up, catches his train, and gets home — and confirm tomorrow's meeting time.",
	level: 'A1',
	lines: [
		{
			id: 'ta-10-l01',
			lessonId: 'ta-10',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அருண், காலையில எத்தனை மணிக்கு எழுந்திரிப்பே?',
			transliteration: 'Arun, kaalaila ethana manikku ezhundhirippe?',
			literalEnglish: 'Arun, morning-in how-many o-clock-at get-up-you?',
			naturalEnglish: 'Arun, what time do you get up in the morning?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-10.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 0,
				endMs: 3800
			},
			chunks: [],
			constructions: ['ta-ethana-manikku-question', 'ta-manikku-time', 'ta-la-time-locative'],
			notes: [
				{
					type: 'morphology',
					text: 'காலையில = காலை "morning" + locative -இல (spoken -ல): "in the morning". English puts "in" before; Tamil glues it on after. Literary Tamil writes -இல்.',
					anchor: 'காலையில'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-10-l02',
			lessonId: 'ta-10',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'நான் ஆறு மணிக்கு எழுந்திருக்கறேன்.',
			transliteration: 'naan aaru manikku ezhundhirukkaren.',
			literalEnglish: 'I six o-clock-at get-up-I.',
			naturalEnglish: 'I get up at six.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-10.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 3800,
				endMs: 6800
			},
			chunks: [],
			constructions: ['ta-manikku-time'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-10-l03',
			lessonId: 'ta-10',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'அவ்வளவு சீக்கிரமா? ஏன்?',
			transliteration: 'avlo seekramaa? een?',
			literalEnglish: 'that-much early-QUESTION? why?',
			naturalEnglish: 'That early? Why?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-10.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 6800,
				endMs: 9200
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-10-l04',
			lessonId: 'ta-10',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'எட்டு மணிக்கு ட்ரெயின் புடிக்கணும், ஆபீஸ் ரொம்ப தூரம்.',
			transliteration: 'ettu manikku train pudikkanum, office romba dhooram.',
			literalEnglish: 'eight o-clock-at train catch-must, office very far.',
			naturalEnglish: 'I have to catch the eight o’clock train — the office is really far.',
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-10.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 9200,
				endMs: 13600
			},
			chunks: [
				{ label: 'I must catch the train at eight', startMs: 9200, endMs: 11600 },
				{ label: 'the office is really far', startMs: 11600, endMs: 13600 }
			],
			constructions: ['ta-num-obligation', 'ta-manikku-time'],
			notes: [
				{
					type: 'morphology',
					text: 'புடிக்கணும் = புடி "catch" + -க்கணும் "must". Spoken -ணும் is the worn-down form of literary வேண்டும். Note there is no separate word for "I" doing the needing — the subject is understood.',
					anchor: 'புடிக்கணும்'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-10-l05',
			lessonId: 'ta-10',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'எத்தனை மணிக்கு ஆபீஸ் ஆரம்பம்?',
			transliteration: 'ethana manikku office aarambam?',
			literalEnglish: 'how-many o-clock-at office start?',
			naturalEnglish: 'What time does your office start?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-10.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 13600,
				endMs: 16400
			},
			chunks: [],
			constructions: ['ta-ethana-manikku-question', 'ta-manikku-time'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-10-l06',
			lessonId: 'ta-10',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'சரியா ஒன்பது மணிக்கு. லேட்டா போனா பிரச்சனை.',
			transliteration: 'sariyaa onbadhu manikku. late-aa ponaa prachanai.',
			literalEnglish: 'exactly nine o-clock-at. late-ly go-if problem.',
			naturalEnglish: "At nine sharp. If I'm late, there's trouble.",
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-10.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 16400,
				endMs: 20000
			},
			chunks: [],
			constructions: ['ta-manikku-time'],
			notes: [
				{
					type: 'grammar',
					text: 'போனா = போ "go" + past + conditional -ஆ(ல்): "if (one) goes". Spoken Tamil builds "if" clauses with this verb ending instead of a separate word like English "if".',
					anchor: 'போனா'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-10-l07',
			lessonId: 'ta-10',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'சாயந்திரம் எப்போ வீட்டுக்கு வருவே?',
			transliteration: 'saayandhram eppo veettukku varuve?',
			literalEnglish: 'evening when house-to come-you?',
			naturalEnglish: 'When do you get home in the evening?',
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-10.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 20000,
				endMs: 22800
			},
			chunks: [],
			constructions: [],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-10-l08',
			lessonId: 'ta-10',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ஆறரை மணிக்கு வந்துடுவேன்.',
			transliteration: 'aararai manikku vandhuduven.',
			literalEnglish: 'six-and-a-half o-clock-at come-definitely-will-I.',
			naturalEnglish: "I'm home by six thirty.",
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-10.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 22800,
				endMs: 25400
			},
			chunks: [],
			constructions: ['ta-manikku-time'],
			notes: [
				{
					type: 'grammar',
					text: 'ஆறரை = ஆறு "six" + அரை "half": half past six. Half hours fuse into one word — மூணரை 3:30, நாலரை 4:30. The -டு- in வந்துடுவேன் adds a "definitely / for sure" flavour.',
					anchor: 'ஆறரை'
				}
			],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-10-l09',
			lessonId: 'ta-10',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'நாளைக்கு சாயந்திரம் ஏழு மணிக்கு நம்ம மீட்டிங் இருக்கு, ஞாபகம் இருக்கா?',
			transliteration: 'naalaikki saayandhram ezhu manikku namma meeting irukku, gnyaabagam irukkaa?',
			literalEnglish: 'tomorrow evening seven o-clock-at our meeting is, memory is-QUESTION?',
			naturalEnglish: "We have our meeting at seven tomorrow evening — you remember, right?",
			speaker: 'Priya',
			audio: {
				normalUrl: '/audio/ta/ta-10.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 25400,
				endMs: 30200
			},
			chunks: [
				{ label: 'tomorrow evening at seven', startMs: 25400, endMs: 27400 },
				{ label: 'we have our meeting', startMs: 27400, endMs: 28800 },
				{ label: 'you remember, right?', startMs: 28800, endMs: 30200 }
			],
			constructions: ['ta-manikku-time'],
			notes: [],
			source: 'original',
			license: 'CC-BY-4.0',
			reviewStatus: 'draft'
		},
		{
			id: 'ta-10-l10',
			lessonId: 'ta-10',
			language: 'ta',
			register: 'spoken',
			dialect: 'chennai',
			targetScript: 'ஞாபகம் இருக்கு! ஆபீஸ் முடிஞ்சு நேரா வந்துடறேன்.',
			transliteration: 'gnyaabagam irukku! office mudinju neraa vandhudaren.',
			literalEnglish: 'memory is! office having-finished straight come-I.',
			naturalEnglish: "I remember! I'll come straight over after work.",
			speaker: 'Arun',
			audio: {
				normalUrl: '/audio/ta/ta-10.mp3',
				speakerId: 'ta-speaker-1',
				startMs: 30200,
				endMs: 33600
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
			id: 'ta-manikku-time',
			language: 'ta',
			label: 'NUMBER + மணிக்கு (at X o’clock)',
			gloss: 'Clock times take the dative -க்கு on மணி "o\'clock": ஆறு மணிக்கு "at six". Where English uses the preposition "at", Tamil suffixes the time word.',
			introducedIn: 'ta-06'
		},
		{
			id: 'ta-ethana-manikku-question',
			language: 'ta',
			label: 'எத்தனை மணிக்கு? (at what time?)',
			gloss: 'The standard way to ask when something happens: எத்தனை "how many" + மணிக்கு "o\'clock-at". Literally "at how many o\'clock?".',
			introducedIn: 'ta-10'
		},
		{
			id: 'ta-num-obligation',
			language: 'ta',
			label: 'verb + -ணும் (must / have to)',
			gloss: 'Spoken obligation: புடிக்கணும் "must catch", போகணும் "have to go". The worn-down form of literary வேண்டும், attached straight to the verb stem.',
			introducedIn: 'ta-10'
		},
		{
			id: 'ta-la-time-locative',
			language: 'ta',
			label: 'time word + -ல (in the morning/evening)',
			gloss: 'Parts of the day take the spoken locative -ல: காலையில "in the morning", ராத்திரியில "at night". English "in/at" becomes a suffix.',
			introducedIn: 'ta-10'
		}
	],
	exercises: [
		{
			kind: 'comprehension',
			id: 'ta-10-e01',
			lessonId: 'ta-10',
			constructions: ['ta-num-obligation', 'ta-manikku-time'],
			prompt:
				'Arun says: «எட்டு மணிக்கு ட்ரெயின் புடிக்கணும், ஆபீஸ் ரொம்ப தூரம்.» Why does he get up so early?',
			lineId: 'ta-10-l04',
			options: [
				'He has to catch a train at eight because his office is far away',
				'His train home leaves at eight in the evening',
				'He likes walking to the office every morning',
				'His office opens at eight and he lives next door'
			],
			answerIndex: 0
		},
		{
			kind: 'recall',
			id: 'ta-10-e02',
			lessonId: 'ta-10',
			constructions: ['ta-ethana-manikku-question'],
			prompt: 'Ask a friend: "What time do you get up?"',
			lineId: 'ta-10-l01',
			acceptedAnswers: [
				'எத்தனை மணிக்கு எழுந்திரிப்பே?',
				'எத்தனை மணிக்கு எழுந்திருப்பே?',
				'ethana manikku ezhundhirippe',
				'ethanai manikku ezhundhirippe',
				'எத்தனை மணிக்கு எழுந்திருக்கறே?'
			],
			canonicalAnswer: 'எத்தனை மணிக்கு எழுந்திரிப்பே?',
			hints: ['"At what time" = எத்தனை மணிக்கு.', 'Informal you-form of "get up" ends in -ப்பே.']
		},
		{
			kind: 'completion',
			id: 'ta-10-e03',
			lessonId: 'ta-10',
			constructions: ['ta-num-obligation'],
			prompt: 'Complete: "I have to go to the office at nine."',
			template: 'ஒன்பது மணிக்கு ஆபீஸுக்கு போக___.',
			options: ['ணும்', 'லாம்', 'றேன்'],
			answer: 'ணும்',
			rule: 'Obligation ("must / have to") is verb stem + -ணும்: போகணும் "have to go". -லாம் would make it a suggestion instead.'
		},
		{
			kind: 'transfer',
			id: 'ta-10-e04',
			lessonId: 'ta-10',
			constructions: ['ta-num-obligation', 'ta-manikku-time'],
			prompt: 'Use the obligation pattern in a new situation.',
			situation:
				'You are ending a phone call at night. Tell your friend you have to get up at five tomorrow to catch a bus.',
			useConstruction: 'ta-num-obligation',
			exemplar:
				'நாளைக்கு அஞ்சு மணிக்கு எழுந்திருக்கணும், பஸ் புடிக்கணும். (naalaikki anju manikku ezhundhirukkanum, bus pudikkanum.)'
		},
		{
			kind: 'recall',
			id: 'ta-10-e05',
			lessonId: 'ta-10',
			constructions: ['ta-manikku-time'],
			prompt: 'Tell someone: "I get up at six."',
			lineId: 'ta-10-l02',
			acceptedAnswers: [
				'நான் ஆறு மணிக்கு எழுந்திருக்கறேன்.',
				'ஆறு மணிக்கு எழுந்திருக்கறேன்',
				'naan aaru manikku ezhundhirukkaren',
				'aaru manikku ezhundhirukkaren'
			],
			canonicalAnswer: 'நான் ஆறு மணிக்கு எழுந்திருக்கறேன்.',
			hints: ['Time + மணிக்கு comes before the verb.', 'ஆறு = six.']
		}
	],
	provenance: {
		source: 'original',
		license: 'CC-BY-4.0',
		reviewStatus: 'draft'
	}
};
