import { describe, it } from 'node:test';
import assert from 'node:assert';
import { JSDOM } from 'jsdom';
import Menu from './menu.mjs';

const options = {
	runScripts: 'dangerously',
	resources: 'usable',
};

describe('Menu', () => {
	it('should throw error when container is not valid', async () => {
		// Create a new JSDOM instance and extract window object.
		const { window } = new JSDOM(`
			<button class="toggle" aria-controls="nav" aria-expanded="false">
				Menu
			</button>
			<nav id="nav"></nav>
		`, options);

		await new Promise(resolve => window.addEventListener('load', resolve));

		const { document } = window;

		const menu = new Menu({
			toggleButtonClass: 'toggle',
			navigationOpenClass: 'nav--open',
		});

		assert.throws(() => menu.run());
	});

	it('should throw error when toggle button is not found', async () => {
		// Create a new JSDOM instance and extract window object.
		const { window } = new JSDOM(`
			<button class="toggle" aria-controls="nav" aria-expanded="false">
				Menu
			</button>
			<nav id="nav"></nav>
		`, options);

		await new Promise(resolve => window.addEventListener('load', resolve));

		const { document } = window;

		const menu = new Menu({
			toggleButtonClass: 'no-this-toggle',
			navigationOpenClass: 'nav--open',
			container: document,
		});

		assert.throws(() => menu.run());
	});

	it('should throw error when toggle button aria-controls attribute is not set or empty', async () => {
		// Create a new JSDOM instance and extract window object.
		const { window } = new JSDOM(`
			<button class="toggle" aria-controls="" aria-expanded="false">
				Menu
			</button>
			<nav id="nav"></nav>
		`, options);

		await new Promise(resolve => window.addEventListener('load', resolve));

		const { document } = window;

		const menu = new Menu({
			toggleButtonClass: 'toggle',
			navigationOpenClass: 'nav--open',
			container: document,
		});

		assert.throws(() => menu.run());
	});

	it('should throw error when navigation element is not found', async () => {
		// Create a new JSDOM instance and extract window object.
		const { window } = new JSDOM(`
			<button class="toggle" aria-controls="nav" aria-expanded="false">
				Menu
			</button>
			<nav id="wrong-nav-id"></nav>
		`, options);

		await new Promise(resolve => window.addEventListener('load', resolve));

		const { document } = window;

		const menu = new Menu({
			toggleButtonClass: 'toggle',
			navigationOpenClass: 'nav--open',
			container: document,
		});

		assert.throws(() => menu.run());
	});

	it('should update toggle button aria-expanded to true and nav to have open class', async () => {
		// Create a new JSDOM instance and extract window object.
		const { window } = new JSDOM(`
			<button class="toggle" aria-controls="nav" aria-expanded="false">
				Menu
			</button>
			<nav id="nav"></nav>
		`, options);

		await new Promise(resolve => window.addEventListener('load', resolve));

		const { document } = window;

		new Menu({
			toggleButtonClass: 'toggle',
			navigationOpenClass: 'nav--open',
			container: document,
		}).run();

		const toggle = document.querySelector('.toggle');
		const nav = document.querySelector('#nav');
		toggle.click(); // Click to expand the navigation.
		// toggle.dispatchEvent(new window.MouseEvent('click'));
		assert.strictEqual(toggle.getAttribute('aria-expanded'), 'true');
		// assert.match(nav.className, /nav--pen/);
		assert.strictEqual(nav.classList.contains('nav--open'), true);
		// toggle.click(); // Click again to collapse the navigation.
		// assert.strictEqual(toggle.getAttribute('aria-expanded'), 'false');
		// assert.strictEqual(nav.classList.contains('nav--open'), false);
	});
});
