const db = require("../models");
const bcrypt = require("bcrypt");
const maskData = require("maskdata");
const dotenv = require('dotenv').config();
console.log(dotenv.parsed)

const emailMaskOptions = {
  maskWith: "*",
  unmaskedStartCharactersBeforeAt: 1,
  unmaskedEndCharactersAfterAt: 1,
  maskAtTheRate: false,
};
// Fonction qui crée le compte admin dans la base de données à la connexion s'il n'existe pas
function setAdmin(req, res) {
  db.User.findOne({ where: { email: maskData.maskEmail2 ("admin@test.com", emailMaskOptions) } || { pseudo: "admin" } })

    .then((user) => {
      if (!user) {
        bcrypt
          .hash(process.env.DB_PASS, 10)
          .then((hash) => {
            const admin = db.User.create({
              pseudo: "admin",
              email: maskData.maskEmail2 ("admin@test.com", emailMaskOptions),
              password: hash,
              admin: true,
            })
              .then((admin) => {
                console.log({
                  admin,
                  message: `Votre compte admin est bien créé ${admin.pseudo} !`,
                });
              })
              .catch((error) => {
                res.status(400).json({ error });
              });
          })
          .catch((error) => {
            res.status(500).send({ error });
          });
      } else {
        console.log({ message: "l'admin est déjà créé" });
      }
    })
    .catch((error) => {
      console.log({ error });
    });
}
module.exports = setAdmin();