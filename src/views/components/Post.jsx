import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { substrText } from "../../helpers/substrText";
import { connect } from 'react-redux';
import { deletePost } from '../../store/Posts/PostActions';

function PostComponent({ post, handleShow, deletePost, handleCheckboxChange, handleShow2 }) {
    const deleteThePost = () => {
        const message = "Are you sure to delete Post ?"
        if(window.confirm(message)){
            deletePost(post.id);
        }
    }
    return (
        <>
            <div className="mr-2 mb-2 post">
                <div className="check_box">
                    <input type="checkbox" value={ post.id } onChange={ handleCheckboxChange } />
                </div>
                <div className="post-body post-background py-3">
                    <h2>{substrText(post.title)}</h2>
                    <div style={{ fontSize: 12 }} className="p-1 mb-3">
                        {substrText(post.body, 100)}
                    </div>
                </div>
                <div className="post-background pb-3">
                    <div style={{ float: 'right' }}>
                        <Link to='/' style={{ textDecoration: 'underline' }} onClick={event => handleShow2(event, post.id)}>Read More ...</Link>
                    </div>
                    <div style={{ clear: 'both' }}></div>
                </div>
                <div>
                    <Container fluid className="p-0" style={{}}>
                        <Row>
                            <Col xs={6} className="pr-0">
                                <div style={{ paddingRight: 2 }}>
                                    <Button onClick={handleShow} className="text-white" variant="warning" style={{ borderRadius: 0, borderEndStartRadius: 5, backgroundColor: '#F56422', fontSize: 17 }} size="lg" block>Edit</Button>
                                </div>
                            </Col>
                            <Col xs={6} className="pl-0">
                                <div style={{ paddingLeft: 2 }}>
                                    <Button variant="danger" style={{ borderRadius: 0, borderEndEndRadius: 5, fontSize: 17 }} size="lg" block onClick={deleteThePost}>Delete</Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
}
const Post = connect(
  state => ({}),
  {
    deletePost
  }
)(PostComponent);
export default Post;
