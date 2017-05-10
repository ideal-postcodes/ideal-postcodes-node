"use strict";

var nock = require("nock");

if (process.env.LIVE) {
	nock = function () {
		var result = {
			isDone: function () { return true },
			get: function () { return result },
			reply: function () { return result }
		};
		return result;
	};
}

var requests = {
	base: {},
	keys: {},
	udprn: {},
	addresses: {},
	postcodes: {},
	geolocation: {}
};

requests.base.success = function () {
	return nock('https://127.0.0.1:8016')
		.get('/')
		.reply(200, {"result":"success","code":2000}, { 'x-powered-by': 'Express',
		'content-type': 'application/json; charset=utf-8',
		'content-length': '32',
		connection: 'keep-alive' });
};

requests.base.invalidSyntax = function () {
	return nock('https://127.0.0.1:8016')
		.get('/invalid_syntax')
		.reply(400, {"code":4000}, { 'x-powered-by': 'Express',
		'content-type': 'application/json; charset=utf-8',
		'content-length': '13',
		connection: 'keep-alive' });
};

requests.base.invalidJson = function () {
	return nock('https://127.0.0.1:8016')
		.get('/invalidjson')
		.reply(200, "This is invalid JSON", { 'x-powered-by': 'Express',
		connection: 'keep-alive',
		'transfer-encoding': 'chunked' });
};

requests.base.invalidKey = function () {
	return nock('https://127.0.0.1:8016')
		.get('/invalid_key')
		.reply(401, {"code":4010}, { 'x-powered-by': 'Express',
		'content-type': 'application/json; charset=utf-8',
		'content-length': '13',
		connection: 'keep-alive' });
};

requests.base.depletedKey = function () {
	return nock('https://127.0.0.1:8016')
		.get('/balance_depleted')
		.reply(402, {"code":4020}, { 'x-powered-by': 'Express',
		'content-type': 'application/json; charset=utf-8',
		'content-length': '13',
		connection: 'keep-alive' });
};

requests.base.limitReached = function () {
	return nock('https://127.0.0.1:8016')
		.get('/limit_reached')
		.reply(402, {"code":4021}, { 'x-powered-by': 'Express',
		'content-type': 'application/json; charset=utf-8',
		'content-length': '13',
		connection: 'keep-alive' });
};

requests.addresses.limitReached = function () {
	return nock('https://localhost:1337')
		.get('/v1/addresses?query=ID1%20CHOP&api_key=gandhi')
		.reply(402, {"code":4021,"message":"Lookup Limit Reached. For more information see http://ideal-postcodes.co.uk/documentation/response-codes#4021"}, { 'access-control-allow-origin': '*',
		'content-type': 'application/json; charset=utf-8',
		'content-length': '144',
		connection: 'keep-alive' });
};

requests.addresses.balanceDepleted = function () {
	return nock('https://localhost:1337')
	  .get('/v1/addresses?query=ID1%20CLIP&api_key=gandhi')
	  .reply(402, {"code":4020,"message":"Token balance depleted. For more information see http://ideal-postcodes.co.uk/documentation/response-codes#4020"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '146',
	  connection: 'keep-alive' });
};

requests.addresses.invalidKey = function () {
	return nock('https://localhost:1337')
	  .get('/v1/addresses?api_key=foo')
	  .reply(401, {"code":4010,"message":"Invalid Key. For more information see http://ideal-postcodes.co.uk/documentation/response-codes#4010"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '135',
	  connection: 'keep-alive' });
};

requests.addresses.successPaginated = function () {
	return nock('https://localhost:1337')
	  .get('/v1/addresses?query=High%20Street&page=2&api_key=gandhi')
	  .reply(200, {"result":{"total":245046,"limit":10,"page":2,"hits":[{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"SWANAGE","delivery_point_suffix":"1B","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-1.95476772607103,"department_name":"","district":"Purbeck","building_name":"","dependant_thoroughfare":"","northings":78667,"premise":"3","postcode_outward":"BH19","postcode_inward":"2LN","sub_building_name":"","eastings":403297,"postcode":"BH19 2LN","country":"England","udprn":1916268,"line_3":"","organisation_name":"High Street Cafe","ward":"Swanage South","county":"Dorset","line_1":"High Street Cafe","building_number":"3","thoroughfare":"High Street","line_2":"3 High Street","latitude":50.6077139574248},{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"COLCHESTER","delivery_point_suffix":"1P","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":0.897380770110505,"department_name":"","district":"Colchester","building_name":"156b","dependant_thoroughfare":"","northings":225224,"premise":"156b","postcode_outward":"CO1","postcode_inward":"1PG","sub_building_name":"","eastings":599477,"postcode":"CO1 1PG","country":"England","udprn":5147131,"line_3":"","organisation_name":"High Street News","ward":"Castle","county":"Essex","line_1":"High Street News","building_number":" ","thoroughfare":"High Street","line_2":"156b High Street","latitude":51.8898635288354},{"dependant_locality":"Elstree","postcode_type":"S","po_box":"","post_town":"BOREHAMWOOD","delivery_point_suffix":"1F","double_dependant_locality":"","su_organisation_indicator":" ","longitude":-0.298835820058211,"department_name":"","district":"Hertsmere","building_name":"High Street House","dependant_thoroughfare":"","northings":195245,"premise":"High Street House","postcode_outward":"WD6","postcode_inward":"3BY","sub_building_name":"","eastings":517807,"postcode":"WD6 3BY","country":"England","udprn":26293738,"line_3":"Elstree","organisation_name":"","ward":"Elstree","county":"Hertfordshire","line_1":"High Street House","building_number":" ","thoroughfare":"High Street","line_2":"High Street","latitude":51.6436747713131},{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"CALNE","delivery_point_suffix":"3B","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-2.0053177184165,"department_name":"","district":"Wiltshire","building_name":"","dependant_thoroughfare":"","northings":171108,"premise":"15","postcode_outward":"SN11","postcode_inward":"0BS","sub_building_name":"","eastings":399727,"postcode":"SN11 0BS","country":"England","udprn":22664334,"line_3":"","organisation_name":"High Street Barbers","ward":"Calne Central","county":"","line_1":"High Street Barbers","building_number":"15","thoroughfare":"High Street","line_2":"15 High Street","latitude":51.4389706290656},{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"WINSFORD","delivery_point_suffix":"1Y","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-2.52812458425328,"department_name":"","district":"Cheshire West and Chester","building_name":"","dependant_thoroughfare":"","northings":366336,"premise":"","postcode_outward":"CW7","postcode_inward":"2AU","sub_building_name":"","eastings":364812,"postcode":"CW7 2AU","country":"England","udprn":6119087,"line_3":"","organisation_name":"High Street Community School","ward":"Winsford Over and Verdin","county":"","line_1":"High Street Community School","building_number":" ","thoroughfare":"High Street","line_2":"High Street","latitude":53.1929406774373},{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"COWBRIDGE","delivery_point_suffix":"2S","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-3.44787405359296,"department_name":"","district":"Vale of Glamorgan","building_name":"","dependant_thoroughfare":"","northings":174632,"premise":"16","postcode_outward":"CF71","postcode_inward":"7AG","sub_building_name":"","eastings":299511,"postcode":"CF71 7AG","country":"Wales","udprn":4512114,"line_3":"","organisation_name":"High Street Jewellers","ward":"Cowbridge","county":"","line_1":"High Street Jewellers","building_number":"16","thoroughfare":"High Street","line_2":"16 High Street","latitude":51.4617168176317},{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"EPSOM","delivery_point_suffix":"2A","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-0.26531868339896,"department_name":"","district":"Epsom and Ewell","building_name":"","dependant_thoroughfare":"","northings":160819,"premise":"25","postcode_outward":"KT19","postcode_inward":"8DD","sub_building_name":"","eastings":520943,"postcode":"KT19 8DD","country":"England","udprn":12252398,"line_3":"","organisation_name":"High Street News","ward":"Town","county":"Surrey","line_1":"High Street News","building_number":"25","thoroughfare":"High Street","line_2":"25 High Street","latitude":51.333611874221},{"dependant_locality":"Laxton","postcode_type":"S","po_box":"","post_town":"NEWARK","delivery_point_suffix":"1Z","double_dependant_locality":"","su_organisation_indicator":" ","longitude":-0.923432874831403,"department_name":"","district":"Newark and Sherwood","building_name":"High Street Farm","dependant_thoroughfare":"","northings":367052,"premise":"High Street Farm","postcode_outward":"NG22","postcode_inward":"0NX","sub_building_name":"","eastings":472020,"postcode":"NG22 0NX","country":"England","udprn":16717721,"line_3":"Laxton","organisation_name":"","ward":"Caunton","county":"Nottinghamshire","line_1":"High Street Farm","building_number":" ","thoroughfare":"High Street","line_2":"High Street","latitude":53.1956846457973},{"dependant_locality":"Hopton","postcode_type":"S","po_box":"","post_town":"DISS","delivery_point_suffix":"4R","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":0.928874665644035,"department_name":"","district":"St Edmundsbury","building_name":"","dependant_thoroughfare":"","northings":279235,"premise":"","postcode_outward":"IP22","postcode_inward":"2QX","sub_building_name":"","eastings":599466,"postcode":"IP22 2QX","country":"England","udprn":52681737,"line_3":"Hopton","organisation_name":"High Street Chapel","ward":"Barningham","county":"Suffolk","line_1":"High Street Chapel","building_number":" ","thoroughfare":"High Street","line_2":"High Street","latitude":52.374824841602},{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"PERTH","delivery_point_suffix":"1A","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-3.43811033632173,"department_name":"","district":"Perth and Kinross","building_name":"","dependant_thoroughfare":"","northings":723655,"premise":"276","postcode_outward":"PH1","postcode_inward":"5QS","sub_building_name":"","eastings":311329,"postcode":"PH1 5QS","country":"Scotland","udprn":18851807,"line_3":"","organisation_name":"High Street Newsagents","ward":"Perth City Centre","county":"","line_1":"High Street Newsagents","building_number":"276","thoroughfare":"High Street","line_2":"276 High Street","latitude":56.3968073717407}]},"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '10424',
	  connection: 'keep-alive' });
};

requests.addresses.successLimited = function () {
	return nock('https://localhost:1337')
	  .get('/v1/addresses?query=High%20Street&limit=1&api_key=gandhi')
	  .reply(200, {"result":{"total":245046,"limit":1,"page":0,"hits":[{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"RHYL","delivery_point_suffix":"1N","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-3.48941454288796,"department_name":"","district":"Denbighshire","building_name":"66a","dependant_thoroughfare":"","northings":381371,"premise":"66a","postcode_outward":"LL18","postcode_inward":"1UB","sub_building_name":"","eastings":300883,"postcode":"LL18 1UB","country":"Wales","udprn":13525462,"line_3":"","organisation_name":"High Street News","ward":"Rhyl West","county":"","line_1":"High Street News","building_number":" ","thoroughfare":"High Street","line_2":"66a High Street","latitude":53.3199596875698}]},"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '1141',
	  connection: 'keep-alive' });
};

requests.addresses.successInverted = function () {
	return nock('https://localhost:1337')
	  .get('/v1/addresses?query=High%20Street&api_key=gandhi')
	  .reply(200, {"result":{"total":245046,"limit":10,"page":0,"hits":[{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"RHYL","delivery_point_suffix":"1N","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-3.48941454288796,"department_name":"","district":"Denbighshire","building_name":"66a","dependant_thoroughfare":"","northings":381371,"premise":"66a","postcode_outward":"LL18","postcode_inward":"1UB","sub_building_name":"","eastings":300883,"postcode":"LL18 1UB","country":"Wales","udprn":13525462,"line_3":"","organisation_name":"High Street News","ward":"Rhyl West","county":"","line_1":"High Street News","building_number":" ","thoroughfare":"High Street","line_2":"66a High Street","latitude":53.3199596875698},{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"MACCLESFIELD","delivery_point_suffix":"1E","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-2.12267651596918,"department_name":"","district":"Cheshire East","building_name":"","dependant_thoroughfare":"","northings":372628,"premise":"135","postcode_outward":"SK11","postcode_inward":"7QE","sub_building_name":"","eastings":391912,"postcode":"SK11 7QE","country":"England","udprn":22198313,"line_3":"","organisation_name":"High Street Wines","ward":"Macclesfield South","county":"","line_1":"High Street Wines","building_number":"135","thoroughfare":"High Street","line_2":"135 High Street","latitude":53.250605897651},{"dependant_locality":"Swineshead","postcode_type":"S","po_box":"","post_town":"BOSTON","delivery_point_suffix":"4H","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-0.16135642900637,"department_name":"","district":"Boston","building_name":"","dependant_thoroughfare":"","northings":340474,"premise":"","postcode_outward":"PE20","postcode_inward":"3LH","sub_building_name":"","eastings":523637,"postcode":"PE20 3LH","country":"England","udprn":18675358,"line_3":"Swineshead","organisation_name":"High Street Garage","ward":"Swineshead and Holland Fen","county":"Lincolnshire","line_1":"High Street Garage","building_number":" ","thoroughfare":"High Street","line_2":"High Street","latitude":52.947415012394},{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"WHITCHURCH","delivery_point_suffix":"1Z","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-2.68462642420982,"department_name":"","district":"Shropshire","building_name":"","dependant_thoroughfare":"","northings":341643,"premise":"37","postcode_outward":"SY13","postcode_inward":"1AZ","sub_building_name":"","eastings":354119,"postcode":"SY13 1AZ","country":"England","udprn":24214194,"line_3":"","organisation_name":"High Street Barbers","ward":"Whitchurch North","county":"","line_1":"High Street Barbers","building_number":"37","thoroughfare":"High Street","line_2":"37 High Street","latitude":52.9701733397722},{"dependant_locality":"Hinxworth","postcode_type":"S","po_box":"","post_town":"BALDOCK","delivery_point_suffix":"1P","double_dependant_locality":"","su_organisation_indicator":" ","longitude":-0.200222181511771,"department_name":"","district":"North Hertfordshire","building_name":"High Street House","dependant_thoroughfare":"","northings":240539,"premise":"High Street House","postcode_outward":"SG7","postcode_inward":"5HQ","sub_building_name":"","eastings":523515,"postcode":"SG7 5HQ","country":"England","udprn":21937472,"line_3":"Hinxworth","organisation_name":"","ward":"Arbury","county":"Hertfordshire","line_1":"High Street House","building_number":" ","thoroughfare":"High Street","line_2":"High Street","latitude":52.0494871076444},{"dependant_locality":"","postcode_type":"L","po_box":"","post_town":"DOVER","delivery_point_suffix":"1A","double_dependant_locality":"","su_organisation_indicator":" ","longitude":1.30587371512494,"department_name":"","district":"Dover","building_name":"100-106","dependant_thoroughfare":"","northings":141946,"premise":"100-106","postcode_outward":"CT16","postcode_inward":"1EQ","sub_building_name":"","eastings":631399,"postcode":"CT16 1EQ","country":"England","udprn":5648340,"line_3":"","organisation_name":"High Street Surgery","ward":"Tower Hamlets","county":"Kent","line_1":"High Street Surgery","building_number":" ","thoroughfare":"High Street","line_2":"100-106 High Street","latitude":51.1300158701364},{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"RUISLIP","delivery_point_suffix":"2Z","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-0.42651742802639,"department_name":"","district":"Hillingdon","building_name":"26-28","dependant_thoroughfare":"","northings":187509,"premise":"26-28","postcode_outward":"HA4","postcode_inward":"7AN","sub_building_name":"","eastings":509135,"postcode":"HA4 7AN","country":"England","udprn":10491312,"line_3":"","organisation_name":"High Street Carpets","ward":"West Ruislip","county":"","line_1":"High Street Carpets","building_number":" ","thoroughfare":"High Street","line_2":"26-28 High Street","latitude":51.5758926634522},{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"LOUGHBOROUGH","delivery_point_suffix":"2F","double_dependant_locality":"","su_organisation_indicator":" ","longitude":-1.20528899758605,"department_name":"","district":"Charnwood","building_name":"High Street Chambers","dependant_thoroughfare":"","northings":319598,"premise":"High Street Chambers, 22","postcode_outward":"LE11","postcode_inward":"2PZ","sub_building_name":"","eastings":453713,"postcode":"LE11 2PZ","country":"England","udprn":13301867,"line_3":"","organisation_name":"","ward":"Loughborough Southfields","county":"Leicestershire","line_1":"High Street Chambers","building_number":"22","thoroughfare":"High Street","line_2":"22 High Street","latitude":52.7713136439808},{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"ILFRACOMBE","delivery_point_suffix":"1W","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-4.12090672946642,"department_name":"","district":"North Devon","building_name":"","dependant_thoroughfare":"","northings":147639,"premise":"153","postcode_outward":"EX34","postcode_inward":"9EZ","sub_building_name":"","eastings":251945,"postcode":"EX34 9EZ","country":"England","udprn":8959350,"line_3":"","organisation_name":"High Street Tackle","ward":"Ilfracombe Central","county":"Devon","line_1":"High Street Tackle","building_number":"153","thoroughfare":"High Street","line_2":"153 High Street","latitude":51.2087210652253},{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"GATESHEAD","delivery_point_suffix":"2X","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-1.5996299999342,"department_name":"","district":"Gateshead","building_name":"311-313","dependant_thoroughfare":"","northings":562944,"premise":"311-313","postcode_outward":"NE8","postcode_inward":"1EQ","sub_building_name":"","eastings":425735,"postcode":"NE8 1EQ","country":"England","udprn":28286047,"line_3":"","organisation_name":"High Street News","ward":"Bridges","county":"","line_1":"High Street News","building_number":" ","thoroughfare":"High Street","line_2":"311-313 High Street","latitude":54.9604740808467}]},"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '10478',
	  connection: 'keep-alive' });
};

requests.addresses.success = function () {
	return nock('https://localhost:1337')
	  .get('/v1/addresses?api_key=gandhi&q=High%20Street')
	  .reply(200, {"result":{"total":245046,"limit":10,"page":0,"hits":[{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"RHYL","delivery_point_suffix":"1N","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-3.48941454288796,"department_name":"","district":"Denbighshire","building_name":"66a","dependant_thoroughfare":"","northings":381371,"premise":"66a","postcode_outward":"LL18","postcode_inward":"1UB","sub_building_name":"","eastings":300883,"postcode":"LL18 1UB","country":"Wales","udprn":13525462,"line_3":"","organisation_name":"High Street News","ward":"Rhyl West","county":"","line_1":"High Street News","building_number":" ","thoroughfare":"High Street","line_2":"66a High Street","latitude":53.3199596875698},{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"MACCLESFIELD","delivery_point_suffix":"1E","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-2.12267651596918,"department_name":"","district":"Cheshire East","building_name":"","dependant_thoroughfare":"","northings":372628,"premise":"135","postcode_outward":"SK11","postcode_inward":"7QE","sub_building_name":"","eastings":391912,"postcode":"SK11 7QE","country":"England","udprn":22198313,"line_3":"","organisation_name":"High Street Wines","ward":"Macclesfield South","county":"","line_1":"High Street Wines","building_number":"135","thoroughfare":"High Street","line_2":"135 High Street","latitude":53.250605897651},{"dependant_locality":"Swineshead","postcode_type":"S","po_box":"","post_town":"BOSTON","delivery_point_suffix":"4H","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-0.16135642900637,"department_name":"","district":"Boston","building_name":"","dependant_thoroughfare":"","northings":340474,"premise":"","postcode_outward":"PE20","postcode_inward":"3LH","sub_building_name":"","eastings":523637,"postcode":"PE20 3LH","country":"England","udprn":18675358,"line_3":"Swineshead","organisation_name":"High Street Garage","ward":"Swineshead and Holland Fen","county":"Lincolnshire","line_1":"High Street Garage","building_number":" ","thoroughfare":"High Street","line_2":"High Street","latitude":52.947415012394},{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"WHITCHURCH","delivery_point_suffix":"1Z","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-2.68462642420982,"department_name":"","district":"Shropshire","building_name":"","dependant_thoroughfare":"","northings":341643,"premise":"37","postcode_outward":"SY13","postcode_inward":"1AZ","sub_building_name":"","eastings":354119,"postcode":"SY13 1AZ","country":"England","udprn":24214194,"line_3":"","organisation_name":"High Street Barbers","ward":"Whitchurch North","county":"","line_1":"High Street Barbers","building_number":"37","thoroughfare":"High Street","line_2":"37 High Street","latitude":52.9701733397722},{"dependant_locality":"Hinxworth","postcode_type":"S","po_box":"","post_town":"BALDOCK","delivery_point_suffix":"1P","double_dependant_locality":"","su_organisation_indicator":" ","longitude":-0.200222181511771,"department_name":"","district":"North Hertfordshire","building_name":"High Street House","dependant_thoroughfare":"","northings":240539,"premise":"High Street House","postcode_outward":"SG7","postcode_inward":"5HQ","sub_building_name":"","eastings":523515,"postcode":"SG7 5HQ","country":"England","udprn":21937472,"line_3":"Hinxworth","organisation_name":"","ward":"Arbury","county":"Hertfordshire","line_1":"High Street House","building_number":" ","thoroughfare":"High Street","line_2":"High Street","latitude":52.0494871076444},{"dependant_locality":"","postcode_type":"L","po_box":"","post_town":"DOVER","delivery_point_suffix":"1A","double_dependant_locality":"","su_organisation_indicator":" ","longitude":1.30587371512494,"department_name":"","district":"Dover","building_name":"100-106","dependant_thoroughfare":"","northings":141946,"premise":"100-106","postcode_outward":"CT16","postcode_inward":"1EQ","sub_building_name":"","eastings":631399,"postcode":"CT16 1EQ","country":"England","udprn":5648340,"line_3":"","organisation_name":"High Street Surgery","ward":"Tower Hamlets","county":"Kent","line_1":"High Street Surgery","building_number":" ","thoroughfare":"High Street","line_2":"100-106 High Street","latitude":51.1300158701364},{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"RUISLIP","delivery_point_suffix":"2Z","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-0.42651742802639,"department_name":"","district":"Hillingdon","building_name":"26-28","dependant_thoroughfare":"","northings":187509,"premise":"26-28","postcode_outward":"HA4","postcode_inward":"7AN","sub_building_name":"","eastings":509135,"postcode":"HA4 7AN","country":"England","udprn":10491312,"line_3":"","organisation_name":"High Street Carpets","ward":"West Ruislip","county":"","line_1":"High Street Carpets","building_number":" ","thoroughfare":"High Street","line_2":"26-28 High Street","latitude":51.5758926634522},{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"LOUGHBOROUGH","delivery_point_suffix":"2F","double_dependant_locality":"","su_organisation_indicator":" ","longitude":-1.20528899758605,"department_name":"","district":"Charnwood","building_name":"High Street Chambers","dependant_thoroughfare":"","northings":319598,"premise":"High Street Chambers, 22","postcode_outward":"LE11","postcode_inward":"2PZ","sub_building_name":"","eastings":453713,"postcode":"LE11 2PZ","country":"England","udprn":13301867,"line_3":"","organisation_name":"","ward":"Loughborough Southfields","county":"Leicestershire","line_1":"High Street Chambers","building_number":"22","thoroughfare":"High Street","line_2":"22 High Street","latitude":52.7713136439808},{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"ILFRACOMBE","delivery_point_suffix":"1W","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-4.12090672946642,"department_name":"","district":"North Devon","building_name":"","dependant_thoroughfare":"","northings":147639,"premise":"153","postcode_outward":"EX34","postcode_inward":"9EZ","sub_building_name":"","eastings":251945,"postcode":"EX34 9EZ","country":"England","udprn":8959350,"line_3":"","organisation_name":"High Street Tackle","ward":"Ilfracombe Central","county":"Devon","line_1":"High Street Tackle","building_number":"153","thoroughfare":"High Street","line_2":"153 High Street","latitude":51.2087210652253},{"dependant_locality":"","postcode_type":"S","po_box":"","post_town":"GATESHEAD","delivery_point_suffix":"2X","double_dependant_locality":"","su_organisation_indicator":"Y","longitude":-1.5996299999342,"department_name":"","district":"Gateshead","building_name":"311-313","dependant_thoroughfare":"","northings":562944,"premise":"311-313","postcode_outward":"NE8","postcode_inward":"1EQ","sub_building_name":"","eastings":425735,"postcode":"NE8 1EQ","country":"England","udprn":28286047,"line_3":"","organisation_name":"High Street News","ward":"Bridges","county":"","line_1":"High Street News","building_number":" ","thoroughfare":"High Street","line_2":"311-313 High Street","latitude":54.9604740808467}]},"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '10478',
	  connection: 'keep-alive' });
};

requests.udprn.success = function () {
	return nock('https://localhost:1337')
	  .get('/v1/addresses/0?api_key=gandhi')
	  .reply(200, {"result":{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"2","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":0,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1G","line_1":"2 Barons Court Road","line_2":"","line_3":"","premise":"2","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '911',
	  connection: 'keep-alive' });
};

requests.udprn.invalid = function () {
	return nock('https://localhost:1337')
	  .get('/v1/addresses/-1?api_key=gandhi')
	  .reply(404, {"code":4044,"message":"No UDPRN found"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '49',
	  connection: 'keep-alive' });
};

requests.udprn.invalidKey = function () {
	return nock('https://localhost:1337')
	  .get('/v1/addresses/0?api_key=foo')
	  .reply(401, {"code":4010,"message":"Invalid Key. For more information see http://ideal-postcodes.co.uk/documentation/response-codes#4010"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '135',
	  connection: 'keep-alive' });
};

requests.udprn.depleted = function () {
	return nock('https://localhost:1337')
	  .get('/v1/addresses/-2?api_key=gandhi')
	  .reply(402, {"code":4020,"message":"Token balance depleted. For more information see http://ideal-postcodes.co.uk/documentation/response-codes#4020"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '146',
	  connection: 'keep-alive' });
};

requests.udprn.limitReached = function () {
	return nock('https://localhost:1337')
	  .get('/v1/addresses/-3?api_key=gandhi')
	  .reply(402, {"code":4021,"message":"Lookup Limit Reached. For more information see http://ideal-postcodes.co.uk/documentation/response-codes#4021"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '144',
	  connection: 'keep-alive' });
};

requests.postcodes.success = function () {
	return nock('https://localhost:1337')
	  .get('/v1/postcodes/ID1%201QD?api_key=gandhi')
	  .reply(200, {"result":[{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"2","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":25962203,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1G","line_1":"2 Barons Court Road","line_2":"","line_3":"","premise":"2","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"2","building_name":"Basement Flat","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":52618355,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"3A","line_1":"Basement Flat","line_2":"2 Barons Court Road","line_3":"","premise":"Basement Flat, 2","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"4","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":25962215,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1W","line_1":"4 Barons Court Road","line_2":"","line_3":"","premise":"4","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"4","building_name":"","sub_building_name":"Basement","po_box":"","department_name":"","organisation_name":"","udprn":25962189,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"2P","line_1":"Basement","line_2":"4 Barons Court Road","line_3":"","premise":"Basement, 4","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"6","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":25962218,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1Y","line_1":"6 Barons Court Road","line_2":"","line_3":"","premise":"6","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"8","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":25962219,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1Z","line_1":"8 Barons Court Road","line_2":"","line_3":"","premise":"8","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"59","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"ID Consulting Limited","udprn":25946509,"postcode_type":"S","su_organisation_indicator":"Y","delivery_point_suffix":"1N","line_1":"ID Consulting Limited","line_2":"59 Barons Court Road","line_3":"","premise":"59","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299}],"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '6683',
	  connection: 'keep-alive' });
};

requests.postcodes.depleted = function () {
	return nock('https://localhost:1337')
	  .get('/v1/postcodes/ID1%20CLIP?api_key=gandhi')
	  .reply(402, {"code":4020,"message":"Token balance depleted. For more information see http://ideal-postcodes.co.uk/documentation/response-codes#4020"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '146',
	  connection: 'keep-alive' });
};

requests.postcodes.limitReached = function () {
	return nock('https://localhost:1337')
	  .get('/v1/postcodes/ID1%20CHOP?api_key=gandhi')
	  .reply(402, {"code":4021,"message":"Lookup Limit Reached. For more information see http://ideal-postcodes.co.uk/documentation/response-codes#4021"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '144',
	  connection: 'keep-alive' });
};

requests.postcodes.notFound = function () {
	return nock('https://localhost:1337')
	  .get('/v1/postcodes/ID1%20KFA?api_key=gandhi')
	  .reply(404, {"code":4040,"message":"Postcode Not Found"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '53',
	  connection: 'keep-alive' });
};

requests.postcodes.invalidKey = function () {
	return nock('https://localhost:1337')
	  .get('/v1/postcodes/undefined?api_key=foo')
	  .reply(401, {"code":4010,"message":"Invalid Key. For more information see http://ideal-postcodes.co.uk/documentation/response-codes#4010"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '135',
	  connection: 'keep-alive' });
};

requests.geolocation.success = function () {
	return nock('https://localhost:1337')
	  .get('/v1/postcodes?api_key=gandhi&lonlat=-0.20864%2C51.48994')
	  .reply(200, {"result":[{"postcode":"W14 9DT","northings":178299,"eastings":524466,"longitude":-0.208644362766368,"latitude":51.4899488390558,"distance":1.029038833},{"postcode":"W14 9HP","northings":178250,"eastings":524497,"longitude":-0.208215353224691,"latitude":51.4895016535293,"distance":56.994463261},{"postcode":"W14 9DY","northings":178258,"eastings":524424,"longitude":-0.209263429936064,"latitude":51.4895896040625,"distance":58.264446841},{"postcode":"W14 9DB","northings":178351,"eastings":524497,"longitude":-0.208179766575366,"latitude":51.4904093484835,"distance":61.225730805},{"postcode":"W14 9DS","northings":178315,"eastings":524530,"longitude":-0.207717383841141,"latitude":51.4900785532037,"distance":65.908978852},{"postcode":"W14 9DD","northings":178330,"eastings":524392,"longitude":-0.209698749475355,"latitude":51.4902437086294,"distance":80.927798902},{"postcode":"W14 9HQ","northings":178234,"eastings":524517,"longitude":-0.207933075525138,"latitude":51.4893534603178,"distance":81.665905577},{"postcode":"W14 9HA","northings":178252,"eastings":524394,"longitude":-0.20969741729609,"latitude":51.4895422763055,"distance":85.744263257},{"postcode":"W14 9JP","northings":178212,"eastings":524461,"longitude":-0.208746986755546,"latitude":51.4891680625458,"distance":86.204807148}],"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '1867',
	  connection: 'keep-alive' });
};

requests.geolocation.empty = function () {
	return nock('https://localhost:1337')
	  .get('/v1/postcodes?api_key=gandhi&lonlat=0%2C0')
	  .reply(200, {"result":[],"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '1867',
	  connection: 'keep-alive' });
};

requests.geolocation.radius50Success = function () {
	return nock('https://localhost:1337')
	  .get('/v1/postcodes?api_key=gandhi&lonlat=-0.20864%2C51.48994&radius=50')
	  .reply(200, {"result":[{"postcode":"W14 9DT","northings":178299,"eastings":524466,"longitude":-0.208644362766368,"latitude":51.4899488390558,"distance":1.029038833}],"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '260',
	  connection: 'keep-alive' });
};

requests.geolocation.radius150Success = function () {
	return nock('https://localhost:1337')
	  .get('/v1/postcodes?api_key=gandhi&lonlat=-0.20864%2C51.48994&radius=150')
	  .reply(200, {"result":[{"postcode":"W14 9DT","northings":178299,"eastings":524466,"longitude":-0.208644362766368,"latitude":51.4899488390558,"distance":1.029038833},{"postcode":"W14 9HP","northings":178250,"eastings":524497,"longitude":-0.208215353224691,"latitude":51.4895016535293,"distance":56.994463261},{"postcode":"W14 9DY","northings":178258,"eastings":524424,"longitude":-0.209263429936064,"latitude":51.4895896040625,"distance":58.264446841},{"postcode":"W14 9DB","northings":178351,"eastings":524497,"longitude":-0.208179766575366,"latitude":51.4904093484835,"distance":61.225730805},{"postcode":"W14 9DS","northings":178315,"eastings":524530,"longitude":-0.207717383841141,"latitude":51.4900785532037,"distance":65.908978852},{"postcode":"W14 9DD","northings":178330,"eastings":524392,"longitude":-0.209698749475355,"latitude":51.4902437086294,"distance":80.927798902},{"postcode":"W14 9HQ","northings":178234,"eastings":524517,"longitude":-0.207933075525138,"latitude":51.4893534603178,"distance":81.665905577},{"postcode":"W14 9HA","northings":178252,"eastings":524394,"longitude":-0.20969741729609,"latitude":51.4895422763055,"distance":85.744263257},{"postcode":"W14 9JP","northings":178212,"eastings":524461,"longitude":-0.208746986755546,"latitude":51.4891680625458,"distance":86.204807148},{"postcode":"W14 9HW","northings":178239,"eastings":524380,"longitude":-0.209903534856258,"latitude":51.4894285211699,"distance":104.595210821},{"postcode":"W14 9HF","northings":178201,"eastings":524517,"longitude":-0.20794470421238,"latitude":51.4890568867226,"distance":109.47997206},{"postcode":"W14 9DP","northings":178320,"eastings":524580,"longitude":-0.206995822379361,"latitude":51.4901124842008,"distance":115.798633997},{"postcode":"W14 9DR","northings":178320,"eastings":524580,"longitude":-0.206995822379361,"latitude":51.4901124842008,"distance":115.798633997},{"postcode":"W14 9DU","northings":178286,"eastings":524341,"longitude":-0.210448431668051,"latitude":51.489859484214,"distance":125.925213841},{"postcode":"W14 9JH","northings":178185,"eastings":524531,"longitude":-0.207748803762887,"latitude":51.4889100131304,"distance":130.243247789},{"postcode":"W14 9HT","northings":178192,"eastings":524387,"longitude":-0.209819309120183,"latitude":51.489004589589,"distance":132.439608837},{"postcode":"W14 9ES","northings":178377,"eastings":524574,"longitude":-0.207062101802514,"latitude":51.4906260680973,"distance":133.555321192},{"postcode":"W14 9JR","northings":178167,"eastings":524432,"longitude":-0.209180308303465,"latitude":51.4887700204829,"distance":135.470883132},{"postcode":"W14 9BY","northings":178432,"eastings":524497,"longitude":-0.20815122544182,"latitude":51.4911373017476,"distance":137.466669201},{"postcode":"W14 9BQ","northings":178429,"eastings":524509,"longitude":-0.207979526906195,"latitude":51.4911077004754,"distance":137.776661384},{"postcode":"W14 9EX","northings":178281,"eastings":524611,"longitude":-0.206563301015553,"latitude":51.4897551635068,"distance":145.697673642},{"postcode":"W14 9BJ","northings":178429,"eastings":524394,"longitude":-0.209635102832239,"latitude":51.4911329904169,"distance":149.645987283}],"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '4488',
	  connection: 'keep-alive' });
};

requests.geolocation.limitSuccess = function () {
	return nock('https://localhost:1337')
	  .get('/v1/postcodes?api_key=gandhi&lonlat=-0.20864%2C51.48994&limit=1')
	  .reply(200, {"result":[{"postcode":"W14 9DT","northings":178299,"eastings":524466,"longitude":-0.208644362766368,"latitude":51.4899488390558,"distance":1.029038833}],"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '260',
	  connection: 'keep-alive' });
};

requests.keys.available = function () {
	return nock('https://localhost:1337')
	  .get('/v1/keys/iddqd')
	  .reply(200, {"result":{"available":true},"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '83',
	  connection: 'keep-alive' });
};

requests.keys.notAvailable = function () {
	return nock('https://localhost:1337')
	  .get('/v1/keys/idkfa')
	  .reply(200, {"result":{"available":false},"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '84',
	  connection: 'keep-alive' });
};

requests.keys.notFound = function () {
	return nock('https://localhost:1337')
	  .get('/v1/keys/foo')
	  .reply(401, {"code":4010,"message":"Invalid Key. For more information see http://ideal-postcodes.co.uk/documentation/response-codes#4010"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '135',
	  connection: 'keep-alive' });
};

requests.keys.secretSuccess = function () {
	return nock('https://localhost:1337')
	  .get('/v1/keys/gandhi?user_token=uk_ihggl998zJW2gkgOZsj1BZBnavCPT')
	  .reply(200, {"result":{"lookups_remaining":20948,"daily_limit":{"limit":null,"consumed":0},"individual_limit":{"limit":null},"allowed_urls":[],"notifications":{"emails":["cablanchard2@gmail.com"],"enabled":true},"automated_topups":{"enabled":true}},"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '405',
	  connection: 'keep-alive' }); 
};

requests.keys.secretInvalid = function () {
	return nock('https://localhost:1337')
	  .get('/v1/keys/foo?user_token=uk_ihggl998zJW2gkgOZsj1BZBnavCPT')
	  .reply(401, {"code":4010,"message":"Invalid Key. For more information see http://ideal-postcodes.co.uk/documentation/response-codes#4010"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '135',
	  connection: 'keep-alive' });
};

requests.keys.secretInvalidUserToken = function () {
	return nock('https://localhost:1337')
	  .get('/v1/keys/gandhi?user_token=foo')
	  .reply(401, {"code":4012,"message":"Forbidden"}, { 'access-control-allow-origin': '*',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '44',
	  connection: 'keep-alive' });
};


module.exports = requests;
