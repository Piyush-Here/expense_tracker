import { useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function OtpVerification() {
// Inside your OtpVerification component:  
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber || "your number";

  // 1. Create an array of 6 empty strings for our 6 inputs
  const [otp, setOtp] = useState(new Array(6).fill(""));
  
  // 2. Create an array of 6 refs to control focus on each input box
  const inputRefs = useRef([]);
  const navigate = useNavigate(); 

  // Handle the text input change
  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return false; // Only allow numbers

    let newOtp = [...otp];
    // Take only the last character typed (in case they type fast)
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-advance focus to the next box if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  

  // Handle key presses (specifically Backspace for moving backward)
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      // If the current box is empty, move focus to the previous box
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    
    if (finalOtp.length === 6) {
      alert(`Verifying OTP: ${finalOtp}`);
      // Proceed to your next page here, e.g.:
      // navigate('/dashboard');
      navigate('/');
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Enter Verification Code</h2>
      <p>We've sent a 6-digit code to {phoneNumber}.</p>
      
      <form onSubmit={handleSubmit}>
        {/* Container for the 6 boxes */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              name="otp-field"
              maxLength="1"
              value={data}
              // Attach the ref dynamically to our array of refs
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={{
                width: '40px',
                height: '40px',
                fontSize: '20px',
                textAlign: 'center',
              }}
            />
          ))}
        </div>

        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }} onClick={handleSubmit}>
          Verify & Proceed
        </button>
      </form>
      
    </div>
  );
}

export default OtpVerification




