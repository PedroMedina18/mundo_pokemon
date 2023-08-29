import Navbar from '../components/Navegacion/Navbar'
import Listado from '../components/Pokemon/Listado'

function Pokémones() {
    return (
        <>
            <Navbar numero_link={2} />
            <Listado />
        </>
    )
}

export default Pokémones