import { FC, Fragment } from "react";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
//import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import useViewFranchise from "../../Hook/Franchise-Hook/useViewFranchise";
import { Link } from "react-router-dom";
import Select from "react-select";
import SkeletonLoader from "../../../common/SkeletonLoader";

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
    currentFranchises,
    loading,
    selectFranchise,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteFranchise,
    handleFetchFranchises,
    handleEdit,
    getVisiblePages,
    setFranchisesPerPage,
    setfromDate,
    settodate,
    handleAddFranchise,
    handleFranchiseId,
    setSelectFranchise
  } = useViewFranchise();

  return (
    <Fragment>
      {/* <Pageheader 
        heading="View Franchise"
        homepage="Products"
        activepage="View Franchise"
      /> */}

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Body>
                <div className="row align-items-center g-2 mb-3">
                  <div className="col-md-3 col-12">
                    <Form.Group controlId="goDownlist">
                      <Form.Label>Franchise Type</Form.Label>
                         <Select
                            value={
                              franchiseList
                                ?.map((option: any) => ({
                                  label: option.label,
                                  value: option.id,
                                }))
                                .find(
                                  (option) =>
                                    option.value ===
                                  selectFranchise
                                ) || null
                            }
                            options={
                              franchiseList?.map((option: any) => ({
                                label: option.label,
                                value: option.id,
                              })) || []
                            }                             
                            isSearchable
                          />

                    </Form.Group>
                  </div>

                  <div className="col-md-2 col-12">
                    <Form.Group controlId="fromDate">
                      <Form.Label>From Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={fromDate || ""}
                        onChange={(e: any) => setfromDate(e.target.value)}
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-2 col-12">
                    <Form.Group controlId="toDate">
                      <Form.Label> To Date</Form.Label>
                      <Form.Control
                        value={toDate}
                        type="date"
                        onChange={(e: any) => settodate(e.target.value)}
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-2 col-12">
                    <Button variant="success mt-4" onClick={handleFetchFranchises}>Search </Button>
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
                    <Button variant="success" onClick={handleAddFranchise}>
                      Add New
                    </Button>
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
                      id="franchise-table"
                      className="border text-nowrap text-md-nowrap table-hover mb-0"
                    >
                      <thead className="table-primary">
                        <tr>
                          {/* <th onClick={() => handleSort("qrorder")}>QR Order</th> */}
                          <th onClick={() => handleSort("id")}>Franchise ID</th>
                          {/* <th onClick={() => handleSort("zone")}>Zone</th> */}
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
                          {/* <th onClick={() => handleSort("Lattitude")}>
                          Lattitude
                        </th>
                        <th onClick={() => handleSort("Longitude")}>
                          Longitude
                        </th> */}
                          <th>Action</th>

                        </tr>
                      </thead>
                      <tbody>
                        {currentFranchises.length > 0 ? (
                          currentFranchises.map((franchise: any) => (
                            <tr key={franchise.id}>
                              {/* <td>{franchise.TableQrCode}</td> */}
                              <td>{franchise.id}</td>
                              <td>
                                <Link
                                  onClick={() => handleFranchiseId(franchise.id)}
                                  to={`/Franchises/frDashboard/${franchise.id}`}
                                  target="_blank"
                                >
                                  {franchise.full_name}
                                </Link>
                              </td>
                              <td>{franchise.shop_name}</td>
                              <td>{franchise.franchise_type}</td>
                              <td>{franchise.phone}</td>
                              <td>{franchise.password}</td>
                              <td
                                className={`${franchise.status == "Approved"
                                  ? "text-success"
                                  : "text-danger"
                                  }`}
                              >
                                {franchise.status == "Approved"
                                  ? "Active"
                                  : "Inactive"}
                              </td>
                              <td>{franchise.created_date}</td>
                              {/* <td>{franchise.Lattitude}</td>
                            <td>{franchise.Longitude}</td> */}
                              <td>
                                <button onClick={() => handleEdit(franchise.id)} className="btn btn-md btn-icon btn-info-light rounded-circle" >
                                  <i className="bi bi-pencil-square"></i>
                                </button>
                                &nbsp; &nbsp;
                                <button onClick={() =>
                                  handleDeleteFranchise(franchise.id)
                                } className="btn btn-md btn-icon btn-secondary-light rounded-circle" >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </td>

                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="text-center">
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
                    Showing {indexOfFirstFranchise + 1} to{" "}
                    {Math.min(indexOfLastFranchise, filteredFranchises.length)}{" "}
                    of {filteredFranchises.length} entries
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

export default ViewFranchise;
