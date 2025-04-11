// Global Variables
const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-pokemon");
const cardComponent = document.querySelector('#card-component');

const cardHeader = document.querySelector("#poke-header");
const cardPicContainer = document.querySelector("#poke-image");
const cardTitle = document.querySelector("#poke-card-title");
const profileHeader = document.querySelector("#poke-card-title");
const charTypeElement = document.querySelector("#poke-type");
const charAbilityElement = document.querySelector("#poke-ability");

// async fetch from pokeapi
async function fetchPokemon(name) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Pokémon not found: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching Pokémon data:", error.message);
        return null;
    }
}
//event listner on search button
searchButton.addEventListener("click", async (e) => {
    e.preventDefault()
    const userInput = searchInput.value

    try {
        if (!userInput) {
            throw new Error("No pokemon entered");
        }
        // make request
        const pokemonData = await fetchPokemon(userInput);

        //display results card
        cardComponent.classList.remove('d-none');

        // Add the Character Name to the Card Title and Profile Header
        const charName = pokemonData.species.name
        cardHeader.textContent = `${charName.toUpperCase()}`;

        // Add the Character Front Profile View to the Card Img Container
        const charPicUrl = pokemonData.sprites.front_default;
        cardPicContainer.setAttribute("src", `${charPicUrl}`);

        // Add the Character Primary Type to the Card
        let charType = pokemonData.types[0].type.name;
        charTypeElement.textContent = `Character Type: ${charType}`;

        //Add the Character Ability to the Card
        let charTopAbility = pokemonData.abilities[0].ability.name;
        charAbilityElement.textContent = `Character's Top Ability: ${charTopAbility}`;
    }
    
    //Display an error message if the API request generates an error
    catch(error) {
        cardHeader.textContent = ``;
        cardPicContainer.removeAttribute("src");
        profileHeader.textContent = ``;
        cardTitle.textContent = `Error fetching pokemon`;
        charTypeElement.textContent = ``;
        charAbilityElement.textContent = ``;
        console.error(`Error - Please try again`);
    }
})