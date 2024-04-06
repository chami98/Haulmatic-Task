import { SET_APP_AUTHENTICATED_STATE, SET_APP_INITIALIZED_STATE } from "../actionTypes";

const initialState = {
    isInitialized: false,
    isAuthenticated: false
}


const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_APP_INITIALIZED_STATE:
            return {
                ...state,
                isInitialized: action.payload
            }

        case SET_APP_AUTHENTICATED_STATE:
            return {
                ...state,
                isAuthenticated: action.payload
            }

        default:
            return state;

    }
}


export default appReducer