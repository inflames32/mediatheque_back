const User = require("../models/userModel");
const Album = require("../models/albumModel");

//const validator = require("email-validator");
const bcrypt = require("bcrypt");

const userController = {
  /* getOneUser: async (req, res) => {
    try {
      const userId = req.params._id;
      const user = await User.findById({
        _id: userId,
      });
      res.json(user);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }, */
  disconnect: (req, res) => {
    try {
      req.session.destroy(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  signup: async (req, res) => {
    try {
      const { email, password, password_validation } = req.body;
      console.log(req.body);
      console.log(req.body.email);
      //const bodyErrors = [];
      await User.findOne({ email }, (err, user) => {
        if (err) {
          res.status(400).json({ errorMessage: err });
          console.log(err);
          return;
        }
        if (password !== password_validation) {
          res
            .status(400)
            .json({ errorMessage: "les mots de passe sont différents" });
          return;
        }
        if (user) {
          res.status(500).json({
            errorMessage:
              "user in the BDD, do you want reinitialize your password?",
          });
          return;
        }
      });
      const saltRounds = 10;
      const salt = await bcrypt.genSaltSync(saltRounds);
      const newUser = await User.create({
        email,
        password: await bcrypt.hash(password, salt),
      });
      await newUser.save();
      delete req.body;
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

      const bodyErrors = [];
      /* if (!email && !password) {
        bodyErrors.push("Votre email ou mot de passe est vide");
      }
      if (!password) {
        bodyErrors.push("Entrez votre mot de passe");
      }
      if (bodyErrors.length) {
        res.status(400).json(bodyErrors);

        return;
      } */

      await User.findOne({ email }, (err, user) => {
        if (err) {
          res.status(500).json({ message: "une erreur est survenue" });
          return;
        }
        if (user && bcrypt.compareSync(password, user.password)) {
          delete req.body;
          res.status(200).json({
            _id: user._id,
            email: user.email,
            logged: true,
            message: "vous êtes authentifié",
          });
          return;
        } else {
          res.status(400).json({
            email,
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
      await User.findByIdAndRemove(id, (err, user) => {
        if (err) {
          res.status(500).json({ err });
          return;
        }
        if (!user) {
          res.status(400).json("Cant find user with id " + id);
          return;
        }
      });
      Album.deleteMany({ userId: id }, (err, albums) => {
        if (err) {
          res.status(500).json({ erreur });
        }
        if (albums) {
          console.log(albums);
          console.log({ albums });
          delete album;
          res.status(200).json({ message: "Successfully deleted.", albums });
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
