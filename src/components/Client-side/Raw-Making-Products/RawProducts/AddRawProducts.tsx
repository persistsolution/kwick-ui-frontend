import { FC, Fragment } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
//import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import useAddRawAdProducts from "../../../Hook/Raw-Making-products-Hook/RawProductsTS/useAddRawProducts";
import Select from "react-select";

interface ProductFormValues {
  productName: string;
  categoryId: number;
  subCategoryId: number;
  PurchasePrice: string;
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
  minQty:string;
}

const AddRawProducts: FC = () => {
  const {
    formValues,
    loading,
    handleSubmit,
    handleChange,
    setFormValues,
    setAddedProducts,
  } = useAddRawAdProducts();

  return (
    <Fragment>
      {/* <Pageheader 
        heading="Add Product"
        homepage="Forms"
        activepage="Add Product"
      /> */}

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Header>
                <div className="card-title">Add Raw Product</div>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row className="gy-4">
                    {[
                      {
                        name: "productName",
                        label: "Product Name",
                        type: "text",
                        required: "*",
                      },
                      {
                        name: "PurchasePrice",
                        label: "Purchase Price",
                        type: "number",
                      },
                      {
                        name: "minQty",
                        label: "Min Qty",
                        type: "number",
                      },
                      {
                        name: "unit",
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
                              "totalPrice",
                              "priceWoGst",
                              "srNo",
                              "minStockQty",
                              "qrDisplay",
                              "status",
                              "transferProduct",
                              "unit",
                              "makingQty",
                              "PurchasePrice",
                              "minQty",
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
                                      option.value ===
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
                  </Row>
                </Form>
                <Row className="mt-4">
                  <Col>
                    <Button
                      onClick={() => handleSubmit()}
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                    <>
                      <span className="me-2">Processing...</span>
                      <span className="loading"><i className="ri-loader-2-fill fs-16"></i></span>
                    </>
                  ) : "Submit"}
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default AddRawProducts;
