import { FC, Fragment } from "react";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import Pageheader from "../../../../../layouts/Component/PageHeader/PageHeader";
import useProduct from "../../../../Hook/SubFranchise/Selling-Product/Product/useProduct";

const FranchiseViewProduct: FC = () => {
  const {
    indexOfLastProduct,
    indexOfFirstProduct,
    Product,
    searchTerm,
    currentPage,
    ProductPerPage,
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
    setProductPerPage,
  } = useProduct();

  return (
    <Fragment>
      <Pageheader
        heading="List of Product"
        homepage="Dashboard"
        activepage="List of Product"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Body>
                <div className="row align-items-center g-2 mb-3">
                  <div className="col-md-3 col-12">
                    <Form.Group controlId="fromDate">
                      <Form.Label> From Date</Form.Label>
                      <Form.Control
                        selected={fromDate}
                        type="date"
                        onChange={(date: any) => setfromDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Click to select a date"
                        isClearable
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-3 col-12">
                    <Form.Group controlId="toDate">
                      <Form.Label> To Date</Form.Label>
                      <Form.Control
                        selected={toDate}
                        type="date"
                        onChange={(date: any) => settodate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Click to select a date"
                        isClearable
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
                      value={ProductPerPage}
                      onChange={(e) =>
                        setProductPerPage(Number(e.target.value))
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={Product.length}>All Items</option>
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
                        <th onClick={() => handleSort("item")}>Item </th>
                        <th onClick={() => handleSort("orderNo")}>Order No </th>
                        <th onClick={() => handleSort("invoiceNo")}>
                          Invoice No{" "}
                        </th>
                        <th onClick={() => handleSort("invoiceDate")}>
                          Invoice Date{" "}
                        </th>
                        <th onClick={() => handleSort("customerName")}>
                          Customer Name{" "}
                        </th>
                        <th onClick={() => handleSort("totalAmount")}>
                          Total Amount{" "}
                        </th>
                        <th onClick={() => handleSort("paymentMode")}>
                          Payment Mode{" "}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Product.length > 0 ? (
                        Product.map((franchise: any) => (
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
                    Showing {indexOfFirstProduct + 1} to{" "}
                    {Math.min(indexOfLastProduct, Product.length)} of{" "}
                    {Product.length} entries
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

export default FranchiseViewProduct;
