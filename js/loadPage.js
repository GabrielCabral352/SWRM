var div_mainContent = document.querySelector('.main_content')

function load(element) {
    let attr = element.getAttribute('view')

    let path = './../html/' + attr + '.html'
    fetch(path)
    .then((response) => {
        if(response.status === 404){
            window.location.href = "./html/404.html"    
        }
        //coleta o texto html da view
        let html = response.text()
        return html
    })
    .then((html) => {
        
        div_mainContent.innerHTML = html
        
        switch (attr) {
            case 'home':
                if (mainHerosJSON.length == namesMainHeros.length) {
                    renderMainHeros()
                } else {
                    loadMainHeros();
                }
                break;
        
            case 'personagens':
                renderHeroes();
                break;

            case 'filmes':
                renderFilms();
                break;

            case 'planetas':
                renderPlanets();
                break;

            default:
                break;
        }
    
    }).catch(function(error) {
        window.location.href = "./html/404.html"
    });
    
    //Failed to fetch at load
    
}
