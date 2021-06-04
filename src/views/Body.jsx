import React, {useEffect, useState} from 'react';
import {
    Col,
    Container,
    FormControl,
    InputGroup,
    Row,
    Button,
    Form,
    Spinner
  } from 'react-bootstrap';
import { connect } from 'react-redux';
  import {Link} from 'react-router-dom'
import { postsSelector, postsLoadingSelector, postsFullFeedSelector, postOpenModalSelector, getDeletingSelector } from '../store/Posts/PostsSelectors';
import BlogModal from './components/BlogModal';
import Post from './components/Post';
import PostForm from './components/PostForm';
import { openModal } from '../store/Posts/PostActions';

const initPostForm = {
  title: '',
  body: ''
}

const titles = ['Add new Post', 'Modify Post'];

function BodyComponent({ posts, loading, isFullFeed, postOpenModal, openModal, deleting }){

  const [post, setPost] = useState(() => initPostForm);
  const [postId, setPostId] = useState(() => -1); // -1 : add, number >= 0 : update
  const handleClose = () => openModal(false);
  const handleShow = () => openModal(true);
  const updatePost = id => {
    setPostId(id); // updating
    handleShow();
  }
  const addPost = () => {
    setPostId(-1); // adding
    handleShow();
  }
    return(
        <Container>
          {deleting &&
          <div className="backdrop">
            <div className="backdrop-overlay">
              <Spinner animation="border" variant="light" />
            </div>
          </div>
          }
          <BlogModal show={postOpenModal} handleClose={handleClose} title={postId === -1 ? titles[0] : titles[1]}>
            <PostForm post={post} postId={postId} />
          </BlogModal>
          <Row className="justify-content-center my-2">
            <Col className="text-center p-2" xs={12} md={10} lg={9}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Type in order to search"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  style={{ border:'2.5px solid #009E41' }}
                />
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon2" className="text-white btn" style={{ backgroundColor:'#009E41' }} onClick={addPost}>NEW POST</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
          <Row className="justify-content-center my-2">
            <Col className="text-center p-0" xs={12} md={10} lg={9}>
              <div className="flex-container">
                {loading &&
                  <div>
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner><br />
                    Loading...
                  </div>}
                {isFullFeed &&
                  posts.map((post, index) => 
                    <Post key={'post-' + index} post={post} handleShow={() => updatePost(post.id)} />
                  )
                }
              </div>
            </Col>
          </Row>
      </Container>
    );
}
const Body = connect(
  state => ({
      posts: postsSelector(state),
      loading: postsLoadingSelector(state),
      isFullFeed: postsFullFeedSelector(state),
      postOpenModal: postOpenModalSelector(state),
      deleting: getDeletingSelector(state)
  }),
  {
    openModal
  }
)(BodyComponent);
export default Body;
