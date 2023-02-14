const express = require('express');
const exphbs = require('express-handlebars');
// import express-session
const session = require('express-session');
// import sequelize connection
const sequelize = require('./config/connection.js');
// create sequelize store with express-session
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');

// set up sessions
const userSess = {
    secret: 'classified supersecret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: sequelize })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(session(userSess));

const hbs = exphbs.create({}); //do we want to add {{ helpers }} here?
// Set view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});

