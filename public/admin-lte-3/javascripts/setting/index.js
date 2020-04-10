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
                    data: JSON.stringify({'url': searchVal}),
                    dataType: 'json',
                    beforeSend: function(xhr){
                        overlay.css({
                            'display': 'flex'
                        })
                    }
                }).done(function(response){
                    let wrapper = '<ul>'
                    let mapResult = response.map(v=>{
                        return `<li>${v}`
                    }).join('</li>')
                    wrapper += mapResult +'</ul>'

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
}