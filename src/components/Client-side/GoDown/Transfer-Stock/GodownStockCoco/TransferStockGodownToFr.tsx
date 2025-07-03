import React, { Fragment } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Container,
  Table,
} from "react-bootstrap";
import Select from "react-select";
import AddIcon from "@mui/icons-material/Add";
import useTransferStockGodownToFr from "../../../../Hook/GoDown-Hook/Transfer-Stock/GodownStockCoco/useTransferStockGodownToFr";

const TransferStockGodownToFr: React.FC = () => {
  const {
    formValues,
    message,
    isLoading,
    goDownList,
    goDownProductlist,
    franchisesList,
    totalQty,
    totalGstAmt,
    totalAmt,
    otherProductList,
    GstAmount,
    handleChange,
    handleSubmit,
    handelAddGodown,
    handleRemoveGodownStock,
    setselectGodown,
    setselectFranchise,
    handlSelectGodownProductList,
  } = useTransferStockGodownToFr();

  return (
    <Fragment>
      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row className="gy-4">
                    <Col xl={6}>
                      <Form.Group controlId="goDownlist">
                        <Form.Label>Godown<span className="text-danger">*</span></Form.Label>
                        <Select
                          name="goDownlist"
                          id="goDownlist"
                          isSearchable
                          options={goDownList.map((option: any) => ({ label: option.full_name, value: option.id }))}
                          onChange={(selectedOption) => {
                            setselectGodown(selectedOption);
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={6}>
                      <Form.Group controlId="selectFranchise">
                        <Form.Label>Franchise<span className="text-danger">*</span></Form.Label>
                        <Select
                          name="selectFranchise"
                          id="selectFranchise"
                          isSearchable
                          options={franchisesList.map((option: any) => ({ label: option.full_name, value: option.id }))}
                          onChange={(selectedOption) => {
                            setselectFranchise(selectedOption);
                          }}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Container className="fieldset border col-12 mt-3">
                      <Row>
                        <Col xl={4}>
                          <Form.Group controlId="otherProductList">
                            <Form.Label>Product<span className="text-danger">*</span></Form.Label>
                            <Select
                              name="otherProductList"
                              id="otherProductList"
                              isSearchable
                              menuPlacement="auto"
                              options={otherProductList.map((item: any) => ({
                                label: item.ProductName,
                                value: item.id,
                                data: item,
                              }))}
                              onChange={(selectedOption: any) => {
                                if (selectedOption) {
                                  handlSelectGodownProductList(selectedOption.data);
                                }
                              }}
                              required
                            />

                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="availableStock">
                            <Form.Label>Available Stock</Form.Label>
                            <Form.Control type="text" name="availableStock" value={formValues.availableStock} readOnly />
                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="unit">
                            <Form.Label>Available Stock Unit</Form.Label>
                            <Form.Control type="text" name="unit" value={formValues.unit} readOnly />
                          </Form.Group>
                        </Col>

                        <Col xl={1}>
                          <Form.Group controlId="stockInQty">
                            <Form.Label>Qty</Form.Label>
                            <Form.Control name="stockInQty" type="number" value={formValues.stockInQty} onChange={handleChange} required />
                          </Form.Group>
                        </Col>

                        <Col xl={1}>
                          <Form.Group controlId="qtyUnit">
                            <Form.Label>Qty Unit</Form.Label>
                            <Form.Control name="qtyUnit" type="text" value={formValues.qtyUnit} readOnly />
                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="productPrice">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control name="productPrice" type="number" value={formValues.productPrice} onChange={handleChange} required />
                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="totalPrice">
                            <Form.Label>Total Price</Form.Label>
                            <Form.Control type="number" name="totalPrice" value={Number(formValues.totalPrice).toFixed(2)} readOnly />
                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="totalQty">
                            <Form.Label>Total Qty</Form.Label>
                            <Form.Control name="totalQty" type="number" value={totalQty} readOnly />
                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="totalgst">
                            <Form.Label>GST Amount</Form.Label>
                            <Form.Control type="number" name="totalgst" value={GstAmount} readOnly />
                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="totalAmount">
                            <Form.Label>Total Amount</Form.Label>
                            <Form.Control type="number" name="totalAmount" value={Number(totalAmt).toFixed(2)} readOnly />
                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="invoiveNo">
                            <Form.Label>Invoice No</Form.Label>
                            <Form.Control type="number" name="invoiveNo" value={formValues.invoiveNo} readOnly />
                          </Form.Group>
                        </Col>

                        <Col xl={1}>
                          <Button className="btn btn-primary mt-4" onClick={handelAddGodown}>
                            <AddIcon />
                          </Button>
                        </Col>
                      </Row>
                    </Container>

                    <Col xl={2}>
                      <Form.Group controlId="date">
                        <Form.Label>Date<span className="text-danger">*</span></Form.Label>
                        <Form.Control type="date" name="date" value={formValues.date} onChange={handleChange} required />
                      </Form.Group>
                    </Col>

                    <Col xl={9}>
                      <Form.Group controlId="narration">
                        <Form.Label>Narration</Form.Label>
                        <Form.Control type="text" name="narration" value={formValues.narration} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col>
                      <Button type="submit" className="btn btn-primary" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <span className="me-2">Processing...</span>
                            <span className="loading"><i className="ri-loader-2-fill fs-16"></i></span>
                          </>
                        ) : "Submit"}
                      </Button>
                      {/* {message && (
                        <p className={`mt-3 ${message.includes("successfully") ? "text-success" : "text-danger"}`}>{message}</p>
                      )} */}
                    </Col>
                  </Row>
                </Form>

                {formValues.addGodownStockArray.length > 0 && (
                  <div className="table-responsive mt-4">
                    <Table className="border text-nowrap text-md-nowrap table-hover mb-0">
                      <thead className="table-primary">
                        <tr>
                          <th>Product Name</th>
                          <th>Qty</th>
                          <th>Price</th>
                          <th>Total Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formValues.addGodownStockArray.map((item: any, idx: number) => (
                          <tr key={idx}>
                            <td>{item.productName}</td>
                            <td>{item.stockInQty}</td>
                            <td>{Number(item.productPrice).toFixed(2)}</td>
                            <td>{Number(item.totalPrice).toFixed(2)}</td>
                            <td>
                              <button className="avatar rounded-circle bg-pink cursor-pointer border-0" onClick={() => handleRemoveGodownStock(idx)}>
                                <i className="bi bi-trash fs-15"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default TransferStockGodownToFr;
