let namesPersonagens = [
    'Anakin Skywalker',
    'Leia Organa',
    'C-3PO',
    'Chewbacca',
    'Darth Maul',
    'Darth Vader',
    'Dooku',
    'Han Solo',
    'Jabba Desilijic Tiure',
];

let herosJSON = [];

function herosSecondResponse(status, content) {

    if (status === 200) {

        let result = JSON.parse(content);
        rl = result['results'];
        herosJSON.push(rl[0]);

    }
    else {

        alert('Erro na requisição');
        
    }

}

function renderHeroes() {

    let infoHero = document.querySelectorAll('.portrait_heros_info_card')
    let portraitHero = document.querySelectorAll('.portrait_heros')

    for (let i = 0; i < herosJSON.length; i++) {
        
        infoHero[i].innerHTML = '<p>Nome: ' + herosJSON[i]['name'] + '</p>' +
                                '<p>Gênero: ' + herosJSON[i]['gender'] + '</p>' +
                                '<p>Nascimento: ' + herosJSON[i]['birth_year'] + '</p>' +
                                '<p>Altura: ' + herosJSON[i]['height'] + 'cm</p>' +
                                '<p>Peso: ' + herosJSON[i]['mass'] + 'kg</p>'
        portraitHero[i].setAttribute('src', '../images/portraitHeros/' + herosJSON[i]['name'].toLowerCase().replaceAll(' ', '_').replace('-', '') + '.jpg')
        
    }

}

function loadHeros() {
    for (let i = 0; i < namesPersonagens.length; i++) {
        GetRequest(null, "people/?search=" + namesPersonagens[i], herosSecondResponse);
    }
}

loadHeros()