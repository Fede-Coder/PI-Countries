import axios from 'axios'
import { ERROR_SEARCH_COUNTRIES, FILTER_COUNTRIES_BY_CONTINENT, GET_ALL_COUNTRIES, GET_COUNTRIES_PER_PAGE, ORDER_COUNTRIES_BY_NAME, ORDER_COUNTRIES_BY_POPULATION, SEARCH_COUNTRIES } from './types'
const URL = 'http://localhost:3001'

const getAllCountries = (pageLimit) => {
    return async function(dispatch) {
        let res = await axios.get(`${URL}/countries`)
        dispatch({type: GET_ALL_COUNTRIES, payload: {res: res.data, pageLimit}})
    }
}

const getCountriesPerPage = (start, end) => {
    return {
        type: GET_COUNTRIES_PER_PAGE,
        payload: {start, end}
    }
}

const searchCountries = (name, pageLimit) => {
    return async function(dispatch) {
        try {
            let res = await axios.get(`${URL}/countries/?name=${name}`)
            dispatch({type: SEARCH_COUNTRIES, payload: {res: res.data, pageLimit}})
        } catch (error) {
            dispatch({type: ERROR_SEARCH_COUNTRIES})
        }
    }
}

const filterCountriesByContinent = (continent, pageLimit) => {
    return async function(dispatch) {
        let res = await axios.get(`${URL}/countries`)
        dispatch({type: FILTER_COUNTRIES_BY_CONTINENT, payload: {res: res.data, continent, pageLimit}})
    }
}

//ORDER_COUNTRIES_BY_NAME
const orderCountriesByName = (name, pageLimit) => {
    return {
        type: ORDER_COUNTRIES_BY_NAME,
        payload: {name, pageLimit}
    }
}

//ORDER_COUNTRIES_BY_POPULATION
const orderCountriesByPopulation = (population, pageLimit) => {
    return {
        type: ORDER_COUNTRIES_BY_POPULATION,
        payload: {population, pageLimit}
    }
}

export {
    getAllCountries,
    getCountriesPerPage,
    searchCountries,
    filterCountriesByContinent,
    orderCountriesByName,
    orderCountriesByPopulation,
}