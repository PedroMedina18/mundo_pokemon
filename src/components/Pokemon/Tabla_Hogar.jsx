import React from 'react'

function Tabla_Hogar({ Pokemon }) {
    return (
        <>
            <hr />
            <h3 className='fs-3 text-center fw-bold'>Hogar</h3>
            <table className={`w-100 sombra rounded-3 text-dark bg-white ${Pokemon.especie.color.name} mb-3`}>
                <thead >
                    <tr>
                        <th className='py-2 w-50 fs-5 col-6 text-center border-bottom border-end border-dark border-2'>Normal</th>
                        {
                            Pokemon.data.sprites.other.home.front_shiny || Pokemon.data.sprites.other.home.front_shiny_female ?
                                (<th className='py-2 w-50 fs-5 col-6 text-center border-bottom border-dark border-2'>Shiny</th>)
                                :
                                (<></>)
                        }

                    </tr>
                </thead>

                <tbody >
                    <tr className='bg-male'>
                        <th className='border-end border-bottom border-2 border-dark'>
                            <div className='w-100 d-flex justify-content-center '>
                                <img className='object-fit' height="200px" src={Pokemon.data.sprites.other.home.front_default} alt="nomal_male" />

                            </div>
                        </th>
                        {
                            Pokemon.data.sprites.other.home.front_shiny || Pokemon.data.sprites.other.home.front_shiny_female ?
                                (<th className='border-bottom border-2 border-dark'>
                                    <div className='w-100 d-flex justify-content-center'>
                                        <img className='object-fit' height="200px" src={Pokemon.data.sprites.other.home.front_shiny} alt="shiny_female" />
                                    </div>
                                </th>)
                                :
                                (<></>)
                        }

                    </tr>
                    <tr className='bg-female'>
                        <th className='border-end border-2 border-dark'>
                            <div className='w-100 d-flex justify-content-center '>
                                <img className='object-fit' height="200px" src={Pokemon.data.sprites.other.home.front_female ? Pokemon.data.sprites.other.home.front_female : Pokemon.data.sprites.other.home.front_default} alt="nomal_male" />

                            </div>
                        </th>
                        {
                            Pokemon.data.sprites.other.home.front_shiny || Pokemon.data.sprites.other.home.front_shiny_female ?
                                (<th>
                                    <div className='w-100 d-flex justify-content-center'>
                                        <img className='object-fit' height="200px" src={Pokemon.data.sprites.other.home.front_shiny_female ? Pokemon.data.sprites.other.home.front_shiny_female : Pokemon.data.sprites.other.home.front_shiny} alt="shiny_female" />
                                    </div>
                                </th>)
                                :
                                (<></>)
                        }

                    </tr>
                </tbody>
            </table >
        </>
    )
}

export default Tabla_Hogar