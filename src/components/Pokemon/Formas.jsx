import React from 'react'

function Formas({ Pokemon }) {
    return (
        <section className='w-100 d-flex flex-column align-items-center justify-content-center'>
            <table className={`w-80  rounded-3 text-dark bg-white ${Pokemon.especie.color.name} mb-3`}>
                <thead >
                    <tr>
                        <th className='py-2 w-50 fs-5 col-6 text-center  border-end  border-dark border-2'>Normal</th>
                        <th className='py-2 w-50 fs-5 col-6 text-center  border-dark border-2'>Shiny</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Pokemon.formas.map((element, index) => (
                            <>
                                {
                                    element.sprits.front_default || element.sprits.back_default || element.sprits.front_shiny || element.sprits.back_shiny ?
                                        (
                                            <>
                                                <tr key={`primera_fila_${index}`}>
                                                    <td className={`bg-${Pokemon.especie.color.name}-gradiens text-center text-capitalize fs-6 fw-bold py-2 border-bottom  border-top border-dark border-2`} colSpan="2">
                                                        {`${Pokemon.data.name.replace(/-/g, " ")} ${element.forma.name ? element.forma.name : ""}`}
                                                    </td>
                                                </tr>
                                                <tr key={`segunda_fila_${index}`}>
                                                    <td className='p-0 border-bottom border-end border-dark border-2' >
                                                        <div className='d-flex justify-content-between bg-male'>
                                                            <figure className='w-50 p-1  d-flex flex-column align-items-center border-end border-dark border-2'>
                                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                                                <img className=' object-fit img-180' src={element.sprits.front_default}  alt="IMG_frente_normal" />
                                                            </figure>
                                                            <figure className='w-50 p-1 d-flex flex-column align-items-center'>
                                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                                                <img className=' object-fit img-180' src={element.sprits.back_default}  alt="IMG_atras_normal" />
                                                            </figure>
                                                        </div>
                                                    </td>

                                                    <td className='p-0 border-bottom border-dark border-2' >
                                                        <div className='d-flex justify-content-between bg-male'>
                                                            <figure className='  w-50 border-dark p-1 d-flex flex-column align-items-center border-end border-dark border-2'>
                                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                                                <img className=' object-fit img-180' src={element.sprits.front_shiny}  alt="IMG_frente_shiny" />
                                                            </figure>
                                                            <figure className=' p-1 d-flex flex-column align-items-center w-50'>
                                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                                                <img className=' object-fit img-180' src={element.sprits.back_shiny}  alt="IMG_atras_shiny" />
                                                            </figure>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr key={`tercera_fila_${index}`}>
                                                    <td className='p-0 border-end border-dark border-2' >
                                                        <div className='d-flex justify-content-between bg-female'>
                                                            <figure className='  w-50 border-dark p-1 d-flex flex-column align-items-center border-end border-dark border-2'>
                                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                                                <img className=' object-fit img-180' src={element.sprits.front_female ? element.sprits.front_female : element.sprits.front_default}  alt="IMG_frente_normal" />
                                                            </figure>
                                                            <figure className=' p-1 d-flex flex-column align-items-center w-50'>
                                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                                                <img className=' object-fit img-180' src={element.sprits.back_female ? element.sprits.back_female : element.sprits.back_default}  alt="IMG_atras_normal" />
                                                            </figure>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='w-100 d-flex justify-content-between bg-female '>
                                                            <figure className='w-50 border-dark p-1 d-flex flex-column align-items-center border-end border-dark border-2'>
                                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Frotal</figcaption>
                                                                <img className=' object-fit img-180' src={element.sprits.front_shiny_female ? element.sprits.front_shiny_female : element.sprits.front_shiny}  alt="IMG_frente_shiny" />
                                                            </figure>
                                                            <figure className='p-1 d-flex flex-column align-items-center w-50'>
                                                                <figcaption className='fs-6 m-0 fw-bold text-center'>Espalda</figcaption>
                                                                <img className='object-fit img-180' src={element.sprits.back_shiny_female ? element.sprits.back_shiny_female : element.sprits.back_shiny}  alt="IMG_atras_shiny" />
                                                            </figure>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </>
                                        ) : (<></>)
                                }

                            </>
                        ))
                    }

                </tbody>
            </table>


        </section>
    )
}

export default Formas