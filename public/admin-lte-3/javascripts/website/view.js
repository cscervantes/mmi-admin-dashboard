let editor = ace.edit("filter-div")
editor.setTheme("ace/theme/monokai")
editor.session.setMode("ace/mode/json")
editor.setFontSize(16)
editor.setOptions({
    maxLines: 30,
    autoScrollEditorIntoView: true,
});

let editor2 = ace.edit("filter-div2")
editor2.setTheme("ace/theme/monokai")
editor2.session.setMode("ace/mode/json")
editor2.setFontSize(16)
editor2.setOptions({
    maxLines: 30,
    autoScrollEditorIntoView: true,
});

let editor3 = ace.edit("scraper-div")
editor3.setTheme("ace/theme/monokai")
editor3.session.setMode("ace/mode/javascript")
editor3.setFontSize(16)
editor3.setOptions({
    maxLines: 30,
    autoScrollEditorIntoView: true,
});

const overlay = $('.overlay').eq(0)

$(document).on('click', 'button#btnBrowseSection', function(){
    try {
        const section_filters = JSON.parse(editor2.getValue())
        const article_filters = JSON.parse(editor.getValue())
        const url = new URL($('#section_url').val()).href
        const request_source = $("#request_source").val()
        const data = {
            id, url, website_url, request_source, needs_https, needs_endslash, section_filters, article_filters
        }
        console.log(data)
        $.ajax({
            url: '/mmi-admin-dashboard/advance/test_filters',
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: function(xhr){
                $('#result-card').html('')
                overlay.css({
                    'display': 'flex'
                })
            }
        }).done(function(response){
            let articleWrapper = '<dl><dt>Article Links <button type="button" id="btnSaveArticles" class="btn btn-info btn-sm">Save Articles</button></dt>'
            articleWrapper += response.articles.map(v=>{
                return `<dd><a class="nav-link" href="${v}" target="_blank">${v}</a>`
            }).join('</dd>')+'</dl>'

            let sectionWrapper = '<dl><dt>Section Links <button type="button" id="btnSaveSections" class="btn btn-info btn-sm">Save Sections</button></dt>'
            sectionWrapper += response.sections.map(v=>{
                return `<dd><a class="nav-link" href="${v}" target="_blank">${v}</a>`
            }).join('</dd>')+'</dl>'

            $('#result-card').html(
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
