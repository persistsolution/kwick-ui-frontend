import { FC, Fragment } from "react";
import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Button } from "react-bootstrap";
import useAttendanceRequest from "../../Hook/Attendance/useAttendanceRequest";

const AttendanceRequest: FC = () => {
  const {} = useAttendanceRequest();

  return (
    <Fragment>
      <Pageheader
        heading=" Attendance Request"
        homepage="Dashboard"
        activepage=" Attendance Request"
      />
      <div className="main-container container-fluid">
        <Row>
          <Col xxl={9}>
            <Row>
              <Col xxl={5} xl={12}>
                <Row className="d-flex justify-content-center ">
                  <Col xl={12} className="col-md-12">
                    <Card>
                      <Card.Header className="d-flex justify-content-between align-items-center">
                        {/* <Card.Title as="h3">Attendance Request</Card.Title> */}
                        <Button
                          variant="primary-gradient"
                          className="rounded-pill ms-auto"
                        >
                          New Req.
                        </Button>
                      </Card.Header>

                      <Card.Body>
                        <div className="text-wrap"></div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default AttendanceRequest;
