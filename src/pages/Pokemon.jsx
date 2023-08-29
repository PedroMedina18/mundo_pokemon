import Navbar from '../components/Navegacion/Navbar'
import Data_Pokemon from '../components/Pokemon/Data_Pokemon'
import { useParams } from "react-router-dom";


function Pokemon() {
    const params = useParams();
    
    return (
        <>
            <Navbar numero_link={2} />
            <Data_Pokemon key={params.pokemon} pokemon={params.pokemon} />
            
        </>
    )
}

export default Pokemon