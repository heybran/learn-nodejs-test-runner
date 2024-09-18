export default class Menu {
	constructor({ toggleButtonClass, navigationOpenClass, container }) {
		this.toggleButtonClass = toggleButtonClass;
		this.navigationOpenClass = navigationOpenClass;
		this.container = container;
	}

	run() {
		if (!this.container) {
			throw new Error(`Container is invalid.`);
		}

		this.toggleButton = this.container.querySelector(
			`.${this.toggleButtonClass}`
		);
		if (!this.toggleButton) {
			// eslint-disable-next-line
			throw new Error(
				`No toggle button found with this class: '${this.toggleButtonClass}'`
			);
		}

		const ariaControls = this.toggleButton.getAttribute("aria-controls");
		if (!ariaControls) {
			// eslint-disable-next-line
			throw new Error(
				`Toggle button is missing 'aria-controls' attribute or attribute value is empty.`
			);
		}

		this.navigation = this.container.getElementById(ariaControls);
		if (!this.navigation) {
			// eslint-disable-next-line
			throw new Error(`Missing nav element with id of '${ariaControls}'`);
		}

		this.toggleButton.addEventListener("click", this.toggleNavigation);
	}

	toggleNavigation = () => {
		const ariaExpanded = this.toggleButton.getAttribute("aria-expanded");
		if (ariaExpanded === "false") {
			this.toggleButton.setAttribute("aria-expanded", "true");
			this.navigation.classList.add(this.navigationOpenClass);
		} else {
			this.toggleButton.setAttribute("aria-expanded", "false");
			this.navigation.classList.remove(this.navigationOpenClass);
		}
	};
}
