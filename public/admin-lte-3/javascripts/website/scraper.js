console.log('Loading...', user)
const countries = [
  {
    "label": "Afghanistan",
    "value": "AFG"
  },
  {
    "label": "Albania",
    "value": "ALB"
  },
  {
    "label": "Algeria",
    "value": "DZA"
  },
  {
    "label": "American Samoa",
    "value": "ASM"
  },
  {
    "label": "Andorra",
    "value": "AND"
  },
  {
    "label": "Angola",
    "value": "AGO"
  },
  {
    "label": "Anguilla",
    "value": "AIA"
  },
  {
    "label": "Antarctica",
    "value": "ATA"
  },
  {
    "label": "Antigua and Barbuda",
    "value": "ATG"
  },
  {
    "label": "Argentina",
    "value": "ARG"
  },
  {
    "label": "Armenia",
    "value": "ARM"
  },
  {
    "label": "Aruba",
    "value": "ABW"
  },
  {
    "label": "Australia",
    "value": "AUS"
  },
  {
    "label": "Austria",
    "value": "AUT"
  },
  {
    "label": "Azerbaijan",
    "value": "AZE"
  },
  {
    "label": "Bahamas",
    "value": "BHS"
  },
  {
    "label": "Bahrain",
    "value": "BHR"
  },
  {
    "label": "Bangladesh",
    "value": "BGD"
  },
  {
    "label": "Barbados",
    "value": "BRB"
  },
  {
    "label": "Belarus",
    "value": "BLR"
  },
  {
    "label": "Belgium",
    "value": "BEL"
  },
  {
    "label": "Belize",
    "value": "BLZ"
  },
  {
    "label": "Benin",
    "value": "BEN"
  },
  {
    "label": "Bermuda",
    "value": "BMU"
  },
  {
    "label": "Bhutan",
    "value": "BTN"
  },
  {
    "label": "Bolivia",
    "value": "BOL"
  },
  {
    "label": "Bosnia and Herzegovina",
    "value": "BIH"
  },
  {
    "label": "Botswana",
    "value": "BWA"
  },
  {
    "label": "Brazil",
    "value": "BRA"
  },
  {
    "label": "British Indian Ocean Territory",
    "value": "IOT"
  },
  {
    "label": "British Virgin Islands",
    "value": "VGB"
  },
  {
    "label": "Brunei",
    "value": "BRN"
  },
  {
    "label": "Bulgaria",
    "value": "BGR"
  },
  {
    "label": "Burkina Faso",
    "value": "BFA"
  },
  {
    "label": "Burundi",
    "value": "BDI"
  },
  {
    "label": "Cambodia",
    "value": "KHM"
  },
  {
    "label": "Cameroon",
    "value": "CMR"
  },
  {
    "label": "Canada",
    "value": "CAN"
  },
  {
    "label": "Cape Verde",
    "value": "CPV"
  },
  {
    "label": "Cayman Islands",
    "value": "CYM"
  },
  {
    "label": "Central African Republic",
    "value": "CAF"
  },
  {
    "label": "Chad",
    "value": "TCD"
  },
  {
    "label": "Chile",
    "value": "CHL"
  },
  {
    "label": "China",
    "value": "CHN"
  },
  {
    "label": "Christmas Island",
    "value": "CXR"
  },
  {
    "label": "Cocos Islands",
    "value": "CCK"
  },
  {
    "label": "Colombia",
    "value": "COL"
  },
  {
    "label": "Comoros",
    "value": "COM"
  },
  {
    "label": "Cook Islands",
    "value": "COK"
  },
  {
    "label": "Costa Rica",
    "value": "CRI"
  },
  {
    "label": "Croatia",
    "value": "HRV"
  },
  {
    "label": "Cuba",
    "value": "CUB"
  },
  {
    "label": "Curacao",
    "value": "CUW"
  },
  {
    "label": "Cyprus",
    "value": "CYP"
  },
  {
    "label": "Czech Republic",
    "value": "CZE"
  },
  {
    "label": "Democratic Republic of the Congo",
    "value": "COD"
  },
  {
    "label": "Denmark",
    "value": "DNK"
  },
  {
    "label": "Djibouti",
    "value": "DJI"
  },
  {
    "label": "Dominica",
    "value": "DMA"
  },
  {
    "label": "Dominican Republic",
    "value": "DOM"
  },
  {
    "label": "East Timor",
    "value": "TLS"
  },
  {
    "label": "Ecuador",
    "value": "ECU"
  },
  {
    "label": "Egypt",
    "value": "EGY"
  },
  {
    "label": "El Salvador",
    "value": "SLV"
  },
  {
    "label": "Equatorial Guinea",
    "value": "GNQ"
  },
  {
    "label": "Eritrea",
    "value": "ERI"
  },
  {
    "label": "Estonia",
    "value": "EST"
  },
  {
    "label": "Ethiopia",
    "value": "ETH"
  },
  {
    "label": "Falkland Islands",
    "value": "FLK"
  },
  {
    "label": "Faroe Islands",
    "value": "FRO"
  },
  {
    "label": "Fiji",
    "value": "FJI"
  },
  {
    "label": "Finland",
    "value": "FIN"
  },
  {
    "label": "France",
    "value": "FRA"
  },
  {
    "label": "French Polynesia",
    "value": "PYF"
  },
  {
    "label": "Gabon",
    "value": "GAB"
  },
  {
    "label": "Gambia",
    "value": "GMB"
  },
  {
    "label": "Georgia",
    "value": "GEO"
  },
  {
    "label": "Germany",
    "value": "DEU"
  },
  {
    "label": "Ghana",
    "value": "GHA"
  },
  {
    "label": "Gibraltar",
    "value": "GIB"
  },
  {
    "label": "Greece",
    "value": "GRC"
  },
  {
    "label": "Greenland",
    "value": "GRL"
  },
  {
    "label": "Grenada",
    "value": "GRD"
  },
  {
    "label": "Guam",
    "value": "GUM"
  },
  {
    "label": "Guatemala",
    "value": "GTM"
  },
  {
    "label": "Guernsey",
    "value": "GGY"
  },
  {
    "label": "Guinea",
    "value": "GIN"
  },
  {
    "label": "Guinea-Bissau",
    "value": "GNB"
  },
  {
    "label": "Guyana",
    "value": "GUY"
  },
  {
    "label": "Haiti",
    "value": "HTI"
  },
  {
    "label": "Honduras",
    "value": "HND"
  },
  {
    "label": "Hong Kong",
    "value": "HKG"
  },
  {
    "label": "Hungary",
    "value": "HUN"
  },
  {
    "label": "Iceland",
    "value": "ISL"
  },
  {
    "label": "India",
    "value": "IND"
  },
  {
    "label": "Indonesia",
    "value": "IDN"
  },
  {
    "label": "Iran",
    "value": "IRN"
  },
  {
    "label": "Iraq",
    "value": "IRQ"
  },
  {
    "label": "Ireland",
    "value": "IRL"
  },
  {
    "label": "Isle of Man",
    "value": "IMN"
  },
  {
    "label": "Israel",
    "value": "ISR"
  },
  {
    "label": "Italy",
    "value": "ITA"
  },
  {
    "label": "Ivory Coast",
    "value": "CIV"
  },
  {
    "label": "Jamaica",
    "value": "JAM"
  },
  {
    "label": "Japan",
    "value": "JPN"
  },
  {
    "label": "Jersey",
    "value": "JEY"
  },
  {
    "label": "Jordan",
    "value": "JOR"
  },
  {
    "label": "Kazakhstan",
    "value": "KAZ"
  },
  {
    "label": "Kenya",
    "value": "KEN"
  },
  {
    "label": "Kiribati",
    "value": "KIR"
  },
  {
    "label": "Kosovo",
    "value": "XKX"
  },
  {
    "label": "Kuwait",
    "value": "KWT"
  },
  {
    "label": "Kyrgyzstan",
    "value": "KGZ"
  },
  {
    "label": "Laos",
    "value": "LAO"
  },
  {
    "label": "Latvia",
    "value": "LVA"
  },
  {
    "label": "Lebanon",
    "value": "LBN"
  },
  {
    "label": "Lesotho",
    "value": "LSO"
  },
  {
    "label": "Liberia",
    "value": "LBR"
  },
  {
    "label": "Libya",
    "value": "LBY"
  },
  {
    "label": "Liechtenstein",
    "value": "LIE"
  },
  {
    "label": "Lithuania",
    "value": "LTU"
  },
  {
    "label": "Luxembourg",
    "value": "LUX"
  },
  {
    "label": "Macau",
    "value": "MAC"
  },
  {
    "label": "Macedonia",
    "value": "MKD"
  },
  {
    "label": "Madagascar",
    "value": "MDG"
  },
  {
    "label": "Malawi",
    "value": "MWI"
  },
  {
    "label": "Malaysia",
    "value": "MYS"
  },
  {
    "label": "Maldives",
    "value": "MDV"
  },
  {
    "label": "Mali",
    "value": "MLI"
  },
  {
    "label": "Malta",
    "value": "MLT"
  },
  {
    "label": "Marshall Islands",
    "value": "MHL"
  },
  {
    "label": "Mauritania",
    "value": "MRT"
  },
  {
    "label": "Mauritius",
    "value": "MUS"
  },
  {
    "label": "Mayotte",
    "value": "MYT"
  },
  {
    "label": "Mexico",
    "value": "MEX"
  },
  {
    "label": "Micronesia",
    "value": "FSM"
  },
  {
    "label": "Moldova",
    "value": "MDA"
  },
  {
    "label": "Monaco",
    "value": "MCO"
  },
  {
    "label": "Mongolia",
    "value": "MNG"
  },
  {
    "label": "Montenegro",
    "value": "MNE"
  },
  {
    "label": "Montserrat",
    "value": "MSR"
  },
  {
    "label": "Morocco",
    "value": "MAR"
  },
  {
    "label": "Mozambique",
    "value": "MOZ"
  },
  {
    "label": "Myanmar",
    "value": "MMR"
  },
  {
    "label": "Namibia",
    "value": "NAM"
  },
  {
    "label": "Nauru",
    "value": "NRU"
  },
  {
    "label": "Nepal",
    "value": "NPL"
  },
  {
    "label": "Netherlands",
    "value": "NLD"
  },
  {
    "label": "Netherlands Antilles",
    "value": "ANT"
  },
  {
    "label": "New Caledonia",
    "value": "NCL"
  },
  {
    "label": "New Zealand",
    "value": "NZL"
  },
  {
    "label": "Nicaragua",
    "value": "NIC"
  },
  {
    "label": "Niger",
    "value": "NER"
  },
  {
    "label": "Nigeria",
    "value": "NGA"
  },
  {
    "label": "Niue",
    "value": "NIU"
  },
  {
    "label": "North Korea",
    "value": "PRK"
  },
  {
    "label": "Northern Mariana Islands",
    "value": "MNP"
  },
  {
    "label": "Norway",
    "value": "NOR"
  },
  {
    "label": "Oman",
    "value": "OMN"
  },
  {
    "label": "Pakistan",
    "value": "PAK"
  },
  {
    "label": "Palau",
    "value": "PLW"
  },
  {
    "label": "Palestine",
    "value": "PSE"
  },
  {
    "label": "Panama",
    "value": "PAN"
  },
  {
    "label": "Papua New Guinea",
    "value": "PNG"
  },
  {
    "label": "Paraguay",
    "value": "PRY"
  },
  {
    "label": "Peru",
    "value": "PER"
  },
  {
    "label": "Philippines",
    "value": "PHL"
  },
  {
    "label": "Pitcairn",
    "value": "PCN"
  },
  {
    "label": "Poland",
    "value": "POL"
  },
  {
    "label": "Portugal",
    "value": "PRT"
  },
  {
    "label": "Puerto Rico",
    "value": "PRI"
  },
  {
    "label": "Qatar",
    "value": "QAT"
  },
  {
    "label": "Republic of the Congo",
    "value": "COG"
  },
  {
    "label": "Reunion",
    "value": "REU"
  },
  {
    "label": "Romania",
    "value": "ROU"
  },
  {
    "label": "Russia",
    "value": "RUS"
  },
  {
    "label": "Rwanda",
    "value": "RWA"
  },
  {
    "label": "Saint Barthelemy",
    "value": "BLM"
  },
  {
    "label": "Saint Helena",
    "value": "SHN"
  },
  {
    "label": "Saint Kitts and Nevis",
    "value": "KNA"
  },
  {
    "label": "Saint Lucia",
    "value": "LCA"
  },
  {
    "label": "Saint Martin",
    "value": "MAF"
  },
  {
    "label": "Saint Pierre and Miquelon",
    "value": "SPM"
  },
  {
    "label": "Saint Vincent and the Grenadines",
    "value": "VCT"
  },
  {
    "label": "Samoa",
    "value": "WSM"
  },
  {
    "label": "San Marino",
    "value": "SMR"
  },
  {
    "label": "Sao Tome and Principe",
    "value": "STP"
  },
  {
    "label": "Saudi Arabia",
    "value": "SAU"
  },
  {
    "label": "Senegal",
    "value": "SEN"
  },
  {
    "label": "Serbia",
    "value": "SRB"
  },
  {
    "label": "Seychelles",
    "value": "SYC"
  },
  {
    "label": "Sierra Leone",
    "value": "SLE"
  },
  {
    "label": "Singapore",
    "value": "SGP"
  },
  {
    "label": "Sint Maarten",
    "value": "SXM"
  },
  {
    "label": "Slovakia",
    "value": "SVK"
  },
  {
    "label": "Slovenia",
    "value": "SVN"
  },
  {
    "label": "Solomon Islands",
    "value": "SLB"
  },
  {
    "label": "Somalia",
    "value": "SOM"
  },
  {
    "label": "South Africa",
    "value": "ZAF"
  },
  {
    "label": "South Korea",
    "value": "KOR"
  },
  {
    "label": "South Sudan",
    "value": "SSD"
  },
  {
    "label": "Spain",
    "value": "ESP"
  },
  {
    "label": "Sri Lanka",
    "value": "LKA"
  },
  {
    "label": "Sudan",
    "value": "SDN"
  },
  {
    "label": "Suriname",
    "value": "SUR"
  },
  {
    "label": "Svalbard and Jan Mayen",
    "value": "SJM"
  },
  {
    "label": "Swaziland",
    "value": "SWZ"
  },
  {
    "label": "Sweden",
    "value": "SWE"
  },
  {
    "label": "Switzerland",
    "value": "CHE"
  },
  {
    "label": "Syria",
    "value": "SYR"
  },
  {
    "label": "Taiwan",
    "value": "TWN"
  },
  {
    "label": "Tajikistan",
    "value": "TJK"
  },
  {
    "label": "Tanzania",
    "value": "TZA"
  },
  {
    "label": "Thailand",
    "value": "THA"
  },
  {
    "label": "Togo",
    "value": "TGO"
  },
  {
    "label": "Tokelau",
    "value": "TKL"
  },
  {
    "label": "Tonga",
    "value": "TON"
  },
  {
    "label": "Trinidad and Tobago",
    "value": "TTO"
  },
  {
    "label": "Tunisia",
    "value": "TUN"
  },
  {
    "label": "Turkey",
    "value": "TUR"
  },
  {
    "label": "Turkmenistan",
    "value": "TKM"
  },
  {
    "label": "Turks and Caicos Islands",
    "value": "TCA"
  },
  {
    "label": "Tuvalu",
    "value": "TUV"
  },
  {
    "label": "United States",
    "value": "USA"
  },
  {
    "label": "United States Virgin Islands",
    "value": "VIR"
  },
  {
    "label": "Uganda",
    "value": "UGA"
  },
  {
    "label": "Ukraine",
    "value": "UKR"
  },
  {
    "label": "Unknown",
    "value": "NoC"
  },
  {
    "label": "United Arab Emirates",
    "value": "ARE"
  },
  {
    "label": "United Kingdom",
    "value": "GBR"
  },
  {
    "label": "Uruguay",
    "value": "URY"
  },
  {
    "label": "Uzbekistan",
    "value": "UZB"
  },
  {
    "label": "Vanuatu",
    "value": "VUT"
  },
  {
    "label": "Vatican",
    "value": "VAT"
  },
  {
    "label": "Venezuela",
    "value": "VEN"
  },
  {
    "label": "Vietnam",
    "value": "VNM"
  },
  {
    "label": "Wallis and Futuna",
    "value": "WLF"
  },
  {
    "label": "Western Sahara",
    "value": "ESH"
  },
  {
    "label": "Yemen",
    "value": "YEM"
  },
  {
    "label": "Zambia",
    "value": "ZMB"
  },
  {
    "label": "Zimbabwe",
    "value": "ZWE"
  }
]

$(document).ready(function(){
    $('table#website-datatable thead:last-child th').each( function () {
        var title = $(this).text();
        // console.log(title)
        if(title == "Website Name"){
          var tagName = title.toLowerCase().replace(' ', '_').trim()
          $(this).html( '<input class="form-control" type="text" name="'+tagName+'" placeholder="Search '+title+'" />' );
        }else if(title == "Date Created"){
          var tagName = title.toLowerCase().replace(' ', '_').trim()
          $(this).html( '<input class="form-control" type="date" name="'+tagName+'" placeholder="Search '+title+'" />' );
        }else if(title == "Country"){
          var tagName = title.toLowerCase().trim()
          var cnt = countries.map(v=>`<option>${v.label}</option>`).join('')
          $(this).html(`<select class="form-control" name="${tagName}"><option value="" selected>All</option>${cnt}</select>`)
        }else if(title == "Country Code"){
          var tagName = title.toLowerCase().replace(' ', '_').trim()
          var iso = countries.map(v=>`<option>${v.value}</option>`).join('')
          $(this).html(`<select class="form-control" name="${tagName}"><option value="" selected>All</option>${iso}</select>`)
        }else if(title == "Website Category"){
          var tagName = title.toLowerCase().replace(' ', '_').trim()
          var categories = ["News", "Blog"]
          var cat = categories.map(v=>`<option>${v}</option>`).join('')
          $(this).html(`<select class="form-control" name="${tagName}"><option value="" selected>All</option>${cat}</select>`)
        }else if(title == "Verified"){
          var tagName = title.toLowerCase().trim()
          var verifies = [{"label": 'True', "value": true}, {"label":'False', "value": false}]
          var ver = verifies.map(v=>`<option value=${v.value}>${v.label}</option>`).join('')
          $(this).html(`<select class="form-control" name="${tagName}"><option value="" selected>All</option>${ver}</select>`)
        }else if(title == "Status"){
          var tagName = title.toLowerCase().trim()
          var statuses = ["ACTIVE", "INACTIVE", "EXPIRED"]
          var stats = statuses.map(v=>`<option>${v}</option>`).join('')
          $(this).html(`<select class="form-control" name="${tagName}"><option value="" selected>All</option>${stats}</select>`)
        }else{
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
            "url": "/mmi-admin-dashboard/websites/lists",
            "type": "POST",
        },
        "columns": [
            { "data": "website_name" },
            { "data": "fqdn" },
            { "data": "country" },
            { "data": "country_code" },
            { "data": "website_category" },
            { "data": "alexa_rankings.global" },
            { "data": "alexa_rankings.local" },
            { "data": "verified" },
            { "data": "date_created" },
            { "data": "status"},
            { "data": "_id"}
        ],
        columnDefs:[
            {
                targets:0, render:function(data, type, row){
                    return `<a class="nav-link" href="${row.url}" data-toggle="tooltip" title="Go to ${data}" target="_blank">${data}</a>`
                    // return `<input type="text" id="update-website_name-${row._id}" class="form-control" value=${data}>`
                }
            },
            {
              targets:1, render:function(data, type, row){
                  return `<input type="text" id="update-fqdn-${row._id}" class="form-control" value=${data}>`
              }
            },
            {
              targets:2, render:function(data, type, row){
                  const cnt = countries.map(v=>{
                    let wrp = ''
                    if(v.label === data){
                      wrp += `<option selected>${data}</option>`
                    }else{
                      wrp += `<option>${v.label}</option>`
                    }
                    return wrp
                  }).join('')
                  return `<select class="form-control update-country" id="update-country-${row._id}">
                    ${cnt}
                  </select>`
              }
            },
            {
              targets:3, render:function(data, type, row){
                  const cnt = countries.map(v=>{
                    let wrp = ''
                    if(v.value === data){
                      wrp += `<option selected>${data}</option>`
                    }else{
                      wrp += `<option>${v.value}</option>`
                    }
                    return wrp
                  }).join('')
                  return `<select class="form-control update-country-code" id="update-country_code-${row._id}">
                    ${cnt}
                  </select>`
              }
            },
            {
              targets:4, render:function(data, type, row){
                  const categories = ["News", "Blog"]
                  const cat = categories.map(v=>{
                    let wrp = ''
                    if(v === data){
                      wrp += `<option selected>${data}</option>`
                    }else{
                      wrp += `<option>${v}</option>`
                    }
                    return wrp
                  }).join('')
                  return `<select class="form-control" id="update-website_category-${row._id}">
                    ${cat}
                  </select>`
              }
            },
            {
              targets:5, render:function(data, type, row){
                  return `<input type="number" id="update-global_rank-${row._id}" class="form-control" value=${data}>`
              }
            },
            {
              targets:6, render:function(data, type, row){
                  return `<input type="number" id="update-local_rank-${row._id}" class="form-control" value=${data}>`
              }
            },
            {
              targets:7, render:function(data, type, row){
                  const verified = [true, false]
                  const ver = verified.map(v=>{
                    let wrp = ''
                    if(v === data){
                      wrp += `<option selected>${data}</option>`
                    }else{
                      wrp += `<option>${v}</option>`
                    }
                    return wrp
                  }).join('')
                  return `<select class="form-control" id="update-verified-${row._id}">
                    ${ver}
                  </select>`
              }
            },
            {
              targets: 8, render:function(data, type, row){
                return moment(data).format('LLLL')
              }
            },
            {
              targets:9, render:function(data, type, row){
                  const status = ["ACTIVE", "INACTIVE"]
                  const stat = status.map(v=>{
                    let wrp = ''
                    if(v === data){
                      wrp += `<option selected>${data}</option>`
                    }else{
                      wrp += `<option>${v}</option>`
                    }
                    return wrp
                  }).join('')
                  return `<select class="form-control" id="update-status-${row._id}">
                    ${stat}
                  </select>`
              }
            },
            {
              targets: 10, render:function(data, type, row){
                return `<div class="btn-group">
                  <button id="btn-update-${data}" class="btn btn-warning"><i class="fas fa-edit"></i></button>
                  <a href="/mmi-admin-dashboard/websites/view/${data}" title="View More" class="btn btn-info"><i class="fas fa-eye"></i></a>
                  <a href="${row.website_url}" title="Visit Site" class="btn btn-success"><i class="fas fa-link"></i></a>
                </div>`
              }
            }
        ],
        "order": [[ 8, "desc" ]]
    })

    draw.create()

    $(document).on('change', 'input:not([id^=update-]),select:not([name="website-datatable_length"],[id^=update-])', function(){
        let fields = $('input:not([id^=update-]),select:not([name="website-datatable_length"],[id^=update-],[name="validate"]').map(function(i,e){
            let obj = {}
            
            let inputName = $(e).attr('name')

            if(inputName){
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
            }
        }).get()

        // console.log(fields, '1')

        // delete fields[0]

        fields = fields.reduce(function(a, b){
            return Object.assign(a, b)
        }, {})
        
        $.each(fields, function(key, value){
            if (value === "" || value === null || key === undefined){
                delete fields[key];
            }
        });

        // console.log(fields,'2')

        draw.update({
            "responsive": true,
            "autoWidth": false,
            "processing": true,
            "serverSide": true,
            "deferRender": true,
            "searching": false,
            "searchDelay": 500,
            "ajax": {
                "url": "/mmi-admin-dashboard/websites/lists",
                "type": "POST",
                "data": fields
            },
            "columns": [
                { "data": "website_name" },
                { "data": "fqdn" },
                { "data": "country" },
                { "data": "country_code" },
                { "data": "website_category" },
                { "data": "alexa_rankings.global" },
                { "data": "alexa_rankings.local" },
                { "data": "verified" },
                { "data": "date_created" },
                { "data": "status"},
                { "data": "_id"}
            ],
            columnDefs:[
                {
                    targets:0, render:function(data, type, row){
                        return `<a class="nav-link" href="${row.url}" data-toggle="tooltip" title="Go to ${data}" target="_blank">${data}</a>`
                        // return `<input type="text" id="update-website_name-${row._id}" class="form-control" value=${data}>`
                    }
                },
                {
                  targets:1, render:function(data, type, row){
                      return `<input type="text" id="update-fqdn-${row._id}" class="form-control" value=${data}>`
                  }
                },
                {
                  targets:2, render:function(data, type, row){
                      const cnt = countries.map(v=>{
                        let wrp = ''
                        if(v.label === data){
                          wrp += `<option selected>${data}</option>`
                        }else{
                          wrp += `<option>${v.label}</option>`
                        }
                        return wrp
                      }).join('')
                      return `<select class="form-control update-country" id="update-country-${row._id}">
                        ${cnt}
                      </select>`
                  }
                },
                {
                  targets:3, render:function(data, type, row){
                      const cnt = countries.map(v=>{
                        let wrp = ''
                        if(v.value === data){
                          wrp += `<option selected>${data}</option>`
                        }else{
                          wrp += `<option>${v.value}</option>`
                        }
                        return wrp
                      }).join('')
                      return `<select class="form-control update-country-code" id="update-country_code-${row._id}">
                        ${cnt}
                      </select>`
                  }
                },
                {
                  targets:4, render:function(data, type, row){
                      const categories = ["News", "Blog"]
                      const cat = categories.map(v=>{
                        let wrp = ''
                        if(v === data){
                          wrp += `<option selected>${data}</option>`
                        }else{
                          wrp += `<option>${v}</option>`
                        }
                        return wrp
                      }).join('')
                      return `<select class="form-control" id="update-website_category-${row._id}">
                        ${cat}
                      </select>`
                  }
                },
                {
                  targets:5, render:function(data, type, row){
                      return `<input type="number" id="update-global_rank-${row._id}" class="form-control" value=${data}>`
                  }
                },
                {
                  targets:6, render:function(data, type, row){
                      return `<input type="number" id="update-local_rank-${row._id}" class="form-control" value=${data}>`
                  }
                },
                {
                  targets:7, render:function(data, type, row){
                      const verified = [true, false]
                      const ver = verified.map(v=>{
                        let wrp = ''
                        if(v === data){
                          wrp += `<option selected>${data}</option>`
                        }else{
                          wrp += `<option>${v}</option>`
                        }
                        return wrp
                      }).join('')
                      return `<select class="form-control" id="update-verified-${row._id}">
                        ${ver}
                      </select>`
                  }
                },
                {
                  targets: 8, render:function(data, type, row){
                    return moment(data).format('LLLL')
                  }
                },
                {
                  targets:9, render:function(data, type, row){
                      const status = ["ACTIVE", "INACTIVE"]
                      const stat = status.map(v=>{
                        let wrp = ''
                        if(v === data){
                          wrp += `<option selected>${data}</option>`
                        }else{
                          wrp += `<option>${v}</option>`
                        }
                        return wrp
                      }).join('')
                      return `<select class="form-control" id="update-status-${row._id}">
                        ${stat}
                      </select>`
                  }
                },
                {
                  targets: 10, render:function(data, type, row){
                    return `<div class="btn-group">
                      <button id="btn-update-${data}" class="btn btn-warning"><i class="fas fa-edit"></i></button>
                      <a href="/mmi-admin-dashboard/websites/view/${data}" title="View More" class="btn btn-info"><i class="fas fa-eye"></i></a>
                      <a href="${row.website_url}" title="Visit Site" class="btn btn-success"><i class="fas fa-link"></i></a>
                    </div>`
                  }
                }
            ],
            "order": [[ 8, "desc" ]]
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
    let fields = $('input:not([id^=update-]),select:not([name="website-datatable_length"],[id^=update-],[name="validate"]').map(function(i,e){
      let obj = {}
      
      let inputName = $(e).attr('name')

      if(inputName){
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
      }
  }).get()

  // console.log(fields, '1')

  // delete fields[0]

  fields = fields.reduce(function(a, b){
      return Object.assign(a, b)
  }, {})
  
  $.each(fields, function(key, value){
      if (value === "" || value === null || key === undefined){
          delete fields[key];
      }
  });
    // console.log(fields)
    let query = JSON.stringify(fields)
    // console.log(query)
    // await rq(`/mmi-admin-dashboard/websites/raw-website-lists?query=${query}&filename=${filename}`, 'GET')
    return location.href = `/mmi-admin-dashboard/websites/website-lists?query=${query}&filename=${filename}`
}

$(document).on('click', 'button[id^=btn-update-]', async function(e){
  e.preventDefault()
  let _id = $(this).attr('id').split('-').splice(-1)
  let fields = $(this).parent('div').parent('td').siblings('td').children('input, select')
  let obj = {}
  $.each(fields, function(i, e){
    let id = $(e).attr('id').split('-').splice(-1)
    obj.fqdn = $(`#update-fqdn-${id}`).val()
    obj.country = $(`#update-country-${id}`).val()
    obj.country_code = $(`#update-country_code-${id}`).val()
    obj.website_category = $(`#update-website_category-${id}`).val()
    obj.status = $(`#update-status-${id}`).val()
    obj.alexa_rankings = {
      "global": $(`#update-global_rank-${id}`).val(),
      "local": $(`#update-local_rank-${id}`).val()
    }
    obj.verified = $(`#update-verified-${id}`).val()
    obj.updated_by = user
    obj.date_updated = new Date()
  })
  let c = confirm('You are editing this row, make sure you know what you are doing!')
  if(c){
    // console.log(obj)
    let updateData = await rq('/mmi-admin-dashboard/websites/update/'+_id, 'POST', obj)
    // alert('Successfully updated '+updateData.data.website_name)
    $(document).Toasts('create', {
      class: 'bg-success', 
      delay: 1500,
      autohide: true,
      title: 'Success.',
      // subtitle: 'Subtitle',
      body: 'Successfully updated '+updateData.data.website_name
    })
    $(this).parent('div').parent('td').parent('tr').remove()
  }else{
    return false
  }

})

$(document).on('change', 'select.update-country', function(e){
  e.preventDefault()
  let needle = $(this).val()
  let id = $(this).attr('id').split('-').splice(-1)
  let iso = countries.find(({label}) => label.search(new RegExp(`^${needle}`, 'gi')) != -1)
  $(`select#update-country_code-${id}`).val(iso.value)
})

$(document).on('change', 'select.update-country-code', function(e){
  e.preventDefault()
  let needle = $(this).val()
  let id = $(this).attr('id').split('-').splice(-1)
  let iso = countries.find(({value}) => value.search(new RegExp(`^${needle}`, 'gi')) != -1)
  $(`select#update-country-${id}`).val(iso.label)
})