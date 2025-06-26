import { FC, Fragment } from "react";
//import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Form, Button } from "react-bootstrap";
import useFrProductWiseSellReport from "../../../Hook/FranchiseReport2025/useFrProductWiseSellReport";
import SkeletonLoader from "../../../../common/SkeletonLoader";
import Select from "react-select";

const FrProductWiseSellReport: FC = () => {
    const {
        indexOfLastProductWiseSellReport,
        indexOfFirstProductWiseSellReport,
        filteredProductWiseSellReport,
        searchTerm,
        currentPage,
        ProductWiseSellReportPerPage,
        totalPages,
        fromDate,
        toDate,
        currentProductWiseSellReport,
        loading,
        ProductList,
        handleSearch,
        handleSort,
        handlePageChange,
        getVisiblePages,
        setProductWiseSellReportPerPage,
        setfromDate,
        settodate,
        exportToExcel,
        handelNavigateAllocatedProduct,
        handelfetchProductWiseSellReport
    } = useFrProductWiseSellReport();

    return (
        <Fragment>
            {/* <Pageheader 
        heading="List Of Allocate Products"
        homepage="Products"
        activepage="Allocate Products"
      /> */}

            <div className="main-container container-fluid">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <Card.Body>
                                <div className="row align-items-center g-2 mb-3">

                                    <div className="col-md-3 col-12">
                                        <Form.Group controlId="goDownlist">
                                            <Form.Label>Product</Form.Label>
                                            <Select
                                                name="state"
                                                options={ProductList}
                                                className="basic-multi-select"
                                                isSearchable
                                                menuPlacement="auto"
                                                classNamePrefix="Select2"
                                                defaultValue={ProductList[0]}
                                                getOptionLabel={(e: any) => e.label}
                                                getOptionValue={(e: any) => String(e.id)}
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-3 col-12">
                                        <Form.Group controlId="fromDate">
                                            <Form.Label> From Date</Form.Label>
                                            <Form.Control
                                                value={fromDate}
                                                type="date"
                                                onChange={(date: Date | any) => setfromDate(date)}
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-3 col-12">
                                        <Form.Group controlId="toDate">
                                            <Form.Label> To Date</Form.Label>
                                            <Form.Control
                                                value={toDate}
                                                type="date"
                                                onChange={(date: Date | any) => settodate(date)}

                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-2 col-12">
                                        <Button variant="success mt-4" onClick={handelfetchProductWiseSellReport}>Search </Button>
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
                                            value={ProductWiseSellReportPerPage}
                                            onChange={(e) =>
                                                setProductWiseSellReportPerPage(Number(e.target.value))
                                            }
                                            className="w-auto"
                                        >
                                            <option value="5">5 Items</option>
                                            <option value="10">10 Items</option>
                                            <option value="20">20 Items</option>
                                            <option value={filteredProductWiseSellReport.length}>
                                                All Items
                                            </option>
                                        </Form.Select>
                                        <Button variant="success" onClick={exportToExcel}>
                                            <i className="fe fe-download me-2"></i>Export to Excel
                                        </Button>
                                    </div>
                                </div>

                                <div className="table-responsive">
                                    {loading ? (
                                        <SkeletonLoader loading={loading} />
                                    ) : (
                                        <Table
                                            id="ViewProductWiseSellReport-table"
                                            className="border text-nowrap text-md-nowrap table-hover mb-0"
                                        >
                                            <thead className="table-primary">
                                                <tr>
                                                    <th onClick={() => handleSort("id")}>ID</th>
                                                    <th onClick={() => handleSort("Fname")}>Product</th>
                                                    <th onClick={() => handleSort("id")}>Total Sell</th>
                                                    <th onClick={() => handleSort("id")}>Purchase Amount</th>
                                                    <th onClick={() => handleSort("id")}>Sell Amount</th>
                                                    <th onClick={() => handleSort("id")}>Profit Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentProductWiseSellReport?.length > 0 ? (
                                                    currentProductWiseSellReport?.map((products: any) => (
                                                        <tr key={products.id}>
                                                         
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

                                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                                    <div>
                                        Showing {indexOfFirstProductWiseSellReport + 1} to{" "}
                                        {Math.min(
                                            indexOfLastProductWiseSellReport,
                                            filteredProductWiseSellReport.length
                                        )}{" "}
                                        of {filteredProductWiseSellReport.length} entries
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

export default FrProductWiseSellReport;
