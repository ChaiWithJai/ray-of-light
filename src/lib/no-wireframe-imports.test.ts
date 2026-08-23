import { describe, expect, it } from 'vitest';

/**
 * Issue #20: prototype names do not cross the product boundary. The
 * `$lib/components/wireframe` namespace is the design handoff's artboard kit;
 * it may only be consumed by the /surfaces reference gallery and its
 * dedicated surface components. Production routes and the production step
 * components must consume `$lib/components/ui` instead.
 */

const sources = import.meta.glob(
	['/src/routes/**/*.svelte', '/src/routes/**/*.ts', '/src/lib/components/**/*.svelte'],
	{ query: '?raw', import: 'default', eager: true }
) as Record<string, string>;

const ALLOWED = [
	'/src/routes/surfaces/',
	'/src/lib/components/surfaces/',
	'/src/lib/components/wireframe/'
];

describe('production boundary', () => {
	it('no production route or component imports from components/wireframe', () => {
		const offenders = Object.entries(sources)
			.filter(
				([path, content]) =>
					!ALLOWED.some((allowed) => path.startsWith(allowed)) &&
					content.includes('components/wireframe')
			)
			.map(([path]) => path);

		expect(offenders).toEqual([]);
	});
});
