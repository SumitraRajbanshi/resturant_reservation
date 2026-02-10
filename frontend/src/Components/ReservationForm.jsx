import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaFacebook,
  FaTwitter,
  FaReddit,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "1",
  });

  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try{
      await axios.post(backendUrl + "/api/reservations/create", formData)
      toast.success("Reservation Successful")

      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: ""
      })
    } catch (error) {
  toast.error(error.response?.data?.message || "Something went wrong");
}
  }

  const generateTimeSlots = () => {
    const slots = [];

    for (let hour = 9; hour < 21; hour++) {
      const startHour = hour % 12 === 0 ? 12 : hour % 12;
      const startPeriod = hour < 12 ? "AM" : "PM";

      const endHour = (hour + 1) % 12 === 0 ? 12 : (hour + 1) % 12;
      const endPeriod = hour + 1 < 12 ? "AM" : "PM";

      slots.push(
        `${startHour}:00 ${startPeriod} - ${endHour}:00 ${endPeriod}`
      );
    }

    return slots;
  };

  return (
    <div className="min-h-screen bg-[#ffe2b7] p-6 md:p-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-2 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-amber-400 uppercase tracking-wider">
            Reserve a Table
          </h2>
          <h1 className="text-3xl font-bold mb-4">
            Dine With Us -{" "}
            <span className="text-amber-500">Reserve Now</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <label className="font-bold">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChanges}
                placeholder="Full Name"
                required
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="grid gap-1.5">
              <label className="font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChanges}
                placeholder="Email"
                required
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="grid gap-1.5">
              <label className="font-bold">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChanges}
                placeholder="Phone Number"
                required
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="grid gap-1.5">
              <label className="font-bold">Reservation Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChanges}
                required
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="grid gap-1.5">
              <label className="font-bold">Time of Reservation</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChanges}
                required
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              >
                <option value="">Select Time</option>
                {generateTimeSlots().map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-1.5">
              <label className="font-bold">Number of Guests</label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChanges}
                required
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} Guest(s)
                  </option>
                ))}
              </select>
            </div>

            
          </div>
          <button
              type="submit"
              className="md:col-span-2 w-full mt-4 bg-amber-600 text-white p-3 rounded-lg hover:bg-amber-500 transition"
            >
              Book Now
            </button>
        </form>

        
        <div className="bg-black text-gray-300 p-8 rounded-lg shadow-md space-y-10">
          <div>
            <h3 className="text-lg font-bold">Address</h3>
            <p>123, Abc Street, N-axis, Sample City, State, Country</p>
          </div>

          <div>
            <h3 className="text-lg font-bold">Open Time</h3>
            <p>Mon - Fri: 11:00 AM - 10:00 PM</p>
            <p>Sat - Sun: 09:00 AM - 11:00 PM</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-2">Stay Connected</h3>
            <div className="flex gap-4 mt-2">
              <FaFacebook className="text-4xl text-red-500" />
              <FaTwitter className="text-4xl text-red-500" />
              <FaInstagram className="text-4xl text-red-500" />
              <FaReddit className="text-4xl text-red-500" />
              <FaYoutube className="text-4xl text-red-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
