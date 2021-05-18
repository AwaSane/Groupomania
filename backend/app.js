const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const helmet = require('helmet'); // sécurisation injection
const dotenv = require('dotenv').config();
console.log(dotenv.parsed)



//routes
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');

//db
const { sequelize } = require('./models/index');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // CORS - partage de ressources entre serveurs
app.use(helmet()); // helmet

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/users', userRoutes);
app.use('/api/posts', postsRoutes);


const dbTest = async function () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
dbTest();

module.exports = app;