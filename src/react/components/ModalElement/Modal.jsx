import { Button, Container, Modal } from "react-bootstrap";
import "./Modal.css";
import { Row } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function ModalElement({ closeFunction, saveChanges, handleChange, ...props }) {
  const renderTooltip = (props, element1, element3) => (
    <Tooltip id="button-tooltip" className="bg-custom-color-grey" {...props}>
      {/* {`Must add ${element1} ${element3 ? "and" : ""} ${element3 ? element3 : ""} to save`} */}
      {`Must input ${element1.toLowerCase()} to save`}
    </Tooltip>
  );

  const BUTTON_1 = (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip(props, props.element1, props.element3)}
    >
      <Button
        className="text-white rounded-5 px-4"
        variant="custom-color-orange-2"
        onClick={() => {
          saveChanges();
        }}
      >
        Save
      </Button>
    </OverlayTrigger>
  );

  const BUTTON_2 = (
    <Button
      className="text-white rounded-5 px-4"
      variant="custom-color-orange-2"
      onClick={() => {
        saveChanges();
      }}
    >
      Save
    </Button>
  );

  return (
    <>
      <Modal show={props.show} onHide={props.closeFunction} className="shadow">
        <Container>
          <Row className="bg-custom-color-grey rounded-2">
            <Modal.Body className="bg-custom-color-grey text-custom-color-grey-text-emphasis rounded-top-2">
              <Modal.Title className="text-custom-color-grey-text-emphasis fw-bold fs-2">
                {props.title}
              </Modal.Title>
              <div className="mt-3">
                <form>
                  <p className="my-0 fs-6">
                    <input
                      autoComplete="off"
                      className="pe-2 "
                      name="title"
                      placeholder={props.element1}
                      onChange={(e) => handleChange(e)}
                      autoFocus
                    ></input>
                  </p>
                  {props.element3 && (
                    <p className="mb-3 mt-1 fs-6">
                      <input
                        autoComplete="off"
                        type="date"
                        className="pe-2 pt-1"
                        name="date"
                        style={{ colorScheme: "dark" }}
                        placeholder={props.element3}
                        onChange={(e) => handleChange(e)}
                      ></input>
                    </p>
                  )}
                  {props.element4 && (
                    <p className=" fs-6">
                      <input
                        autoComplete="off"
                        type="time"
                        style={{ colorScheme: "dark" }}
                        className="pe-2"
                        name="time"
                        placeholder={props.element2}
                        onChange={(e) => handleChange(e)}
                      ></input>
                    </p>
                  )}
                  {props.element2 && (
                    <p className="mb-1 fs-6">
                      <input
                        autoComplete="off"
                        className="pe-2"
                        name="content"
                        placeholder={props.element2}
                        onChange={(e) => handleChange(e)}
                      ></input>
                    </p>
                  )}
                </form>
              </div>
            </Modal.Body>
            <Modal.Footer className="bg-custom-color-grey">
              <Button
                className="rounded-5 px-4 rounded-5"
                variant="secondary"
                onClick={closeFunction}
              >
                Close
              </Button>
              {props.emptyElement ? BUTTON_1 : BUTTON_2}
            </Modal.Footer>
          </Row>
        </Container>
      </Modal>
    </>
  );
}

export default ModalElement;
