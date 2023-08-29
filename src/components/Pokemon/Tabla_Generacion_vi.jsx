import icono_generacion_vi from '../../assets/iconos_generacion/Sexta_generación.png'

function Tabla_Generacion_vi({ Pokemon }) {
    return (
        <>
            <hr />
            <h3 className='d-flex justify-content-center'>Generacion VI <span className='ms-2 d-flex align-items-center justify-conter-center'><img width="50px" src={icono_generacion_vi} alt="Segunda Generacion" /></span></h3>
            <table className={`table-g-vi sombra rounded-3 text-dark bg-white ${Pokemon.especie.color.name} mb-3 mx-auto`}>
                <thead >
                    <tr>
                        <th className='py-2 w-50 fs-5 col-6 text-center  border-end border-bottom border-dark border-2'>Normal</th>
                        <th className='py-2 w-50 fs-5 col-6 text-center border-bottom border-dark border-2'>Shiny</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='x-y text-white text-center fs-6 fw-bold py-2 border-bottom  border-dark border-2' colSpan="2">
                            Omega Rubí y Alfa Zafiro
                        </td>
                    </tr>
                    <tr >
                        <td className='p-0 border-bottom border-end border-dark border-2' >
                            <div className='d-flex justify-content-between '>
                                <figure className='w-50 p-1  d-flex flex-column align-items-center border-end border-dark border-2 bg-male'>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_default}  alt="IMG_frente_normal" />
                                </figure>

                                <figure className=' w-50 border-dark p-1 d-flex flex-column align-items-center border-dark border-2 bg-female'>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_female ? Pokemon.data.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_female : Pokemon.data.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_default}  alt="IMG_frente_normal" />
                                </figure>
                            </div>
                        </td>
                        <td className='p-0 border-dark border-bottom border-2' >
                            <div className='d-flex justify-content-between align-self-stretch'>
                                <figure className='w-50 p-1 d-flex flex-column align-items-center bg-male border-end border-dark border-2'>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_shiny}  alt="IMG_atras_normal" />
                                </figure>
                                <figure className=' p-1 d-flex flex-column align-items-center w-50 bg-female'>
                                    <img className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_shiny_female ? Pokemon.data.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_shiny_female : Pokemon.data.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_shiny}  alt="IMG_atras_normal" />
                                </figure>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='x-y text-white text-center fs-6 fw-bold py-2 border-bottom  border-dark border-2' colSpan="2">
                            X y Y
                        </td>
                    </tr>
                    <tr>
                        <td className=' border-end border-dark border-2' >
                            <div className='d-flex justify-content-between' >
                                <figure className='w-50 py-3  d-flex flex-column align-items-center border-end border-dark border-2 bg-male'>
                                    <img  className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-vi"]["x-y"].front_default}  alt="IMG_frente_normal" />
                                </figure>

                                <figure className='  w-50 border-dark py-3 d-flex flex-column align-items-center border-dark border-2 bg-female'>
                                    <img  className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-vi"]["x-y"].front_female ? Pokemon.data.sprites.versions["generation-vi"]["x-y"].front_female : Pokemon.data.sprites.versions["generation-vi"]["x-y"].front_default}  alt="IMG_frente_normal" />
                                </figure>
                            </div>
                        </td>
                        <td className='p-0 border-dark border-2' >
                            <div className='d-flex justify-content-between '>
                                <figure className='w-50 py-3 d-flex flex-column align-items-center bg-male border-end border-dark border-2'>
                                    <img  className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-vi"]["x-y"].front_shiny}  alt="IMG_atras_normal" />
                                </figure>
                                <figure className=' py-3 d-flex flex-column align-items-center w-50 bg-female'>
                                    <img  className=' object-fit img-100' src={Pokemon.data.sprites.versions["generation-vi"]["x-y"].front_shiny_female ? Pokemon.data.sprites.versions["generation-vi"]["x-y"].front_shiny_female : Pokemon.data.sprites.versions["generation-vi"]["x-y"].front_shiny}  alt="IMG_atras_normal" />
                                </figure>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Tabla_Generacion_vi