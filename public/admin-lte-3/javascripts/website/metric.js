console.log('Loading.. metrics')
const hours = [
    "T00:00:00",
    "T01:00:00",
    "T02:00:00",
    "T03:00:00",
    "T04:00:00",
    "T05:00:00",
    "T06:00:00",
    "T07:00:00",
    "T08:00:00",
    "T09:00:00",
    "T10:00:00",
    "T11:00:00",
    "T12:00:00",
    "T13:00:00",
    "T14:00:00",
    "T15:00:00",
    "T16:00:00",
    "T17:00:00",
    "T18:00:00",
    "T19:00:00",
    "T20:00:00",
    "T21:00:00",
    "T22:00:00",
    "T23:00:00"
]

async function rq(url='', method='GET', data={}){
    // Default options are marked with *
  let opts = {}
  if(method==='POST'){
    opts.method =  method // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    opts.headers = {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    opts.body = JSON.stringify(data) // body data type must match "Content-Type" header
  }else{
    opts.method =  method // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    opts.headers = {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  }
  const response = await fetch(url, opts);
  return response.json(); // parses JSON response into native JavaScript objects
}

async function metrics(every, date){
    
    let time_range = []
    if(every == 1){
        for(let i = 0; i < hours.length; i++){
            time_range.push({start: hours[i], end: hours[i+1]||'T23:59:59'})
        }
    }else{
        let chunk_hours = _.chunk(hours, every)
        for(let i = 0; i < chunk_hours.length; i++){
            time_range.push({
                id: i,
                start: chunk_hours[i][0],
                end: chunk_hours[i].splice(-1)[0]
            })
        }
    }
    let times = time_range.map(v=>{
        return {
            id:v.id,
            start_time: moment(new Date(date+v.start)).utc().format(),
            end_time: moment(new Date(date+v.end.replace(':00:00', ':59:59'))).utc().format(),
            website: id,
            label: moment(new Date(date+v.start)).format('HH:mm A')+' - '+moment(new Date(date+v.end.replace(':00:00', ':59:59'))).format('HH:mm A')
        }
    })

    let tableWrapper = "<tbody><tr><th>Time / Date</th>"
    times.map(v=>{
        tableWrapper +=`<th>${v.label}</th>
        `
        return tableWrapper
    }).join('')

    tableWrapper += `<th>Total</th></tr><tr><th>${date}</th>`
    times.map(v=>{
        tableWrapper +=`<td id="res-${v.id}">Loading...</td>
        `
        return tableWrapper
    }).join('')
    tableWrapper += `<th id="done-error"> Done / Error </th></tr></tbody>`
    $('table#metrics-table').html(tableWrapper)

    let totalDone = []
    let totalError = []

    await Promise.allSettled(times.map(async (v) => {
        let data = await rq('/mmi-admin-dashboard/dashboards/article_metrics', 'POST', v)
        let obj = data.filter(v=> v._id === 'Error' || v._id === "Done")
        let doneStatus = 0
        let errorStatus = 0
        let textStatus = ''
        
        if(obj.length > 0){
            obj.forEach(element => {
                if(element._id === "Error"){
                    errorStatus = errorStatus + element.count
                    totalError.push(element.count)
                }
                if(element._id === "Done"){
                    doneStatus = doneStatus + element.count
                    totalDone.push(element.count)
                }
                
            });
            textStatus = doneStatus + ' / ' + errorStatus
        }else{
            textStatus = doneStatus + ' / ' + errorStatus
        }
        $(`td[id="res-${v.id}"]`).text(textStatus)
        return data
    }))
    $(`th[id="done-error"]`).text(_.sum(totalDone)+ ' / '+_.sum(totalError))
}

async function articles(website, status, fields, date){
    try {
        let from = moment(date+'T00:00:00').utc().format()
        let to = moment(date+'T23:59:59').utc().format()
        let _uri = `/mmi-admin-dashboard/dashboards/article_per_website?fields=${JSON.stringify(fields)}&from=${from}&to=${to}&article_status=${status}&website=${website}`
        let article = await rq(_uri, 'GET')
        if(status === "Done"){
            let tableWrapper = '<table class="table table-bordered">'
            tableWrapper+= `<thead><tr><th>Done (${article.length})</th></tr></thead>`
            tableWrapper+= article.map(function(a){
                return `<tr><td><a href="${a.article_url}">${a.article_title}</a></td>`
            }).join('</tr>')
            tableWrapper+= '</table>'
            $('#done-articles').html(tableWrapper)
        }
        if(status === 'Error'){
            let tableWrapper = '<table class="table table-bordered">'
            tableWrapper+= `<thead><tr><th colspan="2">Error (${article.length})</th></tr></thead>`
            tableWrapper+= article.map(function(a){
                return `<tr><td><a href="${a.article_url}">${a.article_url}</a></td><td>${a.article_error_status}</td>`
            }).join('</tr>')
            tableWrapper+= '</table>'
            $('#error-articles').html(tableWrapper)
        }
    } catch (error) {
        console.log(error)
    }
}
metrics(2, moment().format('Y-MM-DD'))
articles(id, 'Done', {"article_title":1,"article_url": 1}, moment().format('Y-MM-DD'))
articles(id, 'Error', {"article_url":1,"article_error_status": 1}, moment().format('Y-MM-DD'))

$('button#btnSubmit').click(function(){
    console.log($('input[type="date"]').val())
    metrics($('input[id="frequency"]').val(), $('input[type="date"]').val() || moment().format('Y-MM-DD'))
    articles(id, 'Done', {"article_title":1,"article_url": 1}, $('input[type="date"]').val())
    articles(id, 'Error', {"article_url":1,"article_error_status": 1}, $('input[type="date"]').val())
})