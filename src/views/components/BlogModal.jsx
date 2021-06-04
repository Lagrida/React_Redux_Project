import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import PostForm from "./PostForm";

function BlogModal({post, show, handleClose, title, children }){
    return(
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                <Modal.Title>{ title }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { children }
                </Modal.Body>
                <Modal.Footer>
                <Button variant="light" onClick={handleClose}>close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BlogModal;
