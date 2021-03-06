function editWebsite(ace){
    let editor = ace.edit("section_filters")
    editor.setTheme("ace/theme/monokai")
    editor.session.setMode("ace/mode/json")
    editor.setFontSize(16)
    editor.setOptions({
        maxLines: 30,
        autoScrollEditorIntoView: true,
    });

    let editor2 = ace.edit("article_filters")
    editor2.setTheme("ace/theme/monokai")
    editor2.session.setMode("ace/mode/json")
    editor2.setFontSize(16)
    editor2.setOptions({
        maxLines: 30,
        autoScrollEditorIntoView: true,
    });

    let editor3 = ace.edit("selectors")
    editor3.setTheme("ace/theme/monokai")
    editor3.session.setMode("ace/mode/json")
    editor3.setFontSize(16)
    editor3.setOptions({
        maxLines: 30,
        autoScrollEditorIntoView: true,
    });

    let editor4 = ace.edit("code_snippet")
    editor4.setTheme("ace/theme/monokai")
    editor4.session.setMode("ace/mode/typescript")
    editor4.setFontSize(16)
    editor4.setOptions({
        maxLines: 30,
        autoScrollEditorIntoView: true,
    });

    
    

    const overlay = $('.overlay').eq(0)
    
    $(document).on('click', '#btnTest', function(){
        try {
            const section_filters = JSON.parse(editor.getValue())
            const article_filters = JSON.parse(editor2.getValue())
            const url = new URL($('#url').val()).href
            const request_source = $("#request_source").val()
            if(url.trim()){
                const data = {
                    id, url, website_url, request_source, needs_search_params, needs_https, needs_endslash, section_filters, article_filters
                }
                console.log(data)
                $.ajax({
                    url: '/mmi-admin-dashboard/advance/test_filters',
                    method: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    dataType: 'json',
                    beforeSend: function(xhr){
                        overlay.css({
                            'display': 'flex'
                        })
                    }
                }).done(function(response){
                    // let articleWrapper = '<dl><dt>Article Links <button type="button" id="btnSaveArticles" class="btn btn-info btn-sm">Save Articles</button></dt>'
                    let articleWrapper = '<dl><dt>Article Links</dt>'
                    articleWrapper += response.articles.map(v=>{
                        return `<dd><a class="nav-link" href="${v}" target="_blank">${v}</a>`
                    }).join('</dd>')+'</dl>'

                    let sectionWrapper = '<dl><dt>Section Links <button type="button" id="btnSaveSections" class="btn btn-info btn-sm">Save Sections</button></dt>'
                    sectionWrapper += response.sections.map(v=>{
                        return `<dd><a class="nav-link" href="${v}" target="_blank">${v}</a>`
                    }).join('</dd>')+'</dl>'

                    $('#result-for-filters').html(
                        `
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Filtered Links</h3>
                                <div class="card-tools">
                                    <button class="btn btn-tool" type="button" data-card-widget="maximize"><i class="fas fa-expand"></i></button>
                                    <button class="btn btn-tool" type="button" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-6">${sectionWrapper}</div>
                                    <div class="col-sm-6">${articleWrapper}</div>
                                </div>
                            </div>
                        </div>
                        
                        
                        `
                    )

                    overlay.css({
                        'display': 'none'
                    })
                }).fail(function(response){
                    console.log(response)
                    overlay.css({
                        'display': 'none'
                    })
                    $(document).Toasts('create', {
                        class: 'bg-danger', 
                        delay: 3000,
                        autohide: true,
                        title: 'Oops!',
                        // subtitle: 'Subtitle',
                        body: response.responseText
                      })
                })
            }else{
                $(document).Toasts('create', {
                    class: 'bg-warning', 
                    delay: 3000,
                    autohide: true,
                    title: 'Warning!',
                    // subtitle: 'Subtitle',
                    body: 'Url is required'
                  })
            }
            
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
    
    const overlay2 = $('.overlay').eq(1)

    $(document).on('click', '#btnParseArticle', function(){
        try {
            const selectors = JSON.parse(editor3.getValue())
            const code_snippet = editor4.getValue()
            const url = new URL($('#url2').val()).href
            const request_source = $('#request_source2').val()
            const is_using_selectors = $('#is_using_selectors').prop('checked')
            const is_using_snippets = $('#is_using_snippets').prop('checked')
            if(url.trim()){
                if(is_using_selectors || is_using_snippets){
                    const data = {
                        id, url, website_url, request_source, needs_search_params, needs_https, needs_endslash, selectors, code_snippet, is_using_selectors, is_using_snippets, global_rank, local_rank, website_cost
                    }
                    console.log(data)
                    $.ajax({
                        url: '/mmi-admin-dashboard/advance/test_article',
                        method: 'POST',
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        dataType: 'json',
                        beforeSend: function(xhr){
                            overlay2.css({
                                'display': 'flex'
                            })
                        }
                    }).done(function(response){
                        console.log(response)
                        let htmlContainer = `
                            <div class="tab-pane fade active show" id="custom-tabs-one-html" role="tabpanel" aria-labelledby="custom-tabs-one-html-tab">
                                ${response.html}
                            </div>
                        `
    
                        let textContainer = `
                            <div class="tab-pane fade" id="custom-tabs-one-text" role="tabpanel" aria-labelledby="custom-tabs-one-text-tab">
                                ${response.text}
                            </div>
                        `
    
                        let jsonContainer = `
                            <div class="tab-pane fade" id="custom-tabs-one-json" role="tabpanel" aria-labelledby="custom-tabs-one-json-tab">
                                <pre>
                                    ${JSON.stringify(response, null, 4)}
                                </pre>
                            </div>
                        `
    
    
                        let articleContainer = `
                            <div class="card card-primary card-outline card-outline-tabs">
                                <div class="card-header p-0 border-bottom-0">
                                    <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="custom-tabs-one-html-tab" data-toggle="pill" href="#custom-tabs-one-html" role="tab" aria-controls="custom-tabs-one-html" aria-selected="true">HTML</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="custom-tabs-one-text-tab" data-toggle="pill" href="#custom-tabs-one-text" role="tab" aria-controls="custom-tabs-one-text" aria-selected="false">TEXT</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="custom-tabs-one-json-tab" data-toggle="pill" href="#custom-tabs-one-json" role="tab" aria-controls="custom-tabs-one-json" aria-selected="false">JSON FORMAT</a>
                                        </li>
                                        <li class="float-right">
                                            <div class="card-tools">
                                                <button class="btn btn-tool" type="button" data-card-widget="maximize"><i class="fas fa-expand"></i></button>
                                                <button class="btn btn-tool" type="button" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
    
                                <div class="card-body">
                                    <div class="tab-content" id="custom-tabs-one-tabContent">
                                        ${htmlContainer}
                                        ${textContainer}
                                        ${jsonContainer}
                                    </div>
                                </div>
    
                            </div>
                        `
    
                        $('#result-for-article').html(articleContainer)
                        overlay2.css({
                            'display': 'none'
                        })
                    }).fail(function(response){
                        console.log(response)
                        overlay2.css({
                            'display': 'none'
                        })
                        $(document).Toasts('create', {
                            class: 'bg-danger', 
                            delay: 180000,
                            autohide: true,
                            title: 'Oops!',
                            // subtitle: 'Subtitle',
                            body: response.responseText
                          })
                    })
                }else{
                    $(document).Toasts('create', {
                        class: 'bg-warning', 
                        delay: 180000,
                        autohide: true,
                        title: 'Warning!',
                        // subtitle: 'Subtitle',
                        body: 'Either selectors or snippets must be enabled!'
                      })
                }
            }else{
                $(document).Toasts('create', {
                    class: 'bg-warning', 
                    delay: 3000,
                    autohide: true,
                    title: 'Warning!',
                    // subtitle: 'Subtitle',
                    body: 'Url is required'
                  })
            }
        } catch (error) {
            $(document).Toasts('create', {
                class: 'bg-warning', 
                delay: 180000,
                autohide: true,
                title: 'Warning!',
                // subtitle: 'Subtitle',
                body: error
              })
        }
    })

    $(document).on('click', '#btnUpdateWebsite', function(){
        try {
            const section_filter = JSON.parse(editor.getValue())
            const article_filter = JSON.parse(editor2.getValue())
            const selectors = JSON.parse(editor3.getValue())
            const code_snippet = editor4.getValue()
            const request_source = $('#request_source2').val()
            const is_using_selectors = $('#is_using_selectors').prop('checked')
            const is_using_snippets = $('#is_using_snippets').prop('checked')
            const date_updated = new Date()
            const updated_by = user
            const data = {
                id, section_filter, article_filter, selectors, code_snippet, request_source, is_using_selectors, is_using_snippets, date_updated, updated_by
            }
            console.log(data)
            if(is_using_selectors || is_using_snippets){
                $.ajax({
                    url: '/mmi-admin-dashboard/websites/update/'+id,
                    method: 'POST',
                    'contentType': 'application/json',
                    data: JSON.stringify(data),
                    dataType: 'json',
                    beforeSend: function(xhr){
                        $('.overlay').css({
                            'display': 'flex'
                        })
                    }
                }).done(function(response){
                    if(response.hasOwnProperty('data')){
                        $(document).Toasts('create', {
                            class: 'bg-success', 
                            delay: 3000,
                            autohide: true,
                            title: 'Success.',
                            // subtitle: 'Subtitle',
                            body: response.data.website_name+' has been successfully updated.'
                        })
                        // $('form#form-website')[0].reset()
                        setTimeout(() => {
                            location.href = '/mmi-admin-dashboard/websites/view/'+id
                        }, 2500);
                        
                    }
                    if(response.hasOwnProperty('error')){
                        $(document).Toasts('create', {
                            class: 'bg-warning', 
                            delay: 3000,
                            autohide: true,
                            title: 'Warning!',
                            // subtitle: 'Subtitle',
                            body: response.error.errmsg
                        })
                    }
                    $('.overlay').css({
                        'display': 'none'
                    })
                }).fail(function(error){
                    if(error.hasOwnProperty('error')){
                        $(document).Toasts('create', {
                            class: 'bg-danger', 
                            delay: 3000,
                            autohide: true,
                            title: 'Oops!',
                            // subtitle: 'Subtitle',
                            body: error.error.errmsg
                        })
                    }else{
                        // $('span#response-status').text(error.statusText)
                        $(document).Toasts('create', {
                            class: 'bg-danger', 
                            delay: 3000,
                            autohide: true,
                            title: 'Oops!',
                            // subtitle: 'Subtitle',
                            body: error.responseText
                        })
                    }
                    $('.overlay').css({
                        'display': 'none'
                    })
                })
            }else{
                $(document).Toasts('create', {
                    class: 'bg-warning', 
                    delay: 5000,
                    autohide: true,
                    title: 'Warning!',
                    // subtitle: 'Subtitle',
                    body: 'Choose what kind of scraping configuration you are going to use.'
                  })
            }
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

    // Not using this function anymore
    $(document).on('click', '#btnSaveArticles', function(){
        const article_array = []
        $('dl').eq(1).children('dd').each(function(i, e){
            article_array.push({idx:i, href:$(e).text()})
        })
        console.log(article_array)
        const requestFunct = async (data) => {
            let dataObj = {
                article_url: data.href,
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
                dataType: 'json',
                beforeSend: function(xhr){
                    $('dl').eq(0).children('dd').eq(data.idx).html(`<a class="nav-link" href="${data.href}" target="_blank">${data.href} <i class="fas fa-spinner fa-pulse" title="Fetching..."></i></a>`)
                }
            }).done(function(response){
                console.log(response)
                if(response.hasOwnProperty('error')){
                    $('dl').eq(0).children('dd').eq(data.idx).html(`<a class="nav-link" href="${data.href}" target="_blank">${data.href} <i class="fas fa-exclamation-circle" title="${response.error}"></i></a>`)
                }else{
                    $('dl').eq(0).children('dd').eq(data.idx).html(`<a class="nav-link" href="${data.href}" target="_blank">${data.href} <i class="fas fa-check-circle" title="Just Added."></i></a>`)
                }
                
            }).fail(function(response){
                console.log(response)
                $('dl').eq(0).children('dd').eq(data.idx).html(`<a class="nav-link" href="${data.href}" target="_blank">${data.href} <i class="fas fa-times-circle"></i></a>`)
            })
            
        }

        const storeArticle = async () => {
            await Promise.all(article_array.map(async (v) => await requestFunct(v)))
        }

        storeArticle()

    })

    $(document).on('click', '#btnSaveSections', function(){
        try {
            const section_array =  $('dl').eq(0).children('dd').map(function(){
                return $(this).text()
            }).get()
            const main_sections = Array.from(new Set(sections.concat(section_array)))
            const data = {
                main_sections
            }
            $.ajax({
                url: '/mmi-admin-dashboard/websites/update/'+id,
                method: 'POST',
                'contentType': 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                beforeSend: function(xhr){
                    $('.overlay').css({
                        'display': 'flex'
                    })
                }
            }).done(function(response){
                if(response.hasOwnProperty('data')){
                    $(document).Toasts('create', {
                        class: 'bg-success', 
                        delay: 3000,
                        autohide: true,
                        title: 'Success.',
                        // subtitle: 'Subtitle',
                        body: response.data.website_name+' has been successfully updated.'
                      })
                    // $('form#form-website')[0].reset()
                    // setTimeout(() => {
                    //     location.href = '/mmi-admin-dashboard/websites/view/'+id
                    // }, 2500);
                    
                }
                if(response.hasOwnProperty('error')){
                    $(document).Toasts('create', {
                        class: 'bg-warning', 
                        delay: 3000,
                        autohide: true,
                        title: 'Warning!',
                        // subtitle: 'Subtitle',
                        body: response.error.errmsg
                      })
                }
                $('.overlay').css({
                    'display': 'none'
                })
            }).fail(function(error){
                if(error.hasOwnProperty('error')){
                    $(document).Toasts('create', {
                        class: 'bg-danger', 
                        delay: 3000,
                        autohide: true,
                        title: 'Oops!',
                        // subtitle: 'Subtitle',
                        body: error.error.errmsg
                      })
                }else{
                    // $('span#response-status').text(error.statusText)
                    $(document).Toasts('create', {
                        class: 'bg-danger', 
                        delay: 3000,
                        autohide: true,
                        title: 'Oops!',
                        // subtitle: 'Subtitle',
                        body: error.responseText
                      })
                }
                $('.overlay').css({
                    'display': 'none'
                })
            })
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
}