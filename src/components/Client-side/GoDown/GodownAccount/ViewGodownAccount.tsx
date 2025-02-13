import { FC, Fragment } from "react";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useViewGodownAccount from "../../../Hook/GoDown-Hook/CreateGodownAccount/useViewGodownAccount";

const ViewGodownAccount: FC = () => {
  const {
    indexOfLastGodownAccount,
    indexOfFirstGodownAccount,
    filteredviewGodownAccount,
    searchTerm,
    currentPage,
    viewGodownAccountPerPage,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    // handleDeleteGodownAccount,
    // handleEdit,
    getVisiblePages,
    setviewGodownAccountPerPage,
  } = useViewGodownAccount();

  return (
    <Fragment>
      <Pageheader
        heading="View Godown Account"
        homepage="Products"
        activepage="View Godown Account"
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
                      value={viewGodownAccountPerPage}
                      onChange={(e) =>
                        setviewGodownAccountPerPage(Number(e.target.value))
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={filteredviewGodownAccount.length}>
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
                        <th onClick={() => handleSort("photo")}>Photo</th>
                        <th onClick={() => handleSort("ShopName")}>
                          Shop Name
                        </th>
                        <th onClick={() => handleSort("GoDownName")}>
                          GoDown Name{" "}
                        </th>
                        <th onClick={() => handleSort("Email")}>Email </th>
                        <th onClick={() => handleSort("ContactNo")}>
                          Contact No
                        </th>
                        <th onClick={() => handleSort("AnotherContactNo")}>
                          Another Contact No
                        </th>
                        <th onClick={() => handleSort("Address")}>Address </th>
                        <th onClick={() => handleSort("Status")}>Status </th>
                        <th onClick={() => handleSort("RegisterDate")}>
                          Register Date{" "}
                        </th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredviewGodownAccount.length > 0 ? (
                        filteredviewGodownAccount.map((GodownAccount: any) => (
                          <tr key={GodownAccount.id}></tr>
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
                    Showing {indexOfFirstGodownAccount + 1} to{" "}
                    {Math.min(
                      indexOfLastGodownAccount,
                      filteredviewGodownAccount.length
                    )}{" "}
                    of {filteredviewGodownAccount.length} entries
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

export default ViewGodownAccount;
