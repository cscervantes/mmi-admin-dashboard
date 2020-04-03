const form = document.querySelector('#loginForm')
const response_html = document.querySelector('.social-auth-links.text-center.mb-3')

$(document).on('click', '#btnSignIn', function(e){
    e.preventDefault()
    e.stopImmediatePropagation()
    const fData = form
    const formData = new FormData(fData)
    const body = {
        username: formData.get('username'),
        password: formData.get('password')
    }
    if(formData.get('username') && formData.get('password')){
        response_html.innerHTML = ''
        $.ajax({
            url: '/mmi-admin-dashboard/users/login',
            method: 'POST',
            data: JSON.stringify(body),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        }).done(function(response){
            response_html.innerHTML = response.message
            location.href = '/mmi-admin-dashboard/dashboard'
        }).fail(function(error){
            response_html.innerHTML = error.responseJSON.message
        })
    }else{
        response_html.innerHTML = 'Both fields are required'
    }
})