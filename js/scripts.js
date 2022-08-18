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

pokemonList.forEach(function(pokemon) {
    document.write('<tr>'); 
        document.write('<td>' + pokemon.name + '</td>' + '<td>' + '(height: ' + pokemon.height + ')' + '</td>');
        document.write('<td>');
        if (pokemon.height > 1) {
            document.write('<div class="text__red">' + '“Wow, that\’s big!”' + '</div>');
        } else {
            document.write('');
        }
        document.write('</td>');
    document.write('</tr>');
});
