function advanceSearch(moment){
    $(document).on('click', 'button#btnSearch', function(){
        const sV = $('input#search').val()
        const searchVal = (sV.startsWith('http')) ? new URL(sV).hostname  : sV
        if(searchVal.trim()){
            $.ajax({
                url: '/mmi-admin-dashboard/advance?fqdn='+searchVal
            }).done(function(response){
                let responseData = ( response.data.length > 0 ) ? response.data.map(v=>{
                    let contentHtml = `
                        <small>${v.fqdn}</small>
                        <a class="nav-link" href="/mmi-admin-dashboard/websites/view/${v._id}"><h5>${v.website_name}</h5></a>
                        <small>Added ${moment(v.date_created).fromNow()}</small>
                        <hr>
                    `
                    return contentHtml
                }).join('\n')  : '<h3 class="text-center">No result found!</h3>'
                let wrapper = `
                    <div class="row">
                        <h1>Search result ${response.data.length}</h1>
                        <div class="col-sm-12">
                            ${responseData}
                        </div>
                    </div>
                `
                $('#search-result').html(wrapper)
            }).fail(function(response){
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
}