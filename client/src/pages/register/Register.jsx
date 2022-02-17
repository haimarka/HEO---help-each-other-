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
    <div>Register</div>
  )
}
