import React, { useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import useEditBrand from "../../../Hook/Selling-Products-Hook/BrandTS/useEditBrandForm";
import Rodal from "rodal";

interface EditBrandFormModalProps {
  modalEdit: boolean;
  toggleEdit: any;
  BrandEditId: number;
  handelfetchBrand: () => void;
}

const EditBrandFormModal: React.FC<EditBrandFormModalProps> = ({
  modalEdit,
  toggleEdit,
  BrandEditId,
  handelfetchBrand,
}) => {
  const {
    formData,
    message,
    isLoading,
    handleChange,
    handleSubmit,
    setMessage,
  } = useEditBrand({ BrandEditId, handelfetchBrand, toggleEdit });

  useEffect(() => {
    setMessage("");
  }, []);

  return (
    <div>
      <Rodal
        onClose={() => {
          toggleEdit();
        }}
        visible={modalEdit}
        animation="slideUp"
        height={320}
        width={400}
      >
        <div className="modal-header">Edit Brands</div>
        <Form>
          <div className="modal-body text-start">
            <div className="main-container container-fluid">
              <Row>
                <Col xl={12}>
                  <Card style={{ boxShadow: "none" }}>
                    <Card.Body className="p-0">
                      <Row className="gy-4">
                        <Col xl={12} sm={12} lg={12}>
                          <Form.Group controlId="name">
                            <Form.Label>
                              Brand Name <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="BrandName"
                              placeholder="Enter Brand Name"
                              value={formData.BrandName}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={12} sm={12} lg={12} mt={3}>
                          <Form.Group controlId="name">
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
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
          <div className="modal-footer">
            <Row>
              <Col>
                <button
                  className="btn btn-light"
                  onClick={() => toggleEdit(BrandEditId)}
                >
                  Close
                </button>
                &nbsp; &nbsp;
                <Button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                  onClick={(e) => handleSubmit(e)}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
                <Col>
                  {message && (
                    <span
                      className={` ${
                        message.includes("successfully")
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {message}
                    </span>
                  )}
                </Col>
              </Col>
            </Row>
          </div>
        </Form>
      </Rodal>
    </div>
  );
};

export default EditBrandFormModal;
