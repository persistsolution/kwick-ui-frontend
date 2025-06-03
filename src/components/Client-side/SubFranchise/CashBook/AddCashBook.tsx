import React, { Fragment } from "react";
import { Button, Card, Col, Form, Row, Container } from "react-bootstrap";
// import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import Select from "react-select";
import useAddCashBook from "../../../Hook/SubFranchise/CashBook/useAddCashBook";

const AddCashBook: React.FC = () => {
  const { formValues, message, isLoading, handleChange, handleSubmit } =
    useAddCashBook();

  return (
    <Fragment>
      {/* <Pageheader
        heading="Add Cash Book"
        homepage="Dashboard"
        activepage="Add Cash Book"
      /> */}

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row className="gy-4">
                      <Col xl={4}>
                        <Form.Group controlId="totalcashAmount">
                          <Form.Label>Total Cash Amount <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            name="totalcashAmount"
                            value={formValues.totalcashAmount}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="transferAmount">
                          <Form.Label>Transfer Amount <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            name="transferAmount"
                            value={formValues.transferAmount}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="balanceAmount">
                          <Form.Label>Balance Amount <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            name="balanceAmount"
                            value={formValues.balanceAmount}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="date">
                          <Form.Label>Date <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="date"
                            name="date"
                            // value={formValues.date}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="bankName">
                          <Form.Label>Bank Name <span className="text-danger">*</span></Form.Label>
                          <Select
                            name="state"
                            options={formValues.bankName}
                            className="basic-multi-select "
                            isSearchable
                            menuPlacement="auto"
                            classNamePrefix="Select2"
                            defaultValue={[formValues.bankName[0]]}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="accountNo">
                          <Form.Label>Account No <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="number"
                            name="accountNo"
                            value={formValues.accountNo}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="uploadReceipt">
                          <Form.Label>Upload Receipt <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="file"
                            name="uploadReceipt"
                            value={formValues.uploadReceipt}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={8}>
                        <Form.Group controlId="narration">
                          <Form.Label>Narration <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            as="textarea"
                            aria-label="With textarea"
                            name="narration"
                            placeholder=""
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
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default AddCashBook;
