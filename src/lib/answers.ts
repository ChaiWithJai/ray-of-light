/**
 * Answer comparison.
 *
 * Deliberately conservative: this decides whether an *attempt* matched, and it
 * only ever compares against human-reviewed accepted answers. It is not a grader,
 * and it never scores pronunciation — see docs/ISSUE-1-LIMITATIONS.md.
 */

/**
 * Fold away the differences that are not the learner's mistake: case, accents,
 * curly vs straight apostrophes, punctuation, and runs of whitespace.
 *
 * Accents are folded because a learner on an English keyboard cannot easily type
 * "é", and failing them for that tests their keyboard rather than their French.
 * The accent still matters pedagogically — 1n shows it in the comparison — it
 * just does not decide correct/incorrect here.
 */
export function normalise(value: string): string {
	return value
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[’'`]/g, "'")
		.replace(/[.,!?;:¿¡]/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

/** True when the attempt matches any reviewed accepted answer. */
export function matchesAccepted(attempt: string, accepted: readonly string[]): boolean {
	const a = normalise(attempt);
	return accepted.some((candidate) => normalise(candidate) === a);
}

export type DiffWord = { text: string; same: boolean };

/**
 * Word-level diff for the comparison surface (1n). The learner is meant to
 * *notice* the difference before being told, so this marks both sides rather
 * than announcing a verdict.
 */
export function diffWords(
	attempt: string,
	canonical: string
): { attempt: DiffWord[]; canonical: DiffWord[] } {
	const a = attempt.trim().split(/\s+/).filter(Boolean);
	const b = canonical.trim().split(/\s+/).filter(Boolean);
	const aNorm = a.map(normalise);
	const bNorm = b.map(normalise);

	return {
		attempt: a.map((text, i) => ({ text, same: normalise(text) === bNorm[i] })),
		canonical: b.map((text, i) => ({ text, same: normalise(text) === aNorm[i] }))
	};
}
