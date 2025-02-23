import { FC, Fragment } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "react-select";
import useEditRawProductForm from "../../../Hook/Raw-Making-products-Hook/RawProductsTS/useEditRawProductForm";

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

const EditRawProducts: FC = () => {
  const {
    formValues,
    handleSubmit,
    handleChange,
    handelAddProductList,
    addedProducts,
    handleDelete,
    handleChangeProductList,
    setFormValues,
    setAddedProducts,
  } = useEditRawProductForm();

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
                        label: "Product Name",
                        type: "text",
                        required: "*",
                      },

                      {
                        name: "unitId",
                        label: "Unit",
                        type: "select",
                        options: formValues.unitList,
                      },
                      {
                        name: "categoryId",
                        label: "Category",
                        type: "select",
                        options: formValues.getcategory,
                        required: "*",
                      },
                      {
                        name: "subCategoryId",
                        label: "Sub Category",
                        type: "select",
                        options: formValues.getSubCategory,
                        required: "*",
                      },
                      {
                        name: "customerProductId",
                        label: "Customer Product",
                        type: "select",
                        options: formValues.productList,
                      },

                      {
                        name: "makingQty",
                        label: "Making Qty",
                        type: "number",
                      },
                      {
                        name: "status",
                        label: "Status",
                        type: "select",
                        required: "*",
                        options: [
                          { name: "Active", id: 1 },
                          { name: "InActive", id: 0 },
                        ],
                      },
                    ].map((field, index) => (
                      <Fragment>
                        <Col
                          xl={
                            [
                              "cgst",
                              "sgst",
                              "igst",
                              "totalGst",
                              "purchasePrice",
                              "totalPrice",
                              "priceWoGst",
                              "srNo",
                              "minStockQty",
                              "qrDisplay",
                              "status",
                              "transferProduct",
                              "unitId",
                              "makingQty",
                            ].includes(field.name)
                              ? 2
                              : ["productName"].includes(field.name)
                              ? 5
                              : 3
                          }
                          key={index}
                        >
                          <Form.Label htmlFor={field.name}>
                            {field.label}{" "}
                            <span className="text-danger">
                              {field.required}
                            </span>
                          </Form.Label>
                          {field.type === "select" ? (
                            <Select
                              id={field.name}
                              name={field.name}
                              value={
                                field.options
                                  ?.map((option: any) => ({
                                    label: option.name,
                                    value: option.id,
                                  }))
                                  .find(
                                    (option) =>
                                      option.value ==
                                      formValues[
                                        field.name as keyof ProductFormValues
                                      ]
                                  ) || null
                              }
                              options={
                                field.options?.map((option: any) => ({
                                  label: option.name,
                                  value: option.id,
                                })) || []
                              }
                              onChange={(selectedOption) => {
                                setFormValues((prevValues) => ({
                                  ...prevValues,
                                  [field.name]: selectedOption
                                    ? selectedOption.value
                                    : "",
                                }));
                              }}
                              // placeholder={`Select ${field.label}`}
                              required={field.required ? true : false}
                              isSearchable
                            />
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

                    <Col xl={12} lg={12} md={12} sm={12}>
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
                            <tr key={idx + 1}>
                              <td>{idx + 1}</td>
                              {/* <td>{product.customerProductId}</td> */}
                              <Select
                                id={"product"}
                                name={"product"}
                                value={
                                  formValues.productList
                                    ?.map((option: any) => ({
                                      label: option.name,
                                      value: option.id,
                                    }))
                                    .find(
                                      (option: any) =>
                                        option.value ===
                                        product.customerProductId
                                    ) || null
                                }
                                options={
                                  formValues.productList?.map(
                                    (option: any) => ({
                                      label: option.name,
                                      value: option.id,
                                    })
                                  ) || []
                                }
                                onChange={(selectedOption: any) => {
                                  setAddedProducts((prevProducts) =>
                                    prevProducts.map((p, index) =>
                                      index === idx
                                        ? {
                                            ...p,
                                            customerProductId:
                                              selectedOption?.value || "",
                                          }
                                        : p
                                    )
                                  );
                                }}
                                isSearchable
                              />

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

export default EditRawProducts;
