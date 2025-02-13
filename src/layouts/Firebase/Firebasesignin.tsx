import { FC, Fragment, useState } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ALLImages from '../../common/ImageData';
import { API_BASE_URL } from "../../config";

interface ComponentProps {}

const Firebasesignin: FC<ComponentProps> = () => {
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
    const [otp, setOtp] = useState<string>("");
    const [enteredOtp, setEnteredOtp] = useState<string>("");

    const navigate = useNavigate();

    const EMPLOYEE_API_URL = `${API_BASE_URL}/api/employees`;
    const OTP_API_URL = "https://api.pinnacle.in/index.php/sms/send/MHCHAI";

    const checkEmployeeExists = async (mobileNumber: string): Promise<boolean> => {
        try {
            const response = await fetch(EMPLOYEE_API_URL);
            if (!response.ok) {
                throw new Error("Failed to fetch employee data");
            }

            const data = await response.json();
            console.log("API Response:", data); // Debug the API response structure

            if (!data || !Array.isArray(data)) {
                console.error("Invalid API response format");
                return false;
            }

            // Check if the mobile number exists in the employees array
            const isExists = data.some((employee: any) => employee.phone_number?.trim() === mobileNumber.trim());
            return isExists;
        } catch (error) {
            console.error("Error checking employee:", error);
            return false;
        }
    };

    const sendOtpApi = async (mobileNumber: string): Promise<string | null> => {
        const apikey = "4a8797-801f87-21e9d2-5fc4c2-5745fa";
        const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit OTP
        const otpMessage = `Please enter ${generatedOtp} OTP on our platform to complete the verification process. Thank you for choosing Maha Chai.`;
        const url = `${OTP_API_URL}/${mobileNumber}/${encodeURIComponent(otpMessage)}/TXT?apikey=${apikey}`;

        try {
            const response = await fetch(url);
            if (response.ok) {
                console.log("OTP sent successfully:", generatedOtp); // Debug log
                return generatedOtp; // Return the generated OTP
            } else {
                throw new Error("Failed to send OTP");
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            return null;
        }
    };

    const handleSendOtp = async () => {
        // Validate mobile number
        if (!mobileNumber.trim() || !/^\d{10}$/.test(mobileNumber)) {
            setError("Please enter a valid 10-digit mobile number.");
            return;
        }

        const isEmployeeExists = await checkEmployeeExists(mobileNumber);
        if (!isEmployeeExists) {
            setError("Mobile number not found in the employee database.");
            return;
        }

        const otpResponse = await sendOtpApi(mobileNumber);
        if (otpResponse) {
            setOtp(otpResponse); // Set the generated OTP
            setIsOtpSent(true);
            setError(null);
        } else {
            setError("Failed to send OTP. Please try again.");
        }
    };

    const handleVerifyOtp = () => {
        if (enteredOtp !== otp) {
            setError("Invalid OTP. Please try again.");
            return;
        }

        setError(null);
        // Navigate to Dashboard
        navigate(`${import.meta.env.BASE_URL}Dashboard/IndexPage`);
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

export default Firebasesignin;
