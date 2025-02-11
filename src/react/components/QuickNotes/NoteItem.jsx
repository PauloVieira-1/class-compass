import "./NoteItem.css";
import emptyTrash from "../../assets/trash3.svg";
import fullTrash from "../../assets/trash3-fill.svg";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";

function NoteItem({ deleteNote, id, title, content }) {
  return (
    <Col className="pt-3 px-3 pb-1 mt-3 mb-2 bg-custom-color-grey-lighter rounded-3 container-hidden">
      <Row style={{ height: "100%" }}>
        <Col xs={9}>
          <h5 className="fw-bold">{title}</h5>
          <p>{content}</p>
        </Col>
        <Col>
          <div className="">
            <div className=" image-container float-end">
              <img
                className="float-end default-image hover-trash"
                src={emptyTrash}
                style={{ minWidth: "15px", minHeight: "15px" }}
                alt="Logo"
                onClick={() => deleteNote(id)}
              ></img>
              <img
                className="float-end hover-image"
                src={fullTrash}
                style={{ minWidth: "15px", minHeight: "15px" }}
                alt="Logo"
                onClick={() => deleteNote(id)}
              ></img>
            </div>
          </div>
        </Col>
      </Row>
      {/* <div className="d-flex align-items-center">
        <Button
          onClick={() => deleteNote(id)}
          className="py-1 px-4 mt-2 center-me rounded-5 btn-sm"
          variant="outline-secondary"
        >
          Remove
        </Button>
      </div> */}
    </Col>
  );
}

export default NoteItem;
