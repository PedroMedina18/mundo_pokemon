import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import triste from "../../assets/triste.svg"

function Card_Data_Item({ item }) {
  const { item_attribute, item_pocket, item_fling_effect } = useContext(AuthContext)
  return (
    <div  className='container-item container-card-item'>
      <div className={`d-flex flex-column orange align-self-stretch align-items-center justify-content-around py-3 px-2`} style={{ width: "100%", borderRadius: "20px" }}>
        <h1 className="fs-1 fw-bold text-center m-0 text-capitalize">{item.name}</h1>
        <h3 className="fs-5 fw-bold m-0 fst-italic">{item.data.names.filter((element) => element.language.name === "ja").length !== 0 ? item.data.names.filter((element) => element.language.name === "ja")[0].name : ""}</h3>
        <hr className="hr" />
        {
          item.data.sprites.default ?
            (<img src={item.data.sprites.default} alt={item.name} className="mb-3" width="100px" />) :
            (<img src={triste} alt="No hay img" className="mb-3" width="100px" />)
        }
        {
          item.data.cost ?
            (
              <>
                <hr className="hr my-1" />
                <p className="fs-5 fw-semibold mb-0  text-center">Precio: {item.data.cost}</p>
              </>
            ) :
            (<></>)
        }
        {
          item.data.fling_power ?
            (<>
              <hr className="hr my-1" />
              <p className="fs-5 fw-semibold mb-0  text-center">Aumento de Poder: {item.data.fling_power}</p>
            </>
            ) :
            (<></>)
        }
        {
          item.data.fling_effect ?
            (
              <>
                <hr className="hr my-1" />
                <p title='El efecto del movimiento Lanzamiento cuando se usa con este objeto.' className="fs-5 fw-semibold mb-0  text-center">Efecto al ser Lanzado: <span className="tooltip-new">{item_fling_effect[item.data.fling_effect.name.replace(/\-/g, "_")].name} <span className="tooltip-new-box">{item_fling_effect[item.data.fling_effect.name.replace(/\-/g, "_")].description}</span></span></p>
                <hr className="hr my-1" />
              </>
            ) :
            (<hr className="hr my-1" />)
        }
        {
          item.data.attributes.length !== 0 ?
            (
              <>
                <h3 className="w-100 text-center fw-bold">Atributos</h3>

                {
                  item.data.attributes.map((element, index) => (
                    <p key={`atributo_${index}`} className="tooltip-new fs-5 fw-semibold mb-0">{item_attribute[element.name.replace(/\-/g, "_")].name} <span className="tooltip-new-box">{item_attribute[element.name.replace(/\-/g, "_")].description}</span></p>
                  ))
                }
                <hr className="hr my-1" />
              </>
            ) :
            (<></>)
        }
        <p className="fs-5 fw-semibold mb-0 text-center">Categoría: {item.category.name}</p>
        <hr className="hr my-1" />
        <p className="fs-5 fw-semibold mb-0 text-center">Bolsillo: {item_pocket[item.category.pocket.replace(/\-/g, "_")].name}</p>
        {
          item.efecto ?
            (
              <>
                <hr className="hr my-1" />
                <h3 className="w-100 text-center fw-bold">Efecto</h3>
                <p className="fs-5 fw-semibold mb-0 text-center">{item.efecto.short_effect}</p>
              </>
            ) :
            (<></>)
        }
      </div>
    </div>
  )
}

export default Card_Data_Item