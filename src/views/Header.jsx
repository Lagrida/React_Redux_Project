import { Container, Row, Col } from "react-bootstrap";


function Header(){
    return(
        <Container>
            <Row className="justify-content-center my-2">
            <Col className="text-center p-2" xs={12} md={10} lg={9}>
                <h1 className="text-bold" style={{ color:'#009E41' }}>My Blog</h1>
            </Col>
            </Row>
        </Container>
    );
}

export default Header;
