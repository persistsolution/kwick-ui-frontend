import { FC, Fragment } from "react";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Form, Button } from "react-bootstrap";
// import Select from "react-select";
import useRawAllocatedProductTS from "../../../Hook/Raw-Making-products-Hook/RawAllocateProductTS/useRawAllocatedProductTS";

const RawAllocatedProducts: FC = () => {
  const {
    indexOfLastAllocateProducts,
    indexOfFirstAllocateProducts,
    filteredallocateProducts,
    searchTerm,
    currentPage,
    allocateProductsPerPage,
    totalPages,
    // franchiseList,
    // fromDate,
    // toDate,
    currentallocateProducts,
    // categories,
    // subCategory,
    handleSearch,
    handleSort,
    handlePageChange,
    getVisiblePages,
    setallocateProductsPerPage,
    handelAllocatedProduct,
    // handelAllocatedAllProduct,
    // setfromDate,
    // settodate,
    exportToExcel,
    assignProducts,
  } = useRawAllocatedProductTS();

  return (
    <Fragment>
      <Pageheader
        heading="List Of Allocate Products"
        homepage="Products"
        activepage="Allocate Products"
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
                      value={allocateProductsPerPage}
                      onChange={(e) =>
                        setallocateProductsPerPage(Number(e.target.value))
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={filteredallocateProducts.length}>
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
                    id="AllocateProducts-table"
                    className="border text-nowrap text-md-nowrap table-hover mb-0"
                  >
                    <thead className="table-primary">
                      <tr>
                        <th>
                          {" "}
                          {/* <Form.Check
                            className="form-check-md d-flex align-items-center"
                            type="checkbox"
                            id="checkebox-md"
                            onChange={handelAllocatedAllProduct}
                            label="Medium"
                          /> */}
                          #
                        </th>
                        <th onClick={() => handleSort("id")}>ID</th>
                        <th onClick={() => handleSort("name")}>
                          Franchise Name
                        </th>
                        <th onClick={() => handleSort("category")}>
                          {" "}
                          Category{" "}
                        </th>
                        <th onClick={() => handleSort("subcategory")}>
                          {" "}
                          Sub Category{" "}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentallocateProducts.length > 0 ? (
                        currentallocateProducts.map((products: any) => (
                          <tr key={products.id}>
                            <td>
                              {" "}
                              <Form.Check
                                className="form-check-md d-flex align-items-center"
                                type="checkbox"
                                checked={products.checkstatus}
                                onChange={(e) =>
                                  handelAllocatedProduct(
                                    e,
                                    products.id,
                                    products
                                  )
                                }
                                id="checkebox-md"
                              />
                            </td>
                            <td>{products.id}</td>
                            <td>{products.ProductName}</td>
                            <td>{products.CatName}</td>
                            <td>{products.SubCatName}</td>
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
                    Showing {indexOfFirstAllocateProducts + 1} to{" "}
                    {Math.min(
                      indexOfLastAllocateProducts,
                      filteredallocateProducts.length
                    )}{" "}
                    of {filteredallocateProducts.length} entries
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
              <Card.Footer>
                <Row>
                  <Col>
                    <Button
                      className="btn btn-primary"
                      onClick={assignProducts}
                    >
                      ASSIGN
                    </Button>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default RawAllocatedProducts;
