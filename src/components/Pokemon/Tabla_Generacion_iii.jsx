import icono_generacion_iii from '../../assets/iconos_generacion/Tercera_generación.png'

function Tabla_Generacion_iii({ Pokemon }) {

    return (
        <>
            <hr />
            <h3 className='d-flex  justify-content-center'>Generacion III <span className='ms-2 d-flex align-items-center justify-conter-center'><img width="50px" src={icono_generacion_iii} alt="Segunda Generacion" /></span></h3>
            <table className={`tabla-g-iii sombra rounded-3 text-dark bg-white ${Pokemon.especie.color.name} mb-3 mx-auto`}>
                <tbody>
                    <tr>
                        <td className='esmeralda text-dark text-center fs-6 fw-bold py-2 border-bottom  border-dark border-2' colSpan="5">
                            Esmeralda
                        </td>
                    </tr>
                    <tr>
                        <td className='border-bottom border-end border-dark border-2' colSpan="2">
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Frontal Normal</figcaption>
                                <img width="100px" height="100px" className='object-fit' src={Pokemon.data.sprites.versions["generation-iii"]["emerald"].front_default} alt="Esmeralda_img" />
                            </figure>
                        </td>
                        <td className='border-bottom border-dark border-2' colSpan="2">
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Frontal Shiny</figcaption>
                                <img width="100px" height="100px" className='object-fit' src={Pokemon.data.sprites.versions["generation-iii"]["emerald"].front_shiny} alt="Esmeralda_img" />
                            </figure>
                        </td>
                    </tr>
                    {
                        Pokemon.data.sprites.versions["generation-iii"]["firered-leafgreen"].front_default || Pokemon.data.sprites.versions["generation-iii"]["firered-leafgreen"].back_default || Pokemon.data.sprites.versions["generation-iii"]["firered-leafgreen"].front_shiny || Pokemon.data.sprites.versions["generation-iii"]["firered-leafgreen"].back_shiny ?
                            (<>
                                <tr>
                                    <td className='rojo-verde text-white text-center fs-6 fw-bold py-2 border-bottom  border-dark border-2' colSpan="5">
                                        Rojo Fuego y Verde Hoja
                                    </td>
                                </tr>
                                <tr>
                                    <td className='border-bottom border-end border-dark border-2'>
                                        <figure className='py-1 d-flex flex-column align-items-center'>
                                            <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Frontal Normal</figcaption>
                                            <img width="100px" height="100px" className='object-fit' src={Pokemon.data.sprites.versions["generation-iii"]["firered-leafgreen"].front_default} alt="Rojo_Fuego_Verde_Hoja_img" />
                                        </figure>
                                    </td>
                                    <td className='border-bottom border-end border-dark border-2'>
                                        <figure className='py-1 d-flex flex-column align-items-center'>
                                            <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Espalda Normal</figcaption>
                                            <img width="100px" height="100px" className='object-fit' src={Pokemon.data.sprites.versions["generation-iii"]["firered-leafgreen"].back_default} alt="Rojo_Fuego_Verde_Hoja_img" />
                                        </figure>
                                    </td>
                                    <td className='border-bottom border-end border-dark border-2'>
                                        <figure className='py-1 d-flex flex-column align-items-center'>
                                            <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Frontal  Shiny</figcaption>
                                            <img width="100px" height="100px" className='object-fit' src={Pokemon.data.sprites.versions["generation-iii"]["firered-leafgreen"].front_shiny} alt="Rojo_Fuego_Verde_Hoja_img" />
                                        </figure>
                                    </td>
                                    <td className='border-bottom  border-dark border-2' colSpan="2">
                                        <figure className='py-1 d-flex flex-column align-items-center'>
                                            <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Espalda Shyni</figcaption>
                                            <img width="100px" height="100px" className='object-fit' src={Pokemon.data.sprites.versions["generation-iii"]["firered-leafgreen"].back_shiny} alt="Rojo_Fuego_Verde_Hoja_img" />
                                        </figure>
                                    </td>
                                </tr>
                            </>) :
                            (<></>)
                    }
                    <tr>
                        <td className='rubi-zafiro text-dark text-center fs-6 fw-bold py-2 border-bottom  border-dark border-2' colSpan="5">
                            Rubí y Zafiro
                        </td>
                    </tr>
                    <tr>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Frontal Normal</figcaption>
                                <img width="100px" height="100px" className='object-fit' src={Pokemon.data.sprites.versions["generation-iii"]["ruby-sapphire"].front_default} alt="Rubi_Zafiro_img" />
                            </figure>
                        </td>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Espalda Normal</figcaption>
                                <img width="100px" height="100px" className='object-fit' src={Pokemon.data.sprites.versions["generation-iii"]["ruby-sapphire"].back_default} alt="Rubi_Zafiro_img" />
                            </figure>
                        </td>
                        <td className='border-bottom border-end border-dark border-2'>
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Frontal  Shiny</figcaption>
                                <img width="100px" height="100px" className='object-fit' src={Pokemon.data.sprites.versions["generation-iii"]["ruby-sapphire"].front_shiny} alt="Rubi_Zafiro_img" />
                            </figure>
                        </td>
                        <td className='border-bottom  border-dark border-2' colSpan="2">
                            <figure className='py-1 d-flex flex-column align-items-center'>
                                <figcaption style={{ width: "100px" }} className="fs-6 m-0 fw-bold text-center">Espalda Shyni</figcaption>
                                <img width="100px" height="100px" className='object-fit' src={Pokemon.data.sprites.versions["generation-iii"]["ruby-sapphire"].back_shiny} alt="Rubi_Zafiro_img" />
                            </figure>
                        </td>
                    </tr>
                </tbody>

            </table>
        </>
    )
}

export default Tabla_Generacion_iii