import { useEffect, useState } from "react";
import axios from "axios";
// import fireBaseApi from "../../logic/key";
import { Spinner } from "react-bootstrap";
import PhoneNumber from "../authPhone/PhoneNumber";
import './wantToVolunteer.css'
// import "bootstrap/dist/css/bootstrap.min.css";
// import style from "./register.module.css";
import { async, isIndexedDBAvailable } from "@firebase/util";
const WantToVolunteer = ({ setAuth }) => {
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
    <div className="container h-100">
      <div className="d-flex justify-content-center h-100">
        <div className="user_card">
          <div className="d-flex justify-content-center">
            <div className="brand_logo_container">
              <img
                className='brand_logo'
                src="https://i.ibb.co/KmpTG7h/Free-To-Help.png"
              />
            </div>
          </div>
          <div className="d-flex justify-content-center form_container">
            <form
            style={{width:"75%",height:"60vh"}}
              onSubmit={(e) => {
                e.preventDefault();
                if (password){
                  registerForm();}
              }}
            >
              <div>
              </div>
              <h6 >FreeToHelp</h6>
              <div >
                {/* <label>FULL-NAME</label><br /> */}
                <div class="input-group-append">
								  <span class="input-group-text"><i class="fas fa-user"></i></span>
                <input
                  className='form-control input_user'
                  type="text"
                  placeholder="Full-Name"
                  required
                  onBlur={(e) => {
                    setFullName(e.target.value);
                  }}
                />
							  </div><br/>
                <div class="input-group-append">
                    <span class="input-group-text"><i class="fa fa-at"></i></span>
                    <input
                      className='form-control input_user'
                      type="email"
                      placeholder="example@test.com"
                      onBlur={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                </div>
                <br/>
                {data.cities?.length ? (
                  <div class="input-group-append">
                    <span class="input-group-text"><i class="fa fa-city"></i></span>
                    <select className='form-control' onBlur={(e)=>{setCity(e.target.value);}}>
                      <option>city</option>
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
                  </div>
                ) : (
                  ""
                )}<br/><hr/>
                <h5>CATEGORIES</h5><br/>
                {data.categories?.length ? (
                  <div className="checkbox">
                    {data.categories.map((item, i) => {
                      return (
                        <div key={i} >
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
                         <p>{item.english_name}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
                  <hr/>
                <h5>OCCUPATIONS</h5>
                <br />
                {data.occupation?.length ? (
                  <div className="checkbox">
                    {data.occupation.map((item, i) => {
                      return (
                        <div key={i}>
                          <input
                            type="checkbox"
                            key={i}
                            onChange={(e) => {
                              setOccupations(e.target.value);
                            }}
                            onClick={(e) => {
                              const arrayOccupations=[...occupations];
                              if(e.target.checked == true){
                                arrayOccupations.push(item.english_name)
                                setOccupations(arrayOccupations)
                              }else{
                                let check = arrayOccupations.findIndex((element)=>element == item.english_name);
                                arrayOccupations.splice(check,1)
                                setOccupations(arrayOccupations)
                              }
                          
                            }}
                          /><br></br>
                          {item.english_name}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
                <br />
                <div style={{display:"flex",justifyContent:"space-around"}}>
                <div style={{width:"47%"}}>
                <h5>GENDER</h5>
                <br />
                <select 
                className='form-control'
                onChange={(e) => {
                      setGender(e.target.value);
                    }}>
                  <option
                    value="Male"
                  >
                    Male
                  </option>
                  <option
                    value="Female"
                  >
                    Female
                  </option>
                </select></div>
                
                <div style={{width:"47%"}}>
                <h5>AVAILABILITY</h5>
                <br />
                    <div style={{display:"flex"}}>
                        <input
                        className='form-control'
                          onChange={(e) => {
                            setStart(e.target.value);
                          }}
                          type="time"
                        />
                        <input
                        className='form-control'
                          onChange={(e) => {
                            setEnd(e.target.value);
                          }}
                          type="time"
                        />
                    </div>
                    </div>
                </div>
                {
                loading 
                ?              
                  <Spinner animation="border" variant="danger" />
                : 
                  ""
                }
              </div><br/>
            <PhoneNumber setTelephone={setTelephone} setPassword={setPassword} password={password}/>
              {password ? 
              <input
              className='btn login_btn SubmitButton'
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
      </div>
    </div>
  );
};

export default WantToVolunteer;
