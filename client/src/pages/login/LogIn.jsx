import axios from 'axios';
import {useState} from 'react';

export default function LogIn({auth , setAuth}) {
  const [phoneNumber,setPhoneNumber] = useState("");
  const [password,setPassword] = useState("");

  

async  function postLogin(e) {
    e.preventDefault()
    try {
      const response = await axios.post("/api/volunteers/login",{phoneNumber,password})
      setAuth(response.data._id)
      localStorage.setItem("user",JSON.stringify(response.data._id)) 
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={postLogin}>
      <label>phone:</label><br/>
      <input type="text" placeholder='05455******' onChange={(e)=>setPhoneNumber(e.target.value)}/><br/>
      <label>password:</label><br/>
      <input type="password" placeholder='******' onChange={(e)=>setPassword(e.target.value)}/><br/>
      <button type='submit'>Login</button>
    </form>
  )
}
