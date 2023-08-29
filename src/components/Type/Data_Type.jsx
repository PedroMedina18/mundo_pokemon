import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { BuscarDataType } from '../../js/peticiones'
import Loading from '../Loading'
import Error from '../Error404'
import { useNavigate } from "react-router-dom";
import Card_Type_Data from "./Card_Type_data";
import Relacion_Type from "./Relacion_Type";
import Table_Moves from "./Table_Moves"
import List_Pokemon from "../List_Pokemon";
import Footer from "../Footer";

function Data_Type({ type }) {
    const { types, generation } = useContext(AuthContext)
    const [Type, setType] = useState()
    const [error, setError] = useState({ state: false, })
    const navigate = useNavigate()

    useEffect(() => {
        BuscarType()
    }, [])

    const BuscarType = async () => {
        try {
            // !Busquedad de la informacion base
            const res = await BuscarDataType(type)
            document.title = `${types[res.data.name].name} | Pokémon`
            if (!isNaN(type)) {
                navigate(`/tipo/${res.data.name}`, { replace: true })
            }
            setType({
                ...Type,
                data: res.data
            })
        } catch (error) {
            console.log(`tenemos un error ${error}`)
            console.log(error)
            if (error.response.status === 404) {
                setError({
                    ...error,
                    state: true,
                })
                setType([])
            }
        }
    }

    return (
        <>
            {
                Type ?
                    !error.state ?
                        (
                            <>
                                <main className='container-data-pokemon'>
                                    <div className={`container-pokemon text-dark ${Type.data.name}`}>
                                        <h1 className="fw-bold text-center color-title" style={{ fontSize: "3rem" }}>{`Tipo ${types[Type.data.name].name}`} <img className={`objet-fit ms-1`} src={types[Type.data.name].icono_png} width="100px" height="80px" alt={`icono_${Type.data.name}`} /></h1>
                                        <section className="d-flex justify-content-evenly mt-4 text-justify w-100" style={{ height: "max-content" }}>
                                            <div className="container-type-description">
                                                <p style={{ height: "max-content", fontWeight: "500" }} className=" fs-5 m-0 text-justify">
                                                    El Tipo {types[Type.data.name].name} <img className={`objet-fit`} style={{ marginBottom: "5px" }} src={types[Type.data.name].nombre_mediano} alt={`icono_${Type.data.name}`} />  (<span className="fw-bold fst-italic">{Type.data.names.filter(element => element.language.name === "en")[0].name}</span> Type en Inglés,
                                                    <span className="fw-bold fst-italic">{Type.data.names.filter(element => element.language.name === "ja-Hrkt")[0].name}</span> en Japonés)
                                                    es un de los 18 tipos de Pokémon. Introducido en la {generation[Type.data.generation.name.replace(/-/g, "_")].name} <img style={{ marginBottom: "4px" }} src={generation[Type.data.generation.name.replace(/-/g, "_")].icono} height="22px" alt="generación" />.
                                                </p>
                                                <Relacion_Type type={Type} />
                                            </div>
                                            <Card_Type_Data type={Type} />
                                        </section>
                                        <section className="mt-3 d-flex flex-column justify-content-center align-items-center">
                                            <h2 className="fw-bold text-center color-title fs-2">Movimientos de Tipo {types[Type.data.name].name}</h2>
                                            <Table_Moves moves={Type.data.moves} color={Type.data.name} />
                                        </section>
                                        <section className="mt-5 w-100 d-flex flex-column align-items-center">
                                            <h2 style={{ fontSize: "2rem" }} className="fw-bold text-center color-title mb-3">Pokémones de Tipo {types[Type.data.name].name}</h2>
                                            <List_Pokemon pokemones={Type.data.pokemon} color={Type.data.name} />
                                        </section>
                                    </div>
                                </main>
                                <Footer />
                            </>
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

export default Data_Type