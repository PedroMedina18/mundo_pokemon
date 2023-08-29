import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Image_no from "../../assets/No_Image.png"
import Image_no_white from "../../assets/No_Image_white.png"

function Card_Pokemon_Data({ Pokemon }) {
    useEffect(() => {
        colapsar()
    }, [])
    const colapsar=()=>{
        const container=document.querySelector("#collapse-pokemon")
        const arrow = document.querySelector("#arrow_card")
        const button = document.querySelector("#button-card-pokemon")
        if(window.innerWidth<=900){
            container.classList.add("collapse")
            button.classList.remove("d-none")
        }
        window.addEventListener(`resize`, ()=>{
            if(window.innerWidth<=900){
                container.classList.add("collapse")
                button.classList.remove("d-none")
            }
            if(window.innerWidth>900){
                container.classList.remove("collapse")
                arrow.classList.remove("rotate-180")
                button.classList.add("d-none")
            }
        })

    }
    const rotar = () => {
        const arrow = document.querySelector("#arrow_card")
        arrow.classList.toggle("rotate-180")
    }
    const { types, generation, color, egg_group, habitat, forma } = useContext(AuthContext)
    return (
        <div className={` rounded-4 ${Pokemon.especie.color.name} card-pokemon-data sombra d-flex flex-column justify-content-start align-self-center align-self-md-stretch overflow-hidden`} >
            <div id="carouselExampleCaptions" className={`carrusel-pokemon carousel slide `} data-bs-ride="true">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className={`active ${Pokemon.especie.color.name}`} aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" className={`${Pokemon.especie.color.name}`} aria-label="Slide 2"></button>
                </div>

                <div className="carousel-inner" data-bs-interval="10000">
                    <div className="carousel-item active ">
                        <h3 className="w-100 fs-2 text-center fw-bold mb-0">Normal</h3>
                        <img src={Pokemon.data.sprites.other['official-artwork'].front_default ? Pokemon.data.sprites.other['official-artwork'].front_default : (Pokemon.especie.color.name === "red") ? Image_no_white : Image_no} className="d-block w-100 min-height" height="290px" alt="Pokemon" />
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <h3 className="w-100 fs-2 text-center fw-bold mb-0">Shiny</h3>
                        <img src={Pokemon.data.sprites.other['official-artwork'].front_shiny ? Pokemon.data.sprites.other['official-artwork'].front_shiny : (Pokemon.especie.color.name === "red") ? Image_no_white : Image_no} className="d-block w-100 min-height" height="290px" alt="Pokemon-shiny" />
                    </div>
                </div>
            </div>
            <hr className="my-1" />
            <button onClick={(e) => { rotar(e) }} className={`button-card-pokemon bg-${Pokemon.especie.color.name}-gradiens d-none `}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse-pokemon"
                aria-controls="collapse-pokemon"
                aria-expanded="false"
                id="button-card-pokemon"
                aria-label="Toggle navigation">
                <span className='ms-2'>
                    <svg id="arrow_card" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-caret-down-fill transition" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                </span>
            </button>
            <div className="" id="collapse-pokemon">
                <div>
                    <div className="w-100">
                        <h3 className="w-100 text-center fw-bold">Tipos</h3>
                        <div className="w-100 d-flex justify-content-around types-card align-items-center">
                            {
                                Pokemon.data.types.map(element => (
                                    <Link key={`${element.type.name}`} to={`/tipo/${element.type.name}`}><img src={types[element.type.name].nombre_grande} /></Link>
                                ))
                            }
                        </div>
                    </div>
                    <hr className="my-1" />
                    <div className="w-100 d-flex justify-content-center">
                        <p className="fs-5 fw-bold mb-0"><span>Peso:</span>{` ${Number(Pokemon.data.weight) / 10} Kg`}</p>
                    </div>
                    <hr className="my-1" />
                    <div className="w-100 d-flex justify-content-center">
                        <p className="fs-5 fw-bold mb-0"><span>Altura:</span>{` ${Number(Pokemon.data.height) / 10} m`}</p>
                    </div>
                    <hr className="my-1" />
                    <div className="w-100 d-flex justify-content-center">
                        <p className="fs-5 fw-bold mb-0 text-capitalize"><span>Categoría: </span>{Pokemon.categoria}</p>
                    </div>
                    <hr className="my-1" />
                    {
                        Pokemon.habilidades.map((element, index) => (
                            <div translate="yes" key={`habilidad_${element.name}_${index}`} className=" mt-1 w-100 d-flex justify-content-center">
                                <Link to={`/habilidad/${element.name_original}`} className="fs-5 fw-bold mb-0 link-card text-center"><span>{element.is_hidden ? "Habilidad Oculta: " : "Habilidad: "}</span>{element.name}</Link>
                            </div>
                        ))
                    }
                    <hr className="my-1" />
                    <div className="w-100 d-flex justify-content-center">
                        <Link to={`/generacion/${Pokemon.especie.generation.name}`} className="fs-5 fw-bold mb-0 link-card"><span>Generación: </span><img height="22px" width="55px" src={generation[Pokemon.especie.generation.name.replace('-', '_')].icono} alt="generacion" /></Link>
                    </div>
                    <hr className="my-1" />
                    {
                        Pokemon.especie.gender_rate < 0 ?
                            (<p className="w-100 text-center fs-5 fw-bold mb-0">Sin Sexo</p>)
                            :
                            (
                                <div className="w-100 d-flex  justify-content-center align-items-center">
                                    <p className="fs-5 fw-bold mb-0 me-3">Sexo:</p>
                                    <div className="d-flex flex-column  justify-content-center align-items-center">
                                        <p className="fs-5 fw-bold mb-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(255, 0, 234)" className="me-2  bi bi-gender-female" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z" />
                                            </svg>
                                            {`${(Pokemon.especie.gender_rate / 8) * 100}%`}
                                        </p>
                                        <p className="fs-5 fw-bold mb-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(0, 47, 255)" className="me-2  bi bi-gender-male" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                                            </svg>
                                            {`${100 - ((Pokemon.especie.gender_rate / 8) * 100)}%`}
                                        </p>
                                    </div>
                                </div>
                            )
                    }
                    <hr className="my-1" />
                    <div className="w-100 d-flex justify-content-center align-items-center">
                        <p className="fs-5 fw-bold mb-0 me-3">Grupo Huevo: </p>
                        <div className="d-flex flex-column  justify-content-center align-items-center">
                            {
                                Pokemon.especie.egg_groups.map((element) => (
                                    <div key={`huevo_${element.name}`} className=" d-flex justify-content-center">
                                        <p className="fs-5 fw-bold mb-0 ">{egg_group[element.name.replace('-', '_')].name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {
                        Pokemon.especie.shape ?
                            (
                                <div className="w-100 d-flex flex-column justify-content-center">
                                    <hr className="my-1" />
                                    <p className="fs-5 fw-bold mb-0 mx-auto"><span>Figura: </span><img src={forma[Pokemon.especie.shape.name.replace('-', '_')].icono} alt="forma" /></p>
                                </div>
                            )
                            :
                            <></>

                    }
                    {
                        Pokemon.especie.habitat ?
                            (
                                <div className="w-100 d-flex flex-column justify-content-center">
                                    <hr className="my-1" />
                                    <p className="fs-5 fw-bold mb-0  mx-auto"><span>{`Hábitad: ${habitat[Pokemon.especie.habitat.name.replace('-', '_')].name} `}</span><img src={habitat[Pokemon.especie.habitat.name.replace('-', '_')].icono} alt="habitad" /></p>
                                </div>
                            )
                            :
                            <></>
                    }

                    <hr className="my-1" />
                    <div className="w-100 d-flex justify-content-center">
                        <p className="fs-5 fw-bold mb-0"><span>Color: </span>{color[Pokemon.especie.color.name].name}</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Card_Pokemon_Data