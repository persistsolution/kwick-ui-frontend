import { FC, Fragment } from "react";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useViewGodownStock from "../../../Hook/GoDown-Hook/GodownStock/useViewGodownStock";
import Select from "react-select";

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
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    // handleDeleteGodownStock,
    // handleEdit,
    getVisiblePages,
    setviewGodownStockPerPage,
    setfromDate,
    settodate,
  } = useViewGodownStock();

  return (
    <Fragment>
      <Pageheader
        heading="View Godwon Stock"
        homepage="Products"
        activepage="View Godown Stock"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Body>
                <div className="row align-items-center g-2 mb-3">
                  <div className="row">
                    <div className="col-md-3 col-12">
                      <Form.Group controlId="goDownlist">
                        <Form.Label>Godown*</Form.Label>
                        <Select
                          name="state"
                          options={goDownList}
                          className="basic-multi-select "
                          isSearchable
                          menuPlacement="auto"
                          classNamePrefix="Select2"
                          defaultValue={[goDownList[0]]}
                        />
                      </Form.Group>
                    </div>

                    <div className="col-md-3 col-12">
                      <Form.Group controlId="goDownProductlist">
                        <Form.Label>Godown Product*</Form.Label>
                        <Select
                          name="state"
                          options={goDownProductlist}
                          className="basic-multi-select "
                          isSearchable
                          menuPlacement="auto"
                          classNamePrefix="Select2"
                          defaultValue={[goDownProductlist[0]]}
                        />
                      </Form.Group>
                    </div>

                    <div className="col-md-3 col-12">
                      <Form.Group controlId="categoryList">
                        <Form.Label>Category </Form.Label>
                        <Select
                          name="state"
                          options={categoryList}
                          className="basic-multi-select "
                          isSearchable
                          menuPlacement="auto"
                          classNamePrefix="Select2"
                          defaultValue={[categoryList[0]]}
                        />
                      </Form.Group>
                    </div>

                    <div className="col-md-3 col-12">
                      <Form.Group controlId="subcategoryList">
                        <Form.Label>Sub Category </Form.Label>
                        <Select
                          name="state"
                          options={subcategoryList}
                          className="basic-multi-select "
                          isSearchable
                          menuPlacement="auto"
                          classNamePrefix="Select2"
                          defaultValue={[subcategoryList[0]]}
                        />
                      </Form.Group>
                    </div>

                    <div className="col-md-2 col-12">
                      <Form.Group controlId="fromDate">
                        <Form.Label> From Date</Form.Label>
                        <Form.Control
                          value={fromDate}
                          type="date"
                          onChange={(date: Date | any) => setfromDate(date)}
                        />
                      </Form.Group>
                    </div>

                    <div className="col-md-2 col-12">
                      <Form.Group controlId="toDate">
                        <Form.Label> To Date</Form.Label>
                        <Form.Control
                          value={toDate}
                          type="date"
                          onChange={(date: Date | any) => settodate(date)}
                        />
                      </Form.Group>
                    </div>

                    <div className="col-md-2 col-12">
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
                    <Button variant="success" onClick={exportToExcel}>
                      <i className="fe fe-download me-2"></i>Export to Excel
                    </Button>
                  </div>
                </div>

                <div className="table-responsive">
                  <Table
                    id="GodownAccount-table"
                    className="border text-nowrap text-md-nowrap table-hover mb-0"
                  >
                    <thead className="table-primary">
                      <tr>
                        <th onClick={() => handleSort("id")}>ID</th>
                        <th onClick={() => handleSort("photo")}>Photo</th>
                        <th onClick={() => handleSort("ShopName")}>
                          Shop Name
                        </th>
                        <th onClick={() => handleSort("GoDownName")}>
                          GoDown Name{" "}
                        </th>
                        <th onClick={() => handleSort("Email")}>Email </th>
                        <th onClick={() => handleSort("ContactNo")}>
                          Contact No
                        </th>
                        <th onClick={() => handleSort("AnotherContactNo")}>
                          Another Contact No
                        </th>
                        <th onClick={() => handleSort("Address")}>Address </th>
                        <th onClick={() => handleSort("Status")}>Status </th>
                        <th onClick={() => handleSort("RegisterDate")}>
                          Register Date{" "}
                        </th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredviewGodownStock.length > 0 ? (
                        filteredviewGodownStock.map((GodownAccount: any) => (
                          <tr key={GodownAccount.id}></tr>
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
                    Showing {indexOfFirstGodownStock + 1} to{" "}
                    {Math.min(
                      indexOfLastGodownStock,
                      filteredviewGodownStock.length
                    )}{" "}
                    of {filteredviewGodownStock.length} entries
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

export default ViewGodownStock;
