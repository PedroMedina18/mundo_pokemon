import icono_generacion_viii from '../../assets/iconos_generacion/Octava_generación.png'

function Tabla_Generacion_viii({ Pokemon }) {
    return (
        <>
            <hr />
            <h3 className='d-flex justify-content-center'>Generacion VIII <span className='ms-2 d-flex align-items-center justify-conter-center'><img width="50px" src={icono_generacion_viii} alt="Segunda Generacion" /></span></h3>
            <table className={`w-50 sombra rounded-3 text-dark bg-white ${Pokemon.especie.color.name} mb-3 mx-auto`}>
                <tbody>

                    <tr>
                        <td className='iconos text-dark text-center fs-6 fw-bold py-2 border-bottom  border-dark border-2' colSpan="2">
                            Iconos
                        </td>
                    </tr>
                    <tr>
                        <td className='p-0 border-end border-dark border-2' colSpan="1">
                            <div className='w-100 d-flex justify-content-center bg-male'>
                                <figure className='w-50 p-1  d-flex flex-column align-items-center  border-dark border-2'>
                                    <img className=' object-fit' src={Pokemon.data.sprites.versions["generation-viii"]["icons"].front_default} width="100px" height="80px" alt="IMG_frente_normal" />
                                </figure>

                            </div>
                        </td>
                        <td className='p-0  border-dark border-2' colSpan="1">
                            <div className='w-100 d-flex justify-content-center bg-female' >
                                <figure className='w-50 p-1  d-flex flex-column align-items-center border-dark border-2'>
                                    <img className=' object-fit' src={Pokemon.data.sprites.versions["generation-viii"]["icons"].front_female ? Pokemon.data.sprites.versions["generation-viii"]["icons"].front_female : Pokemon.data.sprites.versions["generation-viii"]["icons"].front_default} width="100px" height="80px" alt="IMG_frente_normal" />
                                </figure>

                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Tabla_Generacion_viii