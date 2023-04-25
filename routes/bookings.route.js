const express=require("express");
const { booking, dashboard } = require("../controllers/bookings.controller");
const { authentication } = require("../middlewares/authentication");
const bookRouter=express.Router();

bookRouter.post("/booking",authentication,booking);
bookRouter.get("/dashboard",authentication,dashboard);

module.exports = {
    bookRouter
};
