const bcrypt = require("bcrypt"); // chiffrement du password
const db = require("../models"); // mdèles de la bdd
const token = require("../middleware/token"); // module qui génère le token
const fs = require("fs");
const { Op } = require("sequelize");
const maskData = require("maskdata");


const emailMaskOptions = {
  maskWith: "*",
  unmaskedStartCharactersBeforeAt: 1,
  unmaskedEndCharactersAfterAt: 1,
  maskAtTheRate: false,
};

exports.signup = async (req, res) => {
  try {
    
    const user = await db.User.findOne({
      where: { email: req.body.email },
    });
    if (user !== null) {
      if (user.pseudo === req.body.pseudo) {
        return res.status(400).json({ error: "ce pseudo est déjà utilisé" });
      }
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      const newUser = await db.User.create({
        pseudo: req.body.pseudo,
        email: maskData.maskEmail2(req.body.email, emailMaskOptions),
        password: hash,
        admin: false,
      });

      const tokenObject = await token.issueJWT(newUser);
      res.status(201).send({
        user: newUser,
        token: tokenObject.token,
        expires: tokenObject.expiresIn,
        message: `Votre compte est bien créé ${newUser.pseudo} !`,
      });
    }
  } catch (error) {
    return res.status(400).send({ error: "email déjà utilisé" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { email: maskData.maskEmail2 (req.body.email, emailMaskOptions),},
    }); 
    if (user === null) {
      return res.status(403).send({ error: "Utilisateur non trouvé" });
    } else {
      const hash = await bcrypt.compare(req.body.password, user.password); 
      if (!hash) {
        return res.status(401).send({ error: "Mot de passe incorrect !" });
      } else {
        const tokenObject = await token.issueJWT(user);
        res.status(200).send({
          user: user,
          token: tokenObject.token,
          sub: tokenObject.sub,
          expires: tokenObject.expiresIn,
        });
      }
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: ["pseudo", "id", "photo", "bio", "email"],
      where: {
        id: {
          [Op.ne]: 1,
        },
      },
    });
    res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};
exports.getProfil = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.params.id },
    });
    res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

exports.updateProfil = async (req, res) => {
  const id = req.params.id;
  try {
    const userId = token.getUserId(req);
    let user = await db.User.findOne({ where: { id: id } }); 
    if (userId === user.id) {
      if (req.body.bio) {
        user.bio = req.body.bio;
      }
      if (req.body.pseudo) {
        user.pseudo = req.body.pseudo;
      }
      const newUser = await user.save({ fields: ["pseudo", "bio", "photo"] }); 
      res.status(200).json({
        user: newUser,
        messageRetour: "Votre profil a bien été modifié",
      });
    } else {
      res
        .status(400)
        .json({ messageRetour: "" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

// FONCTION A DEVELOPPER
exports.deleteProfil = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await db.User.findOne({ where: { id: id } });
    if (user.photo !== null) {
      const filename = user.photo.split("/images")[1];
      fs.unlink(`images/${filename}`, () => {
       
        db.User.destroy({ where: { id: id } });
        res.status(200).json({ messageRetour: "utilisateur supprimé" });
      });
    } else {
      db.User.destroy({ where: { id: id } });
      res.status(200).json({ messageRetour: "utilisateur supprimé" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

