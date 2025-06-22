import { FC, Fragment } from "react";
import { Card, Col, Row, Table, Form } from "react-bootstrap";
//import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import useRequestSellingProduct from "../../Hook/RequestSellingProduct/useRequestSellingProduct";
import SkeletonLoader from "../../../common/SkeletonLoader";

const ViewRequestSellingProduct: FC = () => {
    const {
        indexOfLastRequestSellingProduct,
        indexOfFirstRequestSellingProduct,
        RequestSellingProduct,
        searchTerm,
        currentPage,
        RequestSellingProductPerPage,
        currentRequestSellingProduct,
        totalPages,
        loading,
        handleSearch,
        handleSort,
        handlePageChange,
        // exportToExcel,
        getVisiblePages,
        setRequestSellingProductPerPage,
    } = useRequestSellingProduct();

    return (
        <Fragment>
            {/* <Pageheader 
        heading="Commission Note"
        homepage="Dashboard"
        activepage="Commission Note"
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
                                            value={RequestSellingProductPerPage}
                                            onChange={(e) =>
                                                setRequestSellingProductPerPage(Number(e.target.value))
                                            }
                                            className="w-auto"
                                        >
                                            <option value="5">5 Items</option>
                                            <option value="10">10 Items</option>
                                            <option value="20">20 Items</option>
                                            <option value={RequestSellingProduct.length}>All Items</option>
                                        </Form.Select>
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
                                                    <th onClick={() => handleSort("srNo")}>Sr No</th>
                                                    <th onClick={() => handleSort("Approve")}>
                                                        Approve
                                                    </th>
                                                    <th onClick={() => handleSort("invoiceNo")}>Invoice No </th>
                                                    <th onClick={() => handleSort("Franchise")}>
                                                        Franchise
                                                    </th>
                                                    <th onClick={() => handleSort("RequestDate")}>
                                                        Request Date{" "}
                                                    </th>
                                                    <th onClick={() => handleSort("totalProduct")}>
                                                        Total Product
                                                    </th>
                                                    <th onClick={() => handleSort("approve")}>
                                                        Approve
                                                    </th>
                                                    <th onClick={() => handleSort("pending")}>
                                                        Pending
                                                    </th>
                                                    <th onClick={() => handleSort("narration")}>
                                                        Narration
                                                    </th>
                                                    <th onClick={() => handleSort("bill")}>
                                                        Bill
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentRequestSellingProduct?.length > 0 ? (
                                                    currentRequestSellingProduct?.map((data: any) => (
                                                        <tr key={data?.id}>
                                                            <td>{data?.inv_id}</td>
                                                            <td>{data?.status}</td>
                                                            <td>{data?.inv_no}</td>
                                                            <td>{data?.shop_name}</td>
                                                            <td>{data?.stock_date}</td>
                                                            <td>{data?.total_items}</td>
                                                            <td>{data?.approved_items}</td>
                                                            <td>{data?.pending_items}</td>
                                                            <td>{data?.narration}</td>
                                                            <td>{data?.bill_link? data?.bill_link : "No Bill Found"}</td>
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
                                        Showing {indexOfFirstRequestSellingProduct + 1} to{" "}
                                        {Math.min(indexOfLastRequestSellingProduct, RequestSellingProduct.length)}{" "}
                                        of {RequestSellingProduct.length} entries
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

export default ViewRequestSellingProduct;
