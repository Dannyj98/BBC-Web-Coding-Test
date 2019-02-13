const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const jsondata1 = require('../data/article-1.json');
const jsondata2 = require('../data/article-2.json');
const jsondata3 = require('../data/article-3.json');
const jsondata4 = require('../data/article-4.json');
const jsondata5 = require('../data/article-5.json');

router.use(cookieParser());

const jsondata = [jsondata1, jsondata2, jsondata3, jsondata4, jsondata5];
const sequence = [0, 1, 2, 3, 4];

router.get('/article', (req, res ) => {
  // Get sequence and pop the last element in the array
  const arr = JSON.parse(req.cookies['sequence']);
  const pid = arr.pop();
  console.log("After pop: " + arr);
  console.log("ID: " + pid);
  res.cookie('sequence', JSON.stringify(arr));
  res.render('article', jsondata[pid])
});

router.post('/article/next', (req, res) => { 
  const arr = JSON.parse(req.cookies['sequence']);
  if (arr === undefined || arr.length < 1) {
    res.redirect('../review');
  } else {
    res.redirect('../article');
  }
});

// Initial page
// User will visit this page first, a sequence will be set and placed in a cookie
// User will then be redirected to their first article in the sequence

router.get('/', (req, res) => {
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
  res.redirect('article');
  console.log(sequence);
});

module.exports = router;