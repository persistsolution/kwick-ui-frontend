import React, { Fragment } from "react";
import { Button, Card, Col, Form, Row, Container } from "react-bootstrap";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import useCreateRetailerAccount from "../../../Hook/Retailer-Hook/CreateRetailerAccount/useCreateRetailerAccount";

const CreateRetailerAccount: React.FC = () => {
  const {
    formValues,
    message,
    isLoading,
    handleChange,
    handleSubmit,
    handelAddretailerList,
    addedretailer,
    handleDelete,
    handleChangeretailerList,
  } = useCreateRetailerAccount();

  return (
    <Fragment>
      <Pageheader
        heading="Create Retailer Account"
        homepage="Forms"
        activepage="Create Retailer Account
"
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
                        <Form.Group controlId="godown">
                          <Form.Label>Godown*</Form.Label>
                          <Form.Select
                            name="godown"
                            value={formValues.godown}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group controlId="retailer">
                          <Form.Label>Retailer*</Form.Label>
                          <Form.Select
                            name="retailer"
                            value={formValues.retailer}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col xl={3}>
                        <Form.Group controlId="godownproducts">
                          <Form.Label>Godown Products</Form.Label>
                          <Form.Select
                            name="godownproducts"
                            value={formValues.godownproducts}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col xl={2}>
                        <Form.Group controlId="availableStock">
                          <Form.Label>Available Stock</Form.Label>
                          <Form.Control
                            type="number"
                            name="availableStock"
                            placeholder="Available Stock"
                            value={formValues.availableStock}
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
                            placeholder="Qty"
                            value={formValues.qty}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={2}>
                        <Form.Group controlId="price">
                          <Form.Label>Price*</Form.Label>
                          <Form.Control
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formValues.price}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={2}>
                        <Form.Group controlId="totalprice">
                          <Form.Label>Total Price*</Form.Label>
                          <Form.Control
                            type="number"
                            name="totalprice"
                            placeholder="Total Price"
                            value={formValues.totalprice}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={1}>
                        <Button
                          className="btn btn-primary btn-sm mt-4"
                          onClick={handelAddretailerList}
                        >
                          <AddIcon />
                        </Button>
                      </Col>

                      {addedretailer.map((item: any, idx) => (
                        <Fragment key={idx}>
                          <Col xl={3}>
                            <Form.Group controlId="godownproducts">
                              <Form.Label>Godown Products</Form.Label>
                              <Form.Select
                                name="godownproducts"
                                value={item.godownproducts}
                                onChange={(e) =>
                                  handleChangeretailerList(
                                    e.target.value,
                                    idx,
                                    "godownproducts"
                                  )
                                }
                              >
                                <option value="">Select </option>
                              </Form.Select>
                            </Form.Group>
                          </Col>

                          <Col xl={2}>
                            <Form.Group controlId="availableStock">
                              <Form.Label>Available Stock</Form.Label>
                              <Form.Control
                                type="number"
                                name="availableStock"
                                placeholder="Available Stock"
                                value={item.availableStock}
                                onChange={(e) =>
                                  handleChangeretailerList(
                                    e.target.value,
                                    idx,
                                    "availableStock"
                                  )
                                }
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={2}>
                            <Form.Group controlId="qty">
                              <Form.Label>Qty</Form.Label>
                              <Form.Control
                                type="number"
                                name="qty"
                                placeholder="Qty"
                                value={item.qty}
                                onChange={(e) =>
                                  handleChangeretailerList(
                                    e.target.value,
                                    idx,
                                    "qty"
                                  )
                                }
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={2}>
                            <Form.Group controlId="price">
                              <Form.Label>Price*</Form.Label>
                              <Form.Control
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={item.price}
                                onChange={(e) =>
                                  handleChangeretailerList(
                                    e.target.value,
                                    idx,
                                    "price"
                                  )
                                }
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={2}>
                            <Form.Group controlId="totalprice">
                              <Form.Label>Total Price*</Form.Label>
                              <Form.Control
                                type="number"
                                name="totalprice"
                                placeholder="Total Price"
                                value={item.totalprice}
                                onChange={(e) =>
                                  handleChangeretailerList(
                                    e.target.value,
                                    idx,
                                    "totalprice"
                                  )
                                }
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={1}>
                            <Button
                              className="mt-4"
                              variant="danger"
                              size="sm"
                              onClick={() => handleDelete(idx)}
                            >
                              <DeleteIcon />
                            </Button>
                          </Col>
                        </Fragment>
                      ))}

                      <Col xl={2}>
                        <Form.Group controlId="totalqty">
                          <Form.Label>Total Qty*</Form.Label>
                          <Form.Control
                            type="number"
                            name="totalqty"
                            placeholder="Total Qty"
                            value={formValues.totalqty}
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
                            placeholder="GST Amount"
                            value={formValues.gstAmount}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={2}>
                        <Form.Group controlId="totalamt">
                          <Form.Label>Total Amount*</Form.Label>
                          <Form.Control
                            type="number"
                            name="totalamt"
                            placeholder="Total Qty"
                            value={formValues.totalamt}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={2}>
                        <Form.Group controlId="invoiveNo">
                          <Form.Label>Invoive No*</Form.Label>
                          <Form.Control
                            type="number"
                            name="invoiveNo"
                            placeholder="Total Qty"
                            value={formValues.invoiveNo}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={3}>
                        <Form.Group controlId="date">
                          <Form.Label>Invoive Date*</Form.Label>
                          <Form.Control
                            type="date"
                            name="date"
                            value={formValues.date}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={12}>
                        <Form.Group controlId="narration">
                          <Form.Label>Narration *</Form.Label>
                          <Form.Control
                            type="text"
                            name="narration"
                            value={formValues.narration}
                            onChange={handleChange}
                            required
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

export default CreateRetailerAccount;
