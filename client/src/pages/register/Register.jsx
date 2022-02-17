import React ,{useEffect}from 'react'
import axios from "axios"
export default function Register() {

useEffect(  () => { 


  const getDAta = async ()=>{
  const response =   await axios.get('/api/data/fetch')
  console.log(response.data);
  }

  getDAta()

}, []);
  

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
