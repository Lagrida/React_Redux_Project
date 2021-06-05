
export const ERRORS_ACTIONS = {
    SET_MESSAGE_ERROR: "ERRORS/SET_MESSAGE_ERROR"
}

export const setErrorMessage = text => ({
    type: ERRORS_ACTIONS.SET_MESSAGE_ERROR,
    payload: text
});
