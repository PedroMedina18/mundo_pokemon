import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BuscarAPI } from '../../js/peticiones'

function Table_Abilities({ abilities, color }) {
    const { types, move_class } = useContext(AuthContext)
    const [list_abilities, setList_abilities] = useState()
    useEffect(() => {
        BuscarAbilities()
    }, [])
    const BuscarAbilities = async () => {
        const list_Abilities = []
        console.log()
        for (const ability of abilities) {
            const res = await BuscarAPI(ability.url)
            let name = res.data.names.filter(element => element.language.name === "es")
            if (name.length === 0) {
                name = res.data.names.filter(element => element.language.name === "en")
                const res_traduccion = await BuscarAPI(`https://api.mymemory.translated.net/get?q=${name[0].name}&langpair=en|es&de=medinapedrito2@gmail.com`)
                name[0].name = res_traduccion.data.responseData.translatedText
            }
            list_Abilities.push({
                name:name[0].name,
                name_original:res.data.name
            })
            if(list_Abilities.length>10){
                setList_abilities(list_Abilities)
            }
        }
    }

    return (
        <div style={{ borderWidth: "3px", background: "transparent", }} className={`table_move w-30 mx-auto ${color} rounded-3`}>
            <table style={{ borderWidth: "0px", background: "transparent", height:"510px" }} className={` ${color} rounded-3 w-100`}>
                {
                    list_abilities?
                        (
                            <>
                                <thead>
                                    <tr className={` px-2`}>
                                        <th className={`text-center ${color}`} style={{ width: "10%", borderWidth: "3px", fontSize: "1.1rem", borderRight: "0px" }}>N°</th>
                                        <th className={`text-center ${color}`} style={{ width: "90%", borderWidth: "3px", fontSize: "1.1rem", borderRight: "0px" }}>Nombre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        list_abilities.map((element, index) => (
                                            <tr className={`${((index + 1) % 2) === 0 ? color : ""}-opacity-bg-50`} key={element.name_original}>
                                                <th style={{ borderWidth: "3px", background: "transparent", borderTop: "0px" }} className={`py-1 ${color}`} colSpan="4">
                                                    <Link className="d-block d-flex link-dark" to={`/habilidad/${element.name_original}`}>
                                                        <span className="text-center" style={{ width: "10%" }}>{index + 1}</span>
                                                        <span className="text-center" style={{ width: "90%" }}>{element.name}</span>
                                                    </Link>
                                                </th>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </>
                        )
                        :
                        (
                            <tbody>
                                <tr>
                                    <th style={{ borderWidth: "3px", background: "transparent" }} className={`${color} p-3`} >
                                        <div className="m-0 w-100 d-flex justify-content-center ">
                                            <div className="spinner-grow text-dark ms-2" style={{ width: "4rem", height: "4rem" }} role="status">
                                                <span className="visually-hidden ">Loading...</span>
                                            </div>
                                            <div className="spinner-grow text-dark ms-2" style={{ width: "4rem", height: "4rem" }} role="status">
                                                <span className="visually-hidden ">Loading...</span>
                                            </div>
                                            <div className="spinner-grow text-dark ms-2" style={{ width: "4rem", height: "4rem" }} role="status">
                                                <span className="visually-hidden ">Loading...</span>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </tbody>
                        )
                }
            </table>
        </div>
    )
}

export default Table_Abilities