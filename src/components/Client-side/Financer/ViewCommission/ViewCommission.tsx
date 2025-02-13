import { FC, Fragment } from "react";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useViewCommission from "../../../Hook/Financer-Hook/ViewCommission/useViewCommission";

const ViewCommission: FC = () => {
  const {
    indexOfLastCommission,
    indexOfFirstCommission,
    filteredCommission,
    searchTerm,
    currentPage,
    CommissionPerPage,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteCommission,
    handleEdit,
    getVisiblePages,
    setCommissionPerPage,
  } = useViewCommission();

  return (
    <Fragment>
      <Pageheader
        heading="View Commission Note"
        homepage="Products"
        activepage="View Commission Note"
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
                      value={CommissionPerPage}
                      onChange={(e) =>
                        setCommissionPerPage(Number(e.target.value))
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={filteredCommission.length}>
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
                        <th onClick={() => handleSort("id")}>Sr No</th>
                        <th onClick={() => handleSort("name")}>Financer</th>
                        <th onClick={() => handleSort("noteNo")}>Note No</th>
                        <th onClick={() => handleSort("noteDate")}>
                          Note Date
                        </th>
                        <th onClick={() => handleSort("descripition")}>
                          Descripition{" "}
                        </th>
                        <th onClick={() => handleSort("amount")}>Amount</th>
                        <th onClick={() => handleSort("narration")}>
                          Narration{" "}
                        </th>
                        <th onClick={() => handleSort("createdDate")}>
                          Created Date
                        </th>
                        <th onClick={() => handleSort("invoicePrint")}>
                          Invoice Print
                        </th>
                        <td>Edit</td>
                        <td>Delete</td>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCommission.length > 0 ? (
                        filteredCommission.map((category: any) => (
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
                                onClick={() => handleEdit()}
                              >
                                <i className="bi bi-pen fs-15"></i>
                              </span>
                            </td>
                            <td>
                              <span
                                className="avatar rounded-circle bg-pink cursor-pointer"
                                onClick={() =>
                                  handleDeleteCommission(category.id)
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
                    Showing {indexOfFirstCommission + 1} to{" "}
                    {Math.min(indexOfLastCommission, filteredCommission.length)}{" "}
                    of {filteredCommission.length} entries
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

export default ViewCommission;
