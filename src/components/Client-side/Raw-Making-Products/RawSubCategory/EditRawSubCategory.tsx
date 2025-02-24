import React, { Fragment } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import useEditRawSubCategory from "../../../Hook/Raw-Making-products-Hook/RawSubCategoryTS/useEditRawSubCategory";
import Rodal from "rodal";

interface EditRawSubCategoryProps {
  handelfetchSubCategories: () => void;
  toggleEditRawSubCategory: boolean;
  modaltoggleEditRawSubCategory: () => void;
}

const EditRawSubCategory: React.FC<EditRawSubCategoryProps> = ({
  handelfetchSubCategories,
  modaltoggleEditRawSubCategory,
  toggleEditRawSubCategory,
}) => {
  const {
    formData,
    categoryOptions,
    message,
    isLoading,
    handleChange,
    handleCategoryChange,
    handleSubmit,
  } = useEditRawSubCategory({
    handelfetchSubCategories,
    modaltoggleEditRawSubCategory,
  });

  console.log(formData, "formData");

  return (
    <Rodal
      onClose={() => {
        modaltoggleEditRawSubCategory();
      }}
      visible={toggleEditRawSubCategory}
      animation="slideUp"
      height={300}
      width={600}
    >
      <div className="modal-header">Edit Raw Sub Category</div>
      <Fragment>
        <div className="main-container container-fluid">
          <Row>
            <Col xl={12}>
              <Form onSubmit={handleSubmit}>
                <div className="modal-body text-start">
                  <Row className="gy-4">
                    <Col xl={6}>
                      <Form.Label>
                        {" "}
                        Category Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        name="category"
                        value={formData.catid}
                        onChange={handleCategoryChange}
                        required
                      >
                        {categoryOptions?.map((item: any) => (
                          <>
                            <option value={0}>Select Category</option>
                            <option value={item.id}>{item.Name}</option>
                          </>
                        ))}
                      </Form.Select>
                    </Col>

                    <Col xl={6}>
                      <Form.Group controlId="name">
                        <Form.Label>
                          Sub Category Name{" "}
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="subCatname"
                          placeholder="Enter Sub Category Name"
                          value={formData.subCatname}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={6}>
                      <Form.Group className="my-1">
                        <label className="form-label mt-0">Photo Upload</label>
                        <input
                          className="form-control"
                          type="file"
                          name="photo"
                          onChange={handleChange}
                          // required
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={4}>
                      <Form.Group className="my-1">
                        <Form.Label>
                          Status <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          name="status"
                          onChange={handleChange}
                          value={formData.status}
                          required
                        >
                          <option value="">Select Status</option>
                          <option value={1}>Active</option>
                          <option value={0}>Inactive</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className="modal-footer">
                  <Row>
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
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </Fragment>
    </Rodal>
  );
};

export default EditRawSubCategory;
