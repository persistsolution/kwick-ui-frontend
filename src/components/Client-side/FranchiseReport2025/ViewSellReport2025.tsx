import { FC, Fragment } from "react";
//import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useSellReport2025 from "../../Hook/FranchiseReports2025/useSellReport2025";
import Select from "react-select";

const ViewSellReport2025: FC = () => {
  const {
    indexOfLastSellReport2025,
    indexOfFirstSellReport2025,
    SellReport2025,
    searchTerm,
    currentPage,
    SellReport2025PerPage,
    totalPages,
    selectFranchise,
    franchiseArray,
    fromDate,
    toDate,
    setSelectFranchise,
    setfromDate,
    settoDate,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    setSellReport2025PerPage,
  } = useSellReport2025();

  return (
    <Fragment>
      {/* <Pageheader 
        heading="Daily Sell Report"
        homepage="Products"
        activepage="Daily Sell Report"
      /> */}

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Body>

                <div className="row align-items-center g-2 mb-3">


                  <div className="col-md-3 col-12">
                    <Form.Label>Select Franchise<span className="text-danger ms-1">*</span></Form.Label>
                    <Form.Group>
                      <Select
                        id="franchise"
                        name="franchise"
                        value={
                          franchiseArray.find(
                            (option: any) => option.id.toString() === selectFranchise
                          ) || null
                        }
                        options={franchiseArray}
                        getOptionLabel={(option: any) => option.label}
                        getOptionValue={(option: any) => option.id.toString()}
                        onChange={(selectedOption: any) => {
                          setSelectFranchise(selectedOption ? selectedOption.id.toString() : "");
                        }}
                        isSearchable
                      />
                    </Form.Group>
                  </div>


                  <div className="col-md-2 col-6">
                    <Form.Group controlId="fromDate">
                      <Form.Label>From Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={fromDate || ""}
                        onChange={(date: any) => setfromDate(date)}
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-2 col-6">
                    <Form.Group controlId="fromDate">
                      <Form.Label>To Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={toDate || ""}
                        onChange={(date: any) => settoDate(date)}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-1 mt-4 ">
                    <Button variant="success mt-1" >
                      Search
                    </Button>
                  </div>
                </div>

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
                      value={SellReport2025PerPage}
                      onChange={(e) =>
                        setSellReport2025PerPage(Number(e.target.value))
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={SellReport2025.length}>All Items</option>
                    </Form.Select>
                    <Button variant="success" onClick={exportToExcel}>
                      <i className="fe fe-download me-2"></i>Export to Excel
                    </Button>
                  </div>
                </div>

                <div className="table-responsive">
                  <Table
                    id="SellReport2025-table"
                    className="border text-nowrap text-md-nowrap table-hover mb-0"
                  >
                    <thead className="table-primary">
                      <tr>
                        <th onClick={() => handleSort("")}>
                          Sr No
                        </th>
                        <th onClick={() => handleSort("")}>Franchise Name</th>
                        <th onClick={() => handleSort("")}>Zone</th>
                        <th onClick={() => handleSort("")}>Sub Zone</th>
                        <th onClick={() => handleSort("")}>Category</th>
                        <th onClick={() => handleSort("")}>Total Sell</th>
                        <th onClick={() => handleSort("")}>Amount</th>
                        <th onClick={() => handleSort("")}>Percentage</th>
                        <th onClick={() => handleSort("")}> APC</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SellReport2025.length > 0 ? (
                        SellReport2025.map((SellReport2025: any) => (
                          <tr key={SellReport2025.id}></tr>
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
                    Showing {indexOfFirstSellReport2025 + 1} to{" "}
                    {Math.min(
                      indexOfLastSellReport2025,
                      SellReport2025.length
                    )}{" "}
                    of {SellReport2025.length} entries
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

export default ViewSellReport2025;
