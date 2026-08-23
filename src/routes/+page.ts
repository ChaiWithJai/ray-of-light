import { redirect } from '@sveltejs/kit';

/** Onboarding gating lands here once the learner profile exists; Today for now. */
export function load() {
	redirect(307, '/today');
}
