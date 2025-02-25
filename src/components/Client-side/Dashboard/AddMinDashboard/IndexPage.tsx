import { FC, Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import Graph from "../../Graph/Graph";
import useIndexPage from "../../../Hook/Dashboard-Hook/AddMinDashboard/useIndexPage";

const Indexpage: FC = () => {
  const { totalEmployees, totalFranchises, totalProducts, chartState } =
    useIndexPage();

  return (
    <Fragment>
      <Pageheader heading="Dashboard" homepage="Admin" activepage="Dashboard" />

      <div className="main-container container-fluid">
        <Row>
          <Col xxl={9}>
            <Row>
              <Col xxl={6} xl={12}>
                <Row>
                  {/* Total Employees */}
                  <Col xl={3} lg={6} md={6} sm={6} xxl={6}>
                    <Card>
                      <Card.Body>
                        <div className="d-flex align-items-start">
                          <div className="flex-grow-1">
                            <p className="mb-0">Total Employee</p>
                            <div className="d-flex flex-wrap align-items-center">
                              <span className="fs-5">
                                {!totalEmployees
                                  ? "Loading..."
                                  : totalEmployees.length}
                              </span>
                            </div>
                          </div>
                          <div className="min-w-fit-content ms-3">
                            <span className="avatar avatar-md br-5 bg-primary-transparent text-primary">
                              <i className="fe fe-user fs-18"></i>
                            </span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* Total Franchises */}
                  <Col xl={3} lg={6} md={6} sm={6} xxl={6}>
                    <Card>
                      <Card.Body>
                        <div className="d-flex align-items-start">
                          <div className="flex-grow-1">
                            <p className="mb-0">Total Franchises</p>
                            <div className="d-flex flex-wrap align-items-center">
                              <span className="fs-5">
                                {!totalFranchises
                                  ? "Loading..."
                                  : totalFranchises.length}
                              </span>
                            </div>
                          </div>
                          <div className="min-w-fit-content ms-3">
                            <span className="avatar avatar-md br-5 bg-secondary-transparent text-secondary">
                              <i className="fe fe-home fs-18"></i>
                            </span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* Total Products */}
                  <Col xl={3} lg={6} md={6} sm={6} xxl={6}>
                    <Card>
                      <Card.Body>
                        <div className="d-flex align-items-start">
                          <div className="flex-grow-1">
                            <p className="mb-0">Total Products</p>
                            <div className="d-flex flex-wrap align-items-center">
                              <span className="fs-5">
                                {!totalProducts
                                  ? "Loading..."
                                  : totalProducts.length}
                              </span>
                            </div>
                          </div>
                          <div className="min-w-fit-content ms-3">
                            <span className="avatar avatar-md br-5 bg-warning-transparent text-warning">
                              <i className="fe fe-credit-card fs-18"></i>
                            </span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col xl={12} lg={12} md={12} sm={12} xxl={12} className="mb-3">
            <div className="bg-white p-3">
              <Graph
                chartOption={chartState.options}
                chartSeries={chartState.series}
                chartType="bar"
                chartHeight={350}
              />
            </div>
          </Col>

          <Col xl={6} lg={6} md={6} sm={6} xxl={6} className="mb-3">
            <div className="bg-white p-3">
              <Graph
                chartOption={chartState.options}
                chartSeries={chartState.series}
                chartType="bar"
                chartHeight={350}
              />
            </div>
          </Col>
          <Col xl={6} lg={6} md={6} sm={6} xxl={6} className="mb-3">
            <div className="bg-white p-3">
              <Graph
                chartOption={chartState.options}
                chartSeries={chartState.series}
                chartType="bar"
                chartHeight={350}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Indexpage;
