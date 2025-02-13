import { FC, Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ALLImages from '../../common/ImageData';
import { Alert, Card, Col, Form, Row } from 'react-bootstrap';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './FirebaseApi';

interface ComponentProps { }

const Firebasereset: FC<ComponentProps> = () => {
    const [err, setError] = useState("");
    const [email, setEmail] = useState('');

    let navigate = useNavigate();
    const RouteChange = () => {
        let path = `${import.meta.env.BASE_URL}Firebase/Firebasesignin`;
        navigate(path);
    }

    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Password reset email sent. Please check your inbox.');
            RouteChange();
        } catch (error: any) {
            setError(error.message);
        }
    };
    return (
        <Fragment>
            <div className="">
                <div className="text-center">
                    <Link to={`${import.meta.env.BASE_URL}Dashboard/IndexPage/`}><img src={ALLImages('logo1')} className="header-brand-img m-0" alt="" /></Link>
                </div>
            </div>
            <div className="container-lg">
                <Row className="justify-content-center mt-4 mx-0">
                    <Col xl={4} lg={6} md={6} sm={6}>
                        <Card className="shadow-none">
                            <Card.Body className="p-sm-6">
                                <div className="text-center mb-4">
                                    <h4 className="mb-1">Forgot Password?</h4>
                                    <p>Enter your email address registered on your account</p>
                                </div>
                                {err && <Alert variant='danger'>{err}</Alert>}
                                <Row>
                                    <Col sm={12}>
                                        <div className="mb-3">
                                            <Form.Label className="mb-2 fw-500">Email<span className="text-danger ms-1">*</span></Form.Label>
                                            <Form.Control className="ms-0" type="email" placeholder="Enter your email" name="mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </Col>
                                    <Col xl={12}>
                                        <div className="d-grid mb-3">
                                            <Link to='#' className="btn btn-primary" onClick={handleResetPassword}> Submit</Link>
                                        </div>
                                        <div className="text-center">
                                            <p className="mb-0 tx-14">Remembered your password?
                                                <Link to={`${import.meta.env.BASE_URL}Firebase/Firebasesignin`} className="tx-primary ms-1 text-decoration-underline">Sign In</Link>
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
};

export default Firebasereset;