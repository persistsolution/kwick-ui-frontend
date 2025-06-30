import React, { Fragment } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import useSetTarget from "../../Hook/TargetComplete-Hook/useSetTarget";
//import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import Select, { SingleValue } from "react-select";


interface FranchiseOption {
  label: string;
  value: number | string;
}

interface Franchise {
  id: number | string;
  full_name: string;
}


const SetTarget: React.FC = () => {
  const {
    formValues,
    message,
    isLoading,
    handleChange,
    handleSubmit,
    franchise,
    franchisesList,
    selectedFranchise,
    setSelectFranchise,

  } = useSetTarget();

  return (
    <Fragment>
      {/* <Pageheader 
        heading="Set Target"
        homepage="Forms"
        activepage="Set Target"
      /> */}

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  {/* <Container> */}
                  <Row className="gy-4">
                    <Col xl={12}>
                      <Form.Group controlId="franchise">
                        <Form.Label>Franchise <span className="text-danger ms-1">*</span></Form.Label>
                        <Select
                          id="franchiseList"
                          name="franchiseList"
                          value={
                            franchisesList
                              ?.map((option: Franchise): FranchiseOption => ({
                                label: option.full_name,
                                value: option.id,
                              }))
                              .find((option) => option.value === selectedFranchise) || null
                          }
                          options={
                            franchisesList?.map((option: Franchise): FranchiseOption => ({
                              label: option.full_name,
                              value: option.id,
                            })) || []
                          }
                          onChange={(selectedOption: SingleValue<FranchiseOption>) => {
                            setSelectFranchise(selectedOption ? selectedOption.value : "");
                          }}
                          isSearchable
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={3}>
                      <Form.Group controlId="name">
                        <Form.Label>Month <span className="text-danger ms-1">*</span></Form.Label>
                        <Form.Select
                          name="month"
                          value={formValues.month}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select</option>
                          <option value="1">January</option>
                          <option value="2">February</option>
                          <option value="3">March</option>
                          <option value="4">April</option>
                          <option value="5">May</option>
                          <option value="6">June</option>
                          <option value="7">July</option>
                          <option value="8">August</option>
                          <option value="9">September</option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="12">December</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col xl={3}>
                      <Form.Group controlId="name">
                        <Form.Label>Year <span className="text-danger ms-1">*</span></Form.Label>
                        <Form.Select
                          name="year"
                          value={formValues.year}
                          onChange={handleChange}
                          // onClick={handelMessage}
                          required
                        >
                          <option value="">Select </option>
                          <option value="2025">2025</option>
                          <option value="2024">2024</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xl={2}>
                      <Form.Group controlId="setTargetAmount">
                        <Form.Label>Target Amount <span className="text-danger ms-1">*</span></Form.Label>
                        <Form.Control
                          name="setTargetAmount"
                          value={formValues.setTargetAmount}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>


                      <Col xl={2}>
                      <Form.Group controlId="qsrKitcSales">
                        <Form.Label>QSR KITCHEN SALES (%) <span className="text-danger ms-1">*</span></Form.Label>
                        <Form.Control
                          name="qsrKitcSales"
                          value={formValues.qsrKitcSales}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>


                      <Col xl={2}>
                      <Form.Group controlId="setTargetAmount">
                        <Form.Label>PACK FOOD SALES (%)  <span className="text-danger ms-1">*</span></Form.Label>
                        <Form.Control
                          name="packFoodSales"
                          value={formValues.packFoodSales}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>


                      <Col xl={2}>
                      <Form.Group controlId="crossSalesQty">
                        <Form.Label>CROSS SALES (Qty) <span className="text-danger ms-1">*</span></Form.Label>
                        <Form.Control
                          name="crossSalesQty"
                          value={formValues.crossSalesQty}
                          onChange={handleChange}
                          required
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
                      {/* {message && (
                        <p
                          className={`mt-3 ${
                            message.includes("successfully")
                              ? "text-success"
                              : "text-danger"
                          }`}
                        >
                          {message}
                        </p>
                      )} */}
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

export default SetTarget;
