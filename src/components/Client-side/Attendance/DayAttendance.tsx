import { FC, Fragment } from "react";
import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Button, Form, Alert, Table } from "react-bootstrap";
import useAttendance from "../../Hook/Attendance/useDayAttendance";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import GoogleMapComponent from "../GoogleMapComponent/GoogleMapComponent";

const DayAttendance: FC = () => {
  const {
    handleSubmitAttendence,
    toggleAttendanceModal,
    handelfetchEndAttendenceApi,
    attendanceModal,
    distance,
    userLocation,
    franchiseLocation,
    currentTime,
    currentDate,
    allAttendance,
    totalDistance,
  } = useAttendance();
  return (
    <Fragment>
      <Pageheader
        heading="Day Attendance"
        homepage="Dashboard"
        activepage="Day Attendance"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xxl={9}>
            <Row>
              <Col xxl={5} xl={12}>
                <Row className="d-flex justify-content-userLocation ">
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
                                onClick={handelfetchEndAttendenceApi}
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
                        <div className="table-responsive">
                          <Table className="border text-nowrap text-md-nowrap table-hover mb-0">
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                              </tr>
                            </thead>
                            <tbody>
                              {allAttendance?.length > 0 ? (
                                allAttendance?.map((item, idx) => (
                                  <tr key={idx + 1}>
                                    <td>{item.date}</td>
                                    <td>
                                      <Alert variant="alert-outline-success fade show">
                                        <i className="fe fe-check-circle me-2 d-inline-flex text-success"></i>
                                        <strong>{item.st_time}</strong>
                                      </Alert>
                                    </td>
                                    <td>
                                      <Alert variant="alert-outline-danger fade show">
                                        {item.ed_time ? (
                                          <>
                                            <i className="fe fe-x-circle me-2 d-inline-flex text-danger"></i>
                                            <strong>{item.ed_time}</strong>
                                          </>
                                        ) : (
                                          "-"
                                        )}
                                      </Alert>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={3} className="text-center">
                                    No Attendance Record Found
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
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
                  <label>Date</label>
                  <Form.Control
                    type="text"
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
                    value={currentTime}
                  />
                </Col>

                <Col lg={12} sm={12} xs={12} className="mb-2">
                  <label>Your Location From Franchise in KM</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="inputGroupFile01"
                    value={`${distance} KM`}
                  />
                </Col>

                <Col lg={12} sm={12} xs={12} className="mb-2">
                  {userLocation && franchiseLocation ? (
                    <GoogleMapComponent
                      userLocation={userLocation}
                      franchiseLocation={franchiseLocation}
                    />
                  ) : (
                    <p>Fetching your location...</p>
                  )}
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              {totalDistance <= 0.2 ? (
                <Button color="primary" onClick={handleSubmitAttendence}>
                  Submit
                </Button>
              ) : (
                <span className="text-danger mt-2 d-block">
                  You Are Above 0.2 KM
                </span>
              )}

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

export default DayAttendance;
