import { FC, Fragment } from "react";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useViewProduct from "../../../Hook/Selling-Products-Hook/ProductTS/useViewProduct";

const ViewProduct: FC = () => {
  const {
    searchTerm,
    currentproduct,
    productPerPage,
    filteredProductArray,
    indexOfFirstproduct,
    indexOfLastproduct,
    productPage,
    totalPages,
    // categoryList,
    // subcategoryList,
    handelEditProduct,
    handleDeleteProduct,
    handlePageChange,
    getVisiblePages,
    exportToExcel,
    handleSort,
    handleSearch,
    setproductPerPage,
    handelAddProduct,
  } = useViewProduct();

  return (
    <Fragment>
      <Pageheader
        heading="View Products"
        homepage="Products"
        activepage="View Products"
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
                      value={productPerPage}
                      onChange={(e) =>
                        setproductPerPage(Number(e.target.value))
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={filteredProductArray.length}>
                        All Items
                      </option>
                    </Form.Select>
                    <Button variant="success" onClick={handelAddProduct}>
                      Add New
                    </Button>
                    <Button variant="success" onClick={exportToExcel}>
                      <i className="fe fe-download me-2"></i>Export to Excel
                    </Button>
                  </div>
                </div>

                <div className="table-responsive">
                  <Table
                    id="product-table"
                    className="border text-nowrap text-md-nowrap table-hover mb-0"
                  >
                    <thead className="table-primary">
                      <tr>
                        <th onClick={() => handleSort("id")}>ID</th>
                        <th onClick={() => handleSort("Photo")}>Photo</th>
                        <th onClick={() => handleSort("name")}>Name</th>
                        <th onClick={() => handleSort("name")}>Barcode No</th>
                        <th onClick={() => handleSort("name")}>Category</th>
                        <th onClick={() => handleSort("name")}>Sub Category</th>
                        <th onClick={() => handleSort("name")}>Product Type</th>
                        <th onClick={() => handleSort("name")}>Price</th>
                        <th onClick={() => handleSort("name")}>Status</th>
                        <th onClick={() => handleSort("Name")}>Edit</th>
                        <th onClick={() => handleSort("Name")}>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentproduct.length !== 0 ? (
                        currentproduct.map((product: any) => (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>
                              <img
                                className="avatar rounded-pill cover-image"
                                src={product.Photo}
                                alt={product.name || "product Image"}
                              />
                            </td>
                            <td>{product.ProductName}</td>
                            <td>{product.BarcodeNo}</td>
                            <td>
                              {" "}
                              {/* {categoryList.length !== 0 &&
                                categoryList.find(
                                  (item: any) =>
                                    Number(item.id) == product.CatId
                                ).Name} */}
                            </td>
                            <td>
                              {" "}
                              {/* {subcategoryList.length !== 0 &&
                                subcategoryList.find(
                                  (item: any) =>
                                    Number(item.id) == product.SubCatId
                                ).Name} */}
                            </td>
                            <td className="text-success">
                              {product.ProdType === 1
                                ? "Raw / Making Product"
                                : "MRP Product"}
                            </td>
                            <td>
                              <span>
                                <i className="bi bi-currency-rupee"></i>
                                {product.ProdPrice}
                              </span>
                            </td>
                            <td
                              className={`${
                                product.tempstatus === 1
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {product.tempstatus === 1
                                ? "Active"
                                : "In Active"}
                            </td>
                            <td>
                              <button
                                className="avatar rounded-circle bg-azure cursor-pointer border-0"
                                onClick={() => handelEditProduct(product.id)}
                              >
                                <i className="bi bi-pen fs-15"></i>
                              </button>
                            </td>
                            <td>
                              <button
                                className="avatar rounded-circle bg-pink cursor-pointer border-0"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <i className="bi bi-trash fs-15"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={10}>No product available</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                  <div>
                    Showing {indexOfFirstproduct + 1} to{" "}
                    {Math.min(indexOfLastproduct, filteredProductArray.length)}{" "}
                    of {filteredProductArray.length} entries
                  </div>
                  <ul className="pagination pagination-sm mt-2 mt-md-0">
                    <li
                      className={`page-item ${
                        productPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(1)}
                        disabled={productPage === 1}
                      >
                        First
                      </button>
                    </li>
                    <li
                      className={`page-item ${
                        productPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(productPage - 1)}
                        disabled={productPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {getVisiblePages().map((pageNumber) => (
                      <li
                        key={pageNumber}
                        className={`page-item ${
                          productPage === pageNumber ? "active" : ""
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
                        productPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(productPage + 1)}
                        disabled={productPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                    <li
                      className={`page-item ${
                        productPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(totalPages)}
                        disabled={productPage === totalPages}
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

export default ViewProduct;
