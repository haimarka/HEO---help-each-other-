import {useState} from 'react';
import { authentucation } from './firebase';
import { RecaptchaVerifier,signInWithPhoneNumber } from 'firebase/auth'; 
import firebase from "./firebase";

function PhoneNumber({setTelephone,setPassword,password}) {
  const [codeArea,setCodeArea] = useState("+972");
  const [phoneNumber,setPhoneNumber] = useState(codeArea);
  const [expandForm,setExpandForm] = useState(false);
  const [OTP,setOTP] = useState('');

  const generateRecaptcha =()=>{
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
      }
    }, authentucation);
  }

  const veriftOTP = () =>{
    
    if(OTP.length == 6){
      let confirmationResult = window.ConfirmationResult;
      confirmationResult.confirm(OTP).then((result) => {
        setTelephone(phoneNumber);
        setPassword(OTP)
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  const requestOTP =(e)=>{
    e.preventDefault();
    if(phoneNumber.length >=12){
        setExpandForm(true)
        generateRecaptcha()
        let  appVerifier = window.recaptchaVerifier
        signInWithPhoneNumber(authentucation,phoneNumber,appVerifier)
        .then(ConfirmationResult=>{
          window.ConfirmationResult = ConfirmationResult
        })
        .catch((error)=>{
          console.log(error);
        })
    }
  }

  return (
    <>
      <div >
        <label>PHONE-NUMBER</label><br/>
        <select onChange={(e)=>{
          setCodeArea(e.target.value)
          }} >
          <option>+972</option>
          <option >+1</option>
          <option >+44</option>
          <option >+251</option>
        </select>
        <input type="text" id='phoneNumberInput' placeholder='053*******' onBlur={(e)=>{
          let number = e.target.value; 
          if(number[0]=== "0"){
            number = number.substring(1)
          }
          setPhoneNumber(codeArea+number)
        }}></input><br/>
        <button type="button" onClick={requestOTP}>send</button>
      {expandForm?<div>
        <h5>Enter the code sent to you</h5>
        <input type="text" id='otpInput' value={OTP} onChange={(e)=>{
          setOTP(e.target.value);
        }}/><br/><br/>
        {!password?<button onClick={veriftOTP}>confirm</button>:""}
      </div>:null}
      
      </div>
      <div id="recaptcha-container"></div></>
  );
}

export default PhoneNumber;
