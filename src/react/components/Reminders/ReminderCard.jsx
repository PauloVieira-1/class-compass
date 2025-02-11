import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import emptyTrash from "../../assets/trash3.svg";
import fullTrash from "../../assets/trash3-fillw.svg";

const priorityColors = {
  "High Priority": "custom-color-red",
  "Medium Priority": "custom-color-blue",
  "Low Priority": "custom-color-green",
  "No Priority": "custom-color-grey-light",
};

const priorityColorsInside = {
  "High Priority": "custom-color-red-dark",
  "Medium Priority": "custom-color-blue-dark",
  "Low Priority": "custom-color-green-dark",
  "No Priority": "custom-color-grey",
};
function ReminderCard(props) {
  const [color, setColor] = useState(priorityColors[props.priority]);
  const [colorInside, setColorInside] = useState(
    priorityColorsInside[props.priority],
  );
  const [tag, setTag] = useState(props.priority);

  const cardStyle = {
    height: "20vh",
    width: "30vh",
  };

  function changeColorOuter() {
    const currentTag = tag;
    const colorKeys = Object.keys(priorityColors);

    const nextTag = colorKeys.find(
      (key, index) =>
        index === (colorKeys.indexOf(currentTag) + 1) % colorKeys.length,
    );

    setColor(priorityColors[nextTag]);
    setTag(nextTag);
  }

  function changeColorInner() {
    const currentTag = tag;
    const colorKeys = Object.keys(priorityColorsInside);

    const nextTag = colorKeys.find(
      (key, index) =>
        index === (colorKeys.indexOf(currentTag) + 1) % colorKeys.length,
    );

    setColorInside(priorityColorsInside[nextTag]);
    setTag(nextTag);
  }

  const colorKeys = Object.keys(priorityColors);
  const newTag = colorKeys[(colorKeys.indexOf(tag) + 1) % colorKeys.length];

  return (
    <div
      className={`bg-${color} rounded-4 p-3 text-white hover-shadow h-100 mx-3 my-3 container-hidden`}
      style={cardStyle}
    >
      <div className="d-flex align-items-center justify-content-between text-center">
        <h3 className="px-2 mb-3">{props.title}</h3>
        <div className="d-flex align-items-center justify-content-center image-container float-end pt-0 text-center mb-3">
          <img
            className="float-end default-image hover-trash"
            src={emptyTrash}
            style={{ minWidth: "20px", minHeight: "20px" }}
            alt="Logo"
          ></img>
          <img
            className="float-end hover-image"
            src={fullTrash}
            style={{ minWidth: "20px", minHeight: "20px" }}
            alt="Logo"
            onClick={() => props.removeReminder(props.id)}
          ></img>
        </div>
      </div>
      <div className={`bg-${colorInside} rounded-4 p-3`}>
        <h5>{props.content}</h5>
        <p className="mb-0">{props.date}</p>
      </div>
      <div
        className={`bg-${colorInside} rounded-5 px-3 py-0 mt-3  text-center img-effect`}
      >
        <p
          onClick={() => {
            changeColorOuter();
            changeColorInner();
            props.changePriority(props.id, newTag);
          }}
          style={{ cursor: "pointer", width: "100%" }}
          className="py-1 fw-bld"
        >
          {tag}
        </p>
      </div>
    </div>
  );
}

export default ReminderCard;
