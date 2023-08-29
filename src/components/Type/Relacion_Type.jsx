import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import doble from '../../assets/daño/25px-X2.png'
import normal from '../../assets/daño/25px-1-2.png'
import cero from '../../assets/daño/25px-X0.png'
import { Link } from "react-router-dom";

function Relacion_Type({ type }) {
    const { types } = useContext(AuthContext)
    return (
        <>
        <h1 className="text-center fs-2 fw-bold mt-3">Relación de Daño</h1>
            <table style={{ borderWidth: "3px", background: "transparent" }} className={`${type.data.name} rounded-3 w-100`}>
                <thead>
                    <tr>
                        <th className={`text-center ${type.data.name}`} style={{ width: "30%", borderWidth: "3px", fontSize: "1.1rem", borderRight: "0px" }}>Daño Recibido</th>
                        <th className={`text-center ${type.data.name}`} style={{ width: "70%", borderWidth: "3px", fontSize: "1.1rem" }}>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th style={{ borderWidth: "3px", backgroundColor: "transparent", borderTop: "0px", borderRight: "0px", height: "100%", lineHeight: "25px" }} className={`px-1 py-2 ${type.data.name}`}>
                            <div className='d-flex justify-content-center align-items-center ' style={{ height: "100%" }}>
                                <img src={doble} alt="doble" className="me-auto" width="30px" />
                                <p className="m-0 text-dark" style={{ width: "129px" }}>Debil a:</p>
                            </div>
                        </th>
                        <th style={{ borderWidth: "3px", backgroundColor: "transparent", borderTop: "0px", height: "100%", lineHeight: "25px" }} className={` py-2 ${type.data.name}`}>
                            <div className="w-100 d-flex flex-wrap align-items-center justify-content-center">
                                {
                                    type.data.damage_relations.double_damage_from.length ?
                                        type.data.damage_relations.double_damage_from.map((element) => (
                                            <Link key={`double_damage_from_${element.name}`} className="ms-2 mt-1" to={`/tipo/${element.name}`}>
                                                <img src={types[element.name].nombre_mediano} alt={element.name} />
                                            </Link>
                                        ))
                                        :
                                        (<>---</>)
                                }
                            </div>
                        </th>
                    </tr>
                    <tr className={`${type.data.name}-opacity-bg-50`}>
                        <th style={{ borderWidth: "3px", backgroundColor: "transparent", borderTop: "0px", borderRight: "0px", height: "100%", lineHeight: "25px" }} className={`px-1 py-2 ${type.data.name}`}>
                            <div className='d-flex justify-content-center align-items-center ' style={{ height: "100%" }}>
                                <img src={normal} alt="normal" className="me-auto" width="30px" />
                                <p className="m-0 text-dark" style={{ width: "129px" }}>Resistente a:</p>
                            </div>
                        </th>

                        <th style={{ borderWidth: "3px", backgroundColor: "transparent", borderTop: "0px", height: "100%", lineHeight: "25px" }} className={` py-2 ${type.data.name}`}>
                            <div className="w-100 d-flex flex-wrap align-items-center justify-content-center">
                                {
                                    type.data.damage_relations.half_damage_from.length ?
                                        type.data.damage_relations.half_damage_from.map((element) => (
                                            <Link key={`half_damage_from_${element.name}`} className="ms-2 mt-1" to={`/tipo/${element.name}`}>
                                                <img src={types[element.name].nombre_mediano} alt={element.name} />

                                            </Link>
                                        ))
                                        :
                                        (<>---</>)
                                }
                            </div>
                        </th>
                    </tr>

                    <tr>
                        <th style={{ borderWidth: "3px", backgroundColor: "transparent", borderTop: "0px", borderRight: "0px", height: "100%", lineHeight: "25px" }} className={`px-1 py-2 ${type.data.name}`}>
                            <div className='d-flex justify-content-center align-items-center ' style={{ height: "100%" }}>
                                <img src={cero} alt="cero" className="me-auto" width="30px" />
                                <p className="m-0 text-dark" style={{ width: "129px" }}>Inmune a:</p>
                            </div>
                        </th>

                        <th style={{ borderWidth: "3px", backgroundColor: "transparent", borderTop: "0px", height: "100%", lineHeight: "25px" }} className={` py-2 ${type.data.name}`}>
                            <div className="w-100 d-flex flex-wrap align-items-center justify-content-center">
                                {
                                    type.data.damage_relations.no_damage_from.length ?
                                        type.data.damage_relations.no_damage_from.map((element) => (
                                            <Link key={`double_damage_from_${element.name}`} className="ms-2 mt-1" to={`/tipo/${element.name}`}>
                                                <img src={types[element.name].nombre_mediano} alt={element.name} />
                                            </Link>
                                        ))
                                        :
                                        (<p className="m-0 text-dark">---</p>)
                                }
                            </div>
                        </th>
                    </tr>
                </tbody>
            </table>


            <table style={{ borderWidth: "3px", background: "transparent" }} className={`${type.data.name} mt-3 rounded-3 w-100`}>
                <thead>
                    <tr>
                        <th className={`text-center ${type.data.name}`} style={{ width: "30%", borderWidth: "3px", fontSize: "1.1rem", borderRight: "0px" }}>Daño Dado</th>
                        <th className={`text-center ${type.data.name}`} style={{ width: "70%", borderWidth: "3px", fontSize: "1.1rem" }}>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th style={{ borderWidth: "3px", backgroundColor: "transparent", borderTop: "0px", borderRight: "0px", height: "100%", lineHeight: "25px" }} className={`px-1 py-2 ${type.data.name}`}>
                            <div className='d-flex justify-content-center align-items-center ' style={{ height: "100%" }}>
                                <img src={doble} alt="doble" className="me-auto" width="30px" />
                                <p className="m-0 text-dark" style={{ width: "160px" }}>Fuerte contra:</p>
                            </div>
                        </th>
                        <th style={{ borderWidth: "3px", backgroundColor: "transparent", borderTop: "0px", height: "100%", lineHeight: "25px" }} className={` py-2 ${type.data.name}`}>
                            <div className="w-100 d-flex flex-wrap align-items-center justify-content-center">
                                {
                                    type.data.damage_relations.double_damage_to.length ?
                                        type.data.damage_relations.double_damage_to.map((element, index) => (
                                            <Link key={`double_damage_to_${element.name}`} to={`/tipo/${element.name}`} className="ms-2 mt-1">
                                                <img src={types[element.name].nombre_mediano} alt={element.name} />

                                            </Link>
                                        ))
                                        :
                                        (<p className="m-0 text-dark">---</p>)
                                }
                            </div>
                        </th>
                    </tr>
                    <tr className={`${type.data.name}-opacity-bg-50`}>
                        <th style={{ borderWidth: "3px", backgroundColor: "transparent", borderTop: "0px", borderRight: "0px", height: "100%", lineHeight: "25px" }} className={`px-1 py-2 ${type.data.name}`}>
                            <div className='d-flex justify-content-center align-items-center ' style={{ height: "100%" }}>
                                <img src={normal} alt="normal" className="me-auto" width="30px" />
                                <p className="m-0 text-dark" style={{ width: "160px" }}> Poco Efectivo contra:</p>
                            </div>
                        </th>

                        <th style={{ borderWidth: "3px", backgroundColor: "transparent", borderTop: "0px", height: "100%", lineHeight: "25px" }} className={` py-2 ${type.data.name}`}>
                            <div className="w-100 d-flex flex-wrap align-items-center justify-content-center">
                                {
                                    type.data.damage_relations.half_damage_to.length ?
                                        type.data.damage_relations.half_damage_to.map((element, index) => (
                                            <Link key={`half_damage_to_${element.name}`} to={`/tipo/${element.name}`} className="ms-2 mt-1">
                                                <img src={types[element.name].nombre_mediano} alt={element.name} />

                                            </Link>
                                        ))
                                        :
                                        (<>---</>)
                                }
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th style={{ borderWidth: "3px", backgroundColor: "transparent", borderTop: "0px", borderRight: "0px", height: "100%", lineHeight: "25px" }} className={`px-1 py-2 ${type.data.name}`}>
                            <div className='d-flex justify-content-center align-items-center ' style={{ height: "100%" }}>
                                <img src={cero} alt="cero" className="me-auto" width="30px" />
                                <p className="m-0 text-dark" style={{ width: "160px" }}>Ineficiente  contra:</p>
                            </div>
                        </th>

                        <th style={{ borderWidth: "3px", backgroundColor: "transparent", borderTop: "0px", height: "100%", lineHeight: "25px" }} className={` py-2 ${type.data.name}`}>
                            <div className="w-100 d-flex flex-wrap align-items-center justify-content-center">
                                {
                                    type.data.damage_relations.no_damage_to.length ?
                                        type.data.damage_relations.no_damage_to.map((element, index) => (
                                            <Link key={`no_damage_to_${element.name}`} to={`/tipo/${element.name}`} className="ms-2 mt-1">
                                                <img src={types[element.name].nombre_mediano} alt={element.name} />

                                            </Link>
                                        ))
                                        :
                                        (<p className="m-0 text-dark">---</p>)
                                }
                            </div>
                        </th>
                    </tr>
                </tbody>

            </table>

        </>
    )
}

export default Relacion_Type