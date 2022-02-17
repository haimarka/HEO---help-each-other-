import React from 'react'
import { Link, Redirect } from 'react-router-dom';

export default function  ({auth , setAuth}) {
  console.log(auth);
  return (
    <div>
      { auth ? <>
      <Link to='/'>Home</Link>
      <Link to='/About'>About</Link>
      <Link to='/LogIn'>LogIn</Link>
      <Link to='/Register'>Register</Link>
      <Link to='/Search'>Search</Link> 
      <button onClick={()=>{
        setAuth(null)
        localStorage.removeItem("user")
      }}>logout</button>
      </> 
      : 
      <> <Link to='/'>Home</Link>
      <Link to='/About'>About</Link>
      <Link to='/LogIn'>LogIn</Link>
      <Link to='/Register'>Register</Link>
      <Link to='/Search'>Search</Link> </>}
    </div>
  )
}
