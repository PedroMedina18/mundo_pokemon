import { useEffect, useState } from "react";
import { BuscarDataItem, BuscarAPI } from '../../js/peticiones'
import Loading from '../Loading'
import Error from '../Error404'
import List_Pokemon from "../List_Pokemon";
import { useNavigate } from "react-router-dom";
import Card_Data_Item from "./Card_Data_Item";
import Carrusel_Description from "../Carrusel_Description"


function Data_Item({ item }) {
    const [Item, setItem] = useState()
    const [error, setError] = useState({ state: false, })
    const navigate = useNavigate()
    useEffect(() => {
        BuscarItem()
    }, [])
    const BuscarItem = async () => {
        try {
            const res = await BuscarDataItem(item)

            // !------busuqedad del nombre------
            let name = res.data.names.filter((element) => element.language.name === "es")
            if (name.length === 0) {
                name = res.data.names.filter((element) => element.language.name === "en")

            }
            document.title = `${name.length !== 0 ? name[0].name : res.data.name.replace(/\-/g, " ")} | Pokémon`
            if (!isNaN(item)) {
                navigate(`/item/${res.data.name}`, { replace: true })
            }

            //!busquedad de la efecto y su traduccion
            let effect = res.data.effect_entries.filter((element) => element.language.name === "es")
            if (effect.length === 0) {
                effect = res.data.effect_entries.filter((element) => element.language.name === "en")
                if (effect.length === 0) {
                    effect = null
                } else {

                    effect[0].effect = effect[0].effect.replace(/\n/g, " ")
                    effect[0].short_effect = effect[0].short_effect.replace(/\n/g, " ")
                    const traduccion_effect = await BuscarAPI(`https://api.mymemory.translated.net/get?q=${effect[0].effect}&langpair=en|es&de=medinapedrito2@gmail.com`)
                    const traduccion_short_effect = await BuscarAPI(`https://api.mymemory.translated.net/get?q=${effect[0].short_effect}&langpair=en|es&de=medinapedrito2@gmail.com`)
                    effect[0].effect = traduccion_effect.data.responseData.translatedText
                    effect[0].short_effect = traduccion_short_effect.data.responseData.translatedText
                }
            } else {
                effect[0].effect = effect[0].effect.replace(/\n/g, " ")
                effect[0].short_effect = effect[0].short_effect.replace(/\n/g, " ")
            }

            //!busquedad de las entradas de texto
            let descripciones = res.data.flavor_text_entries.filter((elemento) => elemento.language.name === "es")
            if (descripciones.length === 0) {
                descripciones = res.data.effect_entries.filter((elemento) => elemento.language.name === "en")

                for (const descripcion of descripciones) {
                    const flavor_text = descripcion.text.replace(/\n/g, " ")
                    const traduccion = await BuscarAPI(`https://api.mymemory.translated.net/get?q=${flavor_text}&langpair=en|es&de=medinapedrito2@gmail.com`)
                    descripcion.descripcion = traduccion.data.responseData.translatedText
                    descripcion.version = descripcion.version_group.name
                }
            } else {

                for (const descripcion of descripciones) {
                    const flavor_text = descripcion.text.replace(/\n/g, " ")
                    descripcion.descripcion = flavor_text
                    descripcion.version = descripcion.version_group.name
                }
            }

            //!busquedad la categoria del item
            const categoria = await BuscarAPI(res.data.category.url)

            let name_category = categoria.data.names.filter((element) => element.language.name === "es")
            if (name_category.length === 0) {
                name_category = categoria.data.names.filter((element) => element.language.name === "en")
            }

            setItem({
                ...Item,
                data: res.data,
                name: name.length !== 0 ? name[0].name : res.data.name.replace(/\-/g, " "),
                efecto: effect ? effect[0] : effect,
                descripciones: descripciones,
                category: {
                    name: name_category.length !== 0 ? name_category[0].name : categoria.data.name.replace(/\-/g, " "),
                    pocket: categoria.data.pocket.name
                }
            })

        } catch (error) {
            console.log(`tenemos un error ${error}`)
            console.log(error)
            if (error.response.status === 404) {
                setError({
                    ...error,
                    state: true,
                })
                setItem([])
            }
        }
    }
    return (
        <>
            {
                Item ?
                    !error.state ?
                        (
                            <>
                                <main className='container-data-pokemon'>
                                    <div className="container-item">
                                        <div className={`container-pokemon text-dark d-flex flex-column align-items-center`}>
                                            <h1 style={{ fontSize: "3rem" }} className="fw-bold text-center color-title">{Item.name}</h1>
                                            <section className="d-flex justify-content-evenly flex-column flex-md-row mt-4 w-100 align-items-center " style={{ height: "max-content" }}>
                                                <div className="d-flex flex-column  justify-content-evenly align-self-md-stretch container-description-item" >
                                                    <p style={{ height: "max-content", fontWeight: "500" }} className=" fs-4 m-0 text-justify">{Item.efecto ? Item.efecto.effect : "No se tiene ningun efecto registrado"}</p>
                                                    {
                                                        Item.descripciones.length !== 0 ?
                                                            (<>
                                                                <div style={{ width: "100%", borderRadius: "30px" }} className="container-item">
                                                                    <Carrusel_Description descripciones={Item.descripciones} />
                                                                </div>
                                                            </>
                                                            )
                                                            :
                                                            (<></>)
                                                    }
                                                </div>
                                                <Card_Data_Item item={Item} />
                                            </section>

                                            {
                                                Item.data.held_by_pokemon.length !== 0 ?
                                                    (<>
                                                        <section className="mt-3 d-flex flex-column justify-content-center align-items-center w-90">
                                                            <h2 className="fw-bold text-center color-title fs-2 mb-0">Pokémones que pueden tener {Item.name} en estado salvaje</h2>
                                                            <div style={{ width: "100%" }} className="container-item">
                                                                <div className="w-100 container-pokemon p-0">
                                                                    <List_Pokemon pokemones={Item.data.held_by_pokemon} color={"color-item"} />
                                                                </div>
                                                            </div>
                                                        </section>
                                                    </>) :
                                                    (<></>)
                                            }
                                        </div>
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

export default Data_Item