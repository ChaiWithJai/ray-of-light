import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Issue #20: prototype names do not cross the product boundary. The
 * `$lib/components/wireframe` namespace is the design handoff's artboard kit;
 * it may only be consumed by the /surfaces reference gallery and its
 * dedicated surface components. Production routes and the production step
 * components must consume `$lib/components/ui` instead.
 */

const SRC = join(__dirname, '..');

function svelteAndTsFiles(dir: string): string[] {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) return svelteAndTsFiles(path);
		return /\.(svelte|ts)$/.test(entry.name) ? [path] : [];
	});
}

const ALLOWED = [join(SRC, 'routes', 'surfaces'), join(SRC, 'lib', 'components', 'surfaces')];

describe('production boundary', () => {
	it('no production route or component imports from components/wireframe', () => {
		const offenders = [
			...svelteAndTsFiles(join(SRC, 'routes')),
			...svelteAndTsFiles(join(SRC, 'lib', 'components'))
		].filter(
			(file) =>
				!ALLOWED.some((allowed) => file.startsWith(allowed)) &&
				!file.includes(join('lib', 'components', 'wireframe')) &&
				readFileSync(file, 'utf8').includes('components/wireframe')
		);

		expect(offenders).toEqual([]);
	});
});
