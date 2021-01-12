console.log('Loading website dashboard script.')

$('table#website-datatable').DataTable({
    "responsive": true,
    "autoWidth": false,
    "processing": true,
    "serverSide": true,
    "deferRender": true,
    "searchDelay": 1000,
    "ajax": {
        "url": "/mmi-admin-dashboard/websites/website-article-lists",
        "type": "POST"
    },
    "columns": [
        { "data": "pub_name" },
        { "data": "country" },
        { "data": "global_rank" },
        { "data": "local_rank" },
        { "data": "article_hits" }
    ],
    "order": [[ 4, "desc" ]]
})