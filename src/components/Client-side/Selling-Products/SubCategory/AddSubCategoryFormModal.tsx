import React, { Fragment } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import useAddSubCategoryForm from "../../../Hook/Selling-Products-Hook/SubCategoryTS/useAddSubCategoryForm";
import Rodal from "rodal";

interface AddSubCategoryFormModalProps {
  toggleAddSubCategory: boolean;
  modalAddSubCategory: () => void;
  handelfetchSubCategories: () => void;
}

const AddSubCategoryFormModal: React.FC<AddSubCategoryFormModalProps> = ({
  toggleAddSubCategory,
  modalAddSubCategory,
  handelfetchSubCategories,
}) => {
  const {
    categoryOptions,
    formData,
    message,
    isLoading,
    handleChange,
    handleCategoryChange,
    handleSubmit,
    handelMessage,
  } = useAddSubCategoryForm({
    // toggleAddSubCategory,
    modalAddSubCategory,
    handelfetchSubCategories,
  });
  return (
    <Fragment>
      <Rodal
        onClose={() => {
          modalAddSubCategory();
        }}
        visible={toggleAddSubCategory}
        animation="slideUp"
        height={300}
        width={600}
      >
        <div className="modal-header">Add SubCategory</div>
        <div className="main-container container-fluid">
          <Form onSubmit={handleSubmit}>
            <div className="modal-body text-start p-2">
              <div className="main-container container-fluid p-2">
                <Row className="gy-4">
                  <Col xl={6}>
                    <Form.Label>
                      {" "}
                      Category Name <span className="text-danger">*</span>{" "}
                    </Form.Label>
                    <Form.Select
                      name="category"
                      value={formData.catid}
                      onChange={handleCategoryChange}
                      onClick={handelMessage}
                      required
                    >
                      {categoryOptions?.map((item: any, idx: number) => (
                        
                      <Fragment key={idx}>
                          <option value={item.id}>{item.Name}</option>
                        </Fragment>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col xl={6}>
                    <Form.Group controlId="name">
                      <Form.Label>
                        Sub Category Name <span className="text-danger">*</span>{" "}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="subCatname"
                        placeholder="Enter Sub Category Name"
                        value={formData.subCatname}
                        onChange={handleChange}
                        onClick={handelMessage}
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
                        onClick={handelMessage}
                      />
                    </Form.Group>
                  </Col>

                  <Col xl={6}>
                    <Form.Group className="my-1">
                      <Form.Label>
                        Status<span className="text-danger">*</span>{" "}
                      </Form.Label>
                      <Form.Select
                        name="status"
                        onChange={handleChange}
                        onClick={handelMessage}
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
        </div>
      </Rodal>
    </Fragment>
  );
};

export default AddSubCategoryFormModal;
