import React, { useEffect } from "react";
import Rodal from "rodal";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import useAddBrand from "../../../Hook/Selling-Products-Hook/BrandTS/useAddBrand";

interface EditBrandFormModalProps {
  modal: boolean;
  toggle: any;
  handelfetchBrand: () => void;
}

const AddBrand: React.FC<EditBrandFormModalProps> = ({
  toggle,
  modal,
  handelfetchBrand,
}) => {
  const {
    formData,
    message,
    isLoading,
    handleChange,
    handleSubmit,
    setMessage,
  } = useAddBrand(toggle, handelfetchBrand);

  useEffect(() => {
    setMessage("");
  }, []);

  return (
    <div>
      <Rodal
        onClose={() => {
          toggle();
        }}
        visible={modal}
        animation="slideUp"
        height={320}
        width={400}
      >
        <div className="modal-header">Add Brands</div>
        <Form onSubmit={handleSubmit}>
          <div className="modal-body text-start">
            <div className="main-container container-fluid">
              <Row>
                <Col xl={12}>
                  <Card style={{ boxShadow: "none" }}>
                    <Card.Body className="p-0">
                      <Row className="gy-4">
                        <Col xl={12} sm={12} lg={12}>
                          <Form.Group controlId="BrandName">
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

                        <Col xl={12} sm={12} lg={12}>
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
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>

          <div className="modal-footer">
            <Row>
              <Col>
                <button className="btn btn-light" onClick={() => toggle()}>
                  Close
                </button>
                &nbsp; &nbsp;
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
      </Rodal>
    </div>
  );
};

export default AddBrand;
