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
            "url": "/mmi-admin-dashboard/artems/client-datatables",
            "type": "POST"
        },
        "columns": [
            { "data": "google_title" },
            { "data": "status" },
            { "data": "google_website_name" },
            { "data": "google_date" },
            { "data": "google_keyword" },
            { "data": "date_created" }
        ],
        "columnDefs": [
            {"orderable": false, targets: [2]},
            {
                targets: 0, render: function(data, type, row){
                    if(account_type === 'dev'){
                        let cont = ''
                        cont += `<div class="form-horizontal">
                                    <div class="row">
                                        <div class="col-sm-9">`           
                        cont += `<a class="nav-link" href="${row.google_link}" data-toggle="tooltip" title="View content" target="_blank">${data}</a>`
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
                        return `<a class="nav-link" href="${row.google_link}" data-toggle="tooltip" title="View content" target="_blank">${data}</a>`
                    }
                }
            },
            {
                targets: [3, 5], render: function(data, type, row){
                    return moment(data).subtract(8, 'hours').format('LLLL')
                }
            }
        ],
        "order": [[3, "desc"]]
    })
})