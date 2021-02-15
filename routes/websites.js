var express = require('express');
var router = express.Router();
var request = require('request').defaults({json:true})
var auth = require('../authenticate')
var config = require('../config')
var configUrl = (process.env.PRODUCTION) ? config.endpoints.production.url : config.endpoints.development.url
var configHeaders = (process.env.PRODUCTION) ? config.endpoints.production.headers : config.endpoints.development.headers
var excel = require('exceljs');
var fs = require('fs')
var _ = require('lodash')
var moment = require('moment')
var countries = JSON.parse(fs.readFileSync(process.cwd()+'/routes/country.json', 'utf-8'))

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

router.post('/custom_query', function(req, res, next){
    let endpoint = configUrl+'web/custom_query'
    if(req.query){
        let query = []
        for(let key in req.query){
            query.push(`${key}=${req.query[key]}`)
        }
        endpoint += '?'+query.join('&')
    }
    request.post(endpoint, {headers:configHeaders, body:req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

router.get('/country_lists', function(req, res, next){
    // let country = countries.find(({country}) => country.search(new RegExp(`^${req.query.country}`, 'gi')) != -1)
    let country = _.uniqBy(countries, "country").map(({country, iso_codes})=>{
        country_code = iso_codes[1]
        return {"label":country, "value": country_code}
    })
    res.status(200).send(country)
})

router.post('/website-article-lists', async function(req, res, next){
    // console.log(req.body)
    let offSize = req.body.start
    let tableSize = req.body.length
    let orderCol = req.body['order[0][column]']
    let column = req.body[`columns[${orderCol}][data]`]
    let orderDir = req.body['order[0][dir]'] || 'desc'
    let queryString = req.body['search[value]']
    let endpoint2 = configUrl+'media/query_builder'
    let bodyContent = {
        sql: `SELECT media_web.pub_id, publication.pub_name, publication.alexa_global_rank AS global_rank, publication.alexa_local_rank AS local_rank, country.cnt_name AS country, COUNT(mwe_id) AS article_hits FROM media_web
        RIGHT JOIN publication
        ON media_web.pub_id = publication.pub_id
        RIGHT JOIN country
        ON media_web.cnt_id = country.cnt_id
        WHERE media_web.mwe_datetime BETWEEN "${moment().subtract(1, 'week').format('YYYY-MM-DD')} 00:00:00" AND "${moment().format('YYYY-MM-DD')} 23:59:59"
        AND publication.mty_id IN(4,11)
        GROUP BY media_web.pub_id
        ORDER BY ${column} ${orderDir} LIMIT ${offSize}, ${tableSize}`
    }
    if(queryString){
        bodyContent = {
            sql: `SELECT media_web.pub_id, publication.pub_name, publication.alexa_global_rank AS global_rank, publication.alexa_local_rank AS local_rank, country.cnt_name AS country, COUNT(mwe_id) AS article_hits FROM media_web
            RIGHT JOIN publication
            ON media_web.pub_id = publication.pub_id
            RIGHT JOIN country
            ON media_web.cnt_id = country.cnt_id
            WHERE media_web.mwe_datetime BETWEEN "${moment().subtract(1, 'week').format('YYYY-MM-DD')} 00:00:00" AND "${moment().format('YYYY-MM-DD')} 23:59:59"
            AND ( publication.pub_name LIKE '%${queryString}%' OR country.cnt_name LIKE '%${queryString}%' )
            AND publication.mty_id IN(4,11)
            GROUP BY media_web.pub_id
            ORDER BY ${column} ${orderDir} LIMIT ${offSize}, ${tableSize}`
        }
    }
    // console.log(bodyContent.sql)
    let pubContent = {
        sql : `SELECT COUNT(*) as total FROM publication WHERE publication.mty_id IN(4,11)`
    }
    let pubHits = await fetch(endpoint2, 'POST', configHeaders, pubContent)
    let articleHits = await fetch(endpoint2, 'POST', configHeaders, bodyContent)

    let recordsFiltered = (queryString) ? articleHits.length  : pubHits[0].total
    let total = (queryString) ? articleHits.length  : pubHits[0].total
    let result = {
        "recordsFiltered": recordsFiltered,
        "recordsTotal": pubHits[0].total,
        "total": total,
        "data": articleHits
    }
    res.status(200).send(result)
})

router.get('/download-lists', auth.redirectLogin, async function(req, res, next){
    let endpoint2 = configUrl+'media/query_builder'
    let bodyContent = {
        sql: `SELECT publication.pub_name, publication.alexa_global_rank AS global_rank, publication.alexa_local_rank AS local_rank, country.cnt_name AS country, COUNT(mwe_id) AS article_hits FROM publication
        LEFT JOIN media_web
        ON media_web.pub_id = publication.pub_id
        LEFT JOIN country
        ON media_web.cnt_id = country.cnt_id
        WHERE media_web.mwe_datetime BETWEEN "${moment().subtract(1, 'week').format('YYYY-MM-DD')} 00:00:00" AND "${moment().format('YYYY-MM-DD')} 23:59:59"
        AND publication.mty_id IN(4,11)
        GROUP BY media_web.pub_id
        ORDER BY article_hits DESC`
    }
    console.log(bodyContent.sql)
    let articleHits = await fetch(endpoint2, 'POST', configHeaders, bodyContent)
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Website Lists")
    worksheet.columns = [
        {header:"Name", key: "pub_name"}, 
        {header:"Country", key:"country"},
        {header:"Global Rank", key:"global_rank"},
        {header:"Local Rank", key:"local_rank"},
        {header:"Article Hits", key:"article_hits"}
    ]
    worksheet.addRows(articleHits)
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=' + 'Websites.xlsx');
    return workbook.xlsx.write(res)
            .then(function() {
                res.status(200).end();
            });
})

router.post('/raw-website-datatables', function(req, res, next) {
    request.post(configUrl+'raw-website/datatables', {headers:configHeaders, body:req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

router.get('/raw-website-lists', async function(req, res, next){
    let filename = req.query.filename || 'Document'
    let q = (req.query.hasOwnProperty("query")) ? JSON.parse(req.query.query) : {}
    let query = {}
    
    if(q.hasOwnProperty('fqdn')){

        query.fqdn = { "$regex": q.fqdn, "$options": "i"}

    }

    if(q.hasOwnProperty('global')){

        let k = q.global.split(':')[1]

        let v = parseInt(q.global.split(':')[0])

        let kv = {}

        kv[k] = v

        // kv["$ne"] = 0
        
        query["alexa_rankings.global"] = kv

    }
    
    if(q.hasOwnProperty('local')){

        let k = q.local.split(':')[1]

        let v = parseInt(q.local.split(':')[0])

        let kv = {}

        kv[k] = v

        // kv["$ne"] = 0

        query["alexa_rankings.local"] = kv

    }

    if(q.hasOwnProperty('name')){

        query.name = {"$regex": q.name, "$options": "i"}

    }

    if(q.hasOwnProperty('country')){

        query.country = {"$regex": q.country, "$options":"i" }
        
    }

    let body = {
        "query": query,
        "fields": {}
    }

    let countDocs = await fetch(configUrl+'raw-website/count', 'POST', configHeaders, query)
    let result = await fetch(configUrl+'raw-website/query?limit='+countDocs.data, 'POST', configHeaders, body)
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet(filename)
    worksheet.columns = [
        {header:"Name", key: "name", width: 25}, 
        {header:"FQDN", key:"fqdn", width:25}, 
        {header:"Country", key:"country", width:20},
        {header:"Alexa Global Ranking", width: 25},
        {header:"Alexa Local Ranking", width: 25},
    ]
    // worksheet.addRows(result.data)
    result.data.forEach(element=>{
        worksheet.addRow([element.name, element.fqdn, element.country, element.alexa_rankings.global, element.alexa_rankings.local])
    })
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}.xlsx`);
    return workbook.xlsx.write(res)
            .then(function() {
                res.status(200).end();
            });
})

router.post('/lists', function(req, res, next) {
    request.post(configUrl+'web/lists', {headers:configHeaders, body:req.body}, function(error, response, body){
        if(error){
            next(error)
        }else{
            res.status(200).send(body)
        }
    })
})

router.get('/website-lists', async function(req, res, next){
    let filename = req.query.filename || 'Document'
    let q = (req.query.hasOwnProperty("query")) ? JSON.parse(req.query.query) : {}
    let query = {}

    // console.log(q)
    
    if(q.hasOwnProperty('fqdn')){

        query.fqdn = { "$regex": q.fqdn, "$options": "i"}

    }

    if(q.hasOwnProperty('global')){

        let k = q.global.split(':')[1]

        let v = parseInt(q.global.split(':')[0])

        let kv = {}

        kv[k] = v

        // kv["$ne"] = 0
        
        query["alexa_rankings.global"] = kv

    }
    
    if(q.hasOwnProperty('local')){

        let k = q.local.split(':')[1]

        let v = parseInt(q.local.split(':')[0])

        let kv = {}

        kv[k] = v

        // kv["$ne"] = 0

        query["alexa_rankings.local"] = kv

    }

    if(q.hasOwnProperty('website_name')){

        query.website_name = {"$regex": q.website_name, "$options": "i"}

    }

    if(q.hasOwnProperty('country')){

        query.country = {"$regex": q.country, "$options":"i" }
        
    }

    if(q.hasOwnProperty('country_code')){

        query.country_code = {"$regex": q.country_code, "$options":"i"}

    }

    if(q.hasOwnProperty('website_category')){

        query.website_category = {"$regex": q.website_category, "$options":"i"}

    }

    if(q.hasOwnProperty('verified')){

        query.verified = JSON.parse(q.verified)

    }

    if(q.hasOwnProperty('date_created')){

        query.date_created = {"$gte": moment(q.date_created).subtract(1, 'day').format('YYYY-MM-DD')+"T16:00:00.000Z", "$lte": q.date_created+"T16:00:00.000Z" }

    }

    // console.log(query)

    let countDocs = await fetch(configUrl+'web/count_custom_query', 'POST', configHeaders, query)
    // console.log(countDocs)
    let result = await fetch(configUrl+'web/custom_query?fields={"website_name":1, "fqdn":1, "country":1, "country_code":1, "alexa_rankings":1, "website_category":1, "verified":1}&limit='+countDocs.data, 'POST', configHeaders, query)
    // console.log(result)
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet(filename)
    worksheet.columns = [
        {header:"Name", key: "name", width: 25}, 
        {header:"FQDN", key:"fqdn", width:25}, 
        {header:"Country", key:"country", width:20},
        {header:"Country Code", key:"country_code", width:20},
        {header:"Category", key:"website_category", width:20},
        {header:"Alexa Global Ranking", width: 25},
        {header:"Alexa Local Ranking", width: 25},
        {header:"Verified", key:"verified", width:20},
    ]
    // worksheet.addRows(result.data)
    result.data.forEach(element=>{
        worksheet.addRow(
            [
                element.website_name, 
                element.fqdn, 
                element.country, 
                element.country_code, 
                element.website_category, 
                element.alexa_rankings.global, 
                element.alexa_rankings.local, 
                element.verified
            ])
    })
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}.xlsx`);
    return workbook.xlsx.write(res)
            .then(function() {
                res.status(200).end();
            });
})

module.exports = router