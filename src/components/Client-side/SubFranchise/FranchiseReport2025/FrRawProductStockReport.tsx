import { FC, Fragment } from "react";
//import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Form, Button } from "react-bootstrap";
import Select from "react-select";
import useFrRawProductStockReport from "../../../Hook/FranchiseReport2025/useFrRawProductStockReport";
import SkeletonLoader from "../../../../common/SkeletonLoader";

const FrRawProductStockReport: FC = () => {
    const {
        indexOfLastRawProductStockReport,
        indexOfFirstRawProductStockReport,
        filteredRawProductStockReport,
        searchTerm,
        currentPage,
        RawProductStockReportPerPage,
        totalPages,
        fromDate,
        toDate,
        currentRawProductStockReport,
        loading,
        handleSearch,
        handleSort,
        handlePageChange,
        getVisiblePages,
        setRawProductStockReportPerPage,
        setfromDate,
        settodate,
        exportToExcel,
        handelNavigateAllocatedProduct,
    } = useFrRawProductStockReport();

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
                                            value={RawProductStockReportPerPage}
                                            onChange={(e) =>
                                                setRawProductStockReportPerPage(Number(e.target.value))
                                            }
                                            className="w-auto"
                                        >
                                            <option value="5">5 Items</option>
                                            <option value="10">10 Items</option>
                                            <option value="20">20 Items</option>
                                            <option value={filteredRawProductStockReport.length}>
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
<SkeletonLoader loading={loading}/>
                                    ) : (
   <Table
                                        id="ViewRawProductStockReport-table"
                                        className="border text-nowrap text-md-nowrap table-hover mb-0"
                                    >
                                        <thead className="table-primary">
                                            <tr>
                                                <th onClick={() => handleSort("id")}>ID</th>
                                                <th onClick={() => handleSort("Fname")}>Raw Product Name </th>
                                                <th onClick={() => handleSort("id")}>Credit</th>
                                                <th onClick={() => handleSort("id")}>Debit</th>
                                                <th onClick={() => handleSort("id")}>Balance</th>
                                                <th onClick={() => handleSort("id")}>Unit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentRawProductStockReport?.length > 0 ? (
                                                currentRawProductStockReport?.map((products: any) => (
                                                    <tr key={products.id}>
                                                        <td>{products.id}</td>
                                                        <td>{products.Fname}</td>
                                                        <td>{products.ShopName}</td>
                                                        <td
                                                            className={
                                                                products.Roll === 1
                                                                    ? "text-warning"
                                                                    : products.Roll === 2
                                                                        ? "text-success"
                                                                        : "text-danger"
                                                            }
                                                        >
                                                            {products.Roll == 1
                                                                ? "COCO Franchise"
                                                                : products.Roll == 2
                                                                    ? "FOFO Franchise"
                                                                    : "Other Franchise"}
                                                        </td>
                                                        <td>{products.Phone}</td>
                                                        <td>
                                                            <button
                                                                onClick={() =>
                                                                    handelNavigateAllocatedProduct(products.id)
                                                                }
                                                                className="rounded-pill btn btn-primary-light"
                                                            >
                                                                Allocated Product
                                                            </button>
                                                        </td>
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
                                        Showing {indexOfFirstRawProductStockReport + 1} to{" "}
                                        {Math.min(
                                            indexOfLastRawProductStockReport,
                                            filteredRawProductStockReport.length
                                        )}{" "}
                                        of {filteredRawProductStockReport.length} entries
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

export default FrRawProductStockReport;
