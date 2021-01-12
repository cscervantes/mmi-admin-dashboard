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

router.get('/website-dashboard', auth.redirectLogin, function(req, res, next) {
  res.render('pages/website-dashboard', { title: 'Website Dashboard', path: req.path })
})

router.get('/websites', auth.redirectLogin, function(req, res, next) {
  res.render('pages/website', { title: 'Websites', path: req.path })
})

router.get('/scraper', auth.redirectLogin, function(req, res, next) {
  res.render('pages/website/scraper', { title: 'Scraper Websites', path: req.path })
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

router.get('/artem-client-link-dashboard', auth.redirectLogin, function(req, res, next){
  res.render('pages/artems/client-link-dashboard', { title: 'Artem Link Dashboard', path: req.path})
})

router.get('/artem-global-article-dashboard', auth.redirectLogin, function(req, res, next){
  res.render('pages/artems/global-article-dashboard', { title: 'Global Article Dashboard', path: req.path})
})

module.exports = router;
