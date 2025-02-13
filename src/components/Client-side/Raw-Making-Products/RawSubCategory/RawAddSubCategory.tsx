import React, { Fragment } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import useRawSubCategory from "../../../Hook/Raw-Making-products-Hook/RawSubCategoryTS/useRawSubCategory";

const RawAddSubCategory: React.FC = () => {
  const {
    categoryOptions,
    formData,
    message,
    isLoading,
    handleChange,
    handleCategoryChange,
    handleSubmit,
    handleMessage,
  } = useRawSubCategory();
  return (
    <Fragment>
      <Pageheader
        heading="Add Sub Category"
        homepage="Forms"
        activepage="Add Sub Category"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Header>
                <div className="card-title">Add Sub Category</div>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row className="gy-4">
                    <Col xl={4}>
                      <Form.Label> Category Name *</Form.Label>
                      <Form.Select
                        name="category"
                        value={formData.catid}
                        onChange={handleCategoryChange}
                        onClick={handleMessage}
                        required
                      >
                        {categoryOptions?.map((item: any, idx: number) => (
                          <Fragment key={idx}>
                            <option value={0}>Select Category</option>
                            <option value={item.id}>{item.Name}</option>
                          </Fragment>
                        ))}
                      </Form.Select>
                    </Col>

                    <Col xl={4}>
                      <Form.Group controlId="name">
                        <Form.Label>Sub Category Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="subCatname"
                          placeholder="Enter Sub Category Name"
                          value={formData.subCatname}
                          onChange={handleChange}
                          onClick={handleMessage}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={4}>
                      <Form.Group className="my-1">
                        <label className="form-label mt-0">Photo Upload</label>
                        <input
                          className="form-control"
                          type="file"
                          name="photo"
                          onChange={handleChange}
                          onClick={handleMessage}
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={4}>
                      <Form.Group className="my-1">
                        <Form.Select
                          name="status"
                          onChange={handleChange}
                          onClick={handleMessage}
                          value={formData.status}
                          required
                        >
                          <option value="">Select Status</option>
                          <option value={1}>Active</option>
                          <option value={0}>Inactive</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col>
                      <Button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                      >
                        {isLoading ? "Submitting..." : "Submit"}
                      </Button>
                      {message && (
                        <p
                          className={`mt-3 ${
                            message.includes("successfully")
                              ? "text-success"
                              : "text-danger"
                          }`}
                        >
                          {message}
                        </p>
                      )}
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default RawAddSubCategory;
