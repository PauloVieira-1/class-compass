import { Button } from "react-bootstrap";
import { useState } from "react";
import Search from "../../assets/search.svg";
import SearchOrange from "../../assets/search-orange.svg";

import { Container } from "react-bootstrap";

function StartSearch() {
  const [search, setSearch] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    let searchTerm = `https://www.google.com/search?q=${search}`;
    if (search !== "") {
      window.location.href = searchTerm;
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center mt-5">
      <div
        id="tool-menu2"
        className="shadow py-0 ps-4 pe-2 d-flex align-items-center"
      >
        <form id="search" onSubmit={searchHandler} className="flex-grow-1 me-2">
          <input
            placeholder="Search"
            className="fs-4"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            style={{ width: "100%", height: "30px" }}
          />
        </form>
        <Button
          variant="outline-custom-color-orange-2"
          type="submit"
          form="search"
          className="rounded-5 text-white px-2 mx-2 py-2 ms-auto h-100 image-container"
          style={{ Width: "50px", Height: "50px" }}
        >
          <div className="">
            <img
              className="float-end hover-image "
              src={Search}
              style={{ maxWidth: "13px", maxHeight: "13px" }}
              alt="Logo"
            ></img>
            <img
              className="float-end default-image "
              src={SearchOrange}
              style={{ maxWidth: "13px", maxHeight: "13px" }}
              alt="Logo"
            ></img>
          </div>
        </Button>
      </div>
    </Container>
  );
}

export default StartSearch;
