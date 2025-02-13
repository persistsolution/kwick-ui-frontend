import React, { Fragment } from "react";
import { Button, Card, Col, Form, Row, Container } from "react-bootstrap";
import useAddFinancerPatner from "../../../Hook/FinancerPatner-Hook/FinancerPatnerAccount/useAddFinancerPatner";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";

const AddFinancerPartnerAccount: React.FC = () => {
  const {
    // AdminAccess,
    // RightAccess,
    // franchiseOptions,
    formData,
    message,
    isLoading,
    handleChange,
    handleSubmit,
  } = useAddFinancerPatner();

  return (
    <Fragment>
      <Pageheader
        heading="Add Financer/Partner Account"
        homepage="Forms"
        activepage="Add Financer/Partner Account"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Container className="fieldset">
                    <h4 className="legend">Personal Detail</h4>
                    <Row className="gy-4">
                      <Col xl={12}>
                        <Form.Group controlId="financerPatnerName">
                          <Form.Label>Financer/Partner Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="financerPatnerName"
                            placeholder="Financer/Partner Name"
                            value={formData.FinancerPatnerAccountName}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={12}>
                        <Form.Group controlId="retailerAddress">
                          <Form.Label>Retailer Address</Form.Label>
                          <Form.Control
                            type="text"
                            as="textarea"
                            aria-label="With textarea"
                            name="retailerAddress"
                            placeholder="Retailer Address"
                            value={formData.details}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="mobileNo">
                          <Form.Label>Mobile No*</Form.Label>
                          <Form.Control
                            type="number"
                            name="mobileNo"
                            placeholder="Enter Mobile No"
                            value={formData.mobileNo}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="mobileNo">
                          <Form.Label>Another Mobile No</Form.Label>
                          <Form.Control
                            type="number"
                            name="mobileNo"
                            placeholder="Enter Another Mobile No"
                            value={formData.anotherMobileNo}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="emailId">
                          <Form.Label>Email Id</Form.Label>
                          <Form.Control
                            type="email"
                            name="emailId"
                            placeholder="Enter Email Id"
                            value={formData.emailId}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="photo">
                          <Form.Label>Photo</Form.Label>
                          <Form.Control
                            type="file"
                            name="photo"
                            onChange={handleChange}
                            accept="image/*"
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="commisionPercentage">
                          <Form.Label>Commision Percentage*</Form.Label>
                          <Form.Control
                            type="text"
                            name="commisionPercentage"
                            placeholder="Commision Percentege"
                            value={formData.emailId}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="status ">
                          <Form.Label>Status*</Form.Label>
                          <Form.Select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                          >
                            <option value={1}>Active</option>
                            <option value={0}>InActive </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Container>
                  <Container className="fieldset">
                    <h4 className="legend">COCO Franchise Access</h4>
                    <Row className="gy-4"></Row>
                  </Container>
                  <Container className="fieldset">
                    <h4 className="legend">FOFO Franchise Access</h4>
                    <Row className="gy-4"></Row>
                  </Container>
                  <Container className="fieldset">
                    <h4 className="legend"> Other Franchise Access</h4>
                    <Row className="gy-4"></Row>
                  </Container>
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
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default AddFinancerPartnerAccount;
