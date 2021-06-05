import axios from "axios";
import URL from "../backend";


class PostsService{
    async getPosts(){
        return await axios.get(URL + 'posts');
    }
    async addPost(post){
        return await axios.post(URL + 'posts', post);
    }
    async updatePost(post){
        return await axios.patch(URL + 'posts/' + post.id, post);
    }
    async deletePost(id){
        return await axios.delete(URL + 'posts/' + id);
    }
}

export default new PostsService();
