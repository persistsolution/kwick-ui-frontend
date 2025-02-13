import { FC, Fragment } from "react";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Table, Button, Form } from "react-bootstrap";
import useViewSubCategory from "../../../Hook/Selling-Products-Hook/SubCategoryTS/useViewSubCategory";
import EditSubCategoryFormModal from "./EditSubCategoryFormModal";
import AddSubCategoryFormModal from "./AddSubCategoryFormModal";

interface ComponentProps {}

const ViewSubCategory: FC<ComponentProps> = () => {
  const {
    searchTerm,
    setSubCategoriesPerPage,
    handleSearch,
    handleSort,
    handleDelete,
    handlePageChange,
    exportToExcel,
    getVisiblePages,
    currentSubCategories,
    subcategoriesPerPage,
    filteredSubCategories,
    indexOfFirstSubCategory,
    currentPage,
    indexOfLastSubCategory,
    totalPages,
    toggle,
    handelfetchSubCategories,
    modal,
    subcategoriesEditId,
    modalAddSubCategory,
    toggleAddSubCategory,
  } = useViewSubCategory();

  return (
    <Fragment>
      <Pageheader
        heading="SubCategory List"
        homepage="Products"
        activepage="SubCategory List"
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
                      value={subcategoriesPerPage}
                      onChange={(e) =>
                        setSubCategoriesPerPage(Number(e.target.value))
                      }
                      className="w-auto"
                    >
                      <option value="5">5 Items</option>
                      <option value="10">10 Items</option>
                      <option value="20">20 Items</option>
                      <option value={filteredSubCategories.length}>
                        All Items
                      </option>
                    </Form.Select>
                    <Button variant="success" onClick={modalAddSubCategory}>
                      Add More{" "}
                    </Button>
                    <Button variant="success" onClick={exportToExcel}>
                      <i className="fe fe-download me-2"></i>Export to Excel
                    </Button>
                  </div>
                </div>

                <div className="table-responsive">
                  <Table
                    id="subcategory-table"
                    className="border text-nowrap text-md-nowrap table-hover mb-0"
                  >
                    <thead className="table-primary">
                      <tr>
                        <th onClick={() => handleSort("id")}>ID</th>
                        <th>Photo</th>
                        <th onClick={() => handleSort("Name")}>Sub Category</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSubCategories.length > 0 ? (
                        currentSubCategories.map((subcategory: any) => (
                          <tr key={subcategory.id}>
                            <td>{subcategory.id}</td>
                            <td>
                              {subcategory.photo ? (
                                <img
                                  className="avatar rounded-pill cover-image"
                                  src={`https://kwickfoods.in/uploads/${subcategory.Photo}`}
                                  alt={subcategory.Name || "SubCategory Image"}
                                />
                              ) : (
                                <img
                                  className="avatar rounded-pill cover-image"
                                  src={`https://kwickfoods.in/uploads/${subcategory.Photo}`}
                                  alt={subcategory.Name || "SubCategory Image"}
                                />
                              )}
                            </td>
                            <td>{subcategory.Name}</td>
                            <td
                              className={`${
                                Boolean(subcategory.Status)
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {Boolean(subcategory.Status)
                                ? "Active"
                                : "In Active"}
                            </td>{" "}
                            <td>
                              <button
                                className="avatar rounded-circle bg-azure border-0"
                                onClick={() => toggle(subcategory.id)}
                              >
                                <i className="bi bi-pen fs-15"></i>
                              </button>
                            </td>
                            <td>
                              <button
                                className="avatar rounded-circle bg-pink border-0"
                                onClick={() => handleDelete(subcategory.id)}
                              >
                                <i className="bi bi-trash fs-15"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center">
                            No records found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                  <div>
                    Showing {indexOfFirstSubCategory + 1} to{" "}
                    {Math.min(
                      indexOfLastSubCategory,
                      filteredSubCategories.length
                    )}{" "}
                    of {filteredSubCategories.length} entries
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

      {/* Edit Sub Category Modal */}
      <EditSubCategoryFormModal
        toggleEditSubcategory={toggle}
        modalEditSubcategory={modal}
        subcategoriesEditId={subcategoriesEditId}
        handelfetchSubCategories={handelfetchSubCategories}
      />

      {/* Add Sub Category Modal */}
      <AddSubCategoryFormModal
        toggleAddSubCategory={toggleAddSubCategory}
        modalAddSubCategory={modalAddSubCategory}
        handelfetchSubCategories={handelfetchSubCategories}
      />
    </Fragment>
  );
};

export default ViewSubCategory;
