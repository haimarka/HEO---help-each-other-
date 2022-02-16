import {useState} from 'react';
import { authentucation } from './firebase';
import { RecaptchaVerifier,signInWithPhoneNumber } from 'firebase/auth'; 
import './App.css';
import firebase from "./firebase";

function App() {
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

  const veriftOTP = (e) =>{
    let otp = e.target.value;
    setOTP(otp);
    if(otp.length == 6){
      let confirmationResult = window.ConfirmationResult;
      confirmationResult.confirm(otp).then((result) => {
        
        const user = result.user;
        console.log(user);
        console.log(result);
        
      }).catch((error) => {
        
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
    <div className="App">
      <form onSubmit={requestOTP}>
        <label>Sign in with phone number</label><br/>
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
        <button type="submit">send</button>
      {expandForm?<div>
        <h3>OTP</h3>
        <h5>Enter the code sent to you</h5>
        <input type="text" id='otpInput' value={OTP} onChange={veriftOTP}/><br/><br/>
      </div>:null}
      
      </form>
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default App;
