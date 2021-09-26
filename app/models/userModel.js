const mongoose = require("mongoose");
//const { isEmail } = require("validator");
//const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    //required: "Please enter your email",
    // unique: true,
    /*     minLength: 3,
    maxLenght: 55,
    trim: true,
    lowercase: true, */
  },
  password: {
    type: String,
    required: true,
    //required: "Please enter your password",
    max: 1024,
    minLength: 6,
  },
  password_validation: {
    type: String,
    //required: "Please retape your password",
    //required: true,
    max: 1024,
    minLength: 6,
  },
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
