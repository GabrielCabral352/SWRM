let planetsJSON = [];

function planetsResponse(status, content) {

    if (status === 200) {

        let result = JSON.parse(content);
        planetsJSON.push(result['results']);

    }
    else {

        alert('Erro na requisição');
        
    }

}

function renderPlanets() {

    let infoHero = document.querySelectorAll('.portrait_heros_info_card')
    let portraitHero = document.querySelectorAll('.portrait_heros')

    for (let i = 0; i < planetsJSON[0].length-1; i++) {

        infoHero[i].innerHTML = '<p>Título: ' + planetsJSON[0][i]['name'] + '</p>' +
        '<p>Clima: ' + planetsJSON[0][i]['climate'] + '</p>' + 
        '<p>Terreno: ' + planetsJSON[0][i]['terrain'] + '</p>' +
        '<p>População: ' + planetsJSON[0][i]['population'] + '</p>'

        portraitHero[i].setAttribute('src', '../images/planetas/' + planetsJSON[0][i]['name'].toLowerCase().replaceAll(' ', '_') + '.jpeg')
        portraitHero[i].setAttribute('onMouseUp', ""+planetsJSON[0][i]['name'].toLowerCase().replaceAll(' ', '_').replaceAll('-', '')+"()")
    }
}

function planetsFilms() {
    GetRequest(null, "planets/", planetsResponse);
}

planetsFilms()