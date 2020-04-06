$(document).ready(function(){
    $('table#website-datatable').DataTable({
        "responsive": true,
        "autoWidth": false,
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "/mmi-admin-dashboard/websites",
            "type": "POST"
        },
        "columns": [
            { "data": "website_name" },
            { "data": "fqdn" },
            { "data": "website_category" },
            { "data": "website_type" },
            { "data": "country_code" },
            { "data": "status" },
            { "data": "date_created" },
        ],
        "order": [[ 6, "desc" ]]
    })
})