import { ERRORS_ACTIONS } from "./ErrorsActions"

const initialState = {
    message: ''
}

function ErrorsReducer(state=initialState, action) {
    switch(action.type){
        case ERRORS_ACTIONS.SET_MESSAGE:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}

export default ErrorsReducer;
