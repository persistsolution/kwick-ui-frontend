import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Rodal from "rodal";
import useAddDiscountPercentageForm from "../../Hook/DiscountPercentage/useAddDiscountPercentageForm";

interface AddDiscountPercentageModalProps {
  modalAddDiscountPercentage: () => void;
  toggleAddDiscountPercentage: boolean;
  handelfetchDiscount: () => void;
}

const AddDiscountPercentageModal: React.FC<AddDiscountPercentageModalProps> = ({
  modalAddDiscountPercentage,
  toggleAddDiscountPercentage,
  handelfetchDiscount,
}) => {
  const {
    formData,
    message,
    isLoading,
    handleChange,
    handleSubmit,
    handelMessage,
  } = useAddDiscountPercentageForm({
    modalAddDiscountPercentage,
    handelfetchDiscount,
  });

  return (
    <Rodal
      onClose={() => {
        modalAddDiscountPercentage();
      }}
      visible={toggleAddDiscountPercentage}
      animation="slideUp"
      height={220}
      width={500}
    >
      <div className="modal-header">Add Discount</div>

      <div className="main-container ">
        <Form onSubmit={handleSubmit}>
          <div className="modal-body text-start">
            <div className="main-container ">
              <Row className="gy-4">
                <Col xl={12}>
                  <Form.Group controlId="DiscountPercentage">
                    <Form.Label>
                      Discount Percentage <span className="text-danger">*</span>{" "}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="DiscountPercentage"
                      placeholder="Enter DiscountPercentage"
                      value={formData.DiscountPercentage}
                      onChange={(e : any)=>handleChange(e)}
                      onClick={handelMessage}
                      required
                    />
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

export default AddDiscountPercentageModal;
