import { FC, Fragment } from "react";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import useViewFranchise from "../../Hook/Franchise/useViewFranchise";
import { Link } from "react-router-dom";
import Select from "react-select";

const ViewFranchise: FC = () => {
  const {
    indexOfLastFranchise,
    indexOfFirstFranchise,
    filteredFranchises,
    searchTerm,
    currentPage,
    franchisesPerPage,
    totalPages,
    franchiseList,
    fromDate,
    toDate,
    handleSearch,
    handleSort,
    handlePageChange,
    // exportToExcel,
    handleDeleteFranchise,
    handleEdit,
    getVisiblePages,
    setFranchisesPerPage,
    setfromDate,
    settodate,
  } = useViewFranchise();

  return (
    <Fragment>
      <Pageheader
        heading="View Franchise"
        homepage="Products"
        activepage="View Franchise"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Body>
                <div className="row align-items-center g-2 mb-3">
                  <div className="col-md-3 col-12">
                    <Form.Group controlId="goDownlist">
                      <Form.Label>Franchise</Form.Label>
                      <Select
                        name="state"
                        options={franchiseList}
                        className="basic-multi-select "
                        isSearchable
                        menuPlacement="auto"
                        classNamePrefix="Select2"
                        defaultValue={[franchiseList[0]]}
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-2 col-12">
                    <Form.Group controlId="fromDate">
                      <Form.Label>From Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={fromDate || ""}
                        onChange={(date: any) => setfromDate(date)}
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-2 col-12">
                    <Form.Group controlId="toDate">
                      <Form.Label> To Date</Form.Label>
                      <Form.Control
                        value={toDate}
                        type="date"
                        onChange={(date: any) => settodate(date)}
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
                      value={franchisesPerPage}
                      onChange={(e) =>
                        setFranchisesPerPage(Number(e.target.value))
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={filteredFranchises.length}>
                        All Items
                      </option>
                    </Form.Select>
                    {/* <Button variant="success" onClick={exportToExcel}>
                      <i className="fe fe-download me-2"></i>Export to Excel
                    </Button> */}
                  </div>
                </div>

                <div className="table-responsive">
                  <Table
                    id="franchise-table"
                    className="border text-nowrap text-md-nowrap table-hover mb-0"
                  >
                    <thead className="table-primary">
                      <tr>
                        <th onClick={() => handleSort("qrorder")}>QR Order</th>
                        <th onClick={() => handleSort("id")}>Franchise ID</th>
                        <th onClick={() => handleSort("zone")}>Zone</th>
                        <th onClick={() => handleSort("franchiseName")}>
                          Franchise Name
                        </th>
                        <th onClick={() => handleSort("ShopName")}>
                          Shop Name
                        </th>
                        <th onClick={() => handleSort("Franchise Type")}>
                          Franchise Type
                        </th>
                        <th onClick={() => handleSort("Contact No")}>
                          Contact No
                        </th>
                        <th onClick={() => handleSort("Password")}>Password</th>
                        <th onClick={() => handleSort("Status")}>Status</th>
                        <th onClick={() => handleSort("Register Date")}>
                          Register Date
                        </th>
                        <th onClick={() => handleSort("Lattitude")}>
                          Lattitude
                        </th>
                        <th onClick={() => handleSort("Longitude")}>
                          Longitude
                        </th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFranchises.length > 0 ? (
                        filteredFranchises.map((franchise: any) => (
                          <tr key={franchise.id}>
                            <td>{franchise.id}</td>
                            <td>{franchise.newFranchiseId}</td>{" "}
                            <td>
                              <Link
                                to={`/Franchise/frDashboard/${franchise.id}`}
                                target="_blank"
                              >
                                {franchise.Fname}
                              </Link>
                            </td>
                            <td>{franchise.ShopName}</td>
                            <td>{franchise.franchiseType}</td>
                            <td>{franchise.Phone}</td>
                            <td>{franchise.Password}</td>
                            <td
                              className={`${
                                parseInt(franchise.Status) === 1
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {parseInt(franchise.Status) === 1
                                ? "Active"
                                : "Inactive"}
                            </td>
                            <td>{franchise.CreatedDate}</td>
                            <td>{franchise.Lattitude}</td>
                            <td>{franchise.Longitude}</td>
                            <td>
                              <span
                                className="avatar rounded-circle bg-azure cursor-pointer"
                                onClick={() => handleEdit(franchise.id)}
                              >
                                <i className="bi bi-pen fs-15"></i>
                              </span>
                            </td>
                            <td>
                              <span
                                className="avatar rounded-circle bg-pink cursor-pointer"
                                onClick={() =>
                                  handleDeleteFranchise(franchise.id)
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
                    Showing {indexOfFirstFranchise + 1} to{" "}
                    {Math.min(indexOfLastFranchise, filteredFranchises.length)}{" "}
                    of {filteredFranchises.length} entries
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

export default ViewFranchise;
