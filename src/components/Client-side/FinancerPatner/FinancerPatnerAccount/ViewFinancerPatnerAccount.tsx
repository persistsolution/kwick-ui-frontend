import { FC, Fragment } from "react";
import { Card, Col, Row, Table, Form } from "react-bootstrap";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import useFinancerPatnerAccount from "../../../Hook/FinancerPatner-Hook/FinancerPatnerAccount/useFinancerPatnerAccount";

const ViewFinancerPatnerAccount: FC = () => {
  const {
    indexOfLastFinancerPatnerAccount,
    indexOfFirstFinancerPatnerAccount,
    FinancerPatnerAccount,
    searchTerm,
    currentPage,
    FinancerPatnerAccountPerPage,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    // exportToExcel,
    getVisiblePages,
    setFinancerPatnerAccountPerPage,
  } = useFinancerPatnerAccount();

  return (
    <Fragment>
      <Pageheader
        heading="View Financer Account ist"
        homepage="Dashboard"
        activepage="View Financer Account List"
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
                      value={FinancerPatnerAccountPerPage}
                      onChange={(e) =>
                        setFinancerPatnerAccountPerPage(Number(e.target.value))
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={FinancerPatnerAccount.length}>
                        All Items
                      </option>
                    </Form.Select>
                  </div>
                </div>

                <div className="table-responsive">
                  <Table
                    id="franchise-table"
                    className="border text-nowrap text-md-nowrap table-hover mb-0"
                  >
                    <thead className="table-primary">
                      <tr>
                        <th onClick={() => handleSort("photo")}>Photo</th>
                        <th onClick={() => handleSort("financerName")}>
                          Franchise Name
                        </th>
                        <th onClick={() => handleSort("contactNo")}>
                          Contact No{" "}
                        </th>
                        <th onClick={() => handleSort("emailId")}>Email Id </th>
                        <th onClick={() => handleSort("address")}>Address </th>
                        <th onClick={() => handleSort("status")}>status </th>
                        <th onClick={() => handleSort("registerDate")}>
                          Register Date{" "}
                        </th>
                        <th onClick={() => handleSort("status")}>Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {FinancerPatnerAccount.length > 0 ? (
                        FinancerPatnerAccount.map((franchise: any) => (
                          <tr key={franchise.id}></tr>
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
                    Showing {indexOfFirstFinancerPatnerAccount + 1} to{" "}
                    {Math.min(
                      indexOfLastFinancerPatnerAccount,
                      FinancerPatnerAccount.length
                    )}{" "}
                    of {FinancerPatnerAccount.length} entries
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

export default ViewFinancerPatnerAccount;
