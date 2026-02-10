import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const OnsubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        backendUrl + '/api/user/admin',
        { email, password }
      )

      if (response.data.success) {
        setToken(response.data.token)
        toast.success("Login successful")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Server error")
      console.log(error)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md'>
        <h1 className='text-2xl font-bold text-center text-gray-800 mb-4'>
          Admin Login
        </h1>

        <form onSubmit={OnsubmitHandler}>
          <div className='mb-4'>
            <p className='text-sm font-semibold text-gray-600 mb-2'>Email Address</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-[95%] px-3 py-2 border rounded-md text-sm'
            />
          </div>

          <div className='mb-4'>
            <p className='text-sm font-semibold text-gray-600 mb-2'>Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-[95%] px-3 py-2 border rounded-md text-sm'
            />
          </div>

          <button
            type="submit"
            className='w-full px-3 py-2 text-lg font-bold bg-amber-500 rounded-md'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
