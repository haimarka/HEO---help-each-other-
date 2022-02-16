import { useEffect, useState } from "react";
import axios from "axios";
import fireBaseApi from "../../logic/key";
import { Spinner } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import style from "./register.module.css";
const Register = ({ setAuth, USERֹֹ_INFORMATIOM, setFlag, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [city, setCity] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  useEffect(()=>{
    axios.get("/data")
    .then(res=>console.log(res.data))
    .catch(err=>err)
    },[]);
  const registerForm = () => {
    setLoading(true);
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${fireBaseApi}`,
        {
          email,
          password,
        }
      )
      .then(function (response) {
        axios
          .post("/register/volunteer", {
          fullName:fullName,
          email:email,
          telephone:telephone,
          city:city,
          occupations:occupations,
          categorys:categorys
          })
          .then(function (res) {
            console.log(res.data, "resData");
          })
          .catch(function (error) {
            console.log(error.res);
          });
        setTimeout(() => {
          setLoading(false);
          setAuth(response.data);
          setUser(response.data.localId);
          console.log(response.data, "responseData");
          localStorage.setItem(
            USERֹֹ_INFORMATIOM,
            JSON.stringify(response.data)
          );
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
        const errorMessage = error.response.data.error.message;
        console.log(errorMessage);
        setErrorMessage(errorMessage);
        setLoading(false);
      });
  };
  const formValidation = () => {
    return email.length && password.length;
  };
  return (
    <div className={style.BoxContainer}>
      <div className={style.container}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (formValidation()) {
              registerForm();
            }
          }}
        >
          <img
            className={style.brandLogo}
            src="C:\Users\97254\Desktop\FreeToHelp.png"
          />
          <p className={style.brandTitle}>FreeToHelp</p>
          <div className={style.inputs}>
            <label>FULL-NAME</label>
            <input
              className={style.Input}
              type="text"
              placeholder="Full-Name"
              required
              onChange={(e) => {
                setFullName(e.target.value);
                setDisabled(formValidation());
              }}
            />
            <label>EMAIL</label>
            <input
              className={style.Input}
              type="email"
              placeholder="example@test.com"
              onChange={(e) => {
                setEmail(e.target.value);
                setDisabled(formValidation());
              }}
            />
               <label>TELEPHONE</label>
            <input
              className={style.Input}
              type="number"
              placeholder="Telephone"
              required
              onChange={(e) => {
                setTelephone(e.target.value);
                setDisabled(formValidation());
              }}
            />
            <label>PASSWORD</label>
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
            />
            )
            {loading ? (
              <p>
                <Spinner animation="border" variant="danger" />
              </p>
            ) : (
              <input
                className={style.SubmitButton}
                disabled={!disabled}
                autoComplete="on"
                type="submit"
                value="Register"
              />
            )}
          </div>
          <p style={{ color: "red" }}>{errorMessage ? errorMessage : ""}</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
