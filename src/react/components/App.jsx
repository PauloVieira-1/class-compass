import { Container, Row, Col } from "react-bootstrap";
import "../../styles/GlobalCss.css";
import Navbar from "./Navbar/Navbar.jsx";
import "../../styles/colors.css";
import Subjects from "./Subjects/Subjects.jsx";
import { useState, useEffect } from "react";
import FeatureBox from "./FeatureBox/FeatureBox.jsx";
import ToolMenu from "./ToolMenu/ToolMenu.jsx";
import PinnedApplications from "./PinnedApplications/PinnedApplications.jsx";
import ReminderHolder from "./Reminders/ReminderHolder.jsx";
import StartPage from "./startPage/startPage.jsx";

function App() {
  const [showSubjects, setShowSubjects] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [showReminders, setReminders] = useState(false);
  const [showStart, setShowStart] = useState(true);
  const [showToolMenu, setShowToolMenu] = useState(false);

  const activateSubjects = () => {
    setShowSubjects(true);
    setShowApplications(false);
    setReminders(false);
    setShowStart(false);
    setShowToolMenu(true);
  };

  const activateApplications = () => {
    setShowSubjects(false);
    setShowApplications(true);
    setReminders(false);
    setShowStart(false);
    setShowToolMenu(true);
  };

  const activateReminders = () => {
    setShowSubjects(false);
    setShowApplications(false);
    setReminders(true);
    setShowStart(false);
    setShowToolMenu(true);
  };

  function backToHome() {
    setShowSubjects(false);
    setShowApplications(false);
    setReminders(false);
    setShowStart(true);
    setShowToolMenu(false);
  }

  return (
    <Container fluid className="p-0 mt-0" style={{ height: "100%" }}>
      <Row className="h-100 ms-0">
        <Col xs={3} className="d-flex flex-column ps-0">
          <Navbar
            style={{ flex: 1 }}
            subjectFunction={activateSubjects}
            applicationFunction={activateApplications}
            remindersFunction={activateReminders}
            startFunction={backToHome}
          />
        </Col>
        <Col xs={9} className="d-flex flex-column" style={{ height: "100%" }}>
          <Row className="mb-5">
            <Col>{showToolMenu ? <ToolMenu active={showToolMenu} /> : ""}</Col>
          </Row>
          <Row className="flex-grow-1 mt-5 me-3 pe-4">
            {showStart ? <StartPage /> : ""}
            <Col>
              <FeatureBox
                title="Subjects"
                active={showSubjects}
                component={<Subjects />}
              />
              <FeatureBox
                title="Applications"
                active={showApplications}
                component={<PinnedApplications />}
              />
              <FeatureBox
                title="Reminders"
                active={showReminders}
                component={<ReminderHolder />}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
