const express = require('express');
const exphbs = require('express-handlebars');
// import sequelize connection
const sequelize = require('./config/connection.js');

const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(routes);

