import React, { Fragment } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import useRawCategoryForm from "../../../Hook/Raw-Making-products-Hook/RawCategoryTS/useRawCategoryForm";
import Rodal from "rodal";
import Select from "react-select";

interface AddRawCategoryFromProps {
  modalAddRawCategory: () => void;
  toggleAddRawCategory: boolean;
  handelfetchCategories: () => void;
}

const AddRawCategoryForm: React.FC<AddRawCategoryFromProps> = ({
  modalAddRawCategory,
  toggleAddRawCategory,
  handelfetchCategories,
}) => {
  const {
    formData,
    message,
    isLoading,
    statusOptions,
    handleChange,
    handleSubmit,
    handleMessage,
    setFormData,
  } = useRawCategoryForm({ handelfetchCategories, modalAddRawCategory });
  return (
    <Rodal
      onClose={() => {
        modalAddRawCategory();
      }}
      visible={toggleAddRawCategory}
      animation="slideUp"
      height={300}
      width={600}
    >
      <div className="modal-header">Add Raw Category</div>
      <Fragment>
        <div className="main-container container-fluid">
          <Row>
            <Col xl={12}>
              <Form onSubmit={handleSubmit}>
                <div className="modal-body text-start">
                  <Row className="gy-4">
                    <Col xl={6}>
                      <Form.Group controlId="name">
                        <Form.Label>
                          Category Name<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="categoryName"
                          placeholder="Enter Category Name"
                          value={formData.categoryName}
                          onChange={handleChange}
                          onClick={handleMessage}
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
                          onClick={handleMessage}
                          accept="image/*"
                          // required
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={6}>
                      <Form.Group controlId="name">
                        <Form.Label>
                          Sr No<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="categorySrno"
                          placeholder="Enter Category Name"
                          value={formData.categorySrno}
                          onChange={handleChange}
                          onClick={handleMessage}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col xl={6}>
                      <Form.Group controlId="name">
                        <Form.Label>
                          Status <span className="text-danger">*</span>
                        </Form.Label>
                        <Select
                          name="status"
                          value={statusOptions.find(
                            (option) => option.value === formData.status
                          )}
                          onChange={(selectedOption) =>
                            setFormData((prevData: any) => ({
                              ...prevData,
                              status: selectedOption
                                ? selectedOption.value
                                : "",
                            }))
                          }
                          options={statusOptions}
                          isClearable
                        />
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

export default AddRawCategoryForm;
