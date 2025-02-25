import { FC, Fragment } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import useAddProductForm from "../../../Hook/Selling-Products-Hook/ProductTS/useAddProductForm";
import Select from "react-select";

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
  status: number;
  productType: string;
  transferProduct: string;
  qrDisplay: string;
  srNo: string;
  productImage: File | null;
  getcategory: string[];
  getSubCategory: string[];
  getBrandList: string[];
}

const AddProductForm: FC = () => {
  const { formValues, handleSubmit, handleChange, setFormValues } =
    useAddProductForm();
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
                        name: "brandId",
                        label: "Select Brand",
                        type: "select",
                        options: formValues.getBrandList,
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
                      },
                      {
                        name: "unitId",
                        label: "Unit",
                        type: "select",
                        options: formValues.unitList,
                      },
                      {
                        name: "purchasePrice",
                        label: "Purchase Price",
                        type: "number",
                        required: "*",
                      },
                      {
                        name: "totalPrice",
                        label: "Total Price",
                        type: "number",
                        required: "*",
                      },
                      {
                        name: "cgst",
                        label: "CGST%",
                        type: "number",
                        required: "*",
                      },
                      {
                        name: "sgst",
                        label: "SGST%",
                        type: "number",
                        required: "*",
                      },
                      {
                        name: "igst",
                        label: "IGST%",
                        type: "number",
                        required: "*",
                      },
                      {
                        name: "totalGst",
                        label: "Total GST",
                        type: "number",
                        required: "*",
                      },
                      {
                        name: "priceWoGst",
                        label: "Price Wo GST",
                        type: "number",
                        required: "*",
                      },
                      { name: "barcodeNo", label: "Barcode No", type: "text" },
                      {
                        name: "minStockQty",
                        label: "Min Stock Qty",
                        type: "number",
                        required: "*",
                      },
                      {
                        name: "status",
                        label: "Status",
                        type: "select",
                        required: "*",
                        options: [
                          { name: "Publish", id: 1 },
                          { name: "Not Publish", id: 0 },
                        ],
                      },
                      {
                        name: "productType",
                        label: "Product Type",
                        type: "select",
                        required: "*",
                        options: [
                          { name: "MRP Product", id: 0 },
                          { name: "Making Product", id: 1 },
                          { name: "Other Product", id: 2 },
                        ],
                      },
                      {
                        name: "transferProduct",
                        label: "Transfer Product",
                        type: "select",
                        options: [
                          { name: "Yes", id: 1 },
                          { name: "No", id: 0 },
                        ],
                      },
                      {
                        name: "qrDisplay",
                        label: "QR Display",
                        type: "select",
                        required: "*",
                        options: [
                          { name: "Yes", id: 1 },
                          { name: "No", id: 0 },
                        ],
                      },
                      {
                        name: "srNo",
                        label: "Sr No",
                        type: "number",
                        required: "*",
                      },
                      {
                        name: "productImage",
                        label: "Product Image",
                        type: "file",
                      },
                    ].map((field, index) => (
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
                          ].includes(field.name)
                            ? 2
                            : ["productName"].includes(field.name)
                            ? 5
                            : 3
                        }
                        lg={3}
                        md={6}
                        sm={12}
                        key={index}
                        className="mt-3"
                      >
                        <Form.Label htmlFor={field.name}>
                          {field.label}{" "}
                          <span className="text-danger">{field.required}</span>
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
                            disabled={
                              field.name === "priceWoGst" ||
                              field.name === "totalGst" ||
                              field.name === "sgst" ||
                              field.name === "cgst" ||
                              field.name === "igst"
                                ? true
                                : false
                            }
                            value={
                              field.type !== "file"
                                ? formValues[
                                    field.name as keyof ProductFormValues
                                  ]?.toString() || ""
                                : undefined
                            }
                            required={field.required ? true : false}
                          />
                        )}
                      </Col>
                    ))}
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

export default AddProductForm;
