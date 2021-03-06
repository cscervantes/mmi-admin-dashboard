console.log('Link')
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

class DashboardChart{
  constructor(ctx, chartType){
    this.chartType = chartType
    this.myChart = new Chart(ctx, {
      type: this.chartType || 'bar',
      data: {},
      options: {}
    })
  }

  async draw(url, method, obj){
    let dt = moment(endOfWeek(new Date(obj.date_created))).format('Y-MM-DD')
    // console.log(dt)
    let frequencies = []
    for(let i = 0; i < 7; i++){
        frequencies.push(moment(dt).subtract(i, 'day').format())
    }
    let dates = _.chunk(frequencies, 1).map(v=>{
        return {
                label: moment(v[0]).format(),
                date_created:{
                    "$lte": moment(v[0]).format('Y-MM-DD')+'T23:59:59.999Z',
                    "$gte": moment(v[0]).subtract(1, 'day').format('Y-MM-DD')+'T23:59:59.999Z'
                }
        }
    })
    // console.log(dates)
    let labels = []
    let data = []
    let mapDates = Promise.allSettled(dates.map(async (v)=>{
        obj.date_created = v.date_created
        let r = await rq(url, method, obj)
        r.label = v.label
        return r
    }))

    await mapDates.then(v=>{
        v.forEach(element => {
            labels.push(moment(element.value.label).format('L'))
            data.push(element.value.data)
        });
    })

    this.myChart.type = this.chartType
    this.myChart.data = {
      labels: labels,
      datasets: [
        {
          label: (this.chartType === "horizontalBar") ? 'Daily Result': '',
          data: data,
          backgroundColor : ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#92b57d', '#473d94', '#631963'],
        }
      ]
    }
    this.myChart.update()
  }
}

// let artemLink = new DashboardChart(document.getElementById('artem-link').getContext('2d'), 'horizontalBar')
let artemLink = new DashboardChart(document.getElementById('artem-link').getContext('2d'), 'horizontalBar')
artemLink.draw('/mmi-admin-dashboard/artems/link', 'POST', {"date_created": new Date()})

let artemArticle = new DashboardChart(document.getElementById('artem-parse-link').getContext('2d'), 'horizontalBar')
artemArticle.draw('/mmi-admin-dashboard/artems/article', 'POST', {"date_created": new Date()})

let clientArticle = new DashboardChart(document.getElementById('client-crawl-link').getContext('2d'), 'horizontalBar')
clientArticle.draw('/mmi-admin-dashboard/artems/client-crawl-links', 'POST', {"date_created": new Date()})

let clientParsedArticle = new DashboardChart(document.getElementById('client-parse-link').getContext('2d'), 'horizontalBar')
clientParsedArticle.draw('/mmi-admin-dashboard/artems/client-parse-links', 'POST', {"date_created": new Date(), "created_by": "Python Global Scraper"})

$(document).on('change', '#date', function(){
    // console.log($(this).val())
    artemLink.draw('/mmi-admin-dashboard/artems/link', 'POST', {"date_created":$(this).val()})
})

$(document).on('change', '#date2', function(){
  // console.log($(this).val())
  artemArticle.draw('/mmi-admin-dashboard/artems/article', 'POST', {"date_created":$(this).val()})
})

$(document).on('change', '#date3', function(){
  // console.log($(this).val())
  clientArticle.draw('/mmi-admin-dashboard/artems/client-crawl-links', 'POST', {"date_created":$(this).val()})
})

$(document).on('change', '#date4', function(){
  // console.log($(this).val())
  clientParsedArticle.draw('/mmi-admin-dashboard/artems/client-parse-links', 'POST', {"date_created":$(this).val(), "created_by": "Python Global Scraper"})
})


function endOfWeek(date)
{
    
    var lastday = date.getDate() - (date.getDay() - 1) + 6;
    return new Date(date.setDate(lastday));

}