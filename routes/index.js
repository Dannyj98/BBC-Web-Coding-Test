const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

const sequence = [0, 1, 2, 3, 4];

app.get('/', (req, res, next) => {
  var i = 0;
  //shuffle the sequence array
  while (i++ < 10) {
    const a = Math.floor(Math.random() * 5);
    const b = Math.floor(Math.random() * 5);

    if (a !== b) {
      var temp = sequence[a];
      sequence[a] = sequence[b];
      sequence[b] = temp;
    }
  };
  res.cookie('sequence', JSON.stringify(sequence));
  res.redirect('./article');
  console.log(sequence);
});



module.exports = app;