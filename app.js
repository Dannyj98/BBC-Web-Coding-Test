const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

const index = require('./routes/index');
const article = require('./routes/article');
const review = require('./routes/review');

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

app.use('/article', article);
app.use('/review', review);
app.use('/', index);

// Route not found (404)
app.use((req, res, next) => {
  res.status(404);
  res.render('404');
});

//Any error
//Development error, will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error : err
    });
  });
};

//Production error, hides stacktrace from users
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Start Server
app.listen(port, () => console.log(`Listening on port ${port}`));