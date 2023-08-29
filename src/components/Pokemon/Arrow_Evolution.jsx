import { useContext, useEffect, useState } from "react";
import { BuscarAPI } from '../../js/peticiones'
import { AuthContext } from "../../context/AuthContext";
import amistad from "../../assets/evolucion/30px-Corazón_de_compañero_GO.png"
import { Link } from "react-router-dom";
import triste from "../../assets/triste.svg"

function Arrow_Evolution({ detalles, pokemon,  }) {
    const { evolution_trigger, time, types } = useContext(AuthContext)
    const [Details, setDetails] = useState()
    useEffect(() => {
        BuscarItem()
    }, [])
    const BuscarItem = async () => {
        let details_new = detalles
        for (const detail of details_new) {
            if (detail.item !== null) {
                const item = await BuscarAPI(detail.item.url)
                let name = item.data.names.filter((element) => element.language.name === "es")
                if (name.length === 0) {
                    name = item.data.names.filter((element) => element.language.name === "en")
                }
                const img = item.data.sprites.default
                const name_original = item.data.name
                detail.item = {
                    ...detail.item,
                    name: name.length !== 0 ? name[0].name : item.data.name.replace(/\-/g, " "),
                    img: img,
                    name_original: name_original
                }
            } else {
                detail.item = null
            }
            if (detail.held_item !== null) {
                const item = await BuscarAPI(detail.held_item.url)
                let name = item.data.names.filter((element) => element.language.name === "es")
                if (name.length === 0) {
                    name = item.data.names.filter((element) => element.language.name === "en")
                }
                const img = item.data.sprites.default
                const name_original = item.data.name
                detail.held_item = {
                    ...detail.held_item,
                    name: name[0].name,
                    img: img,
                    name_original: name_original
                }
            } else {
                detail.held_item = null
            }
            if (detail.known_move !== null) {
                const move = await BuscarAPI(detail.known_move.url)
                let name = move.data.names.filter((element) => element.language.name === "es")
                if (name.length === 0) {
                    name = move.data.names.filter((element) => element.language.name === "en")
                }
                const name_original = move.data.name
                detail.known_move = {
                    ...detail.known_move,
                    name: name[0].name,
                    name_original: name_original
                }
            } else {
                detail.known_move = null
            }
            if (detail.location !== null) {
                const location = await BuscarAPI(detail.location.url)
                let name = location.data.names.filter((element) => element.language.name === "es")
                if (name.length === 0) {
                    name = location.data.names.filter((element) => element.language.name === "en")
                }
                const name_original = location.data.name
                detail.location = {
                    ...detail.location,
                    name: name[0].name,
                    name_original: name_original
                }
            } else {
                detail.location = null
            }
            if(detail.party_species!== null){
                const pokemon_especie=await BuscarAPI(detail.party_species.url)
                const pokemon_standar=pokemon_especie.data.varieties.filter(element=>element.is_default===true)
                const pokemon=await BuscarAPI(pokemon_standar[0].pokemon.url)
                detail.party_species = {
                    ...detail.party_species,
                    name: pokemon.data.name.replace(/\-/g, " "),
                    name_original: pokemon.data.name
                }
            }else{
                detail.party_species = null
            }
            if(detail.trade_species!== null){
                const pokemon_especie=await BuscarAPI(detail.trade_species.url)
                const pokemon_standar=pokemon_especie.data.varieties.filter(element=>element.is_default===true)
                const pokemon=await BuscarAPI(pokemon_standar[0].pokemon.url)
                detail.trade_species = {
                    ...detail.trade_species,
                    name: pokemon.data.name.replace(/\-/g, " "),
                    name_original: pokemon.data.name
                }
            }else{
                detail.trade_species = null
            }
        }
        setDetails(details_new)
    }
    return (
        Details ?
            (
                <div className="d-flex flex-column align-items-center justify-content-center text-dark flecha-evolucion px-0 px-md-2 mx-0 mx-md-1 overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="rgb(116, 116, 116, 0.40)" className={`rotate ${Details.length>2?"flecha-lg":"flecha"}`}><path d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059zM12 19.399 6.081 12H10V4h4v8h3.919L12 19.399z"></path></svg>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            
                        {
                            Details.map((element, index) => (
                                <p key={`flecha_${index}`} className="fs-6 fw-bold w-100 m-0 text-center">
                                    {evolution_trigger[element.trigger.name.replace(/\-/g, "_")].name}
                                    {
                                        pokemon.name === "palafin" ? <span>Estar en modo multijugador + Nivel </span> : <></>
                                    }
                                    {
                                        element.min_level ? element.min_level : <></>
                                    }
                                    {
                                        element.min_beauty ? <span>+ Belleza {element.min_beauty}</span> : <></>
                                    }
                                    {
                                        pokemon.name === "annihilape" ? <span>Usar 20 veces <Link to="/movimiento/rage-fist" className="link-dark">Rage Fist</Link>  + Subir Nv.</span> : <></>
                                    }
                                    {
                                        pokemon.name === "gholdengo" ? <span>Recolectar 999 Monedas de Gimmighoul + Nivel</span> : <></>
                                    }
                                    {
                                        pokemon.name === "kingambit" ? <span>Derrotar a 3 <Link to="/pokemon/bisharp" className="link-dark">Bisharp</Link> equipados con <Link to="/item/leader’s-crest" className="link-dark">Leader’s Crest</Link></span> : <></>
                                    }
                                    {
                                        pokemon.name === "pawmot" || pokemon.name === "rabsca" || pokemon.name === "brambleghast" ? <span>Dar 1000 pasos en el modo Enviar Pokémon + Nivel</span> : <></>
                                    }
                                    {
                                        element.trigger.name === "level-up" && element.min_level === null && element.location === null && element.min_beauty === null && element.held_item === null && element.item === null && element.party_species===null && element.min_happiness === null && element.known_move === null && element.known_move_type === null ? pokemon.name === "leafeon" ? <span> Cerca de la roca musgo</span> : pokemon.name === "glaceon" ? <span> Cerca de la roca hielo</span> : <span> En un campo magnético especial</span> : <></>
                                    }
                                    {
                                        element.gender ?
                                            element.gender === 1 ?
                                                <span>
                                                    +
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30px"  fill="rgb(255, 0, 234)" className="me-2  bi bi-gender-female" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z" />
                                                    </svg>
                                                </span>
                                                :
                                                <span>
                                                    +
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30px"  fill="rgb(0, 47, 255)" className="me-2  bi bi-gender-male" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                                                    </svg>
                                                </span>
                                            :
                                            <></>
                                    }
                                    {
                                        element.party_species?
                                        <Link className="link-dark" to={`/pokemon/${element.party_species.name_original}`}>+ {element.party_species.name.replace(/-/g, " ").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))} en el equipo</Link>:
                                        <></>
                                    }
                                    {
                                        element.trade_species?
                                        <Link className="link-dark" to={`/pokemon/${element.trade_species.name_original}`}> Por {element.trade_species.name.replace(/-/g, " ").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}</Link>:
                                        <></>
                                    }
                                    {
                                        element.item ? <Link className="link-dark" to={`/item/${element.item.name_original}`}>+ {element.item.name} <img src={element.item.img === null ? triste : element.item.img} alt={element.item.name} /></Link> : <></>
                                    }
                                    {
                                        element.held_item ? <Link className="link-dark" to={`/item/${element.held_item.name_original}`}>+ Equipado con {element.held_item.name} <img src={element.held_item.img === null ? triste : element.held_item.img} alt={element.held_item.name} /> </Link> : <></>
                                    }
                                    {
                                        element.turn_upside_down===true? <span>+ Sostener la consola al revés</span>:<></>
                                    }
                                    {
                                        element.needs_overworld_rain ? <span>+ Lluvia o niebla</span> : <></>
                                    }
                                    
                                    {
                                        element.relative_physical_stats === 1 ? <span>{"+ Ataque > Defensa"}</span>: <></>
                                    }
                                    {
                                        element.relative_physical_stats === 0 ? <span>{"+ Ataque = Defensa"}</span>: <></>
                                    }
                                    {
                                        element.relative_physical_stats === -1 ? <span>{"+ Ataque < Defensa"}</span>: <></>
                                    }
                                    {
                                        element.min_happiness ? <span>+ Amistad {element.min_happiness}</span> : <></>
                                    }
                                    {
                                        element.min_affection ? <span>+ <img src={amistad} alt="amistad" /> Afecto {element.min_affection}</span> : <></>
                                    }

                                    {
                                        element.time_of_day !== "" ?
                                            element.time_of_day === "full-moon" ?
                                                <span>+ Noche de Luna Llena <img src={time["night"].img} alt="tiempo" /> </span>
                                                :
                                                <span>+ {time[element.time_of_day].name} <img src={time[element.time_of_day].img} alt="tiempo" /> </span>
                                            :
                                            <></>
                                    }
                                    {
                                        element.known_move_type ? <Link className="link-dark" to={`/tipo/${element.known_move_type.name}`}>+ Conocer un Movimiento de tipo <img src={types[element.known_move_type.name].nombre_pequeño} alt={element.known_move_type.name} /></Link> : <></>
                                    }
                                    {
                                        element.party_type ? <Link className="link-dark" to={`/tipo/${element.party_type.name}`}>+ Pokémon de tipo <img src={types[element.party_type.name].nombre_pequeño} alt={element.party_type.name} /> en el equipo</Link> : <></>
                                    }
                                    {
                                        element.known_move ? <Link className="link-dark" to={`/movimiento/${element.known_move.name_original}`}>+ Conociendo {element.known_move.name}</Link> : <></>
                                    }
                                    {
                                        element.location ? <span>+ En {element.location.name}</span> : <></>
                                    }
                                </p>
                            ))
                        }
                        </div>
                </div>
            ) :
            (<></>)
    )
}

export default Arrow_Evolution