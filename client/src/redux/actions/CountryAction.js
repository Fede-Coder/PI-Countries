import axios from 'axios'
import { CLEAR_COUNTRY_DETAIL, ERROR_SEARCH_COUNTRIES, FILTER_COUNTRIES, GET_ALL_ACTIVITIES, GET_ALL_CONTINENTS, GET_ALL_COUNTRIES, GET_COUNTRY_DETAIL, SEARCH_COUNTRIES, SET_CURRENT_PAGE, SET_FILTER_COUNTRIES, SET_SEARCH, SET_SORT_COUNTRIES, SORT_COUNTRIES } from './types'
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
        dispatch({type: GET_ALL_CONTINENTS, payload: res.data})
        dispatch({type: SORT_COUNTRIES })
    }
}

const getAllActivities = () => {
    return async function(dispatch) {
        let res = await axios.get(`${URL}/activities`)
        dispatch({type: GET_ALL_ACTIVITIES, payload: res.data})
    }
}

const setSearch = (name) => {
    return {
        type: SET_SEARCH,
        payload: name
    }
}

const searchCountries = (name) => {
    return async function(dispatch) {
        try {
            let res = await axios.get(`${URL}/countries/?name=${name}`)
            dispatch({type: SEARCH_COUNTRIES, payload: res.data })
            dispatch({type: SET_SEARCH, payload: name})
            dispatch({type: FILTER_COUNTRIES, payload: res.data })
            dispatch({type: SORT_COUNTRIES })
        } catch (error) {
            dispatch({type: ERROR_SEARCH_COUNTRIES, payload: name})
        }
    }
}

const setFilterCountries = (filterBy = undefined, filterOf = undefined) => {
    return async function(dispatch) {
        let res = await axios.get(`${URL}/countries`);
        dispatch({type: SET_FILTER_COUNTRIES, payload: {filterBy, filterOf}})
        dispatch({type: FILTER_COUNTRIES, payload: res.data})
        dispatch({type: SORT_COUNTRIES })
    }
}

const setSortCountries = (sortBy = undefined, sortOf = undefined) => {
    return function(dispatch) {
        dispatch({type: SET_SORT_COUNTRIES, payload: {sortBy, sortOf}})
        dispatch({type: SORT_COUNTRIES })
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
    setCurrentPage,
    getAllCountries,
    getAllActivities,
    searchCountries,
    getCountryDetail,
    clearCountryDetail,
    setSortCountries,
    setFilterCountries,
    setSearch,
}