var express = require('express');
var router = express.Router();
var request = require('request').defaults({json:true})
var config = require('../config')
var configUrl = (process.env.PRODUCTION) ? config.endpoints.production.url : config.endpoints.development.url
var configHeaders = (process.env.PRODUCTION) ? config.endpoints.production.headers : config.endpoints.development.headers


router.get('/article_per_website', function(req, res, next){
    console.log('Wew', req.query)
    request.get(configUrl+`dashboard/article_per_website?fields=${req.query.fields}&from=${req.query.from}&to=${req.query.to}&website=${req.query.website}&article_status=${req.query.article_status}`, {headers:configHeaders, body:req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

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