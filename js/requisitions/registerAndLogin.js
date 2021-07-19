var visibilidade = false; //Variável que vai manipular o botão Exibir/ocultar

function fazPost(url, body) {
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function() {
        console.log(this.responseText)
    }

    return request.responseText
}


function cadastrar(){
    event.preventDefault()
    url = 'http://127.0.0.1:5000/usuario'

    let nome = document.getElementById("name").value
    let cpf = document.getElementById("cpf").value
    let nascimento = document.getElementById("nasc").value
    let sexo = document.getElementById("sex").value
    let email = document.getElementById("email").value
    let password = document.getElementById("pass").value
    let password2 = document.getElementById("pass2").value


    // console.log(nome)
    // console.log(cep)
    // console.log(nasc)
    // console.log(sexo)
    // console.log(email)
    // console.log(password)
    // console.log(password2)

    // body = {
    //     "nome": nome,
    //     "email": email,
    //     "senha": password,
    //     "nascimento": nasc,
    //     "sexo": sexo,	
    //     "turma": {
    //       "id": 1
    //     },
    //     "alunoOuro": false
    // }

    body = {
        "nome": nome,
        "cpf": cpf,
        "nascimento": nascimento,
        "sexo": sexo,
        "email": email,	
        "senha": password
    }

    fazPost(url, body)
    
}


function ocultarExibir() {
    if (visibilidade == false){
        document.getElementById("planets").style.display = "none";
        document.getElementById("planets").style.fontSize = "6px";
    }
    else if(visibilidade == true){
        document.getElementById("planets").style.display = "block";
    }
}

function login(){
    visibilidade = true;
}











