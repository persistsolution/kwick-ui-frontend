import { FC, Fragment } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface ComponentProps { }

const Footer: FC<ComponentProps> = () => {
    return (
        <Fragment>
            <footer className="footer">
                <Container>
                    <Row className="align-items-center flex-row-reverse">
                        <Col md={12} sm={12} className="text-center"> Copyright © <span id="year">{new Date().getFullYear()}</span> <Link to="#">Kwick Bill</Link>. Designed with <span className="fa fa-heart text-danger"></span> by <Link to="#"> Maha Chai Private Limited </Link> All rights reserved.</Col>
                    </Row>
                </Container>
            </footer>
        </Fragment>
    );
};

export default Footer;