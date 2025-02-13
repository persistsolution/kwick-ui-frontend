import { FC, Fragment } from "react";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useGoDownReturnProduct from "../../../Hook/GoDown-Hook/GoDownReturnProduct/useGoDownReturnProduct";

const ViewGodownReturnProduct: FC = () => {
  const {
    indexOfLastGodownReturnProduct,
    indexOfFirstGodownReturnProduct,
    viewGodownReturnProduct,
    searchTerm,
    currentPage,
    viewGodownReturnProductPerPage,
    totalPages,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setviewGodownReturnProductPerPage,
  } = useGoDownReturnProduct();

  return (
    <Fragment>
      <Pageheader
        heading="Return Product Product Stocks"
        homepage="Products"
        activepage="Return Product Product"
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
                      value={viewGodownReturnProductPerPage}
                      onChange={(e) =>
                        setviewGodownReturnProductPerPage(
                          Number(e.target.value)
                        )
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={viewGodownReturnProduct.length}>
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
                        <th onClick={() => handleSort("invoiceNo")}>
                          Invoice No
                        </th>
                        <th onClick={() => handleSort("returnDate")}>
                          Return Date{" "}
                        </th>
                        <th onClick={() => handleSort("vendorName")}>
                          Vendor Name{" "}
                        </th>
                        <th onClick={() => handleSort("returnQty")}>
                          Return Qty{" "}
                        </th>
                        <th onClick={() => handleSort("reason")}>Reason </th>
                        <th onClick={() => handleSort("returnState")}>
                          Return State{" "}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewGodownReturnProduct.length > 0 ? (
                        viewGodownReturnProduct.map((GodownAccount: any) => (
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
                    Showing {indexOfFirstGodownReturnProduct + 1} to{" "}
                    {Math.min(
                      indexOfLastGodownReturnProduct,
                      viewGodownReturnProduct.length
                    )}{" "}
                    of {viewGodownReturnProduct.length} entries
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

export default ViewGodownReturnProduct;
