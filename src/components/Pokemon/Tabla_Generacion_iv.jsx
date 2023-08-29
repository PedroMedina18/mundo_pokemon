import icono_generacion_iv from '../../assets/iconos_generacion/Cuarta_generación.png'

function Tabla_Generacion_iv({ Pokemon }) {
    return (
        <>
            <hr />
            <h3 className='d-flex justify-content-center'>Generacion IV <span className='ms-2 d-flex align-items-center justify-conter-center'><img width="50px" src={icono_generacion_iv} alt="Segunda Generacion" /></span></h3>
            <table className={`tabla-g-iv sombra rounded-3 text-dark bg-white ${Pokemon.especie.color.name} mb-3 mx-auto`}>
                <thead >
                    <tr>
                        <th className='py-2 w-50 fs-5 col-6 text-center  border-end border-bottom border-dark border-2'>Normal</th>
                        <th className='py-2 w-50 fs-5 col-6 text-center border-bottom border-dark border-2'>Shiny</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='diamante-perla text-dark text-center fs-6 fw-bold py-2 border-bottom  border-dark border-2' colSpan="4">
                            Diamante y Perla
                        </td>
                    </tr>
                    <tr >
                        <td className='p-0 border-bottom border-end border-dark border-2' >
                            <div className='d-flex justify-content-between bg-male'>
                                <figure className='w-50 p-1  d-flex flex-column align-items-center border-end border-dark border-2'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["diamond-pearl"].front_default}  alt="IMG_frente_normal" />
                                </figure>
                                <figure className='w-50 p-1 d-flex flex-column align-items-center'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["diamond-pearl"].back_default}  alt="IMG_atras_normal" />
                                </figure>
                            </div>
                        </td>
                        <td className='p-0 border-bottom border-dark border-2' >
                            <div className='d-flex justify-content-between bg-male'>
                                <figure className='  w-50 border-dark p-1 d-flex flex-column align-items-center border-end border-dark border-2'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["diamond-pearl"].front_shiny}  alt="IMG_frente_shiny" />
                                </figure>
                                <figure className=' p-1 d-flex flex-column align-items-center w-50'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["diamond-pearl"].back_shiny}  alt="IMG_atras_shiny" />
                                </figure>
                            </div>
                        </td>
                    </tr>
                    <tr >
                        <td className='p-0 border-end border-dark border-2' >
                            <div className='d-flex justify-content-between bg-female'>
                                <figure className='  w-50 border-dark p-1 d-flex flex-column align-items-center border-end border-dark border-2'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["diamond-pearl"].front_female ? Pokemon.data.sprites.versions["generation-iv"]["diamond-pearl"].front_female : Pokemon.data.sprites.versions["generation-iv"]["diamond-pearl"].front_default}  alt="IMG_frente_normal" />
                                </figure>
                                <figure className=' p-1 d-flex flex-column align-items-center w-50'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["diamond-pearl"].back_female ? Pokemon.data.sprites.versions["generation-iv"]["diamond-pearl"].back_female : Pokemon.data.sprites.versions["generation-iv"]["diamond-pearl"].back_default}  alt="IMG_atras_normal" />
                                </figure>
                            </div>
                        </td>
                        <td>
                            <div className='w-100 d-flex justify-content-between bg-female '>
                                <figure className='w-50 border-dark p-1 d-flex flex-column align-items-center border-end border-dark border-2'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["diamond-pearl"].front_shiny_female ? Pokemon.data.sprites.versions["generation-iv"]["diamond-pearl"].front_shiny_female : Pokemon.data.sprites.versions["generation-iv"]["diamond-pearl"].front_shiny}  alt="IMG_frente_shiny" />
                                </figure>
                                <figure className='p-1 d-flex flex-column align-items-center w-50'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                    <img className='object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["diamond-pearl"].back_shiny_female ? Pokemon.data.sprites.versions["generation-iv"]["diamond-pearl"].back_shiny_female : Pokemon.data.sprites.versions["generation-iv"]["diamond-pearl"].back_shiny}  alt="IMG_atras_shiny" />
                                </figure>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='platino text-white text-center fs-6 fw-bold py-2 border-bottom border-top border-dark border-2' colSpan="4">
                            Platino
                        </td>
                    </tr>
                    <tr >
                        <td className='p-0 border-bottom border-end border-dark border-2' >
                            <div className='d-flex justify-content-between bg-male'>
                                <figure className='w-50 p-1  d-flex flex-column align-items-center border-end border-dark border-2'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["platinum"].front_default}  alt="IMG_frente_normal" />
                                </figure>
                                <figure className='w-50 p-1 d-flex flex-column align-items-center'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["platinum"].back_default}  alt="IMG_atras_normal" />
                                </figure>
                            </div>
                        </td>
                        <td className='p-0 border-bottom border-dark border-2' >
                            <div className='d-flex justify-content-between bg-male'>
                                <figure className='  w-50 border-dark p-1 d-flex flex-column align-items-center border-end border-dark border-2'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["platinum"].front_shiny}  alt="IMG_frente_shiny" />
                                </figure>
                                <figure className=' p-1 d-flex flex-column align-items-center w-50'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["platinum"].back_shiny}  alt="IMG_atras_shiny" />
                                </figure>
                            </div>
                        </td>
                    </tr>
                    <tr >
                        <td className='p-0 border-end border-dark border-2' >
                            <div className='d-flex justify-content-between bg-female'>
                                <figure className='  w-50 border-dark p-1 d-flex flex-column align-items-center border-end border-dark border-2'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["platinum"].front_female ? Pokemon.data.sprites.versions["generation-iv"]["platinum"].front_female : Pokemon.data.sprites.versions["generation-iv"]["platinum"].front_default}  alt="IMG_frente_normal" />
                                </figure>
                                <figure className=' p-1 d-flex flex-column align-items-center w-50'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["platinum"].back_female ? Pokemon.data.sprites.versions["generation-iv"]["platinum"].back_female : Pokemon.data.sprites.versions["generation-iv"]["platinum"].back_default}  alt="IMG_atras_normal" />
                                </figure>
                            </div>
                        </td>
                        <td>
                            <div className='w-100 d-flex justify-content-between bg-female '>
                                <figure className='w-50 border-dark p-1 d-flex flex-column align-items-center border-end border-dark border-2'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["platinum"].front_shiny_female ? Pokemon.data.sprites.versions["generation-iv"]["platinum"].front_shiny_female : Pokemon.data.sprites.versions["generation-iv"]["platinum"].front_shiny}  alt="IMG_frente_shiny" />
                                </figure>
                                <figure className='p-1 d-flex flex-column align-items-center w-50'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                    <img className='object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["platinum"].back_shiny_female ? Pokemon.data.sprites.versions["generation-iv"]["platinum"].back_shiny_female : Pokemon.data.sprites.versions["generation-iv"]["platinum"].back_shiny}  alt="IMG_atras_shiny" />
                                </figure>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='oro-plata text-dark text-center fs-6 fw-bold py-2 border-bottom border-top  border-dark border-2' colSpan="4">
                            Oro HeartGold y Plata SoulSilver
                        </td>
                    </tr>
                    <tr >
                        <td className='p-0 border-bottom border-end border-dark border-2' >
                            <div className='d-flex justify-content-between bg-male'>
                                <figure className='w-50 p-1  d-flex flex-column align-items-center border-end border-dark border-2'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["heartgold-soulsilver"].front_default}  alt="IMG_frente_normal" />
                                </figure>
                                <figure className='w-50 p-1 d-flex flex-column align-items-center'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["heartgold-soulsilver"].back_default}  alt="IMG_atras_normal" />
                                </figure>
                            </div>
                        </td>
                        <td className='p-0 border-bottom border-dark border-2' >
                            <div className='d-flex justify-content-between bg-male'>
                                <figure className='  w-50 border-dark p-1 d-flex flex-column align-items-center border-end border-dark border-2'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["heartgold-soulsilver"].front_shiny}  alt="IMG_frente_shiny" />
                                </figure>
                                <figure className=' p-1 d-flex flex-column align-items-center w-50'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["heartgold-soulsilver"].back_shiny}  alt="IMG_atras_shiny" />
                                </figure>
                            </div>
                        </td>
                    </tr>
                    <tr >
                        <td className='p-0 border-end border-dark border-2' >
                            <div className='d-flex justify-content-between bg-female'>
                                <figure className='  w-50 border-dark p-1 d-flex flex-column align-items-center border-end border-dark border-2'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["heartgold-soulsilver"].front_female ? Pokemon.data.sprites.versions["generation-iv"]["heartgold-soulsilver"].front_female : Pokemon.data.sprites.versions["generation-iv"]["heartgold-soulsilver"].front_default}  alt="IMG_frente_normal" />
                                </figure>
                                <figure className=' p-1 d-flex flex-column align-items-center w-50'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["heartgold-soulsilver"].back_female ? Pokemon.data.sprites.versions["generation-iv"]["heartgold-soulsilver"].back_female : Pokemon.data.sprites.versions["generation-iv"]["heartgold-soulsilver"].back_default}  alt="IMG_atras_normal" />
                                </figure>
                            </div>
                        </td>
                        <td>
                            <div className='w-100 d-flex justify-content-between bg-female '>
                                <figure className='w-50 border-dark p-1 d-flex flex-column align-items-center border-end border-dark border-2'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["heartgold-soulsilver"].front_shiny_female ? Pokemon.data.sprites.versions["generation-iv"]["heartgold-soulsilver"].front_shiny_female : Pokemon.data.sprites.versions["generation-iv"]["heartgold-soulsilver"].front_shiny}  alt="IMG_frente_shiny" />
                                </figure>
                                <figure className='p-1 d-flex flex-column align-items-center w-50'>
                                    <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                    <img className='object-fit img-100' src={Pokemon.data.sprites.versions["generation-iv"]["heartgold-soulsilver"].back_shiny_female ? Pokemon.data.sprites.versions["generation-iv"]["heartgold-soulsilver"].back_shiny_female : Pokemon.data.sprites.versions["generation-iv"]["heartgold-soulsilver"].back_shiny}  alt="IMG_atras_shiny" />
                                </figure>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Tabla_Generacion_iv