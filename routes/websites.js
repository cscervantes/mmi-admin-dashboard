var express = require('express');
var router = express.Router();
var request = require('request').defaults({json:true})
var auth = require('../authenticate')
var config = require('../config')
var configUrl = (process.env.PRODUCTION) ? config.endpoints.production.url : config.endpoints.development.url
var configHeaders = (process.env.PRODUCTION) ? config.endpoints.production.headers : config.endpoints.development.headers
var excel = require('exceljs');
const tempfile = require('tempfile');

router.post('/', function(req, res, next) {
    request.post(configUrl+'web/datatables', {headers:configHeaders, body:req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

router.post('/count', function(req, res, next){
    request.post(configUrl+'web/count_custom_query', {headers:configHeaders, body: req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

router.post('/report', function(req, res, next){
    let _q = []
    for(let i of Object.entries(req.query)){
        _q.push(`${i[0]}=${i[1]}`)
    }
    let _uri = configUrl+'web/custom_query'
    if(req.query){
        _uri = _uri + '?'+_q.join('&')
    }
    // console.log(new URL(_uri))
    request.post(new URL(_uri), {headers:configHeaders, body: req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet("Online Lists")
            let cols = Object.keys(JSON.parse(req.query.fields)).map(v=>{
                return {
                    header: (v.includes('_')) ? v.split('_')[1].toUpperCase() : v.toUpperCase(),
                    key: v
                }
            })
            // console.log(cols)

            console.log(process.env.PWD)
            worksheet.columns = cols
            worksheet.addRows(body.data)
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=' + 'Online-Sites.xlsx');
            return workbook.xlsx.write(res)
                  .then(function() {
                        res.status(200).end();
                  });
            
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