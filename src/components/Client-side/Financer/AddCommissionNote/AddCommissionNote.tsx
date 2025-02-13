import React, { Fragment } from "react";
import { Button, Card, Col, Form, Row, Container } from "react-bootstrap";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import useAddCommissionNote from "../../../Hook/Financer-Hook/AddCommissionNote/useAddCommissionNote";

const AddCommissionNote: React.FC = () => {
  const { formValues, message, isLoading, handleChange, handleSubmit } =
    useAddCommissionNote();

  return (
    <Fragment>
      <Pageheader
        heading="Add Commission Note"
        homepage="Forms"
        activepage="Commission Note"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Container>
                    <Row className="gy-4">
                      <Col xl={6}>
                        <Form.Group controlId="FinancerName">
                          <Form.Label>Financer Name*</Form.Label>
                          <Form.Control
                            name="FinancerName"
                            value={formValues.FinancerName}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group controlId="description">
                          <Form.Label>Description*</Form.Label>
                          <Form.Control
                            name="description"
                            type="text"
                            as="textarea"
                            aria-label="With textarea"
                            value={formValues.description}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={2}>
                        <Form.Group controlId="saleAmt">
                          <Form.Label>Sale Amount*</Form.Label>
                          <Form.Control
                            name="saleAmt"
                            value={formValues.saleAmt}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={2}>
                        <Form.Group controlId="nonGstAmt">
                          <Form.Label>Non GST Amount*</Form.Label>
                          <Form.Control
                            type="number"
                            name="nonGstAmt"
                            value={formValues.nonGstAmt}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={2}>
                        <Form.Group controlId="commission">
                          <Form.Label>Commission %*</Form.Label>
                          <Form.Control
                            type="number"
                            name="commission"
                            value={formValues.commission}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={2}>
                        <Form.Group controlId="amount">
                          <Form.Label>Amount*</Form.Label>
                          <Form.Control
                            type="number"
                            name="amount"
                            value={formValues.amount}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={2}>
                        <Form.Group controlId="tds">
                          <Form.Label>TDS*</Form.Label>
                          <Form.Control
                            type="number"
                            name="tds"
                            value={formValues.tds}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={2}>
                        <Form.Group controlId="totalAmount">
                          <Form.Label>Total Amount*</Form.Label>
                          <Form.Control
                            type="number"
                            name="totalAmount"
                            value={formValues.totalAmount}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={3}>
                        <Form.Group controlId="noteNo">
                          <Form.Label>Note No*</Form.Label>
                          <Form.Control
                            type="number"
                            name="noteNo"
                            value={formValues.noteNo}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={3}>
                        <Form.Group controlId="noteDate">
                          <Form.Label>Note Date*</Form.Label>
                          <Form.Control
                            type="date"
                            name="noteDate"
                            value={formValues.noteDate}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={3}>
                        <Form.Group controlId="paymentDate">
                          <Form.Label>Payment Date*</Form.Label>
                          <Form.Control
                            type="number"
                            name="paymentDate"
                            value={formValues.paymentDate}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={3}>
                        <Form.Group controlId="bankReferanceNo">
                          <Form.Label>Bank Referance No*</Form.Label>
                          <Form.Control
                            type="number"
                            name="bankReferanceNo"
                            value={formValues.bankReferanceNo}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={10}>
                        <Form.Group controlId="narration">
                          <Form.Label>Narration*</Form.Label>
                          <Form.Control
                            type="text"
                            name="narration"
                            value={formValues.narration}
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
                  </Container>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default AddCommissionNote;
