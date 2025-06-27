import { FC, Fragment } from "react";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
// import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import Select from "react-select";
import SkeletonLoader from "../../../../common/SkeletonLoader";
import useFrCustomerproducts from "../../../Hook/CustomerProducts2025/useFrCustomerPrdts";

const FrCustomerproducts: FC = () => {
    const {
        indexOfLastFrCustomerproducts,
        indexOfFirstFrCustomerproducts,
        FrCustomerproducts,
        searchTerm,
        currentPage,
        FrCustomerproductsPerPage,
        totalPages,
        fromDate,
        toDate,
        vendorOptions,
        vendorId,
        loading,
        paymentTypeList,
        selectedPayment,
        currentFrCustomerproducts,
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
        setFrCustomerproductsPerPage,
        setVendorId
    } = useFrCustomerproducts();

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
                                            <Form.Label>Category </Form.Label>
                                            <Select
                                                id="selectCategory"
                                                name="selectCategory"
                                                value={
                                                    categoryList.find(
                                                        (option: any) => option.id.toString() === selectedCategory
                                                    ) || null
                                                }
                                                options={categoryList}
                                                getOptionLabel={(option) => option.label}
                                                getOptionValue={(option) => option.id.toString()}
                                                onChange={(selectedOption: any) => {
                                                    setSelectCategory(selectedOption ? selectedOption.id.toString() : "");
                                                }}
                                                required
                                                isSearchable
                                            />
                                        </Form.Group>
                                    </div>

                                     <div className="col-md-3 col-4">
                                        <Form.Group controlId="select">
                                            <Form.Label>Sub Category </Form.Label>
                                            <Select
                                                id="selectSubCategory"
                                                name="selectSubCategory"
                                                value={
                                                    categoryList.find(
                                                        (option: any) => option.id.toString() === selectedCategory
                                                    ) || null
                                                }
                                                options={categoryList}
                                                getOptionLabel={(option) => option.label}
                                                getOptionValue={(option) => option.id.toString()}
                                                onChange={(selectedOption: any) => {
                                                    setSelectCategory(selectedOption ? selectedOption.id.toString() : "");
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


                                    <div className="col-md-2 col-12 mt-4">
                                        <Button variant="success" className="me-2">
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
                                            value={FrCustomerproductsPerPage}
                                            onChange={(e) =>
                                                setFrCustomerproductsPerPage(Number(e.target.value))
                                            }
                                            className="w-auto"
                                        >
                                            <option value="5">5 Items</option>
                                            <option value="10">10 Items</option>
                                            <option value="20">20 Items</option>
                                            <option value={FrCustomerproducts.length}>All Items</option>
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
                                                    <th onClick={() => handleSort("barCode")}>Barcode No</th>
                                                    <th onClick={() => handleSort("category")}>Category</th>
                                                    <th onClick={() => handleSort("productName")}>Sub Category</th>
                                                    <th onClick={() => handleSort("productName")}>Product Type</th>
                                                    <th onClick={() => handleSort("productName")}>Purchase Price</th>
                                                    <th onClick={() => handleSort("productName")}>Price</th>
                                                    <th onClick={() => handleSort("productName")}>Status</th>
                                                    <th onClick={() => handleSort("productName")}>QR Display</th>
                                                    <th onClick={() => handleSort("productName")}>Register Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentFrCustomerproducts.length > 0 ? (
                                                    currentFrCustomerproducts.map((data: any) => (
                                                        <tr key={data.id}>
                                                            <td>{data.id}</td>
                                                            <td>{data.ProductName}</td>
                                                            <td>{data.BarcodeNo}</td>
                                                            <td>{data.Category}</td>
                                                            <td>{data.SubCategory}</td>
                                                            <td>{data.ProdType2}</td>
                                                            <td>{data.PurchasePrice}</td>
                                                            <td>{data.MinPrice}</td>
                                                            <td>{data.Status}</td>
                                                            <td>{data.QrDisplay}</td>
                                                            <td>{data.CreatedDate}</td>
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
                                        Showing {indexOfFirstFrCustomerproducts + 1} to{" "}
                                        {Math.min(indexOfLastFrCustomerproducts, FrCustomerproducts.length)} of{" "}
                                        {FrCustomerproducts.length} entries
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

export default FrCustomerproducts;
