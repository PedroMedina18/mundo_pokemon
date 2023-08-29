import Navbar from '../components/Navegacion/Navbar'
import Data_Ability from "../components/Ability/Data_Ability"
import { useParams } from "react-router-dom";


function Ability() {
    const params = useParams();
    return (
        <>
            <Navbar />
            <Data_Ability key={params.abilitys} ability={params.ability}/>
        </>
    )
}

export default Ability