import { useEffect, useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { addPost, updatePost, setPostsErrorMessage } from '../../store/Posts/PostActions';
import { postLoadingSelector, getErrorPostsSelector } from "../../store/Posts/PostsSelectors";
import Overlay from "./Overlay";


function PostFormComponent({ post, postLoading, addPost, updatePost, errorMessage, setPostsErrorMessage }){
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log('data ......', data)
        if(post.id == -1){ // Adding
            addPost(data);
        }
        else if(post.id > -1){ // Updating
            updatePost(data);
        }
    }
    useEffect(() => {
        setPostsErrorMessage('');
    }, []);
    return(
            <Overlay show={postLoading}>
                {errorMessage &&
                <Alert variant="danger">
                    <b>{ errorMessage }</b>
                </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)} className="p-2">
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text" placeholder="Title" isInvalid={errors.title} defaultValue={post.title} {...register("title", { required: true, pattern: /^[\s-\w]+$/i })} />
                        {errors.title?.type === 'required' && <div className="error-message">*This field is required.</div>}
                        {errors.title?.type === 'pattern' && <div className="error-message">* Enter a correct title.</div>}
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control as="textarea" defaultValue={post.body} isInvalid={errors.body} readOnly={ post.id > -1 } rows={3} {...register("body", { required: true })} />
                        {errors.body?.type === 'required' && <div className="error-message">*This field is required.</div>}
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Overlay>
    );
}
const PostForm = connect(
    state => ({
        postLoading: postLoadingSelector(state),
        errorMessage: getErrorPostsSelector(state)
    }),
    {
      addPost,
      updatePost,
      setPostsErrorMessage
    }
  )(PostFormComponent);
export default PostForm;
