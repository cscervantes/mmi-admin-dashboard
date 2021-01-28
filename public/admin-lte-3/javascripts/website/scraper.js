console.log('Loading Script')

let btnSearch = document.querySelector('#btnSearch')

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
    "label": "United States Of America",
    "value": "USA"
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

const regions = [
  "Africa",
  "Asia",
  "The Caribbean",
  "Central America",
  "Europe",
  "North America",
  "Oceania",
  "South America",
  "Unknown",
]

async function websiteTable(userId){
    console.log(userId)
    let data = {}
    let fields = {
      "website_name": 1,
      "fqdn": 1,
      "website_category": 1,
      "website_type": 1,
      "country": 1,
      "country_code": 1,
      "region": 1,
      "is_aggregator": 1,
      "is_to_be_scraped": 1,
      "alexa_rankings": 1,
      "status": 1,
      "date_created": 1
    }
    // $('table#website-datatable').dataTable().fnDestroy()
    loadData(data, fields, 100)
}

btnSearch.addEventListener('click', async function(e){
  e.preventDefault()
  e.stopImmediatePropagation()
  let website_name = $('#website_name').val().trim()
  let fqdn = $('#fqdn').val().trim()
  let website_category = $('#website_category').val()
  let website_type = $('#website_type').val()
  let country = $('#country').val()
  let region = $('#region').val()
  // let is_aggregator = $('#is_aggregator').prop('checked')
  // let is_to_be_scraped = $('#is_to_be_scraped').prop('checked')
  // let status = $('#status').prop('checked')
  let is_aggregator = $('#is_aggregator').val()
  let is_to_be_scraped = $('#is_to_be_scraped').val()
  let status = $('#status').val()
  let global = $('#global').val()
  let local = $('#local').val()
  let date_created = $('#date_created').val()
  let rawData = {}
  if(website_name){
    rawData.website_name = {
      "$regex": website_name
    }
  }
  if(fqdn){
    rawData.fqdn = {
      "$regex": fqdn
    }
  }
  if(website_category){
    rawData.website_category = website_category
  }
  if(website_type){
    rawData.website_type = website_type
  }
  if(country){
    rawData.country = {
      "$regex": country
    }
  }
  if(region){
    rawData.region = { "$regex": region }
  }
  if(date_created){
    rawData.date_created = {
      "$lte":date_created
    }
  }
  if(is_aggregator){
    rawData.is_aggregator = is_aggregator
  }
  if(is_to_be_scraped){
    rawData.is_to_be_scraped = is_to_be_scraped
  }
  if(status){
    rawData.status = status
  }
  if(global){
    rawData["alexa_rankings.global"] = {
      "$eq": parseInt(global)
    }
  }
  if(local){
    rawData["alexa_rankings.local"]  = {
      "$eq": parseInt(local)
    }
  }

  // console.log(rawData)
  let data = rawData
  let fields = {
    "website_name": 1,
    "fqdn": 1,
    "website_category": 1,
    "website_type": 1,
    "country": 1,
    "country_code": 1,
    "region": 1,
    "is_aggregator": 1,
    "is_to_be_scraped": 1,
    "alexa_rankings": 1,
    "status": 1,
    "date_created": 1
  }
  reinitTable('table#website-datatable')
  let totalCount = await rq('/mmi-admin-dashboard/websites/count', 'POST', rawData)
  let defaultCount = totalCount.data
  if(totalCount.data > 5000){
    defaultCount = 5000
  }
  loadData(data, fields, defaultCount)
})

async function rq(url='', method='GET', data={}){
  let opts = {}
  opts.headers = {
    'Content-Type': 'application/json'
  }
  if(method==='POST'){
    opts.method =  method
    opts.body = JSON.stringify(data)
  }else{
    opts.method =  method
  }
  const response = await fetch(url, opts);
  return response.json();
}

async function loadData(data, fields, limit){
  let f = await rq(`/mmi-admin-dashboard/websites/custom_query?limit=${limit}&fields=${JSON.stringify(fields)}`, 'POST', data)
  let wrapper = f.data.map(v=>{
    let aggregrator = `
    <div class="custom-control custom-switch custom-switch-on-success">
      <input type="checkbox" name="is_aggregator" class="custom-control-input" id="${v._id}-aggregator" />
      <label for="${v._id}-aggregator" class="custom-control-label"> No</label>
    </div>
    `
    if (v.is_aggregator){
      aggregrator = `
      <div class="custom-control custom-switch custom-switch-on-success">
        <input type="checkbox" name="is_aggregator" class="custom-control-input" id="${v._id}-aggregator" checked/>
        <label for="${v._id}-aggregator" class="custom-control-label"> Yes</label>
      </div>
      `
    }

    let scraped = `
    <div class="custom-control custom-switch custom-switch-on-success">
      <input type="checkbox" name="is_to_be_scraped" class="custom-control-input" id="${v._id}-scraped" />
      <label for="${v._id}-scraped" class="custom-control-label"> No</label>
    </div>
    `
    if (v.is_to_be_scraped){
      scraped = `
      <div class="custom-control custom-switch custom-switch-on-success">
        <input type="checkbox" name="is_to_be_scraped" class="custom-control-input" id="${v._id}-scraped" checked/>
        <label for="${v._id}-scraped" class="custom-control-label"> Yes</label>
      </div>
      `
    }

    let status = `
    <div class="custom-control custom-switch custom-switch-on-success">
      <input type="checkbox" name="status" class="custom-control-input" id="${v._id}-status" />
      <label for="${v._id}-status" class="custom-control-label"> Inactive</label>
    </div>
    `
    if (v.status === 'ACTIVE'){
      status = `
      <div class="custom-control custom-switch custom-switch-on-success">
        <input type="checkbox" name="status" class="custom-control-input" id="${v._id}-status" checked/>
        <label for="${v._id}-status" class="custom-control-label"> Active</label>
      </div>
      `
    }

    return `<tr id='${v._id}'>
      <td><a class="nav-link" href="/mmi-admin-dashboard/websites/view/${v._id}" data-toggle="tooltip" title="View details" target="_blank">${v.website_name}</a></td>
      <td><a class="nav-link" href="http://${v.fqdn}" target="_blank" title="Original Source">${v.fqdn}</a></td>
      <td>${v.website_category}</td>
      <td><input type="text" value="${v.country}" class="autocomplete-country" data-id="country"><input type="text" value="${v.country_code}" data-id="country_code"><div class="btn-group" role="group" aria-label="Basic example" style="display:none;">
      <button type="button" class="btn btn-secondary"><i class="fas fa-edit"></i></button>
      <button type="button" class="btn btn-secondary"><i class="fas fa-times"></i></button>
    </div></td>
      <td><input type="text" value="${v.region}" class="autocomplete-region" data-id="region"><div class="btn-group" role="group" aria-label="Basic example" style="display:none;">
      <button type="button" class="btn btn-secondary"><i class="fas fa-edit"></i></button>
      <button type="button" class="btn btn-secondary"><i class="fas fa-times"></i></button>
    </div></td>
      <td>${aggregrator}</td>
      <td>${scraped}</td>
      <td>${status}</td>
      <td><input type="number" value="${v.alexa_rankings.global}" data-id="alexa_rankings.global"><div class="btn-group" role="group" aria-label="Basic example" style="display:none;">
      <button type="button" class="btn btn-secondary"><i class="fas fa-edit"></i></button>
      <button type="button" class="btn btn-secondary"><i class="fas fa-times"></i></button>
    </div></td>
      <td><input type="number" value="${v.alexa_rankings.local}" data-id="alexa_rankings.local"><div class="btn-group" role="group" aria-label="Basic example" style="display:none;">
      <button type="button" class="btn btn-secondary"><i class="fas fa-edit"></i></button>
      <button type="button" class="btn btn-secondary"><i class="fas fa-times"></i></button>
    </div></td>
      <td>${moment(v.date_created).format('LLL')}</td>
    </tr>`
  }).join('')
  document.querySelector('#website-datatable tbody').innerHTML = wrapper
  $('table#website-datatable').DataTable({
    "order": [[10, 'asc']]
  })
}

async function reinitTable(el){
  $(el).DataTable().clear().destroy();
}

$(document).on('click', '#website-datatable tbody tr td', function(e){
  $(this).children('div.btn-group').css({'display': 'flex'})
})

$(document).on('click', '.btn-group button:last-child', function(e){
  e.preventDefault()
  e.stopImmediatePropagation()
  $(this).parent('div').css({'display':'none'})
})

$(document).on('click', '.btn-group button:first-child', async function(e){
  e.preventDefault()
  e.stopImmediatePropagation()
  let input = $(this).parent('div').siblings('input')
  let data = {}
  if (input.length > 1) {
    data[input.eq(0).attr('data-id')] = input.eq(0).val()
    data[input.eq(1).attr('data-id')] = input.eq(1).val()
  }else{
    data[input.eq(0).attr('data-id')] = input.eq(0).val()
  }
  data.updated_by = user
  data.date_updated = new Date()
  let _id = $(this).parent('div').parent('td').parent('tr').attr('id')
  await rq('/mmi-admin-dashboard/websites/update/'+_id, 'POST', data)
  $(this).parent().css({"display": "none"})
  $(this).closest('div.btn-group').after(`<div class="alert alert-success alert-dismissible">
  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
  <h5><i class="icon fas fa-check"></i> Success!</h5>
</div>`)
})

$(document).on('input', '.autocomplete-country', function(e){
  e.preventDefault()
  e.stopImmediatePropagation()
  var _t = $(this)
  _t.autocomplete({
    source: countries,
    change :showResult,
    minLength: 2

  })
})

$(document).on('input', '#country', function(e){
  e.preventDefault()
  e.stopImmediatePropagation()
  var _t = $(this)
  _t.autocomplete({
    source: countries,
    change: function(event, ui){
      event.target.value = ui.item.label
    },
    minLength: 2

  })
})

function showResult(event, ui){
  event.target.value = ui.item.label
  event.target.nextElementSibling.value = ui.item.value
}

$(document).on('input', '.autocomplete-region', function(e){
  $(this).autocomplete({
    source: regions,
    minLength: 2
  })
})

$(document).on('change', 'input[type="checkbox"]', async function(e){
  e.preventDefault()
  e.stopImmediatePropagation()
  let _id = $(this).parent('div').parent('td').parent('tr').attr('id')
  let key = $(this).attr('name')
  let val = $(this).prop('checked')
  let data = {}
  if (key === "status" && val === false){
    data[key] = "INACTIVE"
  }else if(key === "status" && val === true){
    data[key] = "ACTIVE"
  }else{
    data[key] = val
  }
  data.updated_by = user
  data.date_updated = new Date()
  await rq('/mmi-admin-dashboard/websites/update/'+_id, 'POST', data)
  $(this).closest('div').after(`<div class="alert alert-success alert-dismissible">
  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
  <h5><i class="icon fas fa-check"></i> Success!</h5>
</div>`)
})