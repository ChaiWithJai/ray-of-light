/**
 * Tamil course — 14 original lessons (12 regular, synthesis at 7 and 14).
 *
 * Register: **contemporary educated spoken Tamil**, Chennai-oriented but broadly
 * intelligible — not literary/written Tamil. Teaching only literary Tamil produces
 * learners who can decode a newspaper and sound wrong ordering coffee, which is
 * the opposite of what this product is for.
 *
 * Every line carries four layers, as AC 9 requires them to be distinguishable:
 *   targetScript      what you say, in Tamil script
 *   transliteration   pronunciation scaffold, retired around lesson 30
 *   literalEnglish    reveals Tamil structure (often verb-final, case-marked)
 *   naturalEnglish    what it actually means
 *
 * ⚠️ REVIEW STATUS: `draft`. No native reviewer has seen this content. Spoken
 * register and naturalness are precisely the axis a non-native author cannot
 * self-check, so treat this as a structurally valid placeholder pending native
 * review — see docs/ISSUE-1-LIMITATIONS.md L2.
 */
import { carryConstructions, defineLesson, type LanguageProfile } from './define.js';

export const TA_PROFILE: LanguageProfile = {
	language: 'ta',
	register: 'spoken',
	dialect: 'chennai_general',
	speakerId: 'ta_f_01',
	idPrefix: 'ta',
	provenance: {
		source: 'original',
		license: 'owned',
		reviewStatus: 'draft'
	}
};

const d = (l: Parameters<typeof defineLesson>[1]) => defineLesson(TA_PROFILE, l);

const l1 = d({
	index: 1,
	title: 'காபி கடையில் — At the coffee shop',
	situation: 'Ordering a coffee',
	level: 'A1',
	constructions: [
		['vanakkam', 'வணக்கம் — vaṇakkam', 'the all-purpose greeting'],
		['enakku-venum', 'எனக்கு + noun + வேணும்', 'wanting something: "to me X is wanted"'],
		['romba-nalla', 'ரொம்ப + adjective', 'intensifier — "very …"'],
		['eppadi-irukkeenga', 'நல்லா இருக்கீங்களா? / எப்படி இருக்கீங்க?', 'the how-are-you exchange — நல்லா "well" + a form of இரு with the person in the ending'],
		['en-peru', 'என் பேரு + name', 'introducing yourself — "my name X", with no word for "is"']
	],
	lines: [
		{ target: 'வணக்கம்!', translit: 'vaṇakkam!', literal: 'Greeting!', english: 'Hello!', speaker: 'வாடிக்கையாளர்', constructions: ['vanakkam'], notes: [{ type: 'culture', text: 'வணக்கம் works at any hour and any formality. Unlike French, there is no separate evening greeting you must switch to.', anchor: 'வணக்கம்' }, { type: 'grammar', text: 'After வணக்கம், the natural next move is நல்லா இருக்கீங்களா? — "are you doing well?". Answer நல்லா இருக்கேன் "I\'m well", then return it: நீங்க எப்படி இருக்கீங்க? "how are you?"', anchor: 'வணக்கம்' }, { type: 'morphology', text: 'The person lives in the verb ending: இருக்கேன் = இருக்க- "be" + -ஏன் "I"; இருக்கீங்க = இருக்க- + -ஈங்க "you (polite)". Because the ending already says who, நான்/நீங்க can be dropped.', anchor: 'வணக்கம்' }, { type: 'grammar', text: 'To introduce yourself, put என் பேரு "my name" next to the name — என் பேரு பிரியா. No word for "is": spoken Tamil sets the two side by side.', anchor: 'வணக்கம்' }] },
		{ target: 'வணக்கம், என்ன வேணும்?', translit: 'vaṇakkam, enna vēṇum?', literal: 'Greeting, what is-wanted?', english: 'Hello, what would you like?', speaker: 'கடைக்காரர்' },
		{ target: 'எனக்கு ஒரு காபி வேணும்.', translit: 'enakku oru kaapi vēṇum.', literal: 'To-me one coffee is-wanted.', english: "I'd like a coffee.", speaker: 'வாடிக்கையாளர்', constructions: ['enakku-venum'], chunks: ['enakku', 'oru kaapi', 'vēṇum'], notes: [{ type: 'grammar', text: 'Tamil has no verb "to want" taking a subject. The wanter goes in the dative (எனக்கு "to me") and the thing wanted is the subject. This pattern will carry you a long way.', anchor: 'எனக்கு' }, { type: 'morphology', text: 'எனக்கு = நான் (I) + dative -க்கு.', anchor: 'எனக்கு' }, { type: 'culture', text: 'அண்ணா "elder brother" (or அக்கா "elder sister") is the standard friendly way to address a shopkeeper or tea-shop man — polite, not familial. No word for "please" is needed; the -ங்க ending on the verb does that work.', anchor: 'காபி' }] },
		{ target: 'சர்க்கரை வேணுமா?', translit: 'sarkkarai vēṇumā?', literal: 'Sugar is-wanted-Q?', english: 'Do you want sugar?', speaker: 'கடைக்காரர்', notes: [{ type: 'grammar', text: 'Adding -ஆ to the end turns a statement into a yes/no question. No word order changes.', anchor: 'வேணுமா' }] },
		{ target: 'கொஞ்சம் வேணும்.', translit: 'konjam vēṇum.', literal: 'A-little is-wanted.', english: 'A little, please.', speaker: 'வாடிக்கையாளர்', constructions: ['enakku-venum'], notes: [{ type: 'grammar', text: 'To customise instead of just accepting: சர்க்கரை கம்மியா போடுங்க — "put the sugar less-ly", i.e. go easy on the sugar. போடுங்க "put" carries the same polite -ங்க as குடுங்க.', anchor: 'கொஞ்சம்' }] },
		{ target: 'இதோ உங்க காபி.', translit: 'idhō unga kaapi.', literal: 'Here your coffee.', english: 'Here is your coffee.', speaker: 'கடைக்காரர்' },
		{ target: 'ரொம்ப நல்லா இருக்கு.', translit: 'romba nallā irukku.', literal: 'Very well it-is.', english: "It's very good.", speaker: 'வாடிக்கையாளர்', constructions: ['romba-nalla'], notes: [{ type: 'culture', text: 'Current Chennai slang for the same sentiment: செம்மையா இருக்கு (often clipped to "semma") — "it\'s excellent". You will hear it constantly; recognise it, but ரொம்ப நல்லா இருக்கு is the safe thing to say.', anchor: 'நல்லா இருக்கு' }] },
		{ target: 'நன்றி!', translit: 'naṇḍri!', literal: 'Thanks!', english: 'Thank you!', speaker: 'வாடிக்கையாளர்' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 2, prompt: 'Line 3 means…', options: ['"I\'d like a coffee"', '"Do you have coffee?"', '"The coffee is good"'], answerIndex: 0, constructions: ['enakku-venum'] },
		{ kind: 'recall', prompt: 'Say it in Tamil: "I\'d like a coffee."', canonical: 'எனக்கு ஒரு காபி வேணும்.', accepted: ['எனக்கு ஒரு காபி வேணும்.', 'enakku oru kaapi vēṇum'], hints: ['எனக்கு…'], constructions: ['enakku-venum'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: '___ ஒரு காபி வேணும்.', options: ['எனக்கு', 'நான்', 'என்'], answer: 'எனக்கு', rule: 'The wanter takes the dative: எனக்கு, not நான்.', constructions: ['enakku-venum'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🍵 A tea stall. You want one tea.', use: 'enakku-venum', exemplar: 'எனக்கு ஒரு டீ வேணும்.', criteria: { constructions: [{ construction: 'enakku-venum', orderedGroups: [['எனக்கு', 'enakku'], ['வேணும்', 'venum']] }], contextGroups: [['டீ', 'tea']] }, constructions: ['enakku-venum'] },
		{ kind: 'recall', prompt: 'Ask someone politely: "How are you?"', canonical: 'எப்படி இருக்கீங்க?', accepted: ['எப்படி இருக்கீங்க?', 'நீங்க எப்படி இருக்கீங்க?', 'நல்லா இருக்கீங்களா?', 'eppadi irukkīṅga', 'nallā irukkīṅgaḷā'], hints: ['எப்படி = "how".'], constructions: ['eppadi-irukkeenga'] },
		{ kind: 'recall', prompt: 'Introduce yourself: say "My name is Kavya."', canonical: 'என் பேரு காவ்யா.', accepted: ['என் பேரு காவ்யா.', 'என் பேர் காவ்யா.', 'en pēru Kāvyā', 'en peru Kavya'], hints: ['Start with என் பேரு — "my name".', 'No word for "is" — just add the name.'], constructions: ['en-peru'] }
	]
});

const l2 = d({
	index: 2,
	title: 'ஹோட்டலில் — At the hotel',
	situation: 'Asking for a room',
	level: 'A1',
	constructions: [
		['irukka-q', 'noun + இருக்கா?', 'asking whether something is available'],
		['ettana-naal', 'எத்தனை + counter', 'asking how many'],
		['kku-for', 'number + நாள்/பேர்', 'counting nights and people'],
		['aa-question', 'statement + -ஆ', 'yes/no question — add -ஆ to the last word, no word-order change']
	],
	lines: [
		{ target: 'வணக்கம். ரூம் இருக்கா?', translit: 'vaṇakkam. room irukkā?', literal: 'Greeting. Room is-there-Q?', english: 'Hello. Do you have a room?', speaker: 'பயணி', constructions: ['vanakkam', 'irukka-q', 'aa-question'], chunks: ['vaṇakkam', 'room', 'irukkā'], notes: [{ type: 'grammar', text: 'Tamil has no word for "or": an either/or question is just two -ஆ questions side by side — ஸ்ட்ராங்கா வேணுமா, லைட்டா வேணுமா? "(do you want it) strong, or light?" — and the listener picks one.', anchor: 'இருக்கா' }] },
		{ target: 'இருக்கு. எத்தனை நாள்?', translit: 'irukku. ettanai nāḷ?', literal: 'It-is. How-many day?', english: 'Yes. How many nights?', speaker: 'ரிசப்ஷன்', constructions: ['ettana-naal'], notes: [{ type: 'grammar', text: 'Spoken vs written: இருக்கு is what literary Tamil writes as இருக்கிறது, and வேணும் is வேண்டும். You will meet the long forms in print and announcements; on the street, say the short ones.', anchor: 'இருக்கு' }] },
		{ target: 'ரெண்டு நாள்.', translit: 'reṇḍu nāḷ.', literal: 'Two day.', english: 'Two nights.', speaker: 'பயணி', constructions: ['kku-for'], notes: [{ type: 'grammar', text: 'After a number, the counted noun stays singular: ரெண்டு நாள், not நாள்கள்.', anchor: 'ரெண்டு நாள்' }] },
		{ target: 'எத்தனை பேர்?', translit: 'ettanai pēr?', literal: 'How-many persons?', english: 'How many people?', speaker: 'ரிசப்ஷன்', constructions: ['ettana-naal'] },
		{ target: 'ரெண்டு பேர்.', translit: 'reṇḍu pēr.', literal: 'Two persons.', english: 'Two people.', speaker: 'பயணி', constructions: ['kku-for'] },
		{ target: 'எனக்கு அமைதியான ரூம் வேணும்.', translit: 'enakku amaidhiyāna room vēṇum.', literal: 'To-me quiet room is-wanted.', english: "I'd like a quiet room.", speaker: 'பயணி', constructions: ['enakku-venum'] },
		{ target: 'மூணாவது மாடியில் இருக்கு.', translit: 'mūṇāvadhu māḍiyil irukku.', literal: 'Third floor-in it-is.', english: "There's one on the third floor.", speaker: 'ரிசப்ஷன்' },
		{ target: 'ரொம்ப நல்லது. நன்றி.', translit: 'romba nalladhu. naṇḍri.', literal: 'Very good. Thanks.', english: 'Very good. Thank you.', speaker: 'பயணி', constructions: ['romba-nalla'] }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 0, prompt: 'Line 1 means…', options: ['"Do you have a room?"', '"Where is the room?"', '"The room is nice"'], answerIndex: 0, constructions: ['irukka-q'] },
		{ kind: 'recall', prompt: 'Say it in Tamil: "Do you have a room?"', canonical: 'ரூம் இருக்கா?', accepted: ['ரூம் இருக்கா?', 'room irukkā'], hints: ['ரூம்…'], constructions: ['irukka-q'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'ரூம் ___?', options: ['இருக்கா', 'இருக்கு', 'இல்ல'], answer: 'இருக்கா', rule: 'The -ஆ ending makes it a question. இருக்கு is the statement.', constructions: ['irukka-q', 'aa-question'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🚕 An auto stand. You want to ask whether there is an auto.', use: 'irukka-q', exemplar: 'ஆட்டோ இருக்கா?', criteria: { constructions: [{ construction: 'irukka-q', orderedGroups: [['இருக்கா', 'irukka']] }], contextGroups: [['ஆட்டோ', 'auto']] }, constructions: ['irukka-q'] }
	]
});

const l3 = d({
	index: 3,
	title: 'மார்க்கெட்டில் — At the market',
	situation: 'Buying vegetables by weight',
	level: 'A1',
	constructions: [
		['evvalavu', 'எவ்வளவு?', 'how much (price or amount)'],
		['oru-kilo', 'quantity + noun', 'quantities stack before the noun'],
		['kudunga', 'noun + குடுங்க', 'polite imperative — "please give"'],
		['aadheenga', 'verb + -ாதீங்க', 'polite "please don\'t…" — the negative of the -ங்க request']
	],
	lines: [
		{ target: 'வணக்கம். தக்காளி எவ்வளவு?', translit: 'vaṇakkam. thakkāḷi evvaḷavu?', literal: 'Greeting. Tomato how-much?', english: 'Hello. How much are the tomatoes?', speaker: 'வாடிக்கையாளர்', constructions: ['evvalavu'], notes: [{ type: 'pronunciation', text: 'On the street எவ்வளவு contracts to எவ்ளோ (evlo). Keep எவ்வளவு as your anchor form; recognise எவ்ளோ everywhere — both are accepted in this course.', anchor: 'எவ்வளவு' }] },
		{ target: 'கிலோ நாற்பது ரூபாய்.', translit: 'kilō nāṛpadhu rūbāy.', literal: 'Kilo forty rupees.', english: 'Forty rupees a kilo.', speaker: 'கடைக்காரர்', notes: [{ type: 'pronunciation', text: 'Spoken numerals flatten an initial ஐ to அ: ஐந்து → அஞ்சு "five", ஐம்பது → அம்பது "fifty". You have already heard அஞ்சு நிமிஷம் on the street; the count runs ஒண்ணு, ரெண்டு, மூணு, நாலு, அஞ்சு, ஆறு…', anchor: 'நாற்பது' }, { type: 'grammar', text: 'Prices can be per item too, not just per kilo: ஒரு பழம் அஞ்சு ரூபா — "one fruit, five rupees (each)".', anchor: 'கிலோ' }] },
		{ target: 'ஒரு கிலோ குடுங்க.', translit: 'oru kilō kuḍunga.', literal: 'One kilo give-please.', english: 'Give me a kilo, please.', speaker: 'வாடிக்கையாளர்', constructions: ['oru-kilo', 'kudunga'], chunks: ['oru kilō', 'kuḍunga'], notes: [{ type: 'grammar', text: 'The -ங்க ending is the polite/plural imperative. Dropping it (குடு) is what you say to a child or a close friend.', anchor: 'குடுங்க' }, { type: 'grammar', text: 'The polite "don\'t" is -ாதீங்க: போடாதீங்க "please don\'t put (any more)", கவலைப்படாதீங்க "please don\'t worry". With close friends and children the short form is -ாத: கவலைப்படாத.', anchor: 'குடுங்க' }] },
		{ target: 'வேற ஏதாவது?', translit: 'vēṛa ēdhāvadhu?', literal: 'Other something?', english: 'Anything else?', speaker: 'கடைக்காரர்' },
		{ target: 'கொஞ்சம் வெங்காயம் வேணும்.', translit: 'konjam veṅgāyam vēṇum.', literal: 'A-little onion is-wanted.', english: 'I need some onions.', speaker: 'வாடிக்கையாளர்', constructions: ['enakku-venum'] },
		{ target: 'இதோ. மொத்தம் அறுபது ரூபாய்.', translit: 'idhō. mottham aṛubadhu rūbāy.', literal: 'Here. Total sixty rupees.', english: 'Here. Sixty rupees in total.', speaker: 'கடைக்காரர்', notes: [{ type: 'pronunciation', text: 'ரூபாய் usually shortens to ரூபா in speech: அறுபது ரூபா. Both are fine to say; the course writes ரூபாய், and answers with ரூபா are accepted.', anchor: 'ரூபாய்' }] },
		{ target: 'இந்தாங்க. நன்றி!', translit: 'indhāṅga. naṇḍri!', literal: 'Take-please. Thanks!', english: 'Here you are. Thank you!', speaker: 'வாடிக்கையாளர்' },
		{ target: 'வாங்க, மறுபடியும் வாங்க.', translit: 'vāṅga, maṛubaḍiyum vāṅga.', literal: 'Come-please, again come-please.', english: 'Do come again.', speaker: 'கடைக்காரர்' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 0, prompt: 'Line 1 means…', options: ['"How much are the tomatoes?"', '"Do you have tomatoes?"', '"I want tomatoes"'], answerIndex: 0, constructions: ['evvalavu'] },
		{ kind: 'recall', prompt: 'Say it in Tamil: "Give me a kilo, please."', canonical: 'ஒரு கிலோ குடுங்க.', accepted: ['ஒரு கிலோ குடுங்க.', 'oru kilō kuḍunga'], hints: ['ஒரு…'], constructions: ['kudunga'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'தக்காளி ___?', options: ['எவ்வளவு', 'எத்தனை', 'எங்க'], answer: 'எவ்வளவு', rule: 'எவ்வளவு asks price or uncountable amount; எத்தனை counts discrete things.', constructions: ['evvalavu'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🍌 A fruit cart. You want to ask the price of bananas.', use: 'evvalavu', exemplar: 'வாழைப்பழம் எவ்வளவு?', criteria: { constructions: [{ construction: 'evvalavu', orderedGroups: [['எவ்வளவு', 'evvalavu']] }], contextGroups: [['வாழைப்பழம்', 'vazhaippazham']] }, constructions: ['evvalavu'] },
		{ kind: 'recall', prompt: 'Ask the price of the tomatoes.', canonical: 'தக்காளி எவ்வளவு?', accepted: ['தக்காளி எவ்வளவு?', 'தக்காளி எவ்ளோ?', 'thakkāḷi evvaḷavu', 'thakkāḷi evlo'], hints: ['Price questions need no verb: "tomato how-much?"'], lineIndex: 0, constructions: ['evvalavu'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '💵 You pay with a hundred-rupee note and want to check the shopkeeper has change (சில்லறை).', use: 'irukka-q', exemplar: 'சில்லறை இருக்கா?', criteria: { constructions: [{ construction: 'irukka-q', orderedGroups: [['இருக்கா', 'irukka']] }], contextGroups: [['சில்லறை', 'sillarai']] }, constructions: ['irukka-q'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🧅 The seller starts adding extra onions you did not ask for. Politely tell them not to put more.', use: 'aadheenga', exemplar: 'இன்னும் போடாதீங்க.', criteria: { constructions: [{ construction: 'aadheenga', orderedGroups: [['போடாதீங்க', 'podadheenga']] }], contextGroups: [['இன்னும்', 'innum']] }, constructions: ['aadheenga'] }
	]
});

const l4 = d({
	index: 4,
	title: 'வழி கேட்பது — Asking the way',
	situation: 'Lost near the bus stand',
	level: 'A1',
	constructions: [
		['enge-irukku', 'place + எங்க இருக்கு?', 'asking where something is'],
		['valathu-idathu', 'வலது / இடது / நேரா', 'right / left / straight'],
		['dooram', 'தூரமா?', 'asking about distance'],
		['pakkathula', 'landmark + பக்கத்துல / எதிர்ல', 'next to / opposite — the landmark comes first'],
		['mudiyumaa', 'infinitive + முடியுமா?', 'polite "could you…?" — asking whether it is possible'],
		['busla', 'vehicle + -ல', 'by bus / by auto — the same -ல marks the means']
	],
	lines: [
		{ target: 'எக்ஸ்கியூஸ் மி, பஸ் ஸ்டாண்ட் எங்க இருக்கு?', translit: 'excuse me, bus stand eṅga irukku?', literal: 'Excuse me, bus stand where it-is?', english: 'Excuse me, where is the bus stand?', speaker: 'பயணி', constructions: ['enge-irukku'], chunks: ['bus stand', 'eṅga', 'irukku'], notes: [{ type: 'culture', text: 'A pharmacy is universally a மெடிக்கல் ஷாப் — asking for a "pharmacy" may get blank looks; English loans like this are normal spoken Tamil. Directions come by landmark, and சிக்னல் (a traffic light) is a standard Chennai one.', anchor: 'பஸ் ஸ்டாண்ட்' }, { type: 'morphology', text: '-ல is the spoken "in/at/on" and glues onto the end of the noun: ரோட்ல "on the road", வீட்ல "at home", மீட்டிங்ல "in the meeting". Written Tamil uses -இல் (சென்னையில்); speech says -ல (சென்னைல).', anchor: 'எங்க இருக்கு' }, { type: 'grammar', text: 'Softer than any imperative: infinitive + முடியுமா? — கொஞ்சம் ஹெல்ப் பண்ண முடியுமா? "could you help a little?", சொல்ல முடியுமா? "could you tell me?" Learn it as a chunk; the loan ஹெல்ப் பண்ணு sounds friendlier in speech than a fully literary equivalent.', anchor: 'எக்ஸ்கியூஸ் மி' }] },
		{ target: 'நேரா போங்க, அப்புறம் வலது பக்கம்.', translit: 'nērā pōṅga, appuṛam valadhu pakkam.', literal: 'Straight go-please, then right side.', english: 'Go straight, then turn right.', speaker: 'உள்ளூர்வாசி', constructions: ['valathu-idathu'], notes: [{ type: 'morphology', text: 'To place things by a landmark, the landmark comes first and the position word follows: கோவில் பக்கத்துல "next to the temple", கோவில் எதிர்ல "opposite the temple" — both built on the same -ல.', anchor: 'வலது பக்கம்' }] },
		{ target: 'தூரமா?', translit: 'dhūramā?', literal: 'Far-Q?', english: 'Is it far?', speaker: 'பயணி', constructions: ['dooram'], notes: [{ type: 'grammar', text: 'You can spell out the starting point: இங்க இருந்து தூரமா? — "far from here?". இருந்து "from" returns in lesson 8 (மூணு நாள் இருந்து).', anchor: 'தூரமா' }] },
		{ target: 'இல்ல, அஞ்சு நிமிஷம்.', translit: 'illa, anju nimisham.', literal: 'No, five minute.', english: "No, five minutes.", speaker: 'உள்ளூர்வாசி', notes: [{ type: 'grammar', text: 'If you are the one being asked and don\'t know: எனக்கு இந்த ஏரியா தெரியாது — "I don\'t know this area". தெரியாது takes a dative knower, the same frame as எனக்கு … வேணும்.', anchor: 'இல்ல' }] },
		{ target: 'நடந்து போகலாமா?', translit: 'naḍandhu pōgalāmā?', literal: 'Walking may-go-Q?', english: 'Can I walk there?', speaker: 'பயணி', notes: [{ type: 'morphology', text: 'Too far to walk? The same -ல marks the means: பஸ்ல போலாம் "let\'s go by bus", ஆட்டோல போலாம் "by auto". English needs "by"; Tamil just adds -ல to the vehicle.', anchor: 'நடந்து' }, { type: 'culture', text: 'Chennai autos are famous for not using the meter — மீட்டர்ல போனா? "if we go by the meter?" is a real negotiation move. Ride apps quote a fixed fare instead.', anchor: 'போகலாமா' }] },
		{ target: 'ஆமா, ரொம்ப கிட்ட.', translit: 'āmā, romba kiṭṭa.', literal: 'Yes, very near.', english: "Yes, it's very close.", speaker: 'உள்ளூர்வாசி', constructions: ['romba-nalla'], notes: [{ type: 'grammar', text: 'Two tiny add-ons do heavy lifting in answers like பஸ் ஸ்டாப்பும் அங்க தான் "the bus stop is also right there": -உம் "also" and தான் "exactly/only" for emphasis — each follows the word it modifies.', anchor: 'ஆமா' }] },
		{ target: 'ரொம்ப நன்றி!', translit: 'romba naṇḍri!', literal: 'Very thanks!', english: 'Thank you so much!', speaker: 'பயணி' },
		{ target: 'பரவால்ல.', translit: 'paravālla.', literal: 'It-does-not-matter.', english: "You're welcome.", speaker: 'உள்ளூர்வாசி', notes: [{ type: 'culture', text: 'பரவால்ல — the spoken squeeze of பரவாயில்லை — shrugs things off in both directions: it waves away thanks ("no problem") and downplays pain or praise. Ask how a film was, and பரவால்ல means "decent".', anchor: 'பரவால்ல' }] }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 2, prompt: 'Line 3 means…', options: ['"Is it far?"', '"Where is it?"', '"Is it open?"'], answerIndex: 0, constructions: ['dooram'] },
		{ kind: 'recall', prompt: 'Say it in Tamil: "Where is the bus stand?"', canonical: 'பஸ் ஸ்டாண்ட் எங்க இருக்கு?', accepted: ['பஸ் ஸ்டாண்ட் எங்க இருக்கு?', 'bus stand eṅga irukku'], hints: ['… எங்க…'], constructions: ['enge-irukku'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'பஸ் ஸ்டாண்ட் ___ இருக்கு?', options: ['எங்க', 'எப்போ', 'எவ்வளவு'], answer: 'எங்க', rule: 'எங்க asks where, எப்போ asks when, எவ்வளவு asks how much.', constructions: ['enge-irukku'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🏥 You need the hospital and stop someone on the street.', use: 'enge-irukku', exemplar: 'ஹாஸ்பிடல் எங்க இருக்கு?', criteria: { constructions: [{ construction: 'enge-irukku', orderedGroups: [['எங்க இருக்கு', 'enga irukku']] }], contextGroups: [['ஹாஸ்பிடல்', 'hospital']] }, constructions: ['enge-irukku'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🏧 You need an ATM and stop a passer-by. Ask where it is, then confirm your guess that it is next to the bank.', use: 'enge-irukku', exemplar: 'ஏடிஎம் எங்க இருக்கு? பேங்க் பக்கத்துல இருக்கா?', criteria: { constructions: [{ construction: 'enge-irukku', orderedGroups: [['எங்க இருக்கு', 'enga irukku']] }, { construction: 'pakkathula', orderedGroups: [['பக்கத்துல', 'pakkathula']] }], contextGroups: [['ஏடிஎம்', 'atm'], ['பேங்க்', 'bank']] }, constructions: ['enge-irukku', 'pakkathula'] },
		{ kind: 'recall', prompt: 'Stop a stranger and ask: "Could you help me a little?"', canonical: 'கொஞ்சம் ஹெல்ப் பண்ண முடியுமா?', accepted: ['கொஞ்சம் ஹெல்ப் பண்ண முடியுமா?', 'கொஞ்சம் உதவி பண்ண முடியுமா?', 'konjam help paṇṇa muḍiyumā', 'konjam udhavi paṇṇa muḍiyumā'], hints: ['End with the infinitive + முடியுமா? — "is it possible to…?"'], constructions: ['mudiyumaa'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🚌 T. Nagar turns out to be too far to walk. Suggest going by bus.', use: 'busla', exemplar: 'பஸ்ல போகலாம்.', criteria: { constructions: [{ construction: 'busla', orderedGroups: [['பஸ்ல', 'busla', 'bus-la']] }], contextGroups: [['போகலாம்', 'pogalam']] }, constructions: ['busla'] }
	]
});

const l5 = d({
	index: 5,
	title: 'ரயில் நிலையம் — At the station',
	situation: 'Buying a ticket and checking the time',
	level: 'A1',
	constructions: [
		['ticket-kku', 'place + க்கு ஒரு டிக்கெட்', 'a ticket *to* somewhere'],
		['enna-neram', 'என்ன நேரம்?', 'asking the time'],
		['adutha', 'அடுத்த + noun', 'the next one'],
		['manikku', 'number + மணிக்கு', 'at X o\'clock — clock time takes the dative -க்கு']
	],
	lines: [
		{ target: 'மதுரைக்கு ஒரு டிக்கெட் வேணும்.', translit: 'madhuraikku oru ticket vēṇum.', literal: 'Madurai-to one ticket is-wanted.', english: 'One ticket to Madurai, please.', speaker: 'பயணி', constructions: ['ticket-kku', 'enakku-venum'], chunks: ['madhuraikku', 'oru ticket', 'vēṇum'], notes: [{ type: 'morphology', text: 'Destination takes the dative -க்கு, the same ending as எனக்கு. மதுரை + க்கு = மதுரைக்கு.', anchor: 'மதுரைக்கு' }, { type: 'morphology', text: 'The same -க்கு marks the experiencer of age: அவனுக்கு பதினெட்டு வயசு — "to-him eighteen age" = he is eighteen.', anchor: 'மதுரைக்கு' }] },
		{ target: 'அடுத்த ரயில் என்ன நேரம்?', translit: 'aḍuttha rayil enna nēram?', literal: 'Next train what time?', english: 'What time is the next train?', speaker: 'பயணி', constructions: ['adutha', 'enna-neram'], notes: [{ type: 'grammar', text: 'You can also ask எத்தனை மணிக்கு? — "at what o\'clock (does it leave)?" — with the counting word எத்தனை you know from lesson 2.', anchor: 'என்ன நேரம்' }] },
		{ target: 'ரெண்டு மணிக்கு.', translit: 'reṇḍu maṇikku.', literal: 'Two o-clock-to.', english: 'At two o’clock.', speaker: 'எழுத்தர்', constructions: ['manikku'], notes: [{ type: 'morphology', text: 'மணி "o\'clock" + dative -க்கு: ரெண்டு மணிக்கு is literally "to two o\'clock". The same ending as எனக்கு and மதுரைக்கு.', anchor: 'மணிக்கு' }, { type: 'grammar', text: 'Half hours fuse with அரை "half" into one word: ரெண்டரை "2:30", மூணரை "3:30", ஆறரை "6:30" — then மணிக்கு as usual.', anchor: 'ரெண்டு' }] },
		{ target: 'எந்த பிளாட்பாரம்?', translit: 'endha platform?', literal: 'Which platform?', english: 'Which platform?', speaker: 'பயணி' },
		{ target: 'மூணாவது பிளாட்பாரம்.', translit: 'mūṇāvadhu platform.', literal: 'Third platform.', english: 'Platform three.', speaker: 'எழுத்தர்' },
		{ target: 'எவ்வளவு ஆகும்?', translit: 'evvaḷavu āgum?', literal: 'How-much will-become?', english: 'How much will it be?', speaker: 'பயணி', constructions: ['evvalavu'] },
		{ target: 'நூத்தி ஐம்பது ரூபாய்.', translit: 'nūtthi aimbadhu rūbāy.', literal: 'Hundred fifty rupees.', english: 'A hundred and fifty rupees.', speaker: 'எழுத்தர்', notes: [{ type: 'pronunciation', text: 'நூத்தி is the spoken combining form of நூறு "hundred". In everyday speech ஐம்பது also flattens to அம்பது and ரூபாய் shortens to ரூபா — நூத்தி அம்பது ரூபா is what you will usually hear.', anchor: 'நூத்தி ஐம்பது' }] },
		{ target: 'சரி, நன்றி.', translit: 'sari, naṇḍri.', literal: 'Fine, thanks.', english: 'All right, thank you.', speaker: 'பயணி' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 1, prompt: 'Line 2 means…', options: ['"What time is the next train?"', '"Which platform is the train?"', '"Is the train late?"'], answerIndex: 0, constructions: ['enna-neram'] },
		{ kind: 'recall', prompt: 'Say it in Tamil: "One ticket to Madurai, please."', canonical: 'மதுரைக்கு ஒரு டிக்கெட் வேணும்.', accepted: ['மதுரைக்கு ஒரு டிக்கெட் வேணும்.', 'madhuraikku oru ticket vēṇum'], hints: ['மதுரைக்கு…'], constructions: ['ticket-kku'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'மதுரை___ ஒரு டிக்கெட் வேணும்.', options: ['க்கு', 'ல', 'ய'], answer: 'க்கு', rule: 'Destination takes dative -க்கு; -ல is "at/in"; -ய marks an object.', constructions: ['ticket-kku'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🚌 A bus counter. You want a ticket to Coimbatore.', use: 'ticket-kku', exemplar: 'கோயம்புத்தூருக்கு ஒரு டிக்கெட் வேணும்.', criteria: { constructions: [{ construction: 'ticket-kku', orderedGroups: [['கோயம்புத்தூருக்கு', 'coimbatore-kku'], ['ஒரு டிக்கெட்', 'oru ticket']] }], contextGroups: [['வேணும்', 'venum']] }, constructions: ['ticket-kku'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'அடுத்த ரயில் ___ மணிக்கு?', options: ['எத்தனை', 'என்ன', 'எவ்வளவு'], answer: 'எத்தனை', rule: 'Before மணிக்கு use the counting word எத்தனை — "at how-many o\'clock?". என்ன நேரம் asks the time itself; எவ்வளவு asks amounts.', constructions: ['enna-neram', 'manikku'] }
	]
});

const l6 = d({
	index: 6,
	title: 'உணவகத்தில் — At the restaurant',
	situation: 'Ordering a meal',
	level: 'A1',
	constructions: [
		['enna-irukku', 'என்ன இருக்கு?', 'what is available'],
		['naan-edukkuren', 'noun + எடுத்துக்கறேன்', "I'll take / I'll have"],
		['bill-kudunga', 'பில் குடுங்க', 'asking for the bill'],
		['pidikkum', 'dative + பிடிக்கும் / பிடிக்காது', 'liking and not liking — "to-me X is-pleasing", the verb never changes'],
		['vida', 'X-ஐ விட Y', 'comparing — "than X, Y…"; the thing being beaten comes first']
	],
	lines: [
		{ target: 'சாப்பிட என்ன இருக்கு?', translit: 'sāppiḍa enna irukku?', literal: 'To-eat what is-there?', english: "What's there to eat?", speaker: 'வாடிக்கையாளர்', constructions: ['enna-irukku'], chunks: ['sāppiḍa', 'enna', 'irukku'] },
		{ target: 'இட்லி, தோசை, சாப்பாடு இருக்கு.', translit: 'iḍli, dhōsai, sāppāḍu irukku.', literal: 'Idli, dosai, meal is-there.', english: 'We have idli, dosai and full meals.', speaker: 'சர்வர்', notes: [{ type: 'grammar', text: 'Liking works like wanting — the liker takes the dative: உங்களுக்கு என்ன பிடிக்கும்? "what do you like?" — எனக்கு தோசை பிடிக்கும். பிடிக்கும் never changes form, and its negative is the equally fixed பிடிக்காது: பொங்கல் பிடிக்காது "I don\'t like pongal".', anchor: 'தோசை' }] },
		{ target: 'நான் ஒரு தோசை எடுத்துக்கறேன்.', translit: 'nān oru dhōsai eḍutthukkaṛēn.', literal: 'I one dosai take-for-myself.', english: "I'll have a dosai.", speaker: 'வாடிக்கையாளர்', constructions: ['naan-edukkuren'], notes: [{ type: 'grammar', text: 'Unlike எனக்கு … வேணும், this one does take நான் as the subject — the verb is a real action verb here, not a want-state.', anchor: 'நான்' }, { type: 'morphology', text: '-றேன் commits you: எடுத்துக்கறேன் "I\'ll take", வரேன் "I\'ll come", புக் பண்றேன் "I\'ll book" — the spoken first person that promises the action, like English "I\'ll".', anchor: 'எடுத்துக்கறேன்' }] },
		{ target: 'குடிக்க என்ன வேணும்?', translit: 'kuḍikka enna vēṇum?', literal: 'To-drink what is-wanted?', english: 'What would you like to drink?', speaker: 'சர்வர்', notes: [{ type: 'morphology', text: 'To compare drinks (or anything), mark the runner-up with -ஐ விட: டீயை விட காபி தான் எனக்கு பிடிக்கும் — "than tea, it\'s coffee I like". The thing being beaten comes first; this is your first sight of the object marker -ஐ.', anchor: 'குடிக்க' }] },
		{ target: 'தண்ணி மட்டும் போதும்.', translit: 'thaṇṇi maṭṭum pōdhum.', literal: 'Water only is-enough.', english: 'Just water is fine.', speaker: 'வாடிக்கையாளர்' },
		{ target: 'ரொம்ப நல்லா இருந்தது.', translit: 'romba nallā irundhadhu.', literal: 'Very well it-was.', english: 'That was very good.', speaker: 'வாடிக்கையாளர்', constructions: ['romba-nalla'] },
		{ target: 'பில் குடுங்க.', translit: 'bill kuḍunga.', literal: 'Bill give-please.', english: 'The bill, please.', speaker: 'வாடிக்கையாளர்', constructions: ['bill-kudunga', 'kudunga'], notes: [{ type: 'culture', text: 'English loans slot straight into spoken Tamil — பில், ரூம், ரெஸ்ட் — and take Tamil endings like native words, including the adverbial -ஆ: ஹெவியா "heavy(-ish)", லைட்டா "light(-ly)".', anchor: 'பில்' }] },
		{ target: 'இதோ வந்துடுச்சு.', translit: 'idhō vandhuḍuchchu.', literal: 'Here it-has-come.', english: 'Here it is.', speaker: 'சர்வர்' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 0, prompt: 'Line 1 means…', options: ['"What is there to eat?"', '"Where do I eat?"', '"Is the food good?"'], answerIndex: 0, constructions: ['enna-irukku'] },
		{ kind: 'recall', prompt: 'Say it in Tamil: "The bill, please."', canonical: 'பில் குடுங்க.', accepted: ['பில் குடுங்க.', 'bill kuḍunga'], hints: ['பில்…'], constructions: ['bill-kudunga'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'சாப்பிட ___ இருக்கு?', options: ['என்ன', 'எங்க', 'யாரு'], answer: 'என்ன', rule: 'என்ன = what, எங்க = where, யாரு = who.', constructions: ['enna-irukku'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🧃 A juice shop. You want to ask what juices they have.', use: 'enna-irukku', exemplar: 'ஜூஸ் என்ன இருக்கு?', criteria: { constructions: [{ construction: 'enna-irukku', orderedGroups: [['என்ன இருக்கு', 'enna irukku']] }], contextGroups: [['ஜூஸ்', 'juice']] }, constructions: ['enna-irukku'] },
		{ kind: 'recall', prompt: 'Say it in Tamil: "I really like dosai."', canonical: 'எனக்கு தோசை ரொம்ப பிடிக்கும்.', accepted: ['எனக்கு தோசை ரொம்ப பிடிக்கும்.', 'எனக்கு ரொம்ப தோசை பிடிக்கும்.', 'enakku dhōsai romba piḍikkum', 'enakku thōsai romba piḍikkum', 'எனக்கு தோசை ரொம்ப புடிக்கும்.'], hints: ['The liker takes the dative: எனக்கு.'], constructions: ['pidikkum'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'எனக்கு இட்லி ___, ஆனா பொங்கல் பிடிக்காது.', options: ['பிடிக்கும்', 'வேணும்', 'இருக்கு'], answer: 'பிடிக்கும்', rule: 'பிடிக்கும் is a standing taste; வேணும் wants one now; இருக்கு only says it exists. The contrast clause already carries the negative பிடிக்காது.', constructions: ['pidikkum'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '☕ A friend asks: coffee or tea? Say you like coffee more than tea.', use: 'vida', exemplar: 'டீயை விட காபி தான் எனக்கு பிடிக்கும்.', criteria: { constructions: [{ construction: 'vida', orderedGroups: [['டீயை விட', 'teeyai vida']] }, { construction: 'pidikkum', orderedGroups: [['எனக்கு', 'enakku'], ['பிடிக்கும்', 'pidikkum']] }], contextGroups: [['காபி', 'coffee']] }, constructions: ['vida', 'pidikkum'] }
	]
});

const l7 = {
	...d({
		index: 7,
		title: 'திரும்பப் பார்ப்போம் — Review: a morning out',
		situation: 'One new dialogue, all old pieces',
		level: 'A1',
		kind: 'synthesis',
		constructions: [],
		lines: [
			{ target: 'வணக்கம். மதுரைக்கு ஒரு டிக்கெட் வேணும்.', translit: 'vaṇakkam. madhuraikku oru ticket vēṇum.', literal: 'Greeting. Madurai-to one ticket is-wanted.', english: 'Hello. One ticket to Madurai, please.', speaker: 'பயணி' },
			{ target: 'அடுத்த ரயில் என்ன நேரம்?', translit: 'aḍuttha rayil enna nēram?', literal: 'Next train what time?', english: 'What time is the next train?', speaker: 'பயணி' },
			{ target: 'காபி கடை எங்க இருக்கு?', translit: 'kaapi kaḍai eṅga irukku?', literal: 'Coffee shop where it-is?', english: 'Where is the coffee shop?', speaker: 'பயணி' },
			{ target: 'நேரா போங்க, வலது பக்கம்.', translit: 'nērā pōṅga, valadhu pakkam.', literal: 'Straight go-please, right side.', english: 'Go straight, on the right.', speaker: 'எழுத்தர்' },
			{ target: 'எனக்கு ஒரு காபி வேணும். எவ்வளவு?', translit: 'enakku oru kaapi vēṇum. evvaḷavu?', literal: 'To-me one coffee is-wanted. How-much?', english: "I'd like a coffee. How much?", speaker: 'பயணி' },
			{ target: 'இருபது ரூபாய். ரொம்ப நல்லா இருக்கு.', translit: 'irubadhu rūbāy. romba nallā irukku.', literal: 'Twenty rupees. Very well it-is.', english: "Twenty rupees. It's very good.", speaker: 'கடைக்காரர்' }
		],
		exercises: [
			{ kind: 'transfer', prompt: 'Perform the whole dialogue, then adapt it:', situation: '🚉 The same station, but you are going to Trichy and you want tea.', use: 'ticket-kku', exemplar: 'திருச்சிக்கு ஒரு டிக்கெட் வேணும். எனக்கு ஒரு டீ வேணும்.', criteria: { constructions: [{ construction: 'ticket-kku', orderedGroups: [['திருச்சிக்கு', 'trichy-kku'], ['ஒரு டிக்கெட்', 'oru ticket']] }, { construction: 'enakku-venum', orderedGroups: [['எனக்கு', 'enakku'], ['வேணும்', 'venum']] }], contextGroups: [['டீ', 'tea']] }, constructions: ['enakku-venum'] },
			{ kind: 'transfer', prompt: 'Still at the station from the dialogue — ask your way around it:', situation: '🎫 It is your first time here and you need to find the ticket counter.', use: 'enge-irukku', exemplar: 'டிக்கெட் கவுண்ட்டர் எங்க இருக்கு?', criteria: { constructions: [{ construction: 'enge-irukku', orderedGroups: [['எங்க இருக்கு', 'enga irukku']] }], contextGroups: [['டிக்கெட் கவுண்ட்டர்', 'ticket counter']] }, constructions: [] }
		]
	}),
	constructions: carryConstructions(
		[l1, l2, l3, l4, l5, l6],
		['ta.enakku-venum', 'ta.vanakkam', 'ta.evvalavu', 'ta.enge-irukku', 'ta.ticket-kku', 'ta.enna-neram', 'ta.romba-nalla']
	)
};

const l8 = d({
	index: 8,
	title: 'மருத்துவரிடம் — At the doctor',
	situation: 'Explaining what hurts',
	level: 'A1',
	constructions: [
		['vali', 'body part + வலி', 'saying what hurts'],
		['irundhu', 'time + இருந்து', 'since / for a duration'],
		['nalla-thoongala', 'verb + ல', 'the negative — "not …"'],
		['aa-irukku', 'state + -ஆ இருக்கு', 'saying how you feel — சோர்வா இருக்கு "feels tired"']
	],
	lines: [
		{ target: 'வணக்கம், டாக்டர்.', translit: 'vaṇakkam, doctor.', literal: 'Greeting, doctor.', english: 'Hello, doctor.', speaker: 'நோயாளி', constructions: ['vanakkam'] },
		{ target: 'என்ன பிரச்சனை?', translit: 'enna prachchanai?', literal: 'What problem?', english: "What's the trouble?", speaker: 'டாக்டர்', notes: [{ type: 'grammar', text: 'A friend would ask என்ன ஆச்சு? — "what happened?" (ஆச்சு is the spoken past of ஆகு "become/happen"). என்ன பிரச்சனை suits a doctor; என்ன ஆச்சு suits everyone else.', anchor: 'என்ன பிரச்சனை' }] },
		{ target: 'எனக்கு தலைவலி.', translit: 'enakku thalaivali.', literal: 'To-me head-pain.', english: 'I have a headache.', speaker: 'நோயாளி', constructions: ['vali'], chunks: ['enakku', 'thalaivali'], notes: [{ type: 'morphology', text: 'தலை (head) + வலி (pain) compound directly. Same for வயிறு வலி, பல் வலி.', anchor: 'தலைவலி' }, { type: 'morphology', text: 'The verb version: தலை வலிக்குது "(my) head is-hurting" — spoken வலிக்குது for literary வலிக்கிறது. The body part itself does the verb work; there is no "I have".', anchor: 'தலைவலி' }] },
		{ target: 'எப்போ இருந்து?', translit: 'eppō irundhu?', literal: 'When from?', english: 'Since when?', speaker: 'டாக்டர்', constructions: ['irundhu'] },
		{ target: 'மூணு நாள் இருந்து.', translit: 'mūṇu nāḷ irundhu.', literal: 'Three day from.', english: 'For three days.', speaker: 'நோயாளி', constructions: ['irundhu'] },
		{ target: 'நல்லா தூங்கறீங்களா?', translit: 'nallā thūṅgaṛīṅgaḷā?', literal: 'Well you-sleep-Q?', english: 'Are you sleeping well?', speaker: 'டாக்டர்', notes: [{ type: 'morphology', text: 'The -ற்- is the spoken present marker: -றேன் "I…" (வைக்கறேன்), -றீங்க "you…" (தூங்கறீங்க). Literary Tamil writes -கிறேன் / -கிறீர்கள்; speech squeezes them.', anchor: 'தூங்கறீங்களா' }] },
		{ target: 'இல்ல, நல்லா தூங்கல.', translit: 'illa, nallā thūṅgala.', literal: 'No, well not-slept.', english: "No, I'm not sleeping well.", speaker: 'நோயாளி', constructions: ['nalla-thoongala'], notes: [{ type: 'morphology', text: 'To say how you feel, put -ஆ on the state and add இருக்கு: சோர்வா இருக்கு "I feel drained", லேசா இருக்கு "feeling lighter". நல்லா இருக்கு from lesson 1 was this pattern all along.', anchor: 'தூங்கல' }, { type: 'grammar', text: 'The question form of this negative: சரியா தூங்கலையா? "didn\'t you sleep properly?" — the same -ல negative plus the -ஆ question.', anchor: 'தூங்கல' }] },
		{ target: 'நிறைய தண்ணி குடிங்க, ரெஸ்ட் எடுங்க.', translit: 'niṛaiya thaṇṇi kuḍiṅga, rest eḍuṅga.', literal: 'Plenty water drink-please, rest take-please.', english: 'Drink plenty of water and rest.', speaker: 'டாக்டர்', constructions: ['kudunga'] }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 2, prompt: 'Line 3 means…', options: ['"I have a headache"', '"I have a stomach ache"', '"My head is fine"'], answerIndex: 0, constructions: ['vali'] },
		{ kind: 'recall', prompt: 'Say it in Tamil: "I have a headache, for three days."', canonical: 'எனக்கு தலைவலி, மூணு நாள் இருந்து.', accepted: ['எனக்கு தலைவலி, மூணு நாள் இருந்து.', 'எனக்கு தலைவலி.', 'தலை வலிக்குது.'], hints: ['எனக்கு…'], constructions: ['vali', 'irundhu'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'மூணு நாள் ___.', options: ['இருந்து', 'இருக்கு', 'இல்ல'], answer: 'இருந்து', rule: 'இருந்து marks the starting point of a duration.', constructions: ['irundhu'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🦷 A dentist. Your tooth has hurt since yesterday.', use: 'vali', exemplar: 'எனக்கு பல் வலி, நேத்திக்கு இருந்து.', criteria: { constructions: [{ construction: 'vali', orderedGroups: [['எனக்கு', 'enakku'], ['வலி', 'vali']] }, { construction: 'irundhu', orderedGroups: [['இருந்து', 'irundhu']] }], contextGroups: [['பல்', 'pal'], ['நேத்திக்கு', 'nethikku']] }, constructions: ['vali', 'irundhu'] },
		{ kind: 'recall', prompt: 'Say it in Tamil: "I feel really tired."', canonical: 'ரொம்ப சோர்வா இருக்கு.', accepted: ['ரொம்ப சோர்வா இருக்கு.', 'romba sōrvā irukku', 'உடம்பு ரொம்ப சோர்வா இருக்கு.'], hints: ['State + -ஆ + இருக்கு.'], constructions: ['aa-irukku'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'உடம்பு ரொம்ப ___ இருக்கு.', options: ['சோர்வா', 'சோர்வு', 'சோர்வான'], answer: 'சோர்வா', rule: 'Before இருக்கு the state takes the adverbial -ஆ: சோர்வு "tiredness" → சோர்வா "tiredly". The bare noun cannot sit in this slot.', constructions: ['aa-irukku'] }
	]
});

const l9 = d({
	index: 9,
	title: 'தொலைபேசியில் — On the phone',
	situation: 'A call that does not go smoothly',
	level: 'A1',
	constructions: [
		['pesalama', 'person + கிட்ட பேசலாமா?', 'may I speak to'],
		['konjam-iru', 'கொஞ்சம் இருங்க', 'hold on a moment'],
		['appuram', 'அப்புறம் + verb', 'later / afterwards']
	],
	lines: [
		{ target: 'ஹலோ, வணக்கம்.', translit: 'hello, vaṇakkam.', literal: 'Hello, greeting.', english: 'Hello, good morning.', speaker: 'அழைப்பாளர்', constructions: ['vanakkam'] },
		{ target: 'ராஜா கிட்ட பேசலாமா?', translit: 'rājā kiṭṭa pēsalāmā?', literal: 'Raja near may-speak-Q?', english: 'May I speak to Raja?', speaker: 'அழைப்பாளர்', constructions: ['pesalama'], chunks: ['rājā kiṭṭa', 'pēsalāmā'], notes: [{ type: 'grammar', text: 'கிட்ட means "near/with" and is how Tamil marks the person you speak *to*.', anchor: 'கிட்ட' }] },
		{ target: 'கொஞ்சம் இருங்க.', translit: 'konjam iruṅga.', literal: 'A-little be-please.', english: 'Hold on a moment.', speaker: 'பெறுநர்', constructions: ['konjam-iru'] },
		{ target: 'அவரு மீட்டிங்ல இருக்காரு.', translit: 'avaru meeting-la irukkāru.', literal: 'He meeting-in is.', english: "He's in a meeting.", speaker: 'பெறுநர்', notes: [{ type: 'grammar', text: 'Respect shows in the verb: அவரு … இருக்காரு uses the honorific -ஆரு ending — one respected person, treated grammatically like more than one. The same politeness move as -ங்க on "you" forms.', anchor: 'இருக்காரு' }] },
		{ target: 'அப்புறம் கூப்பிடலாமா?', translit: 'appuṛam kūppiḍalāmā?', literal: 'Later may-call-Q?', english: 'Can I call later?', speaker: 'அழைப்பாளர்', constructions: ['appuram', 'pesalama'] },
		{ target: 'ஆமா, மூணு மணிக்கு அப்புறம்.', translit: 'āmā, mūṇu maṇikku appuṛam.', literal: 'Yes, three o-clock-to after.', english: 'Yes, after three.', speaker: 'பெறுநர்', constructions: ['appuram', 'manikku'] },
		{ target: 'சரி, ரொம்ப நன்றி.', translit: 'sari, romba naṇḍri.', literal: 'Fine, very thanks.', english: 'All right, thank you very much.', speaker: 'அழைப்பாளர்' },
		{ target: 'பரவால்ல. வைக்கறேன்.', translit: 'paravālla. vaikkaṛēn.', literal: 'No-matter. I-put-down.', english: "No problem. I'll hang up.", speaker: 'பெறுநர்' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 2, prompt: 'Line 3 means…', options: ['"Hold on a moment"', '"Please call back"', '"He has left"'], answerIndex: 0, constructions: ['konjam-iru'] },
		{ kind: 'recall', prompt: 'Say it in Tamil: "May I speak to Raja?"', canonical: 'ராஜா கிட்ட பேசலாமா?', accepted: ['ராஜா கிட்ட பேசலாமா?', 'rājā kiṭṭa pēsalāmā'], hints: ['ராஜா…'], constructions: ['pesalama'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'ராஜா ___ பேசலாமா?', options: ['கிட்ட', 'க்கு', 'ல'], answer: 'கிட்ட', rule: 'கிட்ட marks the person addressed; -க்கு is a destination; -ல is a location.', constructions: ['pesalama'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🏢 An office. You want to ask to speak to the manager.', use: 'pesalama', exemplar: 'மேனேஜர் கிட்ட பேசலாமா?', criteria: { constructions: [{ construction: 'pesalama', orderedGroups: [['கிட்ட', 'kitta'], ['பேசலாமா', 'pesalama']] }], contextGroups: [['மேனேஜர்', 'manager']] }, constructions: ['pesalama'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🎬 A friend suggests the night show. Agree, and suggest eating afterwards.', use: 'appuram', exemplar: 'சரி. அப்புறம் சாப்பிடலாம்.', criteria: { constructions: [{ construction: 'appuram', orderedGroups: [['அப்புறம்', 'appuram']] }], contextGroups: [['சாப்பிடலாம்', 'saappidalam']] }, constructions: ['appuram'] }
	]
});

const l10 = d({
	index: 10,
	title: 'சாமான் வாங்குதல் — Shopping for the house',
	situation: 'A kitchen with nothing useful in it',
	level: 'A1',
	constructions: [
		['illa-neg', 'noun + இல்ல', 'there is no …'],
		['pothum', 'போதும் / பத்தாது', 'enough / not enough'],
		['pogalam', 'போகலாம்', "let's go"],
		['chittu-sequence', 'verb + -ட்டு / -ச்சிட்டு', 'having done X — chains actions; only the last verb carries tense']
	],
	lines: [
		{ target: 'வீட்ல பால் இருக்கா?', translit: 'vīṭla pāl irukkā?', literal: 'House-in milk is-there-Q?', english: 'Is there milk at home?', speaker: 'ராஜா', constructions: ['irukka-q'], notes: [{ type: 'morphology', text: 'வீட்ல = வீடு + -ல "at home". The same -ல marks times of day: காலையில "in the morning", ராத்திரியில "at night" — English puts "in/at" before; Tamil glues it on after.', anchor: 'வீட்ல' }] },
		{ target: 'இல்ல, பால் இல்ல.', translit: 'illa, pāl illa.', literal: 'No, milk not-there.', english: 'No, there’s no milk.', speaker: 'மீனா', constructions: ['illa-neg'], notes: [{ type: 'grammar', text: 'இருக்கு and இல்ல are a clean pair: is-there / is-not-there. There is no verb "to have" doing this job.', anchor: 'இல்ல' }] },
		{ target: 'அரிசி இருக்கா?', translit: 'arisi irukkā?', literal: 'Rice is-there-Q?', english: 'Is there rice?', speaker: 'ராஜா', constructions: ['irukka-q'] },
		{ target: 'இருக்கு, ஆனா பத்தாது.', translit: 'irukku, ānā patthādhu.', literal: 'It-is, but not-enough.', english: "There is, but not enough.", speaker: 'மீனா', constructions: ['pothum'] },
		{ target: 'கடைக்கு போகலாம்.', translit: 'kaḍaikku pōgalām.', literal: 'Shop-to let-us-go.', english: "Let's go to the shop.", speaker: 'ராஜா', constructions: ['pogalam'] },
		{ target: 'சரி. காபி குடிச்சிட்டு போகலாம்.', translit: 'sari. kaapi kuḍichchiṭṭu pōgalām.', literal: 'Fine. Coffee having-drunk let-us-go.', english: "All right. Let's have a coffee and go.", speaker: 'மீனா', constructions: ['pogalam', 'chittu-sequence'], notes: [{ type: 'morphology', text: 'குடிச்சிட்டு = குடி "drink" + -ச்சிட்டு "having done". Tamil chains actions with -ட்டு/-ச்சிட்டு instead of "and then": the first verb takes the suffix, and only the last verb carries the tense.', anchor: 'குடிச்சிட்டு' }] },
		{ target: 'எப்பவும் காபி!', translit: 'eppavum kaapi!', literal: 'Always coffee!', english: 'Always coffee!', speaker: 'ராஜா' },
		{ target: 'அது போதும்!', translit: 'adhu pōdhum!', literal: 'That is-enough!', english: "That's enough of that!", speaker: 'மீனா', constructions: ['pothum'] }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 1, prompt: 'Line 2 means…', options: ['"There is no milk"', '"There is milk"', '"I do not like milk"'], answerIndex: 0, constructions: ['illa-neg'] },
		{ kind: 'recall', prompt: 'Say it in Tamil: "There is no milk."', canonical: 'பால் இல்ல.', accepted: ['பால் இல்ல.', 'pāl illa'], hints: ['பால்…'], constructions: ['illa-neg'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'பால் ___.', options: ['இல்ல', 'இருக்கு', 'இருக்கா'], answer: 'இல்ல', rule: 'இல்ல negates existence; இருக்கு asserts it; இருக்கா asks.', constructions: ['illa-neg'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🧂 You notice there is no salt in the kitchen.', use: 'illa-neg', exemplar: 'உப்பு இல்ல.', criteria: { constructions: [{ construction: 'illa-neg', orderedGroups: [['இல்ல', 'illa']] }], contextGroups: [['உப்பு', 'uppu']] }, constructions: ['illa-neg'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'காபி ___ போகலாம்.', options: ['குடிச்சிட்டு', 'குடிக்க', 'குடிச்சேன்'], answer: 'குடிச்சிட்டு', rule: 'The chained verb takes -ச்சிட்டு "having drunk"; குடிச்சேன் is a finished past and குடிக்க is a bare "to drink" — neither chains into போகலாம்.', constructions: ['chittu-sequence'] }
	]
});

const l11 = d({
	index: 11,
	title: 'வார இறுதி — The weekend',
	situation: 'Making plans',
	level: 'A1',
	constructions: [
		['enna-pannalam', 'என்ன பண்ணலாம்?', 'what shall we do?'],
		['pona', 'verb + லாம்', 'the "let’s / may" form'],
		['vēlai', 'வேலை இருக்கு', 'having work on'],
		['naa-conditional', 'verb + -னா / -ந்தா', 'spoken "if…" — built on the past stem; written -ஆல் drops its ல்']
	],
	lines: [
		{ target: 'வீக்கெண்ட் என்ன பண்ணலாம்?', translit: 'weekend enna paṇṇalām?', literal: 'Weekend what shall-do?', english: 'What shall we do this weekend?', speaker: 'மீனா', constructions: ['enna-pannalam'], chunks: ['weekend', 'enna', 'paṇṇalām'], notes: [{ type: 'grammar', text: 'பண்ணு is the all-purpose spoken "do" (literary செய்). It also asks occupation: என்ன பண்றீங்க? "what do you do?" — வேலை பண்றேன் "I work". Tamil is verb-final: the question word sits before the verb, never after it.', anchor: 'பண்ணலாம்' }, { type: 'grammar', text: 'பண்ணு also turns nouns — very often English loans — into verbs: புக் பண்றேன் "I\'ll book", பிளான் பண்ணலாம் "we can plan". Spoken says பண்றேன், never literary செய்கிறேன்.', anchor: 'பண்ணலாம்' }] },
		{ target: 'மியூசியம் போகலாமா?', translit: 'museum pōgalāmā?', literal: 'Museum shall-go-Q?', english: 'Shall we go to the museum?', speaker: 'ராஜா', constructions: ['pona', 'pogalam'], notes: [{ type: 'grammar', text: 'The same -லாம் gives the everyday goodbye: அப்புறம் பார்க்கலாம் — "see you later", literally "later let-us-see" (said pākkalām, the ர் barely audible). Compare சனிக்கிழமை பார்க்கலாம் in lesson 13.', anchor: 'போகலாமா' }] },
		{ target: 'சனிக்கிழமை வேலை இருக்கு.', translit: 'sanikkizhamai vēlai irukku.', literal: 'Saturday work is-there.', english: 'I have work on Saturday.', speaker: 'மீனா', constructions: ['vēlai'] },
		{ target: 'அப்போ ஞாயித்துக்கிழமை?', translit: 'appō ñāyitthukkizhamai?', literal: 'Then Sunday?', english: 'Sunday then?', speaker: 'ராஜா' },
		{ target: 'சரி. என்ன நேரம்?', translit: 'sari. enna nēram?', literal: 'Fine. What time?', english: 'All right. What time?', speaker: 'மீனா', constructions: ['enna-neram'] },
		{ target: 'பத்து மணிக்கு, ஸ்டேஷன் முன்னாடி.', translit: 'patthu maṇikku, station munnāḍi.', literal: 'Ten o-clock-to, station in-front.', english: 'At ten, in front of the station.', speaker: 'ராஜா' },
		{ target: 'ரொம்ப நல்லது.', translit: 'romba nalladhu.', literal: 'Very good.', english: 'Very good.', speaker: 'மீனா', constructions: ['romba-nalla'] },
		{ target: 'மழை பெய்யலைன்னா!', translit: 'mazhai peyyalainnā!', literal: 'Rain if-not-falling!', english: "If it doesn't rain!", speaker: 'ராஜா', constructions: ['naa-conditional'], notes: [{ type: 'grammar', text: 'Spoken "if" is -ஆ on the past stem: இருந்தா "if there is" (ட்ராஃபிக் இருந்தா ஒரு மணி நேரம் ஆகும்), போனா "if (you) go". Written Tamil keeps a final ல்: இருந்தால், போனால். This line stacks it on a negative: பெய்யலை + -ன்னா "if it doesn\'t rain".', anchor: 'பெய்யலைன்னா' }] }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 2, prompt: 'Line 3 means…', options: ['"I have work on Saturday"', '"I worked on Saturday"', '"Saturday is a holiday"'], answerIndex: 0, constructions: ['vēlai'] },
		{ kind: 'recall', prompt: 'Say it in Tamil: "Shall we go to the museum?"', canonical: 'மியூசியம் போகலாமா?', accepted: ['மியூசியம் போகலாமா?', 'மியூசியம் போலாமா?', 'museum pōgalāmā', 'museum pōlāmā'], hints: ['மியூசியம்…'], constructions: ['pona'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'மியூசியம் போக___?', options: ['லாமா', 'றேன்', 'ல'], answer: 'லாமா', rule: '-லாம் proposes ("let’s"); adding -ஆ turns it into a question.', constructions: ['pona'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🎬 A friend asks about tonight. Suggest going to a film.', use: 'pona', exemplar: 'சினிமா போகலாமா?', criteria: { constructions: [{ construction: 'pona', orderedGroups: [['போகலாமா', 'pogalama']] }], contextGroups: [['சினிமா', 'cinema']] }, constructions: ['pona'] },
		{ kind: 'recall', prompt: 'Say it in Tamil: "I\'ll book the tickets."', canonical: 'டிக்கெட் நான் புக் பண்றேன்.', accepted: ['டிக்கெட் நான் புக் பண்றேன்.', 'நான் டிக்கெட் புக் பண்றேன்.', 'ticket nān book paṇṛēn', 'nān ticket book paṇṛēn'], hints: ['பண்ணு turns the loan "book" into a verb.'], constructions: ['enna-pannalam'] },
		{ kind: 'comprehension', lineIndex: 7, prompt: 'Line 8 means…', options: ['"If it doesn\'t rain!"', '"It is raining!"', '"I hope it rains!"'], answerIndex: 0, constructions: ['naa-conditional'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'லேட்டா ___, பிரச்சனை.', options: ['போனா', 'போறேன்', 'போலாம்'], answer: 'போனா', rule: '"If (you) go" needs the spoken conditional: past stem போன- + -ஆ → போனா. போறேன் is "I go" and போலாம் is "let\'s go" — neither means "if".', constructions: ['naa-conditional'] }
	]
});

const l12 = d({
	index: 12,
	title: 'தபால் நிலையம் — At the post office',
	situation: 'Sending a parcel',
	level: 'A1',
	constructions: [
		['anuppanum', 'noun + அனுப்பணும்', 'needing to send something'],
		['evvalavu-aagum', 'எவ்வளவு ஆகும்?', 'how much (money or time) will it come to'],
		['keyamana', 'குறைவான / சீக்கிரம்', 'cheaper / faster']
	],
	lines: [
		{ target: 'இந்த பார்சல் கனடாக்கு அனுப்பணும்.', translit: 'indha parcel canadākku anuppaṇum.', literal: 'This parcel Canada-to must-send.', english: 'I need to send this parcel to Canada.', speaker: 'வாடிக்கையாளர்', constructions: ['anuppanum', 'ticket-kku'], chunks: ['indha parcel', 'canadākku', 'anuppaṇum'], notes: [{ type: 'morphology', text: '-ணும் is spoken "must / need to" — a worn-down வேண்டும் — and attaches to any verb: அனுப்பணும் "must send", போகணும் "must go", எழுந்திருக்கணும் "must get up". No separate word marks the person who must; context supplies it.', anchor: 'அனுப்பணும்' }] },
		{ target: 'ரெண்டு கிலோ இருக்கு. ஏர்மெயிலா?', translit: 'reṇḍu kilō irukku. airmail-ā?', literal: 'Two kilo is. Airmail-Q?', english: "It's two kilos. By air?", speaker: 'எழுத்தர்' },
		{ target: 'ஏர்மெயில் எவ்வளவு ஆகும்?', translit: 'airmail evvaḷavu āgum?', literal: 'Airmail how-much will-become?', english: 'How much will airmail cost?', speaker: 'வாடிக்கையாளர்', constructions: ['evvalavu-aagum', 'evvalavu'], notes: [{ type: 'grammar', text: 'ஆகும் is literally "will become" — Tamil prices "become". Speech also gives you the present ஆகுது (மொத்தம் எவ்ளோ ஆகுது? "what\'s the total coming to?") and the past ஆச்சு when paying afterwards (எவ்ளோ ஆச்சு? "what did it come to?").', anchor: 'ஆகும்' }, { type: 'grammar', text: 'ஆகும் covers time as well as money: எவ்வளவு நேரம் ஆகும்? "how long will it take?" — பஸ்ல எவ்வளவு நேரம் ஆகும்? "how long by bus?".', anchor: 'எவ்வளவு' }] },
		{ target: 'ரெண்டாயிரம் ரூபாய்.', translit: 'reṇḍāyiram rūbāy.', literal: 'Two-thousand rupees.', english: 'Two thousand rupees.', speaker: 'எழுத்தர்' },
		{ target: 'குறைவான வழி இருக்கா?', translit: 'kuṛaivāna vazhi irukkā?', literal: 'Cheaper way is-there-Q?', english: 'Is there a cheaper way?', speaker: 'வாடிக்கையாளர்', constructions: ['keyamana', 'irukka-q'] },
		{ target: 'கப்பல்ல எண்ணூறு. ஆனா ஆறு வாரம்.', translit: 'kappalla eṇṇūṛu. ānā āṛu vāram.', literal: 'Ship-by eight-hundred. But six week.', english: 'By sea, eight hundred. But six weeks.', speaker: 'எழுத்தர்' },
		{ target: 'ஆறு வாரமா! ஏர்மெயிலே போதும்.', translit: 'āṛu vāramā! airmail-ē pōdhum.', literal: 'Six week-Q! Airmail-itself is-enough.', english: 'Six weeks! Airmail is fine then.', speaker: 'வாடிக்கையாளர்', constructions: ['pothum'] },
		{ target: 'சரி, இங்க கையெழுத்து போடுங்க.', translit: 'sari, iṅga kaiyezhutthu pōḍuṅga.', literal: 'Fine, here signature put-please.', english: 'All right, sign here please.', speaker: 'எழுத்தர்', constructions: ['kudunga'] }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 2, prompt: 'Line 3 means…', options: ['"How much will airmail cost?"', '"How long does airmail take?"', '"Is airmail available?"'], answerIndex: 0, constructions: ['evvalavu-aagum'] },
		{ kind: 'recall', prompt: 'Say it in Tamil: "I need to send this parcel to Canada."', canonical: 'இந்த பார்சல் கனடாக்கு அனுப்பணும்.', accepted: ['இந்த பார்சல் கனடாக்கு அனுப்பணும்.'], hints: ['இந்த பார்சல்…'], constructions: ['anuppanum'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'இந்த பார்சல் கனடா___ அனுப்பணும்.', options: ['க்கு', 'ல', 'கிட்ட'], answer: 'க்கு', rule: 'Destination takes -க்கு, the same ending as மதுரைக்கு.', constructions: ['anuppanum'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '💌 You want to send a letter to Delhi.', use: 'anuppanum', exemplar: 'இந்த கடிதம் டெல்லிக்கு அனுப்பணும்.', criteria: { constructions: [{ construction: 'anuppanum', orderedGroups: [['அனுப்பணும்', 'anuppanum']] }], contextGroups: [['கடிதம்', 'letter'], ['டெல்லிக்கு', 'delhi-kku']] }, constructions: ['anuppanum'] },
		{ kind: 'transfer', prompt: 'Stretch the -ணும் ending to a new verb:', situation: '📞 Late-night phone call. Say you must get up at five tomorrow.', use: 'anuppanum', exemplar: 'நாளைக்கு அஞ்சு மணிக்கு எழுந்திருக்கணும்.', criteria: { constructions: [{ construction: 'anuppanum', orderedGroups: [['எழுந்திருக்கணும்', 'ezhundhirukkanum']] }, { construction: 'manikku', orderedGroups: [['மணிக்கு', 'manikku']] }], contextGroups: [['நாளைக்கு', 'nalaikku'], ['அஞ்சு', 'anju']] }, constructions: ['anuppanum', 'manikku'] }
	]
});

const l13 = d({
	index: 13,
	title: 'அழைப்பு — An invitation',
	situation: 'Being invited to dinner',
	level: 'A1',
	constructions: [
		['varingala', 'verb + றீங்களா?', 'inviting — "will you come?"'],
		['kondu-vara', 'என்ன கொண்டு வரணும்?', 'offering to bring something'],
		['kandippa', 'கண்டிப்பா', 'certainly / definitely'],
		['venaam', 'noun + வேணாம்', 'refusing — "(I) don\'t want …", the fixed negative of வேணும்']
	],
	lines: [
		{ target: 'சனிக்கிழமை சாப்பிட வரீங்களா?', translit: 'sanikkizhamai sāppiḍa varīṅgaḷā?', literal: 'Saturday to-eat you-come-Q?', english: 'Will you come for dinner on Saturday?', speaker: 'மீனா', constructions: ['varingala'], chunks: ['sanikkizhamai', 'sāppiḍa', 'varīṅgaḷā'] },
		{ target: 'கண்டிப்பா! என்ன நேரம்?', translit: 'kaṇḍippā! enna nēram?', literal: 'Certainly! What time?', english: 'Definitely! What time?', speaker: 'ராஜா', constructions: ['kandippa', 'enna-neram'] },
		{ target: 'எட்டு மணிக்கு.', translit: 'eṭṭu maṇikku.', literal: 'Eight o-clock-to.', english: 'At eight.', speaker: 'மீனா', constructions: ['manikku'] },
		{ target: 'நான் என்ன கொண்டு வரணும்?', translit: 'nān enna koṇḍu varaṇum?', literal: 'I what having-taken must-come?', english: 'What should I bring?', speaker: 'ராஜா', constructions: ['kondu-vara'] },
		{ target: 'ஒண்ணும் வேணாம்!', translit: 'oṇṇum vēṇām!', literal: 'Anything is-not-wanted!', english: 'Nothing at all!', speaker: 'மீனா', constructions: ['venaam'], notes: [{ type: 'morphology', text: 'வேணாம் is the fixed negative of வேணும்: NOUN + வேணாம் = "I don\'t want NOUN", with the refused thing first. It is also the polite way to wave off street vendors.', anchor: 'வேணாம்' }] },
		{ target: 'கொஞ்சம் ஸ்வீட் கொண்டு வரேன்.', translit: 'konjam sweet koṇḍu varēn.', literal: 'A-little sweet having-taken I-come.', english: "I'll bring some sweets.", speaker: 'ராஜா', constructions: ['kondu-vara'], notes: [{ type: 'culture', text: '"ஒண்ணும் வேணாம்" is politeness, not instruction. Arriving with sweets or fruit is expected.', anchor: 'ஒண்ணும் வேணாம்' }] },
		{ target: 'உங்க இஷ்டம். ரொம்ப நல்லது.', translit: 'uṅga ishṭam. romba nalladhu.', literal: 'Your wish. Very good.', english: 'As you like. That’s kind.', speaker: 'மீனா', constructions: ['romba-nalla'] },
		{ target: 'சனிக்கிழமை பார்க்கலாம்!', translit: 'sanikkizhamai pārkkalām!', literal: 'Saturday let-us-see!', english: 'See you Saturday!', speaker: 'ராஜா', constructions: ['pona'] }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 3, prompt: 'Line 4 means…', options: ['"What should I bring?"', '"What time should I come?"', '"Can I bring a friend?"'], answerIndex: 0, constructions: ['kondu-vara'] },
		{ kind: 'recall', prompt: 'Say it in Tamil: "Will you come for dinner on Saturday?"', canonical: 'சனிக்கிழமை சாப்பிட வரீங்களா?', accepted: ['சனிக்கிழமை சாப்பிட வரீங்களா?'], hints: ['சனிக்கிழமை…'], constructions: ['varingala'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'சனிக்கிழமை சாப்பிட வர___?', options: ['ீங்களா', 'ேன்', 'லாம்'], answer: 'ீங்களா', rule: '-றீங்களா addresses "you" politely and asks a question.', constructions: ['varingala'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '☕ You want to invite a colleague for coffee tomorrow.', use: 'varingala', exemplar: 'நாளைக்கு காபி குடிக்க வரீங்களா?', criteria: { constructions: [{ construction: 'varingala', orderedGroups: [['வரீங்களா', 'varingala']] }], contextGroups: [['நாளைக்கு', 'nalaikku'], ['காபி', 'coffee']] }, constructions: ['varingala'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🥜 A street vendor offers you sundal, but you have just eaten. Turn it down politely.', use: 'venaam', exemplar: 'சுண்டல் வேணாம், நன்றி.', criteria: { constructions: [{ construction: 'venaam', orderedGroups: [['வேணாம்', 'venaam']] }], contextGroups: [['சுண்டல்', 'sundal']] }, constructions: ['venaam'] }
	]
});

const l14 = {
	...d({
		index: 14,
		title: 'திரும்பப் பார்ப்போம் — Review: a complicated Sunday',
		situation: 'One new dialogue, all old pieces',
		level: 'A1',
		kind: 'synthesis',
		constructions: [],
		lines: [
			{ target: 'ஞாயித்துக்கிழமை என்ன பண்ணலாம்?', translit: 'ñāyitthukkizhamai enna paṇṇalām?', literal: 'Sunday what shall-do?', english: 'What shall we do on Sunday?', speaker: 'ராஜா' },
			{ target: 'மியூசியம் போகலாம். ஆனா எனக்கு தலைவலி.', translit: 'museum pōgalām. ānā enakku thalaivali.', literal: 'Museum let-us-go. But to-me head-pain.', english: "Let's go to the museum. But I have a headache.", speaker: 'மீனா' },
			{ target: 'எப்போ இருந்து?', translit: 'eppō irundhu?', literal: 'When from?', english: 'Since when?', speaker: 'ராஜா' },
			{ target: 'நேத்திக்கு இருந்து. ரெஸ்ட் வேணும்.', translit: 'nētthikku irundhu. rest vēṇum.', literal: 'Yesterday from. Rest is-wanted.', english: 'Since yesterday. I need rest.', speaker: 'மீனா' },
			{ target: 'வீட்ல காபி இருக்கா?', translit: 'vīṭla kaapi irukkā?', literal: 'House-in coffee is-there-Q?', english: 'Is there coffee at home?', speaker: 'ராஜா' },
			{ target: 'இல்ல. கடைக்கு போகலாம்.', translit: 'illa. kaḍaikku pōgalām.', literal: 'Not-there. Shop-to let-us-go.', english: "No. Let's go to the shop.", speaker: 'மீனா' },
			{ target: 'சரி: காபி, அப்புறம் மியூசியம். கண்டிப்பா!', translit: 'sari: kaapi, appuṛam museum. kaṇḍippā!', literal: 'Fine: coffee, then museum. Certainly!', english: 'Right: coffee, then museum. Definitely!', speaker: 'ராஜா' }
		],
		exercises: [
			{ kind: 'transfer', prompt: 'Perform the whole dialogue, then adapt it:', situation: '🌧️ Same Sunday, but it is raining and your stomach hurts.', use: 'vali', exemplar: 'எனக்கு வயிறு வலி, நேத்திக்கு இருந்து. வீட்லயே இருக்கலாம்.', criteria: { constructions: [{ construction: 'vali', orderedGroups: [['எனக்கு', 'enakku'], ['வலி', 'vali']] }, { construction: 'irundhu', orderedGroups: [['இருந்து', 'irundhu']] }], contextGroups: [['வயிறு', 'vayiru'], ['வீட்லயே', 'veetlaye']] }, constructions: ['irundhu'] },
			{ kind: 'transfer', prompt: 'Perform the whole dialogue, then adapt it:', situation: '🏖️ Later, at the beach: a friend hands you sundal and asks how you feel. Say you love sundal and you are feeling very happy.', use: 'pidikkum', exemplar: 'எனக்கு சுண்டல் ரொம்ப பிடிக்கும். ரொம்ப சந்தோஷமா இருக்கு.', criteria: { constructions: [{ construction: 'pidikkum', orderedGroups: [['எனக்கு', 'enakku'], ['பிடிக்கும்', 'pidikkum']] }], contextGroups: [['சுண்டல்', 'sundal'], ['சந்தோஷமா', 'sandhoshama']] }, constructions: [] }
		]
	}),
	constructions: carryConstructions(
		[l6, l8, l9, l10, l11, l12, l13],
		['ta.vali', 'ta.irundhu', 'ta.illa-neg', 'ta.pogalam', 'ta.enna-pannalam', 'ta.pona', 'ta.kandippa', 'ta.anuppanum', 'ta.pidikkum', 'ta.aa-irukku']
	)
};

export const TA_LESSONS = [l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13, l14];
