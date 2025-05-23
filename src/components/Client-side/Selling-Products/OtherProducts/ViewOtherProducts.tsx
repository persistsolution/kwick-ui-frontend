import { FC, Fragment } from "react";
//import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useViewOtherProduct from "../../../Hook/Selling-Products-Hook/OtherProductsTS/useViewOtherProduct";

const ViewOtherProduct: FC = () => {
  const {
    searchTerm,
    currentOtherProduct,
    OtherProductPerPage,
    filteredOtherProductArray,
    indexOfFirstOtherProduct,
    indexOfLastOtherProduct,
    OtherProductPage,
    totalPages,
    // categoryList,
    // subcategoryList,
    handelEditOtherProduct,
    handleDeleteOtherProduct,
    handlePageChange,
    getVisiblePages,
    exportToExcel,
    handleSort,
    handleSearch,
    setOtherProductPerPage,
    handelAddOtherProduct,
  } = useViewOtherProduct();

  return (
    <Fragment>
      {/* <Pageheader 
        heading="View OtherProducts"
        homepage="OtherProducts"
        activepage="View OtherProducts"
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
                      value={OtherProductPerPage}
                      onChange={(e) =>
                        setOtherProductPerPage(Number(e.target.value))
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={filteredOtherProductArray.length}>
                        All Items
                      </option>
                    </Form.Select>
                    <Button variant="success" onClick={handelAddOtherProduct}>
                      Add New
                    </Button>
                    <Button variant="success" onClick={exportToExcel}>
                      <i className="fe fe-download me-2"></i>Export to Excel
                    </Button>
                  </div>
                </div>

                <div className="table-responsive">
                  <Table
                    id="OtherProduct-table"
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
                        <th onClick={() => handleSort("name")}>OtherProduct Type</th>
                        <th onClick={() => handleSort("name")}>Price</th>
                        <th onClick={() => handleSort("name")}>Status</th>
                        <th onClick={() => handleSort("Name")}>Edit</th>
                        <th onClick={() => handleSort("Name")}>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOtherProduct.length !== 0 ? (
                        currentOtherProduct.map((OtherProduct: any) => (
                          <tr key={OtherProduct.id}>
                            <td>{OtherProduct.id}</td>
                            <td>
                              <img
                                className="avatar rounded-pill cover-image"
                                src={OtherProduct.Photo}
                                alt={OtherProduct.name || "OtherProduct Image"}
                              />
                            </td>
                            <td>{OtherProduct.OtherProductName}</td>
                            <td>{OtherProduct.BarcodeNo}</td>
                            <td>{OtherProduct.CatName}</td>
                            <td>{OtherProduct.SubCatName}</td>

                            <td className="text-success">
                              {OtherProduct.ProdType === 1
                                ? "Raw / Making OtherProduct"
                                : "MRP OtherProduct"}
                            </td>
                            <td>
                              <span>
                                <i className="bi bi-currency-rupee"></i>
                                {OtherProduct.ProdPrice}
                              </span>
                            </td>
                            <td
                              className={`${
                                OtherProduct.Status === 1
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {OtherProduct.Status === 1 ? "Publish" : "Not Publish"}
                            </td>
                            <td>
                              <button
                                className="avatar rounded-circle bg-azure cursor-pointer border-0"
                                onClick={() => handelEditOtherProduct(OtherProduct.id)}
                              >
                                <i className="bi bi-pen fs-15"></i>
                              </button>
                            </td>
                            <td>
                              <button
                                className="avatar rounded-circle bg-pink cursor-pointer border-0"
                                onClick={() => handleDeleteOtherProduct(OtherProduct.id)}
                              >
                                <i className="bi bi-trash fs-15"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={10}>No OtherProduct available</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                  <div>
                    Showing {indexOfFirstOtherProduct + 1} to{" "}
                    {Math.min(indexOfLastOtherProduct, filteredOtherProductArray.length)}{" "}
                    of {filteredOtherProductArray.length} entries
                  </div>
                  <ul className="pagination pagination-sm mt-2 mt-md-0">
                    <li
                      className={`page-item ${
                        OtherProductPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(1)}
                        disabled={OtherProductPage === 1}
                      >
                        First
                      </button>
                    </li>
                    <li
                      className={`page-item ${
                        OtherProductPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(OtherProductPage - 1)}
                        disabled={OtherProductPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {getVisiblePages().map((pageNumber) => (
                      <li
                        key={pageNumber}
                        className={`page-item ${
                          OtherProductPage === pageNumber ? "active" : ""
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
                        OtherProductPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(OtherProductPage + 1)}
                        disabled={OtherProductPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                    <li
                      className={`page-item ${
                        OtherProductPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(totalPages)}
                        disabled={OtherProductPage === totalPages}
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

export default ViewOtherProduct;
