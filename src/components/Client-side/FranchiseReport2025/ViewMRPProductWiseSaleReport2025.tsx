import { FC, Fragment } from "react";
//import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import Select from "react-select";
import useViewMRPProductWiseSaleReport2025 from "../../Hook/FranchiseReports2025/useViewMRPProductWiseSaleReport2025";
import SkeletonLoader from "../../../common/SkeletonLoader";

const ViewMRPProductWiseSaleReport2025: FC = () => {
    const {
        indexOfLastMRPProductWiseSaleReport2025,
        indexOfFirstMRPProductWiseSaleReport2025,
        MRPProductWiseSaleReport2025,
        searchTerm,
        currentPage,
        MRPProductWiseSaleReport2025PerPage,
        totalPages,
        countryArray,
        selectState,
        fromDate,
        toDate,
        franchiseArray,
        selectFranchise,
        godownProductArray,
        selectFranchiseProduct,
        selectProduct,
        productArray,
        selectPaymentType,
        paymentTypeArray,
        loading,
        currentMRPProductWiseSaleReport2025,
        setSelectProduct,
        handleFetchMRPProductWiseSaleReport2025,
        setSelectPaymentType,
        handleSearch,
        handleSort,
        handlePageChange,
        exportToExcel,
        getVisiblePages,
        setMRPProductWiseSaleReport2025PerPage,
        setSelectState,
        setfromDate,
        settodate,
        setSelectFranchise,
        setSelectFranchiseProduct
    } = useViewMRPProductWiseSaleReport2025();

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
                                        <Form.Label>Select Product<span className="text-danger ms-1">*</span></Form.Label>
                                        <Form.Group>
                                            <Select
                                                id="product"
                                                name="product"
                                                value={
                                                    productArray.find(
                                                        (option: any) => option.id.toString() === selectProduct
                                                    ) || null
                                                }
                                                options={productArray}
                                                getOptionLabel={(option: any) => option.label}
                                                getOptionValue={(option: any) => option.id.toString()}
                                                onChange={(selectedOption: any) => {
                                                    setSelectProduct(selectedOption ? selectedOption.id.toString() : "");
                                                }}
                                                isSearchable
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-3 col-12">
                                        <Form.Label>Select Payment Type<span className="text-danger ms-1">*</span></Form.Label>
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

                                    <div className="col-md-2">
                                        <Button variant="success mt-4" onClick={handleFetchMRPProductWiseSaleReport2025}>
                                            Search                                       
                                        </Button>
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
                                            value={MRPProductWiseSaleReport2025PerPage}
                                            onChange={(e) =>
                                                setMRPProductWiseSaleReport2025PerPage(Number(e.target.value))
                                            }
                                            className="w-auto"
                                        >
                                            <option value="5">5 Items</option>
                                            <option value="10">10 Items</option>
                                            <option value="20">20 Items</option>
                                            <option value={MRPProductWiseSaleReport2025.length}>All Items</option>
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
                                            id="MRPProductWiseSaleReport2025-table"
                                            className="border text-nowrap text-md-nowrap table-hover mb-0"
                                        >
                                            <thead className="table-primary">
                                                <tr>
                                                    <th onClick={() => handleSort("")}>
                                                        Sr No
                                                    </th>
                                                    <th onClick={() => handleSort("franchise")}>
                                                        Franchise Name
                                                    </th>
                                                    <th onClick={() => handleSort("Zone")}>
                                                        Zone
                                                    </th>
                                                    <th onClick={() => handleSort("subZone ")}>
                                                        Sub Zone
                                                    </th>
                                                    <th onClick={() => handleSort("Product")}>
                                                        Product
                                                    </th>
                                                    <th onClick={() => handleSort("totalSell")}>
                                                        Total Sell
                                                    </th>
                                                    <th onClick={() => handleSort("purchaseAmount")}>
                                                        Purchase Amount
                                                    </th>
                                                    <th onClick={() => handleSort("sellAmount")}>
                                                        Sell Amount
                                                    </th>
                                                    <th onClick={() => handleSort("profitAmount")}>
                                                        Profit Amount
                                                    </th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentMRPProductWiseSaleReport2025.length > 0 ? (
                                                    currentMRPProductWiseSaleReport2025.map((mrpData: any) => (
                                                        <tr key={mrpData?.sr_no}>
                                                            <td>{mrpData?.sr_no}</td>
                                                            <td>{mrpData?.shop_name}</td>
                                                            <td>{mrpData?.zone}</td>
                                                            <td>{mrpData?.sub_zone}</td>
                                                            <td>{mrpData?.product_name}</td>
                                                            <td>{mrpData?.total_quantity_sold}</td>
                                                            <td>{mrpData?.total_purchase_cost}</td>
                                                            <td>{mrpData?.total_sales}</td>
                                                            <td>{mrpData?.profit}</td>

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
                                        Showing {indexOfFirstMRPProductWiseSaleReport2025 + 1} to{" "}
                                        {Math.min(
                                            indexOfLastMRPProductWiseSaleReport2025,
                                            MRPProductWiseSaleReport2025.length
                                        )}{" "}
                                        of {MRPProductWiseSaleReport2025.length} entries
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

export default ViewMRPProductWiseSaleReport2025;
