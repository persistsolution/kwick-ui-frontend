import { FC, Fragment } from "react";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
// import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import Select from "react-select";
import useViewRawProductGRN from "../../../Hook/SubFranchise/GRN/useViewRawProductGRN";

const ViewRawProductGRN: FC = () => {
    const {
        indexOfLastRawProductGRN,
        indexOfFirstRawProductGRN,
        RawProductGRN,
        searchTerm,
        currentPage,
        RawProductGRNPerPage,
        totalPages,
        fromDate,
        toDate,
        vendorOptions,
        vendorId,
        handleSearch,
        setfromDate,
        settodate,
        handleSort,
        handlePageChange,
        exportToExcel,
        getVisiblePages,
        setRawProductGRNPerPage,
        setVendorId
    } = useViewRawProductGRN();

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
                                    <div className="col-md-3 col-12">
                                        <Form.Group controlId="state">
                                            <Form.Label>
                                                Vendor <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Select
                                                id="vendor"
                                                name="vendor"
                                                value={
                                                    vendorOptions.find(
                                                        (option: any) => option.value === vendorId
                                                    ) || null
                                                }
                                                options={vendorOptions}
                                                getOptionLabel={(option :any) => option.label}
                                                getOptionValue={(option) => option.value}
                                                onChange={(selectedOption) =>
                                                    setVendorId(selectedOption ? selectedOption.value : "")
                                                }
                                                placeholder="Select Vendor"
                                                isSearchable
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
                                        <Button variant="success mt-4">Search </Button>
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
                                            value={RawProductGRNPerPage}
                                            onChange={(e) =>
                                                setRawProductGRNPerPage(Number(e.target.value))
                                            }
                                            className="w-auto"
                                        >
                                            <option value="5">5 Items</option>
                                            <option value="10">10 Items</option>
                                            <option value="20">20 Items</option>
                                            <option value={RawProductGRN.length}>All Items</option>
                                        </Form.Select>

                                        <Button variant="success" >
                                            Add New
                                        </Button>

                                        <Button variant="success" onClick={exportToExcel}>
                                            <i className="fe fe-download me-2"></i>Export to Excel
                                        </Button>
                                    </div>
                                </div>

                                <div className="table-responsive">
                                    <Table
                                        id="franchise-table"
                                        className="border text-nowrap text-md-nowrap table-hover mb-0"
                                    >
                                        <thead className="table-primary">
                                            <tr>
                                                <th onClick={() => handleSort("id")}>Sr No.</th>
                                                <th onClick={() => handleSort("date")}>Invoice No </th>
                                                <th onClick={() => handleSort("cashAmount")}>
                                                    Vendor Name
                                                </th>
                                                <th onClick={() => handleSort("transferAmount")}>
                                                    Date
                                                </th>
                                               
                                                <th onClick={() => handleSort("bankName")}>
                                                    Stock In Qty
                                                </th>
                                                <th onClick={() => handleSort("bankName")}>
                                                    Edit
                                                </th>
                                                <th onClick={() => handleSort("bankName")}>
                                                    Delete
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {RawProductGRN.length > 0 ? (
                                                RawProductGRN.map((franchise: any) => (
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
                                </div>

                                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                                    <div>
                                        Showing {indexOfFirstRawProductGRN + 1} to{" "}
                                        {Math.min(indexOfLastRawProductGRN, RawProductGRN.length)} of{" "}
                                        {RawProductGRN.length} entries
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

export default ViewRawProductGRN;
