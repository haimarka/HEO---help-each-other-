import axios from "axios";
import React, { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [problem, setProblem] = useState("");
  const [freeText, setFreeText] = useState("");

  const getUser = () => {
    axios
      .get("/")
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  };

  const postUser = () => {
    axios
      .post("/", {
        city,
        problem,
        freeText,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  };
  return (
    <div>
      <h2>Home page</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getUser();
          postUser();
          console.log(city, problem, freeText);
        }}
      >
        <input
          onChange={(e) => setCity(e.target.value)}
          type="text"
          placeholder="enter your city"
        />{" "}
        <input
          onChange={(e) => setProblem(e.target.value)}
          type="text"
          placeholder="enter your problem"
        />{" "}
        <br /><br />
        <textarea
          onChange={(e) => setFreeText(e.target.value)}
          cols="25"
          rows="5"
        ></textarea>
        <br />
        <button type="submit">submit</button>
      </form>
      <div>
      </div>
    </div>
  );
}
