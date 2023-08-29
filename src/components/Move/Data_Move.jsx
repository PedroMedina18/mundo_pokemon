import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { BuscarDataMove, BuscarAPI } from '../../js/peticiones'
import Loading from '../Loading'
import Error from '../Error404'
import Card_Move_Data from "./Card_Move_Data";
import List_Pokemon from "../List_Pokemon";
import { Link, useNavigate } from "react-router-dom";
import Carrusel_Description from "../Carrusel_Description";
import Footer from "../Footer";

function Data_Move({ move }) {
    const { types, generation } = useContext(AuthContext)
    const [Move, setMove] = useState()
    const [error, setError] = useState({ state: false, })
    const navigate = useNavigate()

    useEffect(() => {
        BuscarMove()
    }, [])

    const BuscarMove = async () => {
        try {
            // !Busquedad de la informacion base
            const res = await BuscarDataMove(move)

            // !------busuqedad del nombre------
            let name = res.data.names.filter((element) => element.language.name === "es")
            if (name.length === 0) {
                name = res.data.names.filter((element) => element.language.name === "en")
            }

            document.title = `${name[0].name} | Pokémon`
            if (!isNaN(move)) {
                navigate(`/movimiento/${res.data.name}`, { replace: true })
            }

            //!busquedad del efecto y su traduccion
            let effect = res.data.effect_entries.filter((elemento) => elemento.language.name === "es")
            if (effect.length === 0) {
                effect = res.data.effect_entries.filter((elemento) => elemento.language.name === "en")
                if (effect.length === 0) {
                    effect = null
                } else {

                    effect[0].short_effect = effect[0].short_effect.replace(/\$effect_chance/g, res.data.effect_chance)
                    effect[0].effect = effect[0].effect.replace(/\$effect_chance/g, res.data.effect_chance)

                    effect[0].short_effect.replace(/\n/g, " ")
                    effect[0].effect.replace(/\n/g, " ")
                    const traduccion_efecto_short = await BuscarAPI(`https://api.mymemory.translated.net/get?q=${effect[0].short_effect}&langpair=en|es&de=medinapedrito2@gmail.com`)
                    const traduccion_efecto = await BuscarAPI(`https://api.mymemory.translated.net/get?q=${effect[0].effect}&langpair=en|es&de=medinapedrito2@gmail.com`)

                    effect[0].short_effect = traduccion_efecto_short.data.responseData.translatedText
                    effect[0].effect = traduccion_efecto.data.responseData.translatedText
                }
            } else {
                let Completacion_Efecto_short
                let Completacion_Efecto
                Completacion_Efecto_short = effect[0].short_effect.replace(/\$effect_chance/g, res.data.effect_chance)
                Completacion_Efecto = effect[0].effect.replace(/\$effect_chance/g, res.data.effect_chance)
                effect[0].short_effect = Completacion_Efecto_short.replace(/\n/g, " ")
                effect[0].effect = Completacion_Efecto.replace(/\n/g, " ")
            }

            //!busquedad de als entradas de texto
            let descripciones = res.data.flavor_text_entries.filter((elemento) => elemento.language.name === "es")
            if (descripciones.length === 0) {
                descripciones = res.data.effect_entries.filter((elemento) => elemento.language.name === "en")
                for (const description of descripciones) {
                    const flavor_text = description.flavor_text.replace(/\n/g, " ")
                    const traduccion = await BuscarAPI(`https://api.mymemory.translated.net/get?q=${flavor_text}&langpair=en|es&de=medinapedrito2@gmail.com`)
                    description.descripcion = traduccion.data.responseData.translatedText
                    description.version = description.version_group.name
                }
            } else {
                for (const description of descripciones) {
                    const flavor_text = description.flavor_text.replace(/\n/g, " ")
                    description.descripcion = flavor_text
                    description.version = description.version_group.name
                }
            }


            setMove({
                ...Move,
                data: res.data,
                name: name[0].name,
                effect: effect ? effect[0] : effect,
                descripciones: descripciones
            })

        } catch (error) {
            console.log(`tenemos un error ${error}`)
            console.log(error)
            if (error.response.status === 404) {
                setError({
                    ...error,
                    state: true,
                })
                setMove([])
            }
        }
    }
    return (
        <>
            {
                Move ?
                    !error.state ?
                        (
                            <>
                                <main className='container-data-pokemon'>
                                    <div className={`container-pokemon text-dark ${Move.data.type.name}`}>
                                        <h1 style={{ fontSize: "3rem" }} className="fw-bold text-center color-title">{Move.name}</h1>
                                        <section className="container-data-move">
                                            <div className="w-60  d-flex flex-column align-self-md-stretch ">
                                                <p style={{ height: "max-content", fontWeight: "500" }} className=" fs-5 m-0 text-justify" >{Move.name} (<span className="fw-bold fst-italic">{Move.data.names.filter(element => element.language.name === "en")[0].name}</span> en Inglés, <span className="fw-bold fst-italic">{Move.data.names.filter(element => element.language.name === "ja-Hrkt")[0].name}</span> en Japonés ) es un movimineto de tipo <Link className="link-dark" to={`/tipo/${Move.data.type.name}`}>{types[Move.data.type.name].name} <img src={types[Move.data.type.name].nombre_mediano} alt={types[Move.data.type.name].name} /></Link>. Indroducido en la {generation[Move.data.generation.name.replace(/-/g, "_")].name} <img style={{ marginBottom: "4px" }} src={generation[Move.data.generation.name.replace(/-/g, "_")].icono} height="22px" alt="generación" />.</p>
                                                <div className="mb-2 mb-md-5">
                                                    <h3 className="fw-bold text-center color-title mt-2 mt-md-5">Efecto</h3>
                                                    <p style={{ height: "max-content", fontWeight: "500" }} className=" m-0 fs-5">{Move.effect ? Move.effect.effect : "No tenemos ningun efecto registrado"}</p>
                                                </div>
                                                <div className="mt-3">
                                                    {
                                                        Move.descripciones.length !== 0 ?
                                                            (
                                                                <>
                                                                    <h3 className="fw-bold text-center color-title mb-3">Descripciones en diferentes versiones</h3>
                                                                    <Carrusel_Description descripciones={Move.descripciones} color={Move.data.type.name} />
                                                                </>
                                                            ) :
                                                            (<></>)
                                                    }
                                                </div>
                                            </div>
                                            <Card_Move_Data move={Move} />
                                        </section>
                                        <section className="mt-5 w-100 d-flex flex-column align-items-center">
                                            <h2 className="fw-bold text-center color-title fs-2">Pokémones que pueden aprender {Move.name} </h2>
                                            <List_Pokemon pokemones={Move.data.learned_by_pokemon} color={Move.data.type.name} />
                                        </section>
                                    </div>
                                </main>
                                <Footer/>
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

export default Data_Move