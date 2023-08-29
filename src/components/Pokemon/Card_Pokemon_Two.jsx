import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import Image_no from "../../assets/No_Image.png" 

function Card_Pokemon_Two({ pokemon, id_maximo }) {
    const { types } = useContext(AuthContext)

    //  !Esta parte se encarga de modificar el numero base
    const numero = String(pokemon.id)
    const longitud = numero.length

    let numero_pokemon

    if (longitud === 1) {
        numero_pokemon = "000" + pokemon.id
    }
    if (longitud === 2) {
        numero_pokemon = "00" + pokemon.id
    }
    if (longitud === 3) {
        numero_pokemon = "0" + pokemon.id
    }
    if (longitud === 4) {
        numero_pokemon = pokemon.id
    }
    //  !
    
    return (
        <Link translate="no" to={`/pokemon/${pokemon.name}`} className="card card-pokemon card-pokemon-ms text-decoration-none" >
            <p className="text-card">{pokemon.id <= id_maximo ? `N° ${numero_pokemon}` : 'Variante Pokemon'}</p>
            <img src={pokemon.img?pokemon.img : Image_no} className="card-img-top " alt={pokemon.name} />
            <p className="text-title">{pokemon.name.replace(/-/g," ")}</p>
            <div className="d-flex flex-column mt-1 w-100 justify-content-evenly align-items-center gap-1">
                {
                    pokemon.type.map(element => (
                        <img key={`${pokemon.name}_${element}`} src={types[element].nombre_pequeño} />
                    ))
                }
            </div>

        </Link>
    )
}


export default Card_Pokemon_Two