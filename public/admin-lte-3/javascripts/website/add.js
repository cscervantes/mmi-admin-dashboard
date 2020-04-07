$(document).on('click', 'button#btnAdd', function(){
    const form = document.querySelector('form#form-website')
    const formData = new FormData(form)
    let formObj = formObject(formData)

    if(!formObj.website_name.trim()){
        $('#website_name').focus()
    }else if(!formObj.website_url.trim()){
        $('#website_url').focus()
    }else if(!formObj.fqdn.trim()){
        $('#fqdn').focus()
    }else{
        console.log('Good to go')
        $.ajax({
            url: '/mmi-admin-dashboard/websites/store',
            method: 'POST',
            data: formObj,
            dataType: 'json'
        }).done(function(response){
            console.log(typeof response)
            console.log(response)
            if(response.hasOwnProperty('data')){
                $('span#response-status').text(response.data.website_name+' has been successfully added.')
            }
            if(response.hasOwnProperty('error')){
                $('span#response-status').text(response.error.errmsg)
            }
        }).fail(function(error){
            if(error.hasOwnProperty('error')){
                $('span#response-status').text(error.error.errmsg)
            }else{
                $('span#response-status').text(error.statusText)
            }
        })
    }

})

$(document).on('change', 'input#website_name', function(){
    let webName = $(this).val().split(' ').filter(v=>v).map(v=>{
        if(v){
            let vName = v.replace(/[^a-zA-Z0-9]/g, "")
            return vName.trim().charAt(0).toUpperCase() + vName.trim().slice(1)  
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
            alert('Website url is not valid! Try again.')
            $(this).focus()
        }
    } catch (error) {
        alert(error)
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
            console.log(startHttps, endSlash)
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
    obj.website_cost = obj.website_cost || 0
    obj.country = obj.country || 'Philippines'
    obj.needs_https = $('input[name="needs_https"]').prop('checked')
    obj.needs_endslash = $('input[name="needs_endslash"]').prop('checked')
    obj.main_sections = Array.from(new Set(obj.main_sections.split('\n').map(v=>v.trim())))
    return obj
}