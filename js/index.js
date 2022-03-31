const getPokemons = () => {

    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));

    }
    Promise.all(promises).then((datas) => {

        const pokeData = datas.map((data) => ({
            name: data.name,
            type: data.types.map((type) => type.type.name).join(',').split(','),
            id: data.id,
            height: (data.height * 0.10).toFixed(2),
            weight: (data.weight * 0.10).toFixed(2),
        }));

        construtorList(pokeData)
    });
};


const construtorList = (pokeData) => {

    let allPokemonContainer = document.getElementById('mainContainer');
    const pokemonHTML = pokeData.map((pokeInfo) => `
        <div class="cardList ${pokeInfo.type[0]}">
        <div class='containerId'>
            <img src="img/pokeball.png" class="icon"> 
            <p class="numberId">
                <b> ${pokeInfo.id}</b>
            </p>
        </div>
        <div class="containerImgPokemon">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeInfo.id}.svg"
                alt="pokemon ${pokeInfo.name}">
        </div>

        <div class="previewInfo">

            <div class="namePokemon">
                <p><b>${pokeInfo.name}</b></p>
            </div>

            <div class="containerTypes">
            <img src="img/${pokeInfo.type[0]}.png" class="icon">
            <div class="type ${pokeInfo.type[0]}">               
                <p>${pokeInfo.type[0]}</p>
            </div>

            <img src="img/${pokeInfo.type[1]}.png" class="icon ${pokeInfo.type[1]}" style="background: transparent;">
            <div class="type ${pokeInfo.type[1]}">
                <p>${pokeInfo.type[1]}</p>
            </div>
         </div>

            <div class='containerInfo'>
                <div class="infoHeigntWeight">
                    <div><p><b>Heignt</b></p></div>
                    <div>${pokeInfo.height} m</div>
                </div>

                <div class="infoHeigntWeight">
                    <div><p><b>Weight</b></p></div>
                    <div>${pokeInfo.weight} Kg</div>
                </div>
            </div>

        </div>  
        </div>          
        `
    ).join('');

    allPokemonContainer.innerHTML = pokemonHTML;
}

getPokemons()


