import React, { Fragment } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import useEditCategory from "../../../Hook/Selling-Products-Hook/CategoryTS/useEditCategory";
import Rodal from "rodal";

interface EditCategoryFormModalProps {
  modalEdit: boolean;
  toggleEdit: any;
  // categoriesEditId: number;
  handelfetchCategories: () => void;
}

const EditCategoryFormModal: React.FC<EditCategoryFormModalProps> = ({
  modalEdit,
  toggleEdit,
  // categoriesEditId,
  handelfetchCategories,
}) => {
  const { formData, message, isLoading, handleChange, handleSubmit } =
    useEditCategory({ toggleEdit, handelfetchCategories });

  return (
    <Rodal
      onClose={() => {
        toggleEdit();
      }}
      visible={modalEdit}
      animation="slideUp"
      height={300}
      width={600}
    >
      <div className="modal-header">Edit Category</div>
      <Fragment>
        <Form onSubmit={handleSubmit} className="p-0">
          <div className="modal-body text-start">
            <div className="main-container container-fluid">
              <Row className="gy-4 p-0">
                <Col xl={6}>
                  <Form.Group controlId="categoryName">
                    <Form.Label>
                      Category Name <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="categoryName"
                      placeholder="Enter Category Name"
                      value={formData.categoryName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group controlId="name">
                    <Form.Label>Category Image</Form.Label>
                    <Form.Control
                      type="file"
                      name="categoryImage"
                      // value={formData.photo}
                      onChange={handleChange}
                      // required
                    />
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group controlId="categorySrno">
                    <Form.Label>
                      Sr No <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="categorySrno"
                      placeholder="Enter Category Name"
                      value={formData.categorySrno}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group controlId="status">
                    <Form.Label>
                      Status <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select </option>
                      <option value={1}>Active</option>
                      <option value={0}>Not Active</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
          <div className="modal-footer">
            <Row className="">
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
      </Fragment>
    </Rodal>
  );
};

export default EditCategoryFormModal;
