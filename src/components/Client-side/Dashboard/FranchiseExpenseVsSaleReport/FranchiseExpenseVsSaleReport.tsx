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
    Table,
} from "react-bootstrap";
import Select from "react-select";
import SkeletonLoader from "../../../../common/SkeletonLoader";
import useFranchiseExpenseVsSaleReport from "../../../Hook/Dashboard-Hook/FranchiseExpenseVsSaleReport/useFranchiseExpenseVsSaleReport";
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);


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
        DoughnutData,
        DoughnutOptions,
        filteredFrExVsSaleReort,
        searchTerm,
        handleSearch,
        setfromDate,
        settodate,
        handleChange,
        currentFrExVsSaleReort,
        handleFranchiseChange,
        handleSubmitFranchiseExpenseVsSaleReport,
        handleSort,
        exportToExcel
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


                                        <div className="row align-items-center g-2 mb-3">
                                            <div className="col-md-6 col-12">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Search in all fields..."
                                                    value={searchTerm}
                                                    onChange={(e) => handleSearch(e.target.value)}
                                                    className="w-100"
                                                />
                                            </div>

                                            <div className="col-md-6 col-12 d-flex justify-content-md-end justify-content-between gap-2">
                                                <Button variant="success" onClick={exportToExcel}>
                                                    <i className="fe fe-download me-2"></i>Export to Excel
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="table-responsive mt-3">
                                            {isLoading ? (
                                                <SkeletonLoader loading={isLoading} />
                                            ) : (
                                                <Table
                                                    id="FrExVsSaleReort-table"
                                                    className="border text-nowrap text-md-nowrap table-hover mb-0"
                                                >
                                                    <thead className="table-primary">
                                                        <tr>
                                                            <th onClick={() => handleSort("id")}>Outlet Name</th>
                                                            <th onClick={() => handleSort("Photo")}>Zone</th>
                                                            <th onClick={() => handleSort("name")}>Sub Zone</th>
                                                            <th onClick={() => handleSort("srno")}>Total Sale</th>
                                                            <th onClick={() => handleSort("status")}>Employee Expenses</th>
                                                            <th onClick={() => handleSort("Name")}>Vendor Expenses</th>
                                                            <th onClick={() => handleSort("Name")}>NSO Vendor Expenses</th>
                                                            <th onClick={() => handleSort("Name")}>Salary</th>
                                                            <th onClick={() => handleSort("Name")}>Rent & Electricity</th>
                                                            <th onClick={() => handleSort("Name")}>Misc Expenses</th>
                                                            <th onClick={() => handleSort("Name")}>Investor Share Cost (12%)</th>
                                                            <th onClick={() => handleSort("Name")}>GST (5%)</th>
                                                            <th onClick={() => handleSort("Name")}>HO Cost (5%)</th>
                                                            <th onClick={() => handleSort("Name")}>Balance</th>


                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {currentFrExVsSaleReort.length > 0 ? (
                                                            currentFrExVsSaleReort.map((FrExVsSaleReort: any) => (
                                                                <tr>

                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan={3} className="text-center">
                                                                    No records found.
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </Table>
                                            )}

                                        </div>
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
                                                    <Doughnut width={741} height={300} options={DoughnutOptions} data={DoughnutData} />                                                   </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Tab.Pane>
                            </Tab.Content>

                        </Tab.Container>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default FranchiseExpenseVsSaleReport;
