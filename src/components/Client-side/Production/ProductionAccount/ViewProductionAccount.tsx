import { FC, Fragment } from "react";
//import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useViewProductionAccount from "../../../Hook/ProductionAccount/ProductionAccount/useViewProductionAccount";

const ViewProductionAccount: FC = () => {
  const {
    searchTerm,
    currentProductionAccount,
    ProductionAccountPerPage,
    filteredProductionAccountArray,
    indexOfFirstProductionAccount,
    indexOfLastProductionAccount,
    ProductionAccountPage,
    totalPages,
    // categoryList,
    // subcategoryList,
    handelEditProductionAccount,
    handleDeleteProductionAccount,
    handlePageChange,
    getVisiblePages,
    exportToExcel,
    handleSort,
    handleSearch,
    setProductionAccountPerPage,
    handelAddProductionAccount,
  } = useViewProductionAccount();

  return (
    <Fragment>
      {/* <Pageheader 
        heading="View ProductionAccounts"
        homepage="ProductionAccounts"
        activepage="View ProductionAccounts"
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
                      value={ProductionAccountPerPage}
                      onChange={(e) =>
                        setProductionAccountPerPage(Number(e.target.value))
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={filteredProductionAccountArray?.length}>
                        All Items
                      </option>
                    </Form.Select>
                    <Button variant="success" onClick={handelAddProductionAccount}>
                      Add New
                    </Button>
                    <Button variant="success" onClick={exportToExcel}>
                      <i className="fe fe-download me-2"></i>Export to Excel
                    </Button>
                  </div>
                </div>

                <div className="table-responsive">
                  <Table
                    id="ProductionAccount-table"
                    className="border text-nowrap text-md-nowrap table-hover mb-0"
                  >
                    <thead className="table-primary">
                      <tr>
                        <th onClick={() => handleSort("id")}>ID</th>
                        <th onClick={() => handleSort("Photo")}>Photo</th>
                        <th onClick={() => handleSort("name")}>Name</th>
                        <th onClick={() => handleSort("emailId")}>Email Id</th>
                        <th onClick={() => handleSort("contact")}>Contact</th>
                        <th onClick={() => handleSort("anotherContactNo")}>Another Contact No</th>
                        <th onClick={() => handleSort("Address")}>Address</th>
                        <th onClick={() => handleSort("Status")}>Status</th>
                        <th onClick={() => handleSort("Register Date")}>Register Date</th>
                        <th onClick={() => handleSort("")}>Edit</th>
                        <th onClick={() => handleSort("")}>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProductionAccount?.length !== 0 ? (
                        currentProductionAccount?.map((ProductionAccount: any) => (
                          <tr key={ProductionAccount.id}>
                            <td>{ProductionAccount.id}</td>
                            <td>
                              <img
                                className="avatar rounded-pill cover-image"
                                src={ProductionAccount.Photo}
                                alt={ProductionAccount.name || "ProductionAccount Image"}
                              />
                            </td>
                            <td>{ProductionAccount.ProductionAccountName}</td>
                            <td>{ProductionAccount.BarcodeNo}</td>
                            <td>{ProductionAccount.CatName}</td>
                            <td>{ProductionAccount.SubCatName}</td>

                            <td className="text-success">
                              {ProductionAccount.ProdType === 1
                                ? "Raw / Making ProductionAccount"
                                : "MRP ProductionAccount"}
                            </td>
                            <td>
                              <span>
                                <i className="bi bi-currency-rupee"></i>
                                {ProductionAccount.ProdPrice}
                              </span>
                            </td>
                            <td
                              className={`${
                                ProductionAccount.Status === 1
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {ProductionAccount.Status === 1 ? "Publish" : "Not Publish"}
                            </td>
                            <td>
                              <button
                                className="avatar rounded-circle bg-azure cursor-pointer border-0"
                                onClick={() => handelEditProductionAccount(ProductionAccount.id)}
                              >
                                <i className="bi bi-pen fs-15"></i>
                              </button>
                            </td>
                            <td>
                              <button
                                className="avatar rounded-circle bg-pink cursor-pointer border-0"
                                onClick={() => handleDeleteProductionAccount(ProductionAccount.id)}
                              >
                                <i className="bi bi-trash fs-15"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={10}>No ProductionAccount available</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                  <div>
                    Showing {indexOfFirstProductionAccount + 1} to{" "}
                    {Math.min(indexOfLastProductionAccount, filteredProductionAccountArray?.length)}{" "}
                    of {filteredProductionAccountArray?.length} entries
                  </div>
                  <ul className="pagination pagination-sm mt-2 mt-md-0">
                    <li
                      className={`page-item ${
                        ProductionAccountPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(1)}
                        disabled={ProductionAccountPage === 1}
                      >
                        First
                      </button>
                    </li>
                    <li
                      className={`page-item ${
                        ProductionAccountPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(ProductionAccountPage - 1)}
                        disabled={ProductionAccountPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {getVisiblePages().map((pageNumber : any) => (
                      <li
                        key={pageNumber}
                        className={`page-item ${
                          ProductionAccountPage === pageNumber ? "active" : ""
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
                        ProductionAccountPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(ProductionAccountPage + 1)}
                        disabled={ProductionAccountPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                    <li
                      className={`page-item ${
                        ProductionAccountPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(totalPages)}
                        disabled={ProductionAccountPage === totalPages}
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

export default ViewProductionAccount;
