var express = require('express');
var router = express.Router();
var request = require('request').defaults({json:true})
var config = require('../config')
var configUrl = (process.env.PRODUCTION) ? config.endpoints.production.url : config.endpoints.development.url
var configHeaders = (process.env.PRODUCTION) ? config.endpoints.production.headers : config.endpoints.development.headers

router.get('/:name', function(req, res, next){
    let _uri = configUrl+'dashboard/'+req.params.name
    if(req.query.duration){
        _uri += '?duration='+req.query.duration
    }
    request.get(_uri, {headers:configHeaders, body:req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

router.post('/article_metrics', function(req, res, next){
    request.post(configUrl+'dashboard/article_metrics', {headers:configHeaders, body:req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

module.exports = router