class View {
	constructor() {
		this.serch = document.querySelector('.serchBody__input');
		this.addRepositories = document.querySelector('#addRepositories');
		this.selectedRepositories = document.querySelector('#selectedRepositories');
		this.maximumSelectedRepository = 0;
	}

	showRepositorierData(repositorierData) {
		this.serch.value = '';
		this.cleaerRepositores();
		if (this.maximumSelectedRepository != 3) {
			this.maximumSelectedRepository++;
			this.repositorieElement = this.createElement('div', 'selectedRepositories__repositorier');
			this.repositorieWrapper = this.createElement('div', 'selectedRepositories__wrapper');
			this.repositorieElement.innerHTML = `<span class="selectedRepositories__repositorier_name">Name: ${repositorierData.name}</span>
													       <span class="selectedRepositories__repositorier_owner">Owner:${repositorierData.owner['login']}</span>
													       <span class="selectedRepositories__repositorier_starts">Starts:${repositorierData.stargazers_maximumSelectedRepository}</span>`;

			this.repositorieElementClose = this.createElement('div', 'selectedRepositories__close');

			this.repositorieWrapper.append(this.repositorieElement);
			this.repositorieWrapper.append(this.repositorieElementClose);
			this.repositorieElementClose.addEventListener('click', () => this.deleteRepositori(this.repositorieWrapper));
			this.selectedRepositories.append(this.repositorieWrapper);
		}
	}
	createElement(elementTag, elementClass) {
		const element = document.createElement(elementTag);
		if (elementClass) {
			element.classList.add(elementClass);
		}
		return element;
	}
	createRepositories(repositorierData) {
		this.repositorieElement = this.createElement('div', 'addRepositories__repositorier');
		this.repositorieElement.addEventListener('click', () => this.showRepositorierData(repositorierData));
		this.repositorieElement.innerHTML = `<span class="addRepositories__repositorier_name">${repositorierData.name}</span>`;
		this.addRepositories.append(this.repositorieElement);
	}
	deleteRepositori(repozitory) {
		repozitory.remove();
		this.maximumSelectedRepository--;
	}
	debounce(fn, debounceTime) {
		let timoute;
		return function () {
			const fnCall = () => { fn.apply(this, arguments) }
			clearTimeout(timoute);
			timoute = setTimeout(fnCall, debounceTime)
		}
	}
	cleaerRepositores() {
		addRepositories.innerHTML = '';
	}
}

class Serch {
	constructor(view) {
		this.view = view;
		this.view.serch.addEventListener('keyup', this.view.debounce(this.serchRepositories.bind(this), 500))
	}
	async serchRepositories() {
		const serchValu = this.view.serch.value;
		if (serchValu) {
			return await fetch(`https://api.github.com/search/repositories?q=${this.view.serch.value}&per_page=5`)
				.then(res => {
					if (res.ok) {
						res.json().then(res => {
							this.view.cleaerRepositores();
							res.items.forEach(repositorier => this.view.createRepositories(repositorier));
						})
					}
				})
		} else {
			this.view.cleaerRepositores();
		}
	}
}
new Serch(new View);


