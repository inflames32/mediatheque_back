const UserModel = require("../models/userModel");
const AlbumModel = require("../models/albumModel");

//const validator = require("email-validator");
const bcrypt = require("bcrypt");

const userController = {
  /* getOneUser: async (req, res) => {
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
      console.log(req.body);
      console.log(req.body.email);
      //const bodyErrors = [];
      await UserModel.findOne({ email }, (err, user) => {
        if (err) {
          res.status(400).json({ errorMessage: err });
          return;
        }
        if (password !== password_validation) {
          res
            .status(400)
            .json({ errorMessage: "les mots de passe sont différents" });
          return;
        }

        if (user) {
          console.log("user.email :", user.email);
          //bodyErrors.push("l'email existe déjà");
          console.log("email existant");
          res.status(400).json({
            errorMessage:
              "user in the BDD, do you want reinitize your password?",
          });
          return;
        }
      });
      const saltRounds = 10;
      const salt = await bcrypt.genSaltSync(saltRounds);
      const newUser = await UserModel.create({
        email,
        password: await bcrypt.hash(password, salt),
      });
      await newUser.save();
      //delete req.body;
      console.log(res.json);
      res.status(200).json({
        newUser,
      });
      return;
    } catch (err) {
      console.trace(err);
      res.status(500).json(err);
      return;
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      console.log(email, password);
      const bodyErrors = [];
      if (!email && !password) {
        bodyErrors.push("Votre email ou mot de passe est vide");
      }
      if (!password) {
        bodyErrors.push("Entrez votre mot de passe");
      }
      if (bodyErrors.length) {
        res.status(400).json(bodyErrors);
        return;
      }

      await UserModel.findOne({ email }, (err, user) => {
        if (!password) {
          console.log("pas de mot de passe");
          res.status(400).json({ errorMessage: "pas de mot de passe", err });
          return;
        }
        if (!email) {
          res.status(404).json({ errorMessage: "pas d'email", err });
          return;
        }
        if (!err && email && bcrypt.compareSync(password, user.password)) {
          //delete req.body;
          res.status(200).json({
            _id: user._id,
            email: user.email,
            logged: true,
          });
          return;
        } else {
          res.status(400).json({
            user,
            message: "Erreur d'authentification",
            logged: false,
          });
          return;
        }
      });
    } catch (err) {
      console.trace(err);
      res.status(400).json({ errorMessage: "une erreur c'est produite", err });
      return;
    }
  },

  deleteUser: async (req, res) => {
    const id = req.params.id.replace(":", "");
    console.log(id);
    try {
      await UserModel.findByIdAndRemove(id, (err, user) => {
        if (!id) {
          console.log("126", "ici");
          res.status(404).json("Cant find user with id " + id);
          return;
        }
        if (err) {
          console.log("131", "ici");
          res.status(500).json({ err });
          return;
        }
        if (!user.id) {
          console.log("136", "ici");
          res.status(404).json("Cant find user with id " + id);
          return;
        }
      });

      await delete user;
      res.json({
        message: "L'utilisateur a été effacé",
      });
      return;
    } catch (err) {
      console.trace(err);
      res.status(500).json({ err });
      return;
    }
  },
};

module.exports = userController;
