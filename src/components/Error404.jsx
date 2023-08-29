import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'

function Error404() {
  useEffect(() => {
    document.title = "Página no encontrada | Pokémon"
  }, [])
  return (
    <>
      <main className='container-data-pokemon'>
        <div className='container-404 text-dark'>
          <div className='sub-404'>
            <h3>Página no encontrada.</h3>
            <p>¡Lo sentimos la página que buscas no existe, te ofrecemos estas opciones para que explores!</p>
            <ul >
              <li className='d-inline'><Link className='link-button' to="/">Inicio</Link></li>
              <li className='d-inline'><Link className='link-button' to="/pokedex">Pokédex</Link></li>
              <li className='d-inline-block'><Link className='link-button' to="/items">Items</Link></li>
            </ul>
          </div>
          <img className='img-404' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png" alt="psyduck" />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Error404