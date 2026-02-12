import React from 'react'
import Navbar from './Components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Footer from './Components/Footer'
import ListMenu from './pages/ListMenu'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export const backendUrl = "http://localhost:4000";
// export const backendUrl = import.meta.env.VITE_BACKEND_URL;


const App = () => {
  const token = localStorage.getItem('token')

  return (
    <div>
      <ToastContainer />
      <Navbar />

      <ToastContainer />

      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/list' element={<ListMenu token={token} />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
