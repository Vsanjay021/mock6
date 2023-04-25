const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
require("dotenv").config();
// function to register a user

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (name == undefined || email == undefined || password == undefined) {
            return res.status(400).send({ "msg": "Some fields are missing" });
        }
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(500).send({ "msg": "User with this email already exists pls login or try using different email to register" });
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.status(400).send({ "msg": "Something went wrong" })
            }
            let user = new User({ name, email, password: hash });
            await user.save();
            return res.status(201).send({ "msg": "User registered successfully" });
        });

    } catch (error) {
        return res.status(400).send(error.message);
    }

}

// function to login a user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email == undefined || password == undefined) {
            return res.status(400).send({ "msg": "Some fields are missing" });
        }
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(500).send({ "msg": "User is not registered" })
        }
        bcrypt.compare(password, userExist.password, (err, result) => {
            if (err) {
                return res.status(400).send({ "msg": "something went wrong" })
            }
            if (result) {
                const token = jwt.sign({ userId: userExist._id }, process.env.SECRET, { expiresIn: 60 * 60 });
                return res.status(201).send({ "msg": "User loggedin successfully", token })
            } else {
                return res.status(401).send({ "msg": "Wrong credentials" })
            }
        })
    } catch (error) {
        return res.status(400).send(error.message);
    }

}