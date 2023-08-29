import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BuscarAPI, BuscarDataPokemon, BuscarDataType, BuscarDataAbility, ListarPokemon } from '../../js/peticiones'

function Navbar_pokemon({ setPokemones, PokedexNational, setHasMore, setPagina, setArrays, pokemon, pokemon_array, setCoincidencias }) {
    const { types, Habilidad, generation, forma, habitat, DividirArreglos } = useContext(AuthContext)
    const [buttons_radio, setradio_buttons_radio] = useState([])

    const uncheckRadio = (inputR) => {
        const exixte = buttons_radio.some((element) => element.name === inputR.target.name)
        if (exixte) {
            const igual = buttons_radio.some((element) => element.name === inputR.target.name && element.input === inputR.target)
            if (igual) {
                inputR.target.checked = false;
                const buttons = buttons_radio.filter((element) => element.input !== inputR.target)
                setradio_buttons_radio(buttons)
            } else {
                const buttons = buttons_radio.filter((element) => element.name !== inputR.target.name)
                buttons.push({ name: inputR.target.name, input: inputR.target })
                setradio_buttons_radio(buttons)
            }
        } else {
            buttons_radio.push({ name: inputR.target.name, input: inputR.target })
        }
    }

    const BuscarPokemon = async (e) => {
        e.preventDefault()
        setPokemones([])

        const numero = Number(e.target.Pokemon.value)

        if (numero === 0) {
            setPagina(1)
            setHasMore(true)
            setArrays(null)
            pokemon(1)
            setCoincidencias(true)
        }
        if (numero <= PokedexNational && numero !== 0) {
            const pokemon = await BuscarDataPokemon(e.target.Pokemon.value)
            const types = []
            pokemon.data.types.forEach(element => {
                types.push(element.type.name)
            });
            const data = {
                id: pokemon.data.id,
                name: pokemon.data.name,
                img: pokemon.data.sprites.other['official-artwork'].front_default,
                type: types
            }
            setCoincidencias(true)
            setHasMore(false)
            setPokemones([data])
        } else {
            setPagina(1)
            setHasMore(true)
            setArrays(null)
            pokemon(1)
            setCoincidencias(true)
        }
    }

    const BusquedadAvanzada = async (e) => {
        e.preventDefault()
        setPokemones([])
        setArrays(null)
        const AllArrays = []
        let Variante
        const tipos = e.target.querySelectorAll(".type-check")
        const habilidad = e.target.habilidades.value
        const egg_group = e.target.egg_group.value
        const variante = e.target.variante.value
        const generation = e.target.generation.value === "" ? null : e.target.generation.value
        const forma = e.target.forma.value === "" ? null : e.target.forma.value
        const habitad = e.target.habitad.value === "" ? null : e.target.habitad.value

        // *Esta parte de los check es para los tipos ya que hay que buscar cuales estan activos y que no pasen de dos
        const checked_activo = []
        tipos.forEach((element) => {
            if (element.checked) {
                checked_activo.push(element.value)
            }
        })

        if (checked_activo.length > 0) {
            if (checked_activo.length > 2) {
                const menu = document.querySelector("#menu_avanzado_pokemon")
                e.target.reset()
                menu.classList.remove("show")
                const arrow = document.querySelector("#arrow")
                arrow.classList.toggle("rotate-180")
                setCoincidencias(false)
                setPokemones([0, 1])
                return

            } else {
                const resultado = await Buscartipos(checked_activo)
                AllArrays.push(resultado)

            }
        }
        if (habilidad !== "Todas") {
            const resultado = await BuscarHabilidad(habilidad)
            AllArrays.push(resultado)
        }
        if (variante === "mega") {
            const resultados = await BuscarMegaEvolucion()
            Variante = resultados
            AllArrays.push(resultados)
        }
        if (variante === "gmax") {
            const resultados = await BuscarGmax()
            Variante = resultados
            AllArrays.push(resultados)
        }
        if (variante === "galar") {
            const resultados = await BuscarGalar()
            Variante = resultados
            AllArrays.push(resultados)
        }
        if (variante === "alola") {
            const resultados = await BuscarAlola()
            Variante = resultados
            AllArrays.push(resultados)
        }
        if (variante === "hisui") {
            const resultados = await BuscarHisui()
            Variante = resultados
            AllArrays.push(resultados)
        }
        if (variante === "paldea") {
            const resultados = await BuscarPaldea()
            Variante = resultados
            AllArrays.push(resultados)
        }

        if (generation !== null) {
            const resultados = await buscarSpecie(`https://pokeapi.co/api/v2/generation/${generation}`, Variante)
            AllArrays.push(resultados)
        }

        if (forma !== null) {
            const resultados = await buscarSpecie(`https://pokeapi.co/api/v2/pokemon-shape/${forma}`, Variante)
            AllArrays.push(resultados)
        }
        if (habitad !== null) {
            const resultados = await buscarSpecie(`https://pokeapi.co/api/v2/pokemon-habitat/${habitad}/`, Variante)
            AllArrays.push(resultados)
        }
        if (egg_group !== "Ninguno") {
            const resultados = await buscarSpecie(`https://pokeapi.co/api/v2/egg-group/${egg_group}/`, Variante)
            AllArrays.push(resultados)
        }
        if (AllArrays.length > 0) {
            if (AllArrays.length === 1) {
                setCoincidencias(true)
                setPagina(1)
                pokemon_array({ page: 1, array: DividirArreglos(AllArrays[0], 16)})
            } else {
                let listResult = AllArrays[0]
                for (let index = 1; index < AllArrays.length; index++) {
                    const list_combinada = listResult.filter((element) => {
                        return AllArrays[index].some(element_two => element_two.url === element.url)
                    })
                    listResult = list_combinada
                }
                if (listResult.length !== 0) {
                    setCoincidencias(true)
                    setPagina(1)
                    pokemon_array({ page: 1, array: DividirArreglos(listResult, 16)})
                } else {
                    setCoincidencias(false)
                    setPokemones([0, 1])
                }

            }
        } else {
            setCoincidencias(true)
            setPagina(1)
            setArrays(null)
            pokemon(1)
        }
    }
    const buscarSpecie = async (url, variante) => {
        const listOne = await BuscarAPI(url)
        const listN = []
        const list = []
        listOne.data.pokemon_species.forEach(element => {
            const N = element.url.match(/[0-9]{1,5}.$/)
            listN.push({ name: element.name, numero: N[0].replace(/\//, "") })
        })
        const Numeros = listN.sort((a, b) => { return a.numero - b.numero })
        Numeros.forEach((element) => {
            const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${element.numero}/`
            list.push({ name: element.name, url: urlPokemon })
        })
        if (variante) {
            const list_variante = []
            list.forEach((element) => {
                const validacion = new RegExp(`${element.name}-`, "")
                const pokemon = variante.filter(element_two => validacion.test(element_two.name))
                for (const poke of pokemon) {
                    list_variante.push(poke)
                }
            })
            return list_variante
        }
        return list
    }
    const Buscartipos = async (tipos) => {
        const list_tipo_One = []
        const list_tipo_two = []
        // se busca los pokemon de la primera lista
        const tipo_one = await BuscarDataType(tipos[0])
        tipo_one.data.pokemon.forEach((element) => {
            list_tipo_One.push({ name: element.pokemon.name, url: element.pokemon.url })
        })
        if (tipos.length === 2) {
            // si son dos listas se busca la segunda
            const tipo_two = await BuscarDataType(tipos[1])
            tipo_two.data.pokemon.forEach((element) => {
                list_tipo_two.push({ name: element.pokemon.name, url: element.pokemon.url })
            })
            // y luego se buscan las coincidencias
            const list_combinada = list_tipo_One.filter((element) => {
                return list_tipo_two.some(element_two => element_two.name === element.name)
            })
            return list_combinada

        } else {
            return list_tipo_One
        }
    }
    const BuscarHabilidad = async (habilidad) => {
        const list_pokemon_habilidad = []
        const res = await BuscarDataAbility(habilidad)
        res.data.pokemon.forEach((element) => {
            list_pokemon_habilidad.push({ name: element.pokemon.name, url: element.pokemon.url })
        })
        return list_pokemon_habilidad
    }
    const BuscarMegaEvolucion = async () => {
        const resOne = await ListarPokemon(0, 1)
        const count = resOne.data.count
        const resTwo = await ListarPokemon((PokedexNational - 1), count)
        const validacion = /-mega|-mega-y|-mega-x/
        const List = resTwo.data.results.filter((element) => validacion.test(element.name))
        return List
    }
    const BuscarPaldea = async () => {
        const resOne = await ListarPokemon(0, 1)
        const count = resOne.data.count
        const resTwo = await ListarPokemon((PokedexNational - 1), count)
        const validacion = /-paldea/
        const List = resTwo.data.results.filter((element) => validacion.test(element.name))
        return List
    }
    const BuscarAlola = async () => {
        const resOne = await ListarPokemon(0, 1)
        const count = resOne.data.count
        const resTwo = await ListarPokemon((PokedexNational - 1), count)
        const validacion = /-alola/
        const validacionepecial = /-totem|-alola-cap/
        const List = resTwo.data.results.filter((element) => validacion.test(element.name) && !validacionepecial.test(element.name))
        return List
    }
    const BuscarGalar = async () => {
        const resOne = await ListarPokemon(0, 1)
        const count = resOne.data.count
        const resTwo = await ListarPokemon(860, count)
        const validacion = /-galar|runerigus|perrserker|obstagoon|sirfetchd|mr-rime/
        const List = resTwo.data.results.filter((element) => validacion.test(element.name))
        return List
    }
    const BuscarHisui = async () => {
        const resOne = await ListarPokemon(0, 1)
        const count = resOne.data.count
        const resTwo = await ListarPokemon(890, count)
        const validacion = /-hisui|ursaluna|wyrdeer|kleavor|basculegion-male|basculegion-female|sneasler|overqwil|enamorus/
        const List = resTwo.data.results.filter((element) => validacion.test(element.name))
        return List
    }
    const BuscarGmax = async () => {
        const resOne = await ListarPokemon(0, 1)
        const count = resOne.data.count
        const resTwo = await ListarPokemon((PokedexNational - 1), count)
        const validacion = /-gmax/
        const List = resTwo.data.results.filter((element) => validacion.test(element.name))
        return List
    }
    return (
        <nav className='w-100 d-flex flex-column justify-content-center align-items-center py-3 navbar-pokemon'>
            <div className="d-flex w-80 align-items-center container-menu-serch justify-content-center">
                <form onSubmit={(e) => { BuscarPokemon(e) }} className='d-flex me-3 '>
                    <input className='form-control input-busquedad' type="number" placeholder='N° Pokémon' id="Pokemon" name="Pokemon" />
                    <button className='botom-pokemon' type='subtmit'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                </form>
                <p className='fs-5 w-70 text-center fw-semibold text-white mt-3 mb-5'>¡Busca un Pokémon por su número en la Pokédex Nacional o Usa la búsquedad avanzada para Buscar Pokémones por otros datos!</p>
            </div>
            <div className="collapse w-100" id="menu_avanzado_pokemon" >
                <form onSubmit={(e) => { BusquedadAvanzada(e) }} className="w-100 px-3 px-lg-5 d-flex flex-column align-items-center" >
                    <div className="d-flex flex-wrap justify-content-between  w-100">
                        <div className="d-flex flex-wrap gap-2 container-tipos-menu">
                            <div className="d-flex align-items-center">
                                <input className="cyberpunk-checkbox type-check" type="checkbox" id="grass" defaultValue={"grass"} />
                                <label className="ms-1 cursor-pointer" htmlFor="grass"><img height="28px" src={types["grass"].nombre_mediano} alt="grass" /></label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input className="cyberpunk-checkbox type-check" type="checkbox" id="poison" defaultValue={"poison"} />
                                <label className="ms-1 cursor-pointer" htmlFor="poison"><img height="28px" src={types["poison"].nombre_mediano} alt="poison" /></label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input className="cyberpunk-checkbox type-check" type="checkbox" id="fire" defaultValue={"fire"} />
                                <label className="ms-1 cursor-pointer" htmlFor="fire"><img height="28px" src={types["fire"].nombre_mediano} alt="fire" /></label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input className="cyberpunk-checkbox type-check" type="checkbox" id="water" defaultValue={"water"} />
                                <label className="ms-1 cursor-pointer" htmlFor="water"><img height="28px" src={types["water"].nombre_mediano} alt="water" /></label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input className="cyberpunk-checkbox type-check" type="checkbox" id="bug" defaultValue={"bug"} />
                                <label className="ms-1 cursor-pointer" htmlFor="bug"><img height="28px" src={types["bug"].nombre_mediano} alt="bug" /></label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input className="cyberpunk-checkbox type-check" type="checkbox" id="normal" defaultValue={"normal"} />
                                <label className="ms-1 cursor-pointer" htmlFor="normal"><img height="28px" src={types["normal"].nombre_mediano} alt="normal" /></label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input className="cyberpunk-checkbox type-check" type="checkbox" id="flying" defaultValue={"flying"} />
                                <label className="ms-1 cursor-pointer" htmlFor="flying"><img height="28px" src={types["flying"].nombre_mediano} alt="flying" /></label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input className="cyberpunk-checkbox type-check" type="checkbox" id="ground" defaultValue={"ground"} />
                                <label className="ms-1 cursor-pointer" htmlFor="ground"><img height="28px" src={types["ground"].nombre_mediano} alt="ground" /></label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input className="cyberpunk-checkbox type-check" type="checkbox" id="fairy" defaultValue={"fairy"} />
                                <label className="ms-1 cursor-pointer" htmlFor="fairy"><img height="28px" src={types["fairy"].nombre_mediano} alt="fairy" /></label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input className="cyberpunk-checkbox type-check" type="checkbox" id="fighting" defaultValue={"fighting"} />
                                <label className="ms-1 cursor-pointer" htmlFor="fighting"><img height="28px" src={types["fighting"].nombre_mediano} alt="fighting" /></label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input className="cyberpunk-checkbox type-check" type="checkbox" id="rock" defaultValue={"rock"} />
                                <label className="ms-1 cursor-pointer" htmlFor="rock"><img height="28px" src={types["rock"].nombre_mediano} alt="rock" /></label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input className="cyberpunk-checkbox type-check" type="checkbox" id="ghost" defaultValue={"ghost"} />
                                <label className="ms-1 cursor-pointer" htmlFor="ghost"><img height="28px" src={types["ghost"].nombre_mediano} alt="ghost" /></label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input className="cyberpunk-checkbox type-check" type="checkbox" id="steel" defaultValue={"steel"} />
                                <label className="ms-1 cursor-pointer" htmlFor="steel"><img height="28px" src={types["steel"].nombre_mediano} alt="steel" /></label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input className="cyberpunk-checkbox type-check" type="checkbox" id="electric" defaultValue={"electric"} />
                                <label className="ms-1 cursor-pointer" htmlFor="electric"><img height="28px" src={types["electric"].nombre_mediano} alt="electric" /></label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input className="cyberpunk-checkbox type-check" type="checkbox" id="psychic" defaultValue={"psychic"} />
                                <label className="ms-1 cursor-pointer" htmlFor="psychic"><img height="28px" src={types["psychic"].nombre_mediano} alt="psychic" /></label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input className="cyberpunk-checkbox type-check" type="checkbox" id="ice" defaultValue={"ice"} />
                                <label className="ms-1 cursor-pointer" htmlFor="ice"><img height="28px" src={types["ice"].nombre_mediano} alt="ice" /></label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input className="cyberpunk-checkbox type-check" type="checkbox" id="dragon" defaultValue={"dragon"} />
                                <label className="ms-1 cursor-pointer" htmlFor="dragon"><img height="28px" src={types["dragon"].nombre_mediano} alt="dragon" /></label>
                            </div>
                            <div className="d-flex align-items-center">
                                <input className="cyberpunk-checkbox type-check" type="checkbox" id="dark" defaultValue={"dark"} />
                                <label className="ms-1 cursor-pointer" htmlFor="dark"><img height="28px" src={types["dark"].nombre_mediano} alt="dark" /></label>
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-center mx-auto container-G-H-V">
                            <p className="fs-4 text-white fw-bold mb-1 text-center">Generación</p>
                            <div className="container-generation-menu d-md-flex flex-wrap gap-2 justify-content-around mb-3 container-generation-menu" >
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} name="generation" id="generation-i" type="radio" defaultValue={"generation-i"}></input>
                                    <label className="ms-1 cursor-pointer" htmlFor="generation-i"><img width="40px" src={generation["generation_i"].icono} alt="generacion-i" /></label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} name="generation" id="generation-ii" type="radio" defaultValue={"generation-ii"}></input>
                                    <label className="ms-1 cursor-pointer" htmlFor="generation-ii"><img width="40px" src={generation.generation_ii.icono} alt="generacion-ii" /></label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} name="generation" id="generation-iii" type="radio" defaultValue={"generation-iii"}></input>
                                    <label className="ms-1 cursor-pointer" htmlFor="generation-iii"><img width="40px" src={generation.generation_iii.icono} alt="generacion-iii" /></label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} name="generation" id="generation-iv" type="radio" defaultValue={"generation-iv"}></input>
                                    <label className="ms-1 cursor-pointer" htmlFor="generation-iv"><img width="40px" src={generation.generation_iv.icono} alt="generacion-iv" /></label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} name="generation" id="generation-v" type="radio" defaultValue={"generation-v"}></input>
                                    <label className="ms-1 cursor-pointer" htmlFor="generation-v"><img width="40px" src={generation.generation_v.icono} alt="generacion-v" /></label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} name="generation" id="generation-vi" type="radio" defaultValue={"generation-vi"}></input>
                                    <label className="ms-1 cursor-pointer" htmlFor="generation-vi"><img width="40px" src={generation.generation_vi.icono} alt="generacion-vi" /></label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} name="generation" id="generation-vii" type="radio" defaultValue={"generation-vii"}></input>
                                    <label className="ms-1 cursor-pointer" htmlFor="generation-vii"><img width="40px" src={generation.generation_vii.icono} alt="generacion-vii" /></label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} name="generation" id="generation-viii" type="radio" defaultValue={"generation-viii"}></input>
                                    <label className="ms-1 cursor-pointer" htmlFor="generation-viii"><img width="40px" src={generation.generation_viii.icono} alt="generacion-viii" /></label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} name="generation" id="generation-ix" type="radio" defaultValue={"generation-ix"}></input>
                                    <label className="ms-1 cursor-pointer" htmlFor="generation-ix"><img width="40px" src={generation.generation_ix.icono} alt="generacion-ix" /></label>
                                </div>

                            </div>
                            <p className="fs-4 text-white fw-bold mb-1 text-center">Habitad</p>
                            <div className="d-flex flex-wrap gap-1 justify-content-around mb-3" >
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} name="habitad" id="cave" type="radio" defaultValue={"cave"}></input>
                                    <label className="ms-1 cursor-pointer" htmlFor="cave"><img src={habitat.cave.icono} alt="cave" /></label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} name="habitad" id="forest" type="radio" defaultValue={"forest"}></input>
                                    <label className="ms-1 cursor-pointer" htmlFor="forest"><img src={habitat.forest.icono} alt="forest" /></label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} name="habitad" id="grassland" type="radio" defaultValue={"grassland"}></input>
                                    <label className="ms-1 cursor-pointer" htmlFor="grassland"><img src={habitat.grassland.icono} alt="grassland" /></label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} name="habitad" id="mountain" type="radio" defaultValue={"mountain"}></input>
                                    <label className="ms-1 cursor-pointer" htmlFor="mountain"><img src={habitat.mountain.icono} alt="mountain" /></label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} name="habitad" id="rare" type="radio" defaultValue={"rare"}></input>
                                    <label className="ms-1 cursor-pointer" htmlFor="rare"><img src={habitat.rare.icono} alt="rare" /></label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} name="habitad" id="rough_terrain" type="radio" defaultValue={"rough-terrain"}></input>
                                    <label className="ms-1 cursor-pointer" htmlFor="rough_terrain"><img src={habitat.rough_terrain.icono} alt="rough_terrain" /></label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} name="habitad" id="sea" type="radio" defaultValue={"sea"}></input>
                                    <label className="ms-1 cursor-pointer" htmlFor="sea"><img src={habitat.sea.icono} alt="sea" /></label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} name="habitad" id="urban" type="radio" defaultValue={"urban"}></input>
                                    <label className="ms-1 cursor-pointer" htmlFor="urban"><img src={habitat.urban.icono} alt="urban" /></label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} name="habitad" id="waters_edge" type="radio" defaultValue={"waters-edge"}></input>
                                    <label className="ms-1 cursor-pointer" htmlFor="waters_edge"><img src={habitat.waters_edge.icono} alt="waters_edge" /></label>
                                </div>
                            </div>
                            <p className="fs-4 text-white fw-bold mb-1 text-center mt-2">Variantes Pokémon</p>
                            <div className="text-white grid-2" >
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="mega" defaultValue={"mega"} name="variante" />
                                    <label className="ms-1 cursor-pointer fs-5 fw-semibold" htmlFor="mega">Megaevolución</label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="gmax" defaultValue={"gmax"} name="variante" />
                                    <label className="ms-1 cursor-pointer fs-5 fw-semibold" htmlFor="gmax">Gigamax </label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="alola" defaultValue={"alola"} name="variante" />
                                    <label className="ms-1 cursor-pointer fs-5 fw-semibold" htmlFor="alola">Alola</label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="paldea" defaultValue={"paldea"} name="variante" />
                                    <label className="ms-1 cursor-pointer fs-5 fw-semibold" htmlFor="paldea">Paldea</label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="galar" defaultValue={"galar"} name="variante" />
                                    <label className="ms-1 cursor-pointer fs-5 fw-semibold" htmlFor="galar">Galar</label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="hisui" defaultValue={"hisui"} name="variante" />
                                    <label className="ms-1 cursor-pointer fs-5 fw-semibold" htmlFor="hisui">Hisui</label>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-wrap justify-content-around mx-auto container-forma">
                            <p className="fs-4 text-white fw-bold mb-0 text-center w-100">Formas</p>
                            <div className="d-flex align-items-center" style={{ height: "80px" }}>
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} id="ball" type="radio" name="forma" defaultValue={"ball"} />
                                <label className="ms-1 cursor-pointer" htmlFor="ball"><img src={forma.ball.icono} alt="ball" /></label>
                            </div>
                            <div className="d-flex align-items-center" style={{ height: "80px" }}>
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} id="squiggle" type="radio" name="forma" defaultValue={"squiggle"} />
                                <label className="ms-1 cursor-pointer" htmlFor="squiggle"><img src={forma.squiggle.icono} alt="squiggle" /></label>
                            </div>
                            <div className="d-flex align-items-center" style={{ height: "80px" }}>
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} id="armor" type="radio" name="forma" defaultValue={"armor"} />
                                <label className="ms-1 cursor-pointer" htmlFor="armor"><img src={forma.armor.icono} alt="armor" /></label>
                            </div>
                            <div className="d-flex align-items-center" style={{ height: "80px" }}>
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} id="fish" type="radio" name="forma" defaultValue={"fish"} />
                                <label className="ms-1 cursor-pointer" htmlFor="fish"><img src={forma.fish.icono} alt="fish" /></label>
                            </div>
                            <div className="d-flex align-items-center" style={{ height: "80px" }}>
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} id="arms" type="radio" name="forma" defaultValue={"arms"} />
                                <label className="ms-1 cursor-pointer" htmlFor="arms"><img src={forma.arms.icono} alt="arms" /></label>
                            </div>
                            <div className="d-flex align-items-center" style={{ height: "80px" }}>
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} id="humanoid" type="radio" name="forma" defaultValue={"humanoid"} />
                                <label className="ms-1 cursor-pointer" htmlFor="humanoid"><img src={forma.humanoid.icono} alt="humanoid" /></label>
                            </div>
                            <div className="d-flex align-items-center" style={{ height: "80px" }}>
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} id="blob" type="radio" name="forma" defaultValue={"blob"} />
                                <label className="ms-1 cursor-pointer" htmlFor="blob"><img src={forma.blob.icono} alt="blob" /></label>
                            </div>
                            <div className="d-flex align-items-center" style={{ height: "80px" }}>
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} id="bug_wings" type="radio" name="forma" defaultValue={"bug-wings"} />
                                <label className="ms-1 cursor-pointer" htmlFor="bug_wings"><img src={forma.bug_wings.icono} alt="bug_wings" /></label>
                            </div>
                            <div className="d-flex align-items-center" style={{ height: "80px" }}>
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} id="upright" type="radio" name="forma" defaultValue={"upright"} />
                                <label className="ms-1 cursor-pointer" htmlFor="upright"><img src={forma.upright.icono} alt="upright" /></label>
                            </div>
                            <div className="d-flex align-items-center" style={{ height: "80px" }}>
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} id="legs" type="radio" name="forma" defaultValue={"legs"} />
                                <label className="ms-1 cursor-pointer" htmlFor="legs"><img src={forma.legs.icono} alt="legs" /></label>
                            </div>
                            <div className="d-flex align-items-center" style={{ height: "80px" }}>
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} id="quadruped" type="radio" name="forma" defaultValue={"quadruped"} />
                                <label className="ms-1 cursor-pointer" htmlFor="quadruped"><img src={forma.quadruped.icono} alt="quadruped" /></label>
                            </div>
                            <div className="d-flex align-items-center" style={{ height: "80px" }}>
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} id="tentacles" type="radio" name="forma" defaultValue={"tentacles"} />
                                <label className="ms-1 cursor-pointer" htmlFor="tentacles"><img src={forma.tentacles.icono} alt="tentacles" /></label>
                            </div>
                            <div className="d-flex align-items-center" style={{ height: "80px" }}>
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} id="wings" type="radio" name="forma" defaultValue={"wings"} />
                                <label className="ms-1 cursor-pointer" htmlFor="wings"><img src={forma.wings.icono} alt="wings" /></label>
                            </div>
                            <div className="d-flex align-items-center" style={{ height: "80px" }}>
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} id="heads" type="radio" name="forma" defaultValue={"heads"} />
                                <label className="ms-1 cursor-pointer" htmlFor="heads"><img src={forma.heads.icono} alt="heads" /></label>
                            </div>
                        </div>
                        <div className="d-flex flex-xl-column align-items-center justify-content-around m-auto m-xl-0">
                            <div className="d-flex flex-column align-items-center ">
                                <label htmlFor="egg_group" className="fs-4 text-white fw-bold mb-1">Grupo Huevo</label>
                                <select className="selet-habilidad" defaultValue={"Ninguno"} size={5} aria-label="Size 3 select example" name="egg_group" id="egg_group">
                                    <option value={"Ninguno"} >Ninguno</option>
                                    <option value={"monster"}>Monstruo</option>
                                    <option value={"water1"}>Agua 1</option>
                                    <option value={"bug"}>Bicho</option>
                                    <option value={"flying"}>Volador</option>
                                    <option value={"ground"}>Campo</option>
                                    <option value={"fairy"}>Hada</option>
                                    <option value={"plant"}>Planta</option>
                                    <option value={"humanshape"}>Humanoide</option>
                                    <option value={"water3"}>Agua 3</option>
                                    <option value={"mineral"}>Mineral</option>
                                    <option value={"indeterminate"}>Amorfo</option>
                                    <option value={"water2"}>Agua 2</option>
                                    <option value={"ditto"}>Ditto</option>
                                    <option value={"dragon"}>Dragón</option>
                                    <option value={"no-eggs"}>Desconocido</option>
                                </select>
                            </div>
                            <div className="d-flex flex-column align-items-center ms-5 ms-xl-0">
                                <label htmlFor="habilidades" className="fs-4 text-white fw-bold mb-1">Habilidades</label>
                                <select className="selet-habilidad" defaultValue={"Todas"} size={10} aria-label="Size 3 select example" name="habilidades" id="habilidades">
                                    <option key={`hability`} value={"Todas"}  >Tadas</option>
                                    {
                                        Habilidad ?
                                            Habilidad.map((element, index) => (
                                                <option key={`habilidad_${index}`} value={element.name_original}>{element.name}</option>
                                            ))
                                            :
                                            (<></>)
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <button type="subtmit" className="my-3 botom-pokemon fs-5 fw-bold">
                        Buscar
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className=" ms-2 bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                </form>
            </div>
        </nav>
    )
}

export default Navbar_pokemon