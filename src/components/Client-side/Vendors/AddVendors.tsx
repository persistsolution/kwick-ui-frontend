import React, { Fragment } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
//import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import Select from "react-select";
import useAddVendor from "../../Hook/Vendors-Hook/useAddVendors";

const AddVendor: React.FC = () => {
  const {
    formValues,
    vendorList,
    invoiceNoList,
    message,
    isLoading,
    countryArray,
    handleChange,
    handleSubmit,
    setFormValues
  } = useAddVendor();

  return (
    <Fragment>
      {/* <Pageheader 
        heading="Pay Vendor Amount"
        homepage="Forms"
        activepage="Pay Vendor Amount"
      /> */}

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  {/* <Container> */}
                  <Row>
                    <Col xl={12}>
                      <Row className="gy-4">
                        <Col xl={12}>
                          <Form.Group controlId="vendorList">
                            <Form.Label>Vendor<span className="text-danger ms-1">*</span></Form.Label>
                            <Select
                              name="vendorList"
                              options={vendorList}
                              className="basic-multi-select "
                              isSearchable
                              menuPlacement="auto"
                              classNamePrefix="Select2"
                              defaultValue={[vendorList[0]]}
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group controlId="email">
                            <Form.Label>Email<span className="text-danger ms-1">*</span></Form.Label>
                            <Form.Control
                              name="email"
                              value={formValues.email}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group controlId="mobileNo">
                            <Form.Label>Mobile No<span className="text-danger ms-1">*</span></Form.Label>
                            <Form.Control
                              name="mobileNo"
                              value={formValues.mobileNo}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group controlId="anotherMobileNo">
                            <Form.Label>Another Mobile No<span className="text-danger ms-1">*</span></Form.Label>
                            <Form.Control
                              name="anotherMobileNo"
                              value={formValues.anotherMobileNo}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={6}>
                          <Form.Group controlId="details">
                            <Form.Label>Details<span className="text-danger ms-1">*</span></Form.Label>
                            <Form.Control
                              name="details"
                              as="textarea"
                              aria-label="With textarea"
                              value={formValues.details}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>


                        <Col xl={6}>
                          <Form.Group controlId="photo">
                            <Form.Label>Photo<span className="text-danger ms-1">*</span></Form.Label>
                            <Form.Control
                              name="photo"
                              type="file"
                              value={formValues.photo}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>


                        <Col xl={3}>
                          <Form.Label>
                            Select Country
                          </Form.Label>
                          <Form.Group>
                            <Select
                              id="zone"
                              name="zone"
                              value={
                                countryArray.find(
                                  (option: any) =>
                                    option.id.toString() ==
                                    formValues.selectedCountry.toString()
                                ) || null
                              }
                              options={countryArray}
                              getOptionLabel={(option: any) => option.label}
                              getOptionValue={(option: any) => option.id}
                              onChange={(selectedOption) => {
                                setFormValues((prevValues) => ({
                                  ...prevValues,
                                  selectedZone: selectedOption
                                    ? selectedOption.id.toString()
                                    : "",
                                }));
                              }}
                              isSearchable
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={3}>
                          <Form.Label>
                            Select State
                          </Form.Label>
                          <Form.Group>
                            <Select
                              id="state"
                              name="state"
                              value={
                                countryArray.find(
                                  (option: any) =>
                                    option.id.toString() ==
                                    formValues.selectedState.toString()
                                ) || null
                              }
                              options={countryArray}
                              getOptionLabel={(option: any) => option.label}
                              getOptionValue={(option: any) => option.id}
                              onChange={(selectedOption) => {
                                setFormValues((prevValues) => ({
                                  ...prevValues,
                                  selectedZone: selectedOption
                                    ? selectedOption.id.toString()
                                    : "",
                                }));
                              }}
                              isSearchable
                            />
                          </Form.Group>
                        </Col>


                        <Col xl={3}>
                          <Form.Label>
                            Select City
                          </Form.Label>
                          <Form.Group>
                            <Select
                              id="city"
                              name="city"
                              value={
                                countryArray.find(
                                  (option: any) =>
                                    option.id.toString() ==
                                    formValues.selectedCity.toString()
                                ) || null
                              }
                              options={countryArray}
                              getOptionLabel={(option: any) => option.label}
                              getOptionValue={(option: any) => option.id}
                              onChange={(selectedOption) => {
                                setFormValues((prevValues) => ({
                                  ...prevValues,
                                  selectedZone: selectedOption
                                    ? selectedOption.id.toString()
                                    : "",
                                }));
                              }}
                              required
                              isSearchable
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={3}>
                          <Form.Group controlId="pinCode">
                            <Form.Label>PinCode No<span className="text-danger ms-1">*</span></Form.Label>
                            <Form.Control
                              name="pinCode"
                              type="number"
                              value={formValues.pinCode}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>


                         <Col xl={6}>
                          <Form.Group controlId="address">
                            <Form.Label>Address<span className="text-danger ms-1">*</span></Form.Label>
                            <Form.Control
                              name="address"
                              as="textarea"
                              aria-label="With textarea"
                              value={formValues.address}
                              onChange={handleChange}
                              required
                            />
                          </Form.Group>
                        </Col>


                        <Col xl={4}>
                          <Form.Group controlId="paymentType">
                            <Form.Label> Status<span className="text-danger ms-1">*</span></Form.Label>
                            <Form.Select
                              name="paymentType"
                              value={formValues.status}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select </option>
                              <option value={1}>Active</option>
                              <option value={0}>InActive</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>

            
                      </Row>
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
                          className={`mt-3 ${message.includes("successfully")
                            ? "text-success"
                            : "text-danger"
                            }`}
                        >
                          {message}
                        </p>
                      )}
                    </Col>
                  </Row>
                  {/* </Container> */}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default AddVendor;
