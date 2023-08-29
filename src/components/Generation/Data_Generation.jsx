import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { BuscarDataGeneration, BuscarAPI } from '../../js/peticiones'
import Loading from '../Loading'
import Error from '../Error404'
import { useNavigate, Link } from "react-router-dom";
import Card_region from "./Card_region";
import Table_Moves from "../Type/Table_Moves"
import Table_Abilities from "./Table_Abilities";
import List_Pokemon_Species from "./List_Pokemon_Species";

function Data_Generation({ generacion }) {
    const [Generation, setGeneration] = useState()
    const [error, setError] = useState({ state: false, })
    const { generation, regiones, types } = useContext(AuthContext)

    const navigate = useNavigate()
    useEffect(() => {
        BuscarGeneration()
    }, [])
    const BuscarGeneration = async () => {
        try {
            const res = await BuscarDataGeneration(generacion)
            // !------busuqedad del nombre------
            let name = generation[res.data.name.replace(/\-/g, "_")].name

            document.title = `${name} | Pokémon`
            if (!isNaN(generacion)) {
                navigate(`/generacion/${res.data.name}`, { replace: true })
            }

            //!Grupo de Versiones
            const versiones = []
            res.data.version_groups.forEach(element => {
                versiones.push(element.name.replace(/\-/g, " "))
            });
            //!-----La region
            const region = await BuscarAPI(res.data.main_region.url)
            const name_ja = region.data.names.filter((element) => element.language.name === "ja-Hrkt")

            const name_ja_generation = res.data.names.filter((element) => element.language.name === "ja-Hrkt")

            setGeneration({
                ...Generation,
                data: res.data,
                name: name,
                versiones: versiones,
                name_ja_region: name_ja.length !== 0 ? name_ja[0] : null,
                name_ja_generation: name_ja_generation.length !== 0 ? name_ja_generation[0] : null

            })

        } catch (error) {
            console.log(`tenemos un error ${error}`)
            console.log(error)
            if (error.response.status === 404) {
                setError({
                    ...error,
                    state: true,
                })
                setGeneration([])
            }
        }
    }
    return (
        <>
            {
                Generation ?
                    !error.state ?
                        (
                            <main className='container-data-pokemon'>
                                <div className="container-generation">
                                    <div className={`container-pokemon text-dark d-flex flex-column align-items-center`}>
                                        <h1 style={{ fontSize: "3rem" }} className="fw-bold text-center color-title ">{Generation.name} <span><img className="mb-1" src={generation[Generation.data.name.replace(/\-/g, "_")].icono} alt={Generation.name} width="50px" /></span></h1>
                                        <section className="w-100 d-flex justify-content-between align-items-center">
                                            <div className="w-50 me-3">

                                                <p className="fs-5 fw-semibold m-0 text-justify">La {Generation.name} se desarrolla den la región de {regiones[Generation.data.main_region.name].name} y en donde transcurren las versiones de los videojuego {Generation.versiones.map((element, index) => (<span key={`span_${index}`}> {Generation.versiones.length - 1 === index ? "y " : ""}{`Pokémon ${element}`}</span>))}.</p>
                                                {
                                                    Generation.data.types.length !== 0 ?
                                                        (<p className="fs-5 fw-semibold m-0 text-justify">Durante esta generación es donde se presentan por primera vez los Pokémon de tipo {Generation.data.types.map((element, index) => (<span key={`tipo_${index}`} ><Link to={`/tipo/${element.name}`} className="text-decoration-none text-dark"><img src={types[element.name].nombre_pequeño} alt={element.name} />{Generation.data.types.length - 2 === index ? " y " : Generation.data.types.length - 1 === index ? "." : ", "}</Link></span>))}</p>) :
                                                        (<></>)
                                                }
                                            </div>

                                            <Card_region generation={Generation} />
                                        </section>
                                        {
                                            Generation.data.moves.length !== 0 ?
                                                (
                                                    <section className="w-100 ">
                                                        <hr />
                                                        <h2 className="fw-bold text-center color-title fs-2">Movimientos Introduccidos en la <span>{Generation.name} <img className="mb-1" src={generation[Generation.data.name.replace(/\-/g, "_")].icono} alt={Generation.name} width="50px" /></span></h2>
                                                        <Table_Moves color="generation" moves={Generation.data.moves} />
                                                    </section>
                                                ) :
                                                (<></>)
                                        }
                                        {
                                            Generation.data.abilities !== 0 ?
                                                (
                                                    <section className="w-100 ">
                                                        <hr />
                                                        <h2 className="fw-bold text-center color-title fs-2">Habilidades Introduccidos en la <span>{Generation.name} <img className="mb-1" src={generation[Generation.data.name.replace(/\-/g, "_")].icono} alt={Generation.name} width="50px" /></span> </h2>
                                                        <Table_Abilities color="generation" abilities={Generation.data.abilities} />
                                                    </section>
                                                ) :

                                                (<></>)
                                        }
                                        <section className="w-100 ">
                                            <hr />
                                            <h2 className="fw-bold text-center color-title fs-2">Especies de Pokémones Introduccidos en la <span>{Generation.name} <img className="mb-1" src={generation[Generation.data.name.replace(/\-/g, "_")].icono} alt={Generation.name} width="50px" /></span></h2>
                                            <List_Pokemon_Species color="generation" pokemones={Generation.data.pokemon_species} />
                                        </section>
                                    </div>
                                </div>
                            </main>
                        )
                        :
                        (<Error />)
                    :
                    (
                        <Loading />
                    )
            }
        </>
    )
}

export default Data_Generation