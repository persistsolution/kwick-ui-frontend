import React, { Fragment } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import Select from "react-select";
import useAddVendorPayment from "../../Hook/VendorPayment-Hook/useAddVendorPayment";

const AddVendorPayment: React.FC = () => {
  const {
    formValues,
    vendorList,
    invoiceNoList,
    message,
    isLoading,
    handleChange,
    handleSubmit,
  } = useAddVendorPayment();

  return (
    <Fragment>
      <Pageheader
        heading="Pay Vendor Amount"
        homepage="Forms"
        activepage="Pay Vendor Amount"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  {/* <Container> */}
                  <Row>
                    <Col xl={6}>
                      <Row className="gy-4">
                        <Col xl={12}>
                          <Form.Group controlId="vendorList">
                            <Form.Label>Vendor*</Form.Label>
                            <Select
                              name="vendorList"
                              options={vendorList}
                              className="basic-multi-select "
                              isSearchable
                              menuPlacement="auto"
                              classNamePrefix="Select2"
                              defaultValue={[vendorList[0]]}
                            />
                          </Form.Group>
                        </Col>
                        <Col xl={12}>
                          <Form.Group controlId="invoiceNoList">
                            <Form.Label>Invoice No*</Form.Label>
                            <Select
                              name="invoiceNoList"
                              options={invoiceNoList}
                              className="basic-multi-select "
                              isSearchable
                              menuPlacement="auto"
                              classNamePrefix="Select2"
                              defaultValue={[invoiceNoList[0]]}
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={3}>
                          <Form.Group controlId="totalAmount">
                            <Form.Label>Total Amount*</Form.Label>
                            <Form.Control
                              name="totalAmount"
                              value={formValues.totalAmount}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group controlId="totalPaidAmount">
                            <Form.Label>Total Paid Amount*</Form.Label>
                            <Form.Control
                              type="number"
                              name="totalPaidAmount"
                              value={formValues.totalPaidAmount}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group controlId="balanceAmount">
                            <Form.Label>Balance Amount*</Form.Label>
                            <Form.Control
                              type="number"
                              name="balanceAmount"
                              value={formValues.balanceAmount}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group controlId="paidAmount">
                            <Form.Label>Paid Amount*</Form.Label>
                            <Form.Control
                              type="number"
                              name="paidAmount"
                              value={formValues.paidAmount}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group controlId="paymentDate">
                            <Form.Label>Payment Date*</Form.Label>
                            <Form.Control
                              type="date"
                              name="paymentDate"
                              value={formValues.paymentDate}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group controlId="paymentType">
                            <Form.Label>Payment Type*</Form.Label>
                            <Form.Select
                              name="paymentType"
                              value={formValues.paymentType}
                              onChange={handleChange}
                              // onClick={handelMessage}
                              required
                            >
                              <option value="">Select </option>
                              <option value={1}>Cash</option>
                              <option value={0}>Cheque/Bank Transfer</option>
                              <option value={0}>UPI</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>

                        <Col xl={12}>
                          <Form.Group controlId="narration">
                            <Form.Label>Narration*</Form.Label>
                            <Form.Control
                              name="narration"
                              type="text"
                              as="textarea"
                              aria-label="With textarea"
                              value={formValues.narration}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col xl={6}>
                      <div className="table-responsive">
                        <b>Payment Transactions</b>
                        <Table
                          id="VendorPayments-table"
                          className="border text-nowrap text-md-nowrap table-hover mb-0"
                        >
                          <thead className="table-primary">
                            <tr>
                              <th>Date</th>
                              <th>Mode</th>
                              <th>Cr</th>
                              <th>Dr</th>
                              <th>Narration</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Total</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Balance</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
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

export default AddVendorPayment;
