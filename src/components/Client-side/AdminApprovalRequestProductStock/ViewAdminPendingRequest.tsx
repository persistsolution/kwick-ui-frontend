import { FC, Fragment } from "react";
//import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useViewAdminPendingRequest from "../../Hook/AdminApprovalRequestProductStock/useViewAdminPendingRequest";

const ViewAdminPendingRequest: FC = () => {
    const {
        indexOfLastAdminPendingRequest,
        indexOfFirstAdminPendingRequest,
        AdminPendingRequest,
        searchTerm,
        currentPage,
        AdminPendingRequestPerPage,
        totalPages,
        handleSearch,
        handleSort,
        handlePageChange,
        exportToExcel,
        getVisiblePages,
        setAdminPendingRequestPerPage,
    } = useViewAdminPendingRequest();

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
                                            value={AdminPendingRequestPerPage}
                                            onChange={(e) =>
                                                setAdminPendingRequestPerPage(Number(e.target.value))
                                            }
                                            className="w-auto"
                                        >
                                            <option value="5">5 Items</option>
                                            <option value="10">10 Items</option>
                                            <option value="20">20 Items</option>
                                            <option value={AdminPendingRequest.length}>All Items</option>
                                        </Form.Select>
                                        <Button variant="success" onClick={exportToExcel}>
                                            <i className="fe fe-download me-2"></i>Export to Excel
                                        </Button>
                                    </div>
                                </div>

                                <div className="table-responsive">
                                    <Table
                                        id="AdminPendingRequest-table"
                                        className="border text-nowrap text-md-nowrap table-hover mb-0"
                                    >
                                        <thead className="table-primary">
                                            <tr>
                                                <th onClick={() => handleSort("srNo")}>
                                                    Sr No
                                                </th>
                                                <th onClick={() => handleSort("")}>
                                                    Admin Approve
                                                </th>
                                                <th onClick={() => handleSort("")}>
                                                    Accountant Approve
                                                </th>
                                                <th onClick={() => handleSort("")}>
                                                    GRN Type
                                                </th>
                                                <th onClick={() => handleSort("")}>
                                                    Invoice No
                                                </th>
                                                <th onClick={() => handleSort("")}>
                                                    Franchise
                                                </th>
                                                <th onClick={() => handleSort("")}>
                                                    Vendor Name
                                                </th>
                                                <th onClick={() => handleSort("")}>
                                                    Date
                                                </th>
                                                <th onClick={() => handleSort("")}>
                                                    Total Product
                                                </th>
                                                <th onClick={() => handleSort("")}>
                                                    Narration
                                                </th>
                                                <th onClick={() => handleSort("")}>
                                                    Receipt/Bill
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {AdminPendingRequest.length > 0 ? (
                                                AdminPendingRequest.map((AdminPendingRequest: any) => (
                                                    <tr key={AdminPendingRequest.id}></tr>
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
                                        Showing {indexOfFirstAdminPendingRequest + 1} to{" "}
                                        {Math.min(
                                            indexOfLastAdminPendingRequest,
                                            AdminPendingRequest.length
                                        )}{" "}
                                        of {AdminPendingRequest.length} entries
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

export default ViewAdminPendingRequest;
