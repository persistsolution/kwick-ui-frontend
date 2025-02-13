import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import useAddCategoryForm from "../../../Hook/Selling-Products-Hook/CategoryTS/useAddCategoryForm";
import Rodal from "rodal";

interface AddCategoryFormModalProps {
  modalAddCategory: () => void;
  toggleAddCategory: boolean;
  handelfetchCategories: () => void;
}

const AddCategoryFormModal: React.FC<AddCategoryFormModalProps> = ({
  modalAddCategory,
  toggleAddCategory,
  handelfetchCategories,
}) => {
  const {
    formData,
    message,
    isLoading,
    handleChange,
    handleSubmit,
    handelMessage,
  } = useAddCategoryForm({
    modalAddCategory,
    handelfetchCategories,
  });

  return (
    <Rodal
      onClose={() => {
        modalAddCategory();
      }}
      visible={toggleAddCategory}
      animation="slideUp"
      height={300}
      width={600}
    >
      <div className="modal-header">Add Category</div>

      <div className="main-container container-fluid">
        <Form onSubmit={handleSubmit}>
          <div className="modal-body text-start">
            <div className="main-container container-fluid">
              <Row className="gy-4">
                <Col xl={6}>
                  <Form.Group controlId="name">
                    <Form.Label>
                      Category Name <span className="text-danger">*</span>{" "}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="categoryName"
                      placeholder="Enter Category Name"
                      value={formData.categoryName}
                      onChange={handleChange}
                      onClick={handelMessage}
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
                      placeholder="Enter Category Name"
                      // value={formData.categoryImage}
                      onChange={handleChange}
                      onClick={handelMessage}
                      accept="image/*"
                      // required
                    />
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group controlId="name">
                    <Form.Label>
                      Sr No <span className="text-danger">*</span>{" "}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="categorySrno"
                      placeholder="Enter Category Name"
                      value={formData.categorySrno}
                      onChange={handleChange}
                      onClick={handelMessage}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group controlId="name">
                    <Form.Label>
                      Status <span className="text-danger">*</span>{" "}
                    </Form.Label>
                    <Form.Select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      onClick={handelMessage}
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
                    className={`${
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
  );
};

export default AddCategoryFormModal;
