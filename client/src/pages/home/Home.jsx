import axios from "axios";
import React, { useState } from "react";
import "./home.css";
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
      <div className="cardsContainer">
        <article className="card">
          <img
            src="https://as2.ftcdn.net/v2/jpg/04/56/73/03/1000_F_456730325_5HnmCg5Q4ktFX5wHSlWRkCtflo9UulSR.jpg"
            title="Distributing food those in need"
          />
        </article>
        <article className="card">
          <img
            src="https://t3.ftcdn.net/jpg/01/65/52/92/240_F_165529211_hLqoc8e91K5hpRPgibai9lEnbeZzjg9G.jpg"
            title="Children"
          />
        </article>
        <article className="card">
          <img
            src="https://t3.ftcdn.net/jpg/01/65/52/90/240_F_165529054_psP772fyIRhhyixzsp0pLsdNJbvX8gRn.jpg"
            title="Environmental"
          />
        </article>
        <article className="card">
          <img
            src="https://t3.ftcdn.net/jpg/03/15/23/02/240_F_315230292_fZ3ZU8KjLF1seVUeBdeXlMKaGizduq9P.jpg"
            title="Painting walls"
          />
        </article>
        <article className="card">
          <img
            src="https://t4.ftcdn.net/jpg/03/85/11/61/240_F_385116118_abUzDudGJyJfbtO1oxxP0MqjOeqGSiKs.jpg"
            title="Donation"
          />
          <img
            src="https://as2.ftcdn.net/v2/jpg/04/56/73/03/1000_F_456730325_5HnmCg5Q4ktFX5wHSlWRkCtflo9UulSR.jpg"
            title="Building"
          />
        </article>
        <article className="card">
          <img
            src="https://t3.ftcdn.net/jpg/03/52/46/50/240_F_352465056_lLNu4h0QBZg3ohTlUopcaqEvdR9OutBV.jpg"
            title="Distributing Food"
          />
        </article>
        <article className="card">
          <img
            src="https://t4.ftcdn.net/jpg/03/78/57/27/240_F_378572734_RbGfx9unoqBHT8bvoOfcdcp4qQ4T3w6K.jpg"
            title="Elderly Pepole"
          />
        </article>
        <article className="card">
          <img
            src="https://t4.ftcdn.net/jpg/01/77/34/81/240_F_177348121_28DmqVpBrn8OrVJyLbYIxigl8mSDTmaL.jpg"
            title="Doing Homework"
          />
        </article>
        <article className="card">
          <img
            src="https://t4.ftcdn.net/jpg/00/32/03/29/240_F_32032927_hJl56uQsId0IKVLpSyOFdJx1QSMXihdG.jpg"
            title="Help together"
          />
        </article>
      </div>

      <div className="howItWorks">
        <h1 className="title">How It Works</h1>
        <ul className="steps">
          <li className="step">
            <b className="number"> 1-</b> <b className="color">You Choose</b> Custom volunteering through our search engine.
          </li>
          <li className="step">
            <b className="number">2-</b><b className="color"> We'll stay in touch</b> We verify the information you send us.
          </li>
          <li className="step">
            <b className="number">3-</b> <b className="color">Accept</b> Contact details for the volunteer place, and at the
            same time your details are transferred there.
          </li>
          <li className="step">
            <b className="number">4-</b><b className="color"> Begin to volunteer</b> In a place tailored to you personally.
          </li>
        </ul>
      </div>
    </div>
  );
}
