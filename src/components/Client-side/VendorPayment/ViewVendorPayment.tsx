import { FC, Fragment } from "react";
import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useViewVendorPayments from "../../Hook/VendorPayment-Hook/useViewVendorPayment";

const ViewVendorPayment: FC = () => {
  const {
    indexOfLastVendorPayments,
    indexOfFirstVendorPayments,
    filteredVendorPaymentss,
    searchTerm,
    currentPage,
    VendorPaymentssPerPage,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteVendorPayments,
    handleEdit,
    getVisiblePages,
    setVendorPaymentssPerPage,
  } = useViewVendorPayments();

  return (
    <Fragment>
      <Pageheader
        heading="View Receive Amount"
        homepage="Products"
        activepage="View Receive Amount"
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
                      value={VendorPaymentssPerPage}
                      onChange={(e) =>
                        setVendorPaymentssPerPage(Number(e.target.value))
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={filteredVendorPaymentss.length}>
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
                    id="VendorPayments-table"
                    className="border text-nowrap text-md-nowrap table-hover mb-0"
                  >
                    <thead className="table-primary">
                      <tr>
                        <th onClick={() => handleSort("id")}>ID</th>
                        <th onClick={() => handleSort("action")}>Action</th>
                        <th onClick={() => handleSort("voucherNo")}>
                          Voucher No{" "}
                        </th>
                        <th onClick={() => handleSort("invoiceNo")}>
                          Invoice No{" "}
                        </th>
                        <th onClick={() => handleSort("paymentDate")}>
                          Payment Date
                        </th>
                        <th onClick={() => handleSort("custometDate")}>
                          Customet Name{" "}
                        </th>
                        <th onClick={() => handleSort("status")}>Amount</th>
                        <th onClick={() => handleSort("paymentDate")}>
                          Payment Date{" "}
                        </th>
                        <th onClick={() => handleSort("Name")}>Edit</th>
                        <th onClick={() => handleSort("Name")}>Delet</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVendorPaymentss.length > 0 ? (
                        filteredVendorPaymentss.map((category: any) => (
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
                                  handleDeleteVendorPayments(category.id)
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
                    Showing {indexOfFirstVendorPayments + 1} to{" "}
                    {Math.min(
                      indexOfLastVendorPayments,
                      filteredVendorPaymentss.length
                    )}{" "}
                    of {filteredVendorPaymentss.length} entries
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

export default ViewVendorPayment;
