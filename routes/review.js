const express = require('express');
const router = express.Router();

router.get('/review', (req, res, next) => {
  res.render('review');
});
module.exports = router;