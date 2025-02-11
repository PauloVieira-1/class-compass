import ApplicationBox from "./ApplicationBox.jsx";
import { Col, Row, Container } from "react-bootstrap";
import UnfilledPlus from "../../assets/plus-circle.svg";
import FilledPlus from "../../assets/plus-circle-fill.svg";
import ModalElement from "../ModalElement/Modal.jsx";
import { applicationModalContext } from "../../context/ModalContext.jsx";
import { useEffect, useState } from "react";
import Empty from "../Other/Empty.jsx";

const initialValues = Object.freeze({
  name: "",
  link: "",
});

const idGenerator = () => Math.random() + 1;

function PinnedApplications() {
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);
  const [appData, setAppData] = useState({ ...initialValues });
  const [emptyApplications, setEmptyApplications] = useState(false);
  const [showMesage, setShowMessage] = useState(true);

  useEffect(() => {
    const storedNotes = localStorage.getItem("apps");
    if (storedNotes) {
      setList(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    if (list !== null && list.length > 0) {
      setEmptyApplications(true);
    } else {
      setEmptyApplications(false);
    }
  }, [list]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addApp = () => {
    let current_id = idGenerator();
    setList((prevList) => [...prevList, { key: current_id, ...appData }]);
    localStorage.setItem(
      "apps",
      JSON.stringify([...list, { key: current_id, ...appData }]),
    );
    setShow(false);
    setShowMessage(true);
    setAppData(initialValues);
  };

  const removeApp = (itemId) => {
    setList((prevList) => {
      const updatedList = prevList.filter((item) => item.key !== itemId);
      return updatedList;
    });

    localStorage.setItem(
      "apps",
      JSON.stringify(list.filter((item) => item.key !== itemId)),
    );
  };

  /**
   *
   * @param {Object} e
   * @param {string} e.target.name - The name of the input field.
   * @param {string} e.target.value - The value of the input field.
   */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppData((preAppData) => {
      preAppData = { ...preAppData };
      preAppData[name] = value;

      return preAppData;
    });
    setShowMessage(false);
  };

  /**
   *
   * @param {string} url - The URL of the webpage to get the favicon for.
   * @returns {string} - The URL to fetch the favicon.
   */

  const getFavIcon = (url) => {
    let searchUrl = `https://${url}`;

    const urlLink = new URL(chrome.runtime.getURL("/_favicon/"));
    urlLink.searchParams.set("pageUrl", searchUrl);
    urlLink.searchParams.set("size", "32");

    return urlLink.toString();
  };

  return (
    <>
      <applicationModalContext.Provider value={{ show: false }}>
        <Container>
          <Row>
            <Col xs={11}>
              <Row style={{ overflowY: "scroll", maxHeight: "600px" }}>
                {emptyApplications ? (
                  list.map((item) => {
                    return (
                      <ApplicationBox
                        icon={getFavIcon(item.content)}
                        key={item.key}
                        id={item.key}
                        name={item.title}
                        link={item.content}
                        removeFunction={removeApp}
                      />
                    );
                  })
                ) : (
                  <Empty title={"applications"} />
                )}
              </Row>
            </Col>
            <Col xs={1} className="px-2">
              <div
                className="image-container float-end m-2"
                style={{ minWidth: "100%" }}
              >
                <img
                  className="float-end pt-2 default-image"
                  src={UnfilledPlus}
                  style={{ minWidth: "30px", minHeight: "30px" }}
                  onClick={handleShow}
                  alt="Logo"
                ></img>
                <img
                  className="float-end pt-2 hover-image"
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
          show={show}
          closeFunction={handleClose}
          saveChanges={addApp}
          handleChange={handleInputChange}
          title="Add an Application"
          element1="Application"
          element2="Link"
          emptyElement={showMesage}
        />
      </applicationModalContext.Provider>
    </>
  );
}
export default PinnedApplications;
