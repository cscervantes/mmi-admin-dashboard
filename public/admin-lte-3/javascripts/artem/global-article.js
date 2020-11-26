console.log('Loading Script of global-article.js')

async function rq(url='', method='GET', data={}){
    // Default options are marked with *
  let opts = {}
  opts.headers = {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded',
  }
  if(method==='POST'){
    opts.method =  method // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    opts.body = JSON.stringify(data) // body data type must match "Content-Type" header
  }else{
    opts.method =  method // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
  }
  const response = await fetch(url, opts);
  return response.json(); // parses JSON response into native JavaScript objects
}