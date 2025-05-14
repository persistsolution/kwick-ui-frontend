import { FC, Fragment } from "react";
//import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useViewProductionRawProduct from "../../../Hook/ProductionAccount/ProductionRawProduct/useViewProductionRawProduct";

const ViewProductionRawProduct: FC = () => {
  const {
    searchTerm,
    currentProductionRawProduct,
    ProductionRawProductPerPage,
    filteredProductionRawProductArray,
    indexOfFirstProductionRawProduct,
    indexOfLastProductionRawProduct,
    ProductionRawProductPage,
    totalPages,
    // categoryList,
    // subcategoryList,
    handelEditProductionRawProduct,
    handleDeleteProductionRawProduct,
    handlePageChange,
    getVisiblePages,
    exportToExcel,
    handleSort,
    handleSearch,
    setProductionRawProductPerPage,
    handelAddProductionRawProduct,
  } = useViewProductionRawProduct();

  return (
    <Fragment>
      {/* <Pageheader 
        heading="View ProductionRawProducts"
        homepage="ProductionRawProducts"
        activepage="View ProductionRawProducts"
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
                      value={ProductionRawProductPerPage}
                      onChange={(e) =>
                        setProductionRawProductPerPage(Number(e.target.value))
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={filteredProductionRawProductArray?.length}>
                        All Items
                      </option>
                    </Form.Select>
                    <Button variant="success" onClick={handelAddProductionRawProduct}>
                      Add New
                    </Button>
                    <Button variant="success" onClick={exportToExcel}>
                      <i className="fe fe-download me-2"></i>Export to Excel
                    </Button>
                  </div>
                </div>

                <div className="table-responsive">
                  <Table
                    id="ProductionRawProduct-table"
                    className="border text-nowrap text-md-nowrap table-hover mb-0"
                  >
                    <thead className="table-primary">
                      <tr>
                        <th onClick={() => handleSort("id")}>Sr No.</th>
                        <th onClick={() => handleSort("productName")}>Product Name</th>
                        <th onClick={() => handleSort("Qtyunit")}>Qty - Unit</th>
                        <th onClick={() => handleSort("Price")}>Price</th>
                        <th onClick={() => handleSort("Status")}>Status</th>
                        <th onClick={() => handleSort("Registerdate")}>Register Date</th>
                        <th onClick={() => handleSort("")}>Edit</th>
                        <th onClick={() => handleSort("")}>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProductionRawProduct?.length !== 0 ? (
                        currentProductionRawProduct?.map((ProductionRawProduct: any) => (
                          <tr key={ProductionRawProduct.id}>
                            <td>{ProductionRawProduct.id}</td>
                            <td>
                              <img
                                className="avatar rounded-pill cover-image"
                                src={ProductionRawProduct.Photo}
                                alt={ProductionRawProduct.name || "ProductionRawProduct Image"}
                              />
                            </td>
                            <td>{ProductionRawProduct.ProductionRawProductName}</td>
                            <td>{ProductionRawProduct.BarcodeNo}</td>
                            <td>{ProductionRawProduct.CatName}</td>
                            <td>{ProductionRawProduct.SubCatName}</td>

                            <td className="text-success">
                              {ProductionRawProduct.ProdType === 1
                                ? "Raw / Making ProductionRawProduct"
                                : "MRP ProductionRawProduct"}
                            </td>
                            <td>
                              <span>
                                <i className="bi bi-currency-rupee"></i>
                                {ProductionRawProduct.ProdPrice}
                              </span>
                            </td>
                            <td
                              className={`${
                                ProductionRawProduct.Status === 1
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {ProductionRawProduct.Status === 1 ? "Publish" : "Not Publish"}
                            </td>
                            <td>
                              <button
                                className="avatar rounded-circle bg-azure cursor-pointer border-0"
                                onClick={() => handelEditProductionRawProduct(ProductionRawProduct.id)}
                              >
                                <i className="bi bi-pen fs-15"></i>
                              </button>
                            </td>
                            <td>
                              <button
                                className="avatar rounded-circle bg-pink cursor-pointer border-0"
                                onClick={() => handleDeleteProductionRawProduct(ProductionRawProduct.id)}
                              >
                                <i className="bi bi-trash fs-15"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={10}>No ProductionRawProduct available</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                  <div>
                    Showing {indexOfFirstProductionRawProduct + 1} to{" "}
                    {Math.min(indexOfLastProductionRawProduct, filteredProductionRawProductArray?.length)}{" "}
                    of {filteredProductionRawProductArray?.length} entries
                  </div>
                  <ul className="pagination pagination-sm mt-2 mt-md-0">
                    <li
                      className={`page-item ${
                        ProductionRawProductPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(1)}
                        disabled={ProductionRawProductPage === 1}
                      >
                        First
                      </button>
                    </li>
                    <li
                      className={`page-item ${
                        ProductionRawProductPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(ProductionRawProductPage - 1)}
                        disabled={ProductionRawProductPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {getVisiblePages().map((pageNumber : any) => (
                      <li
                        key={pageNumber}
                        className={`page-item ${
                          ProductionRawProductPage === pageNumber ? "active" : ""
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
                        ProductionRawProductPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(ProductionRawProductPage + 1)}
                        disabled={ProductionRawProductPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                    <li
                      className={`page-item ${
                        ProductionRawProductPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(totalPages)}
                        disabled={ProductionRawProductPage === totalPages}
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

export default ViewProductionRawProduct;
