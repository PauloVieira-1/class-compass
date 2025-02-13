import { Col, Row, Container } from "react-bootstrap";
import FilledPlus from "../../assets/plus-circle-fill.svg";
import UnfilledPlus from "../../assets/plus-circle.svg";
import { subjectModalContext } from "../../context/ModalContext.jsx";
import ModalElement from "../ModalElement/Modal.jsx";
import { useEffect, useState, useRef } from "react";
import SubjectBlock from "./SubjectBlock.jsx";
import Empty from "../Other/Empty.jsx";

const INITIAL_VALUES = { title: "" };
const idGenerator = () => Date.now();

function Subjects() {
  const [show, setShow] = useState(false);
  const [subjectData, setSubjectData] = useState(INITIAL_VALUES);
  const [list, setList] = useState([]);
  const [showMesage, setShowMessage] = useState(true);

  const initialized = useRef(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      try {
        const storedSubjects =
          JSON.parse(localStorage.getItem("subjects")) || [];
        setList(storedSubjects);
      } catch (error) {
        console.error("Error parsing subjects from localStorage:", error);
        setList([]);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setShowMessage(false);
  };

  const handleAddtoDatabase = () => {
    if (subjectData.title.trim() !== "") {
      const newSubject = { key: idGenerator(), ...subjectData };
      const newList = [...list, newSubject];

      setList(newList);
      localStorage.setItem("subjects", JSON.stringify(newList));

      setShow(false);
      setSubjectData(INITIAL_VALUES);
      setShowMessage(true);
    }
  };

  const removeSubject = (itemID) => {
    const updatedList = list.filter((item) => item.key !== itemID);
    setList(updatedList);
    localStorage.setItem("subjects", JSON.stringify(updatedList));
  };

  return (
    <subjectModalContext.Provider value={{ show, setShow }}>
      <Container className="pt-1 px-0 m-0">
        <Row>
          {list.length > 0 ? (
            <Col style={{ overflowY: "scroll", maxHeight: "580px" }}>
              {list.map((item) => (
                <SubjectBlock
                  key={item.key}
                  id={item.key}
                  remove={removeSubject}
                  name={item.title}
                />
              ))}
            </Col>
          ) : (
            <Empty title="subjects" />
          )}
          <Col xs={1} className="px-2">
            <div
              className="image-container float-end m-2"
              style={{ minWidth: "100%" }}
            >
              <img
                className="float-end pt-2 default-image me-2"
                src={UnfilledPlus}
                style={{ minWidth: "30px", minHeight: "30px" }}
                onClick={handleShow}
                alt="Add Subject"
              />
              <img
                className="float-end pt-2 hover-image me-2"
                src={FilledPlus}
                style={{ minWidth: "30px", minHeight: "30px" }}
                onClick={handleShow}
                alt="Add Subject"
              />
            </div>
          </Col>
        </Row>
      </Container>
      <ModalElement
        show={show}
        closeFunction={handleClose}
        saveChanges={handleAddtoDatabase}
        handleChange={handleInputChange}
        title="Add a Subject"
        element1="Subject"
        emptyElement={showMesage}
      />
    </subjectModalContext.Provider>
  );
}

export default Subjects;
