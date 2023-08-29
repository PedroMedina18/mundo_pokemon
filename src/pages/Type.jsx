import Navbar from '../components/Navegacion/Navbar'
import Data_Type from "../components/Type/Data_Type"
import { useParams } from "react-router-dom";


function Type() {
    const params = useParams();
    return (
        <>
            <Navbar numero_link={3}/>
            <Data_Type key={params.type} type={params.type}/>
        </>
    )
}

export default Type