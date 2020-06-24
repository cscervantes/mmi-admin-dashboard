$(document).ready(function(){
    console.log(account_type, moment().format('LLLL'))
    $('table#article-datatable').DataTable({
        "responsive": true,
        "autoWidth": false,
        "processing": true,
        "serverSide": true,
        "deferRender": true,
        "searchDelay": 1000,
        "ajax": {
            "url": "/mmi-admin-dashboard/articles",
            "type": "POST"
        },
        "columns": [
            { "data": "article_title" },
            { "data": "article_url" },
            { "data": "article_status" },
            { "data": "article_publish_date" },
            { "data": "article_ad_value" },
            { "data": "article_pr_value" },
            { "data": "is_in_mysql" },
            { "data": "date_created" }
        ],
        "columnDefs": [
            {"orderable": false, targets: [3,4,5,6,7]},
            {
                targets: 0, render: function(data, type, row){
                    if(account_type === 'dev'){
                        let cont = ''
                        cont += `<div class="form-horizontal">
                                    <div class="row">
                                        <div class="col-sm-9">`           
                        cont += `<a class="nav-link" href="/mmi-admin-dashboard/articles/view/${row._id}" data-toggle="tooltip" title="View content" target="_blank">${data}</a>`
                        cont += `       </div>
                                        <div class="col-sm-3 option-${row._id}">
                                            <div class="btn-group btn-group-sm">
                                                <a target="_blank" href="/mmi-admin-dashboard/articles/edit/${row._id}" class="btn btn-default"><i class="fas fa-edit"></i></a>
                                                <a class="btn btn-default" data-toggle="modal" data-target="#modal-warning-${row._id}"><i class="fas fa-trash"></i></a>
                                            </div>
                                            <div class="modal fade" id="modal-warning-${row._id}">
                                                <div class="modal-dialog">
                                                <div class="modal-content bg-warning">
                                                    <div class="modal-header">
                                                    <h4 class="modal-title">Warning!</h4>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span></button>
                                                    </div>
                                                    <div class="modal-body">
                                                    <p>You are about to delete this article. Do you want to proceed?</p>
                                                    </div>
                                                    <div class="modal-footer justify-content-between">
                                                    <button type="button" class="btn btn-outline-dark" data-dismiss="modal">No</button>
                                                    <button type="button" class="btn btn-outline-dark" id="delete-article-${row._id}">Yes</button>
                                                    </div>
                                                </div>
                                                <!-- /.modal-content -->
                                                </div>
                                                <!-- /.modal-dialog -->
                                            </div>
                                            <!-- /.modal -->
                                        </div>
                                    </div>
                                </div>
                                `
                        return cont
                    }else{
                        return `<a class="nav-link" href="/mmi-admin-dashboard/articles/view/${row._id}" data-toggle="tooltip" title="View content" target="_blank">${data}</a>`
                    }
                }
            },
            {
                targets: [3, 7], render: function(data, type, row){
                    return moment(data).utcOffset(8).format('LLLL')
                }
            }
        ],
        "order": [[2, "desc"]]
    })
})

$(document).on('click', 'button[id^=delete-article-]', function(){
    const id = $(this).attr('id').split('-').splice(-1)[0]
    $.ajax({
        url: '/mmi-admin-dashboard/articles/delete/'+id,
        method: 'POST'
    }).done(function(response){
         $(document).Toasts('create', {
            class: 'bg-success', 
            delay: 3000,
            autohide: true,
            title: 'Success.',
            body: 'Article has been removed!'
        })
        setTimeout(() => {
            location.href = '/mmi-admin-dashboard/articles' 
        }, 250)
    }).fail(function(response){
         $(document).Toasts('create', {
            class: 'bg-danger', 
            delay: 3000,
            autohide: true,
            title: 'Oops.',
            body: response.responseText
        })
    })
})