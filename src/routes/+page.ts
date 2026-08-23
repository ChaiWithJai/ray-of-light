import { redirect } from '@sveltejs/kit';

/**
 * The entry gate. Onboarding state lives in localStorage, so the real decision
 * has to happen on the client — this just sends everyone to the start of the
 * funnel, and `/onboarding/language` forwards an already-onboarded learner on
 * to Today.
 */
export const ssr = false;

export function load() {
	redirect(307, '/onboarding/language');
}
