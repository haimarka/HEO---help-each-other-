import { useEffect, useState } from "react";
import axios from "axios";
import fireBaseApi from "../../logic/key";
import { Spinner } from "react-bootstrap";
import PhoneNumber from "../authPhone/PhoneNumber";
// import "bootstrap/dist/css/bootstrap.min.css";
import style from "./register.module.css";
const Register = ({ setAuth }) => {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [city, setCity] = useState("");
  const [categorys, setCategorys] = useState("");
  const [occupations, setOccupations] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    axios
      .get("/api/data/fetch")
      .then((res) => setData(res.data[0]))
      .catch((err) => err);
  }, []);

  const registerForm = () => {
    setLoading(true);
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${fireBaseApi}`,
        {
          email,password
        }
      )
      .then(function (response) {
        axios
          .post("/api/volunteers/register", {
            fullName: fullName,
            email: email,
            telephone: telephone,
            city: city,
            password,
            occupations: occupations,
            categorys: categorys,
          })
          .then(function (res) {
            console.log(res.data, "resData");
          })
          .catch(function (error) {
            console.log(error.res);
          });
        setLoading(false);
        setAuth(response.data);
        // JSON.stringify(response.data)
      })
      .catch(function (error) {
        console.log(error);
        const errorMessage = error.response.data.error.message;
        console.log(errorMessage);
        setErrorMessage(errorMessage);
        setLoading(false);
      });
  };
  
  return (
    <div className={style.BoxContainer}>
      <div className={style.container}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            registerForm();
          }}
        >
          <img
            className={style.brandLogo}
            src="https://i.ibb.co/KmpTG7h/Free-To-Help.png"
            width="5%"
            height="5%"
          />
          <p className={style.brandTitle}>FreeToHelp</p>
          <div className={style.inputs}>
            <label>FULL-NAME</label>
            <br />
            <input
              className={style.Input}
              type="text"
              placeholder="Full-Name"
              required
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
            <br />
            <label>EMAIL</label>
            <br />
            <input
              className={style.Input}
              type="email"
              placeholder="example@test.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            /><br/>
            <label>CITY</label><br/>
            {data.cities?.length ? (
              <select>
                {data.cities.map((item, i) => {
                  return (
                    <option
                    value={item.english_name}
                    key={i}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    >
                      {item.english_name}
                    </option>
                  );
                })}
              </select>
            ) : (
              ""
              )}
            {/* <label>PASSWORD</label>
            <input
            className={style.Input}
            type="password"
            placeholder="Min 6 charaters long"
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setDisabled(formValidation());
            }}
            />
            <label>CONFIRM PASSWORD</label>
            <input
            className={style.Input}
            type="password"
            placeholder="Min 6 charaters long"
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setDisabled(formValidation());
            }}
          /> */}

          {password?<input
                className={style.SubmitButton}
                autoComplete="on"
                type="submit"
                value="Register"
                />:""}
            {loading ? (
              <p>
                <Spinner animation="border" variant="danger" />
              </p>
            ) : (
              ""
              )}
          </div>
          <p style={{ color: "red" }}>{errorMessage ? errorMessage : ""}</p>
        </form>
        <PhoneNumber setTelephone={setTelephone} setPassword={setPassword}/>
      </div>
    </div>
  );
};

export default Register;
