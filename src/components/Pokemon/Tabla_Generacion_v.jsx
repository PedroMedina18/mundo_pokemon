import icono_generacion_v from '../../assets/iconos_generacion/Quinta_generación.png'

function Tabla_Generacion_v({ Pokemon }) {
    return (
        <>
            <hr />
            <h3 className='d-flex justify-content-center'>Generacion V <span className='ms-2 d-flex align-items-center justify-conter-center'><img width="50px" src={icono_generacion_v} alt="Segunda Generacion" /></span></h3>
            <table className={`table-g-v sombra rounded-3 text-dark bg-white ${Pokemon.especie.color.name} mb-3 mx-auto`}>
                <thead >
                    <tr>
                        <th className='py-2 w-50 fs-5 col-6 text-center  border-end border-bottom border-dark border-2'>Normal</th>
                        <th className='py-2 w-50 fs-5 col-6 text-center border-bottom border-dark border-2'>Shiny</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='blanco-negro text-white text-center fs-6 fw-bold py-2 border-bottom  border-dark border-2' colSpan="4">
                            Blanco y Negro
                        </td>
                    </tr>
                    <tr >
                        <td className='p-0 border-bottom border-end border-dark border-2' >
                            <div className='d-flex justify-content-between bg-male'>
                                <figure className={` p-1  d-flex flex-column align-items-center  border-dark border-2  ${Pokemon.data.sprites.versions["generation-v"]["black-white"].back_default || Pokemon.data.sprites.versions["generation-v"]["black-white"].back_shiny ? "w-50 border-end" : "w-100"}`}>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-v"]["black-white"].front_default}  alt="IMG_frente_normal" />
                                </figure>
                                {
                                    Pokemon.data.sprites.versions["generation-v"]["black-white"].back_default || Pokemon.data.sprites.versions["generation-v"]["black-white"].back_shiny ?
                                        (
                                            <figure className='w-50 p-1 d-flex flex-column align-items-center'>
                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                                <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-v"]["black-white"].back_default}  alt="IMG_atras_normal" />
                                            </figure>
                                        ) :
                                        (<></>)
                                }

                            </div>
                        </td>
                        <td className='p-0 border-bottom border-dark border-2' >
                            <div className='d-flex justify-content-between bg-male'>
                                <figure className={` p-1 d-flex flex-column align-items-center  border-dark border-2 ${Pokemon.data.sprites.versions["generation-v"]["black-white"].back_default || Pokemon.data.sprites.versions["generation-v"]["black-white"].back_shiny ? "w-50 border-end" : "w-100"}`}>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-v"]["black-white"].front_shiny}  alt="IMG_frente_shiny" />
                                </figure>
                                {
                                    Pokemon.data.sprites.versions["generation-v"]["black-white"].back_default || Pokemon.data.sprites.versions["generation-v"]["black-white"].back_shiny ?
                                        (
                                            <figure className=' p-1 d-flex flex-column align-items-center w-50'>
                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                                <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-v"]["black-white"].back_shiny}  alt="IMG_atras_shiny" />
                                            </figure>
                                        ) :
                                        (<></>)
                                }

                            </div>
                        </td>
                    </tr>
                    <tr >
                        <td className='p-0 border-end border-dark border-2' >
                            <div className='d-flex justify-content-between bg-female'>
                                <figure className={` p-1 d-flex flex-column align-items-center  border-dark border-2 ${Pokemon.data.sprites.versions["generation-v"]["black-white"].back_default || Pokemon.data.sprites.versions["generation-v"]["black-white"].back_shiny ? "w-50 border-end" : "w-100"}`}>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-v"]["black-white"].front_female ? Pokemon.data.sprites.versions["generation-v"]["black-white"].front_female : Pokemon.data.sprites.versions["generation-v"]["black-white"].front_default}  alt="IMG_frente_normal" />
                                </figure>
                                {
                                    Pokemon.data.sprites.versions["generation-v"]["black-white"].back_default || Pokemon.data.sprites.versions["generation-v"]["black-white"].back_shiny ?
                                        (
                                            <figure className=' p-1 d-flex flex-column align-items-center w-50'>
                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                                <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-v"]["black-white"].back_female ? Pokemon.data.sprites.versions["generation-v"]["black-white"].back_female : Pokemon.data.sprites.versions["generation-v"]["black-white"].back_default}  alt="IMG_atras_normal" />
                                            </figure>
                                        ) :
                                        (<></>)
                                }

                            </div>
                        </td>
                        <td>
                            <div className='w-100 d-flex justify-content-between bg-female '>
                                <figure className={` p-1 d-flex flex-column align-items-center border-dark border-2 ${Pokemon.data.sprites.versions["generation-v"]["black-white"].back_default || Pokemon.data.sprites.versions["generation-v"]["black-white"].back_shiny ? "w-50 border-end" : "w-100"}`}>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-v"]["black-white"].front_shiny_female ? Pokemon.data.sprites.versions["generation-v"]["black-white"].front_shiny_female : Pokemon.data.sprites.versions["generation-v"]["black-white"].front_shiny}  alt="IMG_frente_shiny" />
                                </figure>
                                {
                                    Pokemon.data.sprites.versions["generation-v"]["black-white"].back_default || Pokemon.data.sprites.versions["generation-v"]["black-white"].back_shiny ?
                                        (
                                            <figure className='p-1 d-flex flex-column align-items-center w-50'>
                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                                <img className='object-fit img-100' src={Pokemon.data.sprites.versions["generation-v"]["black-white"].back_shiny_female ? Pokemon.data.sprites.versions["generation-v"]["black-white"].back_shiny_female : Pokemon.data.sprites.versions["generation-v"]["black-white"].back_shiny}  alt="IMG_atras_shiny" />
                                            </figure>
                                        ) :
                                        (<></>)
                                }

                            </div>
                        </td>
                    </tr>
                    {
                        Pokemon.data.sprites.versions["generation-v"]["black-white"]["animated"].front_default || Pokemon.data.sprites.versions["generation-v"]["black-white"]["animated"].front_shiny ?
                            (<>
                                <tr>
                                    <td className='blanco-negro text-white text-center  fs-6 fw-bold py-2 border-bottom  border-top border-dark border-2' colSpan="4">
                                        Animados
                                    </td>
                                </tr>
                                <tr >
                                    <td className='p-0 border-bottom border-end border-dark border-2 bg-male align-self-stretch' >
                                        <div className='d-flex justify-content-between '>
                                            <figure className='w-50 p-1  d-flex flex-column align-items-center border-end border-dark border-2'>
                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                                <img className=' object-fit' src={Pokemon.data.sprites.versions["generation-v"]["black-white"]["animated"].front_default} alt="IMG_frente_normal"  />
                                            </figure>
                                            <figure className='w-50 p-1 d-flex flex-column align-items-center'>
                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                                <img className=' object-fit' src={Pokemon.data.sprites.versions["generation-v"]["black-white"]["animated"].back_default} alt="IMG_atras_normal"  />
                                            </figure>
                                        </div>
                                    </td>
                                    <td className='p-0 border-bottom border-dark border-2 bg-male' >
                                        <div className='d-flex justify-content-between'>
                                            <figure className='  w-50 border-dark p-1 d-flex flex-column align-items-center border-end border-dark border-2'>
                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                                <img className=' object-fit' src={Pokemon.data.sprites.versions["generation-v"]["black-white"]["animated"].front_shiny} alt="IMG_frente_shiny"  />
                                            </figure>
                                            <figure className=' p-1 d-flex flex-column align-items-center w-50'>
                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                                <img className=' object-fit' src={Pokemon.data.sprites.versions["generation-v"]["black-white"]["animated"].back_shiny} alt="IMG_atras_shiny"  />
                                            </figure>
                                        </div>
                                    </td>
                                </tr>
                                <tr >
                                    <td className='p-0 border-end border-dark border-2 bg-female' >
                                        <div className='d-flex justify-content-between '>
                                            <figure className='  w-50 border-dark p-1 d-flex flex-column align-items-center border-end border-dark border-2'>
                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                                <img className=' object-fit' src={Pokemon.data.sprites.versions["generation-v"]["black-white"]["animated"].front_female ? Pokemon.data.sprites.versions["generation-v"]["black-white"]["animated"].front_female : Pokemon.data.sprites.versions["generation-v"]["black-white"]["animated"].front_default} alt="IMG_frente_normal"  />
                                            </figure>
                                            <figure className=' p-1 d-flex flex-column align-items-center w-50'>
                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                                <img className=' object-fit' src={Pokemon.data.sprites.versions["generation-v"]["black-white"]["animated"].back_female ? Pokemon.data.sprites.versions["generation-v"]["black-white"]["animated"].back_female : Pokemon.data.sprites.versions["generation-v"]["black-white"]["animated"].back_default} alt="IMG_atras_normal"  />
                                            </figure>
                                        </div>
                                    </td>
                                    <td className='bg-female'>
                                        <div className='w-100 d-flex justify-content-between '>
                                            <figure className='w-50 border-dark p-1 d-flex flex-column align-items-center border-end border-dark border-2'>
                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                                <img className=' object-fit' src={Pokemon.data.sprites.versions["generation-v"]["black-white"]["animated"].front_shiny_female ? Pokemon.data.sprites.versions["generation-v"]["black-white"]["animated"].front_shiny_female : Pokemon.data.sprites.versions["generation-v"]["black-white"]["animated"].front_shiny} alt="IMG_frente_shiny"  />
                                            </figure>
                                            <figure className='p-1 d-flex flex-column align-items-center w-50'>
                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                                <img className='object-fit' src={Pokemon.data.sprites.versions["generation-v"]["black-white"]["animated"].back_shiny_female ? Pokemon.data.sprites.versions["generation-v"]["black-white"]["animated"].back_shiny_female : Pokemon.data.sprites.versions["generation-v"]["black-white"]["animated"].back_shiny} alt="IMG_atras_shiny"  />
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

export default Tabla_Generacion_v