import { FC } from "react";
import {
    Badge,
    Button,
    Card,
    Col,
    Form,
    ListGroup,
    Nav,
    Row,
    Tab,
} from "react-bootstrap";
import Select from "react-select";
import SkeletonLoader from "../../../../common/SkeletonLoader";
import useFranchiseExpenseVsSaleReport from "../../../Hook/Dashboard-Hook/FranchiseExpenseVsSaleReport/useFranchiseExpenseVsSaleReport";
import { BarChartJS, DoughnutChart } from "../../../../common/ChartData";
import { Doughnut, Line, Bar, Radar, Scatter, Bubble, Pie, PolarArea } from 'react-chartjs-2';


const FranchiseExpenseVsSaleReport: FC = () => {
    const {
        formData,
        message,
        isLoading,
        franchiseList,
        fromDate,
        toDate,
        BarData,
        BarOptions,
        setfromDate,
        settodate,
        handleChange,
        handleFranchiseChange,
        handleSubmitFranchiseExpenseVsSaleReport,
    } = useFranchiseExpenseVsSaleReport();

    return (
        <Row>
            <Col xl={12}>
                <Card>
                    <Card.Header className="justify-content-between">
                        <Card.Title as="h4">Franchise Expense vs Sale Report</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Tab.Container defaultActiveKey={1}>
                            <Nav
                                variant="pills"
                                className="mb-3 bg-primary-transparent br-5 p-2"
                            >
                                <Nav.Item>
                                    <Nav.Link eventKey={1}>Report</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={2}>Graph</Nav.Link>
                                </Nav.Item>
                            </Nav>

                            {isLoading ? (
                                <SkeletonLoader loading={isLoading} />
                            ) : (
                                <Tab.Content>
                                    {/* Report Tab */}
                                    <Tab.Pane eventKey={1} className="fade show" tabIndex={0}>
                                        <Row className="mb-3">
                                            <Col md={3}>
                                                <Form.Group controlId="franchise">
                                                    <Form.Label>Franchise</Form.Label>
                                                    <Select
                                                        name="franchise"
                                                        options={franchiseList}
                                                        isSearchable
                                                        classNamePrefix="Select2"
                                                        value={formData.selectedFranchise}
                                                        onChange={handleFranchiseChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={2}>
                                                <Form.Group controlId="fromDate">
                                                    <Form.Label>From Date</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        value={fromDate}
                                                        onChange={(e) => setfromDate(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={2}>
                                                <Form.Group controlId="toDate">
                                                    <Form.Label>To Date</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        value={toDate}
                                                        onChange={(e) => settodate(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={2} className="mt-4">
                                                <Button variant="success" onClick={handleSubmitFranchiseExpenseVsSaleReport}>
                                                    Search
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Tab.Pane>

                                    {/* Graph Tab */}
                                    <Tab.Pane eventKey={2} className="fade" tabIndex={0}>
                                        <Row>
                                            <Col xl={6} className="col-xl-6">
                                                <Card className="custom-card">
                                                    <Card.Header >
                                                        <Card.Title> Bar Chart</Card.Title>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <Bar width={741} height={300} options={BarOptions} data={BarData} />
                                                    </Card.Body>
                                                </Card>
                                            </Col>

                                            <Col xl={6} className="col-xl-6">
                                                <Card className=" custom-card">
                                                    <Card.Header>
                                                        <Card.Title className="card-title"> Doughnut Chart</Card.Title>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <DoughnutChart />
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Tab.Pane>
                                </Tab.Content>
                            )}
                        </Tab.Container>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default FranchiseExpenseVsSaleReport;
