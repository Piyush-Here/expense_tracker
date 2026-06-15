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
  const [selectedCountry, setSelectedCountry] = useState('US');

  // 2. Sort countries alphabetically by name so the dropdown is user-friendly
  const sortedCountries = [...countryData].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <div style={{ padding: '20px' }}>
      <label htmlFor="country-select" style={{ display: 'block', marginBottom: '8px' }}>
        Select Country:
      </label>

      <select
        id="country-select"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', borderRadius: '5px' }}
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

      <p style={{ marginTop: '15px' }}>
        Selected Code: <strong>{selectedCountry}</strong>
      </p>
    </div>
  );
}

export default CountryCodeSelector