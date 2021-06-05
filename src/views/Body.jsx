import React, {useEffect, useState, useCallback} from 'react';
import {
    Col,
    Container,
    FormControl,
    InputGroup,
    Row,
    Button,
    Form,
    Spinner,
    Alert
  } from 'react-bootstrap';
import { connect } from 'react-redux';
  import {Link} from 'react-router-dom'
import {
  postsFiltredSelector,
  postsLoadingSelector,
  postsFullFeedSelector,
  postOpenModalSelector,
  getDeletingSelector
} from '../store/Posts/PostsSelectors';
import BlogModal from './components/BlogModal';
import Post from './components/Post';
import PostForm from './components/PostForm';
import { openModal, deleteMultiplePosts, typeSearch } from '../store/Posts/PostActions';
import useDebounce from '../helpers/useDebounce';
import DisplayPost from './components/DisplayPost';
import { errorsMessageSelector } from '../store/Errors/ErrorsSelectors';
import { setErrorMessage } from '../store/Errors/ErrorsActions';

const titles = ['Add new Post', 'Modify Post'];

const initPostForm = {
  id: -1,
  title: '',
  body: ''
}

function BodyComponent({ posts, loading, isFullFeed, postOpenModal, openModal, deleting, deleteMultiplePosts, typeSearch, messageError, setErrorMessage }){

  const [post, setPost] = useState(() => initPostForm);
  const [inputs, setInputs] = useState(() => []);
  const [searchTerm, setSearchTerm] = useState('');

  const [show, setShow] = useState(false);

  const handleClose2 = () => setShow(false);

  const handleShow2 = (event, id) => {
    event.preventDefault();
    const selectedPost = posts.find(el => el.id === id);
    setPost(selectedPost);
    setShow(true);
  }

  const handleCheckboxChange = event => {
    let checkedList = [...inputs];
    const type = event.target.checked; // check - uncheck
    const post_id = Number(event.target.value);
    if(type){ // add post to the list
      checkedList.push(post_id);
    }else{ // remove post from list
      checkedList = checkedList.filter(el => el !== post_id);
    }
    setInputs(checkedList);
  }

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const handleSearchChange = event => {
    const searchText = event.target.value;
    setSearchTerm(searchText);
  }

  const handleClose = () => openModal(false);
  const handleShow = () => openModal(true);
  const updatePost = id => {
    const selectedPost = posts.find(el => el.id === id);
    setPost(selectedPost); // updating
    handleShow();
  }
  const addPost = () => {
    setPost(initPostForm); // adding
    handleShow();
  }
  const multipleDelete = async () => {
    const message = "Are you sure to delete selected posts ?";
    if(window.confirm(message)){
      setInputs([]);
      await deleteMultiplePosts(inputs);
    }
  }
  const closeErrorMessage = () => {
    console.log('Entring to Close')
    setErrorMessage('');
  }
  useEffect(() => {
    typeSearch(searchTerm);
    setInputs([]);
  }, [debouncedSearchTerm]);
    return(
        <Container>
          {deleting &&
          <div className="backdrop">
            <div className="backdrop-overlay">
              <Spinner animation="border" variant="light" />
            </div>
          </div>
          }
          <BlogModal show={postOpenModal} handleClose={handleClose} title={post.id === -1 ? titles[0] : titles[1]}>
            <PostForm post={post} />
          </BlogModal>
          <BlogModal show={show} handleClose={handleClose2} title={post.title}>
            <DisplayPost post={post} />
          </BlogModal>
          <Row className="justify-content-center my-2">
            {messageError != '' &&
            <Col className="text-center" xs={12} md={10} lg={9}>
              <Alert variant="danger" onClose={closeErrorMessage} dismissible>
                <Alert.Heading>Error</Alert.Heading>
                <p>
                  { messageError }
                </p>
              </Alert>
            </Col>
            }
            <Col className="text-center p-2" xs={12} md={10} lg={9}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Type in order to search"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  style={{ border:'2.5px solid #009E41' }}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon2" className="text-white btn" style={{ backgroundColor:'#009E41' }} onClick={addPost}>NEW POST</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
          <Row className="justify-content-center my-2">
            <Col className="text-center p-0" xs={12} md={10} lg={9}>
              <div className="my-2 text-left ml-3">
                <Button variant="danger" disabled={inputs.length === 0} onClick={ multipleDelete }>Delete ({ inputs.length })</Button>
              </div>
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
                    <Post key={'post-' + index} post={post} handleShow={() => updatePost(post.id)} handleShow2={handleShow2} handleCheckboxChange={ handleCheckboxChange } />
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
      posts: postsFiltredSelector(state),
      loading: postsLoadingSelector(state),
      isFullFeed: postsFullFeedSelector(state),
      postOpenModal: postOpenModalSelector(state),
      deleting: getDeletingSelector(state),

      messageError: errorsMessageSelector(state)
  }),
  {
    openModal,
    deleteMultiplePosts,
    typeSearch,

    setErrorMessage
  }
)(BodyComponent);
export default Body;
