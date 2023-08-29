import { createContext, useState, useEffect } from "react";
import { iconos } from '../js/data_iconos.js'
import { BuscarAPI, Listarability, ListarItemCategory } from '../js/peticiones'
export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [Habilidad, setHabilidad] = useState()
  const [item_category, setItem_category] = useState()
  useEffect(() => {
    abilities()
    category_item()
  }, [])
  //* Funcion para buscar las habilidades
  const abilities = async () => {
    try {
      const total = await Listarability(0, 1);
      const respuesta = await Listarability(0, total.data.count);
      const listadohabilidad = respuesta.data.results
      agregarhabilidad(listadohabilidad)
    } catch (error) {
      console.log(error)
    }
  }
  //* Funcion para gregar las habilidades a la lista
  const agregarhabilidad = async (listado) => {
    try {
      const DataHabilidad = []
      for (const habildida of listado) {
        const res = await BuscarAPI(habildida.url)
        if (res.data.id < 10001) {
          let name = res.data.names.filter((element) => element.language.name === "es")
          if (name.length === 0) {
            name = res.data.names.filter((element) => element.language.name === "en")
            if (name[0].name === "Wave Rider" || "Deep Sleep") {
              if (name[0].name === "Wave Rider") {
                name[0].name = "Montador de olas"
              }
              if (name[0].name === "Wave Rider") {
                name[0].name = "Sueño Profundo"
              }

            } else {
              const res_traduccion = await BuscarAPI(`https://api.mymemory.translated.net/get?q=${name[0].name}&langpair=en|es&de=medinapedrito2@gmail.com`)
              name[0].name = res_traduccion.data.responseData.translatedText
            }
          }
          const Habilidad = {
            id: res.data.id,
            name: name[0].name,
            name_original: res.data.name
          }
          DataHabilidad.push(Habilidad)
          if (DataHabilidad.length > 50) {
            setHabilidad(DataHabilidad)
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  //* Funcion para buscar las habilidades
  const category_item = async () => {
    try {
      const total = await ListarItemCategory(0, 1);
      const respuesta = await ListarItemCategory(0, total.data.count);
      const listadocategory = respuesta.data.results
      agregarcategory(listadocategory)
    } catch (error) {
      console.log(error)
    }
  }
  //* Funcion para gregar las habilidades a la lista
  const agregarcategory = async (listado) => {
    try {
      const DataCategory = []
      for (const category of listado) {
        const res = await BuscarAPI(category.url)
        let name = res.data.names.filter((element) => element.language.name === "es")
        if (name.length === 0) {
          name = res.data.names.filter((element) => element.language.name === "en")
        }
        const Category = {
          id:res.data.id,
          name: name.length !== 0 ? name[0].name : res.data.name.replace(/\-/g, " "),
          name_original: res.data.name
        }
        DataCategory.push(Category)
        if (DataCategory.length > 10) {
          setItem_category(DataCategory)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const types = {
    grass: {
      name: `Planta`,
      nombre_grande: iconos.Planta.nombre_grande,
      nombre_mediano: iconos.Planta.nombre_mediano,
      nombre_pequeño: iconos.Planta.nombre_pequeño,
      tipo_grande: iconos.Planta.tipo_grande,
      tipo_pequeño: iconos.Planta.tipo_pequeño,
      icono_png: iconos.Planta.icono_png,
      icono_web: iconos.Planta.icono_web,
      img_pokemon: iconos.Planta.img_pokemon
    },
    poison: {
      name: `Veneno`,
      nombre_grande: iconos.Veneno.nombre_grande,
      nombre_mediano: iconos.Veneno.nombre_mediano,
      nombre_pequeño: iconos.Veneno.nombre_pequeño,
      tipo_grande: iconos.Veneno.tipo_grande,
      tipo_pequeño: iconos.Veneno.tipo_pequeño,
      icono_png: iconos.Veneno.icono_png,
      icono_web: iconos.Veneno.icono_web,
      img_pokemon: iconos.Veneno.img_pokemon
    },
    fire: {
      name: `Fuego`,
      nombre_grande: iconos.Fuego.nombre_grande,
      nombre_mediano: iconos.Fuego.nombre_mediano,
      nombre_pequeño: iconos.Fuego.nombre_pequeño,
      tipo_grande: iconos.Fuego.tipo_grande,
      tipo_pequeño: iconos.Fuego.tipo_pequeño,
      icono_png: iconos.Fuego.icono_png,
      icono_web: iconos.Fuego.icono_web,
      img_pokemon: iconos.Fuego.img_pokemon
    },
    water: {
      name: `Agua`,
      nombre_grande: iconos.Agua.nombre_grande,
      nombre_mediano: iconos.Agua.nombre_mediano,
      nombre_pequeño: iconos.Agua.nombre_pequeño,
      tipo_grande: iconos.Agua.tipo_grande,
      tipo_pequeño: iconos.Agua.tipo_pequeño,
      icono_png: iconos.Agua.icono_png,
      icono_web: iconos.Agua.icono_web,
      img_pokemon: iconos.Agua.img_pokemon
    },
    bug: {
      name: `Bicho`,
      nombre_grande: iconos.Bicho.nombre_grande,
      nombre_mediano: iconos.Bicho.nombre_mediano,
      nombre_pequeño: iconos.Bicho.nombre_pequeño,
      tipo_grande: iconos.Bicho.tipo_grande,
      tipo_pequeño: iconos.Bicho.tipo_pequeño,
      icono_png: iconos.Bicho.icono_png,
      icono_web: iconos.Bicho.icono_web,
      img_pokemon: iconos.Bicho.img_pokemon
    },
    normal: {
      name: `Normal`,
      nombre_grande: iconos.Normal.nombre_grande,
      nombre_mediano: iconos.Normal.nombre_mediano,
      nombre_pequeño: iconos.Normal.nombre_pequeño,
      tipo_grande: iconos.Normal.tipo_grande,
      tipo_pequeño: iconos.Normal.tipo_pequeño,
      icono_png: iconos.Normal.icono_png,
      icono_web: iconos.Normal.icono_web,
      img_pokemon: iconos.Normal.img_pokemon
    },
    flying: {
      name: `Volador`,
      nombre_grande: iconos.Volador.nombre_grande,
      nombre_mediano: iconos.Volador.nombre_mediano,
      nombre_pequeño: iconos.Volador.nombre_pequeño,
      tipo_grande: iconos.Volador.tipo_grande,
      tipo_pequeño: iconos.Volador.tipo_pequeño,
      icono_png: iconos.Volador.icono_png,
      icono_web: iconos.Volador.icono_web,
      img_pokemon: iconos.Volador.img_pokemon
    },
    ground: {
      name: `Tierra`,
      nombre_grande: iconos.Tierra.nombre_grande,
      nombre_mediano: iconos.Tierra.nombre_mediano,
      nombre_pequeño: iconos.Tierra.nombre_pequeño,
      tipo_grande: iconos.Tierra.tipo_grande,
      tipo_pequeño: iconos.Tierra.tipo_pequeño,
      icono_png: iconos.Tierra.icono_png,
      icono_web: iconos.Tierra.icono_web,
      img_pokemon: iconos.Tierra.img_pokemon
    },
    fairy: {
      name: `Hada`,
      nombre_grande: iconos.Hada.nombre_grande,
      nombre_mediano: iconos.Hada.nombre_mediano,
      nombre_pequeño: iconos.Hada.nombre_pequeño,
      tipo_grande: iconos.Hada.tipo_grande,
      tipo_pequeño: iconos.Hada.tipo_pequeño,
      icono_png: iconos.Hada.icono_png,
      icono_web: iconos.Hada.icono_web,
      img_pokemon: iconos.Hada.img_pokemon
    },
    fighting: {
      name: `Lucha`,
      nombre_grande: iconos.Lucha.nombre_grande,
      nombre_mediano: iconos.Lucha.nombre_mediano,
      nombre_pequeño: iconos.Lucha.nombre_pequeño,
      tipo_grande: iconos.Lucha.tipo_grande,
      tipo_pequeño: iconos.Lucha.tipo_pequeño,
      icono_png: iconos.Lucha.icono_png,
      icono_web: iconos.Lucha.icono_web,
      img_pokemon: iconos.Lucha.img_pokemon
    },
    rock: {
      name: `Roca`,
      nombre_grande: iconos.Roca.nombre_grande,
      nombre_mediano: iconos.Roca.nombre_mediano,
      nombre_pequeño: iconos.Roca.nombre_pequeño,
      tipo_grande: iconos.Roca.tipo_grande,
      tipo_pequeño: iconos.Roca.tipo_pequeño,
      icono_png: iconos.Roca.icono_png,
      icono_web: iconos.Roca.icono_web,
      img_pokemon: iconos.Roca.img_pokemon
    },
    ghost: {
      name: `Fantasma`,
      nombre_grande: iconos.Fantasma.nombre_grande,
      nombre_mediano: iconos.Fantasma.nombre_mediano,
      nombre_pequeño: iconos.Fantasma.nombre_pequeño,
      tipo_grande: iconos.Fantasma.tipo_grande,
      tipo_pequeño: iconos.Fantasma.tipo_pequeño,
      icono_png: iconos.Fantasma.icono_png,
      icono_web: iconos.Fantasma.icono_web,
      img_pokemon: iconos.Fantasma.img_pokemon
    },
    steel: {
      name: `Acero`,
      nombre_grande: iconos.Acero.nombre_grande,
      nombre_mediano: iconos.Acero.nombre_mediano,
      nombre_pequeño: iconos.Acero.nombre_pequeño,
      tipo_grande: iconos.Acero.tipo_grande,
      tipo_pequeño: iconos.Acero.tipo_pequeño,
      icono_png: iconos.Acero.icono_png,
      icono_web: iconos.Acero.icono_web,
      img_pokemon: iconos.Acero.img_pokemon
    },
    electric: {
      name: `Eléctrico`,
      nombre_grande: iconos.Eléctrico.nombre_grande,
      nombre_mediano: iconos.Eléctrico.nombre_mediano,
      nombre_pequeño: iconos.Eléctrico.nombre_pequeño,
      tipo_grande: iconos.Eléctrico.tipo_grande,
      tipo_pequeño: iconos.Eléctrico.tipo_pequeño,
      icono_png: iconos.Eléctrico.icono_png,
      icono_web: iconos.Eléctrico.icono_web,
      img_pokemon: iconos.Eléctrico.img_pokemon
    },
    psychic: {
      name: `Psíquico`,
      nombre_grande: iconos.Psíquico.nombre_grande,
      nombre_mediano: iconos.Psíquico.nombre_mediano,
      nombre_pequeño: iconos.Psíquico.nombre_pequeño,
      tipo_grande: iconos.Psíquico.tipo_grande,
      tipo_pequeño: iconos.Psíquico.tipo_pequeño,
      icono_png: iconos.Psíquico.icono_png,
      icono_web: iconos.Psíquico.icono_web,
      img_pokemon: iconos.Psíquico.img_pokemon
    },
    ice: {
      name: `Hielo`,
      nombre_grande: iconos.Hielo.nombre_grande,
      nombre_mediano: iconos.Hielo.nombre_mediano,
      nombre_pequeño: iconos.Hielo.nombre_pequeño,
      tipo_grande: iconos.Hielo.tipo_grande,
      tipo_pequeño: iconos.Hielo.tipo_pequeño,
      icono_png: iconos.Hielo.icono_png,
      icono_web: iconos.Hielo.icono_web,
      img_pokemon: iconos.Hielo.img_pokemon
    },
    dragon: {
      name: `Dragón`,
      nombre_grande: iconos.Dragón.nombre_grande,
      nombre_mediano: iconos.Dragón.nombre_mediano,
      nombre_pequeño: iconos.Dragón.nombre_pequeño,
      tipo_grande: iconos.Dragón.tipo_grande,
      tipo_pequeño: iconos.Dragón.tipo_pequeño,
      icono_png: iconos.Dragón.icono_png,
      icono_web: iconos.Dragón.icono_web,
      img_pokemon: iconos.Dragón.img_pokemon
    },
    dark: {
      name: `Siniestro`,
      nombre_grande: iconos.Siniestro.nombre_grande,
      nombre_mediano: iconos.Siniestro.nombre_mediano,
      nombre_pequeño: iconos.Siniestro.nombre_pequeño,
      tipo_grande: iconos.Siniestro.tipo_grande,
      tipo_pequeño: iconos.Siniestro.tipo_pequeño,
      icono_png: iconos.Siniestro.icono_png,
      icono_web: iconos.Siniestro.icono_web,
      img_pokemon: iconos.Siniestro.img_pokemon
    },
    unknown: {
      name: `Unknown`,
    },
    shadow: {
      name: `Shadow`,
    }

  }
  const egg_group = {
    monster: {
      name: "Monstruo",
    },
    water1: {
      name: "Agua 1",
    },
    bug: {
      name: "Bicho",
    },
    flying: {
      name: "Volador",
    },
    ground: {
      name: "Campo",
    },
    fairy: {
      name: "Hada",
    },
    plant: {
      name: "Planta",
    },
    humanshape: {
      name: "Humanoide",
    },
    water3: {
      name: "Agua 3",
    },
    mineral: {
      name: "Mineral",
    },
    indeterminate: {
      name: "Amorfo",
    },
    water2: {
      name: "Agua 2",
    },
    ditto: {
      name: "Ditto",
    },
    dragon: {
      name: "Dragón",
    },
    no_eggs: {
      name: "Desconocido",
    },
  };
  const color = {
    black: {
      name: "Negro",
    },
    blue: {
      name: "Azul",
    },
    brown: {
      name: "Marrón",
    },
    gray: {
      name: "Gris",
    },
    green: {
      name: "Verde",
    },
    pink: {
      name: "Rosa",
    },
    purple: {
      name: "Morado",
    },
    red: {
      name: "Rojo",
    },
    white: {
      name: "Blanco",
    },
    yellow: {
      name: "Amarillo",
    }
  }
  const generation = {
    generation_i: {
      name: "Generación I",
      icono: iconos.generacion.icono_generacion_i
    },
    generation_ii: {
      name: "Generación II",
      icono: iconos.generacion.icono_generacion_ii
    },
    generation_iii: {
      name: "Generación III",
      icono: iconos.generacion.icono_generacion_iii
    },
    generation_iv: {
      name: "Generación IV",
      icono: iconos.generacion.icono_generacion_iv
    },
    generation_v: {
      name: "Generación V",
      icono: iconos.generacion.icono_generacion_v
    },
    generation_vi: {
      name: "Generación VI",
      icono: iconos.generacion.icono_generacion_vi
    },
    generation_vii: {
      name: "Generación VII",
      icono: iconos.generacion.icono_generacion_vii
    },
    generation_viii: {
      name: "Generación VIII",
      icono: iconos.generacion.icono_generacion_viii
    },
    generation_ix: {
      name: "Generación IX",
      icono: iconos.generacion.icono_generacion_ix
    },
  }
  const habitat = {
    cave: {
      name: "Caverna",
      icono: iconos.habitad.icono_cave
    },
    forest: {
      name: "Bosque",
      icono: iconos.habitad.icono_forest
    },
    grassland: {
      name: "Pradera",
      icono: iconos.habitad.icono_grassland
    },
    mountain: {
      name: "Montaña",
      icono: iconos.habitad.icono_mountain
    },
    rare: {
      name: "Raro",
      icono: iconos.habitad.icono_rare
    },
    rough_terrain: {
      name: "Campo",
      icono: iconos.habitad.icono_rough_terrain
    },
    sea: {
      name: "Mar",
      icono: iconos.habitad.icono_sea
    },
    urban: {
      name: "Ciudad",
      icono: iconos.habitad.icono_urban
    },
    waters_edge: {
      name: "Agua Salada",
      icono: iconos.habitad.icono_waters_edge
    },
  }
  const forma = {
    ball: {
      name: "Ball",
      icono: iconos.forma.icono_ball
    },
    squiggle: {
      name: "Squiggle",
      icono: iconos.forma.icono_squiggle
    },
    fish: {
      name: "Fish",
      icono: iconos.forma.icono_fish
    },
    arms: {
      name: "Arms",
      icono: iconos.forma.icono_arms
    },
    blob: {
      name: "Blob",
      icono: iconos.forma.icono_blob
    },
    upright: {
      name: "Upright",
      icono: iconos.forma.icono_upright
    },
    legs: {
      name: "Legs",
      icono: iconos.forma.icono_legs
    },
    quadruped: {
      name: "Quadruped",
      icono: iconos.forma.icono_quadruped
    },
    wings: {
      name: "Wings",
      icono: iconos.forma.icono_wings
    },
    tentacles: {
      name: "Tentacles",
      icono: iconos.forma.icono_tentacles
    },
    heads: {
      name: "Heads",
      icono: iconos.forma.icono_heads
    },
    humanoid: {
      name: "Humanoid",
      icono: iconos.forma.icono_humanoid
    },
    bug_wings: {
      name: "Bug Wings",
      icono: iconos.forma.icono_bug_wings
    },
    armor: {
      name: "Armor",
      icono: iconos.forma.icono_armor
    }
  }

  const version = {
    red: {
      name: "Rojo"
    },
    blue: {
      name: "Azul"
    },
    yellow: {
      name: "Amarillo"
    },
    gold: {
      name: "Oro"
    },
    silver: {
      name: "Plata"
    },
    crystal: {
      name: "Cristal"
    },
    ruby: {
      name: "Rubí"
    },
    sapphire: {
      name: "Zafiro"
    },
    emerald: {
      name: "Esmeralda"
    },
    firered: {
      name: "Rojo Fuego"
    },
    leafgreen: {
      name: "Verde Hoja"
    },
    diamond: {
      name: "Diamante"
    },
    pearl: {
      name: "Perla"
    },
    platinum: {
      name: "Platino"
    },
    heartgold: {
      name: "Oro HeartGold"
    },
    soulsilver: {
      name: "Plata SoulSilver"
    },
    black: {
      name: "Negro"
    },
    white: {
      name: "Blanco"
    },
    colosseum: {
      name: "x"
    },
    xd: {
      name: "x"
    },
    black_2: {
      name: "x"
    },
    white_2: {
      name: "x"
    },
    x: {
      name: "x"
    },
    y: {
      name: "x"
    },
    omega_ruby: {
      name: "x"
    },
    alpha_sapphire: {
      name: "x"
    },
    sun: {
      name: "x"
    },
    moon: {
      name: "x"
    },
    ultra_sun: {
      name: "x"
    },
    ultra_moon: {
      name: "x"
    },
    lets_go_pikachu: {
      name: "x"
    },
    lets_go_eevee: {
      name: "x"
    },
    sword: {
      name: "x"
    },
    shield: {
      name: "x"
    },
    the_isle_of_armor: {
      name: "x"
    },
    the_crown_tundra: {
      name: "x"
    },
    brilliant_diamond: {
      name: "x"
    },
    shining_pearl: {
      name: "x"
    },
    legends_arceus: {
      name: "x"
    },
    scarlet: {
      name: "x"
    },
    violet: {
      name: "x"
    },
    the_teal_mask: {
      name: "x"
    },
    the_indigo_disk: {
      name: "x"
    },
  }
  const grupo_version = {
    red_blue: {
      name: ""
    },
    yellow: {
      name: ""
    },
    gold_silver: {
      name: ""
    },
    crystal: {
      name: ""
    },
    ruby_sapphire: {
      name: ""
    },
    emerald: {
      name: ""
    },
    firered_leafgreen: {
      name: ""
    },
    diamond_pearl: {
      name: ""
    },
    platinum: {
      name: ""
    },
    heartgold_soulsilver: {
      name: ""
    },
    black_white: {
      name: ""
    },
    colosseum: {
      name: ""
    },
    xd: {
      name: ""
    },
    black_2_white_2: {
      name: ""
    },
    x_y: {
      name: ""
    },
    omega_ruby_alpha_sapphire: {
      name: ""
    },
    sun_moon: {
      name: ""
    },
    ultra_sun_ultra_moon: {
      name: ""
    },
    lets_go_pikachu_lets_go_eevee: {
      name: ""
    },
    sword_shield: {
      name: ""
    },
  }
  const move_learn_method = {
    level_up: {
      name: "Nivel",
      description: "Se aprende cuando un pokemon alcanza un cierto nivel."
    },
    egg: {
      name: "Huevo",
      description: "Aparece en un Pokémon recién nacido, si el padre tuvo el mismo movimiento."
    },
    tutor: {
      name: "Tutor",
      description: "Puede ser enseñado en cualquier momento por un NPC."
    },
    machine: {
      name: "Máquina",
      description: "Se puede enseñar en cualquier momento usando una MT o MO."
    },
    stadium_surfing_pikachu: {
      name: "Escenario: Surf Pikachu",
      description: "Aprendido cuando un Pikachu ayuda a derrotar la Copa Premium en la categoría Master Ball sin descanso. Debe participar en cada batalla."
    },
    light_ball_egg: {
      name: "Voltaje Pichu",
      description: "Aparece en un Pichu cuya madre sostenía una Bola de Luz. El padre no puede ser Ditto"
    },
    colosseum_purification: {
      name: "Coliseo: Purificación",
      description: "Aparece en un Pokémon oscuro a medida que se purifica cada vez más."
    },
    xd_shadow: {
      name: "XD: sombra",
      description: "Aparece en un Pokémon Sombra Arrebatado."
    },
    xd_purification: {
      name: "XD: Purificación",
      description: "Aparece en un Pokémon oscuro a medida que se purifica cada vez más."
    },
    form_change: {
      name: "Cambio de Forma",
      description: "Aparece cuando Rotom cambia de forma. Desaparece cuando Rotom cambia de forma. Esta habilidad solo se puede aprender cambiando de forma."
    },
    zygarde_cube: {
      name: "Cubo Zygarde",
      description: "Se puede enseñar usando el Zygarde Cube. Debe encontrar el Núcleo de Zygarde correspondiente primero en Sun/Moon. Todos los movimientos están disponibles inmediatamente en Ultra Sun/Ultra Moon."
    }
  }
  const crecimiento = {
    slow: {
      name: "Lento"
    },
    medium: {
      name: "Medio"
    },
    fast: {
      name: "Rápido"
    },
    medium_slow: {
      name: "Medio Lento"
    },
    slow_then_very_fast: {
      name: "Lento Luego Muy Rápido"
    },
    fast_then_very_slow: {
      name: "Rápido Luego Muy Lento"
    }

  }

  const stats = {
    hp: {
      name: "PS"
    },
    attack: {
      name: "Ataque"
    },
    defense: {
      name: "Desfensa"
    },
    special_attack: {
      name: "Ataque Especial"
    },
    special_defense: {
      name: "Defensa Especial"
    },
    speed: {
      name: "Velocidad"
    },
    accuracy: {
      name: "Precisión"
    },
    evasion: {
      name: "Evasión"
    },
  }
  const move_class = {
    status: {
      name: "Estado",
      description: "Sin Daño",
      icono_grande: iconos.class_move.icono_status_grande,
      icono_pequeño: iconos.class_move.icono_status_pequeño
    },
    physical: {
      name: "Físico",
      description: "Daño Físico, controlado por el Ataque y Defensa",
      icono_grande: iconos.class_move.icono_physical_grande,
      icono_pequeño: iconos.class_move.icono_physical_pequeño
    },
    special: {
      name: "Especial",
      description: "Daño Especial, controlado por el Ataque Esecieal y Defensa Especial",
      icono_grande: iconos.class_move.icono_special_grande,
      icono_pequeño: iconos.class_move.icono_special_pequeño
    },
  }
  const move_target = {
    specific_move: {
      description: "Un movimiento específico. Cómo se elige este movimiento depende del movimiento que se utilice.",
      name: "Movimiento Específico",
    },
    selected_pokemon_me_first: {
      description: "Otro Pokémon en el campo, seleccionado por el entrenador. Los movimientos robados reutilizan el mismo objetivo.",
      name: "Pokémon Seleccionado",
    },
    ally: {
      name: "Aliado",
      description: "El aliado del usuario (si lo hay).",
    },
    users_field: {
      name: "Campo de Usuario",
      description: "El lado del usuario del campo. Afecta al usuario y a su aliado (si lo hubiere).",
    },
    user_or_ally: {
      name: "Usuario o Aliado",
      description: "Ya sea el usuario o su aliado, seleccionado por el entrenador.",
    },
    opponents_field: {
      name: "Campo del Oponente",
      description: "El lado opuesto del campo. Afecta a Pokémon rivales.",
    },
    user: {
      name: "Usuario",
      description: "El Usuario.",
    },
    random_opponent: {
      name: "Oponente al Azar",
      description: "Un Pokémon opuesto, seleccionado al azar.",
    },
    all_other_pokemon: {
      name: "Todos los Demás Pokémon",
      description: "Todos los demás Pokémon en el campo.",
    },
    selected_pokemon: {
      name: "Pokémon Seleccionado",
      description: "Otro Pokémon en el campo, seleccionado por el entrenador.",
    },
    all_opponents: {
      name: "Todos los Oponentes",
      description: "Todos los Pokémon rivales."
    },
    entire_field: {
      name: "Todo el Campo",
      description: "Todo el campo. Afecta a todos los Pokémon."
    },
    user_and_allies: {
      name: "Usuario y Aliados",
      description: "El usuario y sus aliados."
    },
    all_pokemon: {
      name: "Todos los Pokémon",
      description: "Cada Pokémon en el campo."
    },
    all_allies: {
      name: "Todos los Aliados",
      description: "Todos los aliados del usuario."
    },
    fainting_pokemon: {
      name: "Los Pokémon Desmayados",
      description: "Desmayo Pokémon"
    },
  }
  const move_ailment = {
    unknown: {
      name: "???"
    },
    none: {
      name: "Ninguno"
    },
    paralysis: {
      name: "Parálisis"
    },
    sleep: {
      name: "Dormir"
    },
    freeze: {
      name: "Congelar"
    },
    burn: {
      name: "Quemar"
    },
    poison: {
      name: "Envenenar"
    },
    confusion: {
      name: "Confundir"
    },
    infatuation: {
      name: "Enamorar"
    },
    trap: {
      name: "Atrapado"
    },
    nightmare: {
      name: "Maldito"
    },
    torment: {
      name: "Tormento"
    },
    disable: {
      name: "Anulación"
    },
    yawn: {
      name: "Bostezo"
    },
    heal_block: {
      name: "Anticura"
    },
    no_type_immunity: {
      name: "Ningún tipo de inmunidad"
    },
    leech_seed: {
      name: "Drenadoras"
    },
    embargo: {
      name: "Embargo"
    },
    perish_song: {
      name: "Canto mortal"
    },
    ingrain: {
      name: "Arraigo"
    },

  }
  const move_category = {
    damage: {
      name: "Daño",
      description: "Inflige daño"
    },
    ailment: {
      name: "Cambio de Estado",
      description: "Sin daños; inflige cambio de estado"
    },
    net_good_stats: {
      name: "Buenas Estadísticas Netas",
      description: "Sin daños; reduce las estadísticas del objetivo o aumenta las estadísticas del usuario"
    },
    heal: {
      name: "Sanar",
      description: "Sin daños; cura al usuario"
    },
    damage_ailment: {
      name: "Daño + Cambio de Estado",
      description: "Inflige daño; inflige cambio de estado"
    },
    swagger: {
      name: "Contonearse",
      description: "Sin daños; inflige un cambio de estado; aumenta las estadísticas del objetivo"
    },
    damage_lower: {
      name: "Daño + Redución",
      description: "Inflige daño; reduce las estadísticas del objetivo"
    },
    damage_raise: {
      name: "Daño + Aumento",
      description: "Inflige daño; aumenta las estadísticas del usuario"
    },
    damage_heal: {
      name: "Daño + Curar",
      description: "Inflige daño; absorbe el daño hecho para curar al usuario"
    },
    ohko: {
      name: "KO de un solo golpe",
      description: "K.O"
    },
    whole_field_effect: {
      name: "Efecto de Campo Completo",
      description: "Efecto en todo el campo."
    },
    field_effect: {
      name: "Efecto de Campo",
      description: "Efecto en un lado del campo"
    },
    force_switch: {
      name: "Interruptor de Fuerza",
      description: "Obliga al objetivo a cambiar"
    },
    unique: {
      name: "Efecto único",
      description: "Único"
    },
  }
  const item_attribute = {
    countable: {
      name: "Contable",
      description: "Tiene un conteo en la bolsa"
    },
    consumable: {
      name: "Consumible",
      description: "Consumido cuando se usa"
    },
    usable_overworld: {
      name: "Supramundo Utilizable",
      description: "Utilizable fuera de Batalla"
    },
    usable_in_battle: {
      name: "Utilizable en batalla",
      description: "Utilizable en batalla"
    },
    holdable: {
      name: "Retenible",
      description: "Puede ser sostenido por un Pokémon"
    },
    holdable_passive: {
      name: "Retenible Pasivo",
      description: "Funciona pasivamente cuando se sostiene"
    },
    holdable_active: {
      name: "Retenible activo",
      description: "Utilizable por un Pokémon cuando se sostiene"
    },
    underground: {
      name: "Subterráneo",
      description: "Aparece en Sinnoh Underground"
    },
  }
  const item_pocket = {
    misc: {
      name: "Objetos"
    },
    medicine: {
      name: "Medicinas"
    },
    pokeballs: {
      name: "Pokeballs"
    },
    machines: {
      name: "MT y MO"
    },
    berries: {
      name: "Bayas"
    },
    mail: {
      name: "Correo"
    },
    battle: {
      name: "Objetos de combate"
    },
    key: {
      name: "Objetos clave"
    },
  }
  const item_fling_effect = {
    badly_poison: {
      name: "Mal Veneno",
      description: "Envenena gravemente al objetivo."
    },
    burn: {
      name: "Quemar",
      description: "Quema el objetivo."
    },
    berry_effect: {
      name: "Efecto Baya",
      description: "Activa inmediatamente el efecto de la baya en el objetivo."
    },
    herb_effect: {
      name: "Efecto Hierba",
      description: "Activa inmediatamente el efecto de la hierba en el objetivo."
    },
    paralyze: {
      name: "Paralizar",
      description: "Paraliza al objetivo.",
    },
    poison: {
      name: "Veneno",
      description: "Envenena al objetivo.",
    },
    flinch: {
      name: "Retroceder",
      description: "El objetivo se estremecerá si aún no se ha ido este turno."
    },
  }
  const evolution_trigger = {
    level_up: {
      name: "Subir Nv. ",
    },
    trade: {
      name: "Intercambio. ",
    },
    use_item: {
      name: "Usar Item. ",
    },
    shed: {
      name: "Lugar en el equipo y una Poké Ball. ",
    },
    spin: {
      name: "Confite equipado + Girar",
    },
    tower_of_darkness: {
      name: "Completar la Torre de la Oscuridad. ",
    },
    tower_of_waters: {
      name: "Completar la Torre de las Aguas. ",
    },
    three_critical_hits: {
      name: "Consigue tres golpes críticos en una batalla. ",
    },
    take_damage: {
      name: "Perder mínimo 49 PS en combate + pasar bajo la formación rocosa de la Cuenca Polvorienta",

    },
    other: {
      name: "Otro. ",
    },
    agile_style_move: {
      name: "Usar 20 veces el siguiente movimiento en estilo rápido",
    },
    strong_style_move: {
      name: "Movimiento de estilo fuerte. ",
    },
    recoil_damage: {
      name: "Daño de Retroceso. "
    },
  }
  const time = {
    day: {
      img: iconos.time.dia,
      name: "Día"
    },
    night: {
      img: iconos.time.noche,
      name: "Noche"
    },
    dusk: {
      img: iconos.time.atardecer,
      name: "Atardecer"
    }
  }
  const regiones = {
    kanto: {
      name: "Kanto",
      img: iconos.regiones.Kanto
    },
    johto: {
      name: "Johto",
      img: iconos.regiones.Johto
    },
    hoenn: {
      name: "Hoenn",
      img: iconos.regiones.Hoenn
    },
    sinnoh: {
      name: "Sinnoh",
      img: iconos.regiones.Sinnoh
    },
    unova: {
      name: "Unova",
      img: iconos.regiones.Teselia
    },
    kalos: {
      name: "Kalos",
      img: iconos.regiones.Kalos
    },
    alola: {
      name: "Alola",
      img: iconos.regiones.Alola
    },
    galar: {
      name: "Galar",
      img: iconos.regiones.Galar
    },
    hisui: {
      name: "Hisui",
      img: iconos.regiones.Hisui
    },
    paldea: {
      name: "Paldea",
      img: iconos.regiones.Paldea
    },

  }
  const DividirArreglos = (array, longitud) => {
    const arregloDeArreglos = [];
    for (let i = 0; i < array.length; i += longitud) {
      const areglo = array.slice(i, i + longitud);
      arregloDeArreglos.push(areglo);
    }
    return arregloDeArreglos
  }
  return (
    <AuthContext.Provider value={{ types, generation, color, egg_group, regiones, habitat, forma, time, stats, evolution_trigger, crecimiento, move_learn_method, move_class, move_target, move_ailment, move_category, item_attribute, item_pocket, item_fling_effect, Habilidad, item_category, DividirArreglos }}>
      {children}
    </AuthContext.Provider>

  )
}

