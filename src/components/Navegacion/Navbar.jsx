import logo from '../../assets/LogoPokemon.png'
import { Link } from "react-router-dom";

// el parametro numero_link consiste en un simple numero de que link se requiere activo 
function Navbar({ numero_link = 0 }) {
    const activo = "nav-link active"
    const no_activo = "nav-link"
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-youtube">
                <div className="container-fluid ">
                    <Link className="navbar-brand" to="/">
                        <img width='200px' height='85px' src={logo} alt="Logo" />
                    </Link>


                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav ms-auto me-3 text-center fw-medium d-flex align-items-center">
                            <li className="nav-item fs-5 fw-semibold me-3">
                                <Link className={numero_link === 1 ? activo : no_activo} to="/">Inicio</Link>
                            </li>
                            <li className="nav-item fs-5 fw-semibold me-3">
                                <Link className={numero_link === 2 ? activo : no_activo} to="/pokedex">Pokédex</Link>
                            </li>
                            <li className="nav-item dropdown fs-5  fw-semibold me-3">
                                <p className={`nav-link dropdown-toggle mb-0 ${numero_link === 3 ? activo : no_activo}`}  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Tipos
                                </p>
                                <ul className="dropdown-menu dropdown-poke" >
                                    <li><Link to="/tipo/grass" className="dropdown-item item-poke-dropdown  fw-semibold" >Planta</Link></li>
                                    <li><Link to="/tipo/water" className="dropdown-item item-poke-dropdown  fw-semibold" >Agua</Link></li>
                                    <li><Link to="/tipo/fire" className="dropdown-item item-poke-dropdown  fw-semibold" >Fuego</Link></li>
                                    <li><Link to="/tipo/flying" className="dropdown-item item-poke-dropdown  fw-semibold" >Volador</Link></li>
                                    <li><Link to="/tipo/poison" className="dropdown-item item-poke-dropdown  fw-semibold" >Veneno</Link></li>
                                    <li><Link to="/tipo/normal" className="dropdown-item item-poke-dropdown  fw-semibold" >Normal</Link></li>
                                    <li><Link to="/tipo/electric" className="dropdown-item item-poke-dropdown  fw-semibold" >Eléctrico</Link></li>
                                    <li><Link to="/tipo/ground" className="dropdown-item item-poke-dropdown  fw-semibold" >Tierra</Link></li>
                                    <li><Link to="/tipo/bug" className="dropdown-item item-poke-dropdown  fw-semibold" >Bicho</Link></li>
                                    <li><Link to="/tipo/fighting" className="dropdown-item item-poke-dropdown  fw-semibold" >Lucha</Link></li>
                                    <li><Link to="/tipo/rock" className="dropdown-item item-poke-dropdown  fw-semibold" >Roca</Link></li>
                                    <li><Link to="/tipo/steel" className="dropdown-item item-poke-dropdown  fw-semibold" >Acero</Link></li>
                                    <li><Link to="/tipo/ghost" className="dropdown-item item-poke-dropdown  fw-semibold" >Fantasma</Link></li>
                                    <li><Link to="/tipo/fairy" className="dropdown-item item-poke-dropdown  fw-semibold" >Hada</Link></li>
                                    <li><Link to="/tipo/psychic" className="dropdown-item item-poke-dropdown  fw-semibold" >Psíquico</Link></li>
                                    <li><Link to="/tipo/ice" className="dropdown-item item-poke-dropdown  fw-semibold" >Hielo</Link></li>
                                    <li><Link to="/tipo/dragon" className="dropdown-item item-poke-dropdown  fw-semibold" >Dragón</Link></li>
                                    <li><Link to="/tipo/dark" className="dropdown-item item-poke-dropdown  fw-semibold" >Siniestro</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item fs-5 fw-semibold me-3">
                                <Link className={numero_link === 4 ? activo : no_activo} to="/items">Items</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>

    )
}

export default Navbar