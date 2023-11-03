var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('employe', { title: 'Search Results - Employes.' });
});

module.exports = router;
