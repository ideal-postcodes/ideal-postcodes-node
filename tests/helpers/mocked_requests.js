module.exports = function (nock) {
	nock('https://api.ideal-postcodes.co.uk:443')
	  .get('/v1/postcodes/ID1%201QD?api_key=iddqd')
	  .reply(200, {"result":[{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"2","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":25962203,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1G","line_1":"2 Barons Court Road","line_2":"","line_3":"","premise":"2","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"2","building_name":"Basement Flat","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":52618355,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"3A","line_1":"Basement Flat","line_2":"2 Barons Court Road","line_3":"","premise":"Basement Flat, 2","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"4","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":25962215,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1W","line_1":"4 Barons Court Road","line_2":"","line_3":"","premise":"4","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"4","building_name":"","sub_building_name":"Basement","po_box":"","department_name":"","organisation_name":"","udprn":25962189,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"2P","line_1":"Basement","line_2":"4 Barons Court Road","line_3":"","premise":"Basement, 4","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"6","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":25962218,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1Y","line_1":"6 Barons Court Road","line_2":"","line_3":"","premise":"6","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"8","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":25962219,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1Z","line_1":"8 Barons Court Road","line_2":"","line_3":"","premise":"8","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"59","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"ID Consulting Limited","udprn":25946509,"postcode_type":"S","su_organisation_indicator":"Y","delivery_point_suffix":"1N","line_1":"ID Consulting Limited","line_2":"59 Barons Court Road","line_3":"","premise":"59","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299}],"code":2000,"message":"Success"}, { server: 'nginx/1.6.2',
	  date: 'Fri, 01 Dec 2000 23:59:59 GMT',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '4917',
	  connection: 'keep-alive',
	  'access-control-allow-origin': '*',
	  etag: '"-1660809304"',
	  expires: 'Fri, 05 Dec 2014 16:08:55 GMT',
	  'cache-control': 'no-cache' });

	nock('https://api.ideal-postcodes.co.uk:443')
	  .get('/v1/postcodes/ID1%201QD?api_key=BOGUS')
	  .reply(401, {"code":4010,"message":"Invalid Key. For more information see http://ideal-postcodes.co.uk/documentation/response-codes#4010"}, { server: 'nginx/1.6.2',
	  date: 'Fri, 05 Dec 2014 16:08:56 GMT',
	  'content-type': 'application/json; charset=utf-8',
	  'content-length': '126',
	  connection: 'keep-alive',
	  'access-control-allow-origin': '*',
	  etag: '"-1764206614"' });

	 nock('https://127.0.0.1:8016')
		.get('/')
		.reply(200, {"result":"success","code":2000}, { 'x-powered-by': 'Express',
		'content-type': 'application/json; charset=utf-8',
		'content-length': '32',
		etag: 'W/"20-76319fd6"',
		date: 'Tue, 09 Dec 2014 16:49:06 GMT',
		connection: 'keep-alive' });

	 nock('https://127.0.0.1:8016')
	  .get('/invalidjson')
	  .reply(200, "This is invalid JSON", { 'x-powered-by': 'Express',
	  date: 'Mon, 08 Dec 2014 16:05:46 GMT',
	  connection: 'keep-alive',
	  'transfer-encoding': 'chunked' });

	nock('https://127.0.0.1:8016')
  .get('/invalid_syntax')
  .reply(400, {"code":4000}, { 'x-powered-by': 'Express',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '13',
  etag: 'W/"d-5acd250a"',
  date: 'Tue, 09 Dec 2014 16:49:06 GMT',
  connection: 'keep-alive' });

  nock('https://127.0.0.1:8016')
  .get('/invalid_key')
  .reply(401, {"code":4010}, { 'x-powered-by': 'Express',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '13',
  etag: 'W/"d-5b0f4f3d"',
  date: 'Tue, 09 Dec 2014 16:49:06 GMT',
  connection: 'keep-alive' });

  nock('https://127.0.0.1:8016')
  .get('/balance_depleted')
  .reply(402, {"code":4020}, { 'x-powered-by': 'Express',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '13',
  etag: 'W/"d-5949f164"',
  date: 'Tue, 09 Dec 2014 16:49:07 GMT',
  connection: 'keep-alive' });

  nock('https://127.0.0.1:8016')
  .get('/limit_reached')
  .reply(402, {"code":4021}, { 'x-powered-by': 'Express',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '13',
  etag: 'W/"d-4052c025"',
  date: 'Tue, 09 Dec 2014 16:49:07 GMT',
  connection: 'keep-alive' });	 

  nock('https://localhost:1337')
  .get('/v1/postcodes/ID1%201QD?api_key=gandhi')
  .reply(200, {"result":[{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"2","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":25962203,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1G","line_1":"2 Barons Court Road","line_2":"","line_3":"","premise":"2","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"2","building_name":"Basement Flat","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":52618355,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"3A","line_1":"Basement Flat","line_2":"2 Barons Court Road","line_3":"","premise":"Basement Flat, 2","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"4","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":25962215,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1W","line_1":"4 Barons Court Road","line_2":"","line_3":"","premise":"4","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"4","building_name":"","sub_building_name":"Basement","po_box":"","department_name":"","organisation_name":"","udprn":25962189,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"2P","line_1":"Basement","line_2":"4 Barons Court Road","line_3":"","premise":"Basement, 4","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"6","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":25962218,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1Y","line_1":"6 Barons Court Road","line_2":"","line_3":"","premise":"6","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"8","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":25962219,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1Z","line_1":"8 Barons Court Road","line_2":"","line_3":"","premise":"8","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"59","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"ID Consulting Limited","udprn":25946509,"postcode_type":"S","su_organisation_indicator":"Y","delivery_point_suffix":"1N","line_1":"ID Consulting Limited","line_2":"59 Barons Court Road","line_3":"","premise":"59","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299}],"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '6683',
  etag: '"1136868456"',
  date: 'Tue, 09 Dec 2014 16:49:07 GMT',
  connection: 'keep-alive' });

  nock('https://localhost:1337')
  .get('/v1/postcodes/ID1%20KFA?api_key=gandhi')
  .reply(404, {"code":4040,"message":"Postcode Not Found"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '53',
  etag: '"1406335465"',
  date: 'Tue, 09 Dec 2014 16:52:00 GMT',
  connection: 'keep-alive' });

	return nock;
}