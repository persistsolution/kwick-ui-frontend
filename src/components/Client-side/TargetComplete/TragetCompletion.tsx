import React, { Fragment } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import Select from "react-select";
import useTragetCompletion from "../../Hook/TargetComplete-Hook/useTragetCompletion";

const TragetCompletion: React.FC = () => {
  const {
    indexOfLastTargetCompletion,
    indexOfFirstTargetCompletion,
    TargetCompletion,
    // searchTerm,
    currentPage,
    TargetCompletionPerPage,
    totalPages,
    franchiseList,
    // categoryList,
    // fromDate,
    // toDate,
    // handleSearch,
    // setfromDate,
    // settodate,
    formValues,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setTargetCompletionPerPage,
    handleFetchTargetCompletion,
    handleChange,
  } = useTragetCompletion();

  return (
    <Fragment>
      <Pageheader
        heading="Target Completion"
        homepage="Forms"
        activepage="Target Completion"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <Form onSubmit={handleFetchTargetCompletion}>
                  {/* <Container> */}
                  <Row className="gy-4">
                    <Col xl={4}>
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
                    </Col>
                    <Col xl={3}>
                      <Form.Group controlId="name">
                        <Form.Label>Month*</Form.Label>
                        <Form.Select
                          name="month"
                          value={formValues.month}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select</option>
                          <option value="Jan">January</option>
                          <option value="Feb">February</option>
                          <option value="Mar">March</option>
                          <option value="Apr">April</option>
                          <option value="May">May</option>
                          <option value="Jun">June</option>
                          <option value="Jul">July</option>
                          <option value="Aug">August</option>
                          <option value="Sep">September</option>
                          <option value="Oct">October</option>
                          <option value="Nov">November</option>
                          <option value="Dec">December</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col xl={3}>
                      <Form.Group controlId="name">
                        <Form.Label>Year*</Form.Label>
                        <Form.Select
                          name="year"
                          value={formValues.year}
                          onChange={handleChange}
                          // onClick={handelMessage}
                          required
                        >
                          <option value="">Select </option>
                          <option value="2025">2025</option>
                          <option value="2024">2024</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xl={2} md={2}>
                      <Button variant="success mt-4">Search </Button>
                    </Col>

                    <Col xl={6}>
                      <Form.Control
                        type="text"
                        placeholder="Search in all fields..."
                        //   value={searchTerm}
                        //   onChange={(e) => handleSearch(e.target.value)}
                        className="w-100"
                      />
                    </Col>

                    <div className="col-md-6 col-12 d-flex justify-content-md-end justify-content-between gap-2">
                      <Form.Select
                        value={TargetCompletionPerPage}
                        onChange={(e) =>
                          setTargetCompletionPerPage(Number(e.target.value))
                        }
                        className="w-auto"
                      >
                        <option value="5">5 Items</option>
                        <option value="10">10 Items</option>
                        <option value="20">20 Items</option>
                        <option value={TargetCompletion.length}>
                          All Items
                        </option>
                      </Form.Select>
                      <Button variant="success" onClick={exportToExcel}>
                        <i className="fe fe-download me-2"></i>Export to Excel
                      </Button>
                    </div>

                    <div className="table-responsive">
                      <Table
                        id="TradetCompletionReport-table"
                        className="border text-nowrap text-md-nowrap table-hover mb-0"
                      >
                        <thead className="table-primary">
                          <tr>
                            <th onClick={() => handleSort("id")}>Sr No.</th>
                            <th onClick={() => handleSort("franchisename")}>
                              Franchise Name
                            </th>
                            <th onClick={() => handleSort("target")}>
                              Target{" "}
                            </th>
                            <th onClick={() => handleSort("totalAmount")}>
                              Total Amount{" "}
                            </th>
                            <th onClick={() => handleSort("Percentage")}>
                              Percentage{" "}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {TargetCompletion.length > 0 ? (
                            TargetCompletion.map((franchise: any) => (
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
                        Showing {indexOfFirstTargetCompletion + 1} to{" "}
                        {Math.min(
                          indexOfLastTargetCompletion,
                          TargetCompletion.length
                        )}{" "}
                        of {TargetCompletion.length} entries
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
                  </Row>
                  {/* </Container> */}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default TragetCompletion;
