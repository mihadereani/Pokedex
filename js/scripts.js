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

for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + '(height: ' + pokemonList[i].height + ')');
}
