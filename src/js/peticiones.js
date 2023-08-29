import axios from 'axios'



export const ListarPokemon = (offset, limit) => {
    return axios.get('https://pokeapi.co/api/v2/pokemon/',{
        params:{
            offset:offset,
            limit:limit
        }
    })
}
export const ListarItem = (offset, limit) => {
    return axios.get('https://pokeapi.co/api/v2/item/',{
        params:{
            offset:offset,
            limit:limit
        }
    })
}
export const Listarability = (offset, limit) => {
    return axios.get('https://pokeapi.co/api/v2/ability/',{
        params:{
            offset:offset,
            limit:limit
        }
    })
}
export const ListarItemCategory = (offset, limit) => {
    return axios.get('https://pokeapi.co/api/v2/item-category/',{
        params:{
            offset:offset,
            limit:limit
        }
    })
}
export const BuscarAPI =  (url) => {
    
    return  axios.get(url)
    
}

export const BuscarDataPokemon = (pokemon) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
}
export const BuscarDataType = (type) => {
    return axios.get(`https://pokeapi.co/api/v2/type/${type}`) 
}
export const BuscarDataAbility = (ability) => {
    return axios.get(`https://pokeapi.co/api/v2/ability/${ability}`) 
}
export const BuscarDataMove = (move) => {
    return axios.get(`https://pokeapi.co/api/v2/move/${move}`) 
}
export const BuscarDataItem = (item) => {
    return axios.get(`https://pokeapi.co/api/v2/item/${item}`) 
}
export const BuscarDataGeneration = (generation) => {
    return axios.get(`https://pokeapi.co/api/v2/generation/${generation}`) 
}
