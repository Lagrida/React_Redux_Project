import { ERRORS_ACTIONS } from "./ErrorsActions"

export const errorsFeatureKey = 'errorsState';

const initialState = {
    message: ''
}

function ErrorsReducer(state=initialState, action) {
    switch(action.type){
        case ERRORS_ACTIONS.SET_MESSAGE_ERROR:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}

export default ErrorsReducer;
