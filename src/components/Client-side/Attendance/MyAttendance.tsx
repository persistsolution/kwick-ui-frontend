import { FC, Fragment } from "react";
import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Alert } from "react-bootstrap";
import useMyAttendance from "../../Hook/Attendance/useMyAttendance";

const MyAttendance: FC = () => {
  const { allAttendance } = useMyAttendance();

  return (
    <Fragment>
      <Pageheader
        heading="My Attendance"
        homepage="Dashboard"
        activepage="My Attendance"
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
                        </div>
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

export default MyAttendance;
