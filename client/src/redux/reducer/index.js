import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import CountryReducer from './CountryReducer'

export default combineReducers({
    auth: AuthReducer,
    country: CountryReducer,
})