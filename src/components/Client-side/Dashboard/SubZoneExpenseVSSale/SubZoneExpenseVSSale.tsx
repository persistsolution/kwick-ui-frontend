import { FC, Fragment } from "react";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useSubZoneExpenseVSSale from "../../../Hook/Dashboard-Hook/SubZoneExpenseVSSale/useSubZoneExpenseVSSale";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const SubZoneExpenseVSSale: FC = () => {
  const { optionsDonutJS,  options, dashboardData, totalEmployees, totalFranchises, totalProducts, totalCash, totalUPI, totalIncome, totalAvg, chartState, selectReport, setSelectReport, handleSearch } = useSubZoneExpenseVSSale();

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
                      onChange={(e) =>
                        setSelectReport(String(e.target.value))
                      }

                    >
                      <option value="yesterday">Today</option>
                      <option value="yesterday">yesterday</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="custom">Custom</option>
                    </Form.Select>
                  </div>
                  <div className="col-1 mt-4 ">
                    <Button variant="success mt-1" onClick={handleSearch}>
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
                <Card.Header>
                  <Card.Title>
                    <strong className="mb-0">{zone.ZoneName}</strong>
                  </Card.Title>
                </Card.Header>
                <Card.Body className="p-3">
                  <div className="d-flex align-items-start">
                    <div className="flex-grow-1">
                      <div className="d-flex flex-column">
                        <span>Franchise: {zone.TotalFranchise}</span>
                        <span>Employee: {zone.TotalEmployee}</span>
                        <span>Total Sales: <i className="fa fa-inr me-1"></i>{zone.TotalInvoice}</span>
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
                <div className="d-flex justify-content-between">
                  <strong className="fw-semibold">Total Cash</strong>
                  <span className="fw-bold"><i className="fa fa-inr me-1"></i>{totalCash.toFixed(2)}</span>
                </div>
                <hr className="m-2" />
                <div className="d-flex justify-content-between">
                  <strong className="fw-semibold">Total UPI</strong>
                  <span className="fw-bold"><i className="fa fa-inr me-1"></i>{totalUPI.toFixed(2)}</span>
                </div>
                <hr className="m-2" />
                <div className="d-flex justify-content-between">
                  <strong className="fw-semibold">Total Income</strong>
                  <span className="fw-bold"><i className="fa fa-inr me-1"></i>{totalIncome.toFixed(2)}</span>
                </div>
                <hr className="m-2" />
                <div className="d-flex justify-content-between">
                  <strong className="fw-semibold">Total Avg</strong>
                  <span className="fw-bold">{isNaN(totalAvg) ? "nan" : totalAvg.toFixed(2)}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>


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

export default SubZoneExpenseVSSale;
