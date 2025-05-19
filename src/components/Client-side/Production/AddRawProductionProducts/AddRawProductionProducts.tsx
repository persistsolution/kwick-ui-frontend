import React, { Fragment } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
//import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import useAddRawProductionStock from "../../../Hook/ProductionAccount/AddProductionProduct/useAddProductionProduct";
import AddIcon from "@mui/icons-material/Add";
import Select from "react-select";
import DeleteIcon from "@mui/icons-material/Delete";

const AddRawProductionProducts: React.FC = () => {
  const { formValues, message, isLoading, ProductionProductList, ProductionProductArray, handleChange, handleSubmit, handleAddProductionProduct, setFormValues } =
    useAddRawProductionStock();

  return (
    <Fragment>
      {/* <Pageheader 
        heading="Create ProductionProduct Product"
        homepage="Forms"
        activepage="Add ProductionProduct"
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
                      <Form.Group controlId="productName">
                        <Form.Label>Raw Product Name <span className="text-danger ms-1">*</span></Form.Label>
                        <Form.Control
                          name="productName"
                          value={formValues.productName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={6}>
                      <Form.Group controlId="unit">
                        <Form.Label>Unit <span className="text-danger ms-1">*</span></Form.Label>
                        <Form.Control
                          name="unit"
                          type="text"
                          value={formValues.unit}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={2}>
                      <Form.Group controlId="productPrice">
                        <Form.Label>Product Price <span className="text-danger ms-1">*</span></Form.Label>
                        <Form.Control
                          name="productPrice"
                          value={formValues.productPrice}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={2}>
                      <Form.Group controlId="cgst">
                        <Form.Label>CGST%</Form.Label>
                        <Form.Control
                          type="number"
                          name="cgst"
                          value={formValues.cgst}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={2}>
                      <Form.Group controlId="sgst">
                        <Form.Label>SGST%</Form.Label>
                        <Form.Control
                          type="number"
                          name="sgst"
                          value={formValues.sgst}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={2}>
                      <Form.Group controlId="igst">
                        <Form.Label>IGST%</Form.Label>
                        <Form.Control
                          type="number"
                          name="igst"
                          value={formValues.igst}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={2}>
                      <Form.Group controlId="totalgst">
                        <Form.Label>Total GST <span className="text-danger ms-1">*</span></Form.Label>
                        <Form.Control
                          type="number"
                          name="totalgst"
                          value={formValues.totalgst}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>


                    <Col xl={2}>
                      <Form.Group controlId="igst">
                        <Form.Label>IGST%</Form.Label>
                        <Form.Control
                          type="number"
                          name="igst"
                          value={formValues.igst}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={3}>
                      <Form.Group controlId="pricewogst">
                        <Form.Label>Price Wo GST <span className="text-danger ms-1">*</span></Form.Label>
                        <Form.Control
                          type="number"
                          name="pricewogst"
                          value={formValues.pricewogst}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <div>
                      <Row>
                        <Col xl={4}>
                          <Form.Label>
                            Production Product
                          </Form.Label>
                          <Form.Group>
                            <Select
                              id="selectedprodctionProduct"
                              name="selectedprodctionProduct"
                              value={
                                ProductionProductArray.find(
                                  (option: any) =>
                                    option.id.toString() ==
                                    formValues.selectedprodctionProduct.toString()
                                ) || null
                              }
                              options={ProductionProductArray}
                              getOptionLabel={(option: any) => option.label}
                              getOptionValue={(option: any) => option.id}
                              onChange={(selectedOption) => {
                                setFormValues((prevValues) => ({
                                  ...prevValues,
                                  selectedZone: selectedOption
                                    ? selectedOption.id.toString()
                                    : "",
                                }));
                              }}
                              required
                              isSearchable
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="makingQty">
                            <Form.Label>Making Qty</Form.Label>
                            <Form.Control
                              type="number"
                              name="makingQty"
                              value={formValues.makingQty}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={1}>
                          <Button
                            className="btn btn-primary mt-4"
                            onClick={handleAddProductionProduct}
                          >
                            <AddIcon />
                          </Button>
                        </Col>
                      </Row>

                    </div>

                    {ProductionProductList?.map((item) => (
                      <div>
                        <Row>

                            <Col xl={4}>
                          <Form.Label>
                            Production Product
                          </Form.Label>
                          <Form.Group>
                            <Select
                              id="selectedprodctionProduct"
                              name="selectedprodctionProduct"
                              value={
                                ProductionProductArray.find(
                                  (option: any) =>
                                    option.id.toString() ==
                                    formValues.selectedprodctionProduct.toString()
                                ) || null
                              }
                              options={ProductionProductArray}
                              getOptionLabel={(option: any) => option.label}
                              getOptionValue={(option: any) => option.id}
                              onChange={(selectedOption) => {
                                setFormValues((prevValues) => ({
                                  ...prevValues,
                                  selectedZone: selectedOption
                                    ? selectedOption.id.toString()
                                    : "",
                                }));
                              }}
                              required
                              isSearchable
                            />
                          </Form.Group>
                        </Col>

                          <Col xl={2}>
                            <Form.Group controlId="makingQty">
                              <Form.Label>Making Qty</Form.Label>
                              <Form.Control
                                type="number"
                                name="makingQty"
                                value={formValues.makingQty}
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={1}>
                            <Button
                                                            variant="danger"
                              className=" mt-4"
                              onClick={handleAddProductionProduct}
                            >
                              <DeleteIcon />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ))}


                    <Col xl={3}>
                      <Form.Group controlId="name">
                        <Form.Label>Status <span className="text-danger ms-1">*</span></Form.Label>
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
                          className={`mt-3 ${message.includes("successfully")
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

export default AddRawProductionProducts;
