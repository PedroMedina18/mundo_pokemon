import { useContext, useEffect, useState } from "react";
import { BuscarAPI } from '../../js/peticiones'
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function List_Movimientos({ Pokemon }) {
    const { types, move_class, move_learn_method } = useContext(AuthContext)
    const [Moves, setMoves] = useState()
    // donde se guardan los tipos de movimiento y los movimientos de respaldo
    const [Moves_back, setMoves_back] = useState()
    const [tipo, setTipos] = useState()
    // estos dos identificadores son para ordenar los movimientos por clase y tipos
    const [Clase, setClase] = useState(0)
    const [tipos_N, settipos_N] = useState(0)
    const [A_Z, sett_A_Z] = useState(0)

    useEffect(() => {
        Buscar_Movimientos()
    }, [])

    const Buscar_Movimientos = async () => {
        const movimientos = []
        const tipos = []
        for (const movimiento of Pokemon.data.moves) {

            const respuesta_movimiento = await BuscarAPI(movimiento.move.url)
            let nombre = respuesta_movimiento.data.names.filter(element => element.language.name === "es")

            if (nombre.length === 0) {
                nombre = respuesta_movimiento.data.names.filter(element => element.language.name === "en")
            }
            if (!tipos.includes(respuesta_movimiento.data.type.name)) {
                tipos.push(respuesta_movimiento.data.type.name)
            }
            movimientos.push({
                id: respuesta_movimiento.data.id,
                name_original: movimiento.move.name,
                name: nombre[0].name,
                type: respuesta_movimiento.data.type,
                clase: respuesta_movimiento.data.damage_class,
                version_group_details: movimiento.version_group_details
            })
            if (movimientos.length > 10) {
                setMoves(movimientos)
                setMoves_back(movimientos)
            }
        }
        setTipos(tipos)
    }
    const ordernarClase = () => {
        const clase_numero = Clase + 1
        if (clase_numero === 1) {
            const moves = Moves_back.filter(element => element.clase.name === "physical")
            const no_class=Moves_back.filter(element=> element.clase.name!=="physical")
            const list_result=moves.concat(no_class)
            setClase(clase_numero)
            setMoves(list_result)
        }
        if (clase_numero === 2) {
            const moves = Moves_back.filter(element => element.clase.name === "special")
            const no_class=Moves_back.filter(element=> element.clase.name!=="special")
            const list_result=moves.concat(no_class)
            setClase(clase_numero)
            setMoves(list_result)
        }
        if (clase_numero === 3) {
            const moves = Moves_back.filter(element => element.clase.name === "status")
            const no_class=Moves_back.filter(element=> element.clase.name!=="status")
            const list_result=moves.concat(no_class)
            setClase(0)
            setMoves(list_result)
        }
    }
    const ordernarMovimiento = () => {
        const moves = Moves_back.filter(element => element.type.name === tipo[tipos_N])
        const no_types=Moves_back.filter(element=> element.type.name!==tipo[tipos_N])
        const list_result=moves.concat(no_types)
        const tipo_numero = tipos_N + 1
        if (tipo_numero > (tipo.length - 1)) {
            settipos_N(0)
            setMoves(list_result)
        } else {
            settipos_N(tipo_numero)
            setMoves(list_result)
        }
    }
    const ordernarAlfabeticamente = () => {
        const tipo_numero = A_Z + 1
        if(tipo_numero===1){
            const moves = Moves_back.sort((a, b) => {
                return a.name.localeCompare(b.name)
            })
            sett_A_Z(tipo_numero)
            setMoves(moves)
            return
        }
        if(tipo_numero===2){
            const moves = Moves_back.sort((a, b) => {
                return b.name.localeCompare(a.name)
            })
            sett_A_Z(0)
            setMoves(moves)
            return
        }
    }
    return (

        <div className={`accordion accordion-flush w-100 bg-body-tertiary rounded-3 d-flex flex-column align-items-center sombra ${Pokemon.especie.color.name}`} style={{ minHeight: "300px" }} id="accordionExample">
            {
                Moves ?
                    (
                        <>
                            <div className="w-100 d-flex py-2">
                                <div className="fs-5 w-100 d-flex align-items-center justify-content-around text-dark">
                                    <p className="m-0 fw-bold text-center" style={{ width: "20px" }}>N°</p>
                                    <p onClick={() => { ordernarAlfabeticamente() }}  className="m-0 fw-bold text-center cursor-pointer seleccionador" style={{ width: "180px" }}>Nombre <span className="ms-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" /></svg></span></p>
                                    <p onClick={() => { ordernarMovimiento() }} className="m-0 fw-bold text-center cursor-pointer seleccionador" style={{ width: "120px" }}>Tipo <span className="ms-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" /></svg></span></p>
                                    <p onClick={() => { ordernarClase() }} className="m-0 fw-bold cursor-pointer seleccionador d-none d-sm-flex" style={{ width: "80px" }}>Clase <span className="ms-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" /></svg></span></p>

                                </div>
                                <div style={{ width: "10%" }}>
                                </div>
                            </div>
                            {
                                Moves.map((move, index) => (
                                    <div key={`${move.name_original}_${index}`} className={` accordion-item w-100 border-0`}>

                                        <div className={`${((index + 1) % 2) !== 0 ? `bg-opacity-50-${Pokemon.especie.color.name}` : "bg-transparent"} accordion-header d-flex border-list ${Pokemon.especie.color.name}`}>
                                            <Link className="w-100 d-flex align-items-center justify-content-around text-link-move " to={`/movimiento/${move.name_original}`}>
                                                <span className="text-center" style={{ width: "20px" }}>{index + 1}</span>
                                                <span className="text-center" style={{ width: "180px" }}>{move.name}</span>
                                                <span>
                                                    <img src={types[move.type.name].nombre_mediano} alt="tipo" />
                                                </span>
                                                <span className="tooltip-new d-none d-sm-flex" style={{ width: "80px" }}>
                                                    <img src={move_class[move.clase.name].icono_pequeño} height="30px" alt="clase" />
                                                    <span className="tooltip-new-box">{move_class[move.clase.name].name}</span>
                                                </span>
                                            </Link>
                                            <button style={{ width: "10%" }} className="accordion-button collapsed d-flex align-items-center justify-content-center" type="button" data-bs-toggle="collapse" data-bs-target={`#${move.name_original}_${index}`} aria-expanded="false" aria-controls={`${move.name_original}_${index}`}>

                                            </button>
                                        </div>
                                        <div id={`${move.name_original}_${index}`} className={`${((index + 1) % 2) === 0 ? `bg-opacity-50-${Pokemon.especie.color.name}` : "bg-transparent"} w-100 collapse text-dark border-list ${Pokemon.especie.color.name}`} >
                                            <div className="accordion-body d-flex flex-column justify-content-center align-items-center">
                                                <h3 className="fs-5 text-center fw-bold">Detalles por Grupo de Versión</h3>
                                                <table className="border border-dark  border-2 rounded-3 table table-striped table-move-poke overflow-hidden">
                                                    <thead>
                                                        <tr >
                                                            <th style={{ width: "20%" }} className="text-center fs-5" scope="col">Nivel</th>
                                                            <th style={{ width: "40%" }} className="text-center fs-5" scope="col">Metodo</th>
                                                            <th style={{ width: "40%" }} className="text-center fs-5" scope="col">Version</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            move.version_group_details.map((element, index) => (
                                                                <tr key={`${move.name}_${element.version_group.name}_${index}`}>
                                                                    <th scope="row" className="text-center fw-semibold text-capitalize">{element.level_learned_at}</th>
                                                                    <td className="tooltip-new text-center fw-semibold text-capitalize">{move_learn_method[element.move_learn_method.name.replace(/-/g, "_")].name} <samp className="tooltip-new-box">{move_learn_method[element.move_learn_method.name.replace(/-/g, "_")].description}</samp></td>
                                                                    <td className=" text-center fw-semibold text-capitalize">{element.version_group.name.replace(/-/g, " ")}</td>

                                                                </tr>
                                                            ))
                                                        }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    )
                    :
                    (
                        <div className="m-0 w-100 d-flex justify-content-center mt-5">
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

export default List_Movimientos