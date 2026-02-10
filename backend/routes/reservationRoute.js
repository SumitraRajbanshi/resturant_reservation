import express from "express";
import { createReservation, getAllReservation, deleteReservation } from "../controllers/reservationController.js";

const reservationRoute = express.Router();

reservationRoute.post("/create", createReservation);
reservationRoute.get("/list", getAllReservation);
reservationRoute.delete("/delete/:id", deleteReservation);

export default reservationRoute;
