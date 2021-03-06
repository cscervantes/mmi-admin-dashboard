var express = require('express');
var router = express.Router();
var request = require('request').defaults({json:true})
var config = require('../config')
var configUrl = (process.env.PRODUCTION) ? config.endpoints.production.url : config.endpoints.development.url
var configHeaders = (process.env.PRODUCTION) ? config.endpoints.production.headers : config.endpoints.development.headers

router.post('/', function(req, res, next) {
    request.post(configUrl+'section', {headers:configHeaders, body:req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

module.exports = router