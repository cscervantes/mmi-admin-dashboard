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
                    return `<a class="nav-link" href="/mmi-admin-dashboard/articles/view/${row._id}">${data}</a>`
                }
            }
        ],
        "order": [[2, "desc"]]
    })
})