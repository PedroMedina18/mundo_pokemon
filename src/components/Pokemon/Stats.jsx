import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Stats({ Pokemon }) {
    const { stats, crecimiento } = useContext(AuthContext)
    return (
        <div translate="no" className={`w-100 rounded-3 p-0 p-sm-2 sombra mt-4 ${Pokemon.especie.color.name}`} >
            <h3 className="w-100 text-center fw-bold">Estadísticas Base</h3>
            <div className="w-100 d-flex flex-wrap justify-content-evenly">
                {
                    Pokemon.data.stats.map((element) => (
                        <div className={`bg-${Pokemon.especie.color.name}-gradiens stat rounded-5 text-center d-flex flex-column justify-content-center align-items-center p-2 my-2`} key={element.stat.name}>
                            <p className="mb-0 fw-bold ">{`${stats[element.stat.name.replace(/-/g, "_")].name}`}</p>
                            <p className="mb-0 fw-medium">{element.base_stat}</p>
                        </div>
                    ))
                }

            </div>
            <hr />
            <h3 className="w-100 text-center fw-bold">Información Base</h3>
            <div className="w-100 d-flex flex-wrap justify-content-evenly gap-2">
                <div className={`bg-${Pokemon.especie.color.name}-gradiens  rounded-5 text-center d-flex flex-column justify-content-center align-items-center p-2 my-2 stat-2`}>
                    <p title="Experiencia que da el Pokémon al ser derrotado" className="mb-0 fw-bold ">Experiencia Base</p>
                    <p className="mb-0  fw-medium">{Pokemon.data.base_experience?Pokemon.data.base_experience:0}</p>
                </div>
                <div className={`bg-${Pokemon.especie.color.name}-gradiens  rounded-5 text-center d-flex flex-column justify-content-center align-items-center p-2 my-2 stat-2`}>
                    <p title="La Felicidad base del Pokémon " className="mb-0 fw-bold ">Felicidad Base</p>
                    <p className="mb-0  fw-medium">{Pokemon.especie.base_happiness}</p>
                </div>
                <div className={`bg-${Pokemon.especie.color.name}-gradiens  rounded-5 text-center d-flex flex-column justify-content-center align-items-center p-2 my-2 stat-2`}>
                    <p title="Tasa de Captura" className="mb-0 fw-bold ">Tasa de Captura</p>
                    <p className="mb-0  fw-medium">{Pokemon.especie.capture_rate}</p>
                </div>
                <div className={`bg-${Pokemon.especie.color.name}-gradiens  rounded-5 text-center d-flex flex-column justify-content-center align-items-center p-2 my-2 stat-2`}>
                    <p title="Pokémon Bebe?" className="mb-0 fw-bold ">Bebé</p>
                    <p className="mb-0  fw-medium">{Pokemon.especie.is_baby? "Si":"No"}</p>
                </div>
                <div className={`bg-${Pokemon.especie.color.name}-gradiens  rounded-5 text-center d-flex flex-column justify-content-center align-items-center p-2 my-2 stat-2`}>
                    <p title="Pokémon Legendario?" className="mb-0 fw-bold ">Legendario</p>
                    <p className="mb-0  fw-medium">{Pokemon.especie.is_legendary? "Si":"No"}</p>
                </div>
                <div className={`bg-${Pokemon.especie.color.name}-gradiens  rounded-5 text-center d-flex flex-column justify-content-center align-items-center p-2 my-2 stat-2`}>
                    <p title="Pokémon Mítico?" className="mb-0 fw-bold ">Mítico</p>
                    <p className="mb-0  fw-medium">{Pokemon.especie.is_mythical? "Si":"No"}</p>
                </div>
                <div className={`bg-${Pokemon.especie.color.name}-gradiens  rounded-5 text-center d-flex flex-column justify-content-center align-items-center p-2 my-2 stat-2`}>
                    <p title="Velocidad con la que gana experiencia" className="mb-0 fw-bold ">Velocidad de Crecimiento</p>
                    <p className="mb-0  fw-medium">{crecimiento[Pokemon.especie.growth_rate.name.replace(/-/g, "_")].name}</p>
                </div>
                <div className={`bg-${Pokemon.especie.color.name}-gradiens  rounded-5 text-center d-flex flex-column justify-content-center align-items-center p-2 my-2 stat-2`}>
                    <p title="Contador para que eclosione el huevo" className="mb-0 fw-bold ">Contador de Eclosión</p>
                    <p className="mb-0  fw-medium">{`${255*(Pokemon.especie.hatch_counter+1)} Pasos`}</p>
                </div>

            </div>
        </div>
    )
}

export default Stats