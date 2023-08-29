import logo from "../assets/LogoPokemon.png"
import facebook from "../assets/facebook.svg"
import instagram from "../assets/instagram.svg"
import twitter from "../assets/twitter.svg"
import whatsaap from "../assets/whatsaap.svg"
import { Link } from "react-router-dom"
import "../css/footer.css"

function Footer() {
    return (
        <footer className="pie-pagina">

            <div className="grupo-1">
                <div className="box">
                    <figure>
                        <Link to="/#">
                            <img src={logo} alt="Mundo_pokemon" />
                        </Link>
                    </figure>
                </div>
                <div className="box">
                    <h2>SOBRE NOSOTROS</h2>
                    <p>Mundo Pokémon fue creado con puros fines educativos y de aprendizaje, sin animos de lucro.</p>
                </div>
                <div className="box ">
                    <h2 >CONTACTO</h2>
                    <div className="red-social d-flex  aling-items-center justify-content-center">
                        <Link to="#"><img src={facebook} alt="facebook" /></Link>
                        <Link to="#"><img src={instagram} alt="instagram" /></Link>
                        <Link to="#"><img src={twitter} alt="twitter" /></Link>
                        <Link to="#"><img src={whatsaap} alt="whatsaap" /></Link>
                    </div>
                </div>
            </div>
            <div className="grupo-2">
                <small>&copy; 2023 <b>Mundo Pokémon</b> - Autor Pedro Medina.</small>
                <Link to="https://www.flaticon.com/free-icons/pokemon" title="pokemon icons">Pokemon icons created by Those Icons - Flaticon</Link>
                <Link to="https://www.wikidex.net" title="pokemon icons">Información e Iconos provenientes de - Wikidex</Link>
            </div>
        </footer>
    )
}

export default Footer