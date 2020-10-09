var express = require('express');
var router = express.Router();
var auth = require('../authenticate')

/* GET home page. */
router.get('/', auth.redirectHome, function(req, res, next) {
  res.render('pages/login', { title: 'Admin Login' });
});

router.get('/dashboard', auth.redirectLogin, function(req, res, next) {
  res.render('pages/dashboard', { title: 'Dashboard', path: req.path })
})

router.get('/websites', auth.redirectLogin, function(req, res, next) {
  res.render('pages/website', { title: 'Websites', path: req.path })
})

router.get('/articles', auth.redirectLogin, function(req, res, next) {
  res.render('pages/article', { title: 'Articles', path: req.path })
})

router.get('/add-website', auth.redirectLogin, function(req, res, next){
  res.render('pages/website/add', {title: 'New Website', path: req.path})
})

router.get('/advance-setting', auth.redirectLogin, function(req, res, next){
  res.render('pages/setting', { title: 'Advance Setting', path: req.path})
})

router.get('/artem-link-dashboard', auth.redirectLogin, function(req, res, next){
  res.render('pages/artems/link-dashboard', { title: 'Artem Link Dashboard', path: req.path})
})

// router.get('/artem-article-dashboard', auth.redirectLogin, function(req, res, next){
//   res.render('pages/artems/article-dashboard', { title: 'Artem Article Dashboard', path: req.path})
// })

module.exports = router;
