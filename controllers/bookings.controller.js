const { Booking } = require("../models/booking.model");
const { Flight } = require("../models/flight.model");

//This function allow the user to book flights.

exports.booking=async(req,res)=>{
    try {
        const {flightid,userId}=req.body;
        const flight=await Flight.findById(flightid);
        if(flight){
            const existBooking=await Booking.findOne({flight:flightid,user:userId});
            if(existBooking){
                return res.status(500).send({msg:"User already booked this flight"})
            }else{
                let book=new Booking({user:userId,flight:flightid});
                await book.save();
                return res.status(201).send({"msg":"Flight booked successfully"})
            }
        }else{
            return res.send(500).send({"msg":"No such flight exist"})
        }
    } catch (error) {
        return res.status(400).send({"msg":error.message})
    }
}
// This function should list all the bookings so far with the user and flight details.

exports.dashboard=async(req,res)=>{
    try {
        let data=await Booking.aggregate([
            {
                $lookup:{
                    from:"flights",
                    localField:"flight",
                    foreignField:"_id",
                    as:"flightdetails"
                }
            },
            {
                $lookup:{
                    from:"users",
                    localField:"user",
                    foreignField:"_id",
                    as:"userdetails"
                }
            }
        ])
        return res.status(200).send(data);
    } catch (error) {
        return res.status(400).send({"msg":error.message})
    }
}