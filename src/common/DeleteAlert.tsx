import { FC, useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface ComponentProps {
  showDeleteAlert: boolean;
  handleOpenCloseDltAlrt: () => void;
  handleDeleteProduct:()=>void;
}

const DeleteAlert: FC<ComponentProps> = ({showDeleteAlert , handleOpenCloseDltAlrt , handleDeleteProduct}) => {
  return (
    <>
      {/* Delete Confirmation Modal */}
      <Modal centered show={showDeleteAlert} onHide={handleOpenCloseDltAlrt} keyboard={false}>
        <Modal.Body className="modal-body text-center p-4">
          <h5>Delete Media</h5>
          <Button
            variant=""
            className="btn-close z-10 position-absolute t-10"
            onClick={handleOpenCloseDltAlrt}
          >
            <i className="fe fe-x"></i>
          </Button>

          <p>Are you sure you want to delete ?</p>

          <div className="card shadow-none text-start bg-secondary-transparent border-start border-secondary mb-3">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <span className="me-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="30"
                    width="30"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#f07f8f"
                      d="M20.05713,22H3.94287A3.02288,3.02288,0,0,1,1.3252,17.46631L9.38232,3.51123a3.02272,3.02272,0,0,1,5.23536,0L22.6748,17.46631A3.02288,3.02288,0,0,1,20.05713,22Z"
                    ></path>
                    <circle cx="12" cy="17" r="1" fill="#e62a45"></circle>
                    <path
                      fill="#e62a45"
                      d="M12,14a1,1,0,0,1-1-1V9a1,1,0,0,1,2,0v4A1,1,0,0,1,12,14Z"
                    ></path>
                  </svg>
                </span>
                <div>
                  <p className="mb-0 fw-bold">Warning</p>
                  <p className="card-text mb-0">
                    By deleting this media, trashed media will also be deleted.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button variant="light" onClick={handleOpenCloseDltAlrt}>
            Cancel
          </Button>
          &nbsp;&nbsp;
          <Button variant="danger" onClick={handleDeleteProduct}>Delete Media</Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteAlert;
