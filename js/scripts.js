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
    let hightString = ' (height: ' + pokemonList[i].height + ')';
    let nameString = pokemonList[i].name;

    document.write('</tr>'); 
        document.write('<td>' + nameString + '</td>' + '<td>' +  hightString + '</td>');
        document.write('<td>');
        if (pokemonList[i].height > 1) {
            document.write('<div class="text__red">' + '“Wow, that\’s big!”' + '</div>');
        } else {
            document.write('');
        }
        document.write('</td>');
    document.write('</tr>');
}
