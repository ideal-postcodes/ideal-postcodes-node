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

nock('https://localhost:1337')
  .get('/v1/postcodes?api_key=gandhi&lonlat=-0.20864%2C51.48994')
  .reply(200, {"result":[{"postcode":"W14 9DT","northings":178299,"eastings":524466,"longitude":-0.208644362766368,"latitude":51.4899488390558,"distance":1.029038833},{"postcode":"W14 9HP","northings":178250,"eastings":524497,"longitude":-0.208215353224691,"latitude":51.4895016535293,"distance":56.994463261},{"postcode":"W14 9DY","northings":178258,"eastings":524424,"longitude":-0.209263429936064,"latitude":51.4895896040625,"distance":58.264446841},{"postcode":"W14 9DB","northings":178351,"eastings":524497,"longitude":-0.208179766575366,"latitude":51.4904093484835,"distance":61.225730805},{"postcode":"W14 9DS","northings":178315,"eastings":524530,"longitude":-0.207717383841141,"latitude":51.4900785532037,"distance":65.908978852},{"postcode":"W14 9DD","northings":178330,"eastings":524392,"longitude":-0.209698749475355,"latitude":51.4902437086294,"distance":80.927798902},{"postcode":"W14 9HQ","northings":178234,"eastings":524517,"longitude":-0.207933075525138,"latitude":51.4893534603178,"distance":81.665905577},{"postcode":"W14 9HA","northings":178252,"eastings":524394,"longitude":-0.20969741729609,"latitude":51.4895422763055,"distance":85.744263257},{"postcode":"W14 9JP","northings":178212,"eastings":524461,"longitude":-0.208746986755546,"latitude":51.4891680625458,"distance":86.204807148}],"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '1867',
  etag: '"1398164703"',
  date: 'Tue, 09 Dec 2014 17:17:52 GMT',
  connection: 'keep-alive' });

nock('https://localhost:1337')
  .get('/v1/postcodes?api_key=gandhi&lonlat=-0.20864%2C51.48994&radius=150')
  .reply(200, {"result":[{"postcode":"W14 9DT","northings":178299,"eastings":524466,"longitude":-0.208644362766368,"latitude":51.4899488390558,"distance":1.029038833},{"postcode":"W14 9HP","northings":178250,"eastings":524497,"longitude":-0.208215353224691,"latitude":51.4895016535293,"distance":56.994463261},{"postcode":"W14 9DY","northings":178258,"eastings":524424,"longitude":-0.209263429936064,"latitude":51.4895896040625,"distance":58.264446841},{"postcode":"W14 9DB","northings":178351,"eastings":524497,"longitude":-0.208179766575366,"latitude":51.4904093484835,"distance":61.225730805},{"postcode":"W14 9DS","northings":178315,"eastings":524530,"longitude":-0.207717383841141,"latitude":51.4900785532037,"distance":65.908978852},{"postcode":"W14 9DD","northings":178330,"eastings":524392,"longitude":-0.209698749475355,"latitude":51.4902437086294,"distance":80.927798902},{"postcode":"W14 9HQ","northings":178234,"eastings":524517,"longitude":-0.207933075525138,"latitude":51.4893534603178,"distance":81.665905577},{"postcode":"W14 9HA","northings":178252,"eastings":524394,"longitude":-0.20969741729609,"latitude":51.4895422763055,"distance":85.744263257},{"postcode":"W14 9JP","northings":178212,"eastings":524461,"longitude":-0.208746986755546,"latitude":51.4891680625458,"distance":86.204807148},{"postcode":"W14 9HW","northings":178239,"eastings":524380,"longitude":-0.209903534856258,"latitude":51.4894285211699,"distance":104.595210821},{"postcode":"W14 9HF","northings":178201,"eastings":524517,"longitude":-0.20794470421238,"latitude":51.4890568867226,"distance":109.47997206},{"postcode":"W14 9DP","northings":178320,"eastings":524580,"longitude":-0.206995822379361,"latitude":51.4901124842008,"distance":115.798633997},{"postcode":"W14 9DR","northings":178320,"eastings":524580,"longitude":-0.206995822379361,"latitude":51.4901124842008,"distance":115.798633997},{"postcode":"W14 9DU","northings":178286,"eastings":524341,"longitude":-0.210448431668051,"latitude":51.489859484214,"distance":125.925213841},{"postcode":"W14 9JH","northings":178185,"eastings":524531,"longitude":-0.207748803762887,"latitude":51.4889100131304,"distance":130.243247789},{"postcode":"W14 9HT","northings":178192,"eastings":524387,"longitude":-0.209819309120183,"latitude":51.489004589589,"distance":132.439608837},{"postcode":"W14 9ES","northings":178377,"eastings":524574,"longitude":-0.207062101802514,"latitude":51.4906260680973,"distance":133.555321192},{"postcode":"W14 9JR","northings":178167,"eastings":524432,"longitude":-0.209180308303465,"latitude":51.4887700204829,"distance":135.470883132},{"postcode":"W14 9BY","northings":178432,"eastings":524497,"longitude":-0.20815122544182,"latitude":51.4911373017476,"distance":137.466669201},{"postcode":"W14 9BQ","northings":178429,"eastings":524509,"longitude":-0.207979526906195,"latitude":51.4911077004754,"distance":137.776661384},{"postcode":"W14 9EX","northings":178281,"eastings":524611,"longitude":-0.206563301015553,"latitude":51.4897551635068,"distance":145.697673642},{"postcode":"W14 9BJ","northings":178429,"eastings":524394,"longitude":-0.209635102832239,"latitude":51.4911329904169,"distance":149.645987283}],"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '4488',
  etag: '"605360418"',
  date: 'Tue, 09 Dec 2014 17:17:52 GMT',
  connection: 'keep-alive' });


nock('https://localhost:1337')
  .get('/v1/postcodes?api_key=gandhi&lonlat=-0.20864%2C51.48994&radius=50')
  .reply(200, {"result":[{"postcode":"W14 9DT","northings":178299,"eastings":524466,"longitude":-0.208644362766368,"latitude":51.4899488390558,"distance":1.029038833}],"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '260',
  etag: '"926644714"',
  date: 'Tue, 09 Dec 2014 17:17:52 GMT',
  connection: 'keep-alive' });

nock('https://localhost:1337')
  .get('/v1/postcodes?api_key=gandhi&lonlat=-0.20864%2C51.48994&limit=1')
  .reply(200, {"result":[{"postcode":"W14 9DT","northings":178299,"eastings":524466,"longitude":-0.208644362766368,"latitude":51.4899488390558,"distance":1.029038833}],"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '260',
  etag: '"926644714"',
  date: 'Tue, 09 Dec 2014 17:17:52 GMT',
  connection: 'keep-alive' });

nock('https://localhost:1337')
  .get('/v1/postcodes/ID1%201QD?api_key=gandhi')
  .reply(200, {"result":[{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"2","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":25962203,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1G","line_1":"2 Barons Court Road","line_2":"","line_3":"","premise":"2","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"2","building_name":"Basement Flat","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":52618355,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"3A","line_1":"Basement Flat","line_2":"2 Barons Court Road","line_3":"","premise":"Basement Flat, 2","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"4","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":25962215,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1W","line_1":"4 Barons Court Road","line_2":"","line_3":"","premise":"4","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"4","building_name":"","sub_building_name":"Basement","po_box":"","department_name":"","organisation_name":"","udprn":25962189,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"2P","line_1":"Basement","line_2":"4 Barons Court Road","line_3":"","premise":"Basement, 4","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"6","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":25962218,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1Y","line_1":"6 Barons Court Road","line_2":"","line_3":"","premise":"6","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"8","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"","udprn":25962219,"postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1Z","line_1":"8 Barons Court Road","line_2":"","line_3":"","premise":"8","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299},{"postcode":"ID1 1QD","postcode_inward":"1QD","postcode_outward":"ID1","post_town":"LONDON","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Barons Court Road","dependant_thoroughfare":"","building_number":"59","building_name":"","sub_building_name":"","po_box":"","department_name":"","organisation_name":"ID Consulting Limited","udprn":25946509,"postcode_type":"S","su_organisation_indicator":"Y","delivery_point_suffix":"1N","line_1":"ID Consulting Limited","line_2":"59 Barons Court Road","line_3":"","premise":"59","country":"England","county":"","district":"Hammersmith and Fulham","ward":"North End","longitude":-0.208644362766368,"latitude":51.4899488390558,"eastings":524466,"northings":178299}],"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '6683',
  etag: '"1136868456"',
  date: 'Tue, 09 Dec 2014 23:13:56 GMT',
  connection: 'keep-alive' });

nock('https://localhost:1337')
  .get('/v1/postcodes/ID1%20KFA?api_key=gandhi')
  .reply(404, {"code":4040,"message":"Postcode Not Found"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '53',
  etag: '"1406335465"',
  date: 'Tue, 09 Dec 2014 23:13:56 GMT',
  connection: 'keep-alive' });

nock('https://localhost:1337')
  .get('/v1/postcodes/undefined?api_key=foo')
  .reply(401, {"code":4010,"message":"Invalid Key. For more information see http://ideal-postcodes.co.uk/documentation/response-codes#4010"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '135',
  etag: '"-632160061"',
  date: 'Tue, 09 Dec 2014 23:13:56 GMT',
  connection: 'keep-alive' });

nock('https://localhost:1337')
  .get('/v1/postcodes/ID1%20CHOP?api_key=gandhi')
  .reply(402, {"code":4021,"message":"Lookup Limit Reached. For more information see http://ideal-postcodes.co.uk/documentation/response-codes#4021"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '144',
  etag: '"1445167850"',
  date: 'Tue, 09 Dec 2014 23:13:56 GMT',
  connection: 'keep-alive' });

nock('https://localhost:1337')
  .get('/v1/postcodes/ID1%20CLIP?api_key=gandhi')
  .reply(402, {"code":4020,"message":"Token balance depleted. For more information see http://ideal-postcodes.co.uk/documentation/response-codes#4020"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '146',
  etag: '"1304241290"',
  date: 'Tue, 09 Dec 2014 23:13:56 GMT',
  connection: 'keep-alive' });

nock('https://localhost:1337')
  .get('/v1/postcodes?api_key=gandhi&lonlat=-0.20864%2C51.48994')
  .reply(200, {"result":[{"postcode":"W14 9DT","northings":178299,"eastings":524466,"longitude":-0.208644362766368,"latitude":51.4899488390558,"distance":1.029038833},{"postcode":"W14 9HP","northings":178250,"eastings":524497,"longitude":-0.208215353224691,"latitude":51.4895016535293,"distance":56.994463261},{"postcode":"W14 9DY","northings":178258,"eastings":524424,"longitude":-0.209263429936064,"latitude":51.4895896040625,"distance":58.264446841},{"postcode":"W14 9DB","northings":178351,"eastings":524497,"longitude":-0.208179766575366,"latitude":51.4904093484835,"distance":61.225730805},{"postcode":"W14 9DS","northings":178315,"eastings":524530,"longitude":-0.207717383841141,"latitude":51.4900785532037,"distance":65.908978852},{"postcode":"W14 9DD","northings":178330,"eastings":524392,"longitude":-0.209698749475355,"latitude":51.4902437086294,"distance":80.927798902},{"postcode":"W14 9HQ","northings":178234,"eastings":524517,"longitude":-0.207933075525138,"latitude":51.4893534603178,"distance":81.665905577},{"postcode":"W14 9HA","northings":178252,"eastings":524394,"longitude":-0.20969741729609,"latitude":51.4895422763055,"distance":85.744263257},{"postcode":"W14 9JP","northings":178212,"eastings":524461,"longitude":-0.208746986755546,"latitude":51.4891680625458,"distance":86.204807148}],"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '1867',
  etag: '"1398164703"',
  date: 'Tue, 09 Dec 2014 23:13:56 GMT',
  connection: 'keep-alive' });

nock('https://localhost:1337')
  .get('/v1/postcodes?api_key=gandhi&lonlat=0%2C0')
  .reply(200, {"result":[],"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '58',
  etag: '"-963557841"',
  date: 'Tue, 09 Dec 2014 23:13:56 GMT',
  connection: 'keep-alive' });

nock('https://localhost:1337')
  .get('/v1/keys/iddqd')
  .reply(200, {"result":{"available":true},"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '83',
  etag: '"2124296415"',
  date: 'Wed, 10 Dec 2014 11:06:32 GMT',
  connection: 'keep-alive' });

nock('https://localhost:1337')
  .get('/v1/keys/idkfa')
  .reply(200, {"result":{"available":false},"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '84',
  etag: '"2073554680"',
  date: 'Wed, 10 Dec 2014 11:06:32 GMT',
  connection: 'keep-alive' });

nock('https://localhost:1337')
  .get('/v1/keys/foo')
  .reply(401, {"code":4010,"message":"Invalid Key. For more information see http://ideal-postcodes.co.uk/documentation/response-codes#4010"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '135',
  etag: '"-632160061"',
  date: 'Wed, 10 Dec 2014 11:06:33 GMT',
  connection: 'keep-alive' });

nock('https://localhost:1337')
  .get('/v1/keys/gandhi?user_token=uk_hxp6ouk0rmyXoobVJnehrsQcdvTfb')
  .reply(200, {"result":{"lookups_remaining":20948,"daily_limit":{"limit":null,"consumed":0},"individual_limit":{"limit":null},"allowed_urls":[],"notifications":{"emails":["cablanchard2@gmail.com"],"enabled":true},"automated_topups":{"enabled":true}},"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '405',
  etag: '"1816126214"',
  date: 'Wed, 10 Dec 2014 11:06:33 GMT',
  connection: 'keep-alive' });

nock('https://localhost:1337')
  .get('/v1/keys/foo?user_token=uk_hxp6ouk0rmyXoobVJnehrsQcdvTfb')
  .reply(401, {"code":4010,"message":"Invalid Key. For more information see http://ideal-postcodes.co.uk/documentation/response-codes#4010"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '135',
  etag: '"-632160061"',
  date: 'Wed, 10 Dec 2014 11:06:33 GMT',
  connection: 'keep-alive' });

nock('https://localhost:1337')
  .get('/v1/keys/gandhi?user_token=foo')
  .reply(401, {"code":4012,"message":"Forbidden"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '44',
  etag: '"-1747820685"',
  date: 'Wed, 10 Dec 2014 11:06:33 GMT',
  connection: 'keep-alive' });

nock('https://localhost:1337')
  .get('/v1/keys/iddqd')
  .reply(200, {"result":{"available":true},"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '83',
  etag: '"2124296415"',
  date: 'Wed, 10 Dec 2014 14:40:55 GMT',
  connection: 'keep-alive' });

nock('https://localhost:1337')
  .get('/v1/keys/idkfa')
  .reply(200, {"result":{"available":false},"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '84',
  etag: '"2073554680"',
  date: 'Wed, 10 Dec 2014 14:40:55 GMT',
  connection: 'keep-alive' });

nock('https://localhost:1337')
  .get('/v1/keys/gandhi?user_token=uk_hxp6ouk0rmyXoobVJnehrsQcdvTfb')
  .reply(200, {"result":{"lookups_remaining":20948,"daily_limit":{"limit":null,"consumed":0},"individual_limit":{"limit":null},"allowed_urls":[],"notifications":{"emails":["cablanchard2@gmail.com"],"enabled":true},"automated_topups":{"enabled":true}},"code":2000,"message":"Success"}, { 'access-control-allow-origin': '*',
  'content-type': 'application/json; charset=utf-8',
  'content-length': '405',
  etag: '"1816126214"',
  date: 'Wed, 10 Dec 2014 14:40:55 GMT',
  connection: 'keep-alive' });

	return nock;
}