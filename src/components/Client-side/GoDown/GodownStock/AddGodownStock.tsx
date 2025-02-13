import React, { Fragment } from "react";
import { Button, Card, Col, Form, Row, Container } from "react-bootstrap";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import useAddGodownStock from "../../../Hook/GoDown-Hook/GodownStock/useAddGodownStock";
import Select from "react-select";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const AddGodownStock: React.FC = () => {
  const {
    formValues,
    message,
    isLoading,
    handleChange,
    handleSubmit,
    handelAddGodown,
    handleRemoveGodownStock,
    handelChangeAddedGodownPoduct,
  } = useAddGodownStock();

  return (
    <Fragment>
      <Pageheader
        heading="Add Godown Product Stock"
        homepage="Forms"
        activepage="Add Godown Stock"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Container>
                    <Row className="gy-4">
                      <Col xl={12}>
                        <Form.Group controlId="goDownlist">
                          <Form.Label>Godown*</Form.Label>
                          <Select
                            name="state"
                            options={formValues.goDownlist}
                            className="basic-multi-select "
                            isSearchable
                            menuPlacement="auto"
                            classNamePrefix="Select2"
                            defaultValue={[formValues.goDownlist[0]]}
                          />
                        </Form.Group>
                      </Col>

                      <Container className="fieldset border p-3 mt-3">
                        {/* <h4 className="legend">Godown Detail</h4> */}
                        <Row>
                          <Col xl={6}>
                            <Form.Group controlId="productList">
                              <Form.Label>Product*</Form.Label>
                              <Select
                                name="state"
                                options={formValues.productList}
                                className="basic-multi-select "
                                isSearchable
                                menuPlacement="auto"
                                classNamePrefix="Select2"
                                defaultValue={[formValues.productList[0]]}
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={2}>
                            <Form.Group controlId="availableStock">
                              <Form.Label>Available Stock</Form.Label>
                              <Form.Control
                                type="number"
                                name="availableStock"
                                value={formValues.availableStock}
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={2}>
                            <Form.Group controlId="stockInQty">
                              <Form.Label>Stock In Qty</Form.Label>
                              <Form.Control
                                name="stockInQty"
                                type="number"
                                value={formValues.stockInQty}
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={2}>
                            <Form.Group controlId="productPrice">
                              <Form.Label>Product Price</Form.Label>
                              <Form.Control
                                name="productPrice"
                                type="number"
                                value={formValues.productPrice}
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
                            <Form.Group controlId="cgst">
                              <Form.Label>CGST%* </Form.Label>
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
                              <Form.Label>SGST%*</Form.Label>
                              <Form.Control
                                name="sgst"
                                type="number"
                                value={formValues.sgst}
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={2}>
                            <Form.Group controlId="igst">
                              <Form.Label>IGST%* </Form.Label>
                              <Form.Control
                                name="igst"
                                type="number"
                                value={formValues.igst}
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={2}>
                            <Form.Group controlId="totalgst">
                              <Form.Label>Total GST*</Form.Label>
                              <Form.Control
                                type="number"
                                name="totalgst"
                                value={formValues.totalgst}
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={1}>
                            <Button
                              className="btn btn-primary mt-4"
                              onClick={handelAddGodown}
                            >
                              <AddIcon />
                            </Button>
                          </Col>
                        </Row>
                      </Container>

                      {formValues.addGodownStockArray.map((item, idx) => (
                        <Container
                          className="fieldset border p-3 mt-3"
                          key={item.id}
                        >
                          {/* <h5 className="legend">Godown Detail</h5> */}
                          <Row>
                            <Col xl={6}>
                              <Form.Group controlId={`productList-${item.id}`}>
                                <Form.Label>Product*</Form.Label>
                                <Select
                                  name="productList"
                                  options={formValues.productList}
                                  className="basic-multi-select"
                                  isSearchable
                                  menuPlacement="auto"
                                  classNamePrefix="Select2"
                                />
                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Group
                                controlId={`availableStock-${item.id}`}
                              >
                                <Form.Label>Available Stock</Form.Label>
                                <Form.Control
                                  type="number"
                                  name="availableStock"
                                  value={item.availableStock}
                                  onChange={(e) =>
                                    handelChangeAddedGodownPoduct(e, idx)
                                  }
                                />
                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Group controlId={`stockInQty-${item.id}`}>
                                <Form.Label>Stock In Qty</Form.Label>
                                <Form.Control
                                  type="number"
                                  name="stockInQty"
                                  value={item.stockInQty}
                                  onChange={(e) =>
                                    handelChangeAddedGodownPoduct(e, idx)
                                  }
                                />
                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Group controlId={`productPrice-${item.id}`}>
                                <Form.Label>Product Price</Form.Label>
                                <Form.Control
                                  type="number"
                                  name="productPrice"
                                  value={item.productPrice}
                                  onChange={(e) =>
                                    handelChangeAddedGodownPoduct(e, idx)
                                  }
                                />
                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Group controlId={`totalPrice-${item.id}`}>
                                <Form.Label>Total Price</Form.Label>
                                <Form.Control
                                  type="number"
                                  name="totalPrice"
                                  value={item.totalPrice}
                                  onChange={(e) =>
                                    handelChangeAddedGodownPoduct(e, idx)
                                  }
                                />
                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Group controlId={`cgst-${item.id}`}>
                                <Form.Label>CGST%*</Form.Label>
                                <Form.Control
                                  type="number"
                                  name="cgst"
                                  value={item.cgst}
                                  onChange={(e) =>
                                    handelChangeAddedGodownPoduct(e, idx)
                                  }
                                />
                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Group controlId={`sgst-${item.id}`}>
                                <Form.Label>SGST%*</Form.Label>
                                <Form.Control
                                  type="number"
                                  name="sgst"
                                  value={item.sgst}
                                  onChange={(e) =>
                                    handelChangeAddedGodownPoduct(e, idx)
                                  }
                                />
                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Group controlId={`igst-${item.id}`}>
                                <Form.Label>IGST%*</Form.Label>
                                <Form.Control
                                  type="number"
                                  name="igst"
                                  value={item.igst}
                                  onChange={(e) =>
                                    handelChangeAddedGodownPoduct(e, idx)
                                  }
                                />
                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Group controlId={`totalgst-${item.id}`}>
                                <Form.Label>Total GST*</Form.Label>
                                <Form.Control
                                  type="number"
                                  name="totalgst"
                                  value={item.totalgst}
                                  onChange={(e) =>
                                    handelChangeAddedGodownPoduct(e, idx)
                                  }
                                />
                              </Form.Group>
                            </Col>

                            <Col
                              xl={2}
                              className="d-flex align-items-center mt-3"
                            >
                              <Button
                                variant="danger"
                                onClick={() => handleRemoveGodownStock(idx)}
                              >
                                <DeleteIcon />
                              </Button>
                            </Col>
                          </Row>
                        </Container>
                      ))}

                      <Col xl={2}>
                        <Form.Group controlId="date">
                          <Form.Label>Date*</Form.Label>
                          <Form.Control
                            type="date"
                            name="date"
                            value={formValues.date}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col xl={9}>
                        <Form.Group controlId="date">
                          <Form.Label>Narration</Form.Label>
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

export default AddGodownStock;
