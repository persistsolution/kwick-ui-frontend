import React, { Fragment } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Container,
} from "react-bootstrap";
import Select from "react-select";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import useAddGodownStock from "../../../Hook/GoDown-Hook/GodownStock/useAddGodownStock";

type SelectOption = {
  label: string;
  value: number;
};

const AddGodownStock: React.FC = () => {
  const {
    formValues,
    message,
    isLoading,
    goDownList,
    goDownProductlist,
    handleChange,
    handleSubmit,
    handelAddGodown,
    handleRemoveGodownStock,
    handelChangeAddedGodownPoduct,
    setselectGodown,
    handlSelectGodownProductList,
    setFormValues
  } = useAddGodownStock();

  return (
    <Fragment>
      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row className="gy-4">
                    {/* Godown Dropdown */}
                    <Col xl={12}>
                      <Form.Group controlId="goDownlist">
                        <Form.Label>
                          Godown<span className="text-danger">*</span>
                        </Form.Label>
                        <Select
                          name="goDownlist"
                          isSearchable
                          options={
                            goDownList?.map((option) => ({
                              label: option.full_name,
                              value: option.id,
                            })) || []
                          }
                          onChange={(selectedOption: SelectOption | null) => {
                            if (selectedOption) {
                              setselectGodown({
                                label: selectedOption.label,
                                value: selectedOption.value,
                              });
                            } else {
                              setselectGodown(null);
                            }
                          }}
                        />
                      </Form.Group>
                    </Col>

                    {/* Product Selection Section */}
                    <Container className="fieldset border mt-3 col-12">
                      <Row>
                        <Col xl={3}>
                          <Form.Group controlId="goDownProductlist">
                            <Form.Label>
                              Product<span className="text-danger">*</span>
                            </Form.Label>
                            <Select
                              name="goDownProductlist"
                              isSearchable
                              options={
                                goDownProductlist?.map((option) => ({
                                  label: option.ProductName,
                                  value: option.id,
                                })) || []
                              }
                              onChange={(selectedOption: SelectOption | null) =>
                                selectedOption &&
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
                              type="text"
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
                              type="number"
                              name="stockInQty"
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
                              type="text"
                              name="qtyUnit"
                              value={formValues.qtyUnit}
                              readOnly
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="productPrice">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control
                              type="number"
                              name="productPrice"
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

                        <Col xl={1}>
                          <Form.Group controlId="cgst">
                            <Form.Label>CGST%</Form.Label>
                            <Form.Control
                              type="number"
                              name="cgst"
                              value={formValues.cgst}
                              readOnly
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={1}>
                          <Form.Group controlId="sgst">
                            <Form.Label>SGST%</Form.Label>
                            <Form.Control
                              type="number"
                              name="sgst"
                              value={formValues.sgst}
                              readOnly
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={1}>
                          <Form.Group controlId="igst">
                            <Form.Label>IGST%</Form.Label>
                            <Form.Control
                              type="number"
                              name="igst"
                              value={formValues.igst}
                              readOnly
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="totalgst">
                            <Form.Label>Total GST</Form.Label>
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

                    {/* Listing Added Products */}
                    {formValues.addGodownStockArray.map((item, idx) => (
                      <Container className="fieldset border p-4 mt-3" key={idx}>
                        <Row>
                          <Col xl={6}>
                            <Form.Group controlId={`productName-${idx}`}>
                              <Form.Label>Product</Form.Label>
                              <Select
                                name="productName"
                                value={{
                                  label: item.productName || "",
                                  value: item.productId || 0,
                                }}
                                options={goDownProductlist.map((option) => ({
                                  label: option.ProductName,
                                  value: option.id,
                                }))}
                                onChange={(selectedOption: SelectOption | null) => {
                                  if (!selectedOption) return;
                                  const updatedArray = [...formValues.addGodownStockArray];
                                  updatedArray[idx] = {
                                    ...updatedArray[idx],
                                    productName: selectedOption.label,
                                    productId: selectedOption.value,
                                  };
                                  setFormValues((prev) => ({
                                    ...prev,
                                    addGodownStockArray: updatedArray,
                                  }));
                                }}
                              />
                            </Form.Group>
                          </Col>

                          {[
                            { label: "Available Stock", key: "availableStock" },
                            { label: "Unit", key: "unit" },
                            { label: "Stock In Qty", key: "stockInQty" },
                            { label: "Qty Unit", key: "qtyUnit" },
                            { label: "Product Price", key: "productPrice" },
                            { label: "Total Price", key: "totalPrice", readOnly: true },
                            { label: "CGST%", key: "cgst", readOnly: true },
                            { label: "SGST%", key: "sgst", readOnly: true },
                            { label: "IGST%", key: "igst", readOnly: true },
                            { label: "Total GST", key: "totalgst", readOnly: true },
                          ].map(({ label, key, readOnly = false }) => (
                            <Col xl={2} key={key}>
                              <Form.Group controlId={`${key}-${idx}`}>
                                <Form.Label>{label}</Form.Label>
                                <Form.Control
                                  type="number"
                                  name={key}
                                  value={(item as any)[key]}
                                  onChange={(e) => handelChangeAddedGodownPoduct(e, idx)}
                                  readOnly={readOnly}
                                />
                              </Form.Group>
                            </Col>
                          ))}

                          <Col xl={2} className="d-flex align-items-center mt-3">
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

                    {/* Date & Narration */}
                    <Col xl={2}>
                      <Form.Group controlId="date">
                        <Form.Label>Date</Form.Label>
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
                  </Row>

                  {/* Submit Button */}
                  <Row className="mt-4">
                    <Col>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Submitting..." : "Submit"}
                      </Button>
                      {message && (
                        <p className={`mt-3 ${message.includes("successfully") ? "text-success" : "text-danger"}`}>
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
