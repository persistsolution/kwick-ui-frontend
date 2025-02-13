import { FC, Fragment } from "react";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useViewSellToRetailer from "../../../Hook/Retailer-Hook/ViewSellToRetailer/useViewSellToRetailer";

const ViewSellToRetailer: FC = () => {
  const {
    indexOfLastRetailer,
    indexOfFirstRetailer,
    filteredRetailers,
    searchTerm,
    currentPage,
    RetailersPerPage,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteRetailer,
    handleEdit,
    getVisiblePages,
    setRetailersPerPage,
  } = useViewSellToRetailer();

  return (
    <Fragment>
      <Pageheader
        heading="Sell To Retailer"
        homepage="Products"
        activepage="Sell To Retailer"
      />

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
                      value={RetailersPerPage}
                      onChange={(e) =>
                        setRetailersPerPage(Number(e.target.value))
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={filteredRetailers.length}>
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
                    id="retailer-table"
                    className="border text-nowrap text-md-nowrap table-hover mb-0"
                  >
                    <thead className="table-primary">
                      <tr>
                        <th onClick={() => handleSort("id")}>ID</th>
                        <th onClick={() => handleSort("goDown")}>Go Down</th>
                        <th onClick={() => handleSort("retailer")}>Retailer</th>
                        <th onClick={() => handleSort("transferdate")}>
                          Transfer Date
                        </th>
                        <th onClick={() => handleSort("totalqty")}>
                          Total Qty
                        </th>
                        <th onClick={() => handleSort("totalAmount")}>
                          Total Amount{" "}
                        </th>
                        <th onClick={() => handleSort("narration")}>
                          Narration
                        </th>
                        <th onClick={() => handleSort("createddate")}>
                          Created Date
                        </th>
                        <th>Invoice Print</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRetailers.length > 0 ? (
                        filteredRetailers.map((category: any) => (
                          <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>
                              <img
                                className="avatar rounded-pill cover-image"
                                src={category.Photo}
                                alt={category.name || "Category Image"}
                              />
                            </td>
                            <td>{category.Name}</td>
                            <td>{category.srno}</td>
                            <td
                              className={`${
                                parseInt(category.Status) === 1
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {parseInt(category.Status) === 1
                                ? "Active"
                                : "In Active"}
                            </td>
                            <td>
                              <span
                                className="avatar rounded-circle bg-azure cursor-pointer"
                                onClick={() => handleEdit(category.id)}
                              >
                                <i className="bi bi-pen fs-15"></i>
                              </span>
                            </td>
                            <td>
                              <span
                                className="avatar rounded-circle bg-pink cursor-pointer"
                                onClick={() =>
                                  handleDeleteRetailer(category.id)
                                }
                              >
                                <i className="bi bi-trash fs-15"></i>
                              </span>
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
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                  <div>
                    Showing {indexOfFirstRetailer + 1} to{" "}
                    {Math.min(indexOfLastRetailer, filteredRetailers.length)} of{" "}
                    {filteredRetailers.length} entries
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

export default ViewSellToRetailer;
