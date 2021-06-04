import { POSTS_ACTIONS } from './PostActions';

export const postsFeatureKey = 'postsState';

const initialState = {
    loading: true,
    isFullFeed: false,
    postLoading: false,
    postOpenModal: false,
    post: null,
    getPostLoading: true,
    deleting: false,
    posts: []
}

function PostsReducer(state=initialState, action) {
    switch(action.type){
        case POSTS_ACTIONS.GET_POSTS:
            return {
                ...state,
                loading: false,
                isFullFeed: true,
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
        case POSTS_ACTIONS.TOGGLE_GET_POST_LOADING:
            return {
                ...state,
                getPostLoading: action.payload
            }
        case POSTS_ACTIONS.GET_POST:
            return {
                ...state,
                post: action.payload
            }
        case POSTS_ACTIONS.TOGGLE_DELETING:
            return {
                ...state,
                deleting: action.payload
            }
        default:
            return state;
    }
}

export default PostsReducer;
