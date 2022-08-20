let pokemonRepository = (function() {

let pokemonList = [
    {
        name: 'Bulbasaur',
        height: 0.7, 
        types: ['grass','poison']
    },
    {
        name: 'Charizard',
        height: 1.7, 
        types: ['fire','flying']
    },
    {
        name: 'Butterfree',
        height: 1.1, 
        types: ['bug','flying']
    }
];

function getAll() {
    return pokemonList;
}

function add(item) {
    if (typeof item === 'object' && Object.keys(item) === ['name', 'height', 'types']) {
        return pokemonList.push(item);
    }    
}

function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
}

return {
    getAll, 
    add,
    addListItem
}
})();

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});
