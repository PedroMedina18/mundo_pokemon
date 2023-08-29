import { ListarPokemon, BuscarAPI } from '../../js/peticiones'
import { useEffect, useState } from "react";
import Loading from '../Loading'
import Card_Pokemon from './Card_Pokemon'
import InfiniteScroll from 'react-infinite-scroll-component'
import Error from '../Error404'
import Navbar_pokemon from '../Navegacion/Navbar_pokemon';
import Footer from '../Footer'
import Not_Coincidencia from '../Not_Coincidencia'

function Listado() {
    const [PokedexNational, setPokedexNational] = useState(0)
    const [Pokemones, setPokemones] = useState([])
    const [Arrays, setArrays] = useState()
    const [pagina, setPagina] = useState(1)
    const [error, setError] = useState({ state: false, })
    const [hasMore, setHasMore] = useState(true)
    const [Coincidencias, setCoincidencias] = useState(true)

    useEffect(() => {
        document.title = "Pokédex | Pokémon"
        pokemon(1)
        pokedex()
    }, [])


    // *funcion encargada de buscar la lista de todos los pokemones en la API
    const pokemon = async (page = pagina) => {
        try {
            setPagina(page)
            const respuesta = await ListarPokemon((page - 1) * 16, 16);
            const PaginasTotal = Boolean(respuesta.data.count % 16) ? parseInt(respuesta.data.count / 16) + 1 : parseInt(respuesta.data.count / 16)
            const listadoPokemon = respuesta.data.results
            agregarPokemones(listadoPokemon, page)

            if (!(page < PaginasTotal)) {
                setHasMore(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const pokemon_array = async ({ page, array = null }) => {
        setPagina(page)
        if (array) {
            setArrays(array)
            const listadoPokemon = array[page - 1]
            agregarPokemones(listadoPokemon, page)
            if (page >= array.length) {
                setHasMore(false)
            }
        } else {
            const listadoPokemon = Arrays[page - 1]
            agregarPokemones(listadoPokemon, page)
            if (page >= Arrays.length) {
                setHasMore(false)
            }
        }
    }
    // *funcion encargada de crear una lista con las targetas de los pokemones
    const agregarPokemones = async (listado, page) => {
        try {

            const DataPokemones = []
            for (const pokemon of listado) {
                const res = await BuscarAPI(pokemon.url)
                const types = []
                res.data.types.forEach(element => {
                    types.push(element.type.name)
                });
                const Pokemon = {
                    id: res.data.id,
                    name: res.data.name,
                    img: res.data.sprites.other['official-artwork'].front_default,
                    type: types
                }
                DataPokemones.push(Pokemon)
            }
            if (page === 1) {
                setPokemones(DataPokemones)
            } else {
                const listPokemon = Pokemones.concat(DataPokemones)
                setPokemones(listPokemon)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //*Funcnion para buscar el numero de registros maximos de la pokedex national
    const pokedex = async () => {
        const Numero_Maximo_National = await BuscarAPI("https://pokeapi.co/api/v2/pokedex/1");
        const Total_National = Numero_Maximo_National.data.pokemon_entries
        setPokedexNational(Total_National.length)
    }

    const rotar = () => {
        const arrow = document.querySelector("#arrow")
        arrow.classList.toggle("rotate-180")
    }
    return (
        <>
            {
                error.state ?
                    (<Error />)
                    :
                    Pokemones.length !== 0 ?
                        (
                            <>
                                <Navbar_pokemon
                                    setPokemones={setPokemones}
                                    pokemon={pokemon}
                                    PokedexNational={PokedexNational}
                                    setHasMore={setHasMore}
                                    setPagina={setPagina}
                                    setArrays={setArrays}
                                    pokemon_array={pokemon_array}
                                    setCoincidencias={setCoincidencias} />
                                <main className='container-data-pokemon' id="contenedorpokemon">
                                    <button onClick={(e) => { rotar(e) }} className="button-avanzado"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#menu_avanzado_pokemon"
                                        aria-controls="menu_avanzado_pokemon"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation">
                                        Búsquedad Avanzada
                                        <span className='ms-2'>
                                            <svg id="arrow" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-caret-down-fill transition" viewBox="0 0 16 16">
                                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                            </svg>
                                        </span>
                                    </button>
                                    {
                                        Coincidencias ?
                                            (
                                                <InfiniteScroll dataLength={Pokemones.length} hasMore={hasMore}
                                                    next={
                                                        () => {
                                                            if (Arrays) {
                                                                const Nueva_Pagina = pagina + 1
                                                                pokemon_array({ page: Nueva_Pagina })
                                                            } else {
                                                                const Nueva_Pagina = pagina + 1
                                                                pokemon(Nueva_Pagina)
                                                            }
                                                        }
                                                    }
                                                    scrollThreshold="500px"
                                                    loader={
                                                        <>
                                                            <div className='d-flex w-100 justify-content-center'>
                                                                <div className="spinner-grow text-light mx-1 mb-2" style={{ width: "4rem", height: "4rem" }} role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                                <div className="spinner-grow text-light mx-1 mb-2" style={{ width: "4rem", height: "4rem" }} role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                                <div className="spinner-grow text-light mx-1 mb-2" style={{ width: "4rem", height: "4rem" }} role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                                <div />
                                                            </div>
                                                        </>
                                                    }
                                                >
                                                    <div className='w-100 px-3 px-md-5 d-flex flex-column justify-content-center align-items-cente'>
                                                        <div className='w-100  py-4 d-flex flex-wrap gap-4 justify-content-center'>
                                                            {
                                                                Pokemones.map((pokemon) => (
                                                                    <Card_Pokemon key={pokemon.name} pokemon={pokemon} id_maximo={PokedexNational} />
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </InfiniteScroll>
                                            )
                                            :
                                            (
                                                <>
                                                    <Not_Coincidencia tipo={"Pokémon"}/>
                                                </>
                                            )
                                    }

                                </main>
                                <Footer/>
                            </>
                        )
                        :
                        (
                            <Loading />
                        )
            }

        </>
    )


}

export default Listado