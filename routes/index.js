var express = require('express');
var router = express.Router();
var auth = require('../authenticate')

/* GET home page. */
router.get('/', auth.redirectHome, function(req, res, next) {
  res.render('pages/login', { title: 'Admin' });
});

router.get('/dashboard', auth.redirectLogin, function(req, res, next) {
  res.render('pages/dashboard', { title: 'Dashboard', path: req.path })
})

module.exports = router;
