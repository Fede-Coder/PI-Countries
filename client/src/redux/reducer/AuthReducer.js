import { LOGGED_IN_SUCCESS, LOGGED_IN_FAIL, LOGIN_REQUEST } from "../actions/types";

const initialState = {
    isFetching: false,
    access: false,
    userdate: {},
}

const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return {...state, isFetching: true}
        case LOGGED_IN_SUCCESS:
            return {...state, isFetching: false, access: action.payload.access, userdate: action.payload.userdate}
        case LOGGED_IN_FAIL:
            return {...state, isFetching: false}
        default:
            return {...state}
    }
}

export default AuthReducer;