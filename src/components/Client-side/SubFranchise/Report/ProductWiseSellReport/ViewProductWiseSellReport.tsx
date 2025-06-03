import { FC, Fragment } from "react";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
// import Pageheader from "../../../../../layouts/Component/PageHeader/PageHeader";
import useProductWiseSellReport from "../../../../Hook/SubFranchise/Report/ProductWIseSellReport/useProductWiseSellReport";
import Select from "react-select";

const ViewProductWiseSellReport: FC = () => {
  const {
    indexOfLastproductWiseSellReport,
    indexOfFirstproductWiseSellReport,
    productWiseSellReport,
    searchTerm,
    currentPage,
    productWiseSellReportPerPage,
    totalPages,
    productList,
    fromDate,
    toDate,
    handleSearch,
    setfromDate,
    settodate,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setproductWiseSellReportPerPage,
  } = useProductWiseSellReport();

  return (
    <Fragment>
      {/* <Pageheader
        heading="Product Wise Sell Report"
        homepage="Dashboard"
        activepage="Product Wise Sell Report"
      /> */}

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Body>
                <div className="row align-items-center g-2 mb-3">
                  <div className="col-md-3 col-12">
                    <Form.Group controlId="fromDate">
                      <Form.Label>Product</Form.Label>
                      <Select
                        name="state"
                        options={productList}
                        className="basic-multi-select "
                        isSearchable
                        menuPlacement="auto"
                        classNamePrefix="Select2"
                        defaultValue={[productList[0]]}
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-2 col-12">
                    <Form.Group controlId="fromDate">
                      <Form.Label> From Date</Form.Label>
                      <Form.Control
                        value={fromDate}
                        type="date"
                        onChange={(date: Date | any) => setfromDate(date)}
                   
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-2 col-12">
                    <Form.Group controlId="toDate">
                      <Form.Label> To Date</Form.Label>
                      <Form.Control
                        value={toDate}
                        type="date"
                        onChange={(date: Date | any) => settodate(date)}
                     
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
                      value={productWiseSellReportPerPage}
                      onChange={(e) =>
                        setproductWiseSellReportPerPage(Number(e.target.value))
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={productWiseSellReport.length}>
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
                        <th onClick={() => handleSort("id")}>Sr No.</th>
                        <th onClick={() => handleSort("date")}>Date </th>
                        <th onClick={() => handleSort("cashAmount")}>
                          Total Case Amount{" "}
                        </th>
                        <th onClick={() => handleSort("transferAmount")}>
                          Transfer Amount{" "}
                        </th>
                        <th onClick={() => handleSort("balanceAmount")}>
                          Balance Amount
                        </th>
                        <th onClick={() => handleSort("bankName")}>
                          Bank Name{" "}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {productWiseSellReport.length > 0 ? (
                        productWiseSellReport.map((franchise: any) => (
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
                    Showing {indexOfFirstproductWiseSellReport + 1} to{" "}
                    {Math.min(
                      indexOfLastproductWiseSellReport,
                      productWiseSellReport.length
                    )}{" "}
                    of {productWiseSellReport.length} entries
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

export default ViewProductWiseSellReport;
