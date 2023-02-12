const express = require('express');
const exphbs = require('express-handlebars');
// import sequelize connection
const sequelize = require('./config/connection.js');

const routes = require('./controllers');

// set up sessions
const userSess = {
    secret: 'classified supersecret',
    resave: false,
    saveUninitialized: true,
};

app.use(session(userSess));

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

// Set view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});

