import React, { Fragment } from "react";
import { Button, Card, Col, Form, Row, Container } from "react-bootstrap";
import useSetTarget from "../../Hook/TargetComplete-Hook/useSetTarget";
import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import Select from "react-select";

const SetTarget: React.FC = () => {
  const {
    formValues,
    message,
    isLoading,
    handleChange,
    handleSubmit,
    franchise,
  } = useSetTarget();

  return (
    <Fragment>
      <Pageheader
        heading="Set Target"
        homepage="Forms"
        activepage="Set Target"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card className="custom-card">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Container>
                    <Row className="gy-4">
                      <Col xl={12}>
                        <Form.Group controlId="franchise">
                          <Form.Label>Franchise*</Form.Label>
                          <Select
                            name="state"
                            options={franchise}
                            className="basic-multi-select "
                            isSearchable
                            menuPlacement="auto"
                            classNamePrefix="Select2"
                            defaultValue={[franchise[0]]}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={3}>
                        <Form.Group controlId="name">
                          <Form.Label>Month*</Form.Label>
                          <Form.Select
                            name="month"
                            value={formValues.month}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select</option>
                            <option value="Jan">January</option>
                            <option value="Feb">February</option>
                            <option value="Mar">March</option>
                            <option value="Apr">April</option>
                            <option value="May">May</option>
                            <option value="Jun">June</option>
                            <option value="Jul">July</option>
                            <option value="Aug">August</option>
                            <option value="Sep">September</option>
                            <option value="Oct">October</option>
                            <option value="Nov">November</option>
                            <option value="Dec">December</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col xl={3}>
                        <Form.Group controlId="name">
                          <Form.Label>Year*</Form.Label>
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
                          <Form.Label>Target Amount*</Form.Label>
                          <Form.Control
                            name="setTargetAmount"
                            value={formValues.setTargetAmount}
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

export default SetTarget;
