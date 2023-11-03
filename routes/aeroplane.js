var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('aeroplane', { title: 'Search Results - Aeroplanes.' });
});

module.exports = router;
