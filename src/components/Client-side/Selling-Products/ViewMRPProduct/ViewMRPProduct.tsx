import { FC, Fragment } from "react";
//import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useViewMRPProducts from "../../../Hook/Selling-Products-Hook/ViewMRPProducts/useViewMRPProducts";
import SkeletonLoader from "../../../../common/SkeletonLoader";
import DeleteAlert from "../../../../common/DeleteAlert";

const ViewMRPProducts: FC = () => {
  const {
    searchTerm,
    currentProduct,
    productPerPage,
    filteredProductArray,
    indexOfFirstProduct,
    indexOfLastProduct,
    productPage,
    totalPages,
    loading,
    // categoryList,
    // subcategoryList,
    handelEditProduct,
    handleDeleteProduct,
    handlePageChange,
    getVisiblePages,
    exportToExcel,
    handleSort,
    handleSearch,
    setProductPerPage,
    handelAddProduct,
  } = useViewMRPProducts();

  return (
    <Fragment>
      {/* <Pageheader 
        heading="View Products"
        homepage="Products"
        activepage="View Products"
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
                      value={productPerPage}
                      onChange={(e) =>
                        setProductPerPage(Number(e.target.value))
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
                  {loading ? (
                    <SkeletonLoader loading={loading}/>
                  ) :(
                  <Table
                    id="product-table"
                    className="border text-nowrap text-md-nowrap table-hover mb-0"
                  >
                    <thead className="table-primary">
                      <tr>
                        <th onClick={() => handleSort("id")}>ID</th>
                        <th onClick={() => handleSort("ProductName")}>Product name</th>
                        <th onClick={() => handleSort("BarcodeNo")}>Barcode No</th>
                        <th onClick={() => handleSort("Category")}>Category</th>
                        <th onClick={() => handleSort("SubCatName")}>Sub Category</th>
                        <th onClick={() => handleSort("ProdType")}>Product Type</th>
                        <th onClick={() => handleSort("ProdPrice")}>Price</th>
                        <th onClick={() => handleSort("Status")}>Status</th>
                        <th onClick={() => handleSort("Name")}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProduct.length !== 0 ? (
                        currentProduct.map((product: any) => (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.ProductName}</td>
                            <td>{product.BarcodeNo}</td>
                            <td>{product.Category}</td>
                            <td>{product.SubCatName}</td>

                            <td className="text-success">
                              {product.ProdType == 1
                                ? "Raw / MRP Product"
                                : "MRP Product"}
                            </td>
                            <td>
                              <span>
                                <i className="bi bi-currency-rupee"></i>
                                {product.ProdPrice}
                              </span>
                            </td>
                            <td
                              className={`${product.Status == 1
                                  ? "text-success"
                                  : "text-danger"
                                }`}
                            >
                              {product.Status == 1 ? "Publish" : "Not Publish"}
                            </td>
                            <td>
                              <button onClick={() => handelEditProduct(product.id)}
                                className="btn btn-md btn-icon btn-info-light rounded-circle" >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              &nbsp; &nbsp;
                              <button onClick={() => handleDeleteProduct(product.id)} className="btn btn-md btn-icon btn-secondary-light rounded-circle" >
                                <i className="bi bi-trash"></i>
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
                  </Table>)}
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                  <div>
                    Showing {indexOfFirstProduct + 1} to{" "}
                    {Math.min(indexOfLastProduct, filteredProductArray.length)}{" "}
                    of {filteredProductArray.length} entries
                  </div>
                  <ul className="pagination pagination-sm mt-2 mt-md-0">
                    <li
                      className={`page-item ${productPage === 1 ? "disabled" : ""
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
                      className={`page-item ${productPage === 1 ? "disabled" : ""
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
                        className={`page-item ${productPage === pageNumber ? "active" : ""
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
                      className={`page-item ${productPage === totalPages ? "disabled" : ""
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
                      className={`page-item ${productPage === totalPages ? "disabled" : ""
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

export default ViewMRPProducts;
