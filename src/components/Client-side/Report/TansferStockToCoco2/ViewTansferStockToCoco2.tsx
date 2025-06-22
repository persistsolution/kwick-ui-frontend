import { FC, Fragment } from "react";
//import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import Select from "react-select";
import useTransferPrdToCocoFr2 from "../../../Hook/Report-Hook/TansferStockToCoco2/useViewTansferStockToCoco2";
import SkeletonLoader from "../../../../common/SkeletonLoader";

const ViewTransferPrdToCocoFr2: FC = () => {
    const {
        indexOfLastTransferPrdToCocoFr2,
        indexOfFirstTransferPrdToCocoFr2,
        TransferPrdToCocoFr2,
        filteredTransferPrdToCocoFr2,
        searchTerm,
        currentPage,
        TransferPrdToCocoFr2PerPage,
        sortConfig,
        currentTransferPrdToCocoFr2,
        totalPages,
        franchiseList,
        categoryList,
        fromDate,
        toDate,
        countryArray,
        selectState,
        franchiseArray,
        selectFranchise,
        selectFranchiseProduct,
        godownProductArray,
        loading,
        handleSearch,
        handelAddStock,
        settodate,
        setfromDate,
        handleSort,
        handlePageChange,
        exportToExcel,
        getVisiblePages,
        setTransferPrdToCocoFr2PerPage,
        setfranchiseList,
        setcategoryList,
        setSelectState,
        setSelectFranchise,
        setSelectFranchiseProduct
    } = useTransferPrdToCocoFr2();

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
                                            value={TransferPrdToCocoFr2PerPage}
                                            onChange={(e) =>
                                                setTransferPrdToCocoFr2PerPage(Number(e.target.value))
                                            }
                                            className="w-auto"
                                        >
                                            <option value="5">5 Items</option>
                                            <option value="10">10 Items</option>
                                            <option value="20">20 Items</option>
                                            <option value={TransferPrdToCocoFr2.length}>All Items</option>
                                        </Form.Select>
                                        <Button variant="success" onClick={handelAddStock}>
                                            Add New                                        </Button>
                                        <Button variant="success" onClick={exportToExcel}>
                                            <i className="fe fe-download me-2"></i>Export to Excel
                                        </Button>
                                    </div>
                                </div>

                                <div className="table-responsive">
                                    {
                                        loading ? (
                                            <SkeletonLoader loading={loading} />
                                        ) : (
                                            <Table
                                                id="TransferPrdToCocoFr2-table"
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
                                                        <th onClick={() => handleSort("transferDate")}>
                                                            Transfer Date
                                                        </th>
                                                        <th onClick={() => handleSort("totalQty")}>
                                                            Total Qty
                                                        </th>
                                                        <th onClick={() => handleSort("totalAmt")}>
                                                            Total Amount
                                                        </th>
                                                        <th onClick={() => handleSort("narration")}>
                                                            Narration
                                                        </th>
                                                        <th onClick={() => handleSort("createdDate")}>
                                                            Created Date
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentTransferPrdToCocoFr2?.length > 0 ? (
                                                        currentTransferPrdToCocoFr2?.map((data: any) => (
                                                            <tr key={data?.id}>
                                                                <td>{data?.sno}</td>
                                                                <td>{data?.godown_name}</td>
                                                                <td>{data?.franchise_name}</td>
                                                                <td>{data?.stock_date}</td>
                                                                <td>{data?.total_qty}</td>
                                                                <td>{data?.total_amount}</td>
                                                                <td>{data?.narration}</td>
                                                                <td>{data?.created_date}</td>
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
                                        )
                                    }

                                </div>

                                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                                    <div>
                                        Showing {indexOfFirstTransferPrdToCocoFr2 + 1} to{" "}
                                        {Math.min(
                                            indexOfLastTransferPrdToCocoFr2,
                                            TransferPrdToCocoFr2.length
                                        )}{" "}
                                        of {TransferPrdToCocoFr2.length} entries
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

export default ViewTransferPrdToCocoFr2;
