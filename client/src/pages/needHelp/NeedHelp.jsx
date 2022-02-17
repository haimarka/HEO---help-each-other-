import {useEffect,useState} from 'react';
import axios from 'axios';
import style from './needHelp.module.css';

export default function NeedHelp() {

  const [cities,setCities] = useState([])

  function getCities(){
    axios.get('/api/data/fetch')
    .then((res)=>{
      setCities(res.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <form style={{display:"flex",justifyContent:"center"}}>
        <div className={style.labelUser}>
            <label>city:</label><br/>
            <label>Professional / occupation help:</label><br/>
            <label>phone:</label><br/>
        </div> 
        <div className={style.inputUser}>
            <input/><br/>
            <input/><br/>
            <input/><br/>
        </div> 
    </form>
  )
}
