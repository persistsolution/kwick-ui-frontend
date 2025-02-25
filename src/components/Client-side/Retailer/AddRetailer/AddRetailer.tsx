import React, { Fragment } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import useAddRetailer from "../../../Hook/Retailer-Hook/AddRetailer/useAddRetailer";

const AddRetailer: React.FC = () => {
  const { formValues, message, isLoading, handleChange, handleSubmit } =
    useAddRetailer();

  return (
    <Fragment>
      <Pageheader
        heading="Create Retailer Account"
        homepage="Forms"
        activepage="Add Retailer"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  {/* <Container> */}
                  <Row className="gy-4">
                    <Col xl={6}>
                      <Form.Group controlId="retailerName">
                        <Form.Label>Retailer Name*</Form.Label>
                        <Form.Control
                          name="retailerName"
                          value={formValues.retailerName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={6}>
                      <Form.Group controlId="retailerAddress">
                        <Form.Label>Retailer Address*</Form.Label>
                        <Form.Control
                          name="retailerAddress"
                          type="text"
                          as="textarea"
                          aria-label="With textarea"
                          value={formValues.retailerAddress}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={4}>
                      <Form.Group controlId="mobileNo">
                        <Form.Label>Mobile No*</Form.Label>
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
                        <Form.Label>Status*</Form.Label>
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

export default AddRetailer;
