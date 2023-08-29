import Navbar from '../components/Navegacion/Navbar'
import Hero from '../components/Inicio/Hero'
import SectionExplore from '../components/Inicio/SectionExplore'
import SectionObjetivo from '../components/Inicio/SectionObjectivo';
import { useEffect, useState, useContext } from "react";
import Footer from "../components/Footer"


function Inicio() {
  useEffect(() => {
    document.title="Pokémon"
  }, [])
  
  return (
    <>
      <header>
        <Navbar numero_link={1} />
        <Hero />
      </header>
      <main>
        <SectionExplore />
        <SectionObjetivo/>
        <Footer/>
      </main>
    </>
  )
}

export default Inicio