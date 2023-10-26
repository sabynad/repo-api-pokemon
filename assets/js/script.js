console.log("test code");

// ------------------------------------récupération de l'API site pokemon via methode fetch ---------------
let arrayPokemons;
await getAllPokemons();
console.log("Voici les données via fetch: ", arrayPokemons);

async function getAllPokemons () {
    const res = await fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/25", {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json',   
        }
    });
    arrayPokemons = await res.json();
}

//----------------------------------------liste pokemon-----------------------------------------
// menu selection avec liste des pokemons
let menuSelect = document.createElement("select");
document.querySelector("#cadre_liste").appendChild(menuSelect); // id est enfant (querySelector pour les id) de menuSelect


let menuOption = document.createElement("option");
menuOption.innerText = "-- Selection --";
menuOption.value = 0;
menuSelect.appendChild(menuOption); 

for (let i = 0; i < arrayPokemons.length; i++) {
    let menuOption = document.createElement("option");
    console.log(arrayPokemons[i].name);
    menuOption.innerText = arrayPokemons[i].name;
    menuSelect.appendChild(menuOption); 
}

//----------------------------------------partie informations pokemon---------------------------
menuSelect.addEventListener("change", function () {
    // On ne récupère les informations du pokemon que si la valeur de select est différente de 0 "--Selection--"
    document.querySelector("#cadre_image").innerHTML = ""; // Permet de pas additionner les images a chaque selection
    document.querySelector(".competence").innerHTML = "";  // Permet de pas additionner les competences a chaque selection
        if (menuSelect.value != 0) {
            // On récupère l'objet pokemon correspondant au choix de la select
                // 1ère version : On cherche dans le tableau des pokemons(arrayPokemons) le poste de tableau (donc le pokemon)
                //pour lequel la valeur de la propriété "name" est égale 
                //à la valeur de mon élément <select>
                    const pokemonChoisi2 = arrayPokemons.find((pokemon) => pokemon.name == menuSelect.value);
                    console.log("pokemonChoisi 2 : ", pokemonChoisi2);
                // 2ème version
                // const pokemonChoisi = arrayPokemons[menuSelect.selectedIndex-1];
                // console.log(pokemonChoisi);
            // Récupération de l'image
            // partie image apparait celon le nom du pokemon choisie
                let imagePokemon = document.createElement("img");
                imagePokemon.classList.add("image");
                imagePokemon.style.display = "block"; // sinon l'image reste en none si retour sur selection
                imagePokemon.setAttribute("src", pokemonChoisi2.image);
                document.querySelector("#cadre_image").appendChild(imagePokemon);
            // Récupération des stats
            for (const [propriete, valeur] of Object.entries(pokemonChoisi2.stats)) {  //METHODE; object.entries(pour mettre )
                console.log(`${propriete}: ${valeur}`);
                let uneStat = document.createElement("div");
                uneStat.classList.add("une-statistique");
                uneStat.textContent = propriete + " : " +  valeur;
                document.querySelector(".competence").appendChild(uneStat);
            }
        }      
})






    

    
    




