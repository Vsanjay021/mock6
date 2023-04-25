const express=require("express");
const { postFlight, getFlights, getFlightsById, updateFlightById, deleteFlightById } = require("../controllers/flights.controller");
const { authentication } = require("../middlewares/authentication");
const flightRouter=express.Router();

flightRouter.post("/",authentication,postFlight);
flightRouter.get("/",authentication,getFlights);
flightRouter.get("/:id",authentication,getFlightsById);
flightRouter.patch("/:id",authentication,updateFlightById);
flightRouter.delete("/:id",authentication,deleteFlightById);

module.exports={
    flightRouter
}
