var express = require('express');
var router = express.Router();
var request = require('request').defaults({json:true})
var auth = require('../authenticate')
var config = require('../config')
var configUrl = (process.env.PRODUCTION) ? config.endpoints.production.url : config.endpoints.development.url
var configHeaders = (process.env.PRODUCTION) ? config.endpoints.production.headers : config.endpoints.development.headers
var excel = require('exceljs');

async function fetch(uri, method, headers, body) {
    const p = new Promise((resolve, reject) => {
        try {
            let options = {
                "url": uri,
                "method": method || 'GET'
            }

            if(headers){
                options.headers = headers
            }

            if(body){
                options.body = body
            }
            
            request(options, (error, response, body) => {
                if(error) {
                    // console.error(error)
                    reject(error)
                }else{
                    // console.log(body)
                    resolve(body)
                }
            })
        } catch (error) {
            reject(error)
        }
    })

    return p
}

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

router.get('/download', auth.redirectLogin, async function(req, res, next){
    let fields={"website_name":1,"website_url":1,"fqdn":1,"country":1,"status":1,"website_category":1,"website_type":1}
    let _uri = configUrl+'web/custom_query?fields='+JSON.stringify(fields)
    let countActive = await fetch(configUrl+'web/count_custom_query', 'POST', configHeaders, {status:"ACTIVE"})
    request.post(_uri+'&limit='+countActive.data, {headers:configHeaders, body: {status:"ACTIVE"}}, function(error, response, body){
        if(error){
            next(error)
        }else{
            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet("Online Lists")
            let cols = Object.keys(fields).map(v=>{
                return {
                    header: (v.includes('_')) ? v.split('_')[1].toUpperCase() : v.toUpperCase(),
                    key: v
                }
            })
            // console.log(cols)

            // console.log(process.env.PWD)
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