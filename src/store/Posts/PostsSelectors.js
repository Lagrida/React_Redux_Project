import { createSelector } from "reselect";
import { postsFeatureKey } from "./PostReducer";

const postsStateSelector = state => state[postsFeatureKey];


export const postsLoadingSelector = state => postsStateSelector(state).loading;
export const postsFullFeedSelector = state => postsStateSelector(state).isFullFeed;
export const postLoadingSelector = state => postsStateSelector(state).postLoading;
export const postOpenModalSelector = state => postsStateSelector(state).postOpenModal;
export const getDeletingSelector = state => postsStateSelector(state).deleting;
export const getSearchSelector = state => postsStateSelector(state).search;
export const getErrorPostsSelector = state => postsStateSelector(state).errorMessage;

export const postsFiltredSelector = createSelector(
    state => postsStateSelector(state).posts,
    state => getSearchSelector(state),
    (posts, search) => {
        const size = 16;
        return posts.filter(post => post.title.includes(search)).slice(0, size);
    }
)
