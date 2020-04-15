$(document).on('click', 'button#btnAdd', function(){
    const form = document.querySelector('form#form-website')
    const formData = new FormData(form)
    let formObj = formObject(formData)

    if(!formObj.website_name.trim()){
        $(document).Toasts('create', {
            class: 'bg-warning', 
            delay: 3000,
            autohide: true,
            title: 'Warning!',
            // subtitle: 'Subtitle',
            body: 'Website name is required.'
          })
        $('#website_name').focus()
    }else if(!formObj.website_url.trim()){
        $(document).Toasts('create', {
            class: 'bg-warning', 
            delay: 3000,
            autohide: true,
            title: 'Warning!',
            // subtitle: 'Subtitle',
            body: 'Website url is required.'
          })
        $('#website_url').focus()
    }else if(!formObj.fqdn.trim()){
        $(document).Toasts('create', {
            class: 'bg-warning', 
            delay: 3000,
            autohide: true,
            title: 'Warning!',
            // subtitle: 'Subtitle',
            body: 'FQDN is required.'
          })
        $('#fqdn').focus()
    }else{
        $.ajax({
            url: '/mmi-admin-dashboard/websites/store',
            method: 'POST',
            'contentType': 'application/json',
            data: JSON.stringify(formObj),
            dataType: 'json'
        }).done(function(response){
            if(response.hasOwnProperty('data')){
                $(document).Toasts('create', {
                    class: 'bg-success', 
                    delay: 3000,
                    autohide: true,
                    title: 'Success.',
                    // subtitle: 'Subtitle',
                    body: response.data.website_name+' has been successfully added.'
                  })
                $('form#form-website')[0].reset()
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
        })
    }

})

$(document).on('change', 'input#website_name', function(){
    let webName = $(this).val().split(' ').filter(v=>v).map(v=>{
        if(v){
            let vName = v.replace(/[^a-zA-Z0-9]/g, "")
            return vName.trim().charAt(0).toUpperCase() + vName.trim().slice(1).toLowerCase()  
        }
    }).join(' ')
    $(this).val(webName)
})

$(document).on('change', 'input#website_url', function(){
    try {
        const thisHref = new URL($(this).val())
        const validate =  (thisHref.href) ? true : false;
        if(validate){
            let vUrl = thisHref.href
            const startHttps = $('#needs_https').prop('checked')
            const endSlash = $('#needs_endslash').prop('checked')
            vUrl = (startHttps) ? vUrl.replace(/^(http\:)/g, 'https:') : vUrl.replace(/^(https\:)/g, 'http:')
            vUrl = (endSlash) ? (vUrl.substr(-1) != '/') ? vUrl+'/' : vUrl : vUrl.replace(/\/$/g, '')

            const newUrl = new URL(vUrl)
            const webUrl = newUrl.protocol+'//'+newUrl.hostname
            $(this).val(webUrl)
            $('input#fqdn').val(newUrl.hostname)

            let sections = $('#main_sections').val().split('\n')
            sections.push(webUrl)

            $('#main_sections').val(Array.from(new Set(sections)).join('\n').trim())
        }else{
            // alert('Website url is not valid! Try again.')
            $(document).Toasts('create', {
                class: 'bg-warning', 
                delay: 3000,
                autohide: true,
                title: 'Warning.',
                // subtitle: 'Subtitle',
                body: 'Website url is not valid! Try again.'
              })
            $(this).focus()
        }
    } catch (error) {
        $(document).Toasts('create', {
            class: 'bg-warning', 
            delay: 3000,
            autohide: true,
            title: 'Warning.',
            // subtitle: 'Subtitle',
            body: error
          })
        $(this).focus()
    }
    
})

$(document).on('change', 'textarea#main_sections', function(){
    let hrefs = $(this).val().split('\n')
    if(hrefs.length > 0){
        let newHrefs = hrefs.map(v=>{
            let vUrl = v
            const startHttps = $('#needs_https').prop('checked')
            const endSlash = $('#needs_endslash').prop('checked')
            vUrl = (startHttps) ? vUrl.replace(/^(http\:)/g, 'https:') : vUrl.replace(/^(https\:)/g, 'http:')
            vUrl = (endSlash) ? (vUrl.substr(-1) != '/') ? vUrl+'/' : vUrl : vUrl.replace(/\/$/g, '')
            return vUrl
        })
        $(this).val(Array.from(new Set(newHrefs)).join('\n'))
    }else{
        $(this).val($('#website_url').val())
    }
})

$(document).on('change', 'input[name="needs_https"]', function(){
    const isChecked = $(this).prop('checked')
    const webUrl = $('#website_url').val()
    const websiteUrl = (isChecked) ? webUrl.replace(/^(http\:)/g, 'https:') : webUrl.replace(/^(https\:)/g, 'http:')
    const sections = $('#main_sections').val().split('\n').map(v=>v.trim())
    const sectionUrl = sections.map(v=>{
        let newV = (isChecked) ? v.replace(/^(http\:)/g, 'https:') : v.replace(/^(https\:)/g, 'http:')
        return newV
    })
    $('#website_url').val(websiteUrl)
    $('#main_sections').val(Array.from(new Set(sectionUrl)).join('\n'))
})

$(document).on('change', 'input[name="needs_endslash"]', function(){
    const isChecked = $(this).prop('checked')
    const webUrl = $('#website_url').val()
    const websiteUrl = (isChecked) ? (webUrl.substr(-1) != '/') ? webUrl+'/' : webUrl : webUrl.replace(/\/$/g, '')
    const sections = $('#main_sections').val().split('\n').map(v=>v.trim())
    const sectionUrl = sections.map(v=>{
        let newV = (isChecked) ? (v.substr(-1) != '/') ? v+'/' : v : v.replace(/\/$/g, '')
        return newV
    })
    $('#website_url').val(websiteUrl)
    $('#main_sections').val(Array.from(new Set(sectionUrl)).join('\n'))
})

function formObject(formData){
    let obj = {}
    for(let f of formData.entries()){
        obj[f[0]] = f[1]
    }
    obj.alexa_rankings = {
        global: obj.global || 0,
        local: obj.local || 0
    }
    obj.website_cost = obj.website_cost || 300
    obj.country = obj.country || 'Philippines'
    obj.country_code = obj.country_code || 'PHL'
    obj.website_language = obj.website_language || 'English'
    obj.needs_https = $('input[name="needs_https"]').prop('checked')
    obj.needs_endslash = $('input[name="needs_endslash"]').prop('checked')
    obj.main_sections = Array.from(new Set(obj.main_sections.split('\n').map(v=>v.trim()))).filter(v=>v)
    obj.date_created = new Date()
    obj.created_by = user
    obj.updated_by = user
    return obj
}