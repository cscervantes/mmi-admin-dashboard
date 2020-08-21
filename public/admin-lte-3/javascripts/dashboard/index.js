async function rq(url){
    const p = new Promise((resolve, reject)=>{
        try {
            fetch(url)
              .then(
                function(response) {
                  if (response.status !== 200) {
                    reject('Looks like there was a problem. Status Code: ' +
                      response.status);
            
                  }
                  response.json().then(function(data) {
                    resolve(data);
                  });
                }
              )
              .catch(function(err) {
                reject('Fetch Error :-S', err);
              });    
        } catch (error) {
            reject(error)
        }
    })
    return p
}

class DashboardChart{
  constructor(ctx, chartType){
    this.chartType = chartType
    this.myChart = new Chart(ctx, {
      type: this.chartType || 'pie',
      data: {},
      options: {}
    })
  }

  async draw(status, duration){
    let _uri = '/mmi-admin-dashboard/dashboards/'+status
    if(duration){
      _uri += '?duration='+duration
    }
    let r = await rq(_uri)
    console.log(r)
    let labels = []
    let data = []
    r.forEach(element => {
        labels.push(element._id)
        data.push(element.count)
    });
    this.myChart.type = this.chartType
    this.myChart.data = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor : ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#92b57d', '#473d94', '#631963', '#48635d'],
        }
      ]
    }
    this.myChart.update()
  }
}

let websiteStatusChart = new DashboardChart(document.getElementById('website-status').getContext('2d'), 'doughnut')
websiteStatusChart.draw('website_status')

let websiteTypeChart = new DashboardChart(document.getElementById('website-type').getContext('2d'), 'pie')
websiteTypeChart.draw('website_type')

let websiteCategoryChart = new DashboardChart(document.getElementById('website-category').getContext('2d'), 'doughnut')
websiteCategoryChart.draw('website_category')

let articleStatusChart = new DashboardChart(document.getElementById('article-status').getContext('2d'), 'pie')
articleStatusChart.draw('article_status', '1day')

let socialstatusChart = new DashboardChart(document.getElementById('social-media-status').getContext('2d'), 'doughnut')
socialstatusChart.draw('social_media_status', '1day')

$(document).on('change', 'select#duration', function(e){
  e.preventDefault()
  e.stopPropagation()
  articleStatusChart.draw('article_status', $(this).val())
})

$(document).on('change', 'select#duration2', function(e){
  e.preventDefault()
  e.stopPropagation()
  socialstatusChart.draw('social_media_status', $(this).val())
})