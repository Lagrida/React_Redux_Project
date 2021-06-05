import PostsService from '../../services/posts'
import { setErrorMessage } from '../Errors/ErrorsActions';

export const POSTS_ACTIONS = {
    GET_POSTS: "POSTS/GET_ALL_POSTS",
    TOGGLE_LOADING: "POSTS/TOGGLE_LOADING",
    TOGGLE_ISFULLFEED: "POSTS/TOGGLE_ISFULLFEED",
    ADD_POST: "POSTS/ADD_POST",
    TOGGLE_POST_LOADING: "POSTS/TOGGLE_POST_LOADING",
    TOGGLE_OPENING_MODAL: "POSTS/TOGGLE_OPENING_MODAL",
    TOGGLE_DELETING: "POSTS/TOGGLE_DELETING",
    TYPE_SEARCH: "POSTS/TYPE_SEARCH",
    SET_ERROR_MESSAGE: "POSTS/SET_ERROR_MESSAGE",

}
export const typeSearch = text => ({
    type: POSTS_ACTIONS.TYPE_SEARCH,
    payload: text
});
export const setPostsErrorMessage = text => ({
    type: POSTS_ACTIONS.SET_ERROR_MESSAGE,
    payload: text
});
export const toggleLoading = loading => ({
    type: POSTS_ACTIONS.TOGGLE_LOADING,
    payload: loading
});
export const toggleIsFullFeed = fullfeed => ({
    type: POSTS_ACTIONS.TOGGLE_ISFULLFEED,
    payload: fullfeed
});
export const togglePostLoading = loading => ({
    type: POSTS_ACTIONS.TOGGLE_POST_LOADING,
    payload: loading
});
export const toggleDeleting = deleting => ({
    type: POSTS_ACTIONS.TOGGLE_DELETING,
    payload: deleting
});
export const getPosts = () => async dispatch => {
    dispatch(toggleLoading(true));
    dispatch(toggleIsFullFeed(false));
    dispatch(setErrorMessage(''));
    PostsService.getPosts()
    .then(response => {
        dispatch(toggleLoading(false));
        dispatch(toggleIsFullFeed(true));
        dispatch({
            type: POSTS_ACTIONS.GET_POSTS,
            payload: response.data
        })
    })
    .catch(error => {
        dispatch(toggleLoading(false));
        dispatch(setErrorMessage('Error in Loading Posts!'));
    })
    .finally(() => {

    })
}
export const openModal = open => ({
        type: POSTS_ACTIONS.TOGGLE_OPENING_MODAL,
        payload: open
});
export const addPost = post => async dispatch => {
    dispatch(togglePostLoading(true));
    dispatch(setPostsErrorMessage(''));
    PostsService.addPost(post)
    .then(response => {
        console.log('Adding Post ......', post);
        dispatch(togglePostLoading(false));
        dispatch(getPosts());
        dispatch(openModal(false));
    })
    .catch(error => {
        dispatch(togglePostLoading(false));
        dispatch(setPostsErrorMessage('Error in adding Post'));
        console.log(error);
    })
    .finally(() => {
    })
}
export const updatePost = post => async dispatch => {
    dispatch(togglePostLoading(true));
    dispatch(setPostsErrorMessage(''));
    PostsService.updatePost(post)
    .then(response => {
        console.log('updating Post ......', post);
        dispatch(togglePostLoading(false));
        dispatch(getPosts());
        dispatch(openModal(false));
    })
    .catch(error => {
        dispatch(setPostsErrorMessage('Error In updating post'));
        dispatch(togglePostLoading(false));
        console.log(error);
    })
    .finally(() => {
    })
}
export const deletePost = id => async dispatch => {
    dispatch(toggleDeleting(true));
    dispatch(setErrorMessage(''));
    PostsService.deletePost(id)
    .then(response => {
        dispatch(toggleDeleting(false));
        dispatch(getPosts());
    })
    .catch(error => {
        dispatch(setErrorMessage('Error In deleting Post !'));
        dispatch(toggleDeleting(false));
        console.log(error);
    })
    .finally(() => {
    })
}

export const deleteMultiplePosts = arr => async dispatch => {
    let promisesList = [];
    dispatch(toggleDeleting(true));
    arr.forEach(id => promisesList.push(PostsService.deletePost(id)));
    Promise.all(promisesList)
    .then(responses => {
        dispatch(toggleDeleting(false));
        dispatch(getPosts());
    })
    .catch(error => {
        dispatch(toggleDeleting(false));
        dispatch(setErrorMessage('Error In deleting Posts !'));
    })
}
