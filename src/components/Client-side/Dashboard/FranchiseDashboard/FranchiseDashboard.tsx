import { FC, Fragment, useState } from "react";
import { Card, Col, Row, CardHeader, CardBody, ProgressBar  , Table} from "react-bootstrap";
import useFranchiseDashboard from "../../../Hook/Dashboard-Hook/FranchiseDashboard/useFranchiseDashboard";
//import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { ApexOptions } from "apexcharts";
import Graph from "../../Graph/Graph";
// import { useSelector  } from "react-redux/es/hooks/useSelector";
import { useSelector } from "react-redux";

const FranchiseDashboard: FC = () => {
  const { dashboardHeadersData , progressData , productSalesData} = useFranchiseDashboard();

  const frId = useSelector((state: any) => state.frId);


  const [chartState] = useState({
    series: [
      {
        name: "Online",
        data: [44, 55],
      },
    ],
    options: {
      chart: {
        events: {
          mounted: (chart: any) => {
            chart.windowResizeHandler();
          },
        },
        type: "bar",
        height: 350,
        background: "#ffffff",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        },
      },
      grid: {
        show: true,
        borderColor: "rgba(119, 119, 142, 0.1)",
      },
      dataLabels: {
        enabled: false,
      },
      //   colors: ["rgb(21, 58, 84)", "rgb(0, 165, 162)", "rgb(166, 142, 94)"],
      colors: ["rgb(0, 165, 162)"],

      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["Today Sell", "Total Sell"],
        labels: {
          show: true,
          style: {
            colors: "#8c9097",
            fontSize: "11px",
            fontWeight: 600,
            cssClass: "apexcharts-xaxis-label",
          },
        },
        axisBorder: {
          show: true,
          color: "rgba(119, 119, 142, 0.05)",
          offsetX: 0,
          offsetY: 0,
        },
        axisTicks: {
          show: true,
          borderType: "solid",
          color: "rgba(119, 119, 142, 0.05)",
          offsetX: 0,
          offsetY: 0,
        },
      },
      yaxis: {
        title: {
          text: "",
          style: {
            color: "#8c9097",
          },
        },
        labels: {
          show: true,
          style: {
            colors: "#8c9097",
            fontSize: "11px",
            fontWeight: 600,
            cssClass: "apexcharts-xaxis-label",
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return "$ " + val + " thousands";
          },
        },
      },
    } as ApexOptions,
  });

  return (
    <Fragment>
      {/* <Pageheader  heading="Dashboard" homepage="Admin" activepage="Dashboard" /> */}

      <div className="main-container container-fluid">
        <Row>
          <Col xxl={12}>
            <Row>
              <Col xxl={5} xl={12}>
                <Row>
                  {dashboardHeadersData.map((item) => (
                    <Col xl={3} lg={6} md={6} sm={6} xxl={6}>
                      <Card>
                        <Card.Body>
                          <div className="d-flex align-items-start">
                            <div className="flex-grow-1">
                              <p className="mb-0">{item.name}</p>
                              <div className="d-flex flex-wrap align-items-center">
                                <span className="fs-5">
                                  {!item.amount ? "Loading..." : item.amount}
                                </span>
                              </div>
                            </div>
                            <div className="min-w-fit-content ms-3">
                              {item.name === "Total Order" ||
                              item.name === "Today Order" ? (
                                <span className="avatar avatar-md br-5 bg-secondary-transparent text-secondary">
                                  <i className="fe fe-package fs-18"></i>
                                </span>
                              ) : item.name === "Employee" ? (
                                <span className="avatar avatar-md br-5 bg-primary-transparent text-primary">
                                  <i className="fe fe-user fs-18"></i>
                                </span>
                              ) : item.name === "Today Cash" ? (
                                <span className="avatar avatar-md br-5 bg-success-transparent text-success">
                                  <i className="fa fa-money fs-18"></i>
                                </span>
                              ) : (
                                <span className="avatar avatar-md br-5 bg-warning-transparent text-warning">
                                  <i className="fe fe-credit-card fs-18"></i>
                                </span>
                              )}
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>

         <Col xl={6} sm={12}>
        <Card>
          <CardHeader>
            <h3 className="card-title">Stock Level</h3>
          </CardHeader>
          <Card.Body>
            {progressData.map((item, index) => (
              <div className="mb-3" key={index}>
                   <div className="d-flex justify-content-between">
                  <div className="fs-13">
                    City: <span className={`text-${item.color}`}>{item.City}</span>
                  </div>
                  <div className="fs-13">
                    Days: <span className={`text-${item.color}`}>{item.days}</span>
                  </div>
                </div>
                <ProgressBar
                  now={item.value}
                  // label={`${item.value}%`}
                  variant={item.color}
                  style={{ height: "10px" }}
                  className="mb-2"
                  
                />
                <div className="d-flex justify-content-between">
                  {/* <div className="fs-13">
                    Raised: <span className={`text-${item.color}`}>{item.raised}</span>
                  </div> */}
                  {/* <div className="fs-13">
                    Goal: <span className={`text-${item.color}`}>{item.goal}</span>
                  </div> */}
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>
        </Col>

         <Col xl={6} sm={12}>
      <Card>
        <Card.Header>
          <h3 className="card-title">Product Sales Summary</h3>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table className="table table-hover mb-0">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Total Sell</th>
                  <th>Purchase Amount</th>
                  <th>Sell Amount</th>
                  <th>Profit Amount</th>
                </tr>
              </thead>
              <tbody>
                {productSalesData.map((item :any) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.product}</td>
                    <td>{item.totalSell}</td>
                    <td>{item.purchaseAmount}</td>
                    <td>{item.sellAmount}</td>
                    <td>{item.profitAmount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Col>
            </Row>
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

export default FranchiseDashboard;
