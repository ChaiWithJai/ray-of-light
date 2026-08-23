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
		{ target: 'Bonjour, monsieur.', english: 'Good morning, sir.', speaker: 'Client', constructions: ['bonjour-politesse'], notes: [{ type: 'culture', text: 'In France you greet before you ask. Skipping bonjour reads as rude, not as efficient.', anchor: 'Bonjour' }] },
		{ target: 'Bonjour ! Vous désirez ?', english: 'Good morning! What would you like?', speaker: 'Serveur' },
		{ target: 'Je voudrais un café, s’il vous plaît.', english: 'I would like a coffee, please.', speaker: 'Client', constructions: ['je-voudrais'], chunks: ['Je voudrais', 'un café', "s'il vous plaît"], notes: [{ type: 'grammar', text: 'Conditional of vouloir. The blunt form is je veux ("I want") — fine with family, brusque with strangers.', anchor: 'voudrais' }] },
		{ target: 'Un café. Et avec ceci ?', english: 'One coffee. Anything else?', speaker: 'Serveur' },
		{ target: 'C’est tout, merci.', english: "That's all, thank you.", speaker: 'Client' },
		{ target: 'Deux euros quarante.', english: 'Two euros forty.', speaker: 'Serveur' },
		{ target: 'Voilà.', english: 'Here you are.', speaker: 'Client' },
		{ target: 'Merci. Bonne journée !', english: 'Thank you. Have a good day!', speaker: 'Serveur' },
		{ target: "C'est très bon.", english: "It's very good.", speaker: 'Client', constructions: ['cest-adj'] }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 2, prompt: 'Line 3 means…', options: ['"I would like a coffee, please"', '"Do you have any coffee?"', '"The coffee is good"'], answerIndex: 0, constructions: ['je-voudrais'] },
		{ kind: 'recall', prompt: 'Say it in French: "I would like a coffee, please."', canonical: "Je voudrais un café, s'il vous plaît.", accepted: ["Je voudrais un café, s'il vous plaît.", 'Je voudrais un café.'], hints: ['Je…'], constructions: ['je-voudrais'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: '___ , monsieur. Je voudrais un café.', options: ['Bonjour', 'Merci', 'Voilà'], answer: 'Bonjour', rule: 'The greeting comes first, before any request.', constructions: ['bonjour-politesse'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🥐 A bakery, 8am. You want a croissant.', use: 'je-voudrais', exemplar: "Je voudrais un croissant, s'il vous plaît.", constructions: ['je-voudrais'] }
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
		['pour-duree', 'pour + duration', 'saying how long']
	],
	lines: [
		{ target: 'Bonsoir, madame.', english: 'Good evening, madam.', speaker: 'Client' },
		{ target: 'Bonsoir. Je peux vous aider ?', english: 'Good evening. Can I help you?', speaker: 'Réceptionniste' },
		{ target: 'Je voudrais réserver une chambre.', english: 'I would like to book a room.', speaker: 'Client', constructions: ['je-voudrais-inf'], chunks: ['Je voudrais', 'réserver', 'une chambre'], notes: [{ type: 'grammar', text: 'Same je voudrais as lesson 1, now followed by a verb instead of a noun. One construction, two shapes.', anchor: 'réserver' }] },
		{ target: 'Pour combien de nuits ?', english: 'For how many nights?', speaker: 'Réceptionniste' },
		{ target: 'Pour deux nuits.', english: 'For two nights.', speaker: 'Client', constructions: ['pour-duree'] },
		{ target: 'Avez-vous une chambre calme ?', english: 'Do you have a quiet room?', speaker: 'Client', constructions: ['avez-vous'] },
		{ target: 'Oui, au troisième étage.', english: 'Yes, on the third floor.', speaker: 'Réceptionniste' },
		{ target: "C'est parfait.", english: "That's perfect.", speaker: 'Client', constructions: ['cest-adj'] },
		{ target: 'Voici votre clé. Bonne nuit !', english: 'Here is your key. Good night!', speaker: 'Réceptionniste' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 5, prompt: 'Line 6 means…', options: ['"Do you have a quiet room?"', '"The room is quiet"', '"I would like to sleep"'], answerIndex: 0, constructions: ['avez-vous'] },
		{ kind: 'recall', prompt: 'Say it in French: "I would like to book a room for two nights."', canonical: 'Je voudrais réserver une chambre pour deux nuits.', accepted: ['Je voudrais réserver une chambre pour deux nuits.', 'Je voudrais réserver une chambre.'], hints: ['Je voudrais…'], constructions: ['je-voudrais-inf', 'pour-duree'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'Je voudrais ___ une chambre.', options: ['réserver', 'réservation', 'réservé'], answer: 'réserver', rule: 'After je voudrais, a verb stays in the infinitive.', constructions: ['je-voudrais-inf'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🍽️ A restaurant. You want to book a table for four.', use: 'je-voudrais-inf', exemplar: 'Je voudrais réserver une table pour quatre personnes.', constructions: ['je-voudrais-inf'] }
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
		['et-avec-ceci', 'et avec ceci ?', 'the shopkeeper’s "anything else?"']
	],
	lines: [
		{ target: 'Bonjour, madame.', english: 'Good morning, madam.', speaker: 'Client' },
		{ target: 'Bonjour ! Vous désirez ?', english: 'Good morning! What would you like?', speaker: 'Marchande' },
		{ target: 'Je voudrais un kilo de tomates.', english: 'I would like a kilo of tomatoes.', speaker: 'Client', constructions: ['je-voudrais', 'quantite-de'], chunks: ['Je voudrais', 'un kilo', 'de tomates'], notes: [{ type: 'grammar', text: 'After a quantity the word is always de — un kilo de, beaucoup de, un peu de. Never du or des here.', anchor: 'de' }] },
		{ target: 'Et avec ceci ?', english: 'Anything else?', speaker: 'Marchande', constructions: ['et-avec-ceci'] },
		{ target: 'Un peu de fromage, aussi.', english: 'A little cheese, too.', speaker: 'Client', constructions: ['quantite-de'] },
		{ target: "C'est tout ?", english: 'Is that all?', speaker: 'Marchande' },
		{ target: "Oui, c'est tout. C'est combien ?", english: "Yes, that's all. How much is it?", speaker: 'Client', constructions: ['combien'] },
		{ target: 'Sept euros cinquante.', english: 'Seven euros fifty.', speaker: 'Marchande' },
		{ target: 'Voilà. Merci beaucoup !', english: 'Here you are. Thank you very much!', speaker: 'Client' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 3, prompt: 'Line 4 means…', options: ['"Anything else?"', '"How much is it?"', '"Is that all?"'], answerIndex: 0, constructions: ['et-avec-ceci'] },
		{ kind: 'recall', prompt: 'Say it in French: "I would like a kilo of tomatoes."', canonical: 'Je voudrais un kilo de tomates.', accepted: ['Je voudrais un kilo de tomates.'], hints: ['Je voudrais un kilo…'], constructions: ['quantite-de'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'Je voudrais un kilo ___ tomates.', options: ['de', 'du', 'des'], answer: 'de', rule: 'After quantities → always de: un kilo de, beaucoup de, un peu de.', constructions: ['quantite-de'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🧀 A cheese shop. You want 200 grams of comté.', use: 'quantite-de', exemplar: 'Je voudrais deux cents grammes de comté.', constructions: ['quantite-de'] }
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
		['cest-loin', "c'est loin ?", 'asking about distance']
	],
	lines: [
		{ target: 'Pardon, madame !', english: 'Excuse me, madam!', speaker: 'Touriste' },
		{ target: 'Oui ?', english: 'Yes?', speaker: 'Passante' },
		{ target: 'Où est la gare, s’il vous plaît ?', english: 'Where is the station, please?', speaker: 'Touriste', constructions: ['ou-est'], chunks: ['Où est', 'la gare', "s'il vous plaît"] },
		{ target: 'Tout droit, puis à gauche.', english: 'Straight ahead, then left.', speaker: 'Passante', constructions: ['a-gauche-droite'] },
		{ target: "C'est loin ?", english: 'Is it far?', speaker: 'Touriste', constructions: ['cest-loin'] },
		{ target: 'Non, cinq minutes à pied.', english: 'No, five minutes on foot.', speaker: 'Passante' },
		{ target: 'Et le musée ?', english: 'And the museum?', speaker: 'Touriste' },
		{ target: 'À droite, après la banque.', english: 'On the right, after the bank.', speaker: 'Passante', constructions: ['a-gauche-droite'] },
		{ target: 'Merci beaucoup, madame !', english: 'Thank you very much, madam!', speaker: 'Touriste' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 4, prompt: 'Line 5 means…', options: ['"Is it far?"', '"Where is it?"', '"Is it open?"'], answerIndex: 0, constructions: ['cest-loin'] },
		{ kind: 'recall', prompt: 'Say it in French: "Where is the station, please?"', canonical: "Où est la gare, s'il vous plaît ?", accepted: ["Où est la gare, s'il vous plaît ?", 'Où est la gare ?'], hints: ['Où…'], constructions: ['ou-est'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'Tout droit, puis ___ gauche.', options: ['à', 'de', 'en'], answer: 'à', rule: 'Direction takes à: à gauche, à droite, à pied.', constructions: ['a-gauche-droite'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '💊 You need a pharmacy and see someone at a bus stop.', use: 'ou-est', exemplar: "Pardon, où est la pharmacie, s'il vous plaît ?", constructions: ['ou-est'] }
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
		['le-prochain', 'le prochain / la prochaine', 'the next one']
	],
	lines: [
		{ target: 'Bonjour. Un billet pour Lyon, s’il vous plaît.', english: 'Hello. One ticket to Lyon, please.', speaker: 'Voyageur', constructions: ['un-billet-pour'], chunks: ['Un billet', 'pour Lyon', "s'il vous plaît"] },
		{ target: 'Aller simple ou aller-retour ?', english: 'One way or return?', speaker: 'Guichetier' },
		{ target: 'Aller-retour.', english: 'Return.', speaker: 'Voyageur' },
		{ target: 'À quelle heure part le prochain train ?', english: 'At what time does the next train leave?', speaker: 'Voyageur', constructions: ['a-quelle-heure', 'le-prochain'] },
		{ target: 'À quatorze heures dix.', english: 'At ten past two.', speaker: 'Guichetier', notes: [{ type: 'culture', text: 'Timetables use the 24-hour clock. Quatorze heures is 2pm.', anchor: 'quatorze heures' }] },
		{ target: 'Quel quai ?', english: 'Which platform?', speaker: 'Voyageur' },
		{ target: 'Quai numéro sept.', english: 'Platform number seven.', speaker: 'Guichetier' },
		{ target: 'Merci. Bonne journée !', english: 'Thank you. Have a good day!', speaker: 'Voyageur' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 3, prompt: 'Line 4 means…', options: ['"At what time does the next train leave?"', '"Which platform is the train?"', '"Is the next train late?"'], answerIndex: 0, constructions: ['a-quelle-heure'] },
		{ kind: 'recall', prompt: 'Say it in French: "One ticket to Lyon, please."', canonical: "Un billet pour Lyon, s'il vous plaît.", accepted: ["Un billet pour Lyon, s'il vous plaît.", 'Un billet pour Lyon.'], hints: ['Un billet…'], constructions: ['un-billet-pour'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'À quelle ___ part le train ?', options: ['heure', 'temps', 'moment'], answer: 'heure', rule: 'Clock time is heure. Temps is weather or time-in-general.', constructions: ['a-quelle-heure'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🚌 A bus station. You want a ticket to Nice.', use: 'un-billet-pour', exemplar: "Un billet pour Nice, s'il vous plaît.", constructions: ['un-billet-pour'] }
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
		['laddition', "l'addition, s'il vous plaît", 'asking for the bill']
	],
	lines: [
		{ target: 'Bonsoir ! Vous avez choisi ?', english: 'Good evening! Have you chosen?', speaker: 'Serveur' },
		{ target: "Qu'est-ce que vous recommandez ?", english: 'What do you recommend?', speaker: 'Cliente', constructions: ['quest-ce-que'], chunks: ["Qu'est-ce que", 'vous recommandez'] },
		{ target: 'Le poisson est très bon ce soir.', english: 'The fish is very good this evening.', speaker: 'Serveur', constructions: ['cest-adj'] },
		{ target: 'Alors je prends le poisson.', english: "Then I'll have the fish.", speaker: 'Cliente', constructions: ['je-prends'], notes: [{ type: 'grammar', text: 'Je prends is the present tense doing the work of a decision made right now. French rarely needs a future here.', anchor: 'prends' }] },
		{ target: 'Et comme boisson ?', english: 'And to drink?', speaker: 'Serveur' },
		{ target: 'Une carafe d’eau, s’il vous plaît.', english: 'A jug of water, please.', speaker: 'Cliente', notes: [{ type: 'culture', text: 'Tap water in a carafe is free and normal to ask for. You do not have to buy bottled water.', anchor: "carafe d'eau" }] },
		{ target: 'Très bien.', english: 'Very good.', speaker: 'Serveur' },
		{ target: "L'addition, s'il vous plaît.", english: 'The bill, please.', speaker: 'Cliente', constructions: ['laddition'] },
		{ target: 'Tout de suite.', english: 'Right away.', speaker: 'Serveur' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 1, prompt: 'Line 2 means…', options: ['"What do you recommend?"', '"What time do you close?"', '"Do you have a table?"'], answerIndex: 0, constructions: ['quest-ce-que'] },
		{ kind: 'recall', prompt: 'Say it in French: "The bill, please."', canonical: "L'addition, s'il vous plaît.", accepted: ["L'addition, s'il vous plaît.", "L'addition."], hints: ["L'…"], constructions: ['laddition'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'Alors je ___ le poisson.', options: ['prends', 'prendre', 'pris'], answer: 'prends', rule: 'Je prends — present tense, first person. The decision is happening now.', constructions: ['je-prends'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '☕ A café. You want to ask what kind of tea they have.', use: 'quest-ce-que', exemplar: "Qu'est-ce que vous avez comme thé ?", constructions: ['quest-ce-que'] }
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
			{ kind: 'transfer', prompt: 'Perform the whole dialogue, then adapt it:', situation: '🚉 The same station, but you are going to Marseille and you want tea.', use: 'un-billet-pour', exemplar: "Un billet pour Marseille, s'il vous plaît. Je voudrais un thé.", constructions: [] }
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
		['il-faut', 'il faut + infinitive', 'impersonal necessity — "one must"']
	],
	lines: [
		{ target: 'Bonjour, docteur.', english: 'Hello, doctor.', speaker: 'Patiente' },
		{ target: 'Bonjour. Qu’est-ce qui ne va pas ?', english: "Hello. What's wrong?", speaker: 'Médecin' },
		{ target: "J'ai mal à la tête.", english: 'I have a headache.', speaker: 'Patiente', constructions: ['jai-mal-a'], chunks: ["J'ai mal", 'à la tête'], notes: [{ type: 'grammar', text: 'Literally "I have pain at the head". The body part takes à + article: à la tête, au dos, aux dents.', anchor: 'mal à la' }] },
		{ target: 'Depuis quand ?', english: 'Since when?', speaker: 'Médecin' },
		{ target: 'Depuis trois jours.', english: 'For three days.', speaker: 'Patiente', constructions: ['depuis'] },
		{ target: 'Vous dormez bien ?', english: 'Are you sleeping well?', speaker: 'Médecin' },
		{ target: 'Non, pas très bien.', english: 'No, not very well.', speaker: 'Patiente' },
		{ target: 'Il faut boire beaucoup d’eau et dormir.', english: 'You must drink a lot of water and sleep.', speaker: 'Médecin', constructions: ['il-faut', 'quantite-de'] },
		{ target: "D'accord. Merci, docteur.", english: 'All right. Thank you, doctor.', speaker: 'Patiente' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 2, prompt: 'Line 3 means…', options: ['"I have a headache"', '"I have a sore throat"', '"My head is fine"'], answerIndex: 0, constructions: ['jai-mal-a'] },
		{ kind: 'recall', prompt: 'Say it in French: "I have a headache, for three days."', canonical: "J'ai mal à la tête depuis trois jours.", accepted: ["J'ai mal à la tête depuis trois jours.", "J'ai mal à la tête."], hints: ["J'ai mal…"], constructions: ['jai-mal-a', 'depuis'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: "J'ai mal ___ la tête.", options: ['à', 'de', 'en'], answer: 'à', rule: 'avoir mal à + body part. The pain is located "at" the part.', constructions: ['jai-mal-a'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🦷 A dentist. Your tooth has hurt since yesterday.', use: 'jai-mal-a', exemplar: "J'ai mal aux dents depuis hier.", constructions: ['jai-mal-a', 'depuis'] }
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
		['rappeler', 'rappeler plus tard', 'calling back']
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
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'Est-ce que je peux ___ plus tard ?', options: ['rappeler', 'rappelle', 'rappelé'], answer: 'rappeler', rule: 'After pouvoir, the second verb stays in the infinitive.', constructions: ['rappeler'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🏨 A hotel desk. You want to ask whether you can leave your bag.', use: 'est-ce-que-je-peux', exemplar: 'Est-ce que je peux laisser mon sac ici ?', constructions: ['est-ce-que-je-peux'] }
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
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🧂 A kitchen. You notice there is no salt.', use: 'il-y-a', exemplar: "Il n'y a pas de sel.", constructions: ['il-y-a'] }
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
		['quest-ce-quon-fait', "qu'est-ce qu'on fait ?", 'what shall we do?']
	],
	lines: [
		{ target: "Qu'est-ce qu'on fait ce week-end ?", english: 'What are we doing this weekend?', speaker: 'Léa', constructions: ['quest-ce-quon-fait'] },
		{ target: 'On va visiter le musée ?', english: 'Shall we visit the museum?', speaker: 'Marc', constructions: ['on-va', 'aller-inf'], chunks: ['On va', 'visiter', 'le musée'] },
		{ target: 'Je vais travailler samedi matin.', english: "I'm going to work on Saturday morning.", speaker: 'Léa', constructions: ['aller-inf'], notes: [{ type: 'grammar', text: 'aller + infinitive is the everyday future. Je vais travailler is far more common in speech than je travaillerai.', anchor: 'vais travailler' }] },
		{ target: 'Alors dimanche ?', english: 'Sunday then?', speaker: 'Marc' },
		{ target: 'Dimanche, oui. À quelle heure ?', english: 'Sunday, yes. At what time?', speaker: 'Léa', constructions: ['a-quelle-heure'] },
		{ target: 'À dix heures, devant la gare.', english: 'At ten, in front of the station.', speaker: 'Marc' },
		{ target: "C'est parfait.", english: "That's perfect.", speaker: 'Léa', constructions: ['cest-adj'] },
		{ target: "S'il ne pleut pas.", english: "If it doesn't rain.", speaker: 'Marc' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 2, prompt: 'Line 3 means…', options: ['"I’m going to work on Saturday morning"', '"I worked on Saturday morning"', '"I want to work on Saturday"'], answerIndex: 0, constructions: ['aller-inf'] },
		{ kind: 'recall', prompt: 'Say it in French: "Shall we visit the museum?"', canonical: 'On va visiter le musée ?', accepted: ['On va visiter le musée ?', 'On va visiter le musée.'], hints: ['On va…'], constructions: ['on-va'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'Je ___ travailler samedi.', options: ['vais', 'va', 'allez'], answer: 'vais', rule: 'aller conjugates, the second verb does not: je vais, tu vas, on va + infinitive.', constructions: ['aller-inf'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🍿 A friend asks about tonight. You are going to watch a film.', use: 'aller-inf', exemplar: 'Je vais regarder un film ce soir.', constructions: ['aller-inf'] }
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
		['le-moins-cher', 'le moins cher', 'the cheapest option']
	],
	lines: [
		{ target: 'Bonjour. Je voudrais envoyer ce colis au Canada.', english: 'Hello. I would like to send this parcel to Canada.', speaker: 'Cliente', constructions: ['je-voudrais-inf', 'envoyer-a'], chunks: ['Je voudrais envoyer', 'ce colis', 'au Canada'] },
		{ target: 'Il fait deux kilos. Par avion ?', english: "It's two kilos. By air?", speaker: 'Employé' },
		{ target: 'Combien ça coûte, par avion ?', english: 'How much does it cost, by air?', speaker: 'Cliente', constructions: ['combien-ca-coute', 'combien'] },
		{ target: 'Vingt-huit euros.', english: 'Twenty-eight euros.', speaker: 'Employé' },
		{ target: "Et le moins cher ?", english: 'And the cheapest?', speaker: 'Cliente', constructions: ['le-moins-cher'] },
		{ target: 'Par bateau, douze euros. Mais six semaines.', english: 'By sea, twelve euros. But six weeks.', speaker: 'Employé' },
		{ target: 'Six semaines ! Par avion, alors.', english: 'Six weeks! By air, then.', speaker: 'Cliente' },
		{ target: 'Très bien. Signez ici, s’il vous plaît.', english: 'Very good. Sign here, please.', speaker: 'Employé' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 2, prompt: 'Line 3 means…', options: ['"How much does it cost by air?"', '"How long does it take by air?"', '"Is it going by air?"'], answerIndex: 0, constructions: ['combien-ca-coute'] },
		{ kind: 'recall', prompt: 'Say it in French: "I would like to send this parcel to Canada."', canonical: 'Je voudrais envoyer ce colis au Canada.', accepted: ['Je voudrais envoyer ce colis au Canada.'], hints: ['Je voudrais envoyer…'], constructions: ['envoyer-a'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'Je voudrais envoyer ce colis ___ Canada.', options: ['au', 'à', 'en'], answer: 'au', rule: 'Masculine countries take au: au Canada, au Portugal. Feminine take en: en France.', constructions: ['envoyer-a'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '💌 You want to send a letter to France.', use: 'envoyer-a', exemplar: 'Je voudrais envoyer cette lettre en France.', constructions: ['envoyer-a'] }
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
		['avec-plaisir', 'avec plaisir', 'accepting warmly']
	],
	lines: [
		{ target: 'Tu veux venir dîner samedi ?', english: 'Do you want to come for dinner on Saturday?', speaker: 'Claire', constructions: ['vouloir-venir'], chunks: ['Tu veux venir', 'dîner', 'samedi'] },
		{ target: 'Avec plaisir ! À quelle heure ?', english: 'With pleasure! At what time?', speaker: 'Paul', constructions: ['avec-plaisir', 'a-quelle-heure'] },
		{ target: 'Vers vingt heures.', english: 'Around eight.', speaker: 'Claire' },
		{ target: "Qu'est-ce que je peux apporter ?", english: 'What can I bring?', speaker: 'Paul', constructions: ['je-peux-apporter', 'est-ce-que-je-peux'] },
		{ target: 'Rien du tout !', english: 'Nothing at all!', speaker: 'Claire' },
		{ target: 'Une bouteille, alors.', english: 'A bottle, then.', speaker: 'Paul', notes: [{ type: 'culture', text: '"Rien du tout" is politeness, not instruction. Wine, flowers or dessert are all expected.', anchor: 'Rien du tout' }] },
		{ target: "Si tu veux. C'est gentil.", english: "If you like. That's kind.", speaker: 'Claire' },
		{ target: 'À samedi !', english: 'See you Saturday!', speaker: 'Paul' }
	],
	exercises: [
		{ kind: 'comprehension', lineIndex: 3, prompt: 'Line 4 means…', options: ['"What can I bring?"', '"What time should I come?"', '"Can I bring a friend?"'], answerIndex: 0, constructions: ['je-peux-apporter'] },
		{ kind: 'recall', prompt: 'Say it in French: "Do you want to come for dinner on Saturday?"', canonical: 'Tu veux venir dîner samedi ?', accepted: ['Tu veux venir dîner samedi ?', 'Tu veux venir dîner samedi.'], hints: ['Tu veux…'], constructions: ['vouloir-venir'] },
		{ kind: 'completion', prompt: 'Fill in the missing piece:', template: 'Tu veux ___ dîner samedi ?', options: ['venir', 'viens', 'venu'], answer: 'venir', rule: 'After vouloir, the second verb stays in the infinitive.', constructions: ['vouloir-venir'] },
		{ kind: 'transfer', prompt: 'Use a construction you already own:', situation: '🎬 You want to invite a friend to the cinema on Friday.', use: 'vouloir-venir', exemplar: 'Tu veux venir au cinéma vendredi ?', constructions: ['vouloir-venir'] }
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
			{ kind: 'transfer', prompt: 'Perform the whole dialogue, then adapt it:', situation: '🌧️ Same Sunday, but it is raining and you have a sore throat.', use: 'jai-mal-a', exemplar: "J'ai mal à la gorge depuis hier. On doit rester à la maison.", constructions: [] }
		]
	}),
	constructions: carryConstructions(
		[l8, l9, l10, l11, l12, l13],
		['fr.jai-mal-a', 'fr.depuis', 'fr.il-faut', 'fr.il-y-a', 'fr.aller-inf', 'fr.on-doit', 'fr.avec-plaisir', 'fr.quest-ce-quon-fait']
	)
};

export const FR_LESSONS = [l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13, l14];
