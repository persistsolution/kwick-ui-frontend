import { FC, Fragment, useState, useEffect } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import ALLImages from '../../common/ImageData';

interface ComponentProps {}

const SignIn: FC<ComponentProps> = () => {
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
    const [otp, setOtp] = useState<string>("");

    useEffect(() => {
        if (isOtpSent) {
            // Simulate automatic OTP fill after a short delay
            const dummyOtp = "4628"; // Replace this with actual API integration
            const otpTimeout = setTimeout(() => {
                setOtp(dummyOtp); // Automatically fill OTP
                console.log("OTP Auto-filled:", dummyOtp); // Debug log
            }, 1000); // 2-second delay for auto-fill simulation

            return () => clearTimeout(otpTimeout); // Cleanup timeout
        }
    }, [isOtpSent]);

    const handleSendOtp = () => {
        // Validate mobile number
        if (!mobileNumber.trim() || !/^\d{10}$/.test(mobileNumber)) {
            setError("Please enter a valid 10-digit mobile number.");
            return;
        }

        // Simulate OTP sending
        setError(null);
        setIsOtpSent(true);
        console.log("OTP sent to:", mobileNumber); // Debug log
    };

    const handleVerifyOtp = () => {
        // For now, assume dummy OTP is "4628"
        if (otp !== "4628") {
            setError("Invalid OTP. Please try again.");
            return;
        }

        setError(null);
        // Redirect to Dashboard
        window.location.href = `${import.meta.env.BASE_URL}Dashboard/IndexPage/`;
    };

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
                                    <Alert variant="danger" onClose={() => setError(null)} dismissible>
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
                                                    value={otp} // Auto-filled value
                                                    onChange={(e) => setOtp(e.target.value)}
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

export default SignIn;
