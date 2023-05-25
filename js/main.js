const search_btn = document.querySelector("#search-btn")
const url = "https://api.pokemontcg.io/v2/cards/"
const pokeLogo = document.querySelector(".navbar-brand")
pokeLogo.addEventListener("click", InitialPokefetch)
search_btn.addEventListener("click", fetchPoke)

async function fetchPoke(e){
    let counter = 0
    e.preventDefault();
    const search_poke_name = document.querySelector("#search").value.toLowerCase()
    document.querySelector(".pokemon").innerHTML = ``
    document.querySelector("#searched-pokes").innerText = `Searching for "${search_poke_name}" in Pokemon Bank...`
    await fetch(url,{
        method: "GET",
    })
    .then((res) => res.json())
    .then((data) => {
        data.data.forEach(card => {
            console.log(card)
            if (search_poke_name == card.name.toLowerCase()){
                document.querySelector(".pokemon").innerHTML += `<a target="_blank" href="${card.tcgplayer.url}"><img  id=${card.id} class="pokemon-card-searched" src=${card.images["small"]}></a>`
                
                counter += 1          
            }
      
        })
        if (counter == 0){
            document.querySelector("#searched-pokes").innerText = `Nothing Founded for "${search_poke_name}"`
            InitialPokefetch()
        }
        
    })
    .catch(error => {
        console.log(`ERROR: ${error}`)
    });
}
 function InitialPokefetch(){
    document.querySelector(".pokemon").innerHTML = `` 
    document.querySelector("#searched-pokes").innerText = `Loading Pokemons.. Please Wait!!`
    let pokemonCount = 0
    fetch(url,{
        method: "GET",
    })
    .then((res) => res.json())
    .then((data) => {
         
        data.data.forEach(card => {
            console.log(card)
            pokemonCount += 1
            
            document.querySelector(".pokemon").innerHTML += `<a target="_blank" href="${card.tcgplayer.url}"><img  id=${card.id} class="pokemon-card" src=${card.images["small"]}></a>` 
            document.querySelector("#searched-pokes").innerText = `View All Pokemons: ${pokemonCount}`
        })
        
        
    })
    .catch(error => {
        console.log(`ERROR: ${error}`)
    });
    
}

function showCardResume(){

}
InitialPokefetch()



