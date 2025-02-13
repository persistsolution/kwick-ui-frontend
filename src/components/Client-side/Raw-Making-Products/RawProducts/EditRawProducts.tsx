import { FC, Fragment } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
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
  const { handleSubmit, handleChange, message, formValues } =
    useEditRawProductForm();

  return (
    <Fragment>
      <Pageheader
        heading="Edit Product"
        homepage="Forms"
        activepage="Edit Product"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Header>
                <div className="card-title">Edit Product</div>
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
                        name: "purchasePrice",
                        label: "Purchase Price*",
                        type: "number",
                      },
                      {
                        name: "totalPrice",
                        label: "Total Price*",
                        type: "number",
                      },
                      { name: "cgst", label: "CGST%*", type: "number" },
                      { name: "sgst", label: "SGST%*", type: "number" },
                      { name: "igst", label: "IGST%*", type: "number" },
                      { name: "totalGst", label: "Total GST*", type: "number" },
                      {
                        name: "priceWoGst",
                        label: "Price Wo GST*",
                        type: "number",
                      },
                      { name: "barcodeNo", label: "Barcode No", type: "text" },
                      {
                        name: "minStockQty",
                        label: "Min Stock Qty*",
                        type: "number",
                      },
                      {
                        name: "status",
                        label: "Status*",
                        type: "select",
                        options: ["Active", "Inactive"],
                      },
                      {
                        name: "productType",
                        label: "Product Type*",
                        type: "select",
                      },
                      {
                        name: "transferProduct",
                        label: "Transfer Product*",
                        type: "select",
                      },
                      {
                        name: "qrDisplay",
                        label: "QR Display*",
                        type: "select",
                      },
                      { name: "srNo", label: "Sr No*", type: "number" },
                      {
                        name: "productImage",
                        label: "Product Image*",
                        type: "file",
                      },
                    ].map((field, index) => (
                      <Col xl={3} lg={3} md={6} sm={12} key={index}>
                        <Form.Label htmlFor={field.name}>
                          {field.label}
                        </Form.Label>
                        {field.type === "select" &&
                        field.name !== "status" &&
                        field.name !== "productType" &&
                        field.name !== "transferProduct" &&
                        field.name !== "qrDisplay" ? (
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
                        ) : field.type === "select" &&
                          field.name === "status" ? (
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
                            <option value="">Select </option>
                            <option value="Publish">Publish</option>
                            <option value="Not Publish">Not Publish</option>
                          </Form.Select>
                        ) : field.type === "select" &&
                          field.name === "productType" ? (
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
                            <option value="">Select </option>
                            <option value="0">MRP Product</option>
                            <option value="1">Raw/Making Product</option>
                          </Form.Select>
                        ) : field.type === "select" &&
                          field.name === "qrDisplay" ? (
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
                            <option value="">Select </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </Form.Select>
                        ) : field.type === "select" &&
                          field.name === "transferProduct" ? (
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
                            <option value="">Select </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </Form.Select>
                        ) : (
                          <Form.Control
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            disabled={
                              field.name === "priceWoGst" ||
                              field.name === "totalGst"
                                ? true
                                : false
                            }
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
                    ))}
                  </Row>
                  <Row className="mt-4">
                    <Col>
                      <Button type="submit" className="btn btn-primary">
                        Submit
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

export default EditRawProducts;
