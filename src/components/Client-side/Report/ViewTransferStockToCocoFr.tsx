import { FC, Fragment } from "react";
//import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import Select from "react-select";
import useTransferStockToCocoFr from "../../Hook/Report-Hook/useTransferStockToCocoFranchise";
import SkeletonLoader from "../../../common/SkeletonLoader";

const ViewTransferStockToCocoFr: FC = () => {
    const {
        indexOfLastTransferStockToCocoFr,
        indexOfFirstTransferStockToCocoFr,
        TransferStockToCocoFr,
        searchTerm,
        currentPage,
        TransferStockToCocoFrPerPage,
        totalPages,
        countryArray,
        selectState,
        fromDate,
        toDate,
        franchiseArray,
        selectFranchise,
        godownProductArray,
        selectFranchiseProduct,
        loading,
        currentTransferStockToCocoFr,
        handleSearch,
        handleSort,
        handlePageChange,
        exportToExcel,
        getVisiblePages,
        setTransferStockToCocoFrPerPage,
        setSelectState,
        setfromDate,
        settodate,
        setSelectFranchise,
        setSelectFranchiseProduct
    } = useTransferStockToCocoFr();

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
                                        <Form.Label>Select Franchise</Form.Label>
                                        <Form.Group>
                                            <Select
                                                id="godown"
                                                name="godown"
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

                                    <div className="col-md-2 col-6">
                                        <Form.Group controlId="fromDate">
                                            <Form.Label>From Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={fromDate}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setfromDate(e.target.value)}
                                            />
                                        </Form.Group>
                                    </div>


                                    <div className="col-md-2 col-6">
                                        <Form.Group controlId="toDate">
                                            <Form.Label>To Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={toDate}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => settodate(e.target.value)}
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
                                            value={TransferStockToCocoFrPerPage}
                                            onChange={(e) =>
                                                setTransferStockToCocoFrPerPage(Number(e.target.value))
                                            }
                                            className="w-auto"
                                        >
                                            <option value="5">5 Items</option>
                                            <option value="10">10 Items</option>
                                            <option value="20">20 Items</option>
                                            <option value={TransferStockToCocoFr.length}>All Items</option>
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
                                            id="TransferStockToCocoFr-table"
                                            className="border text-nowrap text-md-nowrap table-hover mb-0"
                                        >
                                            <thead className="table-primary">
                                                <tr>
                                                    <th onClick={() => handleSort("")}>
                                                        Sr No
                                                    </th>
                                                    <th onClick={() => handleSort("godown")}>
                                                        Go-Down
                                                    </th>
                                                    <th onClick={() => handleSort("franchise")}>
                                                        Franchise
                                                    </th>
                                                    <th onClick={() => handleSort("transferData")}>
                                                        Transfer date
                                                    </th>
                                                    <th onClick={() => handleSort("item")}>
                                                        {" "}
                                                        Item
                                                    </th>
                                                    <th onClick={() => handleSort("qty")}>
                                                        Qty
                                                    </th>
                                                    <th onClick={() => handleSort("rate")}>
                                                        Rate
                                                    </th>
                                                    <th onClick={() => handleSort("gst")}>
                                                        GST
                                                    </th>
                                                    <th onClick={() => handleSort("amount")}>
                                                        Amount
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentTransferStockToCocoFr?.length > 0 ? (
                                                    currentTransferStockToCocoFr?.map((data: any) => (
                                                        <tr key={data?.id}>
                                                            <td>{data?.sno}</td>
                                                            <td>{data?.godown_name}</td>
                                                            <td>{data?.franchise_name}</td>
                                                            <td>{data?.stock_date}</td>
                                                            <td>{data?.product_name}</td>
                                                            <td>{data?.quantity}</td>
                                                            <td>{data?.price}</td>
                                                            <td>{data?.gst_amount}</td>
                                                            <td>{data?.total_price}</td>
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
                                        Showing {indexOfFirstTransferStockToCocoFr + 1} to{" "}
                                        {Math.min(
                                            indexOfLastTransferStockToCocoFr,
                                            TransferStockToCocoFr.length
                                        )}{" "}
                                        of {TransferStockToCocoFr.length} entries
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

export default ViewTransferStockToCocoFr;
