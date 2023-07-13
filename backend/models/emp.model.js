const mongoose = require("mongoose");

const EmpSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    deptt: String,
    salary: Number
})

const EmpModel = mongoose.model("emp", EmpSchema);

module.exports = EmpModel;
