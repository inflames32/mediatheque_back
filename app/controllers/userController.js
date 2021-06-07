const userModel = require("../models/UserModel");

const userController = {
  getOneUser: async (req, res) => {
    console.log(req.body);
    const { pseudo, email, password } = req.body;

    try {
      const user = await userModel.get({ pseudo, email, password });
      res.status(200).json({ user: user._id });
    } catch (err) {
      console.log("error", err);
      res.status(401).send({ err });
    }
  },
};

module.exports = userController;
