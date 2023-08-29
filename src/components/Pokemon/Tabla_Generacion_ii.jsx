import React from 'react'
import icono_generacion_ii from '../../assets/iconos_generacion/Segunda_generación.png'


function Tabla_Generacion_ii({ Pokemon }) {
    return (
        <>
            <hr />
            <h3 className='d-flex  justify-content-center'>Generacion II <span className='ms-2 d-flex align-items-center justify-conter-center'><img width="50px" src={icono_generacion_ii} alt="Segunda Generacion" /></span></h3>
            <table className={`w-75 sombra rounded-3 text-dark bg-white ${Pokemon.especie.color.name} mb-3 mx-auto`}>
                <tbody>
                    <tr>
                        <td className='bg-info text-dark text-center fs-6 fw-bold py-2 border-bottom  border-dark border-2' colSpan="5">
                            Cristal
                        </td>
                    </tr>
                    <tr>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "80px" }} className="fs-6 m-0 fw-bold text-center">Frontal Normal</figcaption>
                                <img  className='object-fit' src={Pokemon.data.sprites.versions["generation-ii"]["crystal"].front_default} style={{maxWidth:"50px"}} alt="Cristal_img" />
                            </figure>
                        </td>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "80px" }} className="fs-6 m-0 fw-bold text-center">Frontal Shiny</figcaption>
                                <img  className='object-fit' src={Pokemon.data.sprites.versions["generation-ii"]["crystal"].front_shiny} style={{maxWidth:"50px"}} alt="Cristal_img" />
                            </figure>
                        </td>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "80px" }} className="fs-6 m-0 fw-bold text-center">Frontal  Shiny</figcaption>
                                <img  className='object-fit' src={Pokemon.data.sprites.versions["generation-ii"]["crystal"].front_transparent} style={{maxWidth:"50px"}} alt="Cristal_img" />
                            </figure>
                        </td>
                        <td className='border-bottom  border-dark border-2' colSpan="2">
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "80px" }} className="fs-6 m-0 fw-bold text-center">Frontal </figcaption>
                                <img  className='object-fit' src={Pokemon.data.sprites.versions["generation-ii"]["crystal"].front_shiny_transparent} style={{maxWidth:"50px"}} alt="Cristal_img" />
                            </figure>
                        </td>
                    </tr>
                    <tr>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "80px" }} className="fs-6 m-0 fw-bold text-center">Espalda Normal</figcaption>
                                <img  className='object-fit' src={Pokemon.data.sprites.versions["generation-ii"]["crystal"].back_default} style={{maxWidth:"50px"}} alt="Cristal_img" />
                            </figure>
                        </td>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "80px" }} className="fs-6 m-0 fw-bold text-center">Espalda Shiny</figcaption>
                                <img  className='object-fit' src={Pokemon.data.sprites.versions["generation-ii"]["crystal"].back_shiny} style={{maxWidth:"50px"}} alt="Cristal_img" />
                            </figure>
                        </td>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "80px" }} className="fs-6 m-0 fw-bold text-center">Espalda  Shiny</figcaption>
                                <img  className='object-fit' src={Pokemon.data.sprites.versions["generation-ii"]["crystal"].back_shiny_transparent} style={{maxWidth:"50px"}} alt="Cristal_img" />
                            </figure>
                        </td>
                        <td className='border-bottom border-dark border-2' colSpan="2">
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "80px" }} className="fs-6 m-0 fw-bold text-center">Espalda </figcaption>
                                <img  className='object-fit' src={Pokemon.data.sprites.versions["generation-ii"]["crystal"].back_transparent} style={{maxWidth:"50px"}} alt="Cristal_img" />
                            </figure>
                        </td>
                    </tr>
                    <tr>
                        <td className='bg-warning text-dark text-center fs-6 fw-bold py-2 border-bottom  border-dark border-2' colSpan="5">
                            Oro
                        </td>
                    </tr>
                    <tr>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "80px" }} className="fs-6 m-0 fw-bold text-center">Frontal Normal</figcaption>
                                <img  className='object-fit' src={Pokemon.data.sprites.versions["generation-ii"]["gold"].front_default} style={{maxWidth:"50px"}} alt="gold_img" />
                            </figure>
                        </td>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "80px" }} className="fs-6 m-0 fw-bold text-center">Espalda Normal</figcaption>
                                <img  className='object-fit' src={Pokemon.data.sprites.versions["generation-ii"]["gold"].back_default} style={{maxWidth:"50px"}} alt="gold_img" />
                            </figure>
                        </td>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "80px" }} className="fs-6 m-0 fw-bold text-center">Frontal Shiny</figcaption>
                                <img  className='object-fit' src={Pokemon.data.sprites.versions["generation-ii"]["gold"].front_shiny} style={{maxWidth:"50px"}} alt="gold_img" />
                            </figure>
                        </td>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "80px" }} className="fs-6 m-0 fw-bold text-center">Espalda Shiny</figcaption>
                                <img  className='object-fit' src={Pokemon.data.sprites.versions["generation-ii"]["gold"].back_shiny} style={{maxWidth:"50px"}} alt="gold_img" />
                            </figure>
                        </td>
                        <td className='border-bottom border-dark border-2'>
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "80px" }} className="fs-6 m-0 fw-bold text-center">Frontal </figcaption>
                                <img  className='object-fit' src={Pokemon.data.sprites.versions["generation-ii"]["gold"].front_transparent} style={{maxWidth:"50px"}} alt="gold_img" />
                            </figure>
                        </td>
                    </tr>
                    <tr>
                        <td className='bg-body-secondary text-dark text-center fs-6 fw-bold py-2 border-bottom  border-dark border-2' colSpan="5">
                            Plata
                        </td>
                    </tr>
                    <tr>
                        <td className='border-end border-dark border-2'>
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "80px" }} className="fs-6 m-0 fw-bold text-center">Frontal Normal</figcaption>
                                <img  className='object-fit' src={Pokemon.data.sprites.versions["generation-ii"]["silver"].front_default} style={{maxWidth:"50px"}} alt="silver_img" />
                            </figure>
                        </td>
                        <td className='border-end border-dark border-2'>
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "80px" }} className="fs-6 m-0 fw-bold text-center">Espalda Normal</figcaption>
                                <img  className='object-fit' src={Pokemon.data.sprites.versions["generation-ii"]["silver"].back_default} style={{maxWidth:"50px"}} alt="silver_img" />
                            </figure>
                        </td>
                        <td className='border-end border-dark border-2'>
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "80px" }} className="fs-6 m-0 fw-bold text-center">Frontal Shiny</figcaption>
                                <img  className='object-fit' src={Pokemon.data.sprites.versions["generation-ii"]["silver"].front_shiny} style={{maxWidth:"50px"}} alt="silver_img" />
                            </figure>
                        </td>
                        <td className='border-end border-dark border-2'>
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "80px" }} className="fs-6 m-0 fw-bold text-center">Espalda Shiny</figcaption>
                                <img  className='object-fit' src={Pokemon.data.sprites.versions["generation-ii"]["silver"].back_shiny} style={{maxWidth:"50px"}} alt="silver_img" />
                            </figure>
                        </td>
                        <td className='border-dark border-2'>
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "80px" }} className="fs-6 m-0 fw-bold text-center">Frontal </figcaption>
                                <img  className='object-fit' src={Pokemon.data.sprites.versions["generation-ii"]["silver"].front_transparent} style={{maxWidth:"50px"}} alt="silver_img" />
                            </figure>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Tabla_Generacion_ii