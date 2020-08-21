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
  const response = await fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
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

metrics(2, moment().format('Y-MM-DD'))

$('button#btnSubmit').click(function(){
    console.log($('input[type="date"]').val())
    metrics($('input[id="frequency"]').val(), $('input[type="date"]').val() || moment().format('Y-MM-DD'))
})