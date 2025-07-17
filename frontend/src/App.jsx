import { Navbar } from './components/Navbar'
import AddFunds from './components/AddFunds'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { Cancel } from './components/Cancel'
import { Success } from './components/Success'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
