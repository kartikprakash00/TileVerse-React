import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/home/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar'
import Game2048 from './pages/2048game/Game2048'
import Login from './pages/login/Login'
import Game2187 from './pages/2187game/Game2187'
import Mode from './pages/mode/Mode'
import Footer from './components/footer/Footer'

const App = () => {

  const location = useLocation();

  const noFooterPaths = ['/2048', '/2187']

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/2048' element={<Game2048 />} />
        <Route path='/2187' element={<Game2187 />} />
        <Route path='/login' element={<Login />} />
        <Route path='/mode' element={<Mode />} />
      </Routes>
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  )
}

export default App
