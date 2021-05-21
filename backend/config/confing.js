module.exports = {
    authentication: {
      jwtSecret: process.env.JWT_SECRET || 'RANDOM_TOKEN_SECRET',
    },
  };