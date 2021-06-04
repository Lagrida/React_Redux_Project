import { postsFeatureKey } from "./PostReducer";

const postsStateSelector = state => state[postsFeatureKey];

export const postsSelector = state => postsStateSelector(state).posts;
export const postsLoadingSelector = state => postsStateSelector(state).loading;
export const postsFullFeedSelector = state => postsStateSelector(state).isFullFeed;
export const postLoadingSelector = state => postsStateSelector(state).postLoading;
export const postOpenModalSelector = state => postsStateSelector(state).postOpenModal;
export const getPostLoadingSelector = state => postsStateSelector(state).getPostLoading;
export const getPostSelector = state => postsStateSelector(state).post;
export const getDeletingSelector = state => postsStateSelector(state).deleting;
