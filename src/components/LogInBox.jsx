import { useState } from "react";
import CountryCodeSelector from "./CountryCodeSelector"
import { useNavigate } from "react-router-dom";
function LogInBox() {
  const navigate = useNavigate();
  const [fullNumber,setFullNumber]=useState("");
  const [isFormInValid,setIsFormInValid]=useState(true);

  const handlePhoneChange =(e)=>{
    setFullNumber(e.target.value);
    if(fullNumber.length+1 == 10){
      setIsFormInValid(false);
    }
  }
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    
    // 1. (Optional) Run your API call here to send the SMS OTP
    console.log("Sending OTP code...");

    // 2. Redirect the user to your OTP verification page
    // Pass the phone number as state data during redirect
   navigate('/verify', { state: { phoneNumber: fullNumber } });
  };
  return (
    <>
    <form>
        <CountryCodeSelector/><input type="number" name="phn" id="phn" placeholder="Enter Phone Number" onChange={handlePhoneChange}/>
        <button type="submit" disabled={isFormInValid} onClick={handlePhoneSubmit}>Get OTP</button>
    </form>
    </>
  )
}

export default LogInBox