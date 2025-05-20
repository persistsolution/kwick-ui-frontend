import { FC, Fragment } from "react";
//import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useWeeklySaleReport from "../../Hook/Report-Hook/useWeeklySaleReport";

const ViewWeeklySaleReport: FC = () => {
  const {
    indexOfLastweeklySaleReport,
    indexOfFirstweeklySaleReport,
    weeklySaleReport,
    searchTerm,
    currentPage,
    weeklySaleReportPerPage,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setweeklySaleReportPerPage,
  } = useWeeklySaleReport();

  return (
    <Fragment>
      {/* <Pageheader 
        heading="weekly sale Report"
        homepage="Products"
        activepage="weekly sale Report"
      /> */}

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
                      value={weeklySaleReportPerPage}
                      onChange={(e) =>
                        setweeklySaleReportPerPage(Number(e.target.value))
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={weeklySaleReport.length}>All Items</option>
                    </Form.Select>
                    <Button variant="success" onClick={exportToExcel}>
                      <i className="fe fe-download me-2"></i>Export to Excel
                    </Button>
                  </div>
                </div>

                <div className="table-responsive">
                  <Table
                    id="weeklySaleReport-table"
                    className="border text-nowrap text-md-nowrap table-hover mb-0"
                  >
                    <thead className="table-primary">
                      <tr>
                        <th onClick={() => handleSort("outletID")}>
                          Outlet ID
                        </th>
                        <th onClick={() => handleSort("outletName")}>
                          Outlet Name
                        </th>
                        <th onClick={() => handleSort("location")}>Location</th>
                        <th onClick={() => handleSort("outletopeningdate")}>
                          Outlet Opening Date{" "}
                        </th>
                        <th onClick={() => handleSort("outletvintageinmonth")}>
                          {" "}
                          Outlet Vintage in Months{" "}
                        </th>
                        <th onClick={() => handleSort("outlateManager")}>
                          Outlet Manager                        </th>
                        <th onClick={() => handleSort("ftdAmount")}>
                          Week 1 No of Invoices                         </th>
                        <th onClick={() => handleSort("mtdInvoice")}>
                          Week 1 Amount                        </th>
                        <th onClick={() => handleSort("mtdAmount")}>
                          Week 2 No of Invoices                        </th>
                        <th onClick={() => handleSort("mtdInvoice")}>
                          Week 2 Amount                        </th>
                        <th onClick={() => handleSort("ptdAmount")}>
                          Week 3 No of Invoices                         </th>{" "}
                        <th onClick={() => handleSort("ptdAmount")}>
                          Week 3 Amount                        </th>
                        <th>Week 4 No of Invoices</th>
                        <th onClick={() => handleSort("ptdAmount")}>
                          Week 4 Amount                        </th>
                        <th onClick={() => handleSort("ptdAmount")}>
                          Week 5 No of Invoices                        </th>
                        <th onClick={() => handleSort("ptdAmount")}>
                          Week 5 Amount                        </th>

                      </tr>
                    </thead>
                    <tbody>
                      {weeklySaleReport.length > 0 ? (
                        weeklySaleReport.map((weeklySaleReport: any) => (
                          <tr key={weeklySaleReport.id}></tr>
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
                    Showing {indexOfFirstweeklySaleReport + 1} to{" "}
                    {Math.min(
                      indexOfLastweeklySaleReport,
                      weeklySaleReport.length
                    )}{" "}
                    of {weeklySaleReport.length} entries
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

export default ViewWeeklySaleReport;
