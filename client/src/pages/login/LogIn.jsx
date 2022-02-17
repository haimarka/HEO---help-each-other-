import axios from 'axios';
import {useState} from 'react';

export default function LogIn({auth , setAuth}) {
  const [phoneNumber,setPhoneNumber] = useState("");
  const [password,setPassword] = useState("");

  

async  function postLogin(e) {
    e.preventDefault()
<<<<<<< HEAD
    try {
      const response = await axios.post("/api/volunteers/login",{phoneNumber,password})
      setAuth(response.data._id)
      localStorage.setItem("user",JSON.stringify(response.data._id)) 
    } catch (error) {
      console.log(error);
    }
=======
    axios.post("/api/volunteers/login",{phoneNumber,password})
    .then((res)=>{console.log(res.data);})
    .catch((err)=>{console.log(err);})
>>>>>>> 22bc3a7610472f653dd877d8c70312cba9e7bc05
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
