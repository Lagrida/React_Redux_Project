import {applyMiddleware, createStore, combineReducers} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import PostsReducer, { postsFeatureKey } from "./Posts/PostReducer";
import ErrorsReducer from "./Errors/ErrorsReducer";

const reducers =  combineReducers({
    [postsFeatureKey]: PostsReducer,
    errorsState: ErrorsReducer
});

function configureStore(preloadedState) {
    const middlewares = [thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)
  
    const enhancers = [middlewareEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)

    const store = createStore(reducers, preloadedState, composedEnhancers)
  
    return store;
  }

const store = configureStore();

export default store;
