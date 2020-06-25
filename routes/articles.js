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

router.post('/count/:website', async function(req, res, next){
   try {
       let count = await countQueued(req)
       let articles = await listArticles(req, count.data.result)
       let data = {
           length: count.data.result,
           articles
       }
       res.status(200).send(data)
   } catch (error) {
       next(error)
   }
    
})

async function countQueued(req) {
    const promise = new Promise(async(resolve, reject) => {
        try {
             request.post(configUrl+'article/count', {headers:configHeaders, body:req.body}, function(error, response, body){
                if(error){
                    reject(error)
                }else{
                    resolve(body)
                }
            })
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
    return promise
}

async function listArticles(req, limit) {
    const promise = new Promise(async(resolve, reject) => {
        try {
             request.get(`${configUrl}article?website=${req.params.website}&article_status=${req.body.article_status}&limit=${limit}`, {headers:configHeaders}, function(error, response, body){
                if(error){
                    reject(error)
                }else{
                    resolve(body)
                }
            })
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
    return promise
}
module.exports = router