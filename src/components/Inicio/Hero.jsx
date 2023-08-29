import Imagen1 from '../../assets/fondo-carrusel-1.webp'

function Hero() {
    return (
        <div className="vh-90 w-100 position-relative overflow-hidden">
            <img src={Imagen1} className="d-block w-100 vh-85" alt="ImgCarrusel" />
            <div className="centrado d-block  ">
                <h5 className='pokemon'>Bienvenido al</h5>
                <h5 className='pokemon'>Mundo PokéMoN</h5>
            </div>
        </div>
    )
}

export default Hero