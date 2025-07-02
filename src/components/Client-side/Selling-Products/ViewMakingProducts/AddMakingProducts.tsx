import { FC, Fragment } from "react";
import { Button, Card, Col, Form, Row, Container } from "react-bootstrap";
//import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import Select from "react-select";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import useAddMakingProductForm from "../../../Hook/Selling-Products-Hook/ViewMakingProducts/useAddMakingProducts";

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
  selectedRawProduct: string;
}


const AddMakingProductForm: FC = () => {
  const { formValues, makingProductArray , loading, rawProductArray, handleSubmit, handleChange, setFormValues, handelAddMakingProduct, handelDeleteMakingProduct } =
    useAddMakingProductForm();

    console.log(makingProductArray,"makingProductArray")
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
                        col: 3
                      },
                      {
                        name: "brandId",
                        label: "Select Brand",
                        type: "select",
                        options: formValues.getBrandList || [],
                        col: 3

                      },
                      {
                        name: "categoryId",
                        label: "Category",
                        type: "select",
                        options: formValues.getcategory || [],
                        required: "*",
                        col: 3

                      },
                      {
                        name: "subCategoryId",
                        label: "Sub Category",
                        type: "select",
                        options: formValues.getSubCategory || [],
                        col: 3

                      },
                      {
                        name: "unitId",
                        label: "Unit",
                        type: "select",
                        options: formValues.unitList || [],
                        col: 2

                      },
                      {
                        name: "purchasePrice",
                        label: "Purchase Price",
                        type: "number",
                        required: "*",
                        col: 2

                      },
                      {
                        name: "totalPrice",
                        label: "Total Price",
                        type: "number",
                        required: "*",
                        col: 2

                      },
                      {
                        name: "discount",
                        label: "Discount %",
                        type: "number",
                        required: "*",
                        col: 2

                      },
                      {
                        name: "finalPrice",
                        label: "Final Price",
                        type: "number",
                        required: "*",
                        col: 2

                      },
                      {
                        name: "cgst",
                        label: "CGST%",
                        type: "number",
                        required: "*",
                        col: 1

                      },
                      {
                        name: "sgst",
                        label: "SGST%",
                        type: "number",
                        required: "*",
                        col: 1

                      },
                      {
                        name: "igst",
                        label: "IGST%",
                        type: "number",
                        required: "*",
                        col: 1

                      },
                      {
                        name: "totalGst",
                        label: "Total GST",
                        type: "number",
                        required: "*",
                        col: 2

                      },
                      {
                        name: "priceWoGst",
                        label: "Price Wo GST",
                        type: "number",
                        required: "*",
                        col: 2

                      },
                      {
                        name: "barcodeNo", label: "Barcode No", type: "text", col: 2
                      },
                      {
                        name: "minStockQty",
                        label: "Min Stock Qty",
                        type: "number",
                        required: "*",
                        col: 2

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
                        col: 2

                      },
                      {
                        name: "productType",
                        label: "Product Type",
                        type: "select",
                        required: "*",
                        options: [
                          // { name: "MRP Product", id: 0 },
                          { name: "Making Product", id: 1 },
                          // { name: "Other Product", id: 2 },
                        ],
                        col: 3

                      },
                      {
                        name: "transferProduct",
                        label: "Transfer Product",
                        type: "select",
                        options: [
                          { name: "Yes", id: 1 },
                          { name: "No", id: 0 },
                        ],
                        col: 2

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
                        col: 2

                      },
                      {
                        name: "srNo",
                        label: "Sr No",
                        type: "number",
                        required: "*",
                        col: 2

                      },
                      {
                        name: "productImage",
                        label: "Product Image",
                        type: "file",
                        col: 2

                      },
                    ].map((field, index) => (
                      <Col

                        xl={field?.col}
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
                              field?.options
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
                  <Container className="fieldset border  mt-3 col-12">
                    <Row>
                      <Col xl={4}>
                        <Form.Label>
                          Raw Product <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Group>
                          <Select
                            id="rawProduct"
                            name="rawProduct"
                            value={
                              rawProductArray.find(
                                (option: any) =>
                                  option.SrNo.toString() ==
                                  formValues.selectedRawProduct.toString()
                              ) || null
                            }
                            options={rawProductArray}
                            getOptionLabel={(option: any) => option.ProductName}
                            getOptionValue={(option: any) => option.SrNo}
                            onChange={(selectedOption: any) => {
                              setFormValues((prevValues) => ({
                                ...prevValues,
                                selectedRawProduct: selectedOption
                                  ? selectedOption.SrNo.toString()
                                  : "",
                              }));
                            }}
                            required
                            isSearchable
                          />
                        </Form.Group>
                      </Col>


                      <Col xl={2}>
                        <Form.Group controlId="makingQty">
                          <Form.Label>Making Qty</Form.Label>
                          <Form.Control
                            name="makingQty"
                            type="number"
                            value={formValues.makingQty}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={2}>
                        <Form.Group controlId="unit">
                          <Form.Label>Unit</Form.Label>
                          <Form.Control
                            name="unit"
                            type="number"
                            value={formValues.unit}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>


                      <Col xl={1} className="mt-1">
                        <Button
                          className="btn btn-primary mt-4"
                          onClick={handelAddMakingProduct}
                        >
                          <AddIcon />
                        </Button>
                      </Col>
                    </Row>

                    {makingProductArray.map((item: any, index: number) => (
                      <Row>
                        <Col xl={4}>
                          <Form.Label>
                            Raw Product <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Group>
                            <Select
                              id="rawProduct"
                              name="rawProduct"
                              value={
                                rawProductArray.find(
                                  (option: any) =>
                                    option.SrNo.toString() ==
                                    item.makingProduct?.toString()
                                ) || null
                              }
                              options={rawProductArray}
                              getOptionLabel={(option: any) => option.ProductName}
                              getOptionValue={(option: any) => option.SrNo}
                              onChange={(selectedOption: any) => {
                                setFormValues((prevValues) => ({
                                  ...prevValues,
                                  selectedRawProduct: selectedOption
                                    ? selectedOption.SrNo.toString()
                                    : "",
                                }));
                              }}
                              required
                              isSearchable
                            />
                          </Form.Group>
                        </Col>


                        <Col xl={2}>
                          <Form.Group controlId="makingQty">
                            <Form.Label>Making Qty</Form.Label>
                            <Form.Control
                              name="makingQty"
                              type="number"
                              value={item.makingQty}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={2}>
                          <Form.Group controlId="unit">
                            <Form.Label>Unit</Form.Label>
                            <Form.Control
                              name="unit"
                              type="number"
                              value={item.unit}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>


                        <Col xl={1} className="mt-2">
                          <Button
                            variant="danger"
                            className="d-flex align-items-center mt-3"
                            onClick={() => handelDeleteMakingProduct(index)}
                          >
                            <DeleteIcon />
                          </Button>
                        </Col>
                      </Row>
                    ))}
                  </Container>
                  <Row className="mt-4">
                    <Col>
                      <Button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? (
                          <>
                            <span className="me-2">Processing...</span>
                            <span className="loading"><i className="ri-loader-2-fill fs-16"></i></span>
                          </>
                        ) : "Submit"}

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

export default AddMakingProductForm;
