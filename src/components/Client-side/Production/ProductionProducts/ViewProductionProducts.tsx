import { FC, Fragment } from "react";
//import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useViewProductionProducts from "../../../Hook/ProductionAccount/ProductionProducts/useViewProductionProducts";

const ViewProductionProducts: FC = () => {
  const {
    searchTerm,
    currentProductionProducts,
    ProductionProductsPerPage,
    filteredProductionProductsArray,
    indexOfFirstProductionProducts,
    indexOfLastProductionProducts,
    ProductionProductsPage,
    totalPages,
    // categoryList,
    // subcategoryList,
    handelEditProductionProducts,
    handleDeleteProductionProducts,
    handlePageChange,
    getVisiblePages,
    exportToExcel,
    handleSort,
    handleSearch,
    setProductionProductsPerPage,
    handelAddProductionProducts,
  } = useViewProductionProducts();

  return (
    <Fragment>
      {/* <Pageheader 
        heading="View ProductionProductss"
        homepage="ProductionProductss"
        activepage="View ProductionProductss"
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
                      value={ProductionProductsPerPage}
                      onChange={(e) =>
                        setProductionProductsPerPage(Number(e.target.value))
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={filteredProductionProductsArray?.length}>
                        All Items
                      </option>
                    </Form.Select>
                    <Button variant="success" onClick={handelAddProductionProducts}>
                      Add New
                    </Button>
                    <Button variant="success" onClick={exportToExcel}>
                      <i className="fe fe-download me-2"></i>Export to Excel
                    </Button>
                  </div>
                </div>

                <div className="table-responsive">
                  <Table
                    id="ProductionProducts-table"
                    className="border text-nowrap text-md-nowrap table-hover mb-0"
                  >
                    <thead className="table-primary">
                      <tr>
                        <th onClick={() => handleSort("id")}>Sr No.</th>
                        <th onClick={() => handleSort("productName")}>Product Name</th>
                        <th onClick={() => handleSort("name")}>Price</th>
                        <th onClick={() => handleSort("emailId")}>Qty</th>
                        <th onClick={() => handleSort("contact")}>Status</th>
                        <th onClick={() => handleSort("anotherContactNo")}>Register Date</th>
                        <th onClick={() => handleSort("")}>Edit</th>
                        <th onClick={() => handleSort("")}>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProductionProducts?.length !== 0 ? (
                        currentProductionProducts?.map((ProductionProducts: any) => (
                          <tr key={ProductionProducts.id}>
                            <td>{ProductionProducts.id}</td>
                            <td>
                              <img
                                className="avatar rounded-pill cover-image"
                                src={ProductionProducts.Photo}
                                alt={ProductionProducts.name || "ProductionProducts Image"}
                              />
                            </td>
                            <td>{ProductionProducts.ProductionProductsName}</td>
                            <td>{ProductionProducts.BarcodeNo}</td>
                            <td>{ProductionProducts.CatName}</td>
                            <td>{ProductionProducts.SubCatName}</td>

                            <td className="text-success">
                              {ProductionProducts.ProdType === 1
                                ? "Raw / Making ProductionProducts"
                                : "MRP ProductionProducts"}
                            </td>
                            <td>
                              <span>
                                <i className="bi bi-currency-rupee"></i>
                                {ProductionProducts.ProdPrice}
                              </span>
                            </td>
                            <td
                              className={`${
                                ProductionProducts.Status === 1
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {ProductionProducts.Status === 1 ? "Publish" : "Not Publish"}
                            </td>
                            <td>
                              <button
                                className="avatar rounded-circle bg-azure cursor-pointer border-0"
                                onClick={() => handelEditProductionProducts(ProductionProducts.id)}
                              >
                                <i className="bi bi-pen fs-15"></i>
                              </button>
                            </td>
                            <td>
                              <button
                                className="avatar rounded-circle bg-pink cursor-pointer border-0"
                                onClick={() => handleDeleteProductionProducts(ProductionProducts.id)}
                              >
                                <i className="bi bi-trash fs-15"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={10}>No ProductionProducts available</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                  <div>
                    Showing {indexOfFirstProductionProducts + 1} to{" "}
                    {Math.min(indexOfLastProductionProducts, filteredProductionProductsArray?.length)}{" "}
                    of {filteredProductionProductsArray?.length} entries
                  </div>
                  <ul className="pagination pagination-sm mt-2 mt-md-0">
                    <li
                      className={`page-item ${
                        ProductionProductsPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(1)}
                        disabled={ProductionProductsPage === 1}
                      >
                        First
                      </button>
                    </li>
                    <li
                      className={`page-item ${
                        ProductionProductsPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(ProductionProductsPage - 1)}
                        disabled={ProductionProductsPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {getVisiblePages().map((pageNumber : any) => (
                      <li
                        key={pageNumber}
                        className={`page-item ${
                          ProductionProductsPage === pageNumber ? "active" : ""
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
                        ProductionProductsPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(ProductionProductsPage + 1)}
                        disabled={ProductionProductsPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                    <li
                      className={`page-item ${
                        ProductionProductsPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(totalPages)}
                        disabled={ProductionProductsPage === totalPages}
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

export default ViewProductionProducts;
