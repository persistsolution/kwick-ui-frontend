import { FC, Fragment } from "react";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
// import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import useViewRawInventoryStockReport from "../../../Hook/SubFranchise/MRPInvenotoryStockReport/useViewRawInventoryStockReport";
import SkeletonLoader from "../../../../common/SkeletonLoader";

const ViewRawInventoryStockReport: FC = () => {
    const {
        indexOfLastRawInventoryStockReport,
        indexOfFirstRawInventoryStockReport,
        RawInventoryStockReport,
        searchTerm,
        currentPage,
        RawInventoryStockReportPerPage,
        totalPages,
        fromDate,
        loading,
        toDate,
        handleSearch,
        setfromDate,
        settodate,
        handleSort,
        handlePageChange,
        exportToExcel,
        getVisiblePages,
        setRawInventoryStockReportPerPage,
    } = useViewRawInventoryStockReport();

    return (
        <Fragment>
            {/* <Pageheader
        heading="View Cash Book List"
        homepage="Dashboard"
        activepage="View Cash Book List"
      /> */}

            <div className="main-container container-fluid">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <Card.Body>
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
                                        <Form.Select
                                            value={RawInventoryStockReportPerPage}
                                            onChange={(e) =>
                                                setRawInventoryStockReportPerPage(Number(e.target.value))
                                            }
                                            className="w-auto"
                                        >
                                            <option value="5">5 Items</option>
                                            <option value="10">10 Items</option>
                                            <option value="20">20 Items</option>
                                            <option value={RawInventoryStockReport.length}>All Items</option>
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
                                            id="franchise-table"
                                            className="border text-nowrap text-md-nowrap table-hover mb-0"
                                        >
                                            <thead className="table-primary">
                                                <tr>
                                                    <th onClick={() => handleSort("id")}>Raw Product Name</th>

                                                    <th onClick={() => handleSort("bankName")}>
                                                        Credit
                                                    </th>
                                                    <th onClick={() => handleSort("bankName")}>
                                                        Debit
                                                    </th>
                                                    <th onClick={() => handleSort("bankName")}>
                                                        Balance
                                                    </th>
                                                    <th onClick={() => handleSort("bankName")}>
                                                        Unit
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {RawInventoryStockReport.length > 0 ? (
                                                    RawInventoryStockReport.map((franchise: any) => (
                                                        <tr key={franchise.id}></tr>
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
                                        Showing {indexOfFirstRawInventoryStockReport + 1} to{" "}
                                        {Math.min(indexOfLastRawInventoryStockReport, RawInventoryStockReport.length)} of{" "}
                                        {RawInventoryStockReport.length} entries
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

export default ViewRawInventoryStockReport;
