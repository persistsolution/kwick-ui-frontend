import { FC, Fragment } from "react";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
//import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import useIndexPage from "../../../Hook/Dashboard-Hook/AddMinDashboard/useIndexPage";
import ReactEcharts from "echarts-for-react";

const Indexpage: FC = () => {
  const { fromDate, toDate,  optionsDonutJS, totalEmployees, totalFranchises, totalProducts, dashboardData , totalCash, totalUPI, totalIncome, totalAvg, chartState, selectReport, setSelectReport, handleSearch , setFromDate, setToDate, fetchDashboardData} = useIndexPage();
  return (
    <Fragment>
      {/* <Pageheader  heading="Dashboard" homepage="Admin" activepage="Dashboard" /> */}
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
                      onChange={(e) =>
                        setSelectReport(String(e.target.value))
                      }

                    >
                      <option value="today">Today</option>
                      <option value="yesterday">yesterday</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="custom">Custom</option>
                    </Form.Select>
                  </div>
                  {selectReport === "custom" ? (
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
                  ) : (
                    // <div className="mt-2">
                    //   <span className="text-muted">From: {fromDate} To: {toDate}</span>
                    // </div>
                    null
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
            <Col xl={4} lg={4} md={4} sm={6} xxl={3} key={index} >
              <Card>
                <Card.Body>
                  <div className="d-flex align-items-start">
                    <div className="flex-grow-1">
                      <strong className="mb-0">{zone.ZoneName}</strong>
                      <div className="d-flex flex-column mt-1">
                        <span>Franchise: {zone.TotalFranchise}</span>
                        <span>Employee: {zone.TotalEmployee}</span>
                        <span>Salary: ₹{zone.MonthlySalary.toLocaleString()}</span>
                        <span>Cash: ₹{zone.Cash}</span>
                        <span>UPI: ₹{zone.UPI}</span>
                        <span>Total Sales: ₹{zone.TotalInvoice}</span>
                      </div>
                    </div>

                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}

          <Col xl={6}>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold">Total Cash</span>
                  <span className="fw-bold">₹{totalCash.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold">Total UPI</span>
                  <span className="fw-bold">₹{totalUPI.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold">Total Income</span>
                  <span className="fw-bold">₹{totalIncome.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fw-semibold">Total Avg</span>
                  <span className="fw-bold">{isNaN(totalAvg) ? "nan" : totalAvg.toFixed(2)}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>


          <Col xl={12}>
            <Card className="custom-card">
              <Card.Header>
                <Card.Title>Zone-wise Income Distribution</Card.Title>
              </Card.Header>
              <Card.Body>
                <div id="echart-doughnut" className="echart-charts">
                  <ReactEcharts
                    option={optionsDonutJS}
                  />
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
