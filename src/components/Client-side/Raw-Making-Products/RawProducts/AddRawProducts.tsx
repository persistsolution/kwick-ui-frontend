import { FC, Fragment } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import useRawProducts from "../../../Hook/Raw-Making-products-Hook/RawProductsTS/useRawProducts";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface ProductFormValues {
  productName: string;
  categoryId: number;
  subCategoryId: number;
  purchasePrice: string;
  totalPrice: string;
  cgst: string;
  sgst: string;
  igst: string;
  totalGst: string;
  priceWoGst: string;
  barcodeNo: string;
  minStockQty: string;
  status: string;
  productType: string;
  transferProduct: string;
  qrDisplay: string;
  srNo: string;
  productImage: File | null;
  getcategory: string[];
  getSubCategory: string[];
}

const AddRawProducts: FC = () => {
  const {
    formValues,
    handleSubmit,
    handleChange,
    handelAddProductList,
    addedProducts,
    handleDelete,
    handleChangeProductList,
  } = useRawProducts();

  return (
    <Fragment>
      <Pageheader
        heading="Add Product"
        homepage="Forms"
        activepage="Add Product"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Header>
                <div className="card-title">Add Product</div>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row className="gy-4">
                    {[
                      {
                        name: "productName",
                        label: "Product Name*",
                        type: "text",
                      },

                      {
                        name: "Qty",
                        label: "Qty*",
                        type: "number",
                      },
                      {
                        name: "unit",
                        label: "unit*",
                        type: "text",
                      },
                      {
                        name: "categoryId",
                        label: "Category*",
                        type: "select",
                        options: formValues.getcategory,
                      },
                      {
                        name: "subCategoryId",
                        label: "Sub Category",
                        type: "select",
                        options: formValues.getSubCategory,
                      },
                      {
                        name: "customerProductId",
                        label: "Customer Product",
                        type: "select",
                        options: [],
                      },

                      {
                        name: "makingQty",
                        label: "Making Qty",
                        type: "number",
                      },
                    ].map((field, index) => (
                      <Fragment>
                        <Col xl={3} lg={3} md={6} sm={12} key={index}>
                          <Form.Label htmlFor={field.name}>
                            {field.label}
                          </Form.Label>
                          {field.type === "select" ? (
                            <Form.Select
                              id={field.name}
                              name={field.name}
                              value={
                                formValues[
                                  field.name as keyof ProductFormValues
                                ]?.toString() || ""
                              }
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select {field.label}</option>
                              {field.options?.map((option: any, idx) => (
                                <option key={idx} value={option.id}>
                                  {option.name}
                                </option>
                              ))}
                            </Form.Select>
                          ) : (
                            <Form.Control
                              type={field.type}
                              id={field.name}
                              name={field.name}
                              onChange={handleChange}
                              value={
                                field.type !== "file"
                                  ? formValues[
                                      field.name as keyof ProductFormValues
                                    ]?.toString() || ""
                                  : undefined
                              }
                              required={
                                field.type === "file"
                                  ? false
                                  : field.label.includes("*")
                              }
                            />
                          )}
                        </Col>
                      </Fragment>
                    ))}
                    <Col xl={1} lg={1} md={1} sm={1}>
                      <Button
                        className="btn btn-primary mt-4"
                        onClick={handelAddProductList}
                      >
                        <AddIcon />
                      </Button>
                    </Col>

                    <Col>
                      <h5>Added Products</h5>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Customer Product ID</th>
                            <th>Making Qty</th>
                            <th className="text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {addedProducts.map((product, idx) => (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>{product.customerProductId}</td>
                              <td>
                                <Form.Control
                                  onChange={(e) =>
                                    handleChangeProductList(e.target.value, idx)
                                  }
                                  value={product.makingQty}
                                />
                              </td>
                              <td className="text-center">
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleDelete(idx)}
                                >
                                  <DeleteIcon />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col>
                      <Button type="submit" className="btn btn-primary">
                        Submit
                      </Button>
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

export default AddRawProducts;
