const serch = document.querySelector('.serchBody__input');
const addRepositories = document.querySelector('#addRepositories');
const selectedRepositories = document.querySelector('#selectedRepositories');
let count = 0;
const debounce = (fn, debounceTime) => {
	let timoute;
	return function () {
		const fnCall = () => { fn.apply(this, arguments) }
		clearTimeout(timoute);
		timoute = setTimeout(fnCall, debounceTime)
	}
}

function createRepositories(repositorierData) {
	const repositorieElement = createElement('div', 'addRepositories__repositorier');
	repositorieElement.addEventListener('click', () => showRepositorierData(repositorierData));
	repositorieElement.innerHTML = `<span class="addRepositories__repositorier_name">${repositorierData.name}</span>`;
	addRepositories.append(repositorieElement);
}

function showRepositorierData(repositorierData) {
	serch.value = '';
	cleaerRepositores()
	if (count != 3) {
		count++;
		const repositorieElement = createElement('div', 'selectedRepositories__repositorier');
		const repositorieWrapper = createElement('div', 'selectedRepositories__wrapper');
		repositorieElement.innerHTML = `<span class="selectedRepositories__repositorier_name">Name: ${repositorierData.name}</span>
												  <span class="selectedRepositories__repositorier_owner">Owner:${repositorierData.owner['login']}</span>
												  <span class="selectedRepositories__repositorier_starts">Starts:${repositorierData.stargazers_count}</span>`;
	
		const repositorieElementClose = createElement('div', 'selectedRepositories__close');
		
		repositorieWrapper.append(repositorieElement);
		repositorieWrapper.append(repositorieElementClose);
		repositorieElementClose.addEventListener('click', () => deleteRepositori(repositorieWrapper));
		selectedRepositories.append(repositorieWrapper);
	}

}
function deleteRepositori(repozitory) {
	repozitory.remove();
	count--;
}
function createElement(elementTag, elementClass) {
	const element = document.createElement(elementTag);
	if (elementClass) {
		element.classList.add(elementClass);
	}
	return element;
}

function cleaerRepositores() {
	addRepositories.innerHTML = '';
}

class Serch {
	constructor(view) {
		this.view = view;
		this.view.addEventListener('keyup', debounce(this.serchRepositories.bind(this), 500))
	}
	async serchRepositories() {
		const serchValu = serch.value;
		if (serchValu) {

			return await fetch(`https://api.github.com/search/repositories?q=${this.view.value}&per_page=5`)
				.then(res => {
					if (res.ok) {
						res.json().then(res => {
							cleaerRepositores();
							res.items.forEach(repositorier => createRepositories(repositorier));

						})
					} else {
						//..........
					}
				})
		} else {
			cleaerRepositores();
		}
	}
}



new Serch(serch);


