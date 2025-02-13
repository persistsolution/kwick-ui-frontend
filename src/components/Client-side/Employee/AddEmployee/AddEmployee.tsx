import React, { Fragment } from "react";
import { Button, Card, Col, Form, Row, Container } from "react-bootstrap";
import Pageheader from "../../../../layouts/Component/PageHeader/PageHeader";
import useAddEmployee from "../../../Hook/Employee-Hook/AddEmployee/useAddEmployee";

const AddEmployee: React.FC = () => {
  const {
    AdminAccess,
    RightAccess,
    franchiseOptions,
    formData,
    message,
    isLoading,
    handleChange,
    handleSubmit,
  } = useAddEmployee();

  return (
    <Fragment>
      <Pageheader
        heading="Create Employee Account"
        homepage="Forms"
        activepage="Add Employee"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Container className="fieldset">
                    <h4 className="legend">Personal Detail</h4>
                    <Row className="gy-4">
                      <Col xl={6}>
                        <Form.Group controlId="employeeName">
                          <Form.Label>Employee Name*</Form.Label>
                          <Form.Control
                            type="text"
                            name="employeeName"
                            placeholder="Enter Employee Name"
                            value={formData.employeeName}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group controlId="permanentAddress">
                          <Form.Label>Permanent Address</Form.Label>
                          <Form.Control
                            type="text"
                            name="permanentAddress"
                            placeholder="Enter Shop Name"
                            value={formData.permanentAddress}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="password">
                          <Form.Label>Password*</Form.Label>
                          <Form.Control
                            type="text"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="mobileNo">
                          <Form.Label>Mobile No*</Form.Label>
                          <Form.Control
                            type="number"
                            name="mobileNo"
                            placeholder="Enter Mobile No"
                            value={formData.mobileNo}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="mobileNo">
                          <Form.Label>Another Mobile No</Form.Label>
                          <Form.Control
                            type="number"
                            name="mobileNo"
                            placeholder="Enter Another Mobile No"
                            value={formData.anotherMobileNo}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="emailId">
                          <Form.Label>Email Id</Form.Label>
                          <Form.Control
                            type="email"
                            name="emailId"
                            placeholder="Enter Email Id"
                            value={formData.emailId}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group controlId="Designation">
                          <Form.Label>Designation*</Form.Label>
                          <Form.Select
                            name="Designation"
                            value={formData.Designation}
                            onChange={handleChange}
                            required
                          >
                            <option value="Accountant">Accountant</option>
                            <option value="Cashier">Cashier</option>
                            <option value="Shop Manager">Shop Manager</option>
                            <option value="Manager">Manager</option>
                            <option value="Shop Employee">Shop Employee</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="AdharNo">
                          <Form.Label>Aadhar Card No</Form.Label>
                          <Form.Control
                            type="text"
                            name="AdharNo"
                            placeholder="Enter AdharNo"
                            value={formData.AdharNo}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="dateOfJoning">
                          <Form.Label>Date Of Joining</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateOfJoning"
                            value={formData.dateOfJoning}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="perDaySalary">
                          <Form.Label>Per Day Salary*</Form.Label>
                          <Form.Control
                            type="number"
                            name="perDaySalary"
                            value={formData.perDaySalary}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={8}>
                        <Form.Group controlId="details">
                          <Form.Label>Details</Form.Label>
                          <Form.Control
                            type="text"
                            as="textarea"
                            aria-label="With textarea"
                            name="details"
                            placeholder="Enter Details"
                            value={formData.details}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="photo">
                          <Form.Label>Photo</Form.Label>
                          <Form.Control
                            type="file"
                            name="photo"
                            onChange={handleChange}
                            accept="image/*"
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="status ">
                          <Form.Label>Status*</Form.Label>
                          <Form.Select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                          >
                            <option value={1}>Active</option>
                            <option value={0}>InActive </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="status ">
                          <Form.Label>Resign</Form.Label>
                          <Form.Select
                            name="status"
                            value={formData.resign}
                            onChange={handleChange}
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="resignDate">
                          <Form.Label>Resign Date</Form.Label>
                          <Form.Control
                            type="date"
                            name="resignDate"
                            value={formData.resignDate}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={12}>
                        <Form.Group controlId="resignComment">
                          <Form.Label>Resign Comment</Form.Label>
                          <Form.Control
                            type="text"
                            name="resignComment"
                            value={formData.resignComment}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={12}>
                        <Form.Group>
                          <Form.Label
                            className="form-label"
                            style={{ fontWeight: "bold" }}
                          >
                            Admin Access
                          </Form.Label>
                        </Form.Group>
                      </Col>
                      {AdminAccess.map((option) => (
                        <Col md={4} key={option.value}>
                          <Form.Group>
                            <Form.Label
                              check
                              className="custom-control custom-checkbox"
                            >
                              <Form.Control
                                type="checkbox"
                                className="custom-control-input"
                                name="AdminAccess[]"
                                value={option.value}
                              />
                              <span className="custom-control-label">
                                {option.label}
                              </span>
                            </Form.Label>
                          </Form.Group>
                        </Col>
                      ))}

                      <Col md={12}>
                        <Form.Group>
                          <Form.Label
                            className="form-label"
                            style={{ fontWeight: "bold" }}
                          >
                            Right Access
                          </Form.Label>
                        </Form.Group>
                      </Col>
                      {RightAccess.map((option) => (
                        <Col md={4} key={option.value}>
                          <Form.Group>
                            <Form.Label
                              check
                              className="custom-control custom-checkbox"
                            >
                              <Form.Control
                                type="checkbox"
                                className="custom-control-input"
                                name="RightAccess[]"
                                value={option.value}
                              />
                              <span className="custom-control-label">
                                {option.label}
                              </span>
                            </Form.Label>
                          </Form.Group>
                        </Col>
                      ))}

                      <Col md={12}>
                        <Form.Group>
                          <Form.Label
                            className="form-label"
                            style={{ fontWeight: "bold" }}
                          >
                            Franchise Access
                          </Form.Label>
                        </Form.Group>
                      </Col>
                      {franchiseOptions.map((option) => (
                        <Col md={4} key={option.value}>
                          <Form.Group>
                            <Form.Label
                              check
                              className="custom-control custom-checkbox"
                            >
                              <Form.Control
                                type="checkbox"
                                className="custom-control-input"
                                name="FranchiseOptions[]"
                                value={option.value}
                              />
                              <span className="custom-control-label">
                                {option.label}
                              </span>
                            </Form.Label>
                          </Form.Group>
                        </Col>
                      ))}
                    </Row>
                  </Container>
                  <Container className="fieldset">
                    <h4 className="legend">COCO Franchise Access</h4>
                    <Row className="gy-4"></Row>
                  </Container>
                  <Container className="fieldset">
                    <h4 className="legend">FOFO Franchise Access</h4>
                    <Row className="gy-4"></Row>
                  </Container>
                  <Container className="fieldset">
                    <h4 className="legend"> Other Franchise Access</h4>
                    <Row className="gy-4"></Row>
                  </Container>
                  <Container className="fieldset">
                    <h4 className="legend">Bank Account Detail</h4>
                    <Row className="gy-4">
                      <Col xl={6}>
                        <Form.Group controlId="bankHolderName">
                          <Form.Label>Bank Holder Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.bankHolderName}
                            name="bankHolderName"
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group controlId="BankName">
                          <Form.Label>Bank Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.BankName}
                            name="BankName"
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="AccountNo">
                          <Form.Label>Account No </Form.Label>
                          <Form.Control
                            type="number"
                            value={formData.AccountNo}
                            name="AccountNo"
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="Branch">
                          <Form.Label>Branch </Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.Branch}
                            name="Branch"
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="IFSCCode">
                          <Form.Label>IFSC Code </Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.IFSCCode}
                            name="IFSCCode"
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group controlId="UPIID">
                          <Form.Label>UPI ID </Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.UPIID}
                            name="UPIID"
                            onChange={handleChange}
                          />
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
                  </Container>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default AddEmployee;
