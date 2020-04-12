function advanceSearch(moment){
    const overlay = $('div.overlay')
    $(document).on('click', 'button#btnSearch', function(){
        const sV = $('input#search').val()
        const searchVal = (sV.startsWith('http')) ? new URL(sV).hostname  : sV
        if(searchVal.trim()){
            $.ajax({
                url: '/mmi-admin-dashboard/advance?fqdn='+searchVal,
                beforeSend: function(xhr){
                    overlay.css({
                        'display': 'flex'
                    })
                }
            }).done(function(response){
                let responseData = ( response.data.length > 0 ) ? response.data.map(v=>{
                    let contentHtml = `
                        <small>${v.fqdn}</small>
                        <a class="nav-link" href="/mmi-admin-dashboard/websites/view/${v._id}"><h5>${v.website_name}</h5></a>
                        <small>Added ${moment(v.date_created).fromNow()}</small>
                        <hr>
                    `
                    return contentHtml
                }).join('\n')  : `<h3 class="text-center">No result found!</h3>
                        <p class="text-center">Do you want to see if the website is scrappable before adding? <button class="btn btn-primary" id="btnParse">Parse now</button>
                        </p>`
                let wrapper = `
                    <div class="row">
                        <h1>Search result ${response.data.length}</h1>
                        <div class="col-sm-12">
                            ${responseData}
                        </div>
                    </div>
                `
                $('#search-result').html(wrapper)

                overlay.css({
                    'display': 'none'
                })
                
            }).fail(function(response){
                overlay.css({
                    'display': 'none'
                })
                $(document).Toasts('create', {
                    class: 'bg-danger', 
                    delay: 3000,
                    autohide: true,
                    title: 'Oops! '+response.status,
                    // subtitle: 'Subtitle',
                    body: response.statusText
                  })
            })
        }else{
            $(document).Toasts('create', {
                class: 'bg-warning', 
                delay: 3000,
                autohide: true,
                title: 'Warning!',
                // subtitle: 'Subtitle',
                body: 'Website is required.'
              })
            $('input#search').focus()
        }
    })

    $(document).on('click', 'button#btnParse', function(){
        try{
            const sval = $('input#search').val()
            if(sval.trim()){
                const searchVal = new URL(sval).origin
                $.ajax({
                    url: '/mmi-admin-dashboard/advance/parse_website',
                    contentType: 'application/json',
                    method: 'POST',
                    data: JSON.stringify({'url': searchVal, 'request_source': $('select#request_source').val()}),
                    dataType: 'json',
                    beforeSend: function(xhr){
                        overlay.css({
                            'display': 'flex'
                        })
                    }
                }).done(function(response){
                    if(response.length > 0){
                        let wrapper = `<h4 class="text-center">Do you want to add this website? <div class="btn-group">
                            <button class="btn btn-flat" id="btnYes">Yes</button>
                            <button class="btn btn-flat" id="btnNo">No</button>
                        </div></h4>`
                        wrapper += '<ul>'
                        let mapResult = response.map(v=>{
                            return `<li><a href="${v}" class="nav-link" target="_blank">${v}</a>`
                        }).join('</li>')
                        wrapper += mapResult +'</ul>'

                        $('#search-result').html(wrapper)
                    }else{
                        $('#search-result').html(`
                            <p class="text-center">If this website does not have any results from either <i><b>Request</b></i> or <i><b>Cloud Scraper</b></i>. Contact IT to add the website in different scraper!</p>
                        `)
                    }
                    

                    overlay.css({
                        'display': 'none'
                    })

                }).fail(function(response){
                    overlay.css({
                        'display': 'none'
                    })
                    $(document).Toasts('create', {
                        class: 'bg-danger', 
                        delay: 3000,
                        autohide: true,
                        title: 'Oops! '+response.status,
                        // subtitle: 'Subtitle',
                        body: response.statusText
                      })
                })
            }else{
                $(document).Toasts('create', {
                    class: 'bg-warning', 
                    delay: 3000,
                    autohide: true,
                    title: 'Warning!',
                    // subtitle: 'Subtitle',
                    body: 'Url is required!'
                  }) 
            }
        }catch(error){
            $(document).Toasts('create', {
                class: 'bg-warning', 
                delay: 3000,
                autohide: true,
                title: 'Warning!',
                // subtitle: 'Subtitle',
                body: error
              })
        }
    })

    $(document).on('click', '#btnYes', function(){
        try {
            const sval = $('input#search').val()
            location.href="/mmi-admin-dashboard/advance/new?url="+new URL(sval).origin+"&request_source="+$('select#request_source').val()
        } catch (error) {
            $(document).Toasts('create', {
                class: 'bg-warning', 
                delay: 3000,
                autohide: true,
                title: 'Warning!',
                // subtitle: 'Subtitle',
                body: error
              })
        }
    })

    $(document).on('click', '#btnNo', function(){
        location.reload()
    })

    $(document).on('keypress', '#search', function(e){
        if(e.which === 13){
            $('button#btnSearch').click()
        }
    })
}