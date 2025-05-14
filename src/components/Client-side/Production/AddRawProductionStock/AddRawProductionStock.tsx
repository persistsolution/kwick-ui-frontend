import React, { Fragment } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
//import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import Select from "react-select";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import useAddRawProductionStock from "../../../Hook/ProductionAccount/AddRawProductionStock/useAddRawProductionStock";

const AddRawProductionStock: React.FC = () => {
  const {
    formValues,
    message,
    isLoading,
    RawProductionStockList,
    // selectAddRawProductionStockProduct,
    handleChange,
    handleSubmit,
    setselectRawProductionStock,
    // setselectAddRawProductionStockProduct,
  } = useAddRawProductionStock();

  return (
    <Fragment>
      {/* <Pageheader 
        heading="Add RawProductionStock Product Stock"
        homepage="Forms"
        activepage="Add RawProductionStock Stock"
      /> */}

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row className="gy-4">
                    <Col xl={12}>
                      <Form.Group controlId="RawProductionStocklist">
                        <Form.Label>
                          Product<span className="text-danger">*</span>
                        </Form.Label>
                        <Select
                          name="Product"
                          id="Product"
                          className="basic-multi-select "
                          isSearchable
                          menuPlacement="auto"
                          classNamePrefix="Select2"
                          options={
                            RawProductionStockList?.map((option: any) => ({
                              label: option.Fname,
                              value: option.id,
                            })) || []
                          }
                          onChange={(selectedOption) => {
                            setselectRawProductionStock((prevValues: any) => ({
                              ...prevValues,
                              value: selectedOption ? selectedOption.value : "",
                            }));
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>

                      <Row>
       

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

                    <Col xl={8}>
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

export default AddRawProductionStock;
