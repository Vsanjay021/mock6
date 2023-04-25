const express = require("express");
const cors = require("cors");
const { connect } = require("./configs/db");
const { userRouter } = require("./routes/user.routes");
const { flightRouter } = require("./routes/flights.route");
const { bookRouter } = require("./routes/bookings.route");
const PORT = process.env.PORT || 4000;
const app = express();

require("dotenv").config();
app.use(cors({
    origin: "*"
}))
app.use(express.json());


// api routes

app.use("/api",userRouter);
app.use("/api",bookRouter)
app.use("/api/flights",flightRouter);


app.get("/", (req, res) => {
    res.status(200).send("Welcome to Air Ticket Booking System");
})

app.listen(PORT, async (req, res) => {
    try {
        await connect;
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error.message);
    }
    console.log(`Listening at port ${PORT}`)
})