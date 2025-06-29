import { FC, Fragment } from "react";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
// import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import Select from "react-select";
import SkeletonLoader from "../../../../common/SkeletonLoader";
import useFrDownloadCustomerPrdts from "../../../Hook/CustomerProducts2025/useFrDownloadCustomerPrdts";

const FrDownloadCustomerPrdts: FC = () => {
    const {
        indexOfLastFrDownloadCustomerPrdts,
        indexOfFirstFrDownloadCustomerPrdts,
        FrDownloadCustomerPrdts,
        searchTerm,
        currentPage,
        FrDownloadCustomerPrdtsPerPage,
        totalPages,
        fromDate,
        toDate,
        vendorOptions,
        vendorId,
        loading,
        paymentTypeList,
        selectedPayment,
        currentFrDownloadCustomerPrdts,
        setSelectPayment,
        categoryList,
        setSelectCategory,
        selectedCategory,
        subCategoryList,
        setSelectSubCategory,
        selectedSubCategory,
        handleSearch,
        setfromDate,
        settodate,
        handleSort,
        handlePageChange,
        exportToExcel,
        getVisiblePages,
        setFrDownloadCustomerPrdtsPerPage,
        setVendorId
    } = useFrDownloadCustomerPrdts();

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
                                            value={FrDownloadCustomerPrdtsPerPage}
                                            onChange={(e) =>
                                                setFrDownloadCustomerPrdtsPerPage(Number(e.target.value))
                                            }
                                            className="w-auto"
                                        >
                                            <option value="5">5 Items</option>
                                            <option value="10">10 Items</option>
                                            <option value="20">20 Items</option>
                                            <option value={FrDownloadCustomerPrdts.length}>All Items</option>
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
                                            id="customerproducts-table"
                                            className="border text-nowrap text-md-nowrap table-hover mb-0"
                                        >
                                            <thead className="table-primary">

                                                <tr>
                                                    <th onClick={() => handleSort("id")}>Id</th>
                                                    <th onClick={() => handleSort("productName")}>Product name</th>
                                                    <th onClick={() => handleSort("productId")}>Product Id</th>
                                                    <th onClick={() => handleSort("barCode")}>Barcode No</th>
                                                    <th onClick={() => handleSort("qty")}>Qty</th>
                                                    <th onClick={() => handleSort("purchasePrice")}>Purchase Price</th>
                                                    <th onClick={() => handleSort("sellPrice")}>Sell Price</th>
                                                    <th onClick={() => handleSort("date")}>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentFrDownloadCustomerPrdts.length > 0 ? (
                                                    currentFrDownloadCustomerPrdts.map((data: any) => (
                                                        <tr key={data.id}>
                                                            <td>{data.id}</td>
                                                            <td>{data.ProductName}</td>
                                                            <td>{data.ProductId}</td>
                                                            <td>{data.BarcodeNo}</td>
                                                            <td>{data.MinPrice}</td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
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
                                        Showing {indexOfFirstFrDownloadCustomerPrdts + 1} to{" "}
                                        {Math.min(indexOfLastFrDownloadCustomerPrdts, FrDownloadCustomerPrdts.length)} of{" "}
                                        {FrDownloadCustomerPrdts.length} entries
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

export default FrDownloadCustomerPrdts;
