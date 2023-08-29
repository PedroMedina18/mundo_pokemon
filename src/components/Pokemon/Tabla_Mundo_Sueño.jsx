import React from 'react'

function Tabla_Mundo_Sueño({ Pokemon }) {
    return (
        <div>
            <hr />
            <h3 className='fs-3 text-center fw-bold'>Mundo de Sueños</h3>
            <table className={`w-100 sombra rounded-3 text-dark bg-white ${Pokemon.especie.color.name} mb-3`}>
                <tbody >
                    <tr>
                        <td>
                            <div className='w-100  p-2 d-flex justify-content-center border-end border-2 border-dark bg-male'>
                                <img className='object-fit img-250' src={Pokemon.data.sprites.other.dream_world.front_default} alt="mundo_sueño_male" />
                            </div>
                        </td>
                        <td>
                            <div className='w-100  p-2 d-flex justify-content-center bg-female'>
                                <img className='object-fit img-250' src={Pokemon.data.sprites.other.dream_world.front_female ? Pokemon.data.sprites.other.dream_world.front_female : Pokemon.data.sprites.other.dream_world.front_default} alt="mundo_sueño_female" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table >
        </div>
    )
}

export default Tabla_Mundo_Sueño