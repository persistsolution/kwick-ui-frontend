import { FC, Fragment } from "react";
//import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import Select from "react-select";
import useViewCategoryWiseSaleReport2025 from "../../Hook/FranchiseReports2025/useViewCategoryWiseSaleReport2025";
import SkeletonLoader from "../../../common/SkeletonLoader";

const ViewCategoryWiseSaleReport2025: FC = () => {
    const {
        indexOfLastCategoryWiseSaleReport2025,
        indexOfFirstCategoryWiseSaleReport2025,
        CategoryWiseSaleReport2025,
        searchTerm,
        currentPage,
        CategoryWiseSaleReport2025PerPage,
        totalPages,
        countryArray,
        selectState,
        fromDate,
        toDate,
        franchiseArray,
        selectFranchise,
        godownProductArray,
        selectFranchiseProduct,
        selectCategory,
        categoryArray,
        currentCategoryWiseSaleReport2025,
        loading,
        setSelectCategory,
        handleSearch,
        handleSort,
        handlePageChange,
        exportToExcel,
        getVisiblePages,
        setCategoryWiseSaleReport2025PerPage,
        setSelectState,
        setfromDate,
        settodate,
        setSelectFranchise,
        setSelectFranchiseProduct
    } = useViewCategoryWiseSaleReport2025();

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
                                        <Form.Label>Select Category<span className="text-danger ms-1">*</span></Form.Label>
                                        <Form.Group>
                                            <Select
                                                id="category"
                                                name="category"
                                                value={
                                                    categoryArray.find(
                                                        (option: any) => option.id.toString() === selectCategory
                                                    ) || null
                                                }
                                                options={categoryArray}
                                                getOptionLabel={(option: any) => option.label}
                                                getOptionValue={(option: any) => option.id.toString()}
                                                onChange={(selectedOption: any) => {
                                                    setSelectCategory(selectedOption ? selectedOption.id.toString() : "");
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
                                            value={CategoryWiseSaleReport2025PerPage}
                                            onChange={(e) =>
                                                setCategoryWiseSaleReport2025PerPage(Number(e.target.value))
                                            }
                                            className="w-auto"
                                        >
                                            <option value="5">5 Items</option>
                                            <option value="10">10 Items</option>
                                            <option value="20">20 Items</option>
                                            <option value={CategoryWiseSaleReport2025.length}>All Items</option>
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
                                            id="CategoryWiseSaleReport2025-table"
                                            className="border text-nowrap text-md-nowrap table-hover mb-0"
                                        >
                                            <thead className="table-primary">
                                                <tr>
                                                    <th onClick={() => handleSort("srNo")}>
                                                        Sr No
                                                    </th>
                                                    <th onClick={() => handleSort("franchise")}>
                                                        Franchise Name
                                                    </th>
                                                    <th onClick={() => handleSort("Category")}>
                                                        Category
                                                    </th>
                                                    <th onClick={() => handleSort("totalSell")}>
                                                        Total Sell
                                                    </th>
                                                    <th onClick={() => handleSort("Amount")}>
                                                        Amount
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentCategoryWiseSaleReport2025?.length > 0 ? (
                                                    currentCategoryWiseSaleReport2025?.map((catData: any) => (
                                                        <tr key={catData?.sr_no}>
                                                            <td>{catData?.sr_no}</td>
                                                            <td>{catData?.created_by}</td>
                                                            <td>{catData?.category_name}</td>
                                                            <td>{catData?.total_products_sold}</td>
                                                            <td>{catData?.total_sales_amount}</td>

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
                                        Showing {indexOfFirstCategoryWiseSaleReport2025 + 1} to{" "}
                                        {Math.min(
                                            indexOfLastCategoryWiseSaleReport2025,
                                            CategoryWiseSaleReport2025.length
                                        )}{" "}
                                        of {CategoryWiseSaleReport2025.length} entries
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

export default ViewCategoryWiseSaleReport2025;
