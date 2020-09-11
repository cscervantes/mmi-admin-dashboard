console.log('Script is ready...')
var cache = {};
$( "#website_name" ).autocomplete({
    classes: {
        "ui-autocomplete": "highlight"
    },
  minLength: 3,
  source: function( request, response ) {
    var term = request.term;
    if ( term in cache ) {
      response( cache[ term ] );
      return;
    }
 
    $.getJSON( "/mmi-admin-dashboard/websites/term", request, function( data, status, xhr ) {
      data = data.data.map(({_id, website_name, fqdn, needs_search_params, needs_https, needs_endslash, website_cost, alexa_rankings})=>{
          return { value: website_name, data: {_id, fqdn, needs_search_params, needs_https, needs_endslash, website_cost, alexa_rankings}}
      })
      cache[ term ] = data;
      response( data );
    });
    
  }, select: function( event, ui ) {
      $('#website_id').val(ui.item.data._id)
      $('#needs_search_params').val(ui.item.data.needs_search_params)
      $('#needs_https').val(ui.item.data.needs_https)
      $('#needs_endslash').val(ui.item.data.needs_endslash)
      $('#article_source_url').val(ui.item.data.fqdn)
      $('#website_cost').val(ui.item.data.website_cost)
      $('#global').val(ui.item.data.alexa_rankings.global)
      $('#local').val(ui.item.data.alexa_rankings.local)
  }
});

$(document).on('change', '#website_name', function(){
  let v = $(this).val()
  if(v.trim()){
    $('.disable-on-empty').prop('disabled', false)
  }else{
    $('.disable-on-empty').prop('disabled', true)
  }
})

$(document).on('change', '#article_url', function(){
  let _t = $(this)
  try {
    let _url = cleanArticleUrl(_t.val())
    let query = {
      article_url : _url,
      article_status : 'Done'
    }
    _t.val(_url)
    $.getJSON("/mmi-admin-dashboard/articles/count", query, function(data, status, xhr) {
      if(data.data > 0){
        $(document).Toasts('create', {
          class: 'bg-warning', 
          delay: 3000,
          autohide: true,
          title: 'Warning!',
          body: 'Article exists.'
        })
        setTimeout(() => {
          _t.val('')
          _t.focus()
        }, 3000);
      }
    })
  } catch (error) {
    $(document).Toasts('create', {
      class: 'bg-warning', 
      delay: 3000,
      autohide: true,
      title: 'Warning!',
      body: error
    })
    setTimeout(() => {
      _t.val('')
      _t.focus()
    }, 3000);
  }
})

$(document).on('click', '#btnAddNewArticle', function(e){
  try {
    const website = $('#website_id').val()
    const article_url = cleanArticleUrl($('#article_url').val())
    const article_title = $('#article_title').val()
    const article_source_url = $('#article_source_url').val()
    const article_publish_date = $('#article_publish_date').val()
    const article_authors = arrayFields($('#article_authors').val())
    const article_sections =  arrayFields($('#article_sections').val())
    const article_images =  arrayFields($('#article_images').val())
    const article_videos =  arrayFields($('#article_videos').val())
    const article_content = $('#article_content').val()
    const article_ad_value = $('#article_ad_value').val()
    const article_pr_value = $('#article_pr_value').val()
    const article_status = 'Done'
    const created_by = user
    const updated_by = user
    // const date_created = new Date()
    // const date_updated = new Date()

    const data = {
      article_url, article_title, article_source_url, article_publish_date, 
      article_authors, article_sections, article_images, article_videos,
      article_content, article_ad_value, article_pr_value, created_by, updated_by,
      website, article_status
    }

    if(!article_title.trim()){
      $(document).Toasts('create', {
        class: 'bg-warning', 
        delay: 3000,
        autohide: true,
        title: 'Warning!',
        body: 'Title is required'
      })
      $('#article_title').focus()
    }else if(!article_url.trim()){
      $(document).Toasts('create', {
        class: 'bg-warning', 
        delay: 3000,
        autohide: true,
        title: 'Warning!',
        body: 'Url is required'
      })
      $('#article_url').focus()
    }else if(!article_publish_date.trim()){
      $(document).Toasts('create', {
        class: 'bg-warning', 
        delay: 3000,
        autohide: true,
        title: 'Warning!',
        body: 'Date is required'
      })
      $('#article_publish_date').focus()
    }else if(!article_content.trim()){
      $(document).Toasts('create', {
        class: 'bg-warning', 
        delay: 3000,
        autohide: true,
        title: 'Warning!',
        body: 'Content is required'
      })
      $('#article_content').focus()
    }else{
      console.log(data)
      $.ajax({
        url:'/mmi-admin-dashboard/articles/store',
        method: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json'
      }).done(function(response){
        console.log('Data',response)
        if(response.hasOwnProperty('error')){
          $(document).Toasts('create', {
              class: 'bg-danger', 
              delay: 3000,
              autohide: true,
              title: 'Oops!',
              body: response.error
            })
      }else{
          $(document).Toasts('create', {
              class: 'bg-info', 
              delay: 3000,
              autohide: true,
              title: 'Success!',
              body: 'Article has been added.'
            })
            setTimeout(() => {
               location.reload() 
            }, 3000);
      }
      }).fail(function(response){
        console.log('Error', response)
        $(document).Toasts('create', {
          class: 'bg-danger', 
          delay: 3000,
          autohide: true,
          title: 'Oops!',
          body: response.responseText
        })
      })
    }
    
  } catch (error) {
    $(document).Toasts('create', {
      class: 'bg-warning', 
      delay: 3000,
      autohide: true,
      title: 'Warning!',
      body: error
    })
  }
  
})

$(document).on('change', 'textarea.article_compute', function(){
  try {
      const images = $('#article_images').val().split('\n').map(v=>v.trim()).filter(v=>v)
      const videos = $('#article_videos').val().split('\n').map(v=>v.trim()).filter(v=>v)
      const text = $('#article_content').val()
      const global = $('#global').val()
      const local = $('#local').val()
      const website_cost = $('#website_cost').val()
      const data = {global, local, website_cost, text, images, videos}
      $.ajax({
          url: '/mmi-admin-dashboard/advance/media_values',
          method: 'POST',
          data: JSON.stringify(data),
          contentType: 'application/json',
          dataType: 'json'
      }).done(function(response){
          $('#article_ad_value').val(response.data.advalue)
          $('#article_pr_value').val(response.data.prvalue)
      }).fail(function(response){
          console.log('Error', response)
      })
  } catch (error) {
      $(document).Toasts('create', {
          class: 'bg-danger', 
          delay: 3000,
          autohide: true,
          title: 'Oops!',
          // subtitle: 'Subtitle',
          body: error
        })
  }
})


function cleanArticleUrl (v) {
  const startHttps = JSON.parse($('#needs_https').val())
  const endSlash = JSON.parse($('#needs_endslash').val())
  const _includeSearch = JSON.parse($('#needs_search_params').val())
  let vUrl = v
  vUrl = (_includeSearch) ? vUrl  : new URL(vUrl).origin+new URL(vUrl).pathname
  vUrl = (startHttps) ? vUrl.replace(/^(http\:)/g, 'https:') : vUrl.replace(/^(https\:)/g, 'http:')
  vUrl = (endSlash) ? (vUrl.substr(-1) != '/') ? vUrl+'/' : vUrl : vUrl.replace(/\/$/g, '')
  return vUrl
}


function arrayFields (arrs) {
  let fld = arrs.split('\n')
  if(fld.length > 0) {
    let flds = fld.map(v=>v.trim())
    return flds.filter(v=>v)
  }else{
    return fld.filter(v=>v)
  }
}

$(document).on('click', '#addMultipleArticles', function(e){
  let _urls = $('#urls').val().split('\n').map(v=>v.trim()).filter(v=>v)
  if(_urls.length > 0){
    let articles = _urls.map(v=>{
      return {
        id: _urls.indexOf(v),
        url: v
      }
    })
    let rows = articles.map(v=>{
      return `<tr id="row-${v.id}"><td><a href="${v.url}">${v.url}</a></td><td><i class="fas fa-spinner fa-pulse" title="Fetching..."></i></td></tr>`
    }).join('')
    let wrapper = '<table class="table table-striped">'
    wrapper += `
      <thead>
        <tr>
          <th>URL</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
    `  
    wrapper += rows
    wrapper += '</tbody></table>'
    
    $('#article_results').html(wrapper)

    const requestFunct = async (data) => {
      setTimeout(() => {
            let dataObj = {
                article_url: data.url,
                created_by: user,
                updated_by: user,
                date_created: new Date(),
                date_updated: new Date()
            }
            $.ajax({
                url: '/mmi-admin-dashboard/advance/store_article',
                method: 'POST',
                'contentType': 'application/json',
                data: JSON.stringify(dataObj),
                dataType: 'json'
            }).done(function(response){
                console.log(response)
                if(response.hasOwnProperty('error')){
                    $(`tr[id="row-${data.id}"]`).html(`<td><a class="nav-link" href="${data.url}" target="_blank">${data.url}</a></td><td><i class="fas fa-exclamation-circle" title="${response.error}"></i></td>`)
                }else{
                  $(`tr[id="row-${data.id}"]`).html(`<td><a class="nav-link" href="${data.url}" target="_blank">${data.url}</a></td><td><i class="fas fa-check-circle" title="Just Added."></i></td>`)
                }
                
            }).fail(function(response){
                console.log(response)
                $(`tr[id="row-${data.id}"]`).html(`<td><a class="nav-link" href="${data.url}" target="_blank">${data.url}</a></td><td><i class="fas fa-times-circle" title="${response.responseText}"></i></td>`)
            }) 
      }, Math.floor(Math.random() * 10000) + 3500);
    }

    const storeArticle = async () => {
        await Promise.all(articles.map(async (v) => await requestFunct(v)))
    }

    storeArticle()

  }
})