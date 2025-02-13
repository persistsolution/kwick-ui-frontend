import { FC, Fragment } from "react";
import Pageheader from "../../../layouts/Component/PageHeader/PageHeader";
import { Card, Col, Row, Button, Form } from "react-bootstrap";
import Select from "react-select";
import useUpdateBarCode from "../../Hook/UpdateBarCode-Hook/useUpdateBarCode";

const ViewUpdateBarcode: FC = () => {
  const {
    handleSubmit,
    setBarcode,
    setminQty,
    setpurchasePrice,
    purchasePrice,
    minQty,
    isLoading,
    barCode,
    productList,
  } = useUpdateBarCode();

  return (
    <Fragment>
      <Pageheader
        heading="Update Barcode No"
        homepage="Products"
        activepage="Update Barcode No"
      />

      <div className="main-container container-fluid">
        <Row>
          <Col xl={12}>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <div className="row align-items-center g-2">
                    <Col md={6} xs={12}>
                      <Form.Group controlId="goDownlist">
                        <Form.Label>Product*</Form.Label>
                        <Select
                          name="state"
                          options={productList}
                          className="basic-multi-select"
                          isSearchable
                          menuPlacement="auto"
                          classNamePrefix="Select2"
                          defaultValue={productList[0] || null}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={2} xs={12}>
                      <Form.Group controlId="barcode">
                        <Form.Label>Barcode No</Form.Label>
                        <Form.Control
                          type="text"
                          value={barCode}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setBarcode(e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>

                    <Col md={2} xs={12}>
                      <Form.Group controlId="minQty">
                        <Form.Label>Min Qty</Form.Label>
                        <Form.Control
                          type="text"
                          value={minQty}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setminQty(e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>

                    <Col md={2} xs={12}>
                      <Form.Group controlId="purchasePrice">
                        <Form.Label>Purchase Price</Form.Label>
                        <Form.Control
                          type="text"
                          value={purchasePrice}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setpurchasePrice(e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>

                    <Col md={2} xs={12} className="mt-3">
                      <Button
                        variant="success"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save"}
                      </Button>
                    </Col>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default ViewUpdateBarcode;
