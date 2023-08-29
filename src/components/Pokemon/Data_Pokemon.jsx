import { useEffect, useState } from "react";
import { BuscarDataPokemon, BuscarAPI } from '../../js/peticiones'
import Loading from '../Loading'
import Error from '../Error404'
import { useNavigate, Link } from "react-router-dom";
import Card_Pokemon_Data from './Card_Pokemon_Data'
import Carrusel_Description from '../Carrusel_Description'
import Stats from './Stats'
import Sprites from "./Sprites";
import Card_Pokemon from "./Card_Pokemon"
import List_Movimientos from "./List_Movimientos";
import Card_item from "../Item/Card_item";
import Evolucion from "./Evolucion";
import Footer from "../Footer";

function Data_Pokemon({ pokemon }) {
  const [PokedexNational, setPokedexNational] = useState(0)
  const [Pokemon, setPokemon] = useState()
  const [error, setError] = useState({ state: false, })
  const navigate = useNavigate()

  useEffect(() => {
    BuscarPokemon()
  }, [])

  // *funcion encargada de buscar la informacion base del pokemon
  const BuscarPokemon = async () => {
    try {

      // !Busquedad de la informacion base
      const res = await BuscarDataPokemon(pokemon)

      //!Busquedad del numero maximo en la Pokedex Nacional
      const Numero_Maximo_National = await BuscarAPI("https://pokeapi.co/api/v2/pokedex/1");
      const Total_National = Numero_Maximo_National.data.pokemon_entries
      setPokedexNational(Total_National.length)


      //!un redireccionamiento por si ingresa por el id
      document.title = `${res.data.name.replace(/-/g, " ").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))} | Pokémon`
      if (!isNaN(pokemon)) {
        navigate(`/pokemon/${res.data.name}`, { replace: true })
      }

      // !esta parte se encargada de buscar el nombre de las habilidades la funcion es otra que esta abajo
      let habilidades = []
      for (const ability of res.data.abilities) {
        const habilidad_data = await BuscarHabilidades(ability.ability.url)
        const habilidad = {
          is_hidden: ability.is_hidden,
          name: habilidad_data.name,
          name_original: habilidad_data.name_original,
        }
        habilidades.push(habilidad)
      }
      // !BUsquedad de informacion de especie
      const especie = await BuscarAPI(res.data.species.url)

      // !BUsquedad de la categoria
      let categoria = especie.data.genera.filter(element => element.language.name === "es")
      if (categoria.length === 0) {
        categoria = especie.data.genera.filter(element => element.language.name === "en")
        const categoria_traduccion = await BuscarAPI(`https://api.mymemory.translated.net/get?q=${categoria[0].genus}&langpair=en|es&de=medinapedrito2@gmail.com`)
        categoria[0].genus = categoria_traduccion.data.responseData.translatedText
      }
      //!Busquedad de las descripciones
      let descriptions = especie.data.flavor_text_entries.filter(element => element.language.name === "es")
      if (descriptions.length === 0) {
        descriptions = especie.data.flavor_text_entries.filter(element => element.language.name === "en")
        for (const description of descriptions) {
          const version = await BuscarAPI(description.version.url)
          const lengua = version.data.names.filter(element => element.language.name === "es")
          const flavor_text = description.flavor_text.replace(/\n/g, " ")
          const traduccion = await BuscarAPI(`https://api.mymemory.translated.net/get?q=${flavor_text}&langpair=en|es&de=medinapedrito2@gmail.com`)
          description.descripcion = traduccion.data.responseData.translatedText
          description.version = lengua[0].name
        }

      } else {
        for (const description of descriptions) {
          const version = await BuscarAPI(description.version.url)
          const lengua = version.data.names.filter(element => element.language.name === "es")
          const flavor_text = description.flavor_text.replace(/\n/g, " ")
          description.descripcion = flavor_text
          description.version = lengua[0].name
        }
      }

      // !Buscamos el numero de la pokedex Nacional
      const Numero = Obtener_Numero(res.data.id)

      //!Busquedad de las posibles Formas del Pokemon
      let formas = []
      if (res.data.forms.length > 1) {
        for (const forma of res.data.forms) {
          const respuesta_forma = await BuscarAPI(forma.url)
          let name_forma = respuesta_forma.data.form_names.filter(element => element.language.name === "es")
          if (name_forma.length === 0) {
            name_forma = respuesta_forma.data.form_names.filter(element => element.language.name === "en")
            if (name_forma.length === 0) {
              name_forma[0] = respuesta_forma.data.name
            } else {

              const name_forma_traduccion = await BuscarAPI(`https://api.mymemory.translated.net/get?q=${name_forma[0].name}&langpair=en|es&de=medinapedrito2@gmail.com`)
              name_forma[0].name = name_forma_traduccion.data.responseData.translatedText
            }
          }

          formas.push({
            forma: name_forma[0],
            sprits: respuesta_forma.data.sprites,
            types: respuesta_forma.data.types
          })
        }
      }
      //!Busquedad de las variantes de la especie del pokemon
      let variantes = []
      for (const varietie of especie.data.varieties) {
        const data = await BuscarAPI(varietie.pokemon.url)
        const types = []
        data.data.types.forEach(element => {
          types.push(element.type.name)

        });
        variantes.push({
          id: data.data.id,
          is_default: varietie.is_default,
          name: varietie.pokemon.name,
          type: types,
          img: data.data.sprites.other["official-artwork"].front_default
        })
      }
      //!Busquedad de los items que puede tener el Pokemon
      let items = []
      for (const item of res.data.held_items) {
        const data_item = await BuscarAPI(item.item.url)
        let name_traduccion = data_item.data.names.filter((element) => element.language.name === "es")
        if (name_traduccion.length === 0) {
          name_traduccion = data_item.data.names.filter((element) => element.language.name === "en")
        }
        items.push({
          id: data_item.data.id,
          name: name_traduccion[0].name,
          name_original: data_item.data.name,
          img: data_item.data.sprites.default
        })
      }
      // !Busquedad del pokemon anterior y el proximo pokemon
      let PokemonPrevius
      if (res.data.id > 1 && res.data.id < Total_National.length) {
        const Data_Pokemon_Previus = await BuscarDataPokemon(res.data.id - 1)
        PokemonPrevius = {
          id: Data_Pokemon_Previus.data.id,
          name: Data_Pokemon_Previus.data.name,
          numeroPokedex: Obtener_Numero(Data_Pokemon_Previus.data.id)
        }
      }
      let PokemonNext
      if (res.data.id < Total_National.length) {
        const Data_Pokemon_Next = await BuscarDataPokemon(res.data.id + 1)
        PokemonNext = {
          id: Data_Pokemon_Next.data.id,
          name: Data_Pokemon_Next.data.name,
          numeroPokedex: Obtener_Numero(Data_Pokemon_Next.data.id)
        }
      }
      const evolucion = await BuscarAPI(especie.data.evolution_chain.url)

      // !Guardamos los datos
      setPokemon({
        ...Pokemon,
        numero: Numero,
        data: res.data,
        habilidades: habilidades,
        especie: especie.data,
        categoria: categoria[0].genus,
        descriptions: descriptions,
        formas: formas,
        variantes: variantes,
        items: items,
        evolucion: evolucion.data,
        PokemonPrevius: PokemonPrevius,
        PokemonNext: PokemonNext
      })
    } catch (error) {
      console.log(`tenemos un error ${error}`)
      console.log(error)
      if (error.response.status === 404) {
        setError({
          ...error,
          state: true,
        })
        setPokemon([])
      }
    }
  }

  // *funcion encargada de buscar la habilidad del pokemon
  const BuscarHabilidades = async (url) => {
    try {
      const res = await BuscarAPI(url)
      let name = res.data.names.filter(element => element.language.name === "es")
      if (name.length === 0) {
        name = res.data.names.filter(element => element.language.name === "en")
        const res_traduccion = await BuscarAPI(`https://api.mymemory.translated.net/get?q=${name[0].name}&langpair=en|es&de=medinapedrito2@gmail.com`)
        name[0].name = res_traduccion.data.responseData.translatedText
      }
      return { name: name[0].name, name_original: res.data.name }
    } catch (error) {
      console.log(error.response)
    }
  }

  const Obtener_Numero = (numero) => {
    const string = String(numero)
    const longitud = string.length
    if (longitud === 1) {
      return ("000" + numero)
    }
    if (longitud === 2) {
      return ("00" + numero)
    }
    if (longitud === 3) {
      return ("0" + numero)
    }
    if (longitud === 4) {
      return (numero)
    }
  }
  return (
    <>
      {
        Pokemon ?
          !error.state ?
            (
              <>
                <main className='container-data-pokemon overflow-x-hidden' >
                  <div className={`container-pokemon ${Pokemon.especie.color.name} text-dark`}>
                    {
                      Pokemon.data.id <= 10000 ?
                        (
                          <section className="w-100 d-flex justify-content-between encabezado_pokemon mb-5">
                            {
                              Pokemon.PokemonPrevius ?
                                (
                                  <Link className={`flecha_pokemon_previus  ${Pokemon.especie.color.name}`} translate="no" to={`/pokemon/${Pokemon.PokemonPrevius.name}`}>
                                    <span className="fw-bold me-2 me-sm-3 mb-auto mt-2">{Pokemon.PokemonPrevius.id <= PokedexNational ? `N° ${Pokemon.PokemonPrevius.numeroPokedex}` : 'Variante'}</span>
                                    <span className="mb-auto mt-2">{Pokemon.PokemonPrevius.name.replace(/\-/g, " ")}</span>
                                  </Link>
                                )
                                :
                                (<></>)
                            }
                            {
                              Pokemon.PokemonNext ?
                                (
                                  <Link translate="no" className={`flecha_pokemon_next  ${Pokemon.especie.color.name}`} to={`/pokemon/${Pokemon.PokemonNext.name}`}>
                                    <span className="mb-auto mt-2">{Pokemon.PokemonNext.name.replace(/\-/g, " ")}</span>
                                    <span className="fw-bold ms-2 ms-sm-3 mb-auto mt-2">{Pokemon.PokemonNext.id <= PokedexNational ? `N° ${Pokemon.PokemonNext.numeroPokedex}` : 'Variante'}</span>
                                  </Link>
                                )
                                :
                                (<></>)
                            }
                            <div className=" text-center text-capitalize data-nombre titulo_pokemon position-absolute  px-3 px-sm-2">
                              <h1 translate="no" className=" fw-bold ">
                                <span className="fw-bold me-2 me-sm-3">{Pokemon.data.id <= PokedexNational ? `N° ${Pokemon.numero}` : 'Variante'}</span>
                                {Pokemon.data.name.replace(/-/g, " ").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}
                              </h1>
                            </div>
                          </section>
                        )
                        :
                        (
                          <h1 translate="no" className=" fw-bold title-pokemon text-center">
                            <span className="fw-bold me-2 me-sm-3">{Pokemon.data.id <= PokedexNational ? `N° ${Pokemon.numero}` : 'Variante'}</span>
                            {Pokemon.data.name.replace(/-/g, " ").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}
                          </h1>
                        )
                    }


                    <section className="w-100 mt-3 d-flex container-one-pokemon justify-content-around align-items-center" style={{ height: "max-content" }}>

                      <Card_Pokemon_Data Pokemon={Pokemon} />
                      <div className="data-pokemon d-flex flex-column justify-content-between align-self-center align-self-md-stretch">
                        {
                          Pokemon.descriptions.length ?
                            (
                              <Carrusel_Description descripciones={Pokemon.descriptions} color={Pokemon.especie.color.name} />
                            ) :
                            (<></>)
                        }
                        <Stats Pokemon={Pokemon} />
                      </div>
                    </section>

                    <hr />
                    <h2 className='fs-1 text-center fw-bold'>Cadena Evolutiva</h2>
                    <Evolucion Pokemon={Pokemon} N_Pokedex={PokedexNational} />

                    {
                      Pokemon.variantes.length === 1 ?
                        (<></>)
                        :
                        (
                          <>
                            <hr />
                            <section translate="no" className="w-100 mt-3">
                              <h2 className='fs-1 text-center fw-bold'>Variantes</h2>
                              <div className="d-flex justify-content-center flex-wrap gap-3">
                                {
                                  Pokemon.variantes.map((element, index) => (
                                    <Card_Pokemon key={`variante_${index}`} pokemon={element} id_maximo={PokedexNational} nombre={false} ></Card_Pokemon>
                                  ))
                                }
                              </div>
                            </section>
                          </>
                        )
                    }
                    {
                      Pokemon.items.length === 0 ?
                        (<></>)
                        :
                        (
                          <>
                            <hr />
                            <section translate="no" className="w-100">
                              <h2 className='fs-1 text-center fw-bold'>Items</h2>
                              <p className="text-center fs-5 fw-semibold">Items que puede tener cuando se encuentra</p>
                              <div className="d-flex flex-wrap justify-content-center gap-4">
                                {
                                  Pokemon.items.map((element) => (
                                    <Card_item key={`${element.name}`} item={element} />
                                  ))
                                }
                              </div>
                            </section>
                          </>
                        )
                    }

                    {
                      Pokemon.data.moves.length === 0 ?
                        (<></>)
                        :
                        (
                          <>
                            <hr />
                            <section>
                              <h2 className='fs-1 text-center fw-bold'>Movimientos</h2>
                              <List_Movimientos Pokemon={Pokemon} />
                            </section>
                          </>
                        )
                    }

                    <hr />
                    <Sprites Pokemon={Pokemon} />
                  </div>
                </main>
                <Footer />
              </>
            )
            :
            (<Error />)
          :
          (
            <Loading />
          )
      }
    </>

  )
}

export default Data_Pokemon