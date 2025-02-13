import { Container, Row, Col } from "react-bootstrap";
import ReminderCard from "./ReminderCard.jsx";
import { reminderModelContext } from "../../context/ModalContext.jsx";
import { useState, useEffect } from "react";
import ModalElement from "../ModalElement/Modal.jsx";
import UnfilledPlus from "../../assets/plus-circle.svg";
import FilledPlus from "../../assets/plus-circle-fill.svg";
import Empty from "../Other/Empty.jsx";

const INITIAL_VALUES = Object.freeze({
  title: "",
  content: "",
  date: "",
  time: "",
  priority: "No Priority",
});

const idGenerator = () => Math.random() + 1;

function ReminderHolder() {
  const [reminderShow, setReminderShow] = useState(false);
  const [reminderData, setReminderData] = useState({ ...INITIAL_VALUES });
  const [reminders, setReminder] = useState([]);
  const [showMesage, setShowMessage] = useState(true);
  const [reminderDisplay, setReminderDisplay] = useState(false);

  useEffect(() => {
    const reminders = JSON.parse(localStorage.getItem("reminders"));

    if (reminders || reminders !== undefined) {
      const sorted = reminders?.sort(
        (a, b) => new Date(a.date) - new Date(b.date),
      );
      setReminder(sorted);
    }
  }, []);

  useEffect(() => {
    if (reminders !== undefined && reminders.length > 0) {
      setReminderDisplay(true);
    } else {
      setReminderDisplay(false);
    }
  }, [reminders]);

  /**
   * @param {Object} e
   * @returns {void}
   */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReminderData((preAppData) => {
      preAppData = { ...preAppData };
      preAppData[name] = value;

      return preAppData;
    });
    setShowMessage(false);
  };

  const addReminder = () => {
    const current_id = idGenerator();

    if (
      reminderData.title !== "" ||
      reminderData.content !== "" ||
      reminderData.date !== ""
    ) {
      const newReminders = [
        ...(reminders ?? []),
        { key: current_id, ...reminderData },
      ]; /// weird  bracket thing why [] when I have reminders default

      setReminder(newReminders);
      localStorage.setItem("reminders", JSON.stringify(newReminders));
      setReminderShow(false);
      setReminderData({ ...INITIAL_VALUES });
      setShowMessage(true);
      sendMessageBackground(
        reminderData.date,
        reminderData.time,
        reminderData.title,
      );
    }
  };

  /**
   *
   * @param {String} date
   * @param {String} time
   */

  const sendMessageBackground = (date, time, reminder) => {
    chrome.runtime.sendMessage({ event: "sendDate", date, time, reminder });
  };

  /**
   *
   * @param {String} reminderId
   */

  const removeReminder = (reminderId) => {
    const foundReminder = reminders?.find((item) => item.key === reminderId);
    sendMessageBackgroundRemove(
      foundReminder.date,
      foundReminder.time,
      foundReminder.title,
    );

    const newReminders = reminders.filter((item) => item.key !== reminderId);
    setReminder(newReminders);
    localStorage.setItem("reminders", JSON.stringify(newReminders));
  };

  const sendMessageBackgroundRemove = (date, time, reminder) => {
    chrome.runtime.sendMessage({ event: "removeDate", date, time, reminder });
  };

  /**
   * @param {Object} reminderkey
   * @param {String} priority
   */

  const setPriority = (reminderkey, priority) => {
    const new_reminders = reminders.map((item) => {
      if (item.key === reminderkey) {
        return {
          ...item,
          priority: priority,
        };
      }
      return item;
    });

    setReminder(new_reminders);
    localStorage.setItem("reminders", JSON.stringify(new_reminders));
  };

  const handleShow = () => setReminderShow(true);
  const handleClose = () => setReminderShow(false);

  return (
    <reminderModelContext.Provider value={{ reminderShow: false }}>
      <Container className="px-1 py-0">
        <Row>
          <Col
            className="px-3 py-1"
            style={{ overflowY: "scroll", maxHeight: "580px" }}
          >
            <Row className="">
              {reminderDisplay ? (
                reminders?.map((item) => (
                  <ReminderCard
                    key={item.key}
                    id={item.key}
                    title={item.title}
                    content={item.date}
                    date={item.time}
                    priority={item.priority}
                    changePriority={setPriority}
                    removeReminder={removeReminder}
                  />
                ))
              ) : (
                <Empty title="Reminders" />
              )}
            </Row>
          </Col>

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
                alt="Logo"
              ></img>
              <img
                className="float-end pt-2 hover-image me-2"
                src={FilledPlus}
                style={{ minWidth: "30px", minHeight: "30px" }}
                onClick={handleShow}
                alt="Logo"
              ></img>
            </div>
          </Col>
        </Row>
      </Container>
      <ModalElement
        show={reminderShow}
        closeFunction={handleClose}
        saveChanges={addReminder}
        handleChange={handleInputChange}
        title="Add a Reminder"
        element1="Reminder"
        element3="Date"
        element4="Time"
        emptyElement={showMesage}
      ></ModalElement>
    </reminderModelContext.Provider>
  );
}

export default ReminderHolder;
