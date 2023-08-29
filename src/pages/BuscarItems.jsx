import Navbar from '../components/Navegacion/Navbar'
import Listado_items from '../components/Item/Listado_items'

function BuscarItems() {
    return (
        <>
            <Navbar numero_link={4} />
            <Listado_items />
        </>
    )
}

export default BuscarItems