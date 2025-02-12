import React, { Fragment } from "react";
import { Button, Card, Col, Form, Row, Container } from "react-bootstrap";
import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import useAddFranchise from "../../Hook/Franchise/useAddFranchise";
import Select from "react-select";

const AddFranchise: React.FC = () => {
  const {
    formData,
    message,
    isLoading,
    zoneArray,
    stateOptions,
    franchiseOptions,
    handleChange,
    handleSubmit,
    setFormData,
  } = useAddFranchise();

  return (
    <Fragment>
      <Pageheader
        heading="Create Franchise Account"
        homepage="Forms"
        activepage="Add Franchise"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Container className="fieldset">
                    <h4 className="legend">Franchise Detail</h4>
                    <Row className="gy-4">
                      <Col xl={4}>
                        <Form.Label>
                          Select Zone <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Group>
                          <Select
                            id="zone"
                            name="zone"
                            value={
                              zoneArray.find(
                                (option: any) =>
                                  option.id.toString() ==
                                  formData.selectedZone.toString()
                              ) || null
                            }
                            options={zoneArray}
                            getOptionLabel={(option: any) => option.label}
                            getOptionValue={(option: any) => option.id}
                            onChange={(selectedOption) => {
                              setFormData((prevValues) => ({
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

                      <Col xl={4}>
                        <Form.Group controlId="franchiseName">
                          <Form.Label>
                            Franchise Name{" "}
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="franchiseName"
                            placeholder="Enter Franchise Name"
                            value={formData.franchiseName}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="shopName">
                          <Form.Label>
                            Shop Name <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="shopName"
                            placeholder="Enter Shop Name"
                            value={formData.shopName}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="emailId">
                          <Form.Label>Email Id</Form.Label>
                          <Form.Control
                            type="emailId"
                            name="emailId"
                            placeholder="Enter Email Id"
                            value={formData.emailId}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="mobileNo">
                          <Form.Label>
                            Mobile No <span className="text-danger">*</span>
                          </Form.Label>
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
                        <Form.Group controlId="anotherMobileNo">
                          <Form.Label>Another Mobile No</Form.Label>
                          <Form.Control
                            type="number"
                            name="anotherMobileNo"
                            placeholder="Enter Another Mobile No"
                            value={formData.anotherMobileNo}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group controlId="shopLocation">
                          <Form.Label>
                            Shop Location <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="shopLocation"
                            placeholder="Enter Shop Location"
                            value={formData.shopLocation}
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
                            accept="image/"
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={8}>
                        <Form.Group controlId="address">
                          <Form.Label>
                            Address <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            aria-label="With textarea"
                            type="text"
                            name="address"
                            placeholder="Enter Address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={3}>
                        <Form.Group controlId="state">
                          <Form.Label>
                            State <span className="text-danger">*</span>
                          </Form.Label>
                          <Select
                            id="StateId"
                            name="StateId"
                            value={
                              stateOptions.find(
                                (option: any) =>
                                  option.value === formData.StateId
                              ) || null
                            }
                            options={stateOptions}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            onChange={(selectedOption: any) =>
                              setFormData((prev) => ({
                                ...prev,
                                StateId: selectedOption
                                  ? selectedOption.value
                                  : "",
                              }))
                            }
                            placeholder="Select State"
                            isSearchable
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={2}>
                        <Form.Group controlId="sellBy">
                          <Form.Label>
                            Sell by <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="sellBy"
                            placeholder="Enter Sell by"
                            value={formData.sellBy}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={2}>
                        <Form.Group controlId="sellAmount">
                          <Form.Label>
                            Sell Amount <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="number"
                            name="sellAmount"
                            placeholder="Enter Sell Amount"
                            value={formData.sellAmount}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={3}>
                        <Form.Group controlId="sellDate">
                          <Form.Label>
                            Sell Date <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="date"
                            name="sellDate"
                            value={formData.sellDate}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={3}>
                        <Form.Group controlId="franchiseType">
                          <Form.Label>
                            Franchise Type{" "}
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <Select
                            id="franchiseType"
                            name="franchiseType"
                            value={
                              franchiseOptions.find(
                                (option: any) =>
                                  option.value === formData.franchiseType
                              ) || null
                            }
                            options={franchiseOptions}
                            getOptionLabel={(option: any) => option.label}
                            getOptionValue={(option: any) => option.value}
                            onChange={(selectedOption: any) =>
                              setFormData((prev) => ({
                                ...prev,
                                franchiseType: selectedOption
                                  ? selectedOption.value
                                  : null,
                              }))
                            }
                            placeholder="Select Franchise Type"
                            isSearchable
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group controlId="latitude">
                          <Form.Label>Latitude</Form.Label>
                          <Form.Control
                            type="text"
                            name="latitude"
                            placeholder="Enter Latitude"
                            value={formData.latitude}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group controlId="longitude">
                          <Form.Label>Longitude</Form.Label>
                          <Form.Control
                            type="text"
                            name="longitude"
                            placeholder="Enter Longitude"
                            value={formData.longitude}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Container>

                  <Container className="fieldset">
                    <h4 className="legend">ID Proof Documents</h4>
                    <Row className="gy-4">
                      <Col xl={6}>
                        <Form.Group controlId="FrontAdharcardPhoto">
                          <Form.Label>
                            Upload Front Aadhar Card Of Owner{" "}
                          </Form.Label>
                          <Form.Control
                            type="file"
                            name="FrontAdharcardPhoto"
                            onChange={handleChange}
                            accept="image/*"
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group controlId="BackAdharcardPhoto">
                          <Form.Label>
                            Upload Back Aadhar Card Of Owner{" "}
                          </Form.Label>
                          <Form.Control
                            type="file"
                            name="BackAdharcardPhoto"
                            onChange={handleChange}
                            accept="image/*"
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
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

                      <Col xl={6}>
                        <Form.Group controlId="PanNo">
                          <Form.Label>PAN Card No</Form.Label>
                          <Form.Control
                            type="text"
                            name="PanNo"
                            placeholder="Enter PANNo"
                            value={formData.PanNo}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group controlId="FrontPanPhoto">
                          <Form.Label>
                            Upload Front Pan Card Of Owner{" "}
                          </Form.Label>
                          <Form.Control
                            type="file"
                            name="FrontPanPhoto"
                            onChange={handleChange}
                            accept="image/*"
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group controlId="BackPanPhoto">
                          <Form.Label>
                            Upload Back Pan Card Of Owner{" "}
                          </Form.Label>
                          <Form.Control
                            type="file"
                            name="BackPanPhoto"
                            onChange={handleChange}
                            accept="image/*"
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group controlId="GSTINNo">
                          <Form.Label>GSTIN No</Form.Label>
                          <Form.Control
                            type="text"
                            name="GSTINNo"
                            placeholder="Enter GSTIN No"
                            value={formData.GSTINNo}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group controlId="gstCretificate">
                          <Form.Label>Upload GST Certificate</Form.Label>
                          <Form.Control
                            type="file"
                            name="gstCretificate"
                            onChange={handleChange}
                            accept="image/*"
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group controlId="GumastaNo">
                          <Form.Label>Gumasta No</Form.Label>
                          <Form.Control
                            type="text"
                            name="GumastaNo"
                            placeholder="Enter Gumasta No"
                            value={formData.GumastaNo}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group controlId="GumastaCretificate">
                          <Form.Label>Upload Gumasta Certificate</Form.Label>
                          <Form.Control
                            type="file"
                            name="GumastaCretificate"
                            onChange={handleChange}
                            accept="image/*"
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group controlId="MSME No">
                          <Form.Label>MSME No</Form.Label>
                          <Form.Control
                            type="text"
                            name="MSMENo"
                            value={formData.MSMENo}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group controlId="MSMECertificate">
                          <Form.Label>Upload MSME Certificate</Form.Label>
                          <Form.Control
                            type="file"
                            name="MSMECertificate"
                            onChange={handleChange}
                            accept="image/*"
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group controlId="UploadFoodLicense">
                          <Form.Label>Upload Food License</Form.Label>
                          <Form.Control
                            type="file"
                            name="UploadFoodLicense"
                            onChange={handleChange}
                            accept="image/*"
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group controlId="UploadFoodLicenseReceipt">
                          <Form.Label>Upload Food License Receipt</Form.Label>
                          <Form.Control
                            type="file"
                            name="UploadFoodLicenseReceipt"
                            onChange={handleChange}
                            accept="image/*"
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group
                          controlId="UploadAgreementCopy
"
                        >
                          <Form.Label>Upload Agreement Copy</Form.Label>
                          <Form.Control
                            type="file"
                            name="UploadAgreementCopy"
                            onChange={handleChange}
                            accept="image/*"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Container>

                  <Container className="fieldset">
                    <h4 className="legend">Bank Account Detail</h4>
                    <Row className="gy-4">
                      <Col xl={6}>
                        <Form.Group controlId="BankHolderName">
                          <Form.Label>Bank Holder Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={formData.BankHolderName}
                            name="BankHolderName"
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

                      <Col xl={6}>
                        <Form.Group controlId="BankAccountStatus ">
                          <Form.Label>
                            Status <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Select
                            name="BankAccountStatus"
                            value={formData.BankAccountStatus}
                            onChange={handleChange}
                            required
                          >
                            <option value={1}>Active</option>
                            <option value={0}>InActive </option>
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
                          {isLoading ? "Saving..." : "Save"}
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

export default AddFranchise;
