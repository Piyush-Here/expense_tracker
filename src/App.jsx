import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PhoneEntry from './pages/PhoneEntry'
import OtpVerification from './pages/OtpVerification'
import './css/App.css'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PhoneEntry/>}/>
        <Route path="/verify" element={<OtpVerification />} />
      </Routes>

    </BrowserRouter>
    </>
  )
}

export default App
