import { ListarItem, BuscarAPI } from '../../js/peticiones'
import { useEffect, useState } from "react";
import Loading from '../Loading'
import Card_item from './Card_item'
import InfiniteScroll from 'react-infinite-scroll-component'
import Error from '../Error404'
import Navbar_Item from '../Navegacion/Navbar_Item';
import Footer from '../Footer';

function Listado_items() {
  const [Items, setItems] = useState([])
  const [Arrays, setArrays] = useState()
  const [pagina, setPagina] = useState(1)
  const [error, setError] = useState({ state: false, })
  const [hasMore, setHasMore] = useState(true)
  const [Coincidencias, setCoincidencias] = useState(true)

  useEffect(() => {
    document.title = "Items | Pokémon"
    item(1)
  }, [])

  // *funcion encargada de buscar la lista de todos los items en la API
  const item = async (page = pagina) => {
    try {
      setPagina(page)
      const respuesta = await ListarItem((page - 1) * 15, 15);
      const PaginasTotal = Boolean(respuesta.data.count % 15) ? parseInt(respuesta.data.count / 15) + 1 : parseInt(respuesta.data.count / 15)
      const listadoItems = respuesta.data.results
      agregarItems(listadoItems, page)

      if (!(page < PaginasTotal)) {
        setHasMore(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const item_array = async ({ page, array = null }) => {
    setPagina(page)
    if (array) {
      setArrays(array)
      const listadoItems = array[page - 1]
      agregarItems(listadoItems, page)
      if (page => array.length) {
        setHasMore(false)
      }
    } else {
      const listadoItems = Arrays[page - 1]
      agregarItems(listadoItems, page)
      if (page => Arrays.length) {
        setHasMore(false)
      }
    }
  }
  // *funcion encargada de crear una lista con las targetas de los items
  const agregarItems = async (listado, page) => {
    try {
      const DataItems = []
      for (const item of listado) {
        const res = await BuscarAPI(item.url)
        let name_traduccion = res.data.names.filter((element) => element.language.name === "es")
        if (name_traduccion.length === 0) {
          name_traduccion = res.data.names.filter((element) => element.language.name === "en")
        }
        const Item = {
          id: res.data.id,
          name: name_traduccion[0].name,
          name_original: res.data.name,
          img: res.data.sprites.default,
        }
        DataItems.push(Item)
      }
      if (page === 1) {
        setItems(DataItems)
      } else {
        const listItems = Items.concat(DataItems)
        setItems(listItems)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const rotar = () => {
    const arrow = document.querySelector("#arrow")
    arrow.classList.toggle("rotate-180")
  }
  return (
    <>
      {
        error.state ?
          (<Error />)
          :
          Items.length !== 0 ?
            (
              <>
                <Navbar_Item
                  setItems={setItems}
                  setArrays={setArrays}
                  setCoincidencias={setCoincidencias}
                  setPagina={setPagina}
                  setHasMore={setHasMore}
                  item={item}
                  item_array={item_array}
                />
                <main className='container-data-pokemon' id="contenedorpokemon">
                  <button onClick={(e) => { rotar(e) }} className="button-avanzado "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menu_avanzado_item"
                    aria-controls="menu_avanzado_item"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    Búsquedad Avanzada
                    <span className='ms-2'>
                      <svg id="arrow" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-caret-down-fill transition" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                      </svg>
                    </span>
                  </button>
                  {
                    Coincidencias ?
                      (
                        <InfiniteScroll dataLength={Items.length} hasMore={hasMore}
                          next={
                            () => {
                              if (Arrays) {
                                const Nueva_Pagina = pagina + 1
                                item_array({ page: Nueva_Pagina })
                              } else {
                                const Nueva_Pagina = pagina + 1
                                item(Nueva_Pagina)
                              }
                            }
                          }
                          loader={
                            <>
                              <div className='d-flex w-100 justify-content-center'>
                                <div className="spinner-grow text-light mx-1 mb-2" style={{ width: "4rem", height: "4rem" }} role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                                <div className="spinner-grow text-light mx-1 mb-2" style={{ width: "4rem", height: "4rem" }} role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                                <div className="spinner-grow text-light mx-1 mb-2" style={{ width: "4rem", height: "4rem" }} role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                                <div />
                              </div>
                            </>
                          }
                          scrollThreshold="500px"
                        >
                          <div className='w-100 px-3 px-md-5 d-flex flex-column justify-content-center align-items-cente'>
                            <div className='w-100  py-4 d-flex flex-wrap gap-4 justify-content-center'>
                              {
                                Items.map((item) => (
                                  <Card_item key={item.name} item={item} />
                                ))
                              }
                            </div>
                          </div>
                        </InfiniteScroll>
                      )
                      :
                      (
                        <>
                          <div className='  d-flex  justify-content-center  my-auto' >
                            <div className='container-alerta'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" fill="#e52d27" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                              </svg>
                              <p className='fs-3 fw-bold text-center mb-2'>No se Encontro ninguna Coincidencia</p>
                              <p className='fs-5 fw-semibold text-center mb-0'>¡Reduzca las condiciones o pruebe otra combinacion para encontrar el item que busca!</p>
                            </div>
                          </div>
                        </>
                      )
                  }

                </main>
                <Footer/>
              </>
            )
            :
            (
              <Loading />
            )
      }

    </>
  )
}

export default Listado_items