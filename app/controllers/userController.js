const UserModel = require("../models/userModel");

//const validator = require("email-validator");
const bcrypt = require("bcrypt");

const userController = {
  /*   getOneUser: async (req, res) => {
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
    const { email, password, password_validation } = req.body;

    try {
      const bodyErrors = [];
      if (password != password_validation) {
        bodyErrors.push(" les mots de passes sont différents");
      }
      if (!email) {
        bodyErrors.push(" Entrez un email valide");
      }
      if (!password) {
        bodyErrors.push("Entrez votre mot de passe");
      }
      if (!password_validation) {
        bodyErrors.push("Ré-entrez votre mot de passe");
      }
      if (bodyErrors.length) {
        res.json(bodyErrors);
        return res.status(400);
      }
      const saltRound = 10;
      const salt = await bcrypt.genSaltSync(saltRound);

      await UserModel.create({
        email,
        password: await bcrypt.hash(password, salt),
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
    console.log(req.body);
    try {
      const bodyErrors = [];
      if (!email && !password) {
        bodyErrors.push("Un/des champ(s) est/sont vide(s)");
      }
      if (!password) {
        bodyErrors.push("Entrez votre mot de passe");
      }
      if (bodyErrors.length) {
        res.json(bodyErrors);
        return res.status(400);
      }
      const user = await UserModel.findOne({ email });
      if (user && bcrypt.compareSync(password, user.password)) {
        delete req.body;
        res.json({ _id: user._id, email: user.email, logged: true });
      } else {
        res.json({
          message: "Erreur d'authentification",
          logged: false,
        });
        res.status(401).end();
      }
    } catch (err) {
      console.trace(error);
      res.json(err);
    }
  },

  deleteUser: async(req, res) =>{
    try {     
      const user = await UserModel.findOne(req.params.body, (err, data)=> {
        if(!err) {
          delete user;
        }
        res.json({
          message: "L'utilisateur a été effacé",
        })
      })
    }
    catch(err) {
      console.log(err);
    }
  }
};

module.exports = userController;
