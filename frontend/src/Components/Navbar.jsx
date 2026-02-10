import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full h-20 flex justify-between items-center px-8 bg-black text-white z-50">
      <div>
        <h2 className='font-bold text-2xl '>EMERALD BISTRO</h2>
      </div>
      <div>
        <ul className='flex justify-between gap-8'>
             <li className='font-bold text-lg cursor-pointer hover:text-amber-400'>HOME</li>
             <li className='font-bold text-lg cursor-pointer hover:text-amber-400'>RESERVATIONS</li>
             <li className='font-bold text-lg cursor-pointer hover:text-amber-400'>MENU</li>
             <li className='font-bold text-lg cursor-pointer hover:text-amber-400'>CONTACT</li>
        </ul>
      </div>
       </nav>
    </div>
  )
}

export default Navbar
