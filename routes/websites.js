var express = require('express');
var router = express.Router();
var request = require('request').defaults({json:true})
var auth = require('../authenticate')
var config = require('../config')
var configUrl = (process.env.PRODUCTION) ? config.endpoints.production.url : config.endpoints.development.url
var configHeaders = (process.env.PRODUCTION) ? config.endpoints.production.headers : config.endpoints.development.headers

router.post('/', function(req, res, next) {
    request.post(configUrl+'web/datatables', {headers:configHeaders, body:req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

router.get('/term', function(req, res, next) {
    request.get(configUrl+'web?website_name='+req.query.term, {headers:configHeaders}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

router.post('/store', function(req, res, next) {
    request.post(configUrl+'web/', {headers:configHeaders, body:req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

router.post('/update/:id', function(req, res, next) {
    request.put(configUrl+'web/'+req.params.id, {headers:configHeaders, body:req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

router.post('/delete/:id', function(req, res, next) {
    request.delete(configUrl+'web/'+req.params.id, {headers:configHeaders}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

router.get('/view/:id', auth.redirectLogin, function(req, res, next){
    request.get(configUrl+'web/'+req.params.id, {headers:configHeaders}, function(error, response, body){
        if(error){
            next(error)
        }else{
            const data = body.data.shift()
            data.path = req.originalUrl
            res.render('pages/website/view', data)
        }
    })
})

router.get('/edit/:id', auth.redirectLogin, function(req, res, next){
    request.get(configUrl+'web/'+req.params.id, {headers:configHeaders}, function(error, response, body){
        if(error){
            next(error)
        }else{
            const data = body.data.shift()
            data.path = req.originalUrl
            res.render('pages/website/edit', data)
        }
    })
})

router.get('/new/:id', auth.redirectLogin, function(req, res, next){
    request.get(configUrl+'web/'+req.params.id, {headers:configHeaders}, function(error, response, body){
        if(error){
            next(error)
        }else{
            // res.status(200).send(body)
            // console.log(body.data.shift())
            const data = body.data.shift()
            data.path = req.originalUrl
            res.render('pages/setting/edit', data)
        }
    })
})

module.exports = router