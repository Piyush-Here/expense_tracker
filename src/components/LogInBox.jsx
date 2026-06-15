import { useState } from "react";
import CountryCodeSelector from "./CountryCodeSelector"
import { useNavigate } from "react-router-dom";
function LogInBox() {
  const navigate = useNavigate();
  const [fullNumber,setFullNumber]=useState("");

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
        <CountryCodeSelector/><input type="number" name="phn" id="phn" placeholder="Enter Phone Number" onChange={(e)=>setFullNumber(e)}/>
        <button type="submit" onClick={handlePhoneSubmit}>Get OTP</button>
    </form>
    </>
  )
}

export default LogInBox