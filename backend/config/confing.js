const dotenv = require('dotenv').config();
console.log(dotenv.parsed)

module.exports = {
    authentication: {
      jwtSecret: process.env.JWT_SECRET || process.env.JWT_KEY,
    },
  };