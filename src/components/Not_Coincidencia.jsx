import React from 'react'

function Not_Coincidencia({tipo}) {
    return (
        <div className='  d-flex  justify-content-center my-5' >
            <div className='container-alerta'>
                <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" fill="#e52d27" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
                <p className='fs-3 fw-bold text-center mb-2'>No se Encontro ninguna Coincidencia</p>
                <p className='fs-5 fw-semibold text-center mb-0'>¡Reduzca las condiciones o pruebe otra combinacion para encontrar el {tipo} que busca!</p>
            </div>
        </div>
    )
}

export default Not_Coincidencia