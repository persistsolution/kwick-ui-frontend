import { FC, Fragment } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTimer } from 'react-timer-hook';

interface ComponentProps { }

function MyTimer({ expiryTimestamp }: any) {
    const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });
    return (

        <Row className='mt-4 gy-xxl-0 gy-3 mb-5'>
            <Col xxl={3} xl={6} lg={6} md={3} sm={3} className="col-6">
                <div className="under-maintenance-time rounded-1"><p className="mb-1 fs-12 op-7">DAYS</p><h4 className="fw-semibold mb-0">{days}</h4></div>
            </Col>
            <Col xxl={3} xl={6} lg={6} md={3} sm={3} className="col-6">
                <div className="under-maintenance-time rounded-1"><p className="mb-1 fs-12 op-7">HOURS</p><h4 className="fw-semibold mb-0">{hours}</h4></div>
            </Col>
            <Col xxl={3} xl={6} lg={6} md={3} sm={3} className="col-6">
                <div className="under-maintenance-time rounded-1"><p className="mb-1 fs-12 op-7">MINUTES</p><h4 className="fw-semibold mb-0">{minutes}</h4></div>
            </Col>
            <Col xxl={3} xl={6} lg={6} md={3} sm={3} className="col-6">
                <div className="under-maintenance-time rounded-1"><p className="mb-1 fs-12 op-7">SECONDS</p><h4 className="fw-semibold mb-0">{seconds}</h4></div>
            </Col>
        </Row>
    );
}

const Undermaintaince: FC<ComponentProps> = () => {

    const time = new Date();
    time.setSeconds(time.getSeconds() + 40000000);
    return (
        <Fragment>
            <div className="">
                <Container>
                    <Row className="text-center mx-auto">
                        <Col lg={8} sm={12} className="center-block align-items-center construction">
                            <div className="tx-fixed-white">
                                <Card.Body className="p-0">
                                    <h1 className="display-4 mb-3 fw-semibold">Under Maintenance</h1>
                                    <p className="mb-2 op-8">The page you're looking for is currently under maintenance and we will be back soon.</p>
                                    <MyTimer expiryTimestamp={time} />
                                    <div className="mt-4">
                                        <button className="btn btn-icon btn-primary rounded-pill border-0" type="button">
                                            <span className="btn-inner--icon"><i className="fa fa-facebook-f"></i></span>
                                        </button>
                                        <button className="btn btn-icon btn-primary rounded-pill border-0" type="button">
                                            <span className="btn-inner--icon"><i className="fa fa-google"></i></span>
                                        </button>
                                        <button className="btn btn-icon btn-primary rounded-pill border-0" type="button">
                                            <span className="btn-inner--icon"><i className="ri-twitter-x-fill"></i></span>
                                        </button>
                                        <button className="btn btn-icon btn-primary rounded-pill border-0" type="button">
                                            <span className="btn-inner--icon"><i className="fa fa-linkedin"></i></span>
                                        </button>
                                    </div>
                                </Card.Body>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    );
};

export default Undermaintaince;