import { FC, Fragment } from "react";
//import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import Select from "react-select";
import useGodownProductStockReport from "../../Hook/Report-Hook/useViewGodownProductStockReport";

const ViewGodownProductStockReport: FC = () => {
    const {
        indexOfLastGodownProductStockReport,
        indexOfFirstGodownProductStockReport,
        GodownProductStockReport,
        searchTerm,
        currentPage,
        GodownProductStockReportPerPage,
        totalPages,
        countryArray,
        selectState,
        fromDate,
        toDate,
        godownArray,
        selectGodown,
        godownProductArray,
        selectGodownProduct,
        handleSearch,
        handleSort,
        handlePageChange,
        exportToExcel,
        getVisiblePages,
        setGodownProductStockReportPerPage,
        setSelectState,
        setfromDate,
        settodate,
        setselectGodown,
        setselectGodownProduct
    } = useGodownProductStockReport();

    return (
        <Fragment>
            {/* <Pageheader 
        heading="Godown Stock Report"
        homepage="Products"
        activepage="Godown Stock Report"
      /> */}

            <div className="main-container container-fluid">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <Card.Body>
                                <div className="row align-items-center g-2 mb-3">


                                    <div className="col-md-3 col-12">
                                        <Form.Label>Select Godown<span className="text-danger">*</span></Form.Label>
                                        <Form.Group>
                                            <Select
                                                id="godown"
                                                name="godown"
                                                value={
                                                    godownArray.find(
                                                        (option: any) => option.id.toString() === selectGodown
                                                    ) || null
                                                }
                                                options={godownArray}
                                                getOptionLabel={(option: any) => option.label}
                                                getOptionValue={(option: any) => option.id.toString()}
                                                onChange={(selectedOption: any) => {
                                                    setselectGodown(selectedOption ? selectedOption.id.toString() : "");
                                                }}
                                                isSearchable
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-3 col-12">
                                        <Form.Label> Godown Product<span className="text-danger">*</span></Form.Label>
                                        <Form.Group>
                                            <Select
                                                id="godown"
                                                name="godown"
                                                value={
                                                    godownProductArray.find(
                                                        (option: any) => option.id.toString() === selectGodownProduct
                                                    ) || null
                                                }
                                                options={godownProductArray}
                                                getOptionLabel={(option: any) => option.label}
                                                getOptionValue={(option: any) => option.id.toString()}
                                                onChange={(selectedOption: any) => {
                                                    setselectGodownProduct(selectedOption ? selectedOption.id.toString() : "");
                                                }}
                                                isSearchable
                                            />
                                        </Form.Group>
                                    </div>


                                    <div className="col-md-2 col-6">
                                        <Form.Group controlId="fromDate">
                                            <Form.Label>From Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={fromDate || ""}
                                                onChange={(date: any) => setfromDate(date)}
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-2 col-6">
                                        <Form.Group controlId="toDate">
                                            <Form.Label> To Date</Form.Label>
                                            <Form.Control
                                                value={toDate}
                                                type="date"
                                                onChange={(date: any) => settodate(date)}
                                            />
                                        </Form.Group>
                                    </div>


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
                                        <Form.Select
                                            value={GodownProductStockReportPerPage}
                                            onChange={(e) =>
                                                setGodownProductStockReportPerPage(Number(e.target.value))
                                            }
                                            className="w-auto"
                                        >
                                            <option value="5">5 Items</option>
                                            <option value="10">10 Items</option>
                                            <option value="20">20 Items</option>
                                            <option value={GodownProductStockReport.length}>All Items</option>
                                        </Form.Select>
                                        <Button variant="success" onClick={exportToExcel}>
                                            <i className="fe fe-download me-2"></i>Export to Excel
                                        </Button>
                                    </div>
                                </div>

                                <div className="table-responsive">
                                    <Table
                                        id="GodownProductStockReport-table"
                                        className="border text-nowrap text-md-nowrap table-hover mb-0"
                                    >
                                        <thead className="table-primary">
                                            <tr>
                                                <th onClick={() => handleSort("")}>
                                                    Sr No
                                                </th>
                                                <th onClick={() => handleSort("godown")}>
                                                    Go-Down
                                                </th>
                                                <th onClick={() => handleSort("productName")}>
                                                    Product Name                                                </th>
                                                <th onClick={() => handleSort("credit")}>
                                                    Credit
                                                </th>
                                                <th onClick={() => handleSort("debit")}>
                                                    {" "}
                                                    Debit
                                                </th>
                                                <th onClick={() => handleSort("balance")}>
                                                    Balance
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {GodownProductStockReport.length > 0 ? (
                                                GodownProductStockReport.map((GodownProductStockReport: any) => (
                                                    <tr key={GodownProductStockReport.id}></tr>
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
                                </div>

                                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                                    <div>
                                        Showing {indexOfFirstGodownProductStockReport + 1} to{" "}
                                        {Math.min(
                                            indexOfLastGodownProductStockReport,
                                            GodownProductStockReport.length
                                        )}{" "}
                                        of {GodownProductStockReport.length} entries
                                    </div>
                                    <ul className="pagination pagination-sm mt-2 mt-md-0">
                                        <li
                                            className={`page-item ${currentPage === 1 ? "disabled" : ""
                                                }`}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() => handlePageChange(1)}
                                                disabled={currentPage === 1}
                                            >
                                                First
                                            </button>
                                        </li>
                                        <li
                                            className={`page-item ${currentPage === 1 ? "disabled" : ""
                                                }`}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                            >
                                                Previous
                                            </button>
                                        </li>
                                        {getVisiblePages().map((pageNumber) => (
                                            <li
                                                key={pageNumber}
                                                className={`page-item ${currentPage === pageNumber ? "active" : ""
                                                    }`}
                                            >
                                                <button
                                                    className="page-link"
                                                    onClick={() => handlePageChange(pageNumber)}
                                                >
                                                    {pageNumber}
                                                </button>
                                            </li>
                                        ))}
                                        <li
                                            className={`page-item ${currentPage === totalPages ? "disabled" : ""
                                                }`}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                            >
                                                Next
                                            </button>
                                        </li>
                                        <li
                                            className={`page-item ${currentPage === totalPages ? "disabled" : ""
                                                }`}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() => handlePageChange(totalPages)}
                                                disabled={currentPage === totalPages}
                                            >
                                                Last
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
};

export default ViewGodownProductStockReport;
