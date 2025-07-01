import { FC, Fragment } from "react";
//import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import EditBrandFormModal from "./EditBrandFormModal";
import useViewBrandForm from "../../../Hook/Selling-Products-Hook/BrandTS/useViewBrandForm";
import AddBrand from "./AddBrand";
import SkeletonLoader from "../../../../common/SkeletonLoader";

const ViewBrand: FC = () => {
  const {
    indexOfLastBrand,
    indexOfFirstBrand,
    filteredBrand,
    searchTerm,
    currentPage,
    BrandPerPage,
    totalPages,
    loading,
    handleSearch,
    handleSort,
    handlePageChange,
    exportToExcel,
    handleDeleteProduct,
    getVisiblePages,
    setBrandPerPage,
    toggleEdit,
    modalEdit,
    BrandEditId,
    AddBrandModal,
    AddBrandtoggle,
    handelfetchBrand,
    currentBrand,
  } = useViewBrandForm();

  return (
    <Fragment>
      {/* <Pageheader 
        heading="List Of Brands"
        homepage="Products"
        activepage="List Of Brands"
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
                      value={BrandPerPage}
                      onChange={(e) => setBrandPerPage(Number(e.target.value))}
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={filteredBrand.length}>All Items</option>
                    </Form.Select>
                    <Button variant="success" onClick={AddBrandtoggle}>
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
                    id="Brand-table"
                    className="border text-nowrap text-md-nowrap table-hover mb-0"
                  >
                    <thead className="table-primary">
                      <tr>
                        <th onClick={() => handleSort("id")}>#</th>
                        <th onClick={() => handleSort("name")}>Brand Name</th>
                        <th onClick={() => handleSort("status")}>Status</th>
                        <th onClick={() => handleSort("Name")}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentBrand.length > 0 ? (
                        currentBrand.map((Brand: any) => (
                          <tr key={Brand.id}>
                            <td>{Brand.id}</td>
                            <td>{Brand.name}</td>
                            <td
                              className={`${
                                Brand.status === 1
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {Brand.status === 1 ? "Active" : "In Active"}
                            </td>


                            <td>
                            <button onClick={() => toggleEdit(Brand.id)} className="btn btn-md btn-icon btn-info-light rounded-circle" >
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            &nbsp; &nbsp;
                            <button  onClick={() => handleDeleteProduct(Brand.id)}className="btn btn-md btn-icon btn-secondary-light rounded-circle" >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                           
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="text-center">
                            No records found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>)}
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                  <div>
                    Showing {indexOfFirstBrand + 1} to{" "}
                    {Math.min(indexOfLastBrand, filteredBrand.length)} of{" "}
                    {filteredBrand.length} entries
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

      {/* Edit Barnd Modal */}
      <EditBrandFormModal
        toggleEdit={toggleEdit}
        modalEdit={modalEdit}
        BrandEditId={BrandEditId}
        handelfetchBrand={handelfetchBrand}
      />

      {/* Add Brand Modal */}
      <AddBrand
        toggle={AddBrandtoggle}
        modal={AddBrandModal}
        handelfetchBrand={handelfetchBrand}
      />
    </Fragment>
  );
};

export default ViewBrand;
