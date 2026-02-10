import reservationModels from "../models/reservationModels.js";


const createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests } = req.body || {};

    if (!name || !email || !phone || !date || !guests) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const newReservation = new reservationModels({
      name,
      email,
      phone,
      date,
      time,
      guests
    });

    await newReservation.save();

    return res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      data: newReservation
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const getAllReservation = async (req, res) => {
  try {
    const reservations = await reservationModels.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: reservations
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReservation = await reservationModels.findByIdAndDelete(id);

    if (!deletedReservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Reservation deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export { createReservation, getAllReservation, deleteReservation };
