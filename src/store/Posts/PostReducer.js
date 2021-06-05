import { POSTS_ACTIONS } from './PostActions';

export const postsFeatureKey = 'postsState';

const initialState = {
    loading: true,
    isFullFeed: false,
    postLoading: false,
    postOpenModal: false,
    deleting: false,
    errorMessage: '',
    search: '',
    posts: []
}

function PostsReducer(state=initialState, action) {
    switch(action.type){
        case POSTS_ACTIONS.GET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case POSTS_ACTIONS.TOGGLE_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case POSTS_ACTIONS.TOGGLE_ISFULLFEED:
            return {
                ...state,
                isFullFeed: action.payload
            }
        case POSTS_ACTIONS.TOGGLE_OPENING_MODAL:
            return {
                ...state,
                postOpenModal: action.payload
            }
        case POSTS_ACTIONS.TOGGLE_POST_LOADING:
            return {
                ...state,
                postLoading: action.payload
            }
        case POSTS_ACTIONS.TOGGLE_DELETING:
            return {
                ...state,
                deleting: action.payload
            }
        case POSTS_ACTIONS.TYPE_SEARCH:
            return {
                ...state,
                search: action.payload
            }
        case POSTS_ACTIONS.SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export default PostsReducer;
