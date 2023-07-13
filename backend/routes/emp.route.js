const express = require("express");
const EmpModel = require("../models/emp.model");

const empRoute = express.Router();

empRoute.get("/", async (req, res) => {
    try {
        const emp = await EmpModel.find();
        res.status(200).send(emp);
    } catch (e) {
        console.log(e);
    }
})

empRoute.post("/employees", async (req, res) => {
    try {
        const emp = new EmpModel(req.body);
        await emp.save();
        res.status(200).send({ msg: "new employee added" });
    } catch (e) {
        console.log(e);
    }
})

empRoute.patch("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await EmpModel.findByIdAndUpdate({ _id: id }, req.body);
        res.status(200).send({ msg: "employee edited" });
    } catch (e) {
        console.log(e);
    }
})

empRoute.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await EmpModel.findByIdAndDelete({ _id: id });
        res.status(200).send({ msg: "employee deleted" });
    } catch (e) {
        console.log(e);
    }
})


module.exports = empRoute
