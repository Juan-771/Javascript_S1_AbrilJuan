let currentId = 1;

function fetchPokemon(idOrName) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${idOrName.toLowerCase()}`);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            document.getElementById("sprite").src = data.sprites.front_default;
            document.getElementById("pokeInfo").textContent = `${data.id} - ${capitalize(data.name)}`;
            currentId = data.id;
        } else {
            document.getElementById("pokeInfo").textContent = "Not found";
            document.getElementById("sprite").src = "";
        }
    };
    xhr.send();
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function prevPokemon() {
    if (currentId > 1) fetchPokemon(currentId - 1);
}

function nextPokemon() {
    fetchPokemon(currentId + 1);
}

document.getElementById("searchInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const value = this.value.trim();
        if (value) fetchPokemon(value);
    }
});

// Initial load
fetchPokemon(currentId);
