import React from 'react'
import Tabla_Sprits from './Tabla_Sprits'
import Tabla_Generacion_i from './Tabla_Generacion_i'
import Tabla_Generacion_ii from './Tabla_Generacion_ii'
import Tabla_Generacion_iii from './Tabla_Generacion_iii'
import Tabla_Generacion_iv from './Tabla_Generacion_iv'
import Tabla_Generacion_v from './Tabla_Generacion_v'
import Tabla_Generacion_vi from './Tabla_Generacion_vi'
import Tabla_Generacion_vii from './Tabla_Generacion_vii'
import Tabla_Generacion_viii from './Tabla_Generacion_viii'
import Tabla_Mundo_Sueño from './Tabla_Mundo_Sueño'
import Tabla_Hogar from './Tabla_Hogar'
import Formas from './Formas'

function Sprites({ Pokemon }) {
    return (

        <section translate="no" className='w-100 mt-3'>
            <h2 className='fs-1 text-center fw-bold'>Sprites</h2>
            {
                Pokemon.especie.has_gender_differences ?
                    (<p className='text-center fs-5 fw-semibold'>Este Pokémon Posee Diferencias Visibles de Género</p>)
                    :
                    (<p className='text-center fs-5 fw-semibold'>Este Pokémon No Posee Diferencia Visibles de Género</p>)
            }
            {
                Pokemon.formas.length === 0 ?
                    (<Tabla_Sprits Pokemon={Pokemon} />)
                    :
                    (<Formas Pokemon={Pokemon} />)
            }

            {
                Pokemon.data.sprites.other.dream_world.front_default || Pokemon.data.sprites.other.dream_world.front_female ?
                    (
                        <Tabla_Mundo_Sueño Pokemon={Pokemon} />
                    ) :
                    (
                        <></>
                    )
            }

            {
                Pokemon.data.sprites.other.home.front_default || Pokemon.data.sprites.other.home.front_shiny ?
                    (
                        <Tabla_Hogar Pokemon={Pokemon}/>
                    )
                    :
                    (
                        <></>
                    )
            }
            {
                Pokemon.data.sprites.versions["generation-i"]["yellow"].front_default || Pokemon.data.sprites.versions["generation-i"]["red-blue"].front_default ?
                    (
                        <Tabla_Generacion_i Pokemon={Pokemon} />
                    )
                    :
                    (
                        <></>
                    )
            }
            {
                Pokemon.data.sprites.versions["generation-ii"]["crystal"].front_default || Pokemon.data.sprites.versions["generation-ii"]["gold"].front_default || Pokemon.data.sprites.versions["generation-ii"]["silver"].front_default ?
                    (
                        <Tabla_Generacion_ii Pokemon={Pokemon} />
                    )
                    :
                    <></>
            }
            {
                Pokemon.data.sprites.versions["generation-iii"]["emerald"].front_default || Pokemon.data.sprites.versions["generation-iii"]["firered-leafgreen"].front_default || Pokemon.data.sprites.versions["generation-iii"]["ruby-sapphire"].front_default ?
                    (
                        <Tabla_Generacion_iii Pokemon={Pokemon} />
                    )
                    :
                    <></>
            }
            {
                Pokemon.data.sprites.versions["generation-iv"]["diamond-pearl"].front_default || Pokemon.data.sprites.versions["generation-iv"]["platinum"].front_default || Pokemon.data.sprites.versions["generation-iv"]["heartgold-soulsilver"].front_default ?
                    (
                        <Tabla_Generacion_iv Pokemon={Pokemon} />
                    )
                    :
                    <></>
            }
            {
                Pokemon.data.sprites.versions["generation-v"]["black-white"].front_default || Pokemon.data.sprites.versions["generation-v"]["black-white"]["animated"].front_default ?
                    (
                        <Tabla_Generacion_v Pokemon={Pokemon} />
                    )
                    :
                    <></>
            }
            {
                Pokemon.data.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_default || Pokemon.data.sprites.versions["generation-vi"]["x-y"].front_default ?
                    (
                        <Tabla_Generacion_vi Pokemon={Pokemon} />
                    )
                    :
                    <></>
            }
            {
                Pokemon.data.sprites.versions["generation-vii"]["icons"].front_default || Pokemon.data.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_default ?
                    (
                        <Tabla_Generacion_vii Pokemon={Pokemon} />
                    )
                    :
                    <></>
            }
            {
                Pokemon.data.sprites.versions["generation-viii"]["icons"].front_default ?
                    (
                        <Tabla_Generacion_viii Pokemon={Pokemon} />
                    )
                    :
                    <></>
            }

        </section >
    )
}

export default Sprites