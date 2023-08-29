import icono_generacion_vii from '../../assets/iconos_generacion/Séptima_generación.png'

function Tabla_Generacion_vii({ Pokemon }) {
    return (
        <>
            <hr />
            <h3 className='d-flex justify-content-center'>Generacion VII <span className='ms-2 d-flex align-items-center justify-conter-center'><img width="50px" src={icono_generacion_vii} alt="Segunda Generacion" /></span></h3>
            <table className={`tabla-g-vii sombra rounded-3 text-dark bg-white ${Pokemon.especie.color.name} mb-3 mx-auto`}>
                <tbody>
                    <tr>
                        <td className='iconos text-dark text-center fs-6 fw-bold py-2 border-bottom  border-dark border-2' colSpan="4">
                            Iconos
                        </td>
                    </tr>
                    <tr>
                        <td className='p-0 border-end border-dark border-2' colSpan="2">
                            <div className='w-100 d-flex justify-content-center bg-male'>
                                <figure className='w-50 p-1  d-flex flex-column align-items-center  border-dark border-2'>
                                    <img className=' object-fit' src={Pokemon.data.sprites.versions["generation-vii"]["icons"].front_default}  alt="IMG_frente_normal" />
                                </figure>

                            </div>
                        </td>
                        <td className='p-0  border-dark border-2' colSpan="2">
                            <div className='w-100 d-flex justify-content-center bg-female' >
                                <figure className='w-50 p-1  d-flex flex-column align-items-center border-dark border-2'>
                                    <img className=' object-fit' src={Pokemon.data.sprites.versions["generation-vii"]["icons"].front_female ? Pokemon.data.sprites.versions["generation-vii"]["icons"].front_female : Pokemon.data.sprites.versions["generation-vii"]["icons"].front_default}  alt="IMG_frente_normal" />
                                </figure>

                            </div>
                        </td>
                    </tr>
                    {
                        Pokemon.data.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_default || Pokemon.data.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_female || Pokemon.data.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_shiny || Pokemon.data.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_shiny_female ?
                            (<>
                                <tr>
                                    <td className='sol-luna text-dark text-center fs-6 fw-bold py-2 border-bottom border-top  border-dark border-2' colSpan="4">
                                        Ultra sol y Ultra Luna
                                    </td>
                                </tr>
                                <tr>
                                    <td className='p-0 border-end border-dark border-2 ' >
                                        <div className='w-100 d-flex justify-content-center bg-male'>
                                            <figure className='w-50 p-1  d-flex flex-column align-items-center border-dark border-2'>
                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Normal</figcaption>
                                                <img className=' object-fit img-130' src={Pokemon.data.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_default}  alt="IMG_frente_normal" />
                                            </figure>
                                        </div>
                                    </td>
                                    <td className='p-0 border-end border-dark border-2' >
                                        <div className='w-100 d-flex justify-content-center bg-female'>
                                            <figure className='w-50 p-1  d-flex flex-column align-items-center border-dark border-2'>
                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Normal</figcaption>
                                                <img className=' object-fit img-130' src={Pokemon.data.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_female ? Pokemon.data.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_female : Pokemon.data.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_default}  alt="IMG_frente_normal" />
                                            </figure>
                                        </div>
                                    </td>
                                    <td className='p-0 border-end  border-dark border-2' >
                                        <div className='w-100 d-flex justify-content-center bg-male'>
                                            <figure className='w-50 p-1  d-flex flex-column align-items-center border-dark border-2'>
                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Shiny</figcaption>
                                                <img className=' object-fit img-130' src={Pokemon.data.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_shiny}  alt="IMG_frente_normal" />
                                            </figure>
                                        </div>
                                    </td>
                                    <td className='p-0  border-dark border-2' >
                                        <div className='w-100 d-flex justify-content-center bg-female'>
                                            <figure className='w-50 p-1  d-flex flex-column align-items-center border-dark border-2'>
                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Shiny</figcaption>
                                                <img className=' object-fit img-130' src={Pokemon.data.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_shiny_female ? Pokemon.data.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_shiny_female : Pokemon.data.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_shiny}  alt="IMG_frente_normal" />
                                            </figure>

                                        </div>
                                    </td>
                                </tr>
                            </>)
                            :
                            (<></>)
                    }

                </tbody>
            </table>
        </>
    )
}

export default Tabla_Generacion_vii