import Image_no_icono from "../../assets/No_Image_icons.png" 

function Tabla_Sprits({ Pokemon }) {
    return (
        <table className={`w-100  rounded-3 sombra text-dark bg-white ${Pokemon.especie.color.name} mb-3`}>
            <thead >
                <tr>
                    <th className='py-2  fs-5 col-6 text-center  border-end border-bottom border-dark border-2'>Normal</th>
                    {
                        Pokemon.data.sprites.front_shiny ?
                            (
                                <th className='py-2  fs-5 col-6 text-center border-bottom border-dark border-2'>Shiny</th>
                            ) :
                            (<></>)
                    }
                </tr>
            </thead>
            <tbody>
                <tr >
                    <td className='p-0 border-bottom border-end border-dark border-2' >
                        <div className='d-flex justify-content-between bg-male'>
                            {
                                Pokemon.data.sprites.back_default ?
                                    (
                                        <>
                                            <figure className='w-50 p-1  d-flex flex-column align-items-center border-end border-dark border-2'>
                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                                <img className=' object-fit img-180' src={Pokemon.data.sprites.front_default}   alt="IMG_frente_normal" />
                                            </figure>
                                            <figure className='w-50 p-1 d-flex flex-column align-items-center'>
                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                                <img className=' object-fit img-180' src={Pokemon.data.sprites.back_default}   alt="IMG_atras_normal" />
                                            </figure>
                                        </>
                                    )
                                    :
                                    (
                                        <figure className='w-100 p-1  d-flex flex-column align-items-center'>
                                            <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                            <img className=' object-fit img-180' src={Pokemon.data.sprites.front_default?Pokemon.data.sprites.front_default:Image_no_icono}   alt="IMG_frente_normal" />
                                        </figure>
                                    )
                            }
                        </div>
                    </td>
                    {
                        Pokemon.data.sprites.front_shiny ?
                            (
                                <td className='p-0 border-bottom border-dark border-2' >
                                    <div className='d-flex justify-content-between bg-male'>
                                        {
                                            Pokemon.data.sprites.back_shiny ?
                                                (
                                                    <>
                                                        <figure className='  w-50 border-dark p-1 d-flex flex-column align-items-center border-end border-dark border-2'>
                                                            <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                                            <img className=' object-fit img-180' src={Pokemon.data.sprites.front_shiny}   alt="IMG_frente_shiny" />
                                                        </figure>
                                                        <figure className=' p-1 d-flex flex-column align-items-center w-50'>
                                                            <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                                            <img className=' object-fit img-180' src={Pokemon.data.sprites.back_shiny}   alt="IMG_atras_shiny" />
                                                        </figure>
                                                    </>
                                                )
                                                :
                                                (
                                                    <figure className='  w-100  p-1 d-flex flex-column align-items-center'>
                                                        <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                                        <img className=' object-fit img-180' src={Pokemon.data.sprites.front_shiny}   alt="IMG_frente_shiny" />
                                                    </figure>
                                                )
                                        }
                                    </div>
                                </td>
                            )
                            :
                            (<></>)
                    }

                </tr>
                <tr >
                    <td className='p-0 border-end border-dark border-2' >
                        <div className='d-flex justify-content-between bg-female'>
                            {
                                Pokemon.data.sprites.back_female || (!Pokemon.especie.has_gender_differences && Pokemon.data.sprites.back_default) || (Pokemon.especie.has_gender_differences && Pokemon.data.sprites.back_default)?
                                    (
                                        <>
                                            <figure className='  w-50 border-dark p-1 d-flex flex-column align-items-center border-end border-dark border-2'>
                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                                <img className=' object-fit img-180' src={Pokemon.data.sprites.front_female ? Pokemon.data.sprites.front_female : Pokemon.data.sprites.front_default}   alt="IMG_frente_normal" />
                                            </figure>
                                            <figure className=' p-1 d-flex flex-column align-items-center w-50'>
                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                                <img className=' object-fit img-180' src={Pokemon.data.sprites.back_female ? Pokemon.data.sprites.back_female : Pokemon.data.sprites.back_default}   alt="IMG_atras_normal" />
                                            </figure>
                                        </>
                                    )
                                    :
                                    (
                                        <figure className='  w-100 p-1 d-flex flex-column align-items-center'>
                                            <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                            <img className=' object-fit img-180' src={Pokemon.data.sprites.front_female ? Pokemon.data.sprites.front_female : Pokemon.data.sprites.front_default?Pokemon.data.sprites.front_default:Image_no_icono}   alt="IMG_frente_normal" />
                                        </figure>
                                    )
                            }
                        </div>
                    </td>
                    {
                        Pokemon.data.sprites.front_shiny ?
                            (
                                <td  >
                                    <div className='w-100 d-flex justify-content-between bg-female '>
                                        {
                                            Pokemon.data.sprites.back_shiny_female || (!Pokemon.especie.has_gender_differences && Pokemon.data.sprites.back_shiny) || (Pokemon.especie.has_gender_differences && Pokemon.data.sprites.back_shiny) ?
                                                (
                                                    <>
                                                        <figure className='w-50 border-dark p-1 d-flex flex-column align-items-center border-end border-dark border-2'>
                                                            <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                                            <img className=' object-fit img-180' src={Pokemon.data.sprites.front_shiny_female ? Pokemon.data.sprites.front_shiny_female : Pokemon.data.sprites.front_shiny}   alt="IMG_frente_shiny" />
                                                        </figure>
                                                        <figure className='p-1 d-flex flex-column align-items-center w-50'>
                                                            <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                                            <img className='object-fit img-180' src={Pokemon.data.sprites.back_shiny_female ? Pokemon.data.sprites.back_shiny_female : Pokemon.data.sprites.back_shiny}   alt="IMG_atras_shiny" />
                                                        </figure>
                                                    </>
                                                )
                                                :
                                                (
                                                    <figure className='w-100 p-1 d-flex flex-column align-items-center'>
                                                        <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                                        <img className='object-fit img-180' src={Pokemon.data.sprites.front_shiny_female ? Pokemon.data.sprites.front_shiny_female : Pokemon.data.sprites.front_shiny}   alt="IMG_frente_shiny" />
                                                    </figure>
                                                )
                                        }
                                    </div>
                                </td>
                            )
                            :
                            (<></>)
                    }
                </tr>
            </tbody>
        </table>
    )
}

export default Tabla_Sprits