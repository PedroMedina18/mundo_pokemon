import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BuscarAPI } from '../js/peticiones'
import Card_Pokemon_Two from "./Pokemon/Card_Pokemon_Two";
import InfiniteScroll from 'react-infinite-scroll-component'

function List_Pokemon({ pokemones, color }) {
    const { DividirArreglos } = useContext(AuthContext)
    const [Pokemon, setPokemon] = useState([])
    const [PokedexNational, setPokedexNational] = useState(0)
    const [Arrays, setArrays] = useState(DividirArreglos(pokemones, 12))
    const [pagina, setPagina] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    useEffect(() => {
        Buscar_Pokemons(0)
        pokedex()
    }, [])
    const Buscar_Pokemons = async (page) => {
        try {
            const Pokemones = []
            for (const pokemon of Arrays[page]) {

                const respuesta_pokemon = await BuscarAPI(pokemon.pokemon ? pokemon.pokemon.url : pokemon.url)
                const types = []
                respuesta_pokemon.data.types.forEach(element => {
                    types.push(element.type.name)
                });

                Pokemones.push({
                    id: respuesta_pokemon.data.id,
                    img: respuesta_pokemon.data.sprites.other['official-artwork'].front_default,
                    name: respuesta_pokemon.data.name,
                    type: types,
                })
            }
            if (Arrays.length === page + 1) {
                setHasMore(false)
            }
            const list = Pokemon.concat(Pokemones)
            setPokemon(list)

        } catch (error) {
            console.log(`tenemos un error ${error}`)
            console.log(error)
        }
    }
    const pokedex = async () => {
        const Numero_Maximo_National = await BuscarAPI("https://pokeapi.co/api/v2/pokedex/1");
        const Total_National = Numero_Maximo_National.data.pokemon_entries
        setPokedexNational(Total_National.length)
    }
    return (
        <div className={`${color}-opacity-bg-50 ${color} d-flex align-items-center justify-content-center container-list-pokemon`}>
            {
                Pokemon.length !== 0 ?
                    (
                        <InfiniteScroll dataLength={Pokemon.length} hasMore={hasMore}
                            next={
                                () => {

                                    const Nueva_Pagina = pagina + 1
                                    setPagina(Nueva_Pagina)
                                    Buscar_Pokemons(Nueva_Pagina)

                                }
                            }
                            loader={
                                <>
                                    <div className='d-flex w-100 justify-content-center'>
                                        <div className="spinner-grow text-dark mx-1 mb-2" style={{ width: "4rem", height: "4rem" }} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <div className="spinner-grow text-dark mx-1 mb-2" style={{ width: "4rem", height: "4rem" }} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <div className="spinner-grow text-dark mx-1 mb-2" style={{ width: "4rem", height: "4rem" }} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <div />
                                    </div>
                                </>
                            }
                            scrollThreshold="500px"
                        >
                            <div className="w-100 d-flex flex-wrap justify-content-evenly py-3 px-2 px-sm-4  gap-3">
                                {
                                    Pokemon.map((element, index) => (
                                        <Card_Pokemon_Two key={`${element.name}_${index}`} pokemon={element} id_maximo={PokedexNational} />
                                    ))
                                }
                            </div>
                        </InfiniteScroll>
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

    )
}

export default List_Pokemon