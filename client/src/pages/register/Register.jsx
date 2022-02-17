import { useEffect, useState } from "react";
import axios from "axios";
import fireBaseApi from "../../logic/key";
import { Spinner } from "react-bootstrap";
import PhoneNumber from "../authPhone/PhoneNumber";
// import "bootstrap/dist/css/bootstrap.min.css";
import style from "./register.module.css";
import { async, isIndexedDBAvailable } from "@firebase/util";
const Register = ({ setAuth }) => {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("MEN");
  const [fullName, setFullName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [city, setCity] = useState("abo ghosh");
  const [categories, setCategories] = useState([]);
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

  const registerForm = async () => {
    setErrorMessage("");
      setLoading(true);
      const newUser = {
        fullName: fullName,
            email: email,
            telephone: telephone,
            city: city,
            password: password,
            gender: gender,
            occupations: occupations.length?["other"]:occupations,
            categories: categories.length?["other"]:occupations,
            start: start,
            end: end,
      }
      const user = await axios.post("/api/volunteers/register", newUser);
      if(user.status != 201){
        const errorMessage = user.response.data.error.message;
        console.log(errorMessage);
          setErrorMessage(errorMessage);
        }
    setLoading(false);
};

  return (
    <div className={style.BoxContainer}>
      <div className={style.container}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (password){
              registerForm();}
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
              onBlur={(e) => {
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
              onBlur={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <label>CITY</label>
            <br />
            {data.cities?.length ? (
              <select onBlur={(e)=>{setCity(e.target.value);}}>
                {data.cities.map((item, i) => {
                  return (
                    <option
                      value={item.english_name}
                      key={i}
                    >
                      {item.english_name}
                    </option>
                  );
                })}
              </select>
            ) : (
              ""
            )}
            <br />
            <label>CATEGORIES</label>
            <br />
            {data.categories?.length ? (
              <div>
                {data.categories.map((item, i) => {
                  return (
                    <label key={i}>
                      {item.english_name}
                      <input
                        type="checkbox"
                        key={i}
                        onClick={(e) => {
                          const arrayCategories=[...categories];
                          console.log(e.target.checked);
                          if(e.target.checked == true){
                            arrayCategories.push(item.english_name)
                            setCategories(arrayCategories)
                          }else{
                            let check = arrayCategories.findIndex((element)=>element == item.english_name);
                            arrayCategories.splice(check,1)
                            setCategories(arrayCategories)
                          }
                       
                        }}
                      />
                    </label>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            <br />
            <label>OCCUPATIONS</label>
            <br />
            {data.occupation?.length ? (
              <div>
                {data.occupation.map((item, i) => {
                  return (
                    <label key={i}>
                      {item.english_name}
                      <input
                        type="checkbox"
                        key={i}
                        onChange={(e) => {
                          setOccupations(e.target.value);
                        }}
                        onClick={(e) => {
                          const arrayOccupations=[...occupations];
                          console.log(e.target.checked);
                          if(e.target.checked == true){
                            arrayOccupations.push(item.english_name)
                            setOccupations(arrayOccupations)
                          }else{
                            let check = arrayOccupations.findIndex((element)=>element == item.english_name);
                            arrayOccupations.splice(check,1)
                            setOccupations(arrayOccupations)
                          }
                       
                        }}
                      />
                    </label>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            <br />
            <label>GENDER</label>
            <br />
            <select onChange={(e) => {
                  setGender(e.target.value);
                }}>
              <option
                value="MEN"
              >
                MEN
              </option>
              <option
                value="WOMEN"
              >
                WOMEN
              </option>
            </select>
            <br />
            <label>AVAILABILITY</label>
            <br />
            <input
              onChange={(e) => {
                setStart(e.target.value);
              }}
              type="time"
            />
            <input
              onChange={(e) => {
                setEnd(e.target.value);
              }}
              type="time"
            />
            {
            loading 
            ?              
              <Spinner animation="border" variant="danger" />
            : 
              ""
            }
          </div>
        <PhoneNumber setTelephone={setTelephone} setPassword={setPassword} password={password}/>
          {password ? 
           <input
           className={style.SubmitButton}
           autoComplete="on"
           type="submit"
           value="Register"
           />
           : 
           ""} 
           <p style={{ color: "red" }}>{errorMessage ? errorMessage : ""}</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
