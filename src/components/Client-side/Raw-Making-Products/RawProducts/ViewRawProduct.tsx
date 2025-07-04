import { FC, Fragment } from "react";
//import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useViewRawProduct from "../../../Hook/Raw-Making-products-Hook/RawProductsTS/useViewRawProduct";
import SkeletonLoader from "../../../../common/SkeletonLoader";

const ViewRawProduct: FC = () => {
  const {
    searchTerm,
    currentCategories,
    categoriesPerPage,
    filteredProductArray,
    indexOfFirstCategory,
    indexOfLastCategory,
    currentPage,
    totalPages,
    loading,
    handelEditProduct,
    handleDeleteProduct,
    handlePageChange,
    getVisiblePages,
    exportToExcel,
    handleSort,
    handleSearch,
    setCategoriesPerPage,
    handelNavigateAddMore,
  } = useViewRawProduct();

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

                  <div className="col-md-6 col-12 d-flex justify-content-md-end  gap-2">
                    <Form.Select
                      value={categoriesPerPage}
                      onChange={(e) =>
                        setCategoriesPerPage(Number(e.target.value))
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
                    <Button variant="success" onClick={handelNavigateAddMore}>
                      Add More
                    </Button>
                    <Button variant="success" onClick={exportToExcel}>
                      <i className="fe fe-download me-2"></i>Export to Excel
                    </Button>
                  </div>
                </div>

                <div className="table-responsive">
                  {loading ? (
                    <SkeletonLoader loading={loading} />
                  ) : (
                    <Table
                      id="category-table"
                      className="border text-nowrap text-md-nowrap table-hover mb-0"
                    >
                      <thead className="table-primary">
                        <tr>
                          <th onClick={() => handleSort("id")}>ID</th>
                          <th onClick={() => handleSort("Photo")}>Photo</th>
                          <th onClick={() => handleSort("name")}>Product Name</th>
                          <th onClick={() => handleSort("CatName")}>Category</th>
                          <th onClick={() => handleSort("name")}>Sub Category</th>
                          <th onClick={() => handleSort("name")}>Purchase Price</th>
                          <th onClick={() => handleSort("name")}>Min Qty</th>
                          <th onClick={() => handleSort("name")}>Unit</th>
                          <th onClick={() => handleSort("name")}>Status</th>
                          <th onClick={() => handleSort("Name")}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentCategories.length > 0 ? (
                          currentCategories.map((product: any) => (
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
                              <td>{product.CatName}</td>
                              <td>{product.SubCatName}</td>
                              <td>{product.PurchasePrice}</td>
                              <td>{product.MinQty}</td>
                              <td>{product.Unit}</td>
                              <td
                                className={`${product.Status == 1
                                  ? "text-success"
                                  : "text-danger"
                                  }`}
                              >
                                {product.Status === 1 ? "Active" : "In Active"}
                              </td>

                              <td>
                                <button
                                  onClick={() => handelEditProduct(product.id)}
                                  className="btn btn-md btn-icon btn-info-light rounded-circle" >
                                  <i className="bi bi-pencil-square"></i>
                                </button>
                                &nbsp; &nbsp;
                                <button onClick={() => handleDeleteProduct(product.id)}
                                  className="btn btn-md btn-icon btn-secondary-light rounded-circle" >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={10}>No categories available</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  )}

                </div>

                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                  <div>
                    Showing {indexOfFirstCategory + 1} to{" "}
                    {Math.min(indexOfLastCategory, filteredProductArray.length)}{" "}
                    of {filteredProductArray.length} entries
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

export default ViewRawProduct;
