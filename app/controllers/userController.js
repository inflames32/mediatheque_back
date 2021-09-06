const UserModel = require("../models/userModel");

//const validator = require("email-validator");
const bcrypt = require("bcrypt");

const userController = {
  /*  getOneUser: async (req, res) => {
    try {
      const userId = req.params._id;
      const user = await UserModel.findById({
        _id: userId,
      });
      res.json(user);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }, */

  signup: async (req, res) => {
    try {
      const { email, password, password_validation } = req.body;
      const bodyErrors = [];
      if (password != password_validation) {
        bodyErrors.push("les mots de passes sont différents");
      }
      if (!email) {
        bodyErrors.push("no email");
      }
      if (bodyErrors.length) {
        res.json(bodyErrors);
        return res.status(400);
      }

      await UserModel.create({
        email,
        password: await bcrypt.hash(password, 10),
      });

      await newUser.save();

      res.json({ newUser: user._id });
    } catch (err) {
      if (err.code === 11000) {
        console.log(`L'email existe déjà`); // TODO gérer l'email existe déjà
      }
      res.json(err);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      await UserModel.findOne({ email }, (err, result) => {
        if (err) {
          res.send(err);
        } else if (bcrypt.compareSync(password, result.password)) {
          delete req.body;
          res.json({
            result: { _id: result._id, email: result.email },
            logged: true,
          });
        } else {
          res.send({ message: "Mot de passe erroné" });
        }
      });
    } catch (error) {
      res.status(202).json(error);
    }
  },

  logout: async (req, res) => {
    try {
      req.session.destroy();
      res.json({
        logged: false,
      });
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
