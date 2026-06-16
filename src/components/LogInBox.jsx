import { useState } from "react";
import { useNavigate } from "react-router-dom";
import countryData from '../data/all.json'; 

const getFlagEmoji = (countryCode) => {
  if (!countryCode) return '';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

function LogInBox() {
  const navigate = useNavigate(); 
  const [fullNumber, setFullNumber] = useState(""); 
  const [isFormInValid, setIsFormInValid] = useState(true); 
  
  // Clean initialization back to uppercase "IN" to match our new JSON keys
  const [selectedCountry, setSelectedCountry] = useState('IN'); 
  
  const sortedCountries = [...countryData].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setFullNumber(value);
    
    if (value.length === 10) {
      setIsFormInValid(false);
    } else {
      setIsFormInValid(true);
    }
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault(); 
    
    // Find our selected country inside our clean data array
    const currentCountryObj = countryData.find(c => c.code === selectedCountry);
    
    // Grab the actual dial code property directly (e.g., "+91")
    const dialCode = currentCountryObj ? currentCountryObj.dial_code : '';
    const completePhoneNumber = `${dialCode}${fullNumber}`;

    console.log("Submitting phone verification:", completePhoneNumber);
    navigate('/verify', { state: { phoneNumber: completePhoneNumber } });
  };
  
  // --- TAILWIND DESIGN SYSTEM ---
  const tailwindWrapperDiv     = "w-full min-h-screen md:min-h-0 flex flex-col justify-center items-center bg-white dark:bg-zinc-950 p-4 transition-colors duration-200";
  const tailwindForm           = "w-full max-w-sm flex flex-col space-y-4 bg-white dark:bg-zinc-950 transition-colors duration-200";
  const tailwindFlagContainer  = "flex items-center w-full border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl focus-within:ring-4 focus-within:border-emerald-500 focus-within:ring-emerald-500/20 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.6)] transition-all relative z-10";
  const tailwindFlagAnchor     = "relative w-16 h-12 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 shrink-0 z-20";
  const tailwindFlag           = "absolute inset-0 flex items-center justify-center pointer-events-none text-2xl pb-0.5 text-zinc-800 dark:text-zinc-100 font-semibold";
  const tailwindFlagSelect     = "absolute inset-0 opacity-0 w-full h-full cursor-pointer appearance-none";
  const tailwindPhoneInput     = "w-full h-12 px-4 outline-none text-base text-zinc-800 dark:text-zinc-100 font-medium tracking-wide placeholder:text-zinc-400 dark:placeholder:text-zinc-600 placeholder:font-normal bg-white dark:bg-zinc-950";
  const tailwindGetOTP         = "w-full h-12 rounded-2xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-100 disabled:text-zinc-400 dark:disabled:bg-zinc-900 dark:disabled:text-zinc-700 disabled:cursor-not-allowed transition-all active:scale-[0.99]";
  
  return (
    <div className={tailwindWrapperDiv}>
      <form onSubmit={handlePhoneSubmit} className={tailwindForm}>
        
        <div className={tailwindFlagContainer}>
          <div className={tailwindFlagAnchor}>
            <div className={tailwindFlag}>{getFlagEmoji(selectedCountry)}</div>
            
            <select 
              value={selectedCountry} 
              onChange={(e) => setSelectedCountry(e.target.value)}
              className={tailwindFlagSelect}
            >
              {sortedCountries.map((country) => (
                // Clean mapping to standard code and dial_code properties!
                <option key={country.code} value={country.code}>
                  {getFlagEmoji(country.code)} {country.name} ({country.dial_code})
                </option>
              ))}
            </select>
          </div>

          <input 
            type="tel" 
            name="phn" 
            id="phn" 
            placeholder="Enter Phone Number" 
            value={fullNumber}
            onChange={handlePhoneChange}
            className={tailwindPhoneInput}
          />
        </div>

        <button type="submit" disabled={isFormInValid} className={tailwindGetOTP}>
          Get OTP
         </button>
        
      </form>
    </div>
  );
}

export default LogInBox;