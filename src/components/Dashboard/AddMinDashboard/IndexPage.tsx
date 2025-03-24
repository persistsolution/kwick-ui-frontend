import { FC, Fragment } from "react";
import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import { Col, Row } from "react-bootstrap";
import useIndexPage from "../../Hook/Dashboard/AddMinDashboard/useIndexPage";
import ALLImages from "../../../common/ImageData";
import { Link } from "react-router-dom";

const Indexpage: FC = () => {
  const { handleButtonClick } = useIndexPage();

  return (
    <Fragment>
      <Pageheader heading="Dashboard" homepage="Admin" activepage="Dashboard" />
      <div className="main-container container-fluid">
        <Row>
          <Col xxl={9}>
            <Row>
              <Col xxl={12} xl={12}>
                <Row>
                  <Col xxl={12}>
                    <Row>
                      <Col xxl={12} xl={12}>
                        <Row>
                          <Col
                            lg={3}
                            sm={4}
                            xs={4}
                            className="d-flex flex-column align-items-center mb-3"
                          >
                            <Link
                              to="/Attendance/DayAttendance"
                              onClick={handleButtonClick}
                            >
                              <img
                                className="avatar avatar-radius avatar-lg cover-image"
                                src={ALLImages("attendence")}
                              />
                            </Link>
                            <span className="mt-2 text-center w-100 font-size-small">
                              Day Attendance
                            </span>
                          </Col>
                          <Col
                            lg={3}
                            sm={4}
                            xs={4}
                            className="d-flex flex-column align-items-center mb-3"
                          >
                            <Link to="/Attendance/NightAttendance" onClick={handleButtonClick}>
                              <img
                                className="avatar avatar-radius avatar-lg cover-image"
                                src={ALLImages("attendence")}
                              />
                            </Link>
                            <span className="mt-2 text-center w-100 font-size-small">
                              Night Attendance
                            </span>
                          </Col>
                          <Col
                            lg={3}
                            sm={4}
                            xs={4}
                            className="d-flex flex-column align-items-center mb-3"
                          >
                            <Link to="/Attendance/MyAttendance" onClick={handleButtonClick}>
                              <img
                                className="avatar avatar-radius avatar-lg cover-image"
                                src={ALLImages("attendence")}
                              />
                            </Link>
                            <span className="mt-2 text-center w-100 font-size-small">
                              My Attendance
                            </span>
                          </Col>

                          <Col
                            lg={3}
                            sm={4}
                            xs={4}
                            className="d-flex flex-column align-items-center mb-3"
                          >
                            <Link to="/Attendance/AttendanceRequest" onClick={handleButtonClick}>
                              <img
                                className="avatar avatar-radius avatar-lg cover-image"
                                src={ALLImages("attendence")}
                              />
                            </Link>
                            <span className="mt-2 text-center w-100 font-size-small">
                               Attendance Request
                            </span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
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

export default Indexpage;
