const mongoose=require("mongoose");

const bookingSchema=mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: "User",required:true },
    flight : { type: mongoose.Schema.Types.ObjectId, ref: 'Flight',required:true }
},{versionKey:false});

const Booking=mongoose.model("bookings",bookingSchema);

module.exports = {
    Booking
};
