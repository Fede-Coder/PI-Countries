import axios from 'axios'
import { CLEAR_COUNTRY_DETAIL, CREATE_ACTIVITY, ERROR_CREATE_ACTIVITY, ERROR_DELETE_ACTIVITY, ERROR_GET_COUNTRY_DETAIL, ERROR_SEARCH_COUNTRIES, FILTER_COUNTRIES, GET_ALL_ACTIVITIES, GET_ALL_CONTINENTS, GET_ALL_COUNTRIES, GET_COUNTRY_DETAIL, IS_FETCHING, SEARCH_COUNTRIES, SET_CURRENT_PAGE, SET_FILTER_COUNTRIES, SET_SEARCH, SET_SORT_COUNTRIES, SORT_COUNTRIES } from './types'
const URL = 'http://localhost:3001'

const setCurrentPage = (numberPage) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: numberPage
    }
}

const getAllCountries = () => {
    return async function(dispatch) {
        dispatch({type: IS_FETCHING, payload: true})
        setTimeout(async function() {
            let res = await axios.get(`${URL}/countries`)
            dispatch({type: GET_ALL_COUNTRIES, payload: res.data})
            dispatch({type: GET_ALL_CONTINENTS, payload: res.data})
            dispatch({type: SORT_COUNTRIES})
            dispatch({type: IS_FETCHING, payload: false})
        }, 2000)
    }
}

const getAllActivities = () => {
    return async function(dispatch) {
        let res = await axios.get(`${URL}/activities`)
        dispatch({type: GET_ALL_ACTIVITIES, payload: res.data})
    }
}

const resetCountries = () => {
    return async function(dispatch) {        
        let res = await axios.get(`${URL}/countries`)
        dispatch({type: GET_ALL_COUNTRIES, payload: res.data})
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
            dispatch({type: FILTER_COUNTRIES })
            dispatch({type: SORT_COUNTRIES })
        } catch (error) {
            dispatch({type: ERROR_SEARCH_COUNTRIES, payload: name})
        }
    }
}

const setFilterCountries = (filterBy = undefined, filterOf = undefined) => {
    return async function(dispatch) {
        dispatch({type: IS_FETCHING, payload: true})
        dispatch({type: SET_FILTER_COUNTRIES, payload: {filterBy, filterOf}})
        dispatch(resetCountries())
        setTimeout(function() {
            dispatch({type: FILTER_COUNTRIES})
            dispatch({type: SORT_COUNTRIES })
            dispatch({type: IS_FETCHING, payload: false})
        }, 2000)
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
        dispatch({type: IS_FETCHING, payload: true})
        setTimeout(async function() {
            try {
                let res = await axios.get(`${URL}/countries/${id}`)
                dispatch({type: GET_COUNTRY_DETAIL, payload: res.data})
                dispatch({type: IS_FETCHING, payload: false})
            } catch (error) {
                dispatch({type: ERROR_GET_COUNTRY_DETAIL})
                dispatch({type: IS_FETCHING, payload: false})
            }
        }, 2000)
    }
}

const clearCountryDetail = () => {
    return {
        type: CLEAR_COUNTRY_DETAIL
    }
}

const createActivity = (activity) => {
    return async function(dispatch) {
        dispatch({type: IS_FETCHING, payload: true})
        try {
            let res = await axios.post(`${URL}/activities`, activity)
            console.log(res);
            dispatch({type: CREATE_ACTIVITY})
            dispatch(resetCountries())
            dispatch(getAllActivities())
            dispatch({type: IS_FETCHING, payload: false})
        } catch (error) {
            dispatch({type: ERROR_CREATE_ACTIVITY})
            dispatch({type: IS_FETCHING, payload: false})
        }
    }
}

const deleteActivity = (id) => {
    console.log(id);
    return async function(dispatch) {
        dispatch({type: IS_FETCHING, payload: true})
        setTimeout(async function() {
            try {
                console.log(id);
                await axios.delete(`${URL}/activities/${id}`)
                dispatch(resetCountries())
                dispatch(getAllActivities())
                dispatch({type: IS_FETCHING, payload: false})
            } catch (error) {
                console.log(error);
                dispatch({type: ERROR_DELETE_ACTIVITY})
                dispatch({type: IS_FETCHING, payload: false})
            }
        }, 2000)
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
    createActivity,
    deleteActivity,
}