const mongoose = require("mongoose");

//const { isEmail } = require("validator");
const userSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 55,
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
