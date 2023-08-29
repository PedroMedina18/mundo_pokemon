import Navbar from '../components/Navegacion/Navbar'
import Data_Generation from '../components/Generation/Data_Generation'
import { useParams } from "react-router-dom";

function Generation() {
    const params = useParams();
    return (
        <>
            <Navbar />
            <Data_Generation key={params.generation} generacion={params.generation}/>
        </>
    )
}

export default Generation