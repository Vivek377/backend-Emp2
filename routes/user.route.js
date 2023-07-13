const express = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRoute = express.Router();

userRoute.post("/signup", async (req, res) => {
    try {
        const { email, pass } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            res.status(200).send({ msg: "User Already Signup" });
        } else {
            bcrypt.hash(pass, 5, async (err, hashed) => {
                if (err) {
                    res.status(400).send({ err: err });
                } else {
                    const newUser = new UserModel(req.body);
                    await newUser.save({ email, pass: hashed });
                    res.status(200).send({ msg: "SignUp Done" });
                }
            })

        }
    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})


userRoute.post("/login", async (req, res) => {
    try {
        const { email, pass } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            bcrypt.compare(pass, user.pass, async (err, result) => {
                if (err) {
                    res.status(400).send({ err: "invalid password" });
                } else {
                    res.status(200).send({ msg: "Login Success", token: jwt.sign({ userId: user._id }, "secret") })
                }
            })
        } else {
            res.status(400).send({ msg: "No user Found" });
        }
    } catch (e) {
        console.log(e);
    }
})


module.exports = userRoute

