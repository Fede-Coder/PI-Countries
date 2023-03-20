import { CLEAR_COUNTRY_DETAIL, ERROR_SEARCH_COUNTRIES, FILTER_COUNTRIES_BY_ACTIVITY, FILTER_COUNTRIES_BY_CONTINENT, GET_ALL_ACTIVITIES, GET_ALL_COUNTRIES, GET_COUNTRIES_PER_PAGE, GET_COUNTRY_DETAIL, IS_FETCHING, ORDER_COUNTRIES_BY_NAME, ORDER_COUNTRIES_BY_POPULATION, SEARCH_COUNTRIES } from "../actions/types"

const initialState = {
    isFetching: false,
    countries: [],
    allCountries: [],
    countryDetail: {},
    activities: [],
}

const CountryReducer = (state = initialState, action) => {
    switch(action.type) {
        case IS_FETCHING: {
            return {
                ...state,
                isFetching: true
            }
        }
        case GET_ALL_COUNTRIES: {
            return {
                ...state,
                countries: action.payload.res.slice(0, action.payload.pageLimit),
                allCountries: action.payload.res,
            }
        }            
        case GET_ALL_ACTIVITIES: {
            return {
                ...state,
                activities: action.payload
            }
        }            
        case GET_COUNTRIES_PER_PAGE: {
            return {
                ...state,
                countries: state.allCountries.slice(action.payload.start, action.payload.end)
            }
        }
        case SEARCH_COUNTRIES: {
            return {
                ...state,
                countries: action.payload.res.slice(0, action.payload.pageLimit),
                allCountries: action.payload.res
            }
        }
        case FILTER_COUNTRIES_BY_CONTINENT: {
            const filter = action.payload.res.filter(country => country.continent === action.payload.continent)
            return {
                ...state,
                allCountries: filter,
                countries: filter.slice(0, action.payload.pageLimit)
            }
        }
        case FILTER_COUNTRIES_BY_ACTIVITY: {
            const filter = action.payload.res.filter(country => country.activities.some(act => act.name === action.payload.activity))
            return {
                ...state,
                allCountries: filter,
                countries: filter.slice(0, action.payload.pageLimit)
            }
        }
        case ORDER_COUNTRIES_BY_NAME: {
            const order = action.payload.name === 'Ascending' ? state.allCountries.slice().sort((a,b) => a.name > b.name) : state.allCountries.slice().sort((a,b) => a.name < b.name)
            return {
                ...state,
                allCountries: order,
                countries: order.slice(0, action.payload.pageLimit)
            }
        }
        case ORDER_COUNTRIES_BY_POPULATION: {
            const order = action.payload.population === 'Ascending' ? state.allCountries.slice().sort((a,b) => a.population > b.population) : state.allCountries.slice().sort((a,b) => a.population < b.population)
            return {
                ...state,
                allCountries: order,
                countries: order.slice(0, action.payload.pageLimit)
            }
        }
        case GET_COUNTRY_DETAIL: {
            return {
                ...state,
                countryDetail: action.payload
            }
        }
        case CLEAR_COUNTRY_DETAIL: {
            return {
                ...state,
                countryDetail: {}
            }
        }
        case ERROR_SEARCH_COUNTRIES: {
            return {
                ...state,
                countries: [],
                allCountries: [],
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default CountryReducer