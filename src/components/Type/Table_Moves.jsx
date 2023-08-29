import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BuscarAPI } from '../../js/peticiones'

function Table_Moves({ moves, color }) {
    const { types, move_class } = useContext(AuthContext)
    const [listMoves, setListMoves] = useState()
    // donde se guardan los tipos y los movimientos de respaldo
    const [listMoves_back, setListMoves_back] = useState()
    const [tipos, setTipos] = useState()
    // estos dos identificadores son para ordenar los movimientos por clase y tipos
    const [Clase, setClase] = useState(0)
    const [tipo_N, settipo_N] = useState(0)
    const [A_Z, sett_A_Z] = useState(0)
    useEffect(() => {
        listarMoves()
    }, [])
    const listarMoves = async () => {
        const movimientos = []
        const tipos = []
        for (const move of moves) {
            const respuesta_movimiento = await BuscarAPI(move.url)
            let nombre = respuesta_movimiento.data.names.filter(element => element.language.name === "es")

            if (nombre.length === 0) {
                nombre = respuesta_movimiento.data.names.filter(element => element.language.name === "en")
            }
            if (!tipos.includes(respuesta_movimiento.data.type.name)) {
                tipos.push(respuesta_movimiento.data.type.name)
            }
            movimientos.push({
                name_original: move.name,
                name: nombre[0].name,
                type: respuesta_movimiento.data.type,
                clase: respuesta_movimiento.data.damage_class,
            })
            if (movimientos.length > 10) {
                setListMoves(movimientos)
                setListMoves_back(movimientos)
            }
        }
        setTipos(tipos)
    }
    const ordernarMovimiento = () => {
        const moves = listMoves_back.filter(element => element.type.name === tipos[tipo_N])
        const no_types=listMoves_back.filter(element=> element.type.name !== tipos[tipo_N])
        const list_result=moves.concat(no_types)
        setListMoves(list_result)

        const tipo_numero = tipo_N + 1
        if (tipo_numero > (tipos.length - 1)) {
            settipo_N(0)
        } else {
            settipo_N(tipo_numero)
        }
    }
    const ordernarClase = () => {
        let clase_numero = Clase + 1
        if (clase_numero === 1) {
            const moves = listMoves_back.filter(element => element.clase.name === "physical")
            const no_class=listMoves_back.filter(element=> element.clase.name!=="physical")
            const list_result=moves.concat(no_class)
            setClase(clase_numero)
            setListMoves(list_result)
        }
        if (clase_numero === 2) {
            const moves = listMoves_back.filter(element => element.clase.name === "special")
            const no_class=listMoves_back.filter(element=> element.clase.name!=="special")
            const list_result=moves.concat(no_class)
            setClase(clase_numero)
            setListMoves(list_result)
        }
        if (clase_numero === 3) {
            const moves = listMoves_back.filter(element => element.clase.name === "status")
            const no_class=listMoves_back.filter(element=> element.clase.name!=="status")
            const list_result=moves.concat(no_class)
            setClase(0)
            setListMoves(list_result)
        }
    }
    const ordernarAlfabeticamente = () => {
        let tipo_numero = A_Z + 1
        if(tipo_numero===1){
            const moves = listMoves_back.sort((a, b) => {
                return a.name.localeCompare(b.name)
                
            })
            sett_A_Z(tipo_numero)
            setListMoves(moves)
        }
        if(tipo_numero===2){
            const moves = listMoves_back.sort((a, b) => {
                return b.name.localeCompare(a.name)
                
            })
            sett_A_Z(0)
            setListMoves(moves)
        }
    }
    return (

        <div className={`oferflow-component tabla-move mx-auto ${color} rounded-3`}>
            <table style={{ borderWidth: "0px", background: "transparent", height: "510px" }} className={` ${color} rounded-3 w-100`}>
                {
                    listMoves ?
                        (
                            <>
                                <thead>
                                    <tr className={` px-2`}>
                                        <th className={`text-center ${color}`} style={{ width: "8%", borderWidth: "3px", fontSize: "1.1rem", borderRight: "0px" }}>N°</th>
                                        <th onClick={() => { ordernarAlfabeticamente() }} className={`text-center ${color} cursor-pointer`} style={{ width: "40%", borderWidth: "3px", fontSize: "1.1rem", borderRight: "0px" }}><p className="m-0 seleccionador d-flex justify-content-center align-items-center">Nombre<span className="ms-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" /></svg></span></p></th>
                                        <th onClick={() => { ordernarMovimiento() }} className={`text-center ${color} cursor-pointer`} style={{ width: "30%", borderWidth: "3px", fontSize: "1.1rem", borderRight: "0px" }}><p className="m-0 seleccionador d-flex justify-content-center align-items-center">Tipo <span className="ms-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" /></svg></span></p></th>
                                        <th onClick={() => { ordernarClase() }} className={`text-center ${color} cursor-pointer `} style={{ width: "20%", borderWidth: "3px", fontSize: "1.1rem" }}><p className="m-0 seleccionador d-flex justify-content-center align-items-center">Clase <span className="ms-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" /></svg></span></p></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listMoves.map((element, index) => (
                                            <tr className={`${((index + 1) % 2) === 0 ? color : ""}-opacity-bg-50`} key={element.name_original}>
                                                <th style={{ borderWidth: "3px", background: "transparent", borderTop: "0px" }} className={`py-1 ${color}`} colSpan="4">
                                                    <Link className="d-block d-flex link-dark justify-content-between" to={`/movimiento/${element.name_original}`}>
                                                        <span className="text-center" style={{ width: "8%" }}>{index + 1}</span>
                                                        <span className="text-center" style={{ width: "40%" }}>{element.name}</span>
                                                        <span className="text-center" style={{ width: "30%" }}><img src={types[element.type.name].nombre_mediano} alt={element.type.name} /></span>
                                                        <span className="text-center " style={{ width: "20%" }}>
                                                            <img height="30px" src={move_class[element.clase.name].icono_pequeño} alt={element.clase.name}></img>
                                                        </span>
                                                    </Link>
                                                </th>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </>
                        )
                        :
                        (
                            <tbody>
                                <tr>
                                    <th style={{ borderWidth: "3px", background: "transparent" }} className={`${color} p-3`} >
                                        <div className="m-0 w-100 d-flex justify-content-center ">
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
                                    </th>
                                </tr>
                            </tbody>
                        )
                }
            </table>
        </div>
    )
}

export default Table_Moves