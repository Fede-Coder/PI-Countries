import axios from 'axios'
import { CLEAR_COUNTRY_DETAIL, ERROR_SEARCH_COUNTRIES, FILTER_COUNTRIES_BY_ACTIVITY, FILTER_COUNTRIES_BY_CONTINENT, GET_ALL_ACTIVITIES, GET_ALL_COUNTRIES, GET_COUNTRIES_PER_PAGE, GET_COUNTRY_DETAIL, ORDER_COUNTRIES_BY_NAME, ORDER_COUNTRIES_BY_POPULATION, SEARCH_COUNTRIES } from './types'
const URL = 'http://localhost:3001'

const getAllCountries = (pageLimit) => {
    return async function(dispatch) {
        let res = await axios.get(`${URL}/countries`)
        dispatch({type: GET_ALL_COUNTRIES, payload: {res: res.data, pageLimit}})
    }
}

const getAllActivities = () => {
    return async function(dispatch) {
        let res = await axios.get(`${URL}/activities`)
        dispatch({type: GET_ALL_ACTIVITIES, payload: res.data})
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

const filterCountriesByActivity = (activity, pageLimit) => {
    return async function(dispatch) {
        let res = await axios.get(`${URL}/countries`)
        dispatch({type: FILTER_COUNTRIES_BY_ACTIVITY, payload: {res: res.data, activity, pageLimit}})
    }
}

const orderCountriesByName = (name, pageLimit) => {
    return {
        type: ORDER_COUNTRIES_BY_NAME,
        payload: {name, pageLimit}
    }
}

const orderCountriesByPopulation = (population, pageLimit) => {
    return {
        type: ORDER_COUNTRIES_BY_POPULATION,
        payload: {population, pageLimit}
    }
}

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
    getAllCountries,
    getAllActivities,
    getCountriesPerPage,
    searchCountries,
    filterCountriesByContinent,
    filterCountriesByActivity,
    orderCountriesByName,
    orderCountriesByPopulation,
    getCountryDetail,
    clearCountryDetail
}