const JWT = require("jsonwebtoken");
const config = require("../config/config");
const dotenv = require('dotenv').config();
console.log(dotenv.parsed)

function issueJWT(user) {
  const id = user.id;
  const expiresIn = "24H";
  const payload = {
    sub: id,
    iat: Date.now(),
  };
  const signedToken = JWT.sign(payload, process.env.JWT_KEY, { expiresIn: expiresIn });
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}
function getUserId(req) {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = JWT.verify(token, process.env.JWT_KEY); 
  const userId = decodedToken.sub;
  return userId;
}

module.exports.issueJWT = issueJWT;
module.exports.getUserId = getUserId;