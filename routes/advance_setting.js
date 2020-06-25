var express = require('express');
var router = express.Router();
var request = require('request').defaults({json:true})
var config = require('../config')

// mmi-endpoints
var configUrl = (process.env.PRODUCTION) ? config.endpoints.production.url : config.endpoints.development.url
var configHeaders = (process.env.PRODUCTION) ? config.endpoints.production.headers : config.endpoints.development.headers

// lambda-api
var lambdaUrl = (process.env.PRODUCTION) ? config.lambda_source.production.url : config.lambda_source.development.url

router.get('/', function(req, res, next){
    request.get(configUrl+'crawl/website?fqdn='+req.query.fqdn, {headers:configHeaders}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

router.post('/parse_website', function(req, res, next){
    request.post(lambdaUrl+'website/parse_website', {body:req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

router.get('/new', function(req, res, next){
    request.post(lambdaUrl+'website/new_website', {body:
        {"url":req.query.url, "request_source": req.query.request_source}
    }, function(error, response, body){
        if(error){
            next(error)
        }else{
            // res.status(200).send(body)
            // console.log(body)
            body.path = req.originalUrl
            res.render('pages/setting/new', body)
        }
    })
})

router.post('/test_filters', function(req, res, next){
    request.post(lambdaUrl+'website/test_filters', {body:req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

router.post('/test_article', function(req, res, next){
    request.post(lambdaUrl+'article/test_article', {body:req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

router.post('/store_article', function(req, res, next){
    request.post(lambdaUrl+'article/store', {body:req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

router.post('/media_values', function(req, res, next){
    request.post(lambdaUrl+'article/media_values', {body:req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

router.put('/:article_id', function(req, res, next){
    try {
        request.put(lambdaUrl+'article/'+req.params.article_id, {body:req.body}, function(error, response, body){
            if(error){
                console.log(error)
                next(error)
            }else{
                res.status(200).send(body)
            }
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = router