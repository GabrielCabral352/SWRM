function loadError(){
    fetch('../main.html')
    .then((response) => {
        if(response.status === 200){
            window.location.href = "../main.html"    
        }
        //coleta o texto html da view
    })
    setInterval(2000)
}