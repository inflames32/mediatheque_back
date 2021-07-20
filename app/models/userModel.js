const mongoose = require("mongoose");
//const { isEmail } = require("validator");

//const { isEmail } = require("validator");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    //validate: [isEmail],
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    minLength: 6,
  },
  password_validation: {
    type: String,
    required: true,
    max: 1024,
    minLength: 6,
  },
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
