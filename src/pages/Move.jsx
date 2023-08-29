import Navbar from '../components/Navegacion/Navbar'
import Data_Move from "../components/Move/Data_Move"
import { useParams } from "react-router-dom";

function Move() {
    const params = useParams();
    return (
        <>
            <Navbar numero_link={2}/>
            <Data_Move key={params.move} move={params.move}/>
        </>
    )
}

export default Move