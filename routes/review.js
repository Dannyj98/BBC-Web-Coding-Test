const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const fs = require('fs');

var reviews = require('../data/reviews.json');

app.use(bodyParser.urlencoded({
  extended:true
}));

app.get('/', (req, res, next) => {
  res.render('review', reviews);
});

app.post('/', (req, res, next) => {
  fs.readFile('./data/reviews.json', 'utf-8', (err, data) => {

    if (err) console.log(err);

    var json = JSON.parse(data);
    var numberOfRatings = Number(json.numberOfRatings) + 1;
    json.numberOfRatings = numberOfRatings;
    console.log("req: " + req.body[0]);
    var i = 0;
    for (var q in req.body) {
      const totalRatings = Number(json.articles[i].totalRatings) + Number(req.body[q]);
      json.articles[i].totalRatings = totalRatings;
      json.articles[i].average = totalRatings / numberOfRatings;
      i++;
    };
    
    const str = JSON.stringify(json);
    fs.writeFile('./data/reviews.json', str, (err, data) => {
      if (err) console.log(err);
    });
    next();
  });
});

module.exports = app;