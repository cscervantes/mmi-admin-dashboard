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

router.post('/link', auth.redirectLogin, async (req, res, next) => {
    try {
        let result = await fetch(configUrl+'link/count_custom_query', 'POST', configHeaders, req.body)
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})

router.post('/article', auth.redirectLogin, async (req, res, next) => {
    try {
        let result = await fetch(configUrl+'article-test/count_custom_query', 'POST', configHeaders, req.body)
        // console.log(result)
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})

router.post('/client-crawl-links', auth.redirectLogin, async (req, res, next) => {
    try {
        let result = await fetch(configUrl+'global-link/count_custom_query', 'POST', configHeaders, req.body)
        // console.log(result)
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})

router.post('/client-parse-links', auth.redirectLogin, async (req, res, next) => {
    try {
        let result = await fetch(configUrl+'article/count_custom_query', 'POST', configHeaders, req.body)
        // console.log(result)
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})

router.post('/client-datatables', auth.redirectLogin, async (req, res, next) => {
    try {
        let result = await fetch(configUrl+'global-link/datatables', 'POST', configHeaders, req.body)
        // console.log(result)
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})

module.exports = router