console.log('Ready...')

async function fetching(url, method, data){
    const response = await fetch(url, {
        method: method || 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

$('button#preview').click( async function(){
    let limit = $('#limit').val()
    console.log(limit)
    let formData = new FormData(document.getElementById('extract-website'))
    let formBody = {}
    let entries = formData.entries()
    for(let i of entries){
        if(i[1]){
            formBody[i[0]] = JSON.parse(i[1])
        }   
    }
    let fields = formBody
    let countActive = await fetching('/mmi-admin-dashboard/websites/count', 'POST', {status: "ACTIVE"})
    let size = (limit == 0) ? countActive.data : limit
    fetching('/mmi-admin-dashboard/websites/report?limit='+size+'&fields='+JSON.stringify(fields), 'POST', {status: "ACTIVE"})
    .then(console.log)
    .catch(console.log)
})