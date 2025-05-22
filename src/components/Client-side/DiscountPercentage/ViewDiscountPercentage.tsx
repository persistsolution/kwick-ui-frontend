import { FC, Fragment } from "react";
//import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useViewDiscountPercentage from "../../Hook/DiscountPercentage/useViewDiscountPercentage";
import AddDiscountPercentageModal from "./AddDiscountPercentageModal";

const ViewDiscountPercentage: FC = () => {
    const {
        indexOfLastDiscountPercentage,
        indexOfFirstDiscountPercentage,
        DiscountPercentage,
        searchTerm,
        currentPage,
        DiscountPercentagePerPage,
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
        toggleAddDiscountPercentage,
        setSelectPaymentType,
        setSelectReport,
        handleSearch,
        handleSort,
        handlePageChange,
        exportToExcel,
        getVisiblePages,
        setDiscountPercentagePerPage,
        setSelectState,
        setfromDate,
        settodate,
        setSelectFranchise,
        setSelectFranchiseProduct,
        modalAddDiscountPercentage,
        handelfetchDiscount,

    } = useViewDiscountPercentage();

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
                                            value={DiscountPercentagePerPage}
                                            onChange={(e) =>
                                                setDiscountPercentagePerPage(Number(e.target.value))
                                            }
                                            className="w-auto"
                                        >
                                            <option value="5">5 Items</option>
                                            <option value="10">10 Items</option>
                                            <option value="20">20 Items</option>
                                            <option value={DiscountPercentage.length}>All Items</option>
                                        </Form.Select>
                                        <Button variant="success" onClick={modalAddDiscountPercentage}>
                                            Add More                                        
                                        </Button>
                                        <Button variant="success" onClick={exportToExcel}>
                                            <i className="fe fe-download me-2"></i>Export to Excel
                                        </Button>
                                    </div>
                                </div>

                                <div className="table-responsive">
                                    <Table
                                        id="DiscountPercentage-table"
                                        className="border text-nowrap text-md-nowrap table-hover mb-0"
                                    >
                                        <thead className="table-primary">
                                            <tr>
                                                <th onClick={() => handleSort("srNo")}>
                                                    Sr No
                                                </th>
                                                <th onClick={() => handleSort("discount")}>
                                                    Discount %
                                                </th>
                                                <th onClick={() => handleSort("invoiveDate")}>
                                                    Invoice Date
                                                </th>
                                                <th onClick={() => handleSort("")}>
                                                    Edit
                                                </th>
                                                <th onClick={() => handleSort("")}>
                                                    Delete
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {DiscountPercentage.length > 0 ? (
                                                DiscountPercentage.map((DiscountPercentage: any) => (
                                                    <tr key={DiscountPercentage.id}></tr>
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
                                        Showing {indexOfFirstDiscountPercentage + 1} to{" "}
                                        {Math.min(
                                            indexOfLastDiscountPercentage,
                                            DiscountPercentage.length
                                        )}{" "}
                                        of {DiscountPercentage.length} entries
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
            {/* Add Discount Percentage */}
            <AddDiscountPercentageModal
                modalAddDiscountPercentage={modalAddDiscountPercentage}
                toggleAddDiscountPercentage={toggleAddDiscountPercentage}
                handelfetchDiscount={handelfetchDiscount}
            />
        </Fragment>
    );
};

export default ViewDiscountPercentage;
