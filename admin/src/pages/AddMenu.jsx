import React, { useState } from 'react';
import defaultImage from '../assets/upload.jpg'; 
import axios from 'axios'
import { backendUrl } from '../App'
import {toast} from 'react-toastify'


const AddMenu = () => {
  const [menuName, setMenuName] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('All');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

const token = localStorage.getItem("token");

  const onSubmitHandler = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("name", menuName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    if (image) formData.append("image", image);

   const response = await axios.post(
  `${backendUrl}/api/product/add`,
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


    if (response.data.success) {
      toast.success(response.data.message);
      setMenuName("");
      setDescription("");
      setPrice("");
      setImage(null);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};



  return (
    <div className="pl-10">
  <form  onSubmit={onSubmitHandler} className='flex flex-col items-start gap-3'>


        
        <div>
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : defaultImage}
              alt="Upload Preview" className='w-32 cursor-pointer'
              width="200"
              style={{ cursor: 'pointer' }}
            />
            <input
              type="file"
              id="image"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>

       
        <div className='w-full'>
          <p className='mb-2 text-[22px]'>Product Name</p>
          <input
            type="text"
            placeholder="Enter product name"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)} className='w-full `max-w-[500px] p-4 border border-gray-300 rounded'
            required
          />
        </div>

        
        <div className='w-full'>
          <p className='mb-2 text-[22px]'> Product Description</p>
          <input 
            type="text"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required  className="w-full max-w-125 p-4 border border-gray-300 rounded"



          />
        </div>

        
        <div className='flex flex-wrap gap-4 w-full'>
          <div className='min-w-50'>
            <p className='mb-2 text-[22px]'>Product Category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)} className='w-full `max-w-[500px]` p-3 border border-gray-300 text-[16px] rounded'
            >
              <option value="All">All</option>
              <option value="Spaghetti">Spaghetti</option>
              <option value="Pizza">Pizza</option>
              <option value="Rice">Rice</option>
              <option value="Noodles">Noodles</option>
              <option value="Chicken">Chicken</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div>
            <p className='mb-2 text-[22px]'>Product Price</p>
            <input
              type="number"
              placeholder="40"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required className='w-full `max-w-[120px]` p-4 border-gray-300 rounded'
            />
          </div>
        </div>

        <button type="submit" className='mt-6 px-20 py-3 bg-amber-500 rounded hover:opacity-90'>Add Menu</button>
      </form>
    </div>
  );
};

export default AddMenu;
