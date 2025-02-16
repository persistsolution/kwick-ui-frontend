import React, { Fragment } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import useRawEditCategory from "../../../Hook/Raw-Making-products-Hook/RawCategoryTS/useRawEditCategory";
import Rodal from "rodal";

interface EditRawCategoryFromProps {
  handelToggleEditRawCategory: () => void;
  toggleEditRawCategory: boolean;
}

const EditRawCategoryFrom: React.FC<EditRawCategoryFromProps> = ({
  handelToggleEditRawCategory,
  toggleEditRawCategory,
}) => {
  const { formData, message, isLoading, handleChange, handleSubmit } =
    useRawEditCategory();

  return (
    <Rodal
      onClose={() => {
        handelToggleEditRawCategory();
      }}
      visible={toggleEditRawCategory}
      animation="slideUp"
      height={300}
      width={600}
    >
      <div className="modal-header">Edit Raw Category</div>
      <Fragment>
        <div className="modal-body text-start">
          <div className="main-container container-fluid">
            <Row>
              <Col xl={12}>
                <Form onSubmit={handleSubmit}>
                  <Row className="gy-4">
                    <Col xl={6}>
                      <Form.Group controlId="name">
                        <Form.Label>Category Name *</Form.Label>
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
                        <Form.Label>Category Image *</Form.Label>
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
                      <Form.Group controlId="name">
                        <Form.Label>Sr No *</Form.Label>
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
                      <Form.Group controlId="name">
                        <Form.Label>Status *</Form.Label>
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
        </div>
      </Fragment>
    </Rodal>
  );
};

export default EditRawCategoryFrom;
