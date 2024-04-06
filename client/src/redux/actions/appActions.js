import { SET_APP_INITIALIZED_STATE } from "../actionTypes";
import { SET_APP_AUTHENTICATED_STATE } from "../actionTypes";

export const setAppInitializedState = (payload) => (
    {
        type: SET_APP_INITIALIZED_STATE,
        payload,
    }
)

export const setAppAuthenticatedState = (payload) => ({
    type: SET_APP_AUTHENTICATED_STATE,
    payload
}
)