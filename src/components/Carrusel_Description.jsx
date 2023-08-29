import React from 'react'

function Carrusel_Description({descripciones, color="none"}) {
    return (
        <div id="Carrusel-Description"   className={` ${color} text-dark carrusel-description carousel slide d-flex align-items-center align-self-stretch carousel-fade py-3`} data-bs-ride="true">
            <div className="carousel-inner carrusel-item-description d-flex align-items-center" data-bs-interval="5000">
                {
                    descripciones.map((element, index) => (
                        <div  key={`description_${index}`} className={`carousel-item   text-center ${index === 0 ? "active" : ""}`} data-bs-interval="5000">
                            <div className="d-flex flex-column justify-content-center align-items-center ">
                                <h3 className="fs-2 fw-bold">{`Versión: ${element.version.replace(/\-/g, " ")}`}</h3>
                                <p className="fs-4 fw-medium mb-0 w-80">{element.descripcion}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#Carrusel-Description" data-bs-slide="prev">
                <span aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="60" fill="rgb(0,0,0)" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                    </svg>
                </span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#Carrusel-Description" data-bs-slide="next">
                <span aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="60" fill="rgb(0,0,0)" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                    </svg>
                </span>
            </button>
        </div>
    )
}

export default Carrusel_Description