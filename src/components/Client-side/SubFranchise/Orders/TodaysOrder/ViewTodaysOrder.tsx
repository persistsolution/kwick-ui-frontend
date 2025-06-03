import { FC, Fragment } from "react";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useTodaysOrder from "../../../../Hook/SubFranchise/Orders/TodaysOrders/useTodaysOrder";
import Select from "react-select";
// import Pageheader from "../../../../../layouts/Component/PageHeader/PageHeader";

const ViewTodaysOrder: FC = () => {
  const {
    indexOfLasttodaysOrder,
    indexOfFirsttodaysOrder,
    todaysOrder,
    searchTerm,
    currentPage,
    franchiseList,
    todaysOrderPerPage,
    totalPages,
    fromDate,
    toDate,
    handleSearch,
    setfromDate,
    settodate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    settodaysOrderPerPage,
  } = useTodaysOrder();

  return (
    <Fragment>
      {/* <Pageheader
        heading="Today Orders"
        homepage="Dashboard"
        activepage="Today Orders"
      /> */}

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Body>
                <Row className="align-items-center g-2 mb-3">
                  <Col xl={3}>
                    <Form.Group controlId="goDownlist">
                      <Form.Label>Payment Type</Form.Label>
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

                  <Col xl={2}>
                    <Button variant="success mt-4">Search </Button>
                  </Col>

                  <Col
                    xl={6}
                    className="d-flex justify-content-md-end justify-content-between gap-2"
                  >
                    <Form.Select
                      value={todaysOrderPerPage}
                      onChange={(e) =>
                        settodaysOrderPerPage(Number(e.target.value))
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={todaysOrder.length}>All Items</option>
                    </Form.Select>
                    <Button variant="success" onClick={exportToExcel}>
                      <i className="fe fe-download me-2"></i>Export to Excel
                    </Button>
                  </Col>

                  <Col xl={2}>
                    <Form.Label>Cash</Form.Label>
                    <Form.Control value={fromDate} type="number" disabled />
                  </Col>
                  <Col xl={2}>
                    <Form.Label>Phone Pay</Form.Label>
                    <Form.Control value={fromDate} type="number" disabled />
                  </Col>
                  <Col xl={2}>
                    <Form.Label>Google Pay</Form.Label>
                    <Form.Control value={fromDate} type="number" disabled />
                  </Col>
                  <Col xl={2}>
                    <Form.Label>Paytm</Form.Label>
                    <Form.Control value={fromDate} type="number" disabled />
                  </Col>
                  <Col xl={2}>
                    <Form.Label>Other UPI</Form.Label>
                    <Form.Control value={fromDate} type="number" disabled />
                  </Col>
                  <Col xl={2}>
                    <Form.Label>Credit</Form.Label>
                    <Form.Control value={fromDate} type="number" disabled />
                  </Col>
                  <Col xl={2}>
                    <Form.Label>Zomato</Form.Label>
                    <Form.Control value={fromDate} type="number" disabled />
                  </Col>
                </Row>

                <div className="table-responsive">
                  <Table
                    id="franchise-table"
                    className="border text-nowrap text-md-nowrap table-hover mb-0"
                  >
                    <thead className="table-primary">
                      <tr>
                        <th onClick={() => handleSort("id")}>Sr No.</th>
                        <th onClick={() => handleSort("item")}>Item </th>
                        <th onClick={() => handleSort("orderNo")}>Order No </th>
                        <th onClick={() => handleSort("invoiceNo")}>
                          Invoice No{" "}
                        </th>
                        <th onClick={() => handleSort("invoiceDate")}>
                          Invoice Date{" "}
                        </th>
                        <th onClick={() => handleSort("customerName")}>
                          Customer Name
                        </th>
                        <th onClick={() => handleSort("totalAmount")}>
                          Total Amount{" "}
                        </th>
                        <th onClick={() => handleSort("paymentAmount")}>
                          Payment Amount{" "}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {todaysOrder.length > 0 ? (
                        todaysOrder.map((franchise: any) => (
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
                    Showing {indexOfFirsttodaysOrder + 1} to{" "}
                    {Math.min(indexOfLasttodaysOrder, todaysOrder.length)} of{" "}
                    {todaysOrder.length} entries
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

export default ViewTodaysOrder;
