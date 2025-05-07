let titulo = document.getElementById('titulazo');
let variable = "Campuslands"
titulo.innerHTML = `Gatico ${variable}`;

window.onload = function(){
    document.querySelector('form').addEventListener('submit', function(event){
        event.preventDefault();
        mostrarGaticoXD();
    });
};
//Funcion que consume la imagen de gatico (PERO NO ES UNA API)
function mostrarGaticoXD(){
    let imagencitaCool = document.getElementById('imagenNueva');
    const imagensita = new Image();
    let numeritoAfuera = document.getElementById('numeritoCool').value;
    console.log(numeritoAfuera+"cool");
    let url= `https://http.cat/${numeritoAfuera}`;
    imagensita.onload = function() {
        console.log("Imagen cargada correctamente");
        imagencitaCool.innerHTML = ''; 
        
    };
    imagencitaCool.src = url;

}
//Con XML
function fetchStar(){
    let edgar = new XMLHttpRequest();
    let numeritoAfuera = document.getElementById('numeritoCool').value;
    console.log(numeritoAfuera);
    let url= `https://http.cat/404.jpg`;
    console.log(url);
    edgar.open('GET',url,true);

    edgar.onreadystatechange= function(){
        console.log(this.status);
        if(this.status === 200){
            console.log("aja");
            document.getElementById(`imagenNueva`).src=url;
            document.getElementById(`errorsito`).innerHTML = ``;
        }else{
            console.log(`aja2`);
            document.getElementById(`errorsito`).innerHTML = `Mal! Vuelvelo a intentar!`;
        }
    };
    edgar.send();
}

//fetchStar();
function obtenerFetch(){
    let numeritoAfuera = document.getElementById('numeritoCool').value;
    console.log(numeritoAfuera);
    let url= `https://http.cat/404`;
    fetch(url,{method:'GET',mode:'no-cors'})
    .then(response =>{
        if(response.ok){
            console.log("aja3");
            document.getElementById(`imagenNueva`).src=url;
        }
        else{
            console.log("nope");
        }
    });
}
