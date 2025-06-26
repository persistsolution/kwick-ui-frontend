import { FC, Fragment } from "react";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
// import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import Select from "react-select";
import useFrDiscountReport from "../../../Hook/FranchiseReport2025/useFrDiscountReport";
import SkeletonLoader from "../../../../common/SkeletonLoader";

const FrDiscountReport: FC = () => {
    const {
        indexOfLastFrDiscount,
        indexOfFirstFrDiscount,
        FrDiscount,
        searchTerm,
        currentPage,
        FrDiscountPerPage,
        totalPages,
        fromDate,
        toDate,
        vendorOptions,
        vendorId,
        loading,
        reportList,
        selectedReport,
        paymentTypeList,
        selectedPayment,
        setSelectPayment,
        setSelectReport,
        handleSearch,
        setfromDate,
        settodate,
        handleSort,
        handlePageChange,
        exportToExcel,
        getVisiblePages,
        setFrDiscountPerPage,
        setVendorId
    } = useFrDiscountReport();

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


                                    <div className="col-md-3 col-4">
                                        <Form.Group controlId="selectReport">
                                            <Form.Label>Select Report</Form.Label>
                                            <Select
                                                id="selectReport"
                                                name="selectReport"
                                                value={
                                                    reportList.find(
                                                        (option) => option.id.toString() === selectedReport
                                                    ) || null
                                                }
                                                options={reportList}
                                                getOptionLabel={(option) => option.label}
                                                getOptionValue={(option) => option.id.toString()}
                                                onChange={(selectedOption: any) => {
                                                    setSelectReport(selectedOption ? selectedOption.id.toString() : "");
                                                }}
                                                required
                                                isSearchable
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-3 col-6">
                                        <Form.Group controlId="paymentType">
                                            <Form.Label>Payment Type</Form.Label>
                                            <Select
                                                id="paymentType"
                                                name="paymentType"
                                                value={
                                                    paymentTypeList.find(
                                                        (option) => option.id.toString() === selectedPayment
                                                    ) || null
                                                }
                                                options={paymentTypeList}
                                                getOptionLabel={(option) => option.label}
                                                getOptionValue={(option) => option.id.toString()}
                                                onChange={(selectedOption: any) => {
                                                    setSelectPayment(selectedOption ? selectedOption.id.toString() : "");
                                                }}
                                                required
                                                isSearchable
                                            />
                                        </Form.Group>
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


                                    <div className="col-md-2 col-12 d-flex align-items-center mt-4">
                                        <Button variant="success" className="me-2">
                                            Search
                                        </Button>
                                        <span>Total :</span>
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
                                            value={FrDiscountPerPage}
                                            onChange={(e) =>
                                                setFrDiscountPerPage(Number(e.target.value))
                                            }
                                            className="w-auto"
                                        >
                                            <option value="5">5 Items</option>
                                            <option value="10">10 Items</option>
                                            <option value="20">20 Items</option>
                                            <option value={FrDiscount.length}>All Items</option>
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
                                                    <th rowSpan={2}>#</th>
                                                    <th rowSpan={2}>Product Name</th>
                                                    <th rowSpan={2}>Category Name</th>
                                                    <th colSpan={3} className="text-center">Opening Stock</th>
                                                    <th colSpan={3} className="text-center">Purchase</th>
                                                    <th colSpan={3} className="text-center">Sale</th>
                                                    <th colSpan={3} className="text-center">Closing Stock</th>
                                                </tr>
                                                <tr>
                                                    <th>Qty</th>
                                                    <th>Rate</th>
                                                    <th>Amount</th>
                                                    <th>Qty</th>
                                                    <th>Rate</th>
                                                    <th>Amount</th>
                                                    <th>Qty</th>
                                                    <th>Rate</th>
                                                    <th>Amount</th>
                                                    <th>Qty</th>
                                                    <th>Rate</th>
                                                    <th>Amount</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {FrDiscount.length > 0 ? (
                                                    FrDiscount.map((franchise: any) => (
                                                        <tr key={franchise.ProdId}>
                                                            <td>{franchise.ProdId}</td>
                                                            <td>{franchise.ProductName}</td>
                                                            <td>{franchise.Category}</td>
                                                            <td>{franchise.OpeningQty}</td>
                                                            <td>{Number(franchise.PurchasePrice || 0).toFixed(2)}</td>
                                                            <td>{franchise.OpeningValue}</td>
                                                            <td>{franchise.PurchaseQty}</td>
                                                            <td>{franchise.PurchasePrice}</td>
                                                            <td>{franchise.PurchaseValue}</td>
                                                            <td>{franchise.SaleQty}</td>
                                                            <td>{franchise.SaleRate}</td>
                                                            <td>{franchise.SaleValue}</td>
                                                            <td>{franchise.ClosingQty}</td>
                                                            <td>{franchise.ClosingRate}</td>
                                                            <td>{franchise.ClosingValue}</td>

                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={14} className="text-center">No records found.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    )}


                                </div>

                                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                                    <div>
                                        Showing {indexOfFirstFrDiscount + 1} to{" "}
                                        {Math.min(indexOfLastFrDiscount, FrDiscount.length)} of{" "}
                                        {FrDiscount.length} entries
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

export default FrDiscountReport;
