let filmsJSON = [];

function filmsResponse(status, content) {

    if (status === 200) {

        let result = JSON.parse(content);
        filmsJSON.push(result['results']);

    }
    else {

        alert('Erro na requisição');
        
    }

}

function renderFilms() {

    let infoHero = document.querySelectorAll('.portrait_heros_info_card')
    let portraitHero = document.querySelectorAll('.portrait_heros')

    for (let i = 0; i < filmsJSON[0].length; i++) {

        infoHero[i].innerHTML = '<p>Título: ' + filmsJSON[0][i]['title'] + '</p>' +
        '<p>Diretor: ' + filmsJSON[0][i]['director'] + '</p>' + 
        '<p>Produtor: ' + filmsJSON[0][i]['producer'] + '</p>' +
        '<p>Lançamento: ' + filmsJSON[0][i]['release_date'].split('-').reverse().join('/') + '</p>'

        portraitHero[i].setAttribute('src', '../images/films/' + filmsJSON[0][i]['title'].toLowerCase().replaceAll(' ', '_') + '.jpeg')
        
    }

}

function loadFilms() {
    GetRequest(null, "films/", filmsResponse);
}

loadFilms()