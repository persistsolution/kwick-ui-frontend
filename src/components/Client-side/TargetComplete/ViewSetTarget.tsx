import { FC, Fragment } from "react";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import useViewSetTarget from "../../Hook/TargetComplete-Hook/useViewSetTarget";
import Select from "react-select";

const ViewSetTarget: FC = () => {
  const {
    indexOfLastSetTarget,
    indexOfFirstSetTarget,
    SetTarget,
    searchTerm,
    currentPage,
    SetTargetPerPage,
    totalPages,
    accountList,
    handleSearch,
    handleSort,
    handlePageChange,
    // exportToExcel,
    getVisiblePages,
    setSetTargetPerPage,
  } = useViewSetTarget();

  return (
    <Fragment>
      <Pageheader
        heading="Set Target List"
        homepage="Dashboard"
        activepage="Set Target List"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Body>
                <div className="row align-items-center g-2 mb-3">
                  <div className="col-md-6 col-12">
                    <Form.Group controlId="goDownlist">
                      <Form.Label>Account</Form.Label>
                      <Select
                        name="state"
                        options={accountList}
                        className="basic-multi-select "
                        isSearchable
                        menuPlacement="auto"
                        classNamePrefix="Select2"
                        defaultValue={[accountList[0]]}
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-2 col-12">
                    <Button variant="success mt-4">Search </Button>
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
                      value={SetTargetPerPage}
                      onChange={(e) =>
                        setSetTargetPerPage(Number(e.target.value))
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={SetTarget.length}>All Items</option>
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
                        <th onClick={() => handleSort("id")}>Sr No.</th>
                        <th onClick={() => handleSort("id")}>Franchise</th>
                        <th onClick={() => handleSort("Month")}>Month </th>
                        <th onClick={() => handleSort("Year")}>Year </th>
                        <th onClick={() => handleSort("Target")}>Target </th>
                        <th onClick={() => handleSort("createdBy")}>
                          Created By{" "}
                        </th>
                        <th onClick={() => handleSort("createdDate")}>
                          Created Date{" "}
                        </th>
                        <th onClick={() => handleSort("status")}>Edit </th>
                        <th onClick={() => handleSort("status")}>Delete </th>
                      </tr>
                    </thead>
                    <tbody>
                      {SetTarget.length > 0 ? (
                        SetTarget.map((franchise: any) => (
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
                    Showing {indexOfFirstSetTarget + 1} to{" "}
                    {Math.min(indexOfLastSetTarget, SetTarget.length)} of{" "}
                    {SetTarget.length} entries
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

export default ViewSetTarget;
