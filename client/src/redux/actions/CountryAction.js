import axios from 'axios'
import { CLEAR_COUNTRY_DETAIL, ERROR_SEARCH_COUNTRIES, GET_ALL_ACTIVITIES, GET_ALL_COUNTRIES, GET_COUNTRY_DETAIL, SEARCH_COUNTRIES, SET_CURRENT_PAGE } from './types'
const URL = 'http://localhost:3001'

const setCurrentPage = (numberPage) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: numberPage
    }
}

const getAllCountries = () => {
    return async function(dispatch) {
        let res = await axios.get(`${URL}/countries`)
        dispatch({type: GET_ALL_COUNTRIES, payload: res.data})
    }
}

const getAllActivities = () => {
    return async function(dispatch) {
        let res = await axios.get(`${URL}/activities`)
        dispatch({type: GET_ALL_ACTIVITIES, payload: res.data})
    }
}

const searchCountries = (name) => {
    return async function(dispatch) {
        try {
            let res = await axios.get(`${URL}/countries/?name=${name}`)
            dispatch({type: SEARCH_COUNTRIES, payload: {info: res.data, search: name}})
        } catch (error) {
            dispatch({type: ERROR_SEARCH_COUNTRIES})
        }
    }
}

// const filterCountriesByContinent = (continent, pageLimit) => {
//     return async function(dispatch) {
//         let res = await axios.get(`${URL}/countries`)
//         dispatch({type: FILTER_COUNTRIES_BY_CONTINENT, payload: {res: res.data, continent, pageLimit}})
//     }
// }

// const filterCountriesByActivity = (activity, pageLimit) => {
//     return async function(dispatch) {
//         let res = await axios.get(`${URL}/countries`)
//         dispatch({type: FILTER_COUNTRIES_BY_ACTIVITY, payload: {res: res.data, activity, pageLimit}})
//     }
// }

// const orderCountriesByName = (name, pageLimit) => {
//     return {
//         type: ORDER_COUNTRIES_BY_NAME,
//         payload: {name, pageLimit}
//     }
// }

// const orderCountriesByPopulation = (population, pageLimit) => {
//     return {
//         type: ORDER_COUNTRIES_BY_POPULATION,
//         payload: {population, pageLimit}
//     }
// }

const getCountryDetail = (id) => {
    return async function(dispatch) {
        try {
            let res = await axios.get(`${URL}/countries/${id}`)
            dispatch({type: GET_COUNTRY_DETAIL, payload: res.data})
        } catch (error) {
            
        }
    }
}

const clearCountryDetail = () => {
    return {
        type: CLEAR_COUNTRY_DETAIL
    }
}

export {
    setCurrentPage,
    getAllCountries,
    getAllActivities,
    searchCountries,
    getCountryDetail,
    clearCountryDetail
}