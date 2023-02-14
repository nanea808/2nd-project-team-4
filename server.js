const path = require("path");
const express = require('express');
const session = require("express-session");
const exphbs = require('express-handlebars');

// Import Sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// import sequelize connection
const sequelize = require('./config/connection.js');

const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up connection between session and our sequelize database
const sess = {
    secret: "Super secret secret",
    cookie: {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };
  
  app.use(session(sess));

const hbs = exphbs.create({});

// Set view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}!`));
});

