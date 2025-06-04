import { FC, Fragment, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  ListGroup,
  Nav,
  Row,
  Tab,
  Container,
} from "react-bootstrap";
import usePrintSetting from "../../../Hook/SubFranchise/PrintSetting/usePrintSetting";

const PrintSetting: FC = () => {
  const {
    formData,
    message,
    isLoading,
    handleChange,
    handleSubmitFooterSetting,
    handleSubmitHeaderSetting,
    handelMessage,
  } = usePrintSetting();

  return (
    <Row >
      <Col xl={12}>
        <Card>
          <Card.Header className="justify-content-between">
            <Card.Title as="h4">Print Setting</Card.Title>
          </Card.Header>
          <Card.Body>
            <Tab.Container defaultActiveKey={1}>
              <Nav
                variant="pills"
                className="mb-3 bg-primary-transparent br-5 p-2"
              >
                <Nav.Item>
                  {" "}
                  <Nav.Link eventKey={1}>Header</Nav.Link>{" "}
                </Nav.Item>
                <Nav.Item>
                  {" "}
                  <Nav.Link eventKey={2} tabIndex={-1}>
                    Footer
                  </Nav.Link>{" "}
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey={1} className="fade show" tabIndex={0}>
                  <Form onSubmit={handleSubmitHeaderSetting}>
                    <Container>
                      <Row className="gy-4">
                        <Col xl={12}>
                          <Form.Group controlId="companyName">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={12}>
                          <Form.Group controlId="companyAddress">
                            <Form.Label>Company Address</Form.Label>
                            <Form.Control
                              as="textarea"
                              aria-label="With textarea"
                              type="text"
                              name="companyAddress"
                              value={formData.companyAddress}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={6}>
                          <Form.Group controlId="mobileNumber">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                              name="mobileNumber"
                              type="number"
                              value={formData.mobileNumber}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={6}>
                          <Form.Group controlId="gstNo">
                            <Form.Label>GST No* </Form.Label>
                            <Form.Control
                              type="number"
                              name="gstNo"
                              value={formData.gstNo}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="mt-4">
                        <Col>
                          <Button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isLoading}
                          >
                            {isLoading ? "Saving..." : "Save"}
                          </Button>
                          {message && (
                            <p
                              className={`mt-3 ${
                                message.includes("successfully")
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {message}
                            </p>
                          )}
                        </Col>
                      </Row>
                    </Container>
                  </Form>
                </Tab.Pane>
                <Tab.Pane eventKey={2} className="fade" tabIndex={0}>
                  <Form onSubmit={handleSubmitFooterSetting}>
                    <Row>
                      <Col xl={12}>
                        <Form.Group controlId="termsandcondition">
                          <Form.Label>Terms & Condition *</Form.Label>
                          <Form.Control
                            as="textarea"
                            aria-label="With textarea"
                            type="text"
                            name="termsandcondition"
                            value={formData.termsandcondition}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={12}>
                        <Form.Group controlId="bottomTitle">
                          <Form.Label>Bottom Title *</Form.Label>
                          <Form.Control
                            as="textarea"
                            aria-label="With textarea"
                            type="text"
                            name="bottomTitle"
                            value={formData.bottomTitle}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col>
                        <Button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isLoading}
                        >
                          {isLoading ? "Saving..." : "Save"}
                        </Button>
                        {message && (
                          <p
                            className={`mt-3 ${
                              message.includes("successfully")
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {message}
                          </p>
                        )}
                      </Col>
                    </Row>
                  </Form>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default PrintSetting;
