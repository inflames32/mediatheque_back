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
        res.satuts(500).json({ message: "vous êtes déconnecté" });
        res.redirect("/");
        return;
      });
    } catch (error) {
      console.trace(error);
      res.satuts(500).json({ message: "une erreur c'est produite", error });
    }
  },

  signup: async (req, res) => {
    try {
      const { email, password, password_validation } = req.body;
      if (!email) {
        res.status(500).json({
          message: "entrez votre email",
        });
        console.log("pas de mail");
        return;
      }
      if (!password) {
        res.status(500).json({
          message: "entrez votre mot de passe",
        });
        console.log("pas de mot de passe");
        return;
      }
      if (!password_validation) {
        res.status(500).json({
          message: "entrez la validation du mot de passe",
        });
        console.log("entrez la validation du mot de passe");
        return;
      }
      if (password !== password_validation) {
        res.status(500).json({
          message: "les mot de passe sont différents",
        });
        console.log("mots de passe différents");

        return;
      }

      await User.findOne({ email });
      /* , (err, user) => { */
      /*  if (err) {
        res.status(400).json({ message: err });
        console.log(err);
        return;
      } */

      if (email) {
        res.status(500).json({
          message: "utilisateur existant",
        });
        console.log("utilisateur existant");
        return;
      }

      const saltRounds = 10;
      const salt = await bcrypt.genSaltSync(saltRounds);
      const newUser = await User.create({
        email,
        password: bcrypt.hash(password, salt),
      });

      res.status(200).json({
        newUser,
      });
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return;
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const bodyErrors = [];

      if (!email || !password) {
        bodyErrors.push("pas d'email/de mot de passe");
        res.status(500).json({
          message: "pas d'email/de mot de passe",
        });
        console.log("pas d'email/de mot de passe");
        return;
      }
      if (bodyErrors.length) {
        res.status(500).json({
          message: "il y'a eu des erreurs",
        });
        return;
      }
      await User.findOne({ email }, (err, user) => {
        /*  if (!user) {
          res.status(400).json({
            message: "utilisateur introuvable",
          });
          console.log("utilsateur introuvable");
          return;
        } */
        if (err) {
          res.status(500).json({ message: "une erreur est survenue", err });
          return;
        }
        if (user && bcrypt.compareSync(password, user.password)) {
          if (!password === user.password) {
            res.status(400).json({
              message: "mot de passe incorrect",
            });
            console.log("mot de passe incorrect");
            return;
          }
          delete req.body;
          console.log(req.body);
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
      res
        .status(400)
        .json({ errorMessage: "une erreur c'est produite", message });
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
