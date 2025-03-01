import { FC, Fragment } from "react";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Form, Button } from "react-bootstrap";
import useAllocateProducts from "../../../Hook/Selling-Products-Hook/AllocateProductsTS/useAllocateProducts";
import Select from "react-select";

const AllocateProducts: FC = () => {
  const {
    indexOfLastAllocateProducts,
    indexOfFirstAllocateProducts,
    filteredallocateProducts,
    searchTerm,
    currentPage,
    allocateProductsPerPage,
    totalPages,
    franchiseList,
    fromDate,
    toDate,
    currentallocateProducts,
    handleSearch,
    handleSort,
    handlePageChange,
    getVisiblePages,
    setallocateProductsPerPage,
    setfromDate,
    settodate,
    handelNavigateAllocatedProduct,
  } = useAllocateProducts();

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
                  <div className="col-md-3 col-12">
                    <Form.Group controlId="goDownlist">
                      <Form.Label>Franchise</Form.Label>
                      <Select
                        name="state"
                        options={franchiseList}
                        className="basic-multi-select"
                        isSearchable
                        menuPlacement="auto"
                        classNamePrefix="Select2"
                        defaultValue={franchiseList[0]}
                        getOptionLabel={(e: any) => e.label}
                        getOptionValue={(e: any) => String(e.id)}
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-2 col-12">
                    <Form.Group controlId="fromDate">
                      <Form.Label> From Date</Form.Label>
                      <Form.Control
                        value={fromDate}
                        type="date"
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
                  </div>
                </div>

                <div className="table-responsive">
                  <Table
                    id="AllocateProducts-table"
                    className="border text-nowrap text-md-nowrap table-hover mb-0"
                  >
                    <thead className="table-primary">
                      <tr>
                        <th onClick={() => handleSort("id")}>ID</th>
                        <th onClick={() => handleSort("Fname")}>
                          Franchise Name
                        </th>
                        <th onClick={() => handleSort("ShopName")}>
                          Shop Name
                        </th>
                        <th onClick={() => handleSort("Roll")}>
                          {" "}
                          Franchise Type
                        </th>
                        <th onClick={() => handleSort("contact")}>
                          {" "}
                          Contact No{" "}
                        </th>
                        <th onClick={() => handleSort("id")}>Allocate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentallocateProducts.length > 0 ? (
                        currentallocateProducts.map((products: any) => (
                          <tr key={products.id}>
                            <td>{products.id}</td>
                            <td>{products.Fname}</td>
                            <td>{products.ShopName}</td>
                            <td
                              className={
                                products.Roll === 1
                                  ? "text-warning"
                                  : products.Roll === 2
                                  ? "text-success"
                                  : "text-danger"
                              }
                            >
                              {products.Roll == 1
                                ? "COCO Franchise"
                                : products.Roll == 2
                                ? "FOFO Franchise"
                                : "Other Franchise"}
                            </td>
                            <td>{products.Phone}</td>
                            <td>
                              <button
                                onClick={() =>
                                  handelNavigateAllocatedProduct(products.id)
                                }
                                className="rounded-pill btn btn-primary-light"
                              >
                                Allocated Product
                              </button>
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
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default AllocateProducts;
