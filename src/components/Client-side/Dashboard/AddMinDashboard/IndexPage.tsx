import { FC, Fragment } from "react";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useIndexPage from "../../../Hook/Dashboard-Hook/AddMinDashboard/useIndexPage";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Indexpage: FC = () => {
  const {
    fromDate,
    toDate,
    optionsDonutJS,
    options,
    totalEmployees,
    totalFranchises,
    totalProducts,
    dashboardData,
    totalCash,
    totalUPI,
    totalIncome,
    totalAvg,
    chartState,
    selectReport,
    setSelectReport,
    handleSearch,
    setFromDate,
    setToDate,
    fetchDashboardData,
  } = useIndexPage();

  return (
    <Fragment>
      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Body>
                <div className="row align-items-center g-2 mb-3">
                  <div className="col-md-2 gap-2">
                    <Form.Label>Select Report</Form.Label>
                    <Form.Select
                      value={selectReport}
                      onChange={(e) => setSelectReport(String(e.target.value))}
                    >
                      <option value="today">Today</option>
                      <option value="yesterday">Yesterday</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="custom">Custom</option>
                    </Form.Select>
                  </div>

                  {selectReport === "custom" && (
                    <>
                      <div className="col-md-2">
                        <Form.Group>
                          <Form.Label>From Date</Form.Label>
                          <Form.Control
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-md-2">
                        <Form.Group>
                          <Form.Label>To Date</Form.Label>
                          <Form.Control
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                          />
                        </Form.Group>
                      </div>
                    </>
                  )}

                  <div className="col-1 mt-4 ">
                    <Button variant="success mt-1" onClick={fetchDashboardData}>
                      Search
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {dashboardData.map((zone, index) => (
            <Col xl={4} lg={4} md={4} sm={6} xxl={3} key={index}>
              <Card>
                <Card.Header>
                  <Card.Title>
                    <strong className="mb-0">{zone.ZoneName}</strong>
                  </Card.Title>
                </Card.Header>
                <Card.Body className="p-3">
                  <div className="d-flex flex-column">
                    <span>Franchise: {zone.TotalFranchise}</span>
                    <span>Employee: {zone.TotalEmployee}</span>
                    <span>Salary:   <i className="fa fa-inr me-1"></i>{zone.MonthlySalary.toLocaleString()}</span>
                    <span>Cash:   <i className="fa fa-inr me-1"></i>{zone.Cash}</span>
                    <span>UPI:   <i className="fa fa-inr me-1"></i>{zone.UPI}</span>
                    <span>Total Sales:   <i className="fa fa-inr me-1"></i>{zone.TotalInvoice}</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {dashboardData.length !== 0 && (
            <Col xl={6}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <span className="fw-semibold">Total Cash</span>
                    <span className="fw-bold">  <i className="fa fa-inr me-1"></i>{totalCash.toFixed(2)}</span>
                  </div>
                  <hr className="m-2" />
                  <div className="d-flex justify-content-between">
                    <span className="fw-semibold">Total UPI</span>
                    <span className="fw-bold">  <i className="fa fa-inr me-1"></i>{totalUPI.toFixed(2)}</span>
                  </div>
                  <hr className="m-2" />
                  <div className="d-flex justify-content-between">
                    <span className="fw-semibold">Total Income</span>
                    <span className="fw-bold">  <i className="fa fa-inr me-1"></i>{totalIncome.toFixed(2)}</span>
                  </div>
                  <hr className="m-2" />
                  <div className="d-flex justify-content-between">
                    <span className="fw-semibold">Total Avg</span>
                    <span className="fw-bold">
                      {isNaN(totalAvg) ? "N/A" : totalAvg.toFixed(2)}
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )}



          <Col xl={12}>
            <Card className="custom-card text-center">
              <Card.Header>
                <Card.Title>Zone-wise Income Distribution</Card.Title>
              </Card.Header>
              <Card.Body>
                <div
                  id="echart-doughnut"
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "300px" }}
                >
                  <Doughnut data={optionsDonutJS} options={options} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Indexpage;
