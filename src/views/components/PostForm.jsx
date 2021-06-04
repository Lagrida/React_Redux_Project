import { useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { addPost, getPost, updatePostAction, updatePost } from '../../store/Posts/PostActions';
import { postLoadingSelector, getPostLoadingSelector, getPostSelector } from "../../store/Posts/PostsSelectors";
import Overlay from "./Overlay";

function PostFormComponent({ post, postId, postLoading, addPost, getPostLoading, getPost, getPostAfterLoad, updatePostAction, updatePost }){
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    //const [thePost, setThePost] = useState(() => post);

    const onSubmit = data => {
        if(postId == -1){ // Adding
            addPost(data);
        }
        else if(postId > -1){ // Updating
            updatePost(post, postId);
        }
    };
    useEffect(() => {
        if(postId > -1){ // Updating
            (async () => {
                await getPost(postId);
            })();
        }
        return () => { // set post in the store to null
            updatePostAction(null);
        }
    }, []);
    useEffect(() => {
        if(getPostAfterLoad != null){
            setValue('title', getPostAfterLoad.title);
            setValue('body', getPostAfterLoad.body);
        }
    }, [getPostAfterLoad]);
    return(
        <>
            {(getPostLoading && postId > -1) && 
                <div className="text-center p-2">
                    <Spinner animation="border" variant="danger" /><br />
                    Loading...
                </div>
            }
            {(!getPostLoading || postId == -1) &&
            <Overlay show={postLoading}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text" placeholder="Title" isInvalid={errors.title} defaultValue={post.title} {...register("title", { required: true, pattern: /^[\s-\w]+$/i })} />
                        {errors.title?.type === 'required' && <div className="error-message">*This field is required.</div>}
                        {errors.title?.type === 'pattern' && <div className="error-message">* Enter a correct title.</div>}
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control as="textarea" defaultValue={post.body} isInvalid={errors.body} disabled={ postId > -1 } rows={3} {...register("body", { required: true })} />
                        {errors.body?.type === 'required' && <div className="error-message">*This field is required.</div>}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Overlay>
            }
        </>
    );
}
const PostForm = connect(
    state => ({
        postLoading: postLoadingSelector(state),
        getPostLoading: getPostLoadingSelector(state),
        getPostAfterLoad: getPostSelector(state)
    }),
    {
      addPost,
      updatePost,
      getPost,
      updatePostAction
    }
  )(PostFormComponent);
export default PostForm;
