async function rq(url='', method='GET', data={}){
    let opts = {}
    opts.headers = {
      'Content-Type': 'application/json'
    }
    if(method==='POST'){
      opts.method =  method
      opts.body = JSON.stringify(data)
    }else{
      opts.method =  method
    }
    const response = await fetch(url, opts);
    return response.json();
  }