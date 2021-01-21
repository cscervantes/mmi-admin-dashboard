console.log('Loading...')

$(document).ready(function(){
    $('table#website-datatable thead:last-child th').each( function () {
        var title = $(this).text();
        var tagName = title.toLowerCase().split(' ')[0]
        if(tagName === 'global' || tagName === 'local'){
            $(this).html( `
            <div class="input-group">
                    <input class="form-control" type="number" name="${tagName}" placeholder="Search ${title}" />
                    <div class="input-group-append">
                        <select name="validate" class="form-control">
                            <option value="$eq">=</option>
                            <option value="$gt">></option>
                            <option value="$lt"><</option>
                            <option value="$gte">>=</option>
                            <option value="$lte"><=</option>
                            <option value="$ne">!=</option>
                        </select>
                    </div>
            </div>
            ` );
        }else{
            $(this).html( '<input class="form-control" type="text" name="'+tagName+'" placeholder="Search '+title+'" />' );
        }
    });

    var draw = new dataDraw('table#website-datatable',
    {
        "responsive": true,
        "autoWidth": false,
        "processing": true,
        "serverSide": true,
        "deferRender": true,
        "searchDelay": 500,
        "searching": false,
        "ajax": {
            "url": "/mmi-admin-dashboard/websites/raw-website-datatables",
            "type": "POST",
        },
        "columns": [
            { "data": "name" },
            { "data": "fqdn" },
            { "data": "country" },
            { "data": "alexa_rankings.global" },
            { "data": "alexa_rankings.local" }
        ],
        columnDefs:[
            {
                targets:0, render:function(data, type, row){
                    return `<a class="nav-link" href="${row.url}" data-toggle="tooltip" title="Go to ${data}" target="_blank">${data}</a>`
                }
            }
        ],
        "order": [[ 0, "desc" ]]
    })

    draw.create()

    $(document).on('change', 'input,select', function(){
        let fields = $('input').map(function(i,e){
            let obj = {}
            
            let inputName = $(e).attr('name')

            obj[inputName] = $(e).val()
            
            if(inputName === 'global'){
                let $eq = $(e).siblings('div').children('select').val()
                let $va = $(e).val()
                obj[inputName] = ($va) ? $va+':'+$eq : ''
            }
            if(inputName === 'local'){
                let $eq = $(e).siblings('div').children('select').val()
                let $va = $(e).val()
                obj[inputName] = ($va) ? $va+':'+$eq : ''
            }
            return obj
        }).get()

        // delete fields[0]

        fields = fields.reduce(function(a, b){
            return Object.assign(a, b)
        }, {})
        
        $.each(fields, function(key, value){
            if (value === "" || value === null){
                delete fields[key];
            }
        });

        draw.update({
            "responsive": true,
            "autoWidth": false,
            "processing": true,
            "serverSide": true,
            "deferRender": true,
            "searching": false,
            "searchDelay": 500,
            "ajax": {
                "url": "/mmi-admin-dashboard/websites/raw-website-datatables",
                "type": "POST",
                "data": fields
            },
            "columns": [
                { "data": "name" },
                { "data": "fqdn" },
                { "data": "country" },
                { "data": "alexa_rankings.global" },
                { "data": "alexa_rankings.local" }
            ],
            columnDefs:[
                {
                    targets:0, render:function(data, type, row){
                        return `<a class="nav-link" href="${row.url}" data-toggle="tooltip" title="Go to ${data}" target="_blank">${data}</a>`
                    }
                }
            ],
            "order": [[ 0, "desc" ]]
        })
    })

})



class dataDraw{

    constructor(element, options){
        this.options = options
        this.$element = $(element)
    }

    create(){
        this.$element.DataTable(this.options)
    }

    update(options){
        this.$element.DataTable().destroy()
        this.$element.DataTable(options).draw()
    }

}

async function download(){
    let filename = prompt('Enter file name', 'Document')

    let fields = $('input').map(function(i,e){
        let obj = {}
        
        let inputName = $(e).attr('name')

        obj[inputName] = $(e).val()
        
        if(inputName === 'global'){
            let $eq = $(e).siblings('div').children('select').val()
            let $va = $(e).val()
            obj[inputName] = ($va) ? $va+':'+$eq : ''
        }
        if(inputName === 'local'){
            let $eq = $(e).siblings('div').children('select').val()
            let $va = $(e).val()
            obj[inputName] = ($va) ? $va+':'+$eq : ''
        }
        return obj
    }).get()

    delete fields[0]

    fields = fields.reduce(function(a, b){
        return Object.assign(a, b)
    }, {})
    
    $.each(fields, function(key, value){
        if (value === "" || value === null){
            delete fields[key];
        }
    });

    let query = JSON.stringify(fields)
    // await rq(`/mmi-admin-dashboard/websites/raw-website-lists?query=${query}&filename=${filename}`, 'GET')
    return location.href = `/mmi-admin-dashboard/websites/raw-website-lists?query=${query}&filename=${filename}`
}