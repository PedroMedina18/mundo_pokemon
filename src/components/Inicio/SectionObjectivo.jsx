import Imagen3 from '../../assets/fondo-carrusel-3.webp'
function SectionObjectivo() {
    return (
        <section className='section-objetivo'>
            <article>
                <h2 className='text-center'>¿Quiénes Somos?</h2>
                <div className='d-flex  flex-column flex-lg-row justify-content-center align-items-center'>
                    <img className='rounded d-none d-lg-block' width='500px' height='350px' src={Imagen3} alt="imagen" />
                    <div className='ms-0 ms-lg-5 text-white text-justify fs-6 fw-semibold'>
                        <p><span className='fs-5'>Mundo PokéMoN</span> Es un sitio web que proporciona una interfaz dinamica y amigable, relacionada con la franquizia de Pokémon. Todo la información presentado en esta web proviene de la API conocida como <a className='text-white' target='_blank' href="https://pokeapi.co/">PokéAPi</a> no se modifica nada del contenido proporcionado, solo se provee de una interfaz que facilite la navegación y la lectura de la misma.</p>
                        <p>Esta web busca cubrir toda la API que nos proporciona <a className='text-white' target='_blank' href="https://pokeapi.co/">PokéAPi</a> tratando de facilitar la navegaion y el desplazamiento por lo que presentamos infomacion sobre los Pokémon, sus movimientos, habilidades, tipos, grupos de huevos y mucho, mucho más.</p>
                    </div>
                </div>
            </article>

            <article className='mt-2 mt-lg5'>
                <h2 className='text-center'>¿Objetivos?</h2>
                <div className='d-flex justify-content-center align-items-center text-white text-justify fs-6 fw-semibold'>
                    <p><span className='fs-5'>Mundo PokéMoN</span> esta creado por <a className='text-white' target='_blank' href="https://pokeapi.co/">Pedro Medina</a> Estudiante de Informática del <a className='text-white' target='_blank' href="https://pokeapi.co/">IUJO</a> (Agosto 2023). Esta página es creada con puros fines educativos y de aprendizaje, nacida como un pequeño proyecto de semestre con el fin de praticar el diseño web y el consumo de API. Se elejio el tema de Pokémon y la API de  <a className='text-white' target='_blank' href="https://pokeapi.co/">PokéAPi</a> por simple preferencia personal, sin animos de lucro solo se busca aprender y practicar.</p>
                </div>
            </article>
        </section>
    )
}

export default SectionObjectivo