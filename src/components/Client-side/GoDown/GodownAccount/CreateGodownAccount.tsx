import React, { Fragment } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import useCreateGodownAccount from "../../../Hook/GoDown-Hook/CreateGodownAccount/useCreateGodownAccount";

const CreateGodownAccount: React.FC = () => {
  const { formValues, message, isLoading, handleChange, handleSubmit } =
    useCreateGodownAccount();

  return (
    <Fragment>
      <Pageheader
        heading="Create Godown Account"
        homepage="Forms"
        activepage="Godown Account"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Col className="fieldset">
                    <h4 className="legend">Godown Detail</h4>
                    <Row className="gy-4">
                      <Col xl={8}>
                        <Form.Group controlId="createGodownAccountName">
                          <Form.Label>
                            Godown Name <span className="text-danger"> *</span>
                          </Form.Label>
                          <Form.Control
                            name="createGodownAccountName"
                            value={formValues.createGodownAccountName}
                            onChange={handleChange}
                            required
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

                      <Col xl={3}>
                        <Form.Group controlId="mobileNo">
                          <Form.Label>
                            Mobile No <span className="text-danger"> *</span>
                          </Form.Label>
                          <Form.Control
                            name="mobileNo"
                            value={formValues.mobileNo}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={3}>
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

                      <Col xl={3}>
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

                      {/* <Col xl={3}>
                        <Form.Group controlId="lattitude">
                          <Form.Label>Lattitude</Form.Label>
                          <Form.Control
                            type="number"
                            name="lattitude"
                            value={formValues.lattitude}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={3}>
                        <Form.Group controlId="longitude">
                          <Form.Label>Longitude</Form.Label>
                          <Form.Control
                            type="number"
                            name="longitude"
                            value={formValues.longitude}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col> */}

                      <Col xl={2}>
                        <Form.Group controlId="name">
                          <Form.Label>
                            Status<span className="text-danger"> *</span>
                          </Form.Label>
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

                      <Col xl={7}>
                        <Form.Group controlId="retailerAddress">
                          <Form.Label>
                            Address <span className="text-danger"> *</span>
                          </Form.Label>
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
                  </Col>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default CreateGodownAccount;
