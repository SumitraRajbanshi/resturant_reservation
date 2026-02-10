import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { PiListBullets } from "react-icons/pi";

const Sidebar = ({ setToken }) => {
  const [active, setActive] = useState(""); // track clicked link

 const handleLogout = () => {
  localStorage.removeItem("token");
  setToken("");
};


  return (
    <div className="w-[22%] min-h-screen border-r-2 border-gray-200 bg-white">
      <div className="mt-4 px-6">
        <h2 className="text-[32px] font-bold">Emerald Bistro</h2>
      </div>

      <div className="flex flex-col gap-4 pt-6">
        <NavLink
          to="/add"
          onClick={() => setActive("add")}
          className={`flex items-center gap-3 px-6 py-3 border-b-2 border-gray-200
            ${active === "add" ? "bg-amber-600 text-white" : "text-gray-600 hover:bg-amber-100"}`}
        >
          <IoMdAddCircleOutline className="text-[35px] text-black" />
          <p className="hidden md:block text-base">Add Product</p>
        </NavLink>

        <NavLink
          to="/list"
          onClick={() => setActive("list")}
          className={`flex items-center gap-3 px-6 py-3 border-b-2 border-gray-200
            ${active === "list" ? "bg-amber-600 text-white" : "text-gray-600 hover:bg-amber-100"}`}
        >
          <MdFormatListBulletedAdd className="text-[35px] text-black" />
          <p className="hidden md:block text-base">List Product</p>
        </NavLink>

        <NavLink
          to="/table"
          onClick={() => setActive("table")}
          className={`flex items-center gap-3 px-6 py-3 border-b-2 border-gray-200
            ${active === "table" ? "bg-amber-600 text-white" : "text-gray-600 hover:bg-amber-100"}`}
        >
          <PiListBullets className="text-[35px] text-black" />
          <p className="hidden md:block text-base">Reservations</p>
        </NavLink>

        <button
  onClick={handleLogout}
  className={`flex items-center gap-3 px-6 py-3 border-b-2 border-gray-200 w-full
  ${active === "logout"
    ? "bg-amber-600 text-white"
    : "text-gray-600 hover:bg-amber-600 hover:text-white"}`}
>
  <IoLogOutOutline className="text-[35px]" />
  <p className="hidden md:block text-base">Logout</p>
</button>

      </div>
    </div>
  );
};

export default Sidebar;
