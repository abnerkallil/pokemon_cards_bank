const search_btn = document.querySelector("#search-btn")
const url = "https://api.pokemontcg.io/v2/cards/"
search_btn.addEventListener("click", fetchPoke)
let counter = 0

async function fetchPoke(e){

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
            if (search_poke_name == card.name.toLowerCase()){
                document.querySelector(".pokemon").innerHTML += `<img class="pokemon-card-searched" src=${card.images["small"]}>`
                counter += 1          
            }
      
        })
        if (counter == 0){
            InitialPokefetch()
        }
        
    })
    .catch(error => {
        // handle the error
    });
}
async function InitialPokefetch(){
    await fetch(url,{
        method: "GET",
    })
    .then((res) => res.json())
    .then((data) => {
        data.data.forEach(card => {
            
            document.querySelector(".pokemon").innerHTML += `<img class="pokemon-card" src=${card.images["small"]}>`  
        })
    })
    .catch(error => {
        // handle the error
    });
    
}
InitialPokefetch()



