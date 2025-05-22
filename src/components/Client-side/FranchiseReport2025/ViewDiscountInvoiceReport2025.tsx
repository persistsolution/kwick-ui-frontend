import { FC, Fragment } from "react";
//import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import Select from "react-select";
import useViewDiscountInvoiceReport2025 from "../../Hook/FranchiseReports2025/useViewDiscountInvoiceReport2025";

const ViewDiscountInvoiceReport2025: FC = () => {
    const {
        indexOfLastDiscountInvoiceReport2025,
        indexOfFirstDiscountInvoiceReport2025,
        DiscountInvoiceReport2025,
        searchTerm,
        currentPage,
        DiscountInvoiceReport2025PerPage,
        totalPages,
        countryArray,
        selectState,
        fromDate,
        toDate,
        franchiseArray,
        selectFranchise,
        godownProductArray,
        selectFranchiseProduct,
        selectReport,
        reportTypeArray,
        selectPaymentType,
        paymentTypeArray,
        setSelectPaymentType,
        setSelectReport,
        handleSearch,
        handleSort,
        handlePageChange,
        exportToExcel,
        getVisiblePages,
        setDiscountInvoiceReport2025PerPage,
        setSelectState,
        setfromDate,
        settodate,
        setSelectFranchise,
        setSelectFranchiseProduct
    } = useViewDiscountInvoiceReport2025();

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
                                        <Form.Label>Select Franchise<span className="text-danger ms-1">*</span></Form.Label>
                                        <Form.Group>
                                            <Select
                                                id="franchise"
                                                name="franchise"
                                                value={
                                                    franchiseArray.find(
                                                        (option: any) => option.id.toString() === selectFranchise
                                                    ) || null
                                                }
                                                options={franchiseArray}
                                                getOptionLabel={(option: any) => option.label}
                                                getOptionValue={(option: any) => option.id.toString()}
                                                onChange={(selectedOption: any) => {
                                                    setSelectFranchise(selectedOption ? selectedOption.id.toString() : "");
                                                }}
                                                isSearchable
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-3 col-12">
                                        <Form.Label>Select Report</Form.Label>
                                        <Form.Group>
                                            <Select
                                                id="product"
                                                name="product"
                                                value={
                                                    reportTypeArray.find(
                                                        (option: any) => option.value.toString() === selectReport
                                                    ) || null
                                                }
                                                options={reportTypeArray}
                                                getOptionLabel={(option: any) => option.label}
                                                getOptionValue={(option: any) => option.value.toString()}
                                                onChange={(selectedOption: any) => {
                                                    setSelectReport(selectedOption ? selectedOption.value.toString() : "");
                                                }}
                                                isSearchable
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-3 col-12">
                                        <Form.Label>Select Payment Type</Form.Label>
                                        <Form.Group>
                                            <Select
                                                id="paymentType"
                                                name="paymentType"
                                                value={
                                                    paymentTypeArray.find(
                                                        (option: any) => option.value.toString() === selectPaymentType
                                                    ) || null
                                                }
                                                options={paymentTypeArray}
                                                getOptionLabel={(option: any) => option.label}
                                                getOptionValue={(option: any) => option.value.toString()}
                                                onChange={(selectedOption: any) => {
                                                    setSelectPaymentType(selectedOption ? selectedOption.value.toString() : "");
                                                }}
                                                isSearchable
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="col-1 mt-4 ">
                                        <Button variant="success mt-1" >
                                            Search
                                        </Button>
                                    </div>

                                    <div className="col-md-2 col-4">
                                        <Form.Group controlId="cash">
                                            <Form.Label>Cash</Form.Label>
                                            <Form.Control
                                                disabled
                                                type="number"
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-2 col-4">
                                        <Form.Group controlId="phonePay">
                                            <Form.Label>Phone Pay</Form.Label>
                                            <Form.Control
                                                disabled
                                                type="number"
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-2 col-4">
                                        <Form.Group controlId="googlePay">
                                            <Form.Label>Google Pay</Form.Label>
                                            <Form.Control
                                                disabled
                                                type="number"
                                            />
                                        </Form.Group>
                                    </div>


                                    <div className="col-md-2 col-4">
                                        <Form.Group controlId="Paytm">
                                            <Form.Label>Paytm</Form.Label>
                                            <Form.Control
                                                disabled
                                                type="number"
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-2 col-4">
                                        <Form.Group controlId="fromDate">
                                            <Form.Label>Other UPI</Form.Label>
                                            <Form.Control
                                                disabled
                                                type="number"
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-2 col-4">
                                        <Form.Group controlId="Credit">
                                            <Form.Label>Credit</Form.Label>
                                            <Form.Control
                                                disabled
                                                type="number"
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-2 col-4">
                                        <Form.Group controlId="Zomato">
                                            <Form.Label>Zomato</Form.Label>
                                            <Form.Control
                                                disabled
                                                type="number"
                                            />
                                        </Form.Group>
                                    </div>



                                </div>

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
                                            value={DiscountInvoiceReport2025PerPage}
                                            onChange={(e) =>
                                                setDiscountInvoiceReport2025PerPage(Number(e.target.value))
                                            }
                                            className="w-auto"
                                        >
                                            <option value="5">5 Items</option>
                                            <option value="10">10 Items</option>
                                            <option value="20">20 Items</option>
                                            <option value={DiscountInvoiceReport2025.length}>All Items</option>
                                        </Form.Select>
                                        <Button variant="success" onClick={exportToExcel}>
                                            <i className="fe fe-download me-2"></i>Export to Excel
                                        </Button>
                                    </div>
                                </div>

                                <div className="table-responsive">
                                    <Table
                                        id="DiscountInvoiceReport2025-table"
                                        className="border text-nowrap text-md-nowrap table-hover mb-0"
                                    >
                                        <thead className="table-primary">
                                            <tr>

                                                <th onClick={() => handleSort("franchise")}>
                                                    Franchise Name
                                                </th>
                                                <th onClick={() => handleSort("invoiceNo")}>
                                                    Invoice No
                                                </th>
                                                <th onClick={() => handleSort("invoiceDate")}>
                                                    Invoice Date
                                                </th>
                                                <th onClick={() => handleSort("customerName")}>
                                                    Customer Name
                                                </th>
                                                <th onClick={() => handleSort("contactNo")}>
                                                    Contact No
                                                </th>
                                                <th onClick={() => handleSort("subTotal")}>
                                                    Sub Total
                                                </th>
                                                <th onClick={() => handleSort("dicount")}>
                                                    Discount
                                                </th>
                                                <th onClick={() => handleSort("totalAmount")}>
                                                    Total Amount
                                                </th>
                                                <th onClick={() => handleSort("paymentMode")}>
                                                    Payment Mode
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {DiscountInvoiceReport2025.length > 0 ? (
                                                DiscountInvoiceReport2025.map((DiscountInvoiceReport2025: any) => (
                                                    <tr key={DiscountInvoiceReport2025.id}></tr>
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
                                        Showing {indexOfFirstDiscountInvoiceReport2025 + 1} to{" "}
                                        {Math.min(
                                            indexOfLastDiscountInvoiceReport2025,
                                            DiscountInvoiceReport2025.length
                                        )}{" "}
                                        of {DiscountInvoiceReport2025.length} entries
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

export default ViewDiscountInvoiceReport2025;
