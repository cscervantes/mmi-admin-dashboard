function websiteTable(account_type){
    $(document).ready(function(){
        console.log(account_type)
        $('table#website-datatable').DataTable({
            "responsive": true,
            "autoWidth": false,
            "processing": true,
            "serverSide": true,
            "deferRender": true,
            "searchDelay": 1000,
            "ajax": {
                "url": "/mmi-admin-dashboard/websites",
                "type": "POST"
            },
            "columns": [
                { "data": "website_name" },
                { "data": "fqdn" },
                { "data": "website_category" },
                { "data": "website_type" },
                { "data": "country" },
                { "data": "status" },
                { "data": "date_created"}
            ],
            columnDefs:[
                {
                    targets:0, render:function(data, type, row){
                        if(account_type === 'dev'){
                            let cont = ''
                            cont += `<div class="form-horizontal">
                                        <div class="row">
                                            <div class="col-sm-9">`           
                            cont += `<a class="nav-link" href="/mmi-admin-dashboard/websites/view/${row._id}" data-toggle="tooltip" title="View content" target="_blank">${data}</a>`
                            cont += `       </div>
                                            <div class="col-sm-3 option-${row._id}">
                                                <div class="btn-group btn-group-sm">
                                                    <a target="_blank" href="/mmi-admin-dashboard/websites/edit/${row._id}" class="btn btn-default"><i class="fas fa-edit"></i></a>
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
                                                        <p>You are about to delete this website. Do you want to proceed?</p>
                                                        </div>
                                                        <div class="modal-footer justify-content-between">
                                                        <button type="button" class="btn btn-outline-dark" data-dismiss="modal">No</button>
                                                        <button type="button" class="btn btn-outline-dark" id="delete-web-${row._id}">Yes</button>
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
                            return `<a class="nav-link" href="/mmi-admin-dashboard/websites/view/${row._id}" data-toggle="tooltip" title="View content" target="_blank">${data}</a>`
                        }
                        
                    }
                },
                {
                    targets:1, render:function(data, type, row){
                        return `<a class="nav-link" href="${row.website_url}" data-toggle="tooltip" title="Go to ${data}" target="_blank">${data}</a>`
                    }
                },
                {
                    targets: 6, render: function(data, type, row){
                        return moment(data).subtract(8, 'hours').format('LLLL')
                    }
                }
                
            ],
            "order": [[ 6, "desc" ]]
        })
    })

    $(document).on('click', 'button[id^="delete-web-"]', function(){
       const idx = $(this).attr('id').split('-').splice(-1)[0]
       $.ajax({
           url: '/mmi-admin-dashboard/websites/delete/'+idx,
           method: 'POST'
       }).done(function(response){
            if(response.data.n > 0){
                $(document).Toasts('create', {
                    class: 'bg-info', 
                    delay: 3000,
                    autohide: true,
                    title: 'Success.',
                    // subtitle: 'Subtitle',
                    body: 'The website is deleted!'
                  })
                  setTimeout(() => {
                      location.reload()
                  }, 2500);
            }else{
                $(document).Toasts('create', {
                    class: 'bg-warning', 
                    delay: 3000,
                    autohide: true,
                    title: 'Warning.',
                    // subtitle: 'Subtitle',
                    body: 'The website has already been deleted!'
                  })
                  setTimeout(() => {
                    location.reload()
                }, 2500)
            }
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
    })
}