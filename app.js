const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

const port = 3000;

const app = express();

// View engine setup

const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),

// Create custom helper
helpers: {

  // Compares both arguments and returns true if they match
  isEqual: function(arg1,arg2, options){
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  }
}

});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up cookies
app.use(cookieParser());


// Public
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.use(require('./routes'));

// Start Server
app.listen(port, () => console.log(`Listening on port ${port}`));