import Navbar from '../components/Navegacion/Navbar'
import Data_Item from "../components/Item/Data_Item"
import { useParams } from "react-router-dom";

function Item() {
    const params = useParams();
    return (
        <>
            <Navbar numero_link={4}/>
            <Data_Item key={params.item} item={params.item} />
        </>
    )

}

export default Item