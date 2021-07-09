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
        mainHerosJSON.push(rl[0]);
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

    let infosHTML;
    
    for (let i = 0; i < mainHerosJSON.length; i++) {
        
        imgHeros[i].setAttribute('src', "./images/mainHeros/" + mainHerosJSON[i]['name'].toLowerCase().replace(' ', '_').replace('-', '') + ".png")
        elBase[i].innerHTML = '<h8>INFORMAÇÕES</h8>' +
            '<br><h8>' + mainHerosJSON[i]['name'] + '</h8>' +
             "<p><span class='titles-infos'>" + 'Gênero: ' + '</span>' + mainHerosJSON[i]['gender'] + '</p>' +
             "<p><span class='titles-infos'>" + 'Nascimento: ' + '</span>' + mainHerosJSON[i]['birth_year'] + '</p>' +
             "<p id='info-planet'><span class='titles-infos'>" + 'Altura: ' + '</span>' + mainHerosJSON[i]['height'] + ' cm</p>' + 
             "<p><span class='titles-infos'>" + 'Peso: ' + '</span>' + mainHerosJSON[i]['mass'] + ' kg</p>'
        
    }

    // infosHTML += '<h8>INFORMAÇÕES</h8>' +
    //     "<p><span class='titles-infos'>" + 'Gênero: ' + '</span>' + mainHerosJSON[num]['gender'] + '</p>' +
    //     "<p><span class='titles-infos'>" + 'Nascimento: ' + '</span>' + mainHerosJSON[num]['birth_year'] + '</p>' +
    //     "<p id='info-planet'><span class='titles-infos'>" + 'Altura: ' + '</span>' + mainHerosJSON[num]['height'] + ' cm</p>' + 
    //     "<p><span class='titles-infos'>" + 'Peso: ' + '</span>' + mainHerosJSON[num]['mass'] + ' kg</p>'

    // elBase.innerHTML = infosHTML;

}

function loadMainHeros() {
    for (let i = 0; i < namesMainHeros.length; i++) {
        GetRequest(null, "people/?search=" + namesMainHeros[i], herosResponse);
    }
}
