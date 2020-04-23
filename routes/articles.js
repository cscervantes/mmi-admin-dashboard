var express = require('express');
var router = express.Router();
var request = require('request').defaults({json:true})
var auth = require('../authenticate')
var config = require('../config')
var configUrl = (process.env.PRODUCTION) ? config.endpoints.production.url : config.endpoints.development.url
var configHeaders = (process.env.PRODUCTION) ? config.endpoints.production.headers : config.endpoints.development.headers

router.post('/', function(req, res, next){
    request.post(configUrl+'article/datatables', {headers:configHeaders, body:req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

router.get('/view/:id', auth.redirectLogin, function(req, res, next){
    request.get(configUrl+'article/'+req.params.id, {headers:configHeaders}, function(error, response, body){
        if(error){
            next(error)
        }else{
            // const data = body.data.shift()
            const data = body.data
            data.path = req.originalUrl
            // console.log(data)
            res.render('pages/article/view', data)
        }
    })
})

router.get('/edit/:id', auth.redirectLogin, function(req, res, next){
    request.get(configUrl+'article/'+req.params.id, {headers:configHeaders}, function(error, response, body){
        if(error){
            next(error)
        }else{
            // const data = body.data.shift()
            const data = body.data
            data.path = req.originalUrl
            // console.log(data)
            res.render('pages/article/edit', data)
        }
    })
})

router.post('/update/:id', function(req, res, next){
    request.put(configUrl+'article/'+req.params.id, {headers:configHeaders, body:req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

module.exports = router