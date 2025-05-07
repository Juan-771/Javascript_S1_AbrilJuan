console.log("Holii");

//JSON Estático
/**const json={
	"file": "https://coffee.alexflipnote.dev/pbpCaYbtJJI_coffee.jpg"
};


console.log(json["file"]); */

function fetchPoke(){
    let xhr = new XMLHttpRequest();
    let numPokemon=29;
    let link= `https://pokeapi.co/api/v2/pokemon/${numPokemon}`;
    //Primer paso es crear(abrir) la solicitud
    xhr.open('GET',link,true);
    //Segundo paso es decir qué hacer con esa solicitud
    xhr.onreadystatechange = function(){
        if(this.status ==200){
            let respuesta = JSON.parse(this.responseText);
            console.log(respuesta["sprites"]["front_default"]);
            displayPoke(respuesta);
        }
    };
    //El tercer paso es ejecutar la solicitud
    xhr.send();
}

fetchPoke();

function displayPoke(data){
    let informacionHTML = document.getElementById('daticos');
    if(data.response == "error"){
        informacionHTML.innerHTML=`<p>Esto no funcionó :sadfeis:</p>`;
    }else{
        
        informacionHTML.innerHTML=`
        <p>${data["name"]}</p>
        <img src=${data["sprites"]["front_default"]} />
        `
    }
}