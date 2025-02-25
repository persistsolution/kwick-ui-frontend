import { FC, Fragment } from "react";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useTransferStockToCocoFr from "../../../Hook/GoDown-Hook/Transfer-Stock/useTransferStockToCocoFr";
import Select from "react-select";

const ViewTransferStockToCocoFr: FC = () => {
  const {
    indexOfLastTransferStockToCocoFr,
    indexOfFirstTransferStockToCocoFr,
    viewTransferStockToCocoFr,
    searchTerm,
    currentPage,
    viewTransferStockToCocoFrPerPage,
    totalPages,
    fromDate,
    toDate,
    FranchiseList,
    currentviewTransferStockToCocoFr,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    // handleDeleteTransferStockToCocoFr,
    // handleEdit,
    getVisiblePages,
    setviewTransferStockToCocoFrPerPage,
    setfromDate,
    settodate,
  } = useTransferStockToCocoFr();

  return (
    <Fragment>
      <Pageheader
        heading="Transfer Stock Godown To COCO Franchise"
        homepage="Products"
        activepage="Transfer Stock"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Body>
                <div className="row align-items-center g-2 mb-3">
                  <div className="col-md-3 col-12">
                    <Form.Group controlId="FranchiseList">
                      <Form.Label>Select Franchise</Form.Label>
                      <Select
                        name="state"
                        options={FranchiseList}
                        className="basic-multi-select "
                        isSearchable
                        menuPlacement="auto"
                        classNamePrefix="Select2"
                        defaultValue={[FranchiseList[0]]}
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-2 col-12">
                    <Form.Group controlId="fromDate">
                      <Form.Label> From Date</Form.Label>
                      <Form.Control
                        value={fromDate}
                        type="date"
                        onChange={(date: Date | any) => setfromDate(date)}
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-2 col-12">
                    <Form.Group controlId="toDate">
                      <Form.Label> To Date</Form.Label>
                      <Form.Control
                        value={toDate}
                        type="date"
                        onChange={(date: Date | any) => settodate(date)}
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
                      value={viewTransferStockToCocoFrPerPage}
                      onChange={(e) =>
                        setviewTransferStockToCocoFrPerPage(
                          Number(e.target.value)
                        )
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={viewTransferStockToCocoFr.length}>
                        All Items
                      </option>
                    </Form.Select>
                    <Button variant="success" onClick={exportToExcel}>
                      <i className="fe fe-download me-2"></i>Export to Excel
                    </Button>
                  </div>
                </div>

                <div className="table-responsive">
                  <Table
                    id="GodownAccount-table"
                    className="border text-nowrap text-md-nowrap table-hover mb-0"
                  >
                    <thead className="table-primary">
                      <tr>
                        <th onClick={() => handleSort("id")}>ID</th>
                        <th onClick={() => handleSort("goDown")}>Go Down</th>
                        <th onClick={() => handleSort("franchise")}>
                          Franchise{" "}
                        </th>
                        <th onClick={() => handleSort("transferDate")}>
                          Transfer Data{" "}
                        </th>
                        <th onClick={() => handleSort("totalQty")}>
                          Total Qty{" "}
                        </th>
                        <th onClick={() => handleSort("totalAmount")}>
                          Total Amount{" "}
                        </th>
                        <th onClick={() => handleSort("narration")}>
                          Narration{" "}
                        </th>
                        <th onClick={() => handleSort("createdDate")}>
                          Created Date{" "}
                        </th>
                        <th onClick={() => handleSort("invoicePrint")}>
                          Invoice Print{" "}
                        </th>
                        <th onClick={() => handleSort("print")}>Print </th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentviewTransferStockToCocoFr.length > 0 ? (
                        currentviewTransferStockToCocoFr.map(
                          (GodownAccount: any) => (
                            <tr key={GodownAccount.id}>
                              <td>{GodownAccount.id}</td>
                              <td>{GodownAccount.GodownName}</td>
                              <td></td>
                              <td>{GodownAccount.StockDate}</td>
                              <td>{GodownAccount.TotQty}</td>
                              <td>{GodownAccount.TotalAmount}</td>
                              <td>{GodownAccount.Narration}</td>
                              <td>{GodownAccount.CreatedDate}</td>
                              <td></td>
                              <td></td>
                              <td>
                                <button
                                  className="avatar rounded-circle bg-azure cursor-pointer border-0"
                                  // onClick={() => handelEditProduct(product.id)}
                                >
                                  <i className="bi bi-pen fs-15"></i>
                                </button>
                              </td>
                              <td>
                                <button
                                  className="avatar rounded-circle bg-pink cursor-pointer border-0"
                                  // onClick={() => handleDeleteProduct(product.id)}
                                >
                                  <i className="bi bi-trash fs-15"></i>
                                </button>
                              </td>
                            </tr>
                          )
                        )
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
                    Showing {indexOfFirstTransferStockToCocoFr + 1} to{" "}
                    {Math.min(
                      indexOfLastTransferStockToCocoFr,
                      viewTransferStockToCocoFr.length
                    )}{" "}
                    of {viewTransferStockToCocoFr.length} entries
                  </div>
                  <ul className="pagination pagination-sm mt-2 mt-md-0">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
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
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
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
                        className={`page-item ${
                          currentPage === pageNumber ? "active" : ""
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
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
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
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
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
