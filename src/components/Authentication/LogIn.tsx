import { FC, Fragment } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import ALLImages from "../../common/ImageData";
import useLogin from "../Hook/Authentication-Hook/useLogin";

const Login: FC = () => {
  const {
    mobileNumber,
    setMobileNumber,
    error,
    setError,
    isOtpSent,
    // setIsOtpSent,
    // otp,
    // setOtp,
    enteredOtp,
    setEnteredOtp,
    handleVerifyOtp,
    handleSendOtp,
    handleKeyDown,
  } = useLogin();
  return (
    <Fragment>
      <div className="container-lg">
        <Row className="justify-content-center mt-4 mx-0">
          <Col xl={4} lg={6}>
            <Card className="shadow-none">
              <Card.Body className="p-sm-6">
                <div className="text-center mb-4">
                  <img
                    src={ALLImages("logo1")}
                    className="header-brand-img mb-4"
                    alt=""
                  />
                  <h4 className="mb-1">
                    {isOtpSent ? "Verify OTP" : "Sign In"}
                  </h4>
                  <p>
                    {isOtpSent
                      ? "Enter the OTP sent to your mobile number."
                      : "Sign in with your mobile number to continue."}
                  </p>
                </div>
                {error && (
                  <Alert
                    variant="danger"
                    onClose={() => setError(null)}
                    dismissible
                  >
                    {error}
                  </Alert>
                )}
                <Row>
                  {!isOtpSent ? (
                    <Col sm={12}>
                      <div className="mb-3">
                        <Form.Label className="mb-2 fw-500">
                          Mobile Number
                          <span className="text-danger ms-1">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your Mobile Number"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                      <div className="d-grid mb-3">
                        <Button onClick={handleSendOtp}>Send OTP</Button>
                      </div>
                    </Col>
                  ) : (
                    <Col sm={12}>
                      <div className="mb-3">
                        <Form.Label className="mb-2 fw-500">
                          OTP
                          <span className="text-danger ms-1">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter OTP"
                          value={enteredOtp}
                          onChange={(e) => setEnteredOtp(e.target.value)}
                        />
                      </div>
                      <div className="d-grid mb-3">
                        <Button onClick={handleVerifyOtp}>Verify OTP</Button>
                      </div>
                    </Col>
                  )}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Login;
