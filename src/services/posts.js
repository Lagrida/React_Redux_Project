import axios from "axios";
import URL from "../backend";


class PostsService{
    async getPosts(){
        return await axios.get(URL + 'posts');
    }
    async getPosts(){
        return await axios.get(URL + 'posts');
    }
    async getPost(id){
        return await axios.get(URL + 'posts/' + id);
    }
    async addPost(post){
        return await axios.post(URL + 'posts', post);
    }
    async updatePost(post, id){
        return await axios.patch(URL + 'posts/' + id, post);
    }
    async deletePost(id){
        return await axios.delete(URL + 'posts/' + id);
    }
}

export default new PostsService();
