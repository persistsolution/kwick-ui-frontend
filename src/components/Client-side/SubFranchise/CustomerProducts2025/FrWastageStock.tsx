import { FC, Fragment } from "react";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
// import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import Select from "react-select";
import SkeletonLoader from "../../../../common/SkeletonLoader";
import useFrWastageStock from "../../../Hook/CustomerProducts2025/useFrWastageStock";

const FrWastageStock: FC = () => {
    const {
        indexOfLastFrWastageStock,
        indexOfFirstFrWastageStock,
        FrWastageStock,
        searchTerm,
        currentPage,
        FrWastageStockPerPage,
        totalPages,
        fromDate,
        toDate,
        vendorOptions,
        vendorId,
        loading,
        paymentTypeList,
        selectedPayment,
        currentFrWastageStock,
        setSelectPayment,
        ProductsList,
        setSelectProducts,
        selectedProducts,
        handleSearch,
        setfromDate,
        settodate,
        handleSort,
        handlePageChange,
        exportToExcel,
        getVisiblePages,
        setFrWastageStockPerPage,
        setVendorId,
        handleFetchFrWastageStock
    } = useFrWastageStock();

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
                                        <Form.Group controlId="select">
                                            <Form.Label>Products </Form.Label>
                                            <Select
                                                id="selectProducts"
                                                name="selectProducts"
                                                value={
                                                    ProductsList.find(
                                                        (option: any) => option.id.toString() === selectedProducts
                                                    ) || null
                                                }
                                                options={ProductsList}
                                                getOptionLabel={(option) => option.label}
                                                getOptionValue={(option) => option.id.toString()}
                                                onChange={(selectedOption: any) => {
                                                    setSelectProducts(selectedOption ? selectedOption.id.toString() : "");
                                                }}
                                                required
                                                isSearchable
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-3 col-4">
                                        <Form.Group controlId="fromDate">
                                            <Form.Label>From Date </Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={fromDate ? fromDate.toISOString().split('T')[0] : ''}
                                                onChange={(e) => setfromDate(e.target.value ? new Date(e.target.value) : null)}
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-3 col-6">
                                        <Form.Group controlId="toDate">
                                            <Form.Label>To Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={toDate ? toDate.toISOString().split('T')[0] : ''}
                                                onChange={(e) => settodate(e.target.value ? new Date(e.target.value) : null)}
                                            />
                                        </Form.Group>
                                    </div>


                                    <div className="col-md-2 col-12 mt-4">
                                        <Button variant="success" className="me-2" onClick={handleFetchFrWastageStock}>
                                            Search
                                        </Button>
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
                                            value={FrWastageStockPerPage}
                                            onChange={(e) =>
                                                setFrWastageStockPerPage(Number(e.target.value))
                                            }
                                            className="w-auto"
                                        >
                                            <option value="5">5 Items</option>
                                            <option value="10">10 Items</option>
                                            <option value="20">20 Items</option>
                                            <option value={FrWastageStock.length}>All Items</option>
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
                                                    <th onClick={() => handleSort("")}>#</th>
                                                    <th onClick={() => handleSort("id")}>Product Id</th>
                                                    <th onClick={() => handleSort("productName")}>Product name</th>
                                                    <th onClick={() => handleSort("barCode")}>Date</th>
                                                    <th onClick={() => handleSort("StockInQty")}>Stock In Qty</th>
                                                    <th onClick={() => handleSort("")}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentFrWastageStock.length > 0 ? (
                                                    currentFrWastageStock.map((data: any) => (
                                                        <tr key={data.id}>
                                                            <td>{data.id}</td>

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
                                        Showing {indexOfFirstFrWastageStock + 1} to{" "}
                                        {Math.min(indexOfLastFrWastageStock, FrWastageStock.length)} of{" "}
                                        {FrWastageStock.length} entries
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

export default FrWastageStock;
