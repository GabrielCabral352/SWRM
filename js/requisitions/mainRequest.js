var defaultUrl = "https://swapi.dev/api/"
var rl;

var namesMainHeros = ['Yoda', 'Darth Vader', 'Luke Skywalker', 'R2-D2', 'C-3PO'] //NOMES DOS HEROS PARA REALIZAR O REQUEST E PUXAR AS IMAGENS
var colorsMainHeros = ['rgb(27 113 84)', 'rgb(172 31 31)', 'rgb(85 57 47)', '#394590', '#A07A35'] //COR PARA O NOME, RESPECTIVAMENTE AO ARRAY **namesMainHeros**

var mainHerosJSON = []; //JSON DOS HEROS NO CAROUSEL

function GetRequest(body, path, response) {

    let request = new XMLHttpRequest();
    let fullPath = defaultUrl + path;

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            response(request.status, request.responseText);
        }
    };

    request.open('GET', fullPath, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(body));

}

function herosResponse(status, content) {

    if (status === 200) {

        let result = JSON.parse(content);
        rl = result['results'];
        if (mainHerosJSON.length < namesMainHeros.length) { mainHerosJSON.push(rl[0]); }
        if (mainHerosJSON.length == namesMainHeros.length) {
            renderMainHeros()
        }

    }
    else {

        alert('Erro na requisição');
        
    }

}

function renderMainHeros() {

    let elBase = document.querySelectorAll('.carrossel_content_info')
    let imgHeros = document.querySelectorAll('.home_slider_img')
    
    for (let i = 0; i < mainHerosJSON.length; i++) {
        
        imgHeros[i].setAttribute('src', "./images/mainHeros/" + mainHerosJSON[i]['name'].toLowerCase().replace(' ', '_').replace('-', '') + ".png")
        
        nameSplit = mainHerosJSON[i]['name'].split(' ')
        nameSplitR = mainHerosJSON[i]['name'].split('-')

        if (nameSplit.length > 1) {
            elBase[i].innerHTML = '<h3>' + nameSplit[0] + '<span> ' + nameSplit[nameSplit.length - 1] + '</span>' + '</h3>'
        } else if (nameSplitR.length > 1) {
            elBase[i].innerHTML  = '<h3>' + nameSplitR[0] + '<span>' + nameSplitR[nameSplitR.length - 1] + '</span>' + '</h3>'
        }else {
            elBase[i].innerHTML  = '<h3><span>' + mainHerosJSON[i]['name'] + '</span></h3>'
        }
        
        elBase[i].innerHTML += "<h9 class='title-infoHero'>INFORMAÇÕES</h9>" +
             "<p><span class='titles-infos'>Gênero: </span>" + mainHerosJSON[i]['gender'] + '</p>' +
             "<p><span class='titles-infos'>Nascimento: </span>" + mainHerosJSON[i]['birth_year'] + '</p>' +
             "<p id='info-planet'><span class='titles-infos'>Altura: </span>" + mainHerosJSON[i]['height'] + ' cm</p>' + 
             "<p><span class='titles-infos'>Peso: </span>" + mainHerosJSON[i]['mass'] + ' kg</p>'
    }
    
    let titleInfoHeros = document.querySelectorAll('.title-infoHero')
    for (let x = 0; x < titleInfoHeros.length; x++) {
        titleInfoHeros[x].style.backgroundColor = colorsMainHeros[namesMainHeros.indexOf(mainHerosJSON[x]['name'])]
    }

    let titleNameHero = document.querySelectorAll('h3>span')
    for (let j = 0; j < titleNameHero.length; j++) {
        if (mainHerosJSON[j]['name'].split(' ').length > 1 || mainHerosJSON[j]['name'].split('-').length > 1) {
            titleNameHero[j].style.color = titleInfoHeros[j].style.backgroundColor
        }
        
    }

}

function loadMainHeros() {
    for (let i = 0; i < namesMainHeros.length; i++) {
        GetRequest(null, "people/?search=" + namesMainHeros[i], herosResponse);
    }
}
