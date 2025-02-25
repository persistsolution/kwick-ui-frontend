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
    goDownList,
    goDownProductlist,
    // selectGodownStockProduct,
    handleChange,
    handleSubmit,
    handelAddGodown,
    handleRemoveGodownStock,
    handelChangeAddedGodownPoduct,
    setselectGodown,
    // setselectGodownStockProduct,
    setFormValues,
    handlSelectGodownProductList,
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
                  <Row className="gy-4">
                    <Col xl={12}>
                      <Form.Group controlId="goDownlist">
                        <Form.Label>
                          Godown<span className="text-danger">*</span>
                        </Form.Label>
                        <Select
                          name="goDownlist"
                          id="goDownlist"
                          className="basic-multi-select "
                          isSearchable
                          menuPlacement="auto"
                          classNamePrefix="Select2"
                          options={
                            goDownList?.map((option: any) => ({
                              label: option.Fname,
                              value: option.id,
                            })) || []
                          }
                          onChange={(selectedOption) => {
                            setselectGodown((prevValues: any) => ({
                              ...prevValues,
                              value: selectedOption ? selectedOption.value : "",
                            }));
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Container className="fieldset border  mt-3">
                      {/* <h4 className="legend">Godown Detail</h4> */}
                      <Row>
                        <Col xl={6}>
                          <Form.Group controlId="goDownProductlist">
                            <Form.Label>
                              Product<span className="text-danger">*</span>
                            </Form.Label>
                            <Select
                              name="goDownProductlist"
                              id="goDownProductlist"
                              className="basic-multi-select "
                              isSearchable
                              menuPlacement="auto"
                              classNamePrefix="Select2"
                              options={
                                goDownProductlist?.map((option: any) => ({
                                  label: option.ProductName,
                                  value: option.id,
                                })) || []
                              }
                              onChange={(selectedOption) =>
                                handlSelectGodownProductList(selectedOption)
                              }
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="availableStock">
                            <Form.Label>Available Stock</Form.Label>
                            <Form.Control
                              type="text"
                              name="availableStock"
                              value={formValues.availableStock}
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                        <Col xl={2}>
                          <Form.Group controlId="unit">
                            <Form.Label>Available Stock Unit</Form.Label>
                            <Form.Control
                              type="number"
                              name="unit"
                              value={formValues.unit}
                              readOnly
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
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col xl={2}>
                          <Form.Group controlId="qtyUnit">
                            <Form.Label>Qty Unit</Form.Label>
                            <Form.Control
                              name="qtyUnit"
                              type="text"
                              value={formValues.qtyUnit}
                              readOnly
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
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="totalPrice">
                            <Form.Label>Total Price</Form.Label>
                            <Form.Control
                              type="number"
                              name="totalPrice"
                              value={Number(formValues.totalPrice).toFixed(2)}
                              readOnly
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="cgst">
                            <Form.Label>
                              CGST%<span className="text-danger">*</span>{" "}
                            </Form.Label>
                            <Form.Control
                              type="number"
                              name="cgst"
                              value={formValues.cgst}
                              readOnly
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="sgst">
                            <Form.Label>
                              SGST%<span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              name="sgst"
                              type="number"
                              value={formValues.sgst}
                              readOnly
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="igst">
                            <Form.Label>
                              IGST%<span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              name="igst"
                              type="number"
                              value={formValues.igst}
                              readOnly
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="totalgst">
                            <Form.Label>
                              Total GST<span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              name="totalgst"
                              value={formValues.totalgst}
                              readOnly
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

                    {formValues.addGodownStockArray.map(
                      (item: any, idx: number) => (
                        <Container
                          className="fieldset border p-4 mt-3"
                          key={item.id}
                        >
                          {/* <h5 className="legend">Godown Detail</h5> */}
                          <Row>
                            <Col xl={6}>
                              <Form.Group controlId={`productName`}>
                                <Form.Label>
                                  Product<span className="text-danger">*</span>
                                </Form.Label>

                                <Select
                                  name="productName"
                                  id="productName"
                                  value={
                                    item.productId
                                      ? {
                                          value: item.productId,
                                          label: item.productName,
                                        }
                                      : null
                                  }
                                  options={
                                    goDownProductlist?.map((option: any) => ({
                                      value: option.id,
                                      label: option.ProductName,
                                    })) || []
                                  }
                                  onChange={(selectedOption) => {
                                    setFormValues((prevValues: any) => {
                                      const updatedArray = [
                                        ...prevValues.addGodownStockArray,
                                      ];
                                      updatedArray[idx] = {
                                        ...updatedArray[idx],
                                        productName: selectedOption
                                          ? selectedOption.label
                                          : "",
                                        productId: selectedOption
                                          ? selectedOption.value
                                          : "",
                                      };
                                      return {
                                        ...prevValues,
                                        addGodownStockArray: updatedArray,
                                      };
                                    });
                                  }}
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
                                  type="text"
                                  name="availableStock"
                                  value={item.availableStock}
                                  onChange={(e) =>
                                    handelChangeAddedGodownPoduct(e, idx)
                                  }
                                  readOnly
                                />
                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Group controlId="unit">
                                <Form.Label>Available Stock Unit</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="unit"
                                  value={item.unit}
                                  readOnly
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
                              <Form.Group controlId="qtyUnit">
                                <Form.Label>Qty Unit</Form.Label>
                                <Form.Control
                                  name="qtyUnit"
                                  type="text"
                                  value={item.qtyUnit}
                                  readOnly
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
                                  readOnly
                                />
                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Group controlId={`cgst-${item.id}`}>
                                <Form.Label>
                                  CGST%<span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  name="cgst"
                                  value={item.cgst}
                                  onChange={(e) =>
                                    handelChangeAddedGodownPoduct(e, idx)
                                  }
                                  readOnly
                                />
                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Group controlId={`sgst-${item.id}`}>
                                <Form.Label>
                                  SGST%<span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  name="sgst"
                                  value={item.sgst}
                                  onChange={(e) =>
                                    handelChangeAddedGodownPoduct(e, idx)
                                  }
                                  readOnly
                                />
                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Group controlId={`igst-${item.id}`}>
                                <Form.Label>
                                  IGST%<span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  name="igst"
                                  value={item.igst}
                                  onChange={(e) =>
                                    handelChangeAddedGodownPoduct(e, idx)
                                  }
                                  readOnly
                                />
                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Group controlId={`totalgst-${item.id}`}>
                                <Form.Label>
                                  Total GST
                                  <span className="text-danger">*</span>
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  name="totalgst"
                                  value={item.totalgst}
                                  onChange={(e) =>
                                    handelChangeAddedGodownPoduct(e, idx)
                                  }
                                  readOnly
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
                      )
                    )}

                    <Col xl={2}>
                      <Form.Group controlId="date">
                        <Form.Label>
                          Date<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name="date"
                          value={formValues.date}
                          onChange={handleChange}
                          required
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
