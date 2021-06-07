const UserModel = require("../models/UserModel");

const authController = {
  signUp: async (req, res) => {
    console.log(req.body);
    const { pseudo, email, password } = req.body;

    try {
      const user = await UserModel.create({
        pseudo,
        email,
        password,
      });
      res.status(200).json({ user: user._id });
    } catch (err) {
      console.trace(err);
      res.status(500).json(err);
    }
  },
};

module.exports = authController;
