import {useState} from 'react';
import axios from 'axios';
import style from './needHelp.module.css';
import PhoneNumber from '../authPhone/PhoneNumber';

export default function NeedHelp() {
  const [telephone,setTelephone] = useState('')
  const [password,setPassword] = useState('')
  const [cities,setCities] = useState('')

  function getCities(){
    axios.get('/api/data/fetch')
    .then((res)=>{
      setCities(res.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  function askForHelp() {
    axios
    .post('/api/users/register',{phoneNumber:telephone,city:cities,occupation:password})
    .then
  }

  return (
    <form style={{display:"flex",justifyContent:"center"}}>
        <div className={style.labelUser}>
            <label>city:</label><br/>
            <label>Professional / occupation help:</label><br/>
            <label>phone:</label><br/>
        </div> 
        <PhoneNumber setCities={setCities} setPassword={setPassword} setTelephone={setTelephone}/>
        {<div className={style.inputUser}>
            <input/><br/>
            <input/><br/>
            <input/><br/>
        </div>} 
    </form>
  )
}
