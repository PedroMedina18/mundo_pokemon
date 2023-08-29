import { useContext, useEffect, useState } from "react";
import { BuscarAPI, BuscarDataPokemon } from '../../js/peticiones'
import { AuthContext } from "../../context/AuthContext";
import Card_Pokemon_Two from "./Card_Pokemon_Two";
import Arrow_Evolution from "./Arrow_Evolution";


function Evolucion({ Pokemon, N_Pokedex }) {
    const [Linea_Evolutiva, setLinea_Evolutiva] = useState()
    const { types, move_class, move_learn_method } = useContext(AuthContext)

    useEffect(() => {
        Buscar_Evolucion()
    }, [])

    const Buscar_Evolucion = async () => {
        // *Primero buscamos la etapa base del pokemon y creamos un array para guardarlo
        const LineaEvolutiva = []
        // *Estas son unas series de varientes las cuales se eliminan de la linea de evolucion
        const validacion_especial=/minior-red-meteor/
        const validacion = /-totem|-mega|-mega-y|-mega-x|-gmax|-attack|-defense|-speed|-sky|-origin|-original|-heat|-wash|-frost|-fan|-mow|-sunny|-rainy|-snowy|-zen|-pirouette|-therian|-black|kyurem-white|-resolute|-primal|rock-star|-belle|pop-star|-phd|-libre|-cosplay|-unbound|-cap|battle-bond|-ash|power-construct|-complete|-school|-orange|minior-yellow|-green|minior-blue|minior-red|-indigo|-violet|-busted|own-tempo|-starter|-10|-gulping|-gorging|-crowned|-eternamax|-hero|-build|-mode/
        const Especie_Estandar = await BuscarAPI(Pokemon.evolucion.chain.species.url)
        const Pokemon_Validos_Estandar = Especie_Estandar.data.varieties.filter((element) => validacion_especial.test(element.pokemon.name) || !validacion.test(element.pokemon.name))
        const Data_Pokemon_Estandar = []
        for (const Pokemon_Estandar of Pokemon_Validos_Estandar) {
            const Pokemon = await BuscarAPI(Pokemon_Estandar.pokemon.url)
            let types = []
            Pokemon.data.types.forEach(element => {
                types.push(element.type.name)
            });
            Data_Pokemon_Estandar.push({
                id: Pokemon.data.id,
                name: Pokemon.data.name,
                img: Pokemon.data.sprites.other['official-artwork'].front_default,
                type: types,
            })
        }
        LineaEvolutiva[0] = {
            pokemones: Data_Pokemon_Estandar,
            especie_base:Especie_Estandar.data.name

        }

        const Etapa_Two = Pokemon.evolucion.chain.evolves_to
        // *Se comprueba si exixte una segunda
        if (Etapa_Two.length !== 0) {
            // *Luego buscamos los de Segunda Etapa, Es decir todas aquellas evoluciones que puedan venir despues de la primera
            let counter = 0
            LineaEvolutiva[0].evolucion = []
            for (const pokemon_Two of Etapa_Two) {
                const Especie_Segunda_Etapa = await BuscarAPI(pokemon_Two.species.url)
                const Pokemon_Validos_Segunda_Etapa = Especie_Segunda_Etapa.data.varieties.filter((element) => !validacion.test(element.pokemon.name))
                const Data_Pokemon_Segunda_Etapa = []
                for (const Pokemon_Segundo of Pokemon_Validos_Segunda_Etapa) {
                    const Pokemon = await BuscarAPI(Pokemon_Segundo.pokemon.url)
                    let types = []
                    Pokemon.data.types.forEach(element => {
                        types.push(element.type.name)
                    });
                    Data_Pokemon_Segunda_Etapa.push({
                        id: Pokemon.data.id,
                        name: Pokemon.data.name,
                        img: Pokemon.data.sprites.other['official-artwork'].front_default,
                        type: types,
                    })
                }
                LineaEvolutiva[0].evolucion.push({
                    pokemones: Data_Pokemon_Segunda_Etapa,
                    details: pokemon_Two.evolution_details
                })
                // *Se comprueba si exixte una tercera
                if (pokemon_Two.evolves_to.length !== 0) {
                    // *Y se busca
                    LineaEvolutiva[0].evolucion[counter].evolucion = []
                    for (const pokemon_tree of pokemon_Two.evolves_to) {
                        const Especie_Tercera_Etapa = await BuscarAPI(pokemon_tree.species.url)
                        const Pokemon_Validos_Tercera_Etapa = Especie_Tercera_Etapa.data.varieties.filter((element) => !validacion.test(element.pokemon.name))
                        const Data_Pokemon_Tercera_Etapa = []
                        for (const Pokemon_Tercero of Pokemon_Validos_Tercera_Etapa) {
                            const Pokemon = await BuscarAPI(Pokemon_Tercero.pokemon.url)
                            let types = []
                            Pokemon.data.types.forEach(element => {
                                types.push(element.type.name)
                            });
                            Data_Pokemon_Tercera_Etapa.push({
                                id: Pokemon.data.id,
                                name: Pokemon.data.name,
                                img: Pokemon.data.sprites.other['official-artwork'].front_default,
                                type: types,
                            })
                        }

                        LineaEvolutiva[0].evolucion[counter].evolucion.push({
                            pokemones: Data_Pokemon_Tercera_Etapa,
                            details: pokemon_tree.evolution_details
                        })
                    }
                }
                counter = counter + 1
            }
        }
        setLinea_Evolutiva({
            ...Linea_Evolutiva,
            data: LineaEvolutiva[0]
        })

    }
    return (
        <div className={`container-evolution bg-body-tertiary sombra  ${Pokemon.especie.color.name}`} id="accordionExample">
            {
                Linea_Evolutiva ?
                    (
                        <>
                            <div  className={`d-flex flex-wrap flex-md-nowrap flex-row flex-md-column align-items-center justify-content-center gap-3 ${Linea_Evolutiva.data.especie_base==="slowpoke"? "align-self-stretch justify-content-center justify-content-md-around":""}`}>
                                {

                                    Linea_Evolutiva.data.pokemones.map((element, index) => (
                                        <Card_Pokemon_Two key={`${element.name}_${index}`} pokemon={element} id_maximo={N_Pokedex} />
                                    ))
                                }
                            </div>
                            {   
                                Linea_Evolutiva.data.evolucion ?
                                    (
                                        <div className={`d-flex flex-row flex-md-column flex-wrap flex-md-nowrap gap-3 align-items-center  ${Linea_Evolutiva.data.especie_base==="farfetchd" || Linea_Evolutiva.data.especie_base==="qwilfish" ||Linea_Evolutiva.data.especie_base==="corsola"? "align-self-stretch justify-content-end" : "justify-content-center"}`}>
                                            {
                                                Linea_Evolutiva.data.evolucion.map((element, index) => (
                                                    <div key={`SegundoContainer_${index}`} className={`d-flex flex-column  flex-md-row  align-items-center justify-content-center`}>
                                                        <Arrow_Evolution detalles={element.details} pokemon={element.pokemones[0]}/>
                                                        <div className="d-flex flex-row flex-wrap flex-md-nowrap flex-md-column align-items-center justify-content-center gap-3 ">
                                                            {
                                                                element.pokemones.map((element_pokemon, index) => (
                                                                    <Card_Pokemon_Two key={`${element_pokemon.name}_${index}`} pokemon={element_pokemon} id_maximo={N_Pokedex} />
                                                                ))
                                                            }
                                                        </div>
                                                        {
                                                            element.evolucion ? (
                                                                <div className={`d-flex flex-row flex-wrap flex-md-nowrap flex-md-column align-items-center gap-3  ${Linea_Evolutiva.data.especie_base==="mime-jr"||"zigzagoon"?"align-self-stretch justify-content-end":"justify-content-center"}`}>
                                                                    {
                                                                        element.evolucion.map((element_two, index_two) => (
                                                                            <div key={`TercerContainer_${index_two}`} className="d-flex flex-column flex-md-row align-items-center justify-content-center">
                                                                                <Arrow_Evolution detalles={element_two.details} pokemon={element_two.pokemones[0]}/>
                                                                                <div className="d-flex flex-column align-items-center justify-content-center gap-3">
                                                                                    {
                                                                                        element_two.pokemones.map((element, index) => (
                                                                                            <Card_Pokemon_Two key={`${element.name}_${index}`} pokemon={element} id_maximo={N_Pokedex} />
                                                                                        ))
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            ) : (<></>)
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ) : (<></>)
                            }
                        </>
                    )
                    :
                    (
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
                    )
            }
        </div>
    )
}

export default Evolucion