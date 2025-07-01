import { FC, Fragment } from "react";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
//import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
// import Graph from "../../Graph/Graph";
import { DoughnutEChart } from "../../../../common/ChartData";
import ReactEcharts from "echarts-for-react";
import useSubZoneExpenseVSSale from "../../../Hook/Dashboard-Hook/SubZoneExpenseVSSale/useSubZoneExpenseVSSale";

const SubZoneExpenseVSSale: FC = () => {
  const { optionsDonutJS, totalEmployees, totalFranchises, totalProducts, totalCash, totalUPI, totalIncome, totalAvg, chartState, selectReport, zoneData, setSelectReport, handleSearch } = useSubZoneExpenseVSSale();

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

          {zoneData.map((zone, index) => (
            <Col xl={4} lg={4} md={4} sm={6} xxl={3} key={index} >
              <Card>
                <Card.Body>
                  <div className="d-flex align-items-start">
                    <div className="flex-grow-1">
                      <p className="mb-0">{zone.zone}</p>
                      <div className="d-flex flex-column mt-1">
                        <small>Franchise: {zone.franchises}</small>
                        <small>Employee: {zone.employees}</small>
                        <small>Total Sales: ₹{zone.qsrSales + zone.packFoodSales + zone.crossSales}</small>
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
                    style={{ height: "300px", width: "100%" }}
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

export default SubZoneExpenseVSSale;
