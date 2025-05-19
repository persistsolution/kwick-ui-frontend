import React, { Fragment } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import useAddProductionAccount from "../../../Hook/ProductionAccount/AddProductionAccount/useAddProductionAccount";
//import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";

const AddProductionAccount: React.FC = () => {
  const { formValues, message, isLoading, handleChange, handleSubmit } =
  useAddProductionAccount();

  return (
    <Fragment>
      {/* <Pageheader 
        heading="Create ProductionAccount Account"
        homepage="Forms"
        activepage="Add ProductionAccount"
      /> */}

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  {/* <Container> */}
                  <Row className="gy-4">
                    <Col xl={6}>
                      <Form.Group controlId="Name">
                        <Form.Label>Name<span className="text-danger ms-1">*</span></Form.Label>
                        <Form.Control
                          name="Name"
                          value={formValues.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={6}>
                      <Form.Group controlId="address">
                        <Form.Label>Address<span className="text-danger ms-1">*</span></Form.Label>
                        <Form.Control
                          name="address"
                          type="text"
                          as="textarea"
                          aria-label="With textarea"
                          value={formValues.address}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={4}>
                      <Form.Group controlId="mobileNo">
                        <Form.Label>Mobile No<span className="text-danger ms-1">*</span></Form.Label>
                        <Form.Control
                          name="mobileNo"
                          value={formValues.mobileNo}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={4}>
                      <Form.Group controlId="anothermobileNo">
                        <Form.Label>Another Mobile No</Form.Label>
                        <Form.Control
                          type="number"
                          name="anothermobileNo"
                          value={formValues.anothermobileNo}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={4}>
                      <Form.Group controlId="emailId">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="emailId"
                          value={formValues.emailId}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={6}>
                      <Form.Group controlId="Photo">
                        <Form.Label>Photo</Form.Label>
                        <Form.Control
                          type="file"
                          name="Photo"
                          value={formValues.Photo}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={4}>
                      <Form.Group controlId="name">
                        <Form.Label>Status<span className="text-danger ms-1">*</span></Form.Label>
                        <Form.Select
                          name="status"
                          value={formValues.status}
                          onChange={handleChange}
                          // onClick={handelMessage}
                          required
                        >
                          <option value="">Select </option>
                          <option value={1}>Active</option>
                          <option value={0}>Not Active</option>
                        </Form.Select>
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
                        {isLoading ? "Submitting..." : "Submit"}
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
                  {/* </Container> */}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default AddProductionAccount;
