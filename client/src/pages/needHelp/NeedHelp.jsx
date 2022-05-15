import {useEffect,useState} from 'react';
import axios from 'axios';
import style from './needHelp.module.css';
import PhoneNumber from '../authPhone/PhoneNumber';

export default function NeedHelp() {
  const [telephone,setTelephone] = useState("")
  const [password,setPassword] = useState("")
  const [cities,setCities] = useState([])
  const [category,setCategory] = useState([])
  const [city,setCity] = useState("abo ghosh")
  const [occupation,setOccupation] = useState("Other")
  const [data,setData]= useState([])

  useEffect(()=>{
    axios.get('/api/data/fetch')
    .then((res)=>{
      setCities(res.data[0].cities)
      setCategory(res.data[0].categories);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  if(password){
    axios
    .post("/api/users/register",{phoneNumber:telephone,category,occupation})
    .then((res)=>{
      setData(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <form style={{width:"40%",marginLeft:"30%",border:" 2px solid white",height:"70vh",marginTop:"3%",backgroundColor:"#e1a99d"}}>
        <div className={style.labelUser}>
            <label>City:</label><br/>
            {cities.length?<div className="input-group-append" style={{marginLeft:"-20px"}}>
                    <span style={{backgroundColor:"pink"}} className="input-group-text"><i className="fa fa-city"></i></span>
                    <select  className='form-control' onBlur={(e)=>{setCity(e.target.value);}}>
                      {cities.map((item, i) => {
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
                  </div>:""}<br/>
            <label>Professional / Occupation help:</label><br/>
            {category.length?<div className="input-group-append">
                    <select className='form-control' onBlur={(e)=>{setOccupation(e.target.value);}}>
                      {category.map((item, i) => {
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
                  </div>:""}<br/>
                  {password?<div>
                    {data.length?data.map((item)=>{
                      return(
                        <div>
                          <h1>{item.name}</h1>
                          <img src={item.img} alt="" />
                        </div>
                      )
                    }):""}
                  </div>:""}
        </div> 
        <div className={style.inputUser}>
        <PhoneNumber setTelephone={setTelephone} setPassword={setPassword} password={password} />
        </div> 
    </form>
  )
}
