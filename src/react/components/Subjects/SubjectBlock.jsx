import FilledPlus from "../../assets/plus-circle-fill-white.svg";
import UnfilledPlus from "../../assets/plus-circle-white.svg";
import { Button } from "react-bootstrap";
import { Container, Col, Row } from "react-bootstrap";
import WorkItem from "./WorkItem.jsx";
import { useEffect, useState } from "react";
import ModalElement from "../ModalElement/Modal.jsx";
import { assignmentModelContext } from "../../context/ModalContext.jsx";

const idGenerator = () => Math.random().toString(36).substr(2, 9);

function SubjectBlock({ remove, id, name }) {
  const [assignmentShow, setAssignmentShow] = useState(false);
  const [taskShow, setTaskShow] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [currentObject, setObject] = useState({});
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const storedAssignments = localStorage.getItem(`assignments_${id}`);
    const storedTasks = localStorage.getItem(`tasks_${id}`);

    setAssignments(storedAssignments ? JSON.parse(storedAssignments) : []);
    setTasks(storedTasks ? JSON.parse(storedTasks) : []);
  }, []);

  const handleAssignmentClose = () => setAssignmentShow(false);
  const handleTaskClose = () => setTaskShow(false);

  const handleAssignmentShow = () => setAssignmentShow(true);
  const handleTaskShow = () => setTaskShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setObject((prev) => ({ ...prev, [name]: value }));
    setShowMessage(false);
  };

  const addLabel = (itemID, object, label) => {
    if (!object?.title || !object?.date) {
      console.error("Invalid object:", object);
      return;
    }

    const newItem = { key: idGenerator(), ...object };

    if (label === "assignment") {
      setAssignments((prev) => {
        const updatedAssignments = [...prev, newItem];
        localStorage.setItem(`assignments_${id}`, JSON.stringify(updatedAssignments));
        return updatedAssignments;
      });
      handleAssignmentClose();
    } else if (label === "task") {
      setTasks((prev) => {
        const updatedTasks = [...prev, newItem];
        localStorage.setItem(`tasks_${id}`, JSON.stringify(updatedTasks));
        return updatedTasks;
      });
      handleTaskClose();
    }

    setShowMessage(true);
  };

  const removeLabel = (objectID, label) => {
    if (label === "assignment") {
      setAssignments((prev) => {
        const updatedAssignments = prev.filter(
          (assignment) => assignment.key !== objectID,
        );
        localStorage.setItem(`assignments_${id}`, JSON.stringify(updatedAssignments));
        return updatedAssignments;
      });
    } else if (label === "task") {
      setTasks((prev) => {
        const updatedTasks = prev.filter((task) => task.key !== objectID);
        localStorage.setItem(`tasks_${id}`, JSON.stringify(updatedTasks));
        return updatedTasks;
      });
    }
  };

  return (
    <>
      <assignmentModelContext.Provider
        value={{ taskShow: false, assignmentShow: false }}
      >
        <Container className="text-custom-color-grey-text-emphasis">
          <div className="p-3 my-3 mx-3 bg-custom-color-grey-lighter rounded-4">
            <Row className="mb-3">
              <Col xs={12}>
                <h4 className="fw-bold fs-3 mb-3">{name}</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={11} className="mb-3">
                <p className="fw-bolder fs-5">Assignments</p>
                <hr style={{ borderWidth: "2px" }} />
                {assignments.length > 0 ? (
                  assignments.map((assignment) => (
                    <WorkItem
                      key={assignment.key}
                      assignmentId={assignment.key}
                      title={assignment.title}
                      date={assignment.date}
                      type="assignment"
                      remove={removeLabel}
                    />
                  ))
                ) : (
                  <p className="text-custom-color-grey-text-emphasis">
                    No assignments added
                  </p>
                )}
              </Col>
              <Col>
                <div className="d-flex align-items-center justify-content-center image-container">
                  <img
                    className="float-end pt-2 default-image"
                    src={UnfilledPlus}
                    style={{ minWidth: "25px", minHeight: "25px" }}
                    alt="Add Assignment"
                    onClick={handleAssignmentShow}
                  />
                  <img
                    className="float-end pt-2 hover-image"
                    src={FilledPlus}
                    style={{ minWidth: "25px", minHeight: "25px" }}
                    onClick={handleAssignmentShow}
                    alt="Add Assignment"
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={11}>
                <p className="fw-bolder fs-5">Tasks</p>
                <hr style={{ borderWidth: "2px" }} />
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <WorkItem
                      key={task.key}
                      assignmentId={task.key}
                      title={task.title}
                      date={task.date}
                      type="task"
                      remove={removeLabel}
                    />
                  ))
                ) : (
                  <p className="text-custom-color-grey-text-emphasis">
                    No tasks added
                  </p>
                )}
              </Col>
              <Col>
                <div className="d-flex align-items-center justify-content-center mb-3 image-container">
                  <img
                    className="float-end pt-2 default-image"
                    src={UnfilledPlus}
                    style={{ minWidth: "25px", minHeight: "25px" }}
                    alt="Add Task"
                    onClick={handleTaskShow}
                  />
                  <img
                    className="float-end pt-2 hover-image"
                    src={FilledPlus}
                    style={{ minWidth: "25px", minHeight: "25px" }}
                    onClick={handleTaskShow}
                    alt="Add Task"
                  />
                </div>
              </Col>
            </Row>

            {/* Remove Subject Button */}
            <div className="d-flex align-items-center pe-5">
              <Button
                className="py-1 px-4 mt-2 center-me rounded-5 btn-sm"
                variant="outline-secondary"
                onClick={() => remove(id)}
              >
                Remove
              </Button>
            </div>
          </div>
        </Container>

        {/* Modals */}
        <ModalElement
          title="Add an Assignment"
          element1="Assignment"
          show={assignmentShow}
          element3="Date"
          closeFunction={handleAssignmentClose}
          saveChanges={() => addLabel(id, currentObject, "assignment")}
          handleChange={handleInputChange}
          emptyElement={showMessage}
        />
        <ModalElement
          show={taskShow}
          closeFunction={handleTaskClose}
          saveChanges={() => addLabel(id, currentObject, "task")}
          handleChange={handleInputChange}
          title="Add a Task"
          element1="Task"
          element3="Date"
          emptyElement={showMessage}
        />
      </assignmentModelContext.Provider>
    </>
  );
}

export default SubjectBlock;
