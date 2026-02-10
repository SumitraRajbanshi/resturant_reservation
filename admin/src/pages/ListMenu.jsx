import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { MdDeleteForever } from 'react-icons/md'

const ListMenu = ({ token }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/product/list",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        console.log("Products from API:", response.data.products)
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.error(error)
      toast.error("Failed to fetch products")
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
  <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>

    <p className='mb-4 font-bold text-2xl'>Menu List</p>

    <div className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center p-3 border-b-2 border-gray-400 font-semibold bg-gray-100'>
      <b>Image</b>
      <b>Name</b>
      <b>Category</b>
      <b>Price</b>
      <b className='text-center'>Action</b>
    </div>

    {list.length === 0 ? (
      <p className="mt-4 text-gray-500">No products found</p>
    ) : (
      list.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center p-3 border-b border-gray-200 hover:bg-gray-50"
        >

          <img
            src={item.image}
            alt={item.name}
            className="w-12.5 h-12.5 object-cover rounded-full"
          />

          <p>{item.name}</p>

          <p>{item.category}</p>

          <p>${item.price}</p>

          <MdDeleteForever
            className="text-[24px] cursor-pointer text-red-600 justify-self-center hover:text-red-800"
            title="Delete item"
          />

        </div>
      ))
    )}

  </div>
)
}  

export default ListMenu
