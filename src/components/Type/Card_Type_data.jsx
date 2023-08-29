import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Card_Type_data({ type }) {
  const { types } = useContext(AuthContext)
  return (
    <div className={`${type.data.name} d-none d-md-flex flex-column align-self-stretch align-items-center justify-content-around rounded-3 py-3`} style={{ width: "35%", borderWidth: "4px" }}>
      <div className="w-100">
        <p className="fs-1 fw-bold text-center m-0">{type.data.names.filter(element => element.language.name === "es")[0].name}</p>
        <div className="d-flex justify-content-center">
          <p className="fs-5 fw-bold m-0 fst-italic">{`${type.data.names.filter(element => element.language.name === "en")[0].name}`}</p>
          <p className="fs-5 fw-bold m-0 ms-3 fst-italic">{`( ${type.data.names.filter(element => element.language.name === "ja-Hrkt")[0].name} )`}</p>
        </div>
        <hr className="hr" />
      </div>
      <figure style={{ width: "95%", height: "400px" }} className="mb-auto bg-dark bg-gradient rounded-3 d-flex flex-column align-items-center p-1">
        <img className={`objet-fit rounded-3 mt-1`} src={types[type.data.name].img_pokemon} width="98%" height="85%" alt={`icono_${type.data.name}`} />
        <figcaption className="fw-semibold text-white my-2">{`Algunos Pokémones Tipo ${types[type.data.name].name}`}</figcaption>
      </figure>
    </div>
  )
}

export default Card_Type_data