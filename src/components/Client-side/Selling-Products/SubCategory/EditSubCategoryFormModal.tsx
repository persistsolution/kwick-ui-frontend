import React, { Fragment } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import useEditSubCategoryForm from "../../../Hook/Selling-Products-Hook/SubCategoryTS/useEditSubCategory";
import Rodal from "rodal";

interface EditSubCategoryFormModalProps {
  modalEditSubcategory: boolean;
  toggleEditSubcategory: any;
  subcategoriesEditId: number;
  handelfetchSubCategories: () => void;
}

const EditSubCategoryFormModal: React.FC<EditSubCategoryFormModalProps> = ({
  modalEditSubcategory,
  toggleEditSubcategory,
  subcategoriesEditId,
  handelfetchSubCategories,
}) => {
  const {
    formData,
    categoryOptions,
    message,
    isLoading,
    handleChange,
    handleCategoryChange,
    handleSubmit,
  } = useEditSubCategoryForm({ handelfetchSubCategories });

  const isFormValid = formData.catid && formData.subCatname;
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form is valid. Submitting...");
      handleSubmit(e);
      toggleEditSubcategory(subcategoriesEditId);
      handelfetchSubCategories();
    }
  };

  return (
    <Rodal
      onClose={() => {
        toggleEditSubcategory();
      }}
      visible={modalEditSubcategory}
      animation="slideUp"
      height={300}
      width={600}
    >
      <div className="modal-header">Edit Sub Category</div>

      <Fragment>
        <div className="main-container container-fluid">
          <Form onSubmit={handleFormSubmit}>
            <div className="modal-body text-start">
              <div className="main-container container-fluid">
                <Row className="gy-4">
                  <Col xl={6}>
                    <Form.Label>
                      Category Name <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Select
                      name="category"
                      value={formData.catid}
                      onChange={handleCategoryChange}
                      required
                    >
                      {categoryOptions?.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.Name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col xl={6}>
                    <Form.Group controlId="name">
                      <Form.Label>
                        Sub Category Name{" "}
                        <span className="text-danger"> *</span>
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
                      />
                    </Form.Group>
                  </Col>

                  <Col xl={6}>
                    <Form.Group className="my-1">
                      <label className="form-label mt-0">
                        Status <span className="text-danger"> *</span>
                      </label>
                      <Form.Select
                        name="status"
                        onChange={handleChange}
                        value={formData.status}
                      >
                        <option value="">Select Status</option>
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="modal-footer">
              <Row className="">
                <Col className="text-end">
                  <Button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </Button>
                  {message && (
                    <p
                      className={` ${
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
        </div>
      </Fragment>
    </Rodal>
  );
};

export default EditSubCategoryFormModal;
