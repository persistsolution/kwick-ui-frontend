import { FC, Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

interface ComponentProps {}

const Footer: FC<ComponentProps> = () => {
  return (
    <Fragment>
      <footer className="footer">
        <Container>
          <Row className="justify-content-around text-center p-0">
            <Col xs={2}>
              <Link to="/Dashboard/IndexPage/" className="footer-icon">
                <i
                  className="fa fa-home font-size-22px"
                  data-bs-toggle="tooltip"
                  title="fa fa-home"
                ></i>
              </Link>
            </Col>
            <Col xs={2}>
              <Link to="/Dashboard/IndexPage/" className="footer-icon">
                <i
                  className="fa fa-shopping-bag font-size-22px"
                  data-bs-toggle="tooltip"
                  title="fa fa-shopping-bag"
                ></i>
              </Link>
            </Col>
            <Col xs={2}>
              <Link to="/Dashboard/IndexPage/" className="footer-icon">
                <i
                  className="fa fa-qrcode font-size-22px"
                  data-bs-toggle="tooltip"
                  title="fa fa-qrcode"
                ></i>
              </Link>
            </Col>
            <Col xs={2}>
              <Link to="/Dashboard/IndexPage/" className="footer-icon">
                <i
                  className="fa fa-google-wallet font-size-22px"
                  data-bs-toggle="tooltip"
                  title="fa fa-google-wallet"
                ></i>
              </Link>
            </Col>
            <Col xs={2}>
              <Link to="/Dashboard/IndexPage/" className="footer-icon">
                <i
                  className="fa fa-user font-size-22px"
                  data-bs-toggle="tooltip"
                  title="fa fa-user"
                ></i>
              </Link>
            </Col>
          </Row>
        </Container>
      </footer>
    </Fragment>
  );
};

export default Footer;
