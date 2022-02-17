import axios from 'axios';
import {useState} from 'react';

export default function LogIn() {
  const [phoneNumber,setPhoneNumber] = useState("");
  const [password,setPassword] = useState("");
  function postLogin(e) {
    e.preventDefault()
    axios.post("/api/volunteers/login",{phoneNumber,password})
    .then((res)=>{console.log(res.data);})
    .catch((err)=>{console.log(err);})
  }
  return (
    <form onSubmit={postLogin}>
      <label>phone:</label><br/>
      <input type="text" placeholder='05455******' onBlur={(e)=>{
        let number = e.target.value;
        if(number[0] == "0"){
          number = number.substring(1)
        }
        console.log(number);
        setPhoneNumber("+972"+number)
        }}/><br/>
      <label>password:</label><br/>
      <input type="password" placeholder='******' onChange={(e)=>setPassword(e.target.value)}/><br/>
      <button type='submit'>Login</button>
    </form>
  )
}
