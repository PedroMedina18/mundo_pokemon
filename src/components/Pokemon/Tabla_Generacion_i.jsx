import React from 'react'
import icono_generacion_i from '../../assets/iconos_generacion/Primera_generación.png'

function Tabla_Generacion_i({ Pokemon }) {
    return (
        <>
            <hr />
            <h3 className='d-flex  justify-content-center'>Generacion I <span className='ms-2 d-flex align-items-center justify-conter-center'><img width="50px" src={icono_generacion_i} alt="Primera Generacion" /></span></h3>
            <table className={`tabla-g-i sombra rounded-3 text-dark bg-white ${Pokemon.especie.color.name} mb-3 mx-auto`}>

                <tbody>
                    <tr >
                        <td className='azul-red text-white text-center fs-6 fw-bold py-2 border-bottom  border-dark border-2' colSpan="3">
                            Rojo y Azul
                        </td>
                    </tr>

                    <tr>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Frontal Normal</figcaption>
                                <img width="120px" height="120px" className='object-fit' src={Pokemon.data.sprites.versions["generation-i"]["red-blue"].front_default} alt="generacion-i-red-blue" />
                            </figure>
                        </td>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Frontal Gris</figcaption>
                                <img width="120px" height="120px" className='object-fit' src={Pokemon.data.sprites.versions["generation-i"]["red-blue"].front_gray} alt="generacion-i-red-blue" />
                            </figure>
                        </td>
                        <td className='border-bottom border-dark border-2'>
                            <figure className='d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Frontal Transparente</figcaption>
                                <img width="120px" height="120px" className='object-fit' src={Pokemon.data.sprites.versions["generation-i"]["red-blue"].front_transparent} alt="generacion-i-red-blue" />
                            </figure>
                        </td>
                    </tr>
                    <tr>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Espalda Normal</figcaption>
                                <img width="120px" height="120px" className='object-fit' src={Pokemon.data.sprites.versions["generation-i"]["red-blue"].back_default} alt="generacion-i-red-blue" />
                            </figure>
                        </td>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Espalda Gris</figcaption>
                                <img width="120px" height="120px" className='object-fit' src={Pokemon.data.sprites.versions["generation-i"]["red-blue"].back_gray} alt="generacion-i-red-blue" />
                            </figure>
                        </td>
                        <td className='border-bottom  border-dark border-2'>
                            <figure className='d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Espalda Transparente</figcaption>
                                <img width="120px" height="120px" className='object-fit' src={Pokemon.data.sprites.versions["generation-i"]["red-blue"].back_transparent} alt="generacion-i-red-blue" />
                            </figure>
                        </td>
                    </tr>
                    <tr>
                        <td className='bg-warning text-dark text-center fs-6 fw-bold py-2 border-bottom border-dark border-2' colSpan="3">Amarillo</td>
                    </tr>
                    <tr>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Frontal Normal</figcaption>
                                <img width="120px" height="120px" className='object-fit' src={Pokemon.data.sprites.versions["generation-i"]["yellow"].front_default} alt="generacion-i-Amarillo" />
                            </figure>
                        </td>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Frontal Gris</figcaption>
                                <img width="120px" height="120px" className='object-fit' src={Pokemon.data.sprites.versions["generation-i"]["yellow"].front_gray} alt="generacion-i-Amarillo" />
                            </figure>
                        </td>
                        <td className='border-bottom border-dark border-2'>
                            <figure className='d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Frontal Transparente</figcaption>
                                <img width="120px" height="120px" className='object-fit' src={Pokemon.data.sprites.versions["generation-i"]["yellow"].front_transparent} alt="generacion-i-Amarillo" />
                            </figure>
                        </td>
                    </tr>
                    <tr>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Espalda Normal</figcaption>
                                <img width="120px" height="120px" className='object-fit' src={Pokemon.data.sprites.versions["generation-i"]["yellow"].back_default} alt="generacion-i-Amarillo" />
                            </figure>
                        </td>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Espalda Gris</figcaption>
                                <img width="120px" height="120px" className='object-fit' src={Pokemon.data.sprites.versions["generation-i"]["yellow"].back_gray} alt="generacion-i-Amarillo" />
                            </figure>
                        </td>
                        <td className='border-bottom  border-dark border-2'>
                            <figure className='d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Espalda Transparente</figcaption>
                                <img width="120px" height="120px" className='object-fit' src={Pokemon.data.sprites.versions["generation-i"]["yellow"].back_transparent} alt="generacion-i-Amarillo" />
                            </figure>
                        </td>
                    </tr>
                </tbody>
            </table>

        </>
    )
}

export default Tabla_Generacion_i