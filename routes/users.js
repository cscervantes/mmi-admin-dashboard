var express = require('express');
var router = express.Router();
var request = require('request').defaults({json:true})
var config = require('../config')
var configUrl = (process.env.PRODUCTION) ? config.endpoints.production.url : config.endpoints.development.url
var configHeaders = (process.env.PRODUCTION) ? config.endpoints.production.headers : config.endpoints.development.headers

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  request.post(configUrl+'users', {headers:configHeaders, body:req.body }, function(error,response, body){
    if(error){
      next(error)
    }else{
      if(body.hasOwnProperty('acc_id')){
        let session = req.session
        session.user = body
        res.status(200).send({'success': true, 'message': 'Success'})
      }else{
        res.status(400).send({'success': false, 'message': 'Account does not matched! Try again'})
      }
    }
  })
})

router.get('/logout', function(req, res, next) {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
