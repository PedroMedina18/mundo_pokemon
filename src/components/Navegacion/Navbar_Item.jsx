import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BuscarAPI, BuscarDataPokemon, BuscarDataType, BuscarDataAbility, ListarPokemon } from '../../js/peticiones'
function Navbar_Item({ setItems, setArrays, setCoincidencias, setPagina, item, item_array }) {
    const { item_category, DividirArreglos } = useContext(AuthContext)
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

    const BusquedadAvanzada = async (e) => {
        e.preventDefault()
        setItems([])
        setArrays(null)
        const AllArrays = []

        const categoria = e.target.category.value
        const atributo = e.target.attribute.value === "" ? null : e.target.attribute.value
        const bolsillo = e.target.item_pocket.value === "" ? null : e.target.item_pocket.value
        const efecto = e.target.item_fling_effect.value === "" ? null : e.target.item_fling_effect.value

        if (categoria !== "Ninguno") {
            const resultados = await buscarItem(`https://pokeapi.co/api/v2/item-category/${categoria}/`)
            AllArrays.push(resultados)
        }
        if (efecto !== null) {
            const resultados = await buscarItem(`https://pokeapi.co/api/v2/item-fling-effect/${efecto}/`)
            AllArrays.push(resultados)
        }
        if (atributo !== null) {
            const resultados = await buscarItem(`https://pokeapi.co/api/v2/item-attribute/${atributo}/`)
            AllArrays.push(resultados)
        }
        if (bolsillo !== null) {
            const resultados = await buscarBolsillo(bolsillo)
            AllArrays.push(resultados)
        }

        if (AllArrays.length > 0) {
            if (AllArrays.length === 1) {
                setCoincidencias(true)
                setPagina(1)
                item_array({ page: 1, array: DividirArreglos(AllArrays[0], 15) })
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
                    item_array({ page: 1, array: DividirArreglos(listResult, 15) })
                } else {
                    setCoincidencias(false)
                    setItems([0, 1])
                }

            }
        } else {
            setCoincidencias(true)
            setPagina(1)
            setArrays(null)
            item(1)
        }
    }

    const buscarItem = async (url) => {
        const res = await BuscarAPI(url)
        const listItems = res.data.items
        return listItems
    }

    const buscarBolsillo = async (bolsillo) => {
        const res = await BuscarAPI(`https://pokeapi.co/api/v2/item-pocket/${bolsillo}/`)
        let listItems = []
        for (const category of res.data.categories) {
            const res_category = await BuscarAPI(category.url)
            const newlist = listItems.concat(res_category.data.items)
            listItems = newlist
        }
        return listItems
    }

    return (
        <nav className='w-100 d-flex flex-column justify-content-center align-items-center py-3 navbar-item'>
            <div className="d-flex w-80 align-items-center  justify-content-center">
                <p className='fs-4 w-100 text-center fw-bold text-white my-2'>¡Utiliza La Busquedad Avanzada para encontrar el item que buscas!</p>
            </div>
            <div className="collapse w-100" id="menu_avanzado_item" >
                <form onSubmit={(e) => { BusquedadAvanzada(e) }} className="w-100 px-3 px-lg-5 d-flex flex-column align-items-center" >
                    <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-lg-between  w-100 gap-3">
                        <div className="d-flex flex-column align-items-start justify-content-start text-white fw-semibold ">
                            <p className="fs-4 text-white fw-bold mb-1 text-center">Atríbuto</p>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="countable" value={"countable"} name="attribute" />
                                <label htmlFor="countable">Contable</label>
                            </div>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="consumable" value={"consumable"} name="attribute" />
                                <label htmlFor="consumable">Consumible</label>
                            </div>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="usable-overworld" value={"usable-overworld"} name="attribute" />
                                <label htmlFor="usable-overworld">Supramundo Utilizable</label>
                            </div>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="usable-in-battle" value={"usable-in-battle"} name="attribute" />
                                <label htmlFor="usable-in-battle">Utilizable en batalla</label>
                            </div>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="holdable" value={"holdable"} name="attribute" />
                                <label htmlFor="holdable">Retenible</label>
                            </div>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="holdable-passive" value={"holdable-passive"} name="attribute" />
                                <label htmlFor="holdable-passive">Retenible Pasivo</label>
                            </div>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="holdable-active" value={"holdable-active"} name="attribute" />
                                <label htmlFor="holdable-active">Retenible activo</label>
                            </div>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="underground" value={"underground"} name="attribute" />
                                <label htmlFor="underground">Subterráneo</label>
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-start justify-content-start text-white fw-semibold">
                            <p className="fs-4 text-white fw-bold mb-1 text-center">Bolsillo</p>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="misc" value={"misc"} name="item_pocket" />
                                <label htmlFor="misc">Objetos</label>
                            </div>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="medicine" value={"medicine"} name="item_pocket" />
                                <label htmlFor="medicine">Medicinas</label>
                            </div>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="pokeballs" value={"pokeballs"} name="item_pocket" />
                                <label htmlFor="pokeballs">Pokeballs</label>
                            </div>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="machines" value={"machines"} name="item_pocket" />
                                <label htmlFor="machines">MT y MO</label>
                            </div>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="berries" value={"berries"} name="item_pocket" />
                                <label htmlFor="berries">Bayas</label>
                            </div>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="mail" value={"mail"} name="item_pocket" />
                                <label htmlFor="mail">MT y MO</label>
                            </div>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="battle" value={"battle"} name="item_pocket" />
                                <label htmlFor="battle">Objetos de combate</label>
                            </div>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="key" value={"key"} name="item_pocket" />
                                <label htmlFor="key">Objetos clave</label>
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-start justify-content-start text-white fw-semibold">
                            <p className="fs-4 text-white fw-bold mb-1 text-center">Efecto de Arrojar</p>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="badly-poison" value={"badly-poison"} name="item_fling_effect" />
                                <label htmlFor="badly-poison">Mal Veneno</label>
                            </div>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="burn" value={"burn"} name="item_fling_effect" />
                                <label htmlFor="burn">Quemar</label>
                            </div>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="berry-effect" value={"berry-effect"} name="item_fling_effect" />
                                <label htmlFor="berry-effect">Efecto Baya</label>
                            </div>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="herb-effect" value={"herb-effect"} name="item_fling_effect" />
                                <label htmlFor="herb-effect">Efecto Hierba</label>
                            </div>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="paralyze" value={"paralyze"} name="item_fling_effect" />
                                <label htmlFor="paralyze">Paralizar</label>
                            </div>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="poison" value={"poison"} name="item_fling_effect" />
                                <label htmlFor="poison">Veneno</label>
                            </div>
                            <div className="d-flex">
                                <input className="cyberpunk-checkbox" onClick={(e) => { uncheckRadio(e) }} type="radio" id="flinch" value={"flinch"} name="item_fling_effect" />
                                <label htmlFor="flinch">Retroceder</label>
                            </div>

                        </div>
                        <div className="d-flex flex-column align-items-center ">
                            <label htmlFor="attribute" className="fs-4 text-white fw-bold mb-1">Categoría</label>
                            <select className="selet-habilidad" defaultValue={"Ninguno"} size={8} aria-label="Size 3 select example" name="category" id="category">
                                <option value={"Ninguno"}>All</option>
                                {
                                    item_category ?
                                        item_category.map((element, index) => (
                                            <option key={`category_${index}`} value={element.name_original}>{element.name}</option>
                                        ))
                                        :
                                        (<></>)
                                }
                            </select>
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

export default Navbar_Item