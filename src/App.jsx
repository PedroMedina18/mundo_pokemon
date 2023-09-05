import Inicio from './pages/Inicio'
import Pokemones from './pages/Pokémones'
import Pokemon from './pages/Pokemon'
import Error from './components/Error404'
import Type from './pages/Type'
import Ability from './pages/Ability'
import Move from './pages/Move'
import Item from './pages/Item'
import BuscarItems from './pages/BuscarItems'
import Page_404 from './pages/Page_404'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/pokedex" element={<Pokemones />} />
        <Route path="/pokemon/:pokemon" element={<Pokemon />} />
        <Route path="/tipo/:type" element={<Type/>} />
        <Route path="/habilidad/:ability" element={<Ability />} />
        <Route path="/movimiento/:move" element={<Move />} />
        <Route path="/items/" element={<BuscarItems />} />
        <Route path="/item/:item" element={<Item />} />
        <Route path="*" element={<Page_404/>} />
      </Routes>
    </Router>
  )
}

export default App
