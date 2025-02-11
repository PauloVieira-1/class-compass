import "./Navbar.css";
import { Container, Row } from "react-bootstrap";
import QuickNotes from "../QuickNotes/QuickNotes.jsx";
import Logo from "../../assets/Logo.png";
function Navbar({
  subjectFunction,
  applicationFunction,
  remindersFunction,
  startFunction,
}) {
  return (
    <div id="navbar" className="rounded-4 shadow p-3 mt-1 mb-5">
      <Container>
        <Row
          style={{ height: "150px" }}
          className="bg-custom-color-gey-light rounded-3 text-center d-flex align-items-center justify-content-center"
        >
          <div className="d-flex align-items-center  text-center justify-content-center">
            <img
              className="text-white p-2 rounded-3 "
              src={Logo}
              style={{ height: "140px", cursor: "pointer" }}
              alt="Logo"
              onClick={startFunction}
            ></img>
          </div>
        </Row>
      </Container>
      <ul className="mt-4">
        <li>
          <button onClick={subjectFunction}>Subjects</button>
        </li>
        <li>
          <button onClick={applicationFunction}>Applications</button>
        </li>
        <li>
          <button onClick={remindersFunction}>Reminders</button>
        </li>
      </ul>
      <Container>
        <QuickNotes />
      </Container>
    </div>
  );
}

export default Navbar;
