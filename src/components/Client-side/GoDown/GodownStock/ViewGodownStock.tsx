import { FC, Fragment } from "react";
//import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useViewGodownStock from "../../../Hook/GoDown-Hook/GodownStock/useViewGodownStock";
import Select from "react-select";
import SkeletonLoader from "../../../../common/SkeletonLoader";

const ViewGodownStock: FC = () => {
  const {
    indexOfLastGodownStock,
    indexOfFirstGodownStock,
    filteredviewGodownStock,
    searchTerm,
    currentPage,
    viewGodownStockPerPage,
    totalPages,
    goDownList,
    fromDate,
    toDate,
    categoryList,
    subcategoryList,
    goDownProductlist,
    currentviewGodownStock,
    loading,
    selectedCategory,
    selectSubCategory,
    setSelectSubCategory,
    setSelectCategory,
    // selectGodownStockProduct,
    // selectGodown,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleFetchviewGodownStock,
    // handleDeleteGodownStock,
    // handleEdit,
    getVisiblePages,
    setviewGodownStockPerPage,
    setfromDate,
    settodate,
    setselectGodownStockProduct,
    setselectGodown,
    handleAddNewStock
  } = useViewGodownStock();

  return (
    <Fragment>
      {/* <Pageheader 
        heading="View Godwon Stock"
        homepage="Products"
        activepage="View Godown Stock"
      /> */}

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Body>
                <div className="row align-items-center g-2 mb-3">
                  <div className="row">
                    <div className="col-md-3 col-12">
                      <Form.Group controlId="goDownlist">
                        <Form.Label>
                          Godown <span className="text-danger">*</span>
                        </Form.Label>
                        <Select
                          name="goDownlist"
                          id="goDownlist"
                          className="basic-multi-select "
                          isSearchable
                          menuPlacement="auto"
                          //classNamePrefix="Select2"
                          options={
                            goDownList?.map((option: any) => ({
                              label: option.full_name,
                              value: option.id,
                            })) || []
                          }
                          onChange={(selectedOption) => {
                            setselectGodown((prevValues: any) => ({
                              ...prevValues,
                              selectGodown: selectedOption
                                ? selectedOption.value
                                : "",
                            }));
                          }}
                        />
                      </Form.Group>
                    </div>

                    <div className="col-md-3 col-12">
                      <Form.Group controlId="goDownProductlist">
                        <Form.Label>Godown Product</Form.Label>
                        <Select
                          name="goDownProductlist"
                          id="goDownProductlist"
                          className="basic-multi-select "
                          isSearchable
                          menuPlacement="auto"
                          //classNamePrefix="Select2"
                          options={
                            goDownProductlist?.map((option: any) => ({
                              label: option.ProductName,
                              value: option.id,
                            })) || []
                          }
                          onChange={(selectedOption) => {
                            setselectGodownStockProduct((prevValues: any) => ({
                              ...prevValues,
                              selectGodownStockProduct: selectedOption
                                ? selectedOption.value
                                : "",
                            }));
                          }}
                        />
                      </Form.Group>
                    </div>

                    <div className="col-md-3 col-12">
                      <Form.Group controlId="categoryList">
                        <Form.Label>Category </Form.Label>
                        <Select
                          id="selectCategory"
                          name="selectCategory"
                          value={
                            categoryList.find(
                              (option: any) => option.id.toString() === selectedCategory
                            ) || null
                          }
                          options={categoryList}
                          getOptionLabel={(option) => option.Name}
                          getOptionValue={(option) => option.id.toString()}
                          onChange={(selectedOption: any) => {
                            setSelectCategory(selectedOption ? selectedOption.id.toString() : "");
                          }}
                          required
                          isSearchable
                        />
                      </Form.Group>
                    </div>

                    <div className="col-md-3 col-12">
                      <Form.Group controlId="subcategoryList">
                        <Form.Label>Sub Category </Form.Label>
                        <Select
                          id="selectSubCategory"
                          name="selectSubCategory"
                          value={
                            subcategoryList.find(
                              (option: any) => option.sr_no.toString() === selectSubCategory
                            ) || null
                          }
                          options={subcategoryList}
                          getOptionLabel={(option) => option.subcategory_name}
                          getOptionValue={(option) => option.sr_no.toString()}
                          onChange={(selectedOption: any) => {
                            setSelectSubCategory(selectedOption ? selectedOption.sr_no.toString() : "");
                          }}
                          required
                          isSearchable
                        />
                      </Form.Group>
                    </div>

                    <div className="col-md-2 col-12">
                      <Form.Group controlId="fromDate">
                        <Form.Label> From Date</Form.Label>
                        <Form.Control
                          value={fromDate}
                          type="date"
                          onChange={(e) => setfromDate(e.target.value)}
                        />
                      </Form.Group>
                    </div>

                    <div className="col-md-2 col-12">
                      <Form.Group controlId="toDate">
                        <Form.Label> To Date</Form.Label>
                        <Form.Control
                          value={toDate}
                          type="date"
                          onChange={(e) => settodate(e.target.value)}
                        />
                      </Form.Group>
                    </div>

                    <div className="col-md-2 col-12" onClick={handleFetchviewGodownStock}>
                      <Button variant="success mt-4">Search </Button>
                    </div>
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
                      value={viewGodownStockPerPage}
                      onChange={(e) =>
                        setviewGodownStockPerPage(Number(e.target.value))
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={filteredviewGodownStock.length}>
                        All Items
                      </option>
                    </Form.Select>
                    <Button variant="success" onClick={handleAddNewStock}>
                      Add New                    </Button>
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
                      id="GodownAccount-table"
                      className="border text-nowrap text-md-nowrap table-hover mb-0"
                    >
                      <thead className="table-primary">
                        <tr>
                          <th onClick={() => handleSort("id")}>Sr.No</th>
                          <th onClick={() => handleSort("GoDownName")}>
                            GoDown Name{" "}
                          </th>
                          <th onClick={() => handleSort("ShopName")}>
                            Product Name
                          </th>
                          <th onClick={() => handleSort("date")}>Date </th>
                          <th onClick={() => handleSort("Email")}>
                            Stock In Qty{" "}
                          </th>
                          <th onClick={() => handleSort("price")}>Price </th>
                          <th onClick={() => handleSort("totalPrice")}>
                            Total Price
                          </th>
                          <th>Action</th>

                        </tr>
                      </thead>
                      <tbody>
                        {currentviewGodownStock.length > 0 ? (
                          currentviewGodownStock.map(
                            (godowonStock: any, idx: number) => (
                              <tr key={godowonStock.id}>
                                <td>{idx + 1}</td>
                                <td>{godowonStock.godown_name}</td>
                                <td>{godowonStock.product_name}</td>
                                <td>{godowonStock.stock_date}</td>
                                <td>{godowonStock.qty_unit}</td>
                                <td>{godowonStock.price}</td>
                                <td>{godowonStock.total_price}</td>
                                <td>
                                  <button className="btn btn-md btn-icon btn-info-light rounded-circle" >
                                    <i className="bi bi-pencil-square"></i>
                                  </button>
                                  &nbsp; &nbsp;
                                  <button className="btn btn-md btn-icon btn-secondary-light rounded-circle" >
                                    <i className="bi bi-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            )
                          )
                        ) : (
                          <tr>
                            <td colSpan={3} className="text-center">
                              No records found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  )}

                </div>

                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                  <div>
                    Showing {indexOfFirstGodownStock + 1} to{" "}
                    {Math.min(
                      indexOfLastGodownStock,
                      filteredviewGodownStock.length
                    )}{" "}
                    of {filteredviewGodownStock.length} entries
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

export default ViewGodownStock;
