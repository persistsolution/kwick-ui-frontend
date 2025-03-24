import { FC, Fragment } from "react";
import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Button, Form } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import useNightAttendance from "../../Hook/Attendance/useNightAttendance";

const NightAttendance: FC = () => {
  const {
    // handleButtonClick,
    toggleAttendanceModal,
    attendanceModal,
    // currentTime,
    currentDate,
    displayTime,
  } = useNightAttendance();

  return (
    <Fragment>
      <Pageheader
        heading="Night Attendance"
        homepage="Dashboard"
        activepage="Night Attendance"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xxl={9}>
            <Row>
              <Col xxl={5} xl={12}>
                <Row className="d-flex justify-content-center ">
                  <Col xl={12} className="col-md-12">
                    <Card>
                      <Card.Header className="justify-content-between">
                        <Card.Title as="h3">Today Attendance</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <div className="text-wrap">
                          {/* <div className="card-content"> */}
                          <div className="switch-content">
                            <div className="btn-list">
                              <Button
                                variant="primary-gradient"
                                className="rounded-pill"
                                onClick={toggleAttendanceModal}
                              >
                                Start Attendance
                              </Button>

                              <Button
                                variant="primary-gradient"
                                className="rounded-pill"
                              >
                                End Attendance
                              </Button>
                            </div>
                          </div>
                          {/* </div> */}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col xl={12} className="col-md-12">
                    <Card>
                      <Card.Header className="justify-content-between">
                        <Card.Title as="h3">Today Attendance</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <div className="text-wrap">
                          <div className="card-content"></div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Modal Today Start Attendance */}
        <div>
          <Modal isOpen={attendanceModal} toggle={toggleAttendanceModal}>
            <ModalHeader toggle={toggleAttendanceModal}>
              Today Start Attendance
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col lg={12} sm={12} xs={12} className="mb-2">
                  <label> Upload Selfi</label>
                  <Form.Control
                    type="file"
                    className="form-control"
                    id="inputGroupFile01"
                  />
                </Col>
                <Col lg={6} sm={6} xs={6} className="mb-2">
                  <label> Date</label>
                  <Form.Control
                    type="date"
                    className="form-control"
                    id="inputGroupFile01"
                    value={currentDate}
                  />
                </Col>

                <Col lg={6} sm={6} xs={6} className="mb-2">
                  <label>Time</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="inputGroupFile01"
                    value={displayTime}
                  />
                </Col>

                <Col lg={6} sm={6} xs={6} className="mb-2">
                  <label>Latitude</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="inputGroupFile01"
                  />
                </Col>

                <Col lg={6} sm={6} xs={6} className="mb-2">
                  <label>Longitude</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="inputGroupFile01"
                  />
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggleAttendanceModal}>
                Submit{" "}
              </Button>{" "}
              <Button color="secondary" onClick={toggleAttendanceModal}>
                Colse{" "}
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </Fragment>
  );
};

export default NightAttendance;
