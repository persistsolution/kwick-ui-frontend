import { FC, Fragment } from "react";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import useSubZoneDashboard from "../../../Hook/Dashboard-Hook/SubZoneDashboard/useSubZoneDashboard";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const SubZoneDashboard: FC = () => {
  const {
    optionsDonutJS,
    options,
    dashboardData,
    totalCash,
    totalUPI,
    totalIncome,
    totalAvg,
  } = useSubZoneDashboard();

  return (
    <Fragment>
      <div className="main-container container-fluid">
        <Row>
          {dashboardData.map((zone : any, index : number) => (
            <Col xl={4} lg={4} md={4} sm={6} xxl={3} key={index} className="pointer" >
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

export default SubZoneDashboard;
