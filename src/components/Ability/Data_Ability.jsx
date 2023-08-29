import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BuscarDataAbility, BuscarAPI } from '../../js/peticiones'
import Loading from '../Loading'
import Error from '../Error404'
import { useNavigate } from "react-router-dom";
import List_Pokemon from "../List_Pokemon"
import Carrusel_Description from "../Carrusel_Description";
import Footer from "../Footer";


function Data_Ability({ ability }) {
    const [Ability, setAbility] = useState()
    const [error, setError] = useState({ state: false, })
    const { generation } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        BuscarAbility()

    }, [])
    const BuscarAbility = async () => {
        try {
            // !Busquedad de la informacion base
            const res = await BuscarDataAbility(ability)

            // !------busquedad del nombre------
            let name = res.data.names.filter((element) => element.language.name === "es")
            if (name.length === 0) {
                name = res.data.names.filter((element) => element.language.name === "en")
                const res_traduccion = await BuscarAPI(`https://api.mymemory.translated.net/get?q=${name[0].name}&langpair=en|es&de=medinapedrito2@gmail.com`)
                name[0].name = res_traduccion.data.responseData.translatedText
            }

            //*Para agregar el title
            document.title = `${name[0].name.replace(/-/g, " ").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))} | Pokémon`
            if (!isNaN(ability)) {
                navigate(`/habilidad/${res.data.name}`, { replace: true })
            }

            // !------busquedad de la descipcion------
            let description = res.data.effect_entries.filter((element) => element.language.name === "es")
            if (description.length === 0) {
                description = res.data.effect_entries.filter((element) => element.language.name === "en")
                if (!(description.length === 0)) {
                    const res_traduccion = await BuscarAPI(`https://api.mymemory.translated.net/get?q=${description[0].effect}&langpair=en|es&de=medinapedrito2@gmail.com`)
                    description[0].effect = res_traduccion.data.responseData.translatedText
                }
            }


            // !------busquedad de las entradads de texto------
            let flavor_text_entries = res.data.flavor_text_entries.filter(element => element.language.name === "es")
            if (flavor_text_entries.length === 0) {
                flavor_text_entries = res.data.flavor_text_entries.filter(element => element.language.name === "en")
                for (const description of flavor_text_entries) {
                    const flavor_text = description.flavor_text.replace(/\n/g, " ")
                    const traduccion = await BuscarAPI(`https://api.mymemory.translated.net/get?q=${flavor_text}&langpair=en|es&de=medinapedrito2@gmail.com`)
                    description.descripcion = traduccion.data.responseData.translatedText
                    description.version = description.version_group.name
                }
            } else {
                for (const description of flavor_text_entries) {
                    description.descripcion = description.flavor_text.replace(/\n/g, " ")
                    description.version = description.version_group.name.replace(/-/g, " ")
                }
            }

            setAbility({
                ...Ability,
                data: res.data,
                name: name[0].name,
                description: {
                    texto: description.length === 0 ? 0 : description[0].effect,
                },
                text_entries: flavor_text_entries
            })
        } catch (error) {
            console.log(`tenemos un error ${error}`)
            console.log(error)
            if (error.response.status === 404) {
                setError({
                    ...error,
                    state: true,
                })
                setAbility([])
            }
        }
    }

    return (
        <>
            {
                Ability ?
                    !error.state ?
                        (
                            <>
                                <main className='container-data-pokemon'>

                                    <div className={` container-pokemon text-dark d-flex flex-column align-items-center`}>
                                        <h1 style={{ fontSize: "3rem" }} className="fw-bold text-center color-title">Habilidad {Ability.name}</h1>
                                        {
                                            Ability.description.texto === 0 && Ability.text_entries.length === 0 ?
                                                (
                                                    <>
                                                        <p className="fw-bold fs-2 text-center mt-5">Indroducido en la {generation[Ability.data.generation.name.replace(/-/g, "_")].name} <img style={{ marginBottom: "4px" }} src={generation[Ability.data.generation.name.replace(/-/g, "_")].icono} height="22px" alt="generación" />. No se posee Descripcion</p>
                                                    </>
                                                ) :
                                                (
                                                    <section className="d-flex flex-column flex-md-row mt-3 justify-content-between align-items-center">

                                                        <p className="fw-semibold fs-5 m-0 w-70 text-justify mb-3  me-md-5 mb-md-0 text-description">
                                                            Indroducida en la {generation[Ability.data.generation.name.replace(/-/g, "_")].name} <img style={{ marginBottom: "4px" }} src={generation[Ability.data.generation.name.replace(/-/g, "_")].icono} height="22px" alt="generación" />.
                                                            Esta Habilidad posee el siguienete efecto (<span>{Ability.description.texto}</span>)
                                                        </p>
                                                        <div style={{ width: "100%", borderRadius: "30px", margin: "0px" }} className="container-state">
                                                            <Carrusel_Description descripciones={Ability.text_entries} />
                                                        </div>
                                                    </section>
                                                )
                                        }

                                        <section className="mt-5 w-100 d-flex flex-column align-items-center">
                                            <h2 style={{ fontSize: "2rem" }} className="fw-bold text-center color-title mb-3">Pokémones con la Habilidad {Ability.name} </h2>
                                            <List_Pokemon pokemones={Ability.data.pokemon} color={"state"} />
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

export default Data_Ability