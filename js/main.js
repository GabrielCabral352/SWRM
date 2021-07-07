document.getElementById("mobile_menu").style.display = "none";

function openMenu(){
  if(document.getElementById("mobile_menu").style.display === "none"){
    document.getElementById("mobile_menu").style.display = "block";
  }else if(document.getElementById("mobile_menu").style.display === "block"){
    document.getElementById("mobile_menu").style.display = "none";
  }
}

function showDesc(e){
  
  let attr = e.getAttribute('setStt');
  if(document.getElementById(attr).style.display == "none"){
    document.getElementById(attr).style.display = "block";
  }else if(document.getElementById(attr).style.display == "block"){
    document.getElementById(attr).style.display = "none";
  }
 
}