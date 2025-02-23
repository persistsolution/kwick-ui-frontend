import React, { Fragment } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import useCreateInvoiceProductStock from "../../../Hook/GoDown-Hook/CreateInvoiceProductStock/useCreateInvoiceProductStock";
import Select from "react-select";

const CreateInvoiceProductStock: React.FC = () => {
  const {
    formValues,
    message,
    isLoading,
    vendorList,
    franchiseList,
    productList,
    handleChange,
    handleSubmit,
  } = useCreateInvoiceProductStock();

  return (
    <Fragment>
      <Pageheader
        heading="Create Product Stock Invoice"
        homepage="Forms"
        activepage="Product Stock Invoice"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  {/* <Container> */}
                  <Row className="gy-4">
                    <Col xl={4}>
                      <Form.Group controlId="createGodownAccountName">
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
                    <Col xl={4}>
                      <Form.Group controlId="franchiseList">
                        <Form.Label>Franchise*</Form.Label>
                        <Select
                          name="franchiseList"
                          options={franchiseList}
                          className="basic-multi-select "
                          isSearchable
                          menuPlacement="auto"
                          classNamePrefix="Select2"
                          defaultValue={[franchiseList[0]]}
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={4}>
                      <Form.Group controlId="productList">
                        <Form.Label>Product*</Form.Label>
                        <Select
                          name="productList"
                          options={productList}
                          className="basic-multi-select "
                          isSearchable
                          menuPlacement="auto"
                          classNamePrefix="Select2"
                          defaultValue={[productList[0]]}
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={3}>
                      <Form.Group controlId="avaliableStock">
                        <Form.Label>Available Stock</Form.Label>
                        <Form.Control
                          type="text"
                          name="avaliableStock"
                          value={formValues.avaliableStock}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={2}>
                      <Form.Group controlId="qty">
                        <Form.Label>Qty</Form.Label>
                        <Form.Control
                          type="number"
                          name="qty"
                          value={formValues.qty}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={2}>
                      <Form.Group controlId="rate">
                        <Form.Label>Rate</Form.Label>
                        <Form.Control
                          type="number"
                          name="rate"
                          value={formValues.rate}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={2}>
                      <Form.Group controlId="totalPrice">
                        <Form.Label>Total Price</Form.Label>
                        <Form.Control
                          type="number"
                          name="totalPrice"
                          value={formValues.totalPrice}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={2}>
                      <Form.Group controlId="totalQty">
                        <Form.Label>Total Qty*</Form.Label>
                        <Form.Control
                          name="totalQty"
                          type="number"
                          value={formValues.totalQty}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={2}>
                      <Form.Group controlId="gstAmount">
                        <Form.Label>GST Amount*</Form.Label>
                        <Form.Control
                          type="number"
                          name="gstAmount"
                          value={formValues.gstAmount}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={2}>
                      <Form.Group controlId="totalAmount">
                        <Form.Label>Total Amount*</Form.Label>
                        <Form.Control
                          name="totalAmount"
                          type="text"
                          value={formValues.totalAmount}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={2}>
                      <Form.Group controlId="requestDate">
                        <Form.Label>Request Date*</Form.Label>
                        <Form.Control
                          type="date"
                          name="requestDate"
                          value={formValues.requestDate}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={2}>
                      <Form.Group controlId="updateDate">
                        <Form.Label>Updated Date*</Form.Label>
                        <Form.Control
                          type="date"
                          name="updateDate"
                          value={formValues.updateDate}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={4}>
                      <Form.Group controlId="narration">
                        <Form.Label>Narration</Form.Label>
                        <Form.Control
                          type="text"
                          name="narration"
                          value={formValues.narration}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={4}>
                      <Form.Group controlId="remark">
                        <Form.Label>Remark</Form.Label>
                        <Form.Control
                          type="text"
                          name="remark"
                          value={formValues.remark}
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

export default CreateInvoiceProductStock;
