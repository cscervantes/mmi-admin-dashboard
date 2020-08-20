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

async function websiteStatus(){
    try {
        let r = await rq('/mmi-admin-dashboard/dashboards/website_status')
        let labels = []
        let data = []
        r.forEach(element => {
            labels.push(element._id)
            data.push(element.count)
        });

        let donutData        = {
            labels: labels,
            datasets: [
              {
                data: data,
                backgroundColor : ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
              }
            ]
          }
        
        let donutOptions     = {
            maintainAspectRatio : false,
            responsive : true,
          }
        var donutChartCanvas = $('#website-status').get(0).getContext('2d')
        new Chart(donutChartCanvas, {
            type: 'doughnut',
            data: donutData,
            options: donutOptions      
        })
    } catch (error) {
        console.log(error)
    }
}

async function articleStatus(){
    try {
        let r = await rq('/mmi-admin-dashboard/dashboards/article_status')
        let labels = []
        let data = []
        r.forEach(element => {
            labels.push(element._id)
            data.push(element.count)
        });

        let donutData        = {
            labels: labels,
            datasets: [
              {
                data: data,
                backgroundColor : ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
              }
            ]
          }
        
        let donutOptions     = {
            maintainAspectRatio : false,
            responsive : true,
          }
        var donutChartCanvas = $('#article-status').get(0).getContext('2d')
        new Chart(donutChartCanvas, {
            type: 'pie',
            data: donutData,
            options: donutOptions      
        })
    } catch (error) {
        console.log(error)
    }
}

async function websiteType(){
    try {
        let r = await rq('/mmi-admin-dashboard/dashboards/website_type')
        let labels = []
        let data = []
        r.forEach(element => {
            labels.push(element._id)
            data.push(element.count)
        });

        let donutData        = {
            labels: labels,
            datasets: [
              {
                data: data,
                backgroundColor : ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
              }
            ]
          }
        
        let donutOptions     = {
            maintainAspectRatio : false,
            responsive : true,
          }
        var donutChartCanvas = $('#website-type').get(0).getContext('2d')
        new Chart(donutChartCanvas, {
            type: 'pie',
            data: donutData,
            options: donutOptions      
        })
    } catch (error) {
        console.log(error)
    }
}

async function websiteCategory(){
    try {
        let r = await rq('/mmi-admin-dashboard/dashboards/website_category')
        let labels = []
        let data = []
        r.forEach(element => {
            labels.push(element._id)
            data.push(element.count)
        });

        let donutData        = {
            labels: labels,
            datasets: [
              {
                data: data,
                backgroundColor : ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
              }
            ]
          }
        
        let donutOptions     = {
            maintainAspectRatio : false,
            responsive : true,
          }
        var donutChartCanvas = $('#website-category').get(0).getContext('2d')
        new Chart(donutChartCanvas, {
            type: 'doughnut',
            data: donutData,
            options: donutOptions      
        })
    } catch (error) {
        console.log(error)
    }
}

websiteStatus()
articleStatus()
websiteCategory()
websiteType()