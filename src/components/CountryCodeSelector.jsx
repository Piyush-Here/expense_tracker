import { useState } from 'react';
// 1. Import the local json file directly
import countryData from '../data/all.json'; 

// Helper function to turn "US" or "IN" into a flag emoji 🇺🇸 🇮🇳 automatically
const getFlagEmoji = (countryCode) => {
  if (!countryCode) return '';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

function CountryCodeSelector() {
  const [selectedCountry, setSelectedCountry] = useState('IN');

  // 2. Sort countries alphabetically by name so the dropdown is user-friendly
  const sortedCountries = [...countryData].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <div>
      <label htmlFor="country-select">
        Select Country:
      </label>

      <select
        id="country-select"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        {sortedCountries.map((country) => {
          const flag = getFlagEmoji(country['alpha-2']);
          return (
            <option key={country['alpha-2']} value={country['alpha-2']}>
              {flag} {country.name} ({country['alpha-2']})
            </option>
          );
        })}
      </select>

      <p>
        Selected Code: <strong>{selectedCountry}</strong>
      </p>
    </div>
  );
}

export default CountryCodeSelector