let pokemonRepository = (function() {

let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

function getAll() {
    return pokemonList;
}

function add(pokemon) {
    if (typeof pokemon === 'object' && 
        'name' in pokemon
    ){
        return pokemonList.push(pokemon);
    }    
}

function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');

    button.innerText = pokemon.name;
    button.classList.add('button');
    button.addEventListener('click', function (event) {
        showDetails(pokemon)
    });

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);    
}

function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
        return response.json();
    }).then(function (json) {
        json.results.forEach(function (item) {
            let pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            add (pokemon);
            console.log(pokemon);
        });
        hideLoadingMessage();
    }).catch(function (e) {
        console.error(e);
        hideLoadingMessage();
    })
}

function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
    }).catch(function (e) {
        console.error(e);
    });
  }

function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
        showModal(item);
        console.log(item);
    });    
}

function showModal(pokemon) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';
    
    let modal = document.createElement('div');
    modal.classList.add('modal');
    
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
    
    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;
    
    let contentElement = document.createElement('p');
    contentElement.innerText = 'height: ' + pokemon.height;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;
    imageElement.classList.add('image');
    
    modalContainer.appendChild(modal); 
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(contentElement);
     
    
    modalContainer.classList.add('is-visible');

    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });    
}

document.querySelector('#show-modal').addEventListener('click', () => {
    showModal;
});

function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
    }
});

function showLoadingMessage() {
    let loader = document.querySelector('.loader');
    let loadingMessageElement = document.createElement('div');
    loadingMessageElement.innerText = 'Loading...';
    loader.appendChild(loadingMessageElement);
}

function hideLoadingMessage() {
    
}

return {
    getAll, 
    add,
    addListItem,
    loadList,
    loadDetails,
    showDetails,
    showModal,
    showLoadingMessage,
    hideLoadingMessage
}
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

