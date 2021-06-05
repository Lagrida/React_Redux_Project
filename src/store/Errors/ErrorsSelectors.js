import { errorsFeatureKey } from "./ErrorsReducer";


const errorsStateSelector = state => state[errorsFeatureKey];

export const errorsMessageSelector = state => errorsStateSelector(state).message;
