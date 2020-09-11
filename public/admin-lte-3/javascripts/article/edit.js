const user = userObj.acc_first_name+' '+userObj.acc_last_name

console.log(user)

$(document).on('change', 'textarea.article_compute', function(){
    try {
        const fData = new FormData(document.getElementById('article-update'))
        const images = fData.get('article_images').split('\n').map(v=>v.trim()).filter(v=>v)
        const videos = fData.get('article_videos').split('\n').map(v=>v.trim()).filter(v=>v)
        const text = fData.get('article_content')
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

$(document).on('click', 'button#btnUpdate', function(){
    try {
        const fData = new FormData(document.getElementById('article-update'))
        const article_images = fData.get('article_images').split('\n').map(v=>v.trim()).filter(v=>v)
        const article_videos = fData.get('article_videos').split('\n').map(v=>v.trim()).filter(v=>v)
        const article_authors = fData.get('article_authors').split('\n').map(v=>v.trim()).filter(v=>v)
        const article_sections = fData.get('article_sections').split('\n').map(v=>v.trim()).filter(v=>v)
        const article_title = fData.get('article_title')
        const article_url = fData.get('article_url')
        const article_content = fData.get('article_content')
        const article_ad_value = fData.get('article_ad_value')
        const article_pr_value = fData.get('article_pr_value')
        const article_publish_date = fData.get('article_publish_date')
        const article_id = fData.get('_id')

        const updated_by = user
        // const date_updated = new Date()
        
        const data = {
            article_title, article_url, article_publish_date, article_images, article_videos, article_content, 
            updated_by, article_authors, article_sections, article_pr_value, article_ad_value
        }
        // console.log(data)
        $.ajax({
            url: '/mmi-admin-dashboard/articles/update/'+article_id,
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json'
        }).done(function(response){
            // console.log('Done', response)
            if(response.hasOwnProperty('error')){
                $(document).Toasts('create', {
                    class: 'bg-danger', 
                    delay: 3000,
                    autohide: true,
                    title: 'Oops!',
                    // subtitle: 'Subtitle',
                    body: response.error
                  })
            }else{
                $(document).Toasts('create', {
                    class: 'bg-info', 
                    delay: 3000,
                    autohide: true,
                    title: 'Success!',
                    // subtitle: 'Subtitle',
                    body: 'Article has been updated.'
                  })
                  setTimeout(() => {
                     location.reload() 
                  }, 3000);
            }
        }).fail(function(response){
            // console.log('Error', response)
            $(document).Toasts('create', {
                class: 'bg-danger', 
                delay: 3000,
                autohide: true,
                title: 'Oops!',
                // subtitle: 'Subtitle',
                body: response.responseText
              })
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