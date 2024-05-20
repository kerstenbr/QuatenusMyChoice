import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from "./components/Navbar"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from './components/Footer'
import CreateFamily from './pages/CreateFamily'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create' element={<CreateFamily />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App