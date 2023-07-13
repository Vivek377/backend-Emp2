const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: String,
    pass: String,
    conPass: String
})

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
