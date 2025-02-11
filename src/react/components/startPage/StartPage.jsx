import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import StartSearch from "../ToolMenu/StartSearch.jsx";
import weather from "./weather.jsx";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function StartPage() {
  const [time, setTime] = useState(new Date());
  const [city, setCity] = useState("");
  const [weatherCode, setWeatherCode] = useState("");
  const [condition, setCondition] = useState("");
  const [temp, setTemp] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await fetch(
          "https://api.geoapify.com/v1/ipinfo?&apiKey=5b250786f7d447b69ad7eb5126aad923",
        );
        const data = await response.json();
        if (data.city?.name) {
          setCity(data.city.name);
          getWeather(data.city.name);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    const getWeather = async (cityName) => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=7a5d0f3e6abd49ce8ba163941251002&q=${cityName}&aqi=no`,
        );
        const data = await response.json();
        console.log(data);
        setWeatherCode(data.current.condition.code);
        setIcon(
          weather.find((item) => item.code === data.current.condition.code)
            .icon,
        );
        setCondition(data.current.condition.text);
        setTemp(data.current.temp_c);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <>
      <Container style={{ height: "40%" }} className="mt-5">
        <Row>
          <Col className="text-center text-custom-color-grey-text-emphasis display-4 mb-1">
            <h1 className="fw-bold" style={{ fontSize: "8.5rem" }}>
              {`${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`}
            </h1>
            <h3>
              {`${time.getDate()}${[1, 21, 31].includes(time.getDate()) ? "st" : [2, 22].includes(time.getDate()) ? "nd" : [3, 23].includes(time.getDate()) ? "rd" : "th"} of ${months[time.getMonth()]}, ${time.getFullYear()}`}
            </h3>
          </Col>
        </Row>
        <Row
          className="mt-5 text-center d-flex justify-content-center align-items-center"
          style={{ height: "%" }}
        >
          <Col className="text-center d-flex justify-content-center align-items-center">
            <StartSearch />
          </Col>
        </Row>
      </Container>
      <Container className="mt-5 position-absolute bottom-0 pb-5 me-4 pe-3">
        <Row className="">
          <Col xs={4}></Col>
          <Col xs={3} className="d-flex justify-content-end">
            <img
              src={icon}
              style={{ width: "100px", height: "100px", filter: "invert(1)" }}
            />{" "}
          </Col>
          <Col xs={4} className="text-white">
            <h2 className="fw-bold fs-4">{city ? `${city}` : "Loading..."}</h2>
            <p>{condition ? `${condition}` : "Loading..."}</p>
            <p>{temp ? `${temp}°C` : "Loading..."}</p>
          </Col>
          <Col xs={1}>
            <h1>""</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default StartPage;
