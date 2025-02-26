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
import Pageheader from "../../../../../layouts/Component/PageHeader/PageHeader";
import Select from "react-select";
import AddIcon from "@mui/icons-material/Add";
import useTransferStockGodownToFofoFr from "../../../../Hook/GoDown-Hook/Transfer-Stock/GodownStockFofo/useTransferStockGodownToFofoFr";

const TransferStockGodownToFofoFr: React.FC = () => {
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
    // selectGodownStockProduct,
    handleChange,
    handleSubmit,
    handelAddGodown,
    handleRemoveGodownStock,
    handelChangeAddedGodownPoduct,
    setselectGodown,
    setselectFranchise,
    // setselectGodownStockProduct,
    setFormValues,
    handlSelectGodownProductList,
  } = useTransferStockGodownToFofoFr();

  return (
    <Fragment>
      <Pageheader
        heading="Transfer Stock Godown To COCO Franchise"
        homepage="Forms"
        activepage="Transfer Stock Godown To COCO Franchise"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row className="gy-4">
                    <Col xl={6}>
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

                    <Col xl={6}>
                      <Form.Group controlId="selectFranchise">
                        <Form.Label>
                          Franchise<span className="text-danger">*</span>
                        </Form.Label>
                        <Select
                          name="selectFranchise"
                          id="selectFranchise"
                          className="basic-multi-select "
                          isSearchable
                          menuPlacement="auto"
                          classNamePrefix="Select2"
                          options={
                            franchisesList?.map((option: any) => ({
                              label: option.Fname,
                              value: option.id,
                            })) || []
                          }
                          onChange={(selectedOption) => {
                            setselectFranchise((prevValues: any) => ({
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
                            <Form.Label>Qty</Form.Label>
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
                          <Form.Group controlId="stockInQty">
                            <Form.Label>
                              Total Qty <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              name="stockInQty"
                              type="number"
                              value={totalQty}
                              onChange={handleChange}
                              required
                              readOnly
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="totalgst">
                            <Form.Label>
                              GST Amount<span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              name="totalgst"
                              value={totalGstAmt}
                              readOnly
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="totalPrice">
                            <Form.Label>
                              Total Amount<span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              name="totalPrice"
                              value={Number(totalAmt).toFixed(2)}
                              readOnly
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="invoiveNo">
                            <Form.Label>
                              Invoice No<span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              name="invoiveNo"
                              value={Number(formValues.invoiveNo)}
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                        {/* <Col xl={2}>
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
                        </Col> */}

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
                {formValues?.addGodownStockArray.length > 0 && (
                  <div className="table-responsive mt-4">
                    <Table
                      id="category-table"
                      className="border text-nowrap text-md-nowrap table-hover mb-0"
                    >
                      <thead className="table-primary">
                        <tr>
                          <th>Product Name</th>
                          <th>Qty</th>
                          <th>Price</th>
                          <th>Total Price</th>
                          <td>Action</td>
                        </tr>
                      </thead>
                      <tbody>
                        {formValues.addGodownStockArray.map(
                          (item: any, idx: number) => (
                            <tr key={idx}>
                              <td>{item.productName}</td>
                              <td>{item.stockInQty}</td>
                              <td>{Number(item.productPrice).toFixed(2)}</td>
                              <td>{Number(item.totalPrice).toFixed(2)}</td>
                              <td>
                                {" "}
                                <button
                                  className="avatar rounded-circle bg-pink cursor-pointer border-0"
                                  onClick={() =>
                                    handleRemoveGodownStock(Number(idx))
                                  }
                                >
                                  <i className="bi bi-trash fs-15"></i>
                                </button>
                              </td>
                            </tr>
                          )
                        )}
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

export default TransferStockGodownToFofoFr;
