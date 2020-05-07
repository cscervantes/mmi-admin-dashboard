var express = require('express');
var router = express.Router();
var request = require('request').defaults({json:true})
var auth = require('../authenticate')
var config = require('../config')
var franc = require('franc')
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

router.get('/add', auth.redirectLogin, function(req, res, next){
    res.render('pages/article/add', { title:"New Article", path:req.originalUrl })
})

router.get('/count', function(req, res, next){
    request.get(configUrl+'article/count?article_url='+req.query.article_url+'&article_status='+req.query.article_status, {headers:configHeaders}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

router.post('/store', function(req, res, next){
    req.body.article_language = franc(req.body.article_content)
    request.post(configUrl+'article', {headers:configHeaders, body: req.body}, function(error, response, body){
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
    req.body.article_language = franc(req.body.article_content)
    request.put(configUrl+'article/'+req.params.id, {headers:configHeaders, body:req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

router.post('/delete/:id', function(req, res, next){
    request.delete(configUrl+'article/'+req.params.id, {headers:configHeaders}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

module.exports = router