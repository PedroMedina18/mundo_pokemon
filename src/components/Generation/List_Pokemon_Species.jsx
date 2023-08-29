import { useEffect, useState } from "react";
import { BuscarAPI } from '../../js/peticiones'
import Card_Pokemon_Two from "../Pokemon/Card_Pokemon_Two";
function List_Pokemon_Species({ pokemones, color, specie_base = true }) {
    const [Pokemon, setPokemon] = useState()
    const [PokedexNational, setPokedexNational] = useState(0)
    useEffect(() => {
        if (specie_base) {
            Buscar_Pokemon_base()
        } else {
            Buscar_Pokemon_specie()
        }
        pokedex()
    }, [])
    const Buscar_Pokemon_base = async () => {
        const list_specie = []
        const list_pokemon = []
        for (const Pokemon_specie of pokemones) {
            const res_specie = await BuscarAPI(Pokemon_specie.url)
            list_specie.push(res_specie.data.varieties.filter(element => element.is_default)[0])
        }
        for (const Pokemon of list_specie) {
            const res_pokemon = await BuscarAPI(Pokemon.pokemon.url)
            const types = []
            res_pokemon.data.types.forEach(element => {
                types.push(element.type.name)
            });

            list_pokemon.push({
                id: res_pokemon.data.id,
                img: res_pokemon.data.sprites.other['official-artwork'].front_default,
                name: res_pokemon.data.name,
                type: types,
            })
        }
        
        setPokemon(list_pokemon.sort((a,b)=>{return a.id - b.id}))
        
    }
    const Buscar_Pokemon_specie = async () => {

    }
    const pokedex = async () => {
        const Numero_Maximo_National = await BuscarAPI("https://pokeapi.co/api/v2/pokedex/1");
        const Total_National = Numero_Maximo_National.data.pokemon_entries
        setPokedexNational(Total_National.length)
    }
    return (
        <div style={{ background: "transparent", borderRadius: "8px", borderWidth: "5px", maxHeight: "580px" }} className={`w-90 ${color} table_move mx-auto`}>
            <div className={`${color}-opacity-bg-50 ${color} w-100 d-flex align-items-center justify-content-center`} style={{ minHeight: "550px", borderRadius: "0px", borderWidth: "5px" }}>
                {
                    Pokemon ?
                        (
                            <div className="w-100 d-flex flex-wrap justify-content-evenly py-3 px-4 gap-3">
                                {
                                    Pokemon.map((element, index) => (
                                        <Card_Pokemon_Two key={`${element.name}_${index}`} pokemon={element} id_maximo={PokedexNational} />
                                    ))
                                }
                            </div>
                        )
                        :
                        (
                            <div className="m-0 w-100 d-flex justify-content-center ">
                                <div className="spinner-grow text-dark ms-2" style={{ width: "4rem", height: "4rem" }} role="status">
                                    <span className="visually-hidden ">Loading...</span>
                                </div>
                                <div className="spinner-grow text-dark ms-2" style={{ width: "4rem", height: "4rem" }} role="status">
                                    <span className="visually-hidden ">Loading...</span>
                                </div>
                                <div className="spinner-grow text-dark ms-2" style={{ width: "4rem", height: "4rem" }} role="status">
                                    <span className="visually-hidden ">Loading...</span>
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default List_Pokemon_Species