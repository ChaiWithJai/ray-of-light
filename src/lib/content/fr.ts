/**
 * French course — 14 original lessons (12 regular, synthesis at 7 and 14).
 *
 * Written for this project. Assimil is the *interaction* reference only; no
 * Assimil text is reproduced here. Situations are everyday and contemporary, and
 * each lesson introduces at least three reusable constructions that later lessons
 * recombine rather than abandon.
 *
 * Review status is `draft` throughout: no native reviewer has seen this content.
 * See docs/ISSUE-1-LIMITATIONS.md L2.
 */
import { carryConstructions, defineLesson, type LanguageProfile } from './define.js';

export const FR_PROFILE: LanguageProfile = {
	language: 'fr',
	register: 'spoken',
	speakerId: 'fr_f_01',
	idPrefix: 'fr',
	provenance: {
		source: 'original',
		license: 'owned',
		reviewStatus: 'draft'
	}
};

const d = (l: Parameters<typeof defineLesson>[1]) => defineLesson(FR_PROFILE, l);

const l1 = d({
	index: 1,
	title: 'Au café',
	situation: 'Ordering a coffee, and being polite about it',
	level: 'A1',
	constructions: [
		['bonjour-politesse', 'bonjour + monsieur/madame', 'the greeting that must precede any request'],
		['je-voudrais', 'je voudrais + noun', 'polite request — "I would like"'],
		['cest-adj', "c'est + adjective", 'simple evaluation — "it is …"']
	],
	lines: [
		{ target: 'Bonjour, monsieur.', english: 'Good morning, sir.', speaker: 'Client', constructions: ['bonjour-politesse'], notes: [{ type: 'culture', text: 'In France you greet before you ask. Skipping bonjour reads as rude, not as efficient. Bonjour is the safe default with strangers, shopkeepers, or anyone older; salut is the casual hello between friends and people your own age.', anchor: 'Bonjour' }] },
		{ target: 'Bonjour ! Vous désirez ?', english: 'Good morning! What would you like?', speaker: 'Serveur' },
		{ target: 'Je voudrais un café, s’il vous plaît.', english: 'I would like a coffee, please.', speaker: 'Client', constructions: ['je-voudrais'], chunks: ['Je voudrais', 'un café', "s'il vous plaît"], notes: [{ type: 'grammar', text: 'Conditional of vouloir. The blunt form is je veux ("I want") — fine with family, brusque with strangers.', anchor: 'voudrais' }, { type: 'grammar', text: 'The article carries the noun’s gender: un café, une eau. Learn each noun together with its un or une.', anchor: 'un café' }] },
		{ target: 'Un café. Et avec ceci ?', english: 'One coffee. Anything else?', speaker: 'Serveur' },
		{ target: 'C’est tout, merci.', english: "That's all, thank you.", speaker: 'Client' },
		{ target: 'Sur place ou à emporter ?', english: 'For here or to go?', speaker: 'Serveur', notes: [{ type: 'culture', text: '« Sur place ou à emporter ? » is the standard counter question everywhere in France. Sur place = drinking it there; à emporter = taking it away — often cheaper, since table service can carry a surcharge.', anchor: 'Sur place ou à emporter' }] },
		{ target: 'Sur place, s’il vous plaît.', english: 'For here, please.', speaker: 'Client' },
		{ target: 'Deux euros quarante.', english: 'Two euros forty.', speaker: 'Serveur' },
		{ target: 'Voilà.', english: 'Here you are.', speaker: 'Client' },
		{ target: 'Merci. Bonne journée !', english: 'Thank you. Have a good day!', speaker: 'Serveur' },
		{ target: "C'est très bon.", english: "It's very good.", speaker: 'Client', constructions: ['cest-adj'] }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 2, prompt: 'Line 3 means…', options: ['"I would like a coffee, please"', '"Do you have any coffee?"', '"The coffee is good"'], answerIndex: 0, constructions: ['je-voudrais'] },
		{ kind: 'comprehension', lineIndex: 5, prompt: 'The waiter asks: « Sur place ou à emporter ? » What does he want to know?', options: ['Whether you will drink it there or take it away', 'Whether you want sugar or milk', 'Whether you will pay by card or in cash'], answerIndex: 0 },
		{ kind: 'recall', prompt: 'Say it in French: "I would like a coffee, please."', canonical: "Je voudrais un café, s'il vous plaît.", accepted: ["Je voudrais un café, s'il vous plaît.", 'Je voudrais un café.', "Un café, s'il vous plaît."], hints: ['Je…'], constructions: ['je-voudrais'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: '___ , monsieur. Je voudrais un café.', options: ['Bonjour', 'Merci', 'Voilà'], answer: 'Bonjour', rule: 'The greeting comes first, before any request.', constructions: ['bonjour-politesse'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🥐 A bakery, 8am. You want a croissant.', use: 'je-voudrais', exemplar: "Je voudrais un croissant, s'il vous plaît.", criteria: { constructions: [{ construction: 'je-voudrais', orderedGroups: [['je voudrais']] }], contextGroups: [['croissant']] }, constructions: ['je-voudrais'] }
	]
});

const l2 = d({
	index: 2,
	title: "À l'hôtel",
	situation: 'Booking a room late in the evening',
	level: 'A1',
	constructions: [
		['je-voudrais-inf', 'je voudrais + infinitive', 'polite request to *do* something'],
		['avez-vous', 'avez-vous + noun ?', 'asking about availability'],
		['pour-duree', 'pour + duration', 'saying how long'],
		['je-mappelle', 'je m’appelle + nom', 'stating your name ("I call myself …")']
	],
	lines: [
		{ target: 'Bonsoir, madame.', english: 'Good evening, madam.', speaker: 'Client' },
		{ target: 'Bonsoir. Je peux vous aider ?', english: 'Good evening. Can I help you?', speaker: 'Réceptionniste' },
		{ target: 'Je voudrais réserver une chambre.', english: 'I would like to book a room.', speaker: 'Client', constructions: ['je-voudrais-inf'], chunks: ['Je voudrais', 'réserver', 'une chambre'], notes: [{ type: 'grammar', text: 'Same je voudrais as lesson 1, now followed by a verb instead of a noun. One construction, two shapes.', anchor: 'réserver' }] },
		{ target: 'Pour combien de nuits ?', english: 'For how many nights?', speaker: 'Réceptionniste' },
		{ target: 'Pour deux nuits.', english: 'For two nights.', speaker: 'Client', constructions: ['pour-duree'] },
		{ target: 'Avez-vous une chambre calme ?', english: 'Do you have a quiet room?', speaker: 'Client', constructions: ['avez-vous'], notes: [{ type: 'grammar', text: 'Est-ce que (literally "is it that…") turns any statement into a yes/no question without changing the word order: « Est-ce que vous avez une chambre calme ? » works just as well as the inversion. You will meet it again in « Est-ce que je peux… » (lesson 9).', anchor: 'Avez-vous' }] },
		{ target: 'Oui, au troisième étage.', english: 'Yes, on the third floor.', speaker: 'Réceptionniste' },
		{ target: 'C’est à quel nom ?', english: 'What name is it under?', speaker: 'Réceptionniste' },
		{ target: 'Je m’appelle Paul Martin.', english: 'My name is Paul Martin.', speaker: 'Client', constructions: ['je-mappelle'], chunks: ['Je m’appelle', 'Paul Martin'], notes: [{ type: 'grammar', text: 'Je m’appelle literally means "I call myself" — the verb is s’appeler, and the m’ is "myself". So you are not saying "my name is"; you are saying what you call yourself.', anchor: 'Je m’appelle' }] },
		{ target: "C'est parfait.", english: "That's perfect.", speaker: 'Client', constructions: ['cest-adj'] },
		{ target: 'Voici votre clé. Bonne nuit !', english: 'Here is your key. Good night!', speaker: 'Réceptionniste' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 5, prompt: 'Line 6 means…', options: ['"Do you have a quiet room?"', '"The room is quiet"', '"I would like to sleep"'], answerIndex: 0, constructions: ['avez-vous'] },
		{ kind: 'recall', prompt: 'Say it in French: "I would like to book a room for two nights."', canonical: 'Je voudrais réserver une chambre pour deux nuits.', accepted: ['Je voudrais réserver une chambre pour deux nuits.', 'Je voudrais réserver une chambre.'], hints: ['Je voudrais…'], constructions: ['je-voudrais-inf', 'pour-duree'] },
		{ kind: 'recall', prompt: 'Introduce yourself: say "My name is Marie."', canonical: 'Je m’appelle Marie.', accepted: ['Je m’appelle Marie.', 'Moi, je m’appelle Marie.'], hints: ['Literally: "I call-myself …"', 'It starts with « Je m’… »'], constructions: ['je-mappelle'] },
		{ kind: 'recall', prompt: 'Ask in French: "Do you have a quiet room?"', canonical: 'Avez-vous une chambre calme ?', accepted: ['Avez-vous une chambre calme ?', 'Est-ce que vous avez une chambre calme ?', 'Vous avez une chambre calme ?'], hints: ['Avez-vous… — or start with « Est-ce que »'], constructions: ['avez-vous'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'Je voudrais ___ une chambre.', options: ['réserver', 'réservation', 'réservé'], answer: 'réserver', rule: 'After je voudrais, a verb stays in the infinitive.', constructions: ['je-voudrais-inf'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🍽️ A restaurant. You want to book a table for four.', use: 'je-voudrais-inf', exemplar: 'Je voudrais réserver une table pour quatre personnes.', criteria: { constructions: [{ construction: 'je-voudrais-inf', orderedGroups: [['je voudrais'], ['réserver', 'reserver']] }], contextGroups: [['table']] }, constructions: ['je-voudrais-inf'] }
	]
});

const l3 = d({
	index: 3,
	title: 'Au marché',
	situation: 'Buying vegetables by weight',
	level: 'A1',
	constructions: [
		['quantite-de', 'quantity + de + noun', 'after any quantity, de never changes'],
		['combien', 'combien ?', 'asking how much / how many'],
		['et-avec-ceci', 'et avec ceci ?', 'the shopkeeper’s "anything else?"'],
		['ca-fait', 'ça fait + amount', 'stating a total — "that comes to …"']
	],
	lines: [
		{ target: 'Bonjour, madame.', english: 'Good morning, madam.', speaker: 'Client' },
		{ target: 'Bonjour ! Vous désirez ?', english: 'Good morning! What would you like?', speaker: 'Marchande', notes: [{ type: 'culture', text: '« Vous désirez ? » — literally "you desire?" — is the standard shopkeeper opener. Market vendors often add madame or monsieur to the greeting.', anchor: 'Vous désirez' }] },
		{ target: 'Je voudrais un kilo de tomates.', english: 'I would like a kilo of tomatoes.', speaker: 'Client', constructions: ['je-voudrais', 'quantite-de'], chunks: ['Je voudrais', 'un kilo', 'de tomates'], notes: [{ type: 'grammar', text: 'After a quantity the word is always de — un kilo de, beaucoup de, un peu de. Never du or des here.', anchor: 'de' }] },
		{ target: 'Et avec ceci ?', english: 'Anything else?', speaker: 'Marchande', constructions: ['et-avec-ceci'] },
		{ target: 'Un peu de fromage, aussi.', english: 'A little cheese, too.', speaker: 'Client', constructions: ['quantite-de'] },
		{ target: "C'est tout ?", english: 'Is that all?', speaker: 'Marchande' },
		{ target: "Oui, c'est tout. C'est combien ?", english: "Yes, that's all. How much is it?", speaker: 'Client', constructions: ['combien'], notes: [{ type: 'grammar', text: 'Spoken French loves this pattern: state the question first, then name the thing after a comma — « C’est combien, les tomates ? ». You will hear it far more often than « Combien coûtent les tomates ? ».', anchor: "C'est combien" }] },
		{ target: 'Ça fait sept euros cinquante.', english: 'That comes to seven euros fifty.', speaker: 'Marchande', constructions: ['ca-fait'], notes: [{ type: 'pronunciation', text: 'Prices are spoken euros-first with no word for "and": sept euros cinquante, never sept euros *et* cinquante. And in prices the f of neuf sounds like [v] before euros: neuf euros → "neu-veuros" (the same liaison happens with ans).', anchor: 'sept euros cinquante' }] },
		{ target: 'Voilà. Merci beaucoup !', english: 'Here you are. Thank you very much!', speaker: 'Client' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 3, prompt: 'Line 4 means…', options: ['"Anything else?"', '"How much is it?"', '"Is that all?"'], answerIndex: 0, constructions: ['et-avec-ceci'] },
		{ kind: 'comprehension', lineIndex: 7, prompt: 'The vendor says: « Ça fait sept euros cinquante. » What is the total?', options: ['7.50 euros', '7.15 euros', '6.50 euros'], answerIndex: 0, constructions: ['ca-fait'] },
		{ kind: 'recall', prompt: 'Say it in French: "I would like a kilo of tomatoes."', canonical: 'Je voudrais un kilo de tomates.', accepted: ['Je voudrais un kilo de tomates.'], hints: ['Je voudrais un kilo…'], constructions: ['quantite-de'] },
		{ kind: 'recall', prompt: 'Ask the price, spoken style: "How much are the tomatoes?"', canonical: "C'est combien, les tomates ?", accepted: ["C'est combien, les tomates ?", "C'est combien ?", 'Combien coûtent les tomates ?'], hints: ["State the question first: C'est combien…", '…then name the thing after a comma'], constructions: ['combien'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'Je voudrais un kilo ___ tomates.', options: ['de', 'du', 'des'], answer: 'de', rule: 'After quantities → always de: un kilo de, beaucoup de, un peu de.', constructions: ['quantite-de'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: '___ douze euros cinquante en tout.', options: ['Ça fait', "C'est combien", 'Je voudrais'], answer: 'Ça fait', rule: 'Totals are announced with ça fait + amount; c’est combien asks a price, it does not state one.', constructions: ['ca-fait'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🧀 A cheese shop. You want 200 grams of comté.', use: 'quantite-de', exemplar: 'Je voudrais deux cents grammes de comté.', criteria: { constructions: [{ construction: 'quantite-de', orderedGroups: [['deux cents', '200'], ['grammes de']] }], contextGroups: [['comté', 'comte']] }, constructions: ['quantite-de'] }
	]
});

const l4 = d({
	index: 4,
	title: 'Dans la rue',
	situation: 'Asking for directions and actually following them',
	level: 'A1',
	constructions: [
		['ou-est', 'où est + place ?', 'asking where something is'],
		['a-gauche-droite', 'à gauche / à droite / tout droit', 'the three directions you need'],
		['cest-loin', "c'est loin ?", 'asking about distance'],
		['je-cherche', 'je cherche + noun', 'stating what you are looking for — the indirect where-question'],
		['a-cote-de', 'à côté de / en face de + place', 'locating something next to / opposite something else'],
		['pour-aller-a', 'pour aller à + place ?', 'asking the way — "how do I get to …?"']
	],
	lines: [
		{ target: 'Pardon, madame ! Je cherche la gare.', english: 'Excuse me, madam! I’m looking for the station.', speaker: 'Touriste', constructions: ['je-cherche'], notes: [{ type: 'culture', text: 'Always open with « Pardon » or « Excusez-moi, monsieur / madame » before asking a stranger anything — launching straight into the question sounds abrupt in France.', anchor: 'Pardon' }, { type: 'grammar', text: 'No preposition after chercher: the verb already contains the "for" — je cherche la gare, never je cherche *pour* la gare.', anchor: 'Je cherche' }] },
		{ target: 'Oui ?', english: 'Yes?', speaker: 'Passante' },
		{ target: 'Où est la gare, s’il vous plaît ?', english: 'Where is the station, please?', speaker: 'Touriste', constructions: ['ou-est'], chunks: ['Où est', 'la gare', "s'il vous plaît"], notes: [{ type: 'grammar', text: '« Où est + singular noun ? » asks where something is. With a plural, the verb changes: « Où sont les toilettes ? »', anchor: 'Où est' }] },
		{ target: 'Tout droit, puis à gauche.', english: 'Straight ahead, then left.', speaker: 'Passante', constructions: ['a-gauche-droite'], notes: [{ type: 'pronunciation', text: 'Gauche rhymes with "oh" plus "sh": [goʃ]. Keep à gauche and à droite as ready-made chunks — you will hear them in every set of directions.', anchor: 'à gauche' }] },
		{ target: "C'est loin ?", english: 'Is it far?', speaker: 'Touriste', constructions: ['cest-loin'] },
		{ target: 'Non, cinq minutes à pied.', english: 'No, five minutes on foot.', speaker: 'Passante' },
		{ target: 'C’est à côté de la banque.', english: 'It’s next to the bank.', speaker: 'Passante', constructions: ['a-cote-de'], notes: [{ type: 'grammar', text: 'À côté de (next to) and en face de (opposite) locate one thing by another. The de contracts with le: en face du supermarché — but stays de la, de l’ otherwise.', anchor: 'à côté de' }] },
		{ target: 'Et le musée ?', english: 'And the museum?', speaker: 'Touriste' },
		{ target: 'À droite, après la banque.', english: 'On the right, after the bank.', speaker: 'Passante', constructions: ['a-gauche-droite'] },
		{ target: 'Merci beaucoup, madame !', english: 'Thank you very much, madam!', speaker: 'Touriste' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 4, prompt: 'Line 5 means…', options: ['"Is it far?"', '"Where is it?"', '"Is it open?"'], answerIndex: 0, constructions: ['cest-loin'] },
		{ kind: 'recall', prompt: 'Say it in French: "Where is the station, please?"', canonical: "Où est la gare, s'il vous plaît ?", accepted: ["Où est la gare, s'il vous plaît ?", 'Où est la gare ?'], hints: ['Où…'], constructions: ['ou-est'] },
		{ kind: 'recall', prompt: 'Stop a stranger and say you are looking for a pharmacy.', canonical: 'Excusez-moi, je cherche une pharmacie.', accepted: ['Excusez-moi, je cherche une pharmacie.', 'Excusez-moi, monsieur, je cherche une pharmacie.', 'Pardon, je cherche une pharmacie.', 'Je cherche une pharmacie.'], hints: ['Open with « Excusez-moi » or « Pardon »'], constructions: ['je-cherche'] },
		{ kind: 'recall', prompt: 'Politely ask a stranger the way to the train station.', canonical: "Pardon, pour aller à la gare, s'il vous plaît ?", accepted: ["Pardon, pour aller à la gare, s'il vous plaît ?", "Pour aller à la gare, s'il vous plaît ?", 'Excusez-moi, pour aller à la gare ?', 'Pardon, pour aller à la gare ?'], hints: ['« Pour aller à… ? » — literally "in order to go to…?", with the "how do I" left unsaid', 'Open with « Pardon » or « Excusez-moi »'], constructions: ['pour-aller-a'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'Tout droit, puis ___ gauche.', options: ['à', 'de', 'en'], answer: 'à', rule: 'Direction takes à: à gauche, à droite, à pied.', constructions: ['a-gauche-droite'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'Pardon, ___ est la gare ?', options: ['où', 'qui', 'quand'], answer: 'où', rule: '« Où » asks for a place: « Où est… ? » = "Where is…?" (« qui » = who, « quand » = when).', constructions: ['ou-est'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '💊 You need a pharmacy and see someone at a bus stop.', use: 'ou-est', exemplar: "Pardon, où est la pharmacie, s'il vous plaît ?", criteria: { constructions: [{ construction: 'ou-est', orderedGroups: [['où est', 'ou est']] }], contextGroups: [['pharmacie']] }, constructions: ['ou-est'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🚻 A café. You need the toilets — careful, les toilettes is plural.', use: 'ou-est', exemplar: "Où sont les toilettes, s'il vous plaît ?", criteria: { constructions: [{ construction: 'ou-est', orderedGroups: [['où sont', 'ou sont']] }], contextGroups: [['toilettes']] }, constructions: ['ou-est'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🚉 A big train station. You cannot find platform 7, and you stop a station employee.', use: 'je-cherche', exemplar: "Excusez-moi, je cherche le quai numéro sept. Vous pouvez m'aider ?", criteria: { constructions: [{ construction: 'je-cherche', orderedGroups: [['je cherche'], ['le quai', 'quai']] }], contextGroups: [['sept', '7']] }, constructions: ['je-cherche'] }
	]
});

const l5 = d({
	index: 5,
	title: 'À la gare',
	situation: 'Buying a ticket and checking the time',
	level: 'A1',
	constructions: [
		['un-billet-pour', 'un billet pour + place', 'buying a ticket somewhere'],
		['a-quelle-heure', 'à quelle heure ?', 'asking at what time'],
		['le-prochain', 'le prochain / la prochaine', 'the next one'],
		['a-heure', 'à + heure', 'stating at what time something happens'],
		['il-est-heure', 'il est + heure', 'telling the time — "it is … o’clock"'],
		['de-a-duree', 'de + time + à + time', 'a span — "from … to …"'],
		['prendre-transport', 'prendre + le/la + transport', 'taking the métro / bus / train'],
		['descendre-a', 'descendre à + stop', 'getting off at a stop']
	],
	lines: [
		{ target: 'Bonjour. Un billet pour Lyon, s’il vous plaît.', english: 'Hello. One ticket to Lyon, please.', speaker: 'Voyageur', constructions: ['un-billet-pour'], chunks: ['Un billet', 'pour Lyon', "s'il vous plaît"] },
		{ target: 'Aller simple ou aller-retour ?', english: 'One way or return?', speaker: 'Guichetier' },
		{ target: 'Aller-retour.', english: 'Return.', speaker: 'Voyageur' },
		{ target: "C'est direct ?", english: 'Is it direct?', speaker: 'Voyageur' },
		{ target: 'Oui. Vous descendez à Lyon Part-Dieu.', english: 'Yes. You get off at Lyon Part-Dieu.', speaker: 'Guichetier', constructions: ['descendre-a'] },
		{ target: 'À quelle heure part le prochain train ?', english: 'At what time does the next train leave?', speaker: 'Voyageur', constructions: ['a-quelle-heure', 'le-prochain'], notes: [{ type: 'grammar', text: 'Formal French fronts the question word — À quelle heure part le train ? In everyday speech it often stays at the end instead: Tu commences à quelle heure ? On part à quelle heure ?', anchor: 'À quelle heure' }] },
		{ target: 'À quatorze heures dix.', english: 'At ten past two.', speaker: 'Guichetier', constructions: ['a-heure'], notes: [{ type: 'culture', text: 'Timetables use the 24-hour clock. Quatorze heures is 2pm.', anchor: 'quatorze heures' }, { type: 'grammar', text: '« À + heure » states when something happens: à quatorze heures dix, à sept heures et demie (half past), à huit heures et quart (quarter past).', anchor: 'À quatorze heures' }] },
		{ target: 'Quel quai ?', english: 'Which platform?', speaker: 'Voyageur' },
		{ target: 'Quai numéro sept.', english: 'Platform number seven.', speaker: 'Guichetier', notes: [{ type: 'pronunciation', text: 'French reads two-digit numbers as one number, never digit by digit: quai numéro dix-sept, le bus quatre-vingt-onze (91 — literally "four-twenty-eleven").', anchor: 'numéro sept' }] },
		{ target: 'Quelle heure est-il ?', english: 'What time is it?', speaker: 'Voyageur', constructions: ['il-est-heure'] },
		{ target: 'Il est quatorze heures moins le quart.', english: 'It is a quarter to two.', speaker: 'Guichetier', constructions: ['il-est-heure'], notes: [{ type: 'pronunciation', text: 'Number + heures always links: deux heures "deu-zeur", sept heures "sè-teur" — and the f of neuf turns to [v]: neuf heures "neu-veur".', anchor: 'quatorze heures' }, { type: 'grammar', text: 'Quarter and half hours: et quart (quarter past), moins le quart (quarter to), et demie (half past) — but midi et demi and minuit et demi drop the -e.', anchor: 'moins le quart' }] },
		{ target: 'Merci. Bonne journée !', english: 'Thank you. Have a good day!', speaker: 'Voyageur' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 5, prompt: 'Line 6 means…', options: ['"At what time does the next train leave?"', '"Which platform is the train?"', '"Is the next train late?"'], answerIndex: 0, constructions: ['a-quelle-heure'] },
		{ kind: 'comprehension', lineIndex: 4, prompt: 'The clerk says: « Oui. Vous descendez à Lyon Part-Dieu. » What does he mean?', options: ['No change needed — you get off at Lyon Part-Dieu', 'You must change trains before Lyon', 'The train does not stop at Lyon Part-Dieu'], answerIndex: 0, constructions: ['descendre-a'] },
		{ kind: 'comprehension', lineIndex: 10, prompt: 'The clerk says: « Il est quatorze heures moins le quart. » What time is it?', options: ['13:45', '14:15', '14:45'], answerIndex: 0, constructions: ['il-est-heure'] },
		{ kind: 'recall', prompt: 'Say it in French: "One ticket to Lyon, please."', canonical: "Un billet pour Lyon, s'il vous plaît.", accepted: ["Un billet pour Lyon, s'il vous plaît.", 'Un billet pour Lyon.'], hints: ['Un billet…'], constructions: ['un-billet-pour'] },
		{ kind: 'recall', prompt: 'Ask, spoken style: "What time are we leaving?"', canonical: 'On part à quelle heure ?', accepted: ['On part à quelle heure ?', 'À quelle heure on part ?', "À quelle heure est-ce qu'on part ?", 'À quelle heure on part, alors ?'], hints: ['Spoken French can leave à quelle heure at the end', '"to leave" is partir → on part'], constructions: ['a-quelle-heure'] },
		{ kind: 'recall', prompt: 'Say it in French: "I work from ten to five." (24-hour: dix-sept heures)', canonical: 'Je travaille de dix heures à dix-sept heures.', accepted: ['Je travaille de dix heures à dix-sept heures.', 'Je travaille de dix heures à cinq heures.'], hints: ['Pattern: de … à …', 'A span, not a duration — pour deux nuits (lesson 2) says how long; de … à … says from when to when'], constructions: ['de-a-duree'] },
		{ kind: 'recall', prompt: 'Say it in French: "We’ll take the bus."', canonical: 'On prend le bus.', accepted: ['On prend le bus.', 'Nous prenons le bus.'], hints: ['Same verb as je prends le poisson (lesson 6) — prendre also takes transport', 'Spoken French prefers on to nous'], constructions: ['prendre-transport'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'À quelle ___ part le train ?', options: ['heure', 'temps', 'moment'], answer: 'heure', rule: 'Clock time is heure. Temps is weather or time-in-general.', constructions: ['a-quelle-heure'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: '___ est trois heures et demie.', options: ['Il', 'Elle', 'On'], answer: 'Il', rule: 'Telling the time always uses the impersonal il: il est + heure, whatever the hour.', constructions: ['il-est-heure'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🚌 A bus station. You want a ticket to Nice.', use: 'un-billet-pour', exemplar: "Un billet pour Nice, s'il vous plaît.", criteria: { constructions: [{ construction: 'un-billet-pour', orderedGroups: [['un billet pour']] }], contextGroups: [['nice']] }, constructions: ['un-billet-pour'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '📞 A friend asks when the film starts tonight.', use: 'a-heure', exemplar: 'À vingt heures trente.', criteria: { constructions: [{ construction: 'a-heure', orderedGroups: [['à vingt heures', 'a vingt heures', 'à 20 heures', 'à 20h']] }], contextGroups: [['trente', '30']] }, constructions: ['a-heure'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🥖 A tourist asks about the bakery near your flat. It is open from seven in the morning to eight in the evening.', use: 'de-a-duree', exemplar: 'La boulangerie est ouverte de sept heures à vingt heures.', criteria: { constructions: [{ construction: 'de-a-duree', orderedGroups: [['de sept heures', 'de 7 heures'], ['à vingt heures', 'a vingt heures', 'à 20 heures']] }], contextGroups: [['boulangerie'], ['ouverte', 'ouvert']] }, constructions: ['de-a-duree'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🗺️ A friend wants to reach the Louvre from your apartment: métro line 1, get off at Palais-Royal.', use: 'prendre-transport', exemplar: 'Tu prends le métro, ligne un, et tu descends à Palais-Royal.', criteria: { constructions: [{ construction: 'prendre-transport', orderedGroups: [['prends', 'prend'], ['le métro', 'le metro']] }, { construction: 'descendre-a', orderedGroups: [['descends', 'descend'], ['à palais-royal', 'a palais-royal', 'à palais royal']] }], contextGroups: [['ligne']] }, constructions: ['prendre-transport', 'descendre-a'] }
	]
});

const l6 = d({
	index: 6,
	title: 'Au restaurant',
	situation: 'Reading a menu and ordering without panic',
	level: 'A1',
	constructions: [
		['quest-ce-que', "qu'est-ce que… ?", 'asking what'],
		['je-prends', 'je prends + noun', 'choosing, in the moment'],
		['laddition', "l'addition, s'il vous plaît", 'asking for the bill'],
		['jaime-noun', 'j’aime + le/la/les + noun', 'liking a thing — definite article for general likes'],
		['je-naime-pas', 'je n’aime pas + noun', 'disliking — ne…pas wrapped around aimer'],
		['adorer-detester', 'j’adore / je déteste', 'the strong ends of the liking scale']
	],
	lines: [
		{ target: 'Bonsoir ! Vous avez choisi ?', english: 'Good evening! Have you chosen?', speaker: 'Serveur' },
		{ target: "Qu'est-ce que vous recommandez ?", english: 'What do you recommend?', speaker: 'Cliente', constructions: ['quest-ce-que'], chunks: ["Qu'est-ce que", 'vous recommandez'] },
		{ target: 'Le poisson est très bon ce soir.', english: 'The fish is very good this evening.', speaker: 'Serveur', constructions: ['cest-adj'] },
		{ target: "J'aime beaucoup le poisson. Mais je n'aime pas la viande.", english: 'I really like fish. But I don’t like meat.', speaker: 'Cliente', constructions: ['jaime-noun', 'je-naime-pas'], notes: [{ type: 'grammar', text: 'After aimer, French uses the definite article for general likes: j’aime le poisson, la musique, les chansons — where English drops it ("I like fish").', anchor: 'le poisson' }, { type: 'grammar', text: 'Negation wraps the verb: ne … pas, with ne eliding to n’ before a vowel — je n’aime pas. (After a negation, du/de la/des flatten to de — the fridge dialogue in lesson 10 shows it.)', anchor: "n'aime pas" }] },
		{ target: "Moi, j'adore notre poisson du jour !", english: 'Me, I love our fish of the day!', speaker: 'Serveur', constructions: ['adorer-detester'], notes: [{ type: 'pronunciation', text: 'Elision: je loses its vowel before a vowel sound — j’adore, never je adore. Same pattern as j’aime.', anchor: "j'adore" }] },
		{ target: 'Alors je prends le poisson.', english: "Then I'll have the fish.", speaker: 'Cliente', constructions: ['je-prends'], notes: [{ type: 'grammar', text: 'Je prends is the present tense doing the work of a decision made right now. French rarely needs a future here. In shops you will also hear the softer je vais prendre — "I’ll take".', anchor: 'prends' }] },
		{ target: 'Et comme boisson ?', english: 'And to drink?', speaker: 'Serveur' },
		{ target: 'Une carafe d’eau, s’il vous plaît.', english: 'A jug of water, please.', speaker: 'Cliente', notes: [{ type: 'culture', text: 'Tap water in a carafe is free and normal to ask for. You do not have to buy bottled water.', anchor: "carafe d'eau" }] },
		{ target: 'Très bien.', english: 'Very good.', speaker: 'Serveur' },
		{ target: "L'addition, s'il vous plaît.", english: 'The bill, please.', speaker: 'Cliente', constructions: ['laddition'] },
		{ target: 'Tout de suite.', english: 'Right away.', speaker: 'Serveur' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 1, prompt: 'Line 2 means…', options: ['"What do you recommend?"', '"What time do you close?"', '"Do you have a table?"'], answerIndex: 0, constructions: ['quest-ce-que'] },
		{ kind: 'comprehension', lineIndex: 4, prompt: 'The waiter says: « Moi, j’adore notre poisson du jour ! » What does he mean?', options: ['He loves today’s fish', 'He hates today’s fish', 'He recommends the meat instead'], answerIndex: 0, constructions: ['adorer-detester'] },
		{ kind: 'recall', prompt: 'Say it in French: "The bill, please."', canonical: "L'addition, s'il vous plaît.", accepted: ["L'addition, s'il vous plaît.", "L'addition."], hints: ["L'…"], constructions: ['laddition'] },
		{ kind: 'recall', prompt: 'Say that you don’t like coffee.', canonical: "Je n'aime pas le café.", accepted: ["Je n'aime pas le café.", "Moi, je n'aime pas le café."], hints: ['Wrap the verb with « ne … pas »', 'Keep the article: le café'], constructions: ['je-naime-pas'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'Alors je ___ le poisson.', options: ['prends', 'prendre', 'pris'], answer: 'prends', rule: 'Je prends — present tense, first person. The decision is happening now.', constructions: ['je-prends'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: "J'aime ___ musique.", options: ['la', 'une', 'du'], answer: 'la', rule: 'After aimer, general likes take the definite article: j’aime la musique — even though English says "I like music" with no article.', constructions: ['jaime-noun'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '☕ A café. You want to ask what kind of tea they have.', use: 'quest-ce-que', exemplar: "Qu'est-ce que vous avez comme thé ?", criteria: { constructions: [{ construction: 'quest-ce-que', orderedGroups: [["qu'est-ce que"]] }], contextGroups: [['thé', 'the']] }, constructions: ['quest-ce-que'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🎬 A new colleague asks you over lunch what kind of films you like.', use: 'jaime-noun', exemplar: "J'aime beaucoup les comédies, mais je déteste les films d'horreur.", criteria: { constructions: [{ construction: 'jaime-noun', orderedGroups: [["j'aime", 'j aime'], ['les comédies', 'les comedies']] }, { construction: 'adorer-detester', orderedGroups: [['je déteste', 'je deteste', "j'adore", 'j adore']] }], contextGroups: [["d'horreur", 'horreur']] }, constructions: ['jaime-noun', 'adorer-detester'] }
	]
});

const l7 = {
	...d({
		index: 7,
		title: 'Révision : une journée en ville',
		situation: 'One new dialogue, all old pieces',
		level: 'A1',
		kind: 'synthesis',
		constructions: [],
		lines: [
			{ target: 'Bonjour ! Je voudrais un billet pour Lyon.', english: 'Good morning! I would like a ticket to Lyon.', speaker: 'Voyageur', constructions: [] },
			{ target: 'À quelle heure part le prochain train ?', english: 'At what time does the next train leave?', speaker: 'Voyageur' },
			{ target: 'Où est le café, dans la gare ?', english: 'Where is the café, in the station?', speaker: 'Voyageur' },
			{ target: 'Tout droit, puis à droite.', english: 'Straight ahead, then right.', speaker: 'Employé' },
			{ target: 'Je voudrais un café et un peu de pain.', english: 'I would like a coffee and a little bread.', speaker: 'Voyageur' },
			{ target: "Et avec ceci ? — C'est tout, merci.", english: "Anything else? — That's all, thanks.", speaker: 'Serveur' }
		],
		exercises: [
			{ kind: 'transfer', prompt: 'Perform the whole dialogue, then adapt it:', situation: '🚉 The same station, but you are going to Marseille and you want tea.', use: 'un-billet-pour', exemplar: "Un billet pour Marseille, s'il vous plaît. Je voudrais un thé.", criteria: { constructions: [{ construction: 'un-billet-pour', orderedGroups: [['un billet pour']] }, { construction: 'je-voudrais', orderedGroups: [['je voudrais']] }], contextGroups: [['marseille'], ['thé', 'the']] }, constructions: ['je-voudrais'] }
		]
	}),
	constructions: carryConstructions(
		[l1, l2, l3, l4, l5, l6],
		['fr.je-voudrais', 'fr.quantite-de', 'fr.ou-est', 'fr.un-billet-pour', 'fr.a-quelle-heure', 'fr.et-avec-ceci']
	)
};

const l8 = d({
	index: 8,
	title: 'Chez le médecin',
	situation: 'Explaining what hurts',
	level: 'A1',
	constructions: [
		['jai-mal-a', 'j’ai mal à + body part', 'saying what hurts'],
		['depuis', 'depuis + duration', 'how long it has been going on'],
		['il-faut', 'il faut + infinitive', 'impersonal necessity — "one must"'],
		['je-me-sens', 'je me sens + adjective', 'saying how you feel'],
		['je-suis-adj-etat', 'être + state adjective', 'states — je suis malade / stressé; the adjective agrees with the speaker'],
		['avoir-lair', 'avoir l’air + adjective', 'saying how someone looks or seems'],
		['ca-va-mieux', 'ça va mieux', 'saying things are improving — "it’s (already) better"']
	],
	lines: [
		{ target: 'Bonjour, docteur.', english: 'Hello, doctor.', speaker: 'Patiente' },
		{ target: 'Bonjour. Qu’est-ce qui ne va pas ?', english: "Hello. What's wrong?", speaker: 'Médecin', notes: [{ type: 'pronunciation', text: 'You will also hear « Qu’est-ce qu’il y a ? » — same job, and in fast speech it compresses to something like "kess-kya". Listen for the rhythm rather than each written word.', anchor: 'Qu’est-ce qui ne va pas' }] },
		{ target: "J'ai mal à la tête.", english: 'I have a headache.', speaker: 'Patiente', constructions: ['jai-mal-a'], chunks: ["J'ai mal", 'à la tête'], notes: [{ type: 'grammar', text: 'Literally "I have pain at the head". The body part takes à + article: à la tête, au dos, aux dents.', anchor: 'mal à la' }] },
		{ target: 'Depuis quand ?', english: 'Since when?', speaker: 'Médecin' },
		{ target: 'Depuis trois jours.', english: 'For three days.', speaker: 'Patiente', constructions: ['depuis'] },
		{ target: 'Vous dormez bien ?', english: 'Are you sleeping well?', speaker: 'Médecin' },
		{ target: 'Non, pas très bien.', english: 'No, not very well.', speaker: 'Patiente' },
		{ target: 'Oh là là. Vous avez l’air très fatiguée.', english: 'Oh dear. You look very tired.', speaker: 'Médecin', constructions: ['avoir-lair'], notes: [{ type: 'culture', text: '« Oh là là » expresses sympathy or dismay — closer to "oh dear" than to the excitement English speakers often assume.', anchor: 'Oh là là' }, { type: 'grammar', text: 'Avoir l’air + adjective means "to look / seem …". The adjective agrees with the person described: vous avez l’air fatiguée for a woman, fatigué for a man.', anchor: "l'air très fatiguée" }] },
		{ target: 'Oui, je me sens fatiguée. Mais je ne suis pas malade.', english: 'Yes, I feel tired. But I am not sick.', speaker: 'Patiente', constructions: ['je-me-sens', 'je-suis-adj-etat'], notes: [{ type: 'pronunciation', text: 'In everyday speech the ne often disappears: you will hear « je suis pas malade ». Recognize it — but write the full ne … pas.', anchor: 'je ne suis pas' }] },
		{ target: 'Il faut boire beaucoup d’eau et dormir.', english: 'You must drink a lot of water and sleep.', speaker: 'Médecin', constructions: ['il-faut', 'quantite-de'], notes: [{ type: 'culture', text: 'Beyond the doctor’s advice, une tisane (herbal tea) is the classic French home remedy for stress or poor sleep — offering one is a small gesture of care.', anchor: 'boire' }] },
		{ target: "D'accord. Merci, docteur.", english: 'All right. Thank you, doctor.', speaker: 'Patiente' },
		{ target: 'Je vous en prie. Et revenez si ça ne va pas mieux !', english: "You're welcome. And come back if it's not better!", speaker: 'Médecin', constructions: ['ca-va-mieux'] }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 2, prompt: 'Line 3 means…', options: ['"I have a headache"', '"I have a sore throat"', '"My head is fine"'], answerIndex: 0, constructions: ['jai-mal-a'] },
		{ kind: 'recall', prompt: 'Say it in French: "I have a headache, for three days."', canonical: "J'ai mal à la tête depuis trois jours.", accepted: ["J'ai mal à la tête depuis trois jours.", "J'ai mal à la tête."], hints: ["J'ai mal…"], constructions: ['jai-mal-a', 'depuis'] },
		{ kind: 'recall', prompt: 'Say it in French: "I feel really tired today."', canonical: 'Je me sens vraiment fatigué aujourd’hui.', accepted: ['Je me sens vraiment fatigué aujourd’hui.', 'Je me sens vraiment fatiguée aujourd’hui.', 'Je me sens très fatigué aujourd’hui.', 'Je me sens très fatiguée aujourd’hui.'], hints: ['Start with « Je me sens … »', '"really" is vraiment (or très = very); the adjective agrees with you: fatigué / fatiguée'], constructions: ['je-me-sens'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: "J'ai mal ___ la tête.", options: ['à', 'de', 'en'], answer: 'à', rule: 'avoir mal à + body part. The pain is located "at" the part.', constructions: ['jai-mal-a'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: "J'ai mal ___ ventre.", options: ['au', 'à la', 'aux'], answer: 'au', rule: 'À contracts with the article: à + le → au (au ventre), à la tête stays, à + les → aux (aux jambes).', constructions: ['jai-mal-a'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece — you have to get a ticket from the machine:', template: '___ prendre un ticket à la machine.', options: ['Il faut', "C'est combien", 'Où est'], answer: 'Il faut', rule: 'Il faut + infinitive expresses what one has to do; the verb after it stays in the infinitive.', constructions: ['il-faut'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🦷 A dentist. Your tooth has hurt since yesterday.', use: 'jai-mal-a', exemplar: "J'ai mal aux dents depuis hier.", criteria: { constructions: [{ construction: 'jai-mal-a', orderedGroups: [["j'ai mal"], ['aux dents', 'à la dent']] }, { construction: 'depuis', orderedGroups: [['depuis']] }], contextGroups: [['hier']] }, constructions: ['jai-mal-a', 'depuis'] }
	]
});

const l9 = d({
	index: 9,
	title: 'Au téléphone',
	situation: 'A call that does not go smoothly',
	level: 'A1',
	constructions: [
		['est-ce-que-je-peux', 'est-ce que je peux + infinitive ?', 'asking permission'],
		['ne-quittez-pas', 'ne quittez pas', 'hold the line'],
		['rappeler', 'rappeler plus tard', 'calling back'],
		['vous-pouvez', 'vous pouvez + infinitive ?', 'asking someone to act — the converse of est-ce que je peux']
	],
	lines: [
		{ target: 'Allô, bonjour. Cabinet Martin.', english: 'Hello, good morning. Martin practice.', speaker: 'Secrétaire' },
		{ target: 'Bonjour. Est-ce que je peux parler à madame Martin ?', english: 'Hello. May I speak to Mrs Martin?', speaker: 'Client', constructions: ['est-ce-que-je-peux'], chunks: ['Est-ce que je peux', 'parler', 'à madame Martin'] },
		{ target: 'Ne quittez pas, s’il vous plaît.', english: 'Hold the line, please.', speaker: 'Secrétaire', constructions: ['ne-quittez-pas'] },
		{ target: 'Elle est en réunion.', english: 'She is in a meeting.', speaker: 'Secrétaire' },
		{ target: 'Je peux rappeler plus tard ?', english: 'Can I call back later?', speaker: 'Client', constructions: ['rappeler', 'est-ce-que-je-peux'] },
		{ target: 'Oui, après quinze heures.', english: 'Yes, after three o’clock.', speaker: 'Secrétaire' },
		{ target: 'Très bien. Merci beaucoup.', english: 'Very good. Thank you very much.', speaker: 'Client' },
		{ target: 'Je vous en prie. Au revoir.', english: "You're welcome. Goodbye.", speaker: 'Secrétaire', notes: [{ type: 'culture', text: 'Je vous en prie is the standard reply to merci — warmer than de rien in a professional setting.', anchor: 'Je vous en prie' }] }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 2, prompt: 'Line 3 means…', options: ['"Hold the line, please"', '"Please call back"', '"She has left"'], answerIndex: 0, constructions: ['ne-quittez-pas'] },
		{ kind: 'recall', prompt: 'Say it in French: "May I speak to Mrs Martin?"', canonical: 'Est-ce que je peux parler à madame Martin ?', accepted: ['Est-ce que je peux parler à madame Martin ?', 'Je peux parler à madame Martin ?'], hints: ['Est-ce que…'], constructions: ['est-ce-que-je-peux'] },
		{ kind: 'recall', prompt: 'Politely get a stranger’s attention and ask if they can help you.', canonical: "Excusez-moi, vous pouvez m'aider ?", accepted: ["Excusez-moi, vous pouvez m'aider ?", "Excusez-moi, pouvez-vous m'aider ?", "Pardon, vous pouvez m'aider ?", "Vous pouvez m'aider, s'il vous plaît ?"], hints: ['A statement with rising intonation is the everyday question: vous pouvez m’aider ? The inverted pouvez-vous is correct but more formal.', 'm’aider — the m’ comes before the verb'], constructions: ['vous-pouvez'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'Est-ce que je peux ___ plus tard ?', options: ['rappeler', 'rappelle', 'rappelé'], answer: 'rappeler', rule: 'After pouvoir, the second verb stays in the infinitive.', constructions: ['rappeler'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🏨 A hotel desk. You want to ask whether you can leave your bag.', use: 'est-ce-que-je-peux', exemplar: 'Est-ce que je peux laisser mon sac ici ?', criteria: { constructions: [{ construction: 'est-ce-que-je-peux', orderedGroups: [['est-ce que je peux']] }], contextGroups: [['laisser'], ['sac']] }, constructions: ['est-ce-que-je-peux'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '📦 You are moving flat on Sunday and there are a lot of boxes. Ask a friend for help carrying them — with friends, tu peux replaces vous pouvez.', use: 'vous-pouvez', exemplar: "Tu peux m'aider à porter les cartons dimanche ?", criteria: { constructions: [{ construction: 'vous-pouvez', orderedGroups: [['tu peux', 'vous pouvez'], ["m'aider", 'm aider']] }], contextGroups: [['cartons'], ['dimanche']] }, constructions: ['vous-pouvez'] }
	]
});

const l10 = d({
	index: 10,
	title: 'Les courses',
	situation: 'A fridge with nothing useful in it',
	level: 'A1',
	constructions: [
		['il-y-a', 'il y a / il n’y a pas de', 'there is / there is not'],
		['trop-assez', 'trop de / assez de', 'too much / enough'],
		['on-doit', 'on doit + infinitive', 'informal "we have to"']
	],
	lines: [
		{ target: "Qu'est-ce qu'il y a dans le frigo ?", english: "What's in the fridge?", speaker: 'Paul', constructions: ['il-y-a', 'quest-ce-que'] },
		{ target: "Il n'y a pas de lait.", english: 'There is no milk.', speaker: 'Claire', constructions: ['il-y-a'], notes: [{ type: 'grammar', text: 'In the negative, du/de la/des all collapse to de: il y a du lait → il n’y a pas de lait.', anchor: "pas de" }] },
		{ target: 'Et du pain ?', english: 'And bread?', speaker: 'Paul' },
		{ target: 'Il y a du pain, mais pas assez.', english: 'There is bread, but not enough.', speaker: 'Claire', constructions: ['il-y-a', 'trop-assez'] },
		{ target: 'On doit aller au marché, alors.', english: 'We have to go to the market, then.', speaker: 'Paul', constructions: ['on-doit'] },
		{ target: "D'accord. Il y a trop de travail ici.", english: "All right. There's too much work here.", speaker: 'Claire', constructions: ['trop-assez'] },
		{ target: 'On prend un café d’abord ?', english: 'Shall we have a coffee first?', speaker: 'Paul', constructions: ['je-prends'] },
		{ target: 'Toujours !', english: 'Always!', speaker: 'Claire' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 1, prompt: 'Line 2 means…', options: ['"There is no milk"', '"There is some milk"', '"I do not like milk"'], answerIndex: 0, constructions: ['il-y-a'] },
		{ kind: 'recall', prompt: 'Say it in French: "There is no milk."', canonical: "Il n'y a pas de lait.", accepted: ["Il n'y a pas de lait."], hints: ['Il n’y a…'], constructions: ['il-y-a'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: "Il n'y a pas ___ lait.", options: ['de', 'du', 'des'], answer: 'de', rule: 'Negation flattens du/de la/des to de.', constructions: ['il-y-a'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: "___ une banque près d'ici ?", options: ['Il y a', 'Où est', "C'est combien"], answer: 'Il y a', rule: 'Asking whether something exists nearby uses il y a + noun with rising intonation; où est asks for the location of a specific known thing.', constructions: ['il-y-a'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🧂 A kitchen. You notice there is no salt.', use: 'il-y-a', exemplar: "Il n'y a pas de sel.", criteria: { constructions: [{ construction: 'il-y-a', orderedGroups: [["il n'y a pas de"]] }], contextGroups: [['sel']] }, constructions: ['il-y-a'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🏧 Your phone is dead and you need cash. Ask a passer-by if there is an ATM (un distributeur) near here.', use: 'il-y-a', exemplar: "Il y a un distributeur près d'ici ?", criteria: { constructions: [{ construction: 'il-y-a', orderedGroups: [['il y a un', 'il y a']] }], contextGroups: [['distributeur'], ["près d'ici", 'pres d ici']] }, constructions: ['il-y-a'] }
	]
});

const l11 = d({
	index: 11,
	title: 'Le week-end',
	situation: 'Making plans that may not survive contact with Saturday',
	level: 'A1',
	constructions: [
		['aller-inf', 'aller + infinitive', 'the near future — "going to …"'],
		['on-va', 'on va + infinitive', 'informal "we’re going to"'],
		['quest-ce-quon-fait', "qu'est-ce qu'on fait ?", 'what shall we do?'],
		['aimer-inf', 'j’aime + infinitive', 'liking an activity — verb straight to the infinitive'],
		['on-pourrait', 'on pourrait + infinitive', 'soft suggestion — "we could …"'],
		['on-se-retrouve', 'on se retrouve + place/time', 'arranging a meeting point'],
		['tous-les', 'tous les + plural day', 'a weekly habit — "every …"']
	],
	lines: [
		{ target: "Qu'est-ce qu'on fait ce week-end ?", english: 'What are we doing this weekend?', speaker: 'Léa', constructions: ['quest-ce-quon-fait'] },
		{ target: 'On va visiter le musée ?', english: 'Shall we visit the museum?', speaker: 'Marc', constructions: ['on-va', 'aller-inf'], chunks: ['On va', 'visiter', 'le musée'], notes: [{ type: 'grammar', text: 'To soften a suggestion, swap on va for on pourrait + infinitive ("we could…") — less direct than on va, more tentative than a question.', anchor: 'On va' }] },
		{ target: 'Je vais travailler samedi matin.', english: "I'm going to work on Saturday morning.", speaker: 'Léa', constructions: ['aller-inf'], notes: [{ type: 'grammar', text: 'aller + infinitive is the everyday future. Je vais travailler is far more common in speech than je travaillerai.', anchor: 'vais travailler' }] },
		{ target: 'Alors dimanche ?', english: 'Sunday then?', speaker: 'Marc' },
		{ target: 'Dimanche, oui. À quelle heure ?', english: 'Sunday, yes. At what time?', speaker: 'Léa', constructions: ['a-quelle-heure'] },
		{ target: 'À dix heures, devant la gare.', english: 'At ten, in front of the station.', speaker: 'Marc', constructions: ['on-se-retrouve', 'a-heure'], notes: [{ type: 'grammar', text: 'This is the answer to "where do we meet?": on se retrouve + place/time — On se retrouve à dix heures, devant la gare. On always takes the third-person singular verb, even though it means "we".', anchor: 'devant la gare' }] },
		{ target: "C'est parfait.", english: "That's perfect.", speaker: 'Léa', constructions: ['cest-adj'] },
		{ target: "S'il ne pleut pas.", english: "If it doesn't rain.", speaker: 'Marc' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 2, prompt: 'Line 3 means…', options: ['"I’m going to work on Saturday morning"', '"I worked on Saturday morning"', '"I want to work on Saturday"'], answerIndex: 0, constructions: ['aller-inf'] },
		{ kind: 'recall', prompt: 'Say it in French: "Shall we visit the museum?"', canonical: 'On va visiter le musée ?', accepted: ['On va visiter le musée ?', 'On va visiter le musée.'], hints: ['On va…'], constructions: ['on-va'] },
		{ kind: 'recall', prompt: 'Say that you like dancing.', canonical: "J'aime danser.", accepted: ["J'aime danser.", "Moi, j'aime danser."], hints: ['aimer + infinitive, no word in between — no "to", no "-ing"'], constructions: ['aimer-inf'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'Je ___ travailler samedi.', options: ['vais', 'va', 'allez'], answer: 'vais', rule: 'aller conjugates, the second verb does not: je vais, tu vas, on va + infinitive.', constructions: ['aller-inf'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'Demain, on ___ visiter le musée.', options: ['va', 'vas', 'vont'], answer: 'va', rule: 'With on, aller takes the third-person singular form va: on va + infinitive for a near-future plan.', constructions: ['on-va'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'On se ___ devant la gare à six heures ?', options: ['retrouve', 'retrouves', 'retrouver'], answer: 'retrouve', rule: 'On always takes the third-person singular verb form, even though it means "we": on se retrouve.', constructions: ['on-se-retrouve'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: '___ les samedis, je fais le marché.', options: ['Tous', 'Tout', 'Toutes'], answer: 'Tous', rule: 'Before a masculine plural like les samedis, "every" is tous: tous les samedis — note the plural -s on the day.', constructions: ['tous-les'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🍿 A friend asks about tonight. You are going to watch a film.', use: 'aller-inf', exemplar: 'Je vais regarder un film ce soir.', criteria: { constructions: [{ construction: 'aller-inf', orderedGroups: [['je vais'], ['regarder', 'voir']] }], contextGroups: [['film']] }, constructions: ['aller-inf'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🌳 A sunny Sunday and your friend is bored. Softly suggest that the two of you could take a walk in the park.', use: 'on-pourrait', exemplar: 'On pourrait faire une promenade dans le parc.', criteria: { constructions: [{ construction: 'on-pourrait', orderedGroups: [['on pourrait'], ['faire une promenade', 'se promener']] }], contextGroups: [['parc']] }, constructions: ['on-pourrait'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🎫 You and a colleague are going to a concert tonight. Propose meeting in front of the metro station at eight.', use: 'on-se-retrouve', exemplar: 'On se retrouve devant la station de métro à huit heures ?', criteria: { constructions: [{ construction: 'on-se-retrouve', orderedGroups: [['on se retrouve']] }], contextGroups: [['devant'], ['métro', 'metro'], ['huit heures', '8 heures']] }, constructions: ['on-se-retrouve'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🏊 A new friend asks what you do to relax. Every Sunday you go to the swimming pool.', use: 'tous-les', exemplar: 'Tous les dimanches, je vais à la piscine.', criteria: { constructions: [{ construction: 'tous-les', orderedGroups: [['tous les dimanches']] }], contextGroups: [['piscine']] }, constructions: ['tous-les'] }
	]
});

const l12 = d({
	index: 12,
	title: 'À la poste',
	situation: 'Sending a parcel that is slightly too heavy',
	level: 'A1',
	constructions: [
		['envoyer-a', 'envoyer + noun + à + place', 'sending something somewhere'],
		['combien-ca-coute', 'combien ça coûte ?', 'asking the price'],
		['le-moins-cher', 'le moins cher', 'the cheapest option'],
		['payer-par-carte', 'payer par carte', 'paying by card — « Je peux payer par carte ? »']
	],
	lines: [
		{ target: 'Bonjour. Je voudrais envoyer ce colis au Canada.', english: 'Hello. I would like to send this parcel to Canada.', speaker: 'Cliente', constructions: ['je-voudrais-inf', 'envoyer-a'], chunks: ['Je voudrais envoyer', 'ce colis', 'au Canada'] },
		{ target: 'Il fait deux kilos. Par avion ?', english: "It's two kilos. By air?", speaker: 'Employé' },
		{ target: 'Combien ça coûte, par avion ?', english: 'How much does it cost, by air?', speaker: 'Cliente', constructions: ['combien-ca-coute', 'combien'] },
		{ target: 'Vingt-huit euros.', english: 'Twenty-eight euros.', speaker: 'Employé' },
		{ target: "Et le moins cher ?", english: 'And the cheapest?', speaker: 'Cliente', constructions: ['le-moins-cher'] },
		{ target: 'Par bateau, douze euros. Mais six semaines.', english: 'By sea, twelve euros. But six weeks.', speaker: 'Employé' },
		{ target: 'Six semaines ! Par avion, alors.', english: 'Six weeks! By air, then.', speaker: 'Cliente' },
		{ target: 'Je peux payer par carte ?', english: 'Can I pay by card?', speaker: 'Cliente', constructions: ['payer-par-carte', 'est-ce-que-je-peux'] },
		{ target: 'Bien sûr. Vous pouvez taper votre code.', english: 'Of course. You can enter your PIN.', speaker: 'Employé', constructions: ['payer-par-carte'] },
		{ target: 'Très bien. Signez ici, s’il vous plaît.', english: 'Very good. Sign here, please.', speaker: 'Employé' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 2, prompt: 'Line 3 means…', options: ['"How much does it cost by air?"', '"How long does it take by air?"', '"Is it going by air?"'], answerIndex: 0, constructions: ['combien-ca-coute'] },
		{ kind: 'recall', prompt: 'Say it in French: "I would like to send this parcel to Canada."', canonical: 'Je voudrais envoyer ce colis au Canada.', accepted: ['Je voudrais envoyer ce colis au Canada.'], hints: ['Je voudrais envoyer…'], constructions: ['envoyer-a'] },
		{ kind: 'recall', prompt: 'Ask if you can pay by card.', canonical: 'Je peux payer par carte ?', accepted: ['Je peux payer par carte ?', 'Est-ce que je peux payer par carte ?', 'On peut payer par carte ?'], hints: ['Start with « Je peux… »', '"By card" is par carte'], constructions: ['payer-par-carte'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'Je voudrais envoyer ce colis ___ Canada.', options: ['au', 'à', 'en'], answer: 'au', rule: 'Masculine countries take au: au Canada, au Portugal. Feminine take en: en France.', constructions: ['envoyer-a'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '💌 You want to send a letter to France.', use: 'envoyer-a', exemplar: 'Je voudrais envoyer cette lettre en France.', criteria: { constructions: [{ construction: 'envoyer-a', orderedGroups: [['envoyer'], ['en france']] }], contextGroups: [['lettre']] }, constructions: ['envoyer-a'] }
	]
});

const l13 = d({
	index: 13,
	title: 'Une invitation',
	situation: 'Being invited to dinner and not arriving empty-handed',
	level: 'A1',
	constructions: [
		['vouloir-venir', 'tu veux venir ?', 'informal invitation'],
		['je-peux-apporter', "qu'est-ce que je peux apporter ?", 'offering to bring something'],
		['avec-plaisir', 'avec plaisir', 'accepting warmly'],
		['ca-va', 'ça va ? / ça va bien', 'asking and answering "how’s it going?" — informal; bounce it back with et toi ?'],
		['tu-es-libre', 'tu es libre + time ?', 'checking availability before inviting'],
		['ca-te-dit', 'ça te dit de + infinitive ?', 'informal invitation — "do you feel like …?"'],
		['moi-aussi-non-plus', 'moi aussi / moi non plus', 'me too / me neither — agreeing with a stated taste']
	],
	lines: [
		{ target: 'Salut Paul ! Ça va ?', english: 'Hi Paul! How’s it going?', speaker: 'Claire', constructions: ['ca-va'], notes: [{ type: 'grammar', text: 'The same two words ask and answer: ça va ? — ça va (bien). Salut and ça va are tu-register: use them with friends, not with the waiter from lesson 1.', anchor: 'Ça va' }] },
		{ target: 'Ça va bien, merci. Et toi ?', english: 'Fine, thanks. And you?', speaker: 'Paul', constructions: ['ca-va'] },
		{ target: 'Tu veux venir dîner samedi ?', english: 'Do you want to come for dinner on Saturday?', speaker: 'Claire', constructions: ['vouloir-venir'], chunks: ['Tu veux venir', 'dîner', 'samedi'], notes: [{ type: 'culture', text: 'Dîner is the evening meal (typically 19h30–20h30); the midday meal is le déjeuner. In parts of Belgium, Switzerland and Québec the names shift by one meal.', anchor: 'dîner' }] },
		{ target: 'Avec plaisir ! À quelle heure ?', english: 'With pleasure! At what time?', speaker: 'Paul', constructions: ['avec-plaisir', 'a-quelle-heure'] },
		{ target: 'Vers vingt heures.', english: 'Around eight.', speaker: 'Claire' },
		{ target: "Vingt heures, parfait. Je n'aime pas arriver en retard !", english: 'Eight o’clock, perfect. I don’t like arriving late!', speaker: 'Paul', constructions: ['je-naime-pas'] },
		{ target: 'Moi non plus !', english: 'Me neither!', speaker: 'Claire', constructions: ['moi-aussi-non-plus'], notes: [{ type: 'grammar', text: 'The rejoinders: moi aussi (me too, after a positive), moi non plus (me neither, after a negative), moi non / moi si to disagree.', anchor: 'Moi non plus' }] },
		{ target: "Qu'est-ce que je peux apporter ?", english: 'What can I bring?', speaker: 'Paul', constructions: ['je-peux-apporter', 'est-ce-que-je-peux'] },
		{ target: 'Rien du tout !', english: 'Nothing at all!', speaker: 'Claire' },
		{ target: 'Une bouteille, alors.', english: 'A bottle, then.', speaker: 'Paul', notes: [{ type: 'culture', text: '"Rien du tout" is politeness, not instruction. Wine, flowers or dessert are all expected.', anchor: 'Rien du tout' }] },
		{ target: "Si tu veux. C'est gentil.", english: "If you like. That's kind.", speaker: 'Claire' },
		{ target: 'À samedi !', english: 'See you Saturday!', speaker: 'Paul' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 7, prompt: 'Line 8 means…', options: ['"What can I bring?"', '"What time should I come?"', '"Can I bring a friend?"'], answerIndex: 0, constructions: ['je-peux-apporter'] },
		{ kind: 'comprehension', lineIndex: 6, prompt: 'Paul says he doesn’t like arriving late, and Claire answers « Moi non plus ! » What is she saying?', options: ['She doesn’t like arriving late either', 'She loves arriving late', 'She wants Paul to arrive early'], answerIndex: 0, constructions: ['moi-aussi-non-plus'] },
		{ kind: 'recall', prompt: 'Say it in French: "Do you want to come for dinner on Saturday?"', canonical: 'Tu veux venir dîner samedi ?', accepted: ['Tu veux venir dîner samedi ?', 'Tu veux venir dîner samedi.'], hints: ['Tu veux…'], constructions: ['vouloir-venir'] },
		{ kind: 'recall', prompt: 'A friend greets you with « Ça va ? ». Answer, and bounce it back.', canonical: 'Ça va bien, merci. Et toi ?', accepted: ['Ça va bien, merci. Et toi ?', 'Ça va bien, et toi ?', 'Ça va. Et toi ?', 'Ça va bien, merci.'], hints: ['Ça va…', 'Bounce it back with « Et toi ? »'], constructions: ['ca-va'] },
		{ kind: 'recall', prompt: 'Ask a friend: "Are you free this weekend?"', canonical: 'Tu es libre ce week-end ?', accepted: ['Tu es libre ce week-end ?', 'Tu es libre ce weekend ?', 'Est-ce que tu es libre ce week-end ?', "T'es libre ce week-end ?"], hints: ['French borrowed le week-end (masculine, with the hyphen)', 'Very informal speech shrinks tu es to t’es — recognize it, write the full form'], constructions: ['tu-es-libre'] },
		{ kind: 'recall', prompt: 'Invite a friend: "Do you feel like eating a pizza?"', canonical: 'Ça te dit de manger une pizza ?', accepted: ['Ça te dit de manger une pizza ?', 'Ça te dit une pizza ?', 'Est-ce que ça te dit de manger une pizza ?'], hints: ['« Ça te dit de + infinitive » — literally "does that say (anything) to you?"; de becomes d’ before a vowel', 'The other informal invitation, next to tu veux venir'], constructions: ['ca-te-dit'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'Tu veux ___ dîner samedi ?', options: ['venir', 'viens', 'venu'], answer: 'venir', rule: 'After vouloir, the second verb stays in the infinitive.', constructions: ['vouloir-venir'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🎬 You want to invite a friend to the cinema on Friday.', use: 'vouloir-venir', exemplar: 'Tu veux venir au cinéma vendredi ?', criteria: { constructions: [{ construction: 'vouloir-venir', orderedGroups: [['tu veux venir']] }], contextGroups: [['cinéma', 'cinema'], ['vendredi']] }, constructions: ['vouloir-venir'] }
	]
});

const l14 = {
	...d({
		index: 14,
		title: 'Révision : un dimanche compliqué',
		situation: 'One new dialogue, all old pieces',
		level: 'A1',
		kind: 'synthesis',
		constructions: [],
		lines: [
			{ target: "Qu'est-ce qu'on fait dimanche ?", english: 'What are we doing on Sunday?', speaker: 'Paul' },
			{ target: 'On va visiter le musée. Mais j’ai mal à la tête.', english: "We're going to visit the museum. But I have a headache.", speaker: 'Claire' },
			{ target: 'Depuis quand ?', english: 'Since when?', speaker: 'Paul' },
			{ target: 'Depuis hier. Il faut dormir, je pense.', english: 'Since yesterday. I need to sleep, I think.', speaker: 'Claire' },
			{ target: "Il n'y a pas de café à la maison ?", english: 'Is there no coffee at home?', speaker: 'Paul' },
			{ target: 'Non. On doit aller au marché.', english: 'No. We have to go to the market.', speaker: 'Claire' },
			{ target: 'Alors : café, puis musée. Avec plaisir.', english: 'So: coffee, then museum. With pleasure.', speaker: 'Paul' }
		],
		exercises: [
			{ kind: 'transfer', prompt: 'Perform the whole dialogue, then adapt it:', situation: '🌧️ Same Sunday, but it is raining and you have a sore throat.', use: 'jai-mal-a', exemplar: "J'ai mal à la gorge depuis hier. On doit rester à la maison.", criteria: { constructions: [{ construction: 'jai-mal-a', orderedGroups: [["j'ai mal"], ['à la gorge']] }], contextGroups: [['depuis'], ['rester'], ['maison']] }, constructions: [] }
		]
	}),
	constructions: carryConstructions(
		[l8, l9, l10, l11, l12, l13],
		['fr.jai-mal-a', 'fr.depuis', 'fr.il-faut', 'fr.il-y-a', 'fr.aller-inf', 'fr.on-doit', 'fr.avec-plaisir', 'fr.quest-ce-quon-fait']
	)
};

export const FR_LESSONS = [l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13, l14];
