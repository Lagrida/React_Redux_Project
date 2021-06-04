import PostsService from '../../services/posts'

export const POSTS_ACTIONS = {
    GET_POSTS: "POSTS/GET_ALL_POSTS",
    TOGGLE_LOADING: "POSTS/TOGGLE_LOADING",
    TOGGLE_ISFULLFEED: "POSTS/TOGGLE_ISFULLFEED",
    ADD_POST: "POSTS/ADD_POST",
    TOGGLE_POST_LOADING: "POSTS/TOGGLE_POST_LOADING",
    TOGGLE_GET_POST_LOADING: "POSTS/TOGGLE_GET_POST_LOADING",
    TOGGLE_OPENING_MODAL: "POSTS/TOGGLE_OPENING_MODAL",
    GET_POST: "POSTS/GET_POST",
    TOGGLE_DELETING: "POSTS/TOGGLE_DELETING",
}
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
export const toggleGetPostLoading = loading => ({
    type: POSTS_ACTIONS.TOGGLE_GET_POST_LOADING,
    payload: loading
});
export const updatePostAction = post => ({
    type: POSTS_ACTIONS.GET_POST,
    payload: post
});
export const getPosts = () => async dispatch => {
    dispatch(toggleLoading(true));
    dispatch(toggleIsFullFeed(false));
    PostsService.getPosts()
    .then(response => {
        dispatch({
            type: POSTS_ACTIONS.GET_POSTS,
            payload: response.data
        })
    })
    .catch(error => {
        console.log(error);
    })
    .finally(() => {

    })
}
export const getPost = id => async dispatch => {
    dispatch(toggleGetPostLoading(true));
    PostsService.getPost(id)
    .then(response => {
        dispatch(toggleGetPostLoading(false));
        dispatch(updatePostAction(response.data));
    })
    .catch(error => {
        dispatch(toggleGetPostLoading(false));
        console.log(error);
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
    PostsService.addPost(post)
    .then(response => {
        dispatch(togglePostLoading(false));
        dispatch(getPosts());
        dispatch(openModal(false));
    })
    .catch(error => {
        dispatch(togglePostLoading(false));
        console.log(error);
    })
    .finally(() => {
    })
}
export const updatePost = (post, id) => async dispatch => {
    dispatch(togglePostLoading(true));
    PostsService.updatePost(post, id)
    .then(response => {
        dispatch(togglePostLoading(false));
        dispatch(getPosts());
        dispatch(openModal(false));
    })
    .catch(error => {
        dispatch(togglePostLoading(false));
        console.log(error);
    })
    .finally(() => {
    })
}
export const deletePost = id => async dispatch => {
    dispatch(toggleDeleting(true));
    PostsService.deletePost(id)
    .then(response => {
        dispatch(toggleDeleting(false));
        dispatch(getPosts());
    })
    .catch(error => {
        dispatch(toggleDeleting(false));
        console.log(error);
    })
    .finally(() => {
    })
}
