import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Card_Move_Data({ move }) {
    const { move_class, move_target, stats, move_ailment, move_category } = useContext(AuthContext)
    return (
        <div className={`${move.data.type.name} card-move`}>
            <div className='w-100'>
                <h1 className="fs-1 fw-bold text-center m-0">{move.name}</h1>
                <div className="d-flex justify-content-center align-items-center" id="title-move">
                    <p className="fs-5 fw-bold m-0 fst-italic">{move.data.names.filter(element => element.language.name === "en")[0].name}</p>
                    <p className="fs-5 fw-bold m-0 ms-3 fst-italic">( {move.data.names.filter(element => element.language.name === "ja")[0].name} )</p>
                </div>
            </div>
            <hr className="hr" />
            <h4 className="w-100 text-center fw-bold">Datos de Combate</h4>

            <div className="w-100 d-flex flex-column text-dark align-items-center justify-content-evenly bg-white bg-opacity-50 py-2 rounded-3">
                <p className=" fs-5 fw-bold my-1">Clase:
                    <span className="tooltip-new ms-3">
                        <img src={move_class[move.data.damage_class.name].icono_pequeño} height="30px" alt="clase" />
                        <span style={{ top: "0px" }} className="tooltip-new-box-ringh fw-bold">{move_class[move.data.damage_class.name].name}</span>
                    </span>
                </p>
                <hr className="hr my-1" />
                <p className=" fs-5 fw-bold mb-0 text-center">Potencia: {move.data.power ? move.data.power : "-"}</p>
                <hr className="hr my-1" />
                <p className=" fs-5 fw-bold mb-0 text-center">Precisión: {move.data.accuracy ? move.data.accuracy : "-"}</p>
                <hr className="hr my-1" />
                <p className=" fs-5 fw-bold mb-0 text-center">PP: {move.data.pp ? move.data.pp : "-"}</p>
                <hr className="hr my-1" />
                <p className=" fs-5 fw-bold mb-0 text-center">Prioridad: {move.data.priority === 0 ? 0 : move.data.priority}</p>

                {
                    move.data.effect_chance && move.effect ?
                        (
                            <>
                                <hr className="hr my-1" />
                                <div className="w-100 d-flex fs-5 fw-bold justify-content-around mb-0">
                                    <p style={{ width: "30%" }} className=" mb-0 text-center">Efecto Secundario: </p>
                                    <p className="w-60 mb-0 text-center">{move.effect.short_effect}</p>
                                </div>
                            </>
                        ) :
                        (<></>)
                }
                <hr className="hr my-1" />
                <p className="fs-5 fw-bold mb-0" >Contacto: {move.data.damage_class.name === "physical" ? "Si" : "No"}</p>
                <hr className="hr my-1" />
                <p className="fs-5 fw-bold mb-0" title={move_target[move.data.target.name.replace(/\-/g, "_")].description}>Objetivo: {move_target[move.data.target.name.replace(/\-/g, "_")].name}</p>

                {
                    move.data.stat_changes.length === 0 ?
                        (<></>)
                        :
                        (<>
                            <hr className="hr my-1" />
                            <h4 className="w-100 text-center fw-bold">Datos de Estadisticas</h4>
                            {
                                move.data.stat_changes.map((element) => (
                                    <p className="fs-5 fw-bold mb-0" key={element}>{stats[element.stat.name.replace(/\-/g, "_")].name}: {element.change}</p>
                                ))
                            }
                        </>)
                }

            </div>
            {
                move.data.meta ?
                    (<>
                        <hr className="hr" />
                        <h4 className="w-100 text-center fw-bold">Detalles del Movimiento</h4>
                        <div className="w-100 d-flex flex-column text-dark align-items-center justify-content-evenly bg-white bg-opacity-50 py-2 rounded-3 ">
                            <p className=" fs-5 fw-bold mb-0 text-center">Cambio de Estado: {move_ailment[move.data.meta.ailment.name.replace(/\-/g, "_")].name}</p>
                            {
                                move.data.meta.ailment_chance === 0 || move.data.meta.ailment.name === "none" ?
                                    (<></>) :
                                    (
                                        <>
                                            <hr className="hr my-1" />
                                            <p className=" fs-5 fw-bold mb-0 text-center">Probabilidad de Cambio de Estado: {move.data.meta.ailment_chance}%</p>
                                        </>
                                    )
                            }
                            <hr className="hr my-1" />
                            <div className="w-100 d-flex fs-5 fw-bold justify-content-around mb-0 align-items-center" id="categoria-movimiento" title={move_category[move.data.meta.category.name.replace(/\-|\+/g, "_")].description}>
                                <p className=" fs-5 fw-bold mb-0 text-center" >Categoría de Movimiento: </p>
                                <p className=" fs-5 fw-bold mb-0 text-center">{move_category[move.data.meta.category.name.replace(/\-|\+/g, "_")].name}</p>
                            </div>
                            {
                                move.data.meta.min_hits ?
                                    (
                                        <>
                                            <hr className="hr my-1" />
                                            <p>Número Mínimo de Golpes: {move.data.meta.min_hits}</p>
                                        </>
                                    ) :
                                    (<></>)
                            }
                            <hr className="hr my-1" />
                            <p className=" fs-5 fw-bold mb-0 text-center">Número Máximo de Golpes: {move.data.meta.max_hits ? move.data.meta.max_hits : 1}</p>
                            {
                                move.data.meta.ailment_chance === 0 ?
                                    (<></>) :
                                    (
                                        <>
                                            <hr className="hr my-1" />
                                            <p className=" fs-5 fw-bold mb-0 text-center" title="Máximo de Turnos que dura el Efecto">Turnos Máximo: {move.data.meta.max_turns ? move.data.meta.max_turns : "1"}</p>
                                        </>
                                    )

                            }
                            {
                                move.data.meta.ailment_chance === 0 || move.data.meta.max_turns === null ?
                                    (<></>) :
                                    (
                                        <>
                                            <hr className="hr my-1" />
                                            <p className=" fs-5 fw-bold mb-0 text-center" title="Mínimo de Turnos que dura el Efecto">Turnos Mínimo: {move.data.meta.min_turns ? move.data.meta.min_turns : "1"}</p>
                                        </>
                                    )
                            }
                            {
                                move.data.meta.drain === 0 ?
                                    (<></>) :
                                    move.data.meta.drain > 0 ?
                                        (
                                            <>
                                                <hr className="hr my-1" />
                                                <p className=" fs-5 fw-bold mb-0 text-center" title="Drenaje de HP en porcentaje del daño infligido.">Drenado de HP x daño infligido: {move.data.meta.drain}%</p>
                                            </>
                                        ) :
                                        (
                                            <>
                                                <hr className="hr my-1" />
                                                <p className=" fs-5 fw-bold mb-0 text-center" title="Daño de Retroceso en porcentaje del daño infligido.">Daño de Retroceso x daño infligido: {move.data.meta.drain}%</p>
                                            </>
                                        )
                            }
                            {
                                move.data.meta.healing === 0 ?
                                    (<></>) :
                                    (
                                        <>
                                            <hr className="hr my-1" />
                                            <p className=" fs-5 fw-bold mb-0 text-center" title="La cantidad de HP ganada por el Pokémon atacante, en porcentaje de su HP máximo.">Recuperacion: {move.data.meta.healing}%</p>
                                        </>
                                    )
                            }
                            {
                                move.data.meta.crit_rate === 0 ?
                                    (<></>) :
                                    (
                                        <>
                                            <hr className="hr my-1" />
                                            <p className=" fs-5 fw-bold mb-0 text-center" title="Bonificación de tasa de golpe crítico.">Bonificación de Golpe Crítico: {move.data.meta.crit_rate}%</p>
                                        </>
                                    )
                            }
                            {
                                move.data.meta.flinch_chance === 0 ?
                                    (<></>) :
                                    (
                                        <>
                                            <hr className="hr my-1" />
                                            <p className=" fs-5 fw-bold mb-0 text-center" title="La probabilidad de que este ataque haga que el Pokémon objetivo retroceda.">Oportunidad de Retroceder: {move.data.meta.crit_rate}%</p>
                                        </>
                                    )
                            }
                            {
                                move.data.meta.stat_chance === 0 ?
                                    (<></>) :
                                    (
                                        <>
                                            <hr className="hr my-1" />
                                            <p className=" fs-5 fw-bold mb-0 text-center" title="La probabilidad de que este ataque provoque un cambio en las estadísticas del Pokémon objetivo.">{move.data.meta.stat_chance}%</p>
                                        </>
                                    )
                            }
                        </div>
                    </>):
                    (<></>)
            }

        </div>
    )
}

export default Card_Move_Data