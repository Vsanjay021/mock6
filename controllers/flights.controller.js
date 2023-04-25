const { Flight } = require("../models/flight.model");


//This function allow users to add new flights to the system

exports.postFlight=async(req,res)=>{
    try {
        const { airline,flightNo,departure,arrival,departureTime, arrivalTime,seats,price}=req.body;
        if(airline==undefined||flightNo==undefined||departure==undefined||arrival==undefined||departureTime==undefined||arrivalTime==undefined||seats==undefined||price==undefined){
            return res.status(400).send({msg:"some fields are missing"});
        }
        const existFlight=await Flight.findOne({flightNo})
        if(!existFlight){
            let flight=new Flight({airline,flightNo,departure,arrival,departureTime, arrivalTime,seats,price});
            await flight.save();
            return res.status(201).send({"msg":"Flights created successfully"});
        }
        else{
            return res.status(500).send({"msg":`Flights already exists with flight number ${existFlight.flightNo}`});
        }
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
}
// This Function return a list of all available flights

exports.getFlights=async(req,res)=>{
    try {
        const allFlights=await Flight.find();
        return res.status(200).send(allFlights);
    } catch (error) {
        return res.status(400).send({"msg":error.message})
    }
}

// This function return the details of a specific flight identified by its ID

exports.getFlightsById=async(req,res)=>{
    try {
        const id=req.params.id;
        const flight=await Flight.findById(id);
        return res.status(200).send(flight)
    } catch (error) {
        return res.send(400).send({msg:error.message})
    }
}


// This function allow users to update the details of a specific flight identified by its ID

exports.updateFlightById=async(req,res)=>{
    try {
        const { airline,flightNo,departure,arrival,departureTime, arrivalTime,seats,price}=req.body;
        const {id}=req.params;
        const flight=await Flight.findById(id);
        if(!flight){
            return res.status(400).send({"msg":"Flight is not present with this id"})
        }
        if(airline!=undefined){
            await Flight.findByIdAndUpdate(id,{airline});
        }
        if(flightNo!=undefined){
            await Flight.findByIdAndUpdate(id,{flightNo})
        }
        if(departure!=undefined){
            await Flight.findByIdAndUpdate(id,{departure})
        }
        if(arrival!=undefined){
            await Flight.findByIdAndUpdate(id,{arrival})
        }
        if(departureTime!=undefined){
            await Flight.findByIdAndUpdate(id,{departureTime})
        }
        if(arrivalTime!=undefined){
            await Flight.findByIdAndUpdate(id,{arrivalTime})
        }
        if(seats!=undefined){
            await Flight.findByIdAndUpdate(id,{seats})
        }
        if(price!=undefined){
            await Flight.findByIdAndUpdate(id,{price})
        }
        return res.status(204).send({"msg":"Flight Data updated successfully"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
}


// This function allow users to delete a specific flight identified by its ID

exports.deleteFlightById=async (req,res)=>{
    try {
        const {id}=req.params;
        let flight=await Flight.findByIdAndDelete(id);
        if(flight){
            return res.status(202).send({"msg":"Flight Deleted Successfully"})
        }
        return res.status(400).send({"msg":"Flight is not present with this id"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
}