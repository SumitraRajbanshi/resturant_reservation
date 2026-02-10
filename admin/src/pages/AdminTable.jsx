import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const AdminTable = () => {

  const [reservations, setReservations] = useState([])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/reservations/delete/${id}`)
      toast.success('Reservation removed')

      
      setReservations(prev => prev.filter(res => res._id !== id))

    } catch (error) {
      console.log(error)
      toast.error("Error deleting reservation")
    }
  }

 useEffect(() => {

  const fetchReservations = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/reservations/list")
      
      if (response.data.success) {
        setReservations(response.data.data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  fetchReservations()

}, [])


  return (
    <div className='min-h-screen'>
      <h2 className='text-3xl font-bold text-gray-700 text-center mb-6'>
        Restaurants Reservations
      </h2>

      <div className='overflow-x-auto'>
        <table className='w-full shadow-lg rounded-xl'>

          <thead>
            <tr className='bg-amber-500 text-left'>
              <th className='p-3'>Name</th>
              <th className='p-3'>Email</th>
              <th className='p-3'>Phone</th>
              <th className='p-3'>Date</th>
              <th className='p-3'>Time</th>
              <th className='p-3'>Guests</th>
              <th className='p-3'>Delete</th>
            </tr>
          </thead>

          <tbody>
            {
              reservations.length === 0 ? (
                <tr>
                  <td colSpan="7" className='p-4 text-center'>
                    No reservations found
                  </td>
                </tr>
              ) : (
                reservations.map((res) => (
                  <tr key={res._id} className='border-b hover:bg-gray-50'>
                    <td className='p-3'>{res.name}</td>
                    <td className='p-3'>{res.email}</td>
                    <td className='p-3'>{res.phone}</td>
                    <td className='p-3'>{res.date}</td>
                    <td className='p-3'>{res.time}</td>
                    <td className='p-3'>{res.guests}</td>
                    <td className='p-3'>
                      <button
                        onClick={() => handleDelete(res._id)}
                        className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )
            }
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default AdminTable
