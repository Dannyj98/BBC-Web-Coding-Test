const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const jsondata1 = require('../data/article-1.json');
const jsondata2 = require('../data/article-2.json');
const jsondata3 = require('../data/article-3.json');
const jsondata4 = require('../data/article-4.json');
const jsondata5 = require('../data/article-5.json');
const jsondata = [jsondata1, jsondata2, jsondata3, jsondata4, jsondata5];

app.use(cookieParser());

app.get('/', (req, res ) => {
  // Get sequence and pop the last element in the array
  const arr = JSON.parse(req.cookies['sequence']);
  const pid = arr.pop();
  res.cookie('sequence', JSON.stringify(arr));
  res.render('article', jsondata[pid])
});

app.post('/', (req, res) => { 
  const arr = JSON.parse(req.cookies['sequence']);
  if (arr === undefined || arr.length < 1) {
    res.redirect('./review');
  } else {
    res.redirect('./article');
  }
});


module.exports = app;