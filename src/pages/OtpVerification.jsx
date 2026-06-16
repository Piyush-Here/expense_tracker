import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

function OtpVerification() {
  const location = useLocation(); //
  const navigate = useNavigate(); //
  
  // Safely capture the formatted phone number passed from LogInBox
  const phoneNumber = location.state?.phoneNumber || "your number"; //

  // Create an array of 6 empty strings for our 6 inputs
  const [otp, setOtp] = useState(new Array(6).fill("")); //
  const [errorMessage, setErrorMessage] = useState("");
  
  // Create an array of 6 refs to control focus on each input box
  const inputRefs = useRef([]); //

  // Handle the text input change
  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return false; // Only allow numbers

    let newOtp = [...otp]; //
    // Take only the last character typed
    newOtp[index] = value.substring(value.length - 1); //
    setOtp(newOtp); //

    // Clear any active error message once they start editing again
    if (errorMessage) setErrorMessage("");

    // Auto-advance focus to the next box if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus(); //
    }
  };

  // Handle key presses (specifically Backspace for moving backward)
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') { //
      // If the current box is empty, move focus to the previous box
      if (!otp[index] && index > 0) { //
        inputRefs.current[index - 1].focus(); //
      }
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault(); //
    const finalOtp = otp.join(""); //
    
    if (finalOtp.length === 6) { //
      console.log(`Verifying OTP payload code: ${finalOtp}`);
      // Successfully authenticated! Navigate to your main landing area/dashboard
      navigate('/'); //
    } else {
      setErrorMessage("Please enter a valid 6-digit verification code.");
    }
  };

  // --- TAILWIND DESIGN RULES: PURE 3-COLOR SYSTEM WITH DEEP DARK SHADOWS ---
  const tailwindWrapperDiv  = "w-full min-h-screen md:min-h-0 flex flex-col justify-center items-center bg-white dark:bg-zinc-950 p-6 transition-colors duration-200";
  const tailwindForm        = "w-full max-w-sm flex flex-col items-center bg-white dark:bg-zinc-950 transition-colors duration-200";
  
  // Typography styling elements
  const tailwindHeading     = "text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight mb-2 text-center";
  const tailwindSubtext     = "text-sm text-zinc-500 dark:text-zinc-400 text-center mb-8 max-w-[280px]";
  const tailwindHighlight   = "font-semibold text-zinc-800 dark:text-zinc-200 break-all";
  
  // Box layout and 6-digit cell configurations
  const tailwindBoxGroup    = "flex items-center justify-center gap-2 w-full mb-4 relative z-10";
  
  // Individual numeric entry input box with custom dark focus ring tracking
  const tailwindInput       = "w-12 h-14 text-center text-xl font-bold border-2 border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 shadow-sm dark:shadow-[0_4px_20px_rgb(0,0,0,0.4)] transition-all";
  
  // Error descriptive status line
  const tailwindErrorText   = "text-xs font-medium text-red-500 mb-4 transition-all";
  
  // Primary validation button matching LogInBox specs
  const tailwindVerifyBtn   = "w-full h-12 rounded-2xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-100 disabled:text-zinc-400 dark:disabled:bg-zinc-900 dark:disabled:text-zinc-700 disabled:cursor-not-allowed transition-all active:scale-[0.99]";

  return (
    <div className={tailwindWrapperDiv}>
      <form onSubmit={handleSubmit} className={tailwindForm}>
        
        {/* Descriptive Headings */}
        <h2 className={tailwindHeading}>Enter Verification Code</h2>
        <p className={tailwindSubtext}>
          We've sent a 6-digit code to <br /><span className={tailwindHighlight}>{phoneNumber}</span>.
        </p>
        
        {/* Row Container for the 6 independent verification input boxes */}
        <div className={tailwindBoxGroup}>
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              name="otp-field"
              maxLength="1"
              inputMode="numeric" // Forces convenient native number keyboards on iOS & Android layouts
              value={data}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={tailwindInput}
            />
          ))}
        </div>

        {/* Dynamic Client-Side Failure Messages */}
        {errorMessage && (
          <p className={tailwindErrorText}>{errorMessage}</p>
        )}

        {/* Dynamic submission handler button */}
        <button 
          type="submit" 
          disabled={otp.some(val => val === "")} // Stays greyed out until all 6 spaces have entries
          className={tailwindVerifyBtn}
        >
          Verify Code
        </button>
        
      </form>
    </div>
  );
}

export default OtpVerification;