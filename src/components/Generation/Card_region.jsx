import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Card_region({ generation }) {
    const { regiones } = useContext(AuthContext)
    return (
        <figure style={{ width: "45%", height: "400px" }} className="mb-auto bg-dark bg-gradient rounded-3 d-flex flex-column align-items-center p-1">
            <img className={`objet-fit rounded-3 mt-1`} src={regiones[generation.data.main_region.name].img} width="98%" height="85%" alt={`${generation.data.main_region.name}`} />
            <figcaption className="fw-semibold text-white my-2">{`Región de ${regiones[generation.data.main_region.name].name} (${generation.name_ja_region.name})`}</figcaption>
        </figure>
    )
}

export default Card_region