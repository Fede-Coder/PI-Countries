import { CLEAR_COUNTRY_DETAIL, ERROR_SEARCH_COUNTRIES, FILTER_COUNTRIES, GET_ALL_ACTIVITIES, GET_ALL_CONTINENTS, GET_ALL_COUNTRIES, GET_COUNTRY_DETAIL, IS_FETCHING, SEARCH_COUNTRIES, SET_CURRENT_PAGE, SET_FILTER_COUNTRIES, SET_SEARCH, SET_SORT_COUNTRIES, SORT_COUNTRIES } from "../actions/types"

const initialState = {
    isFetching: false,
    countries: [],
    allCountries: [],
    activities: [],
    continents: ['All'],
    currentPage: 1,
    search: '',
    countryDetail: {},
    filterBy: 'Continent',
    filterOf: 'All',
    sortBy: 'Country',
    sortOf: 'Ascending',
}

const CountryReducer = (state = initialState, action) => {
    switch(action.type) {
        case IS_FETCHING: {
            return {
                ...state,
                isFetching: action.payload
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.payload
            }
        }
        case SET_SEARCH: {
            return {
                ...state,
                search: action.payload
            }
        }
        case GET_ALL_COUNTRIES: {
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        }            
        case GET_ALL_ACTIVITIES: {
            return {
                ...state,
                activities: action.payload
            }
        }
        case GET_ALL_CONTINENTS: {
            const set = new Set(['All', ...action.payload.map(country => country.continent)])
            return {
                ...state,
                continents: [...set]
            }
        }
        case SEARCH_COUNTRIES: {
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        }
        case SET_FILTER_COUNTRIES: {
            if(action.payload.filterBy && !action.payload.filterOf) {
                if(action.payload.filterBy === 'Continent') {
                    return {
                        ...state,
                        filterBy: action.payload.filterBy,
                        filterOf: 'All'
                    }
                } else if(action.payload.filterBy === 'Activity'){
                    return {
                        ...state,
                        filterBy: action.payload.filterBy,
                        filterOf: state.activities[0].name
                    }
                } else {
                    return {
                        ...state
                    }
                }
            } else if(action.payload.filterOf && !action.payload.filterBy) {
                return {
                    ...state,
                    filterOf: action.payload.filterOf
                }
            } else if(action.payload.filterBy && action.payload.filterOf) {
                return {
                    ...state,
                    filterBy: action.payload.filterBy,
                    filterOf: action.payload.filterOf,
                }
            } else {
                return {
                    ...state
                }
            }
        }
        case FILTER_COUNTRIES: {
            if(state.filterBy === 'Continent') {
                if(state.filterOf === 'All') {
                    return {
                        ...state,
                        countries: state.allCountries,
                    }
                } else {
                    const filter = state.allCountries.filter(country => country.continent === state.filterOf)
                    return {
                        ...state,
                        countries: filter
                    }
                }
            } else if(state.filterBy === 'Activity') {
                const filter = state.allCountries.filter(country => country.activities.some(act => act.name === state.filterOf))
                return {
                    ...state,
                    countries: filter
                }
            } else {
                return {
                    ...state
                }
            }
        }
        case SET_SORT_COUNTRIES: {
            if(action.payload.sortBy) {
                return {
                    ...state,
                    sortBy: action.payload.sortBy
                }
            } else if(action.payload.sortOf) {
                return {
                    ...state,
                    sortOf: action.payload.sortOf
                }
            } else {
                return {
                    ...state
                }
            }            
        }
        case SORT_COUNTRIES: {
            if(state.sortBy === 'Country') {
                //Countries
                const sort = state.sortOf === 'Ascending'
                ?                
                state.countries.slice().sort((a,b) => a.name > b.name) //Ascending
                :
                state.countries.slice().sort((a,b) => a.name < b.name) //Descending

                return {
                    ...state,
                    countries: sort
                }
            } else if(state.sortBy === 'Population') {
                //Population
                const sort = state.sortOf === 'Ascending'
                ?                
                state.countries.slice().sort((a,b) => a.population > b.population) //Ascending
                :                
                state.countries.slice().sort((a,b) => a.population < b.population) //Descending

                return {
                    ...state,
                    countries: sort
                }
            } else {
                return {
                    ...state
                }
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
                search: action.payload
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