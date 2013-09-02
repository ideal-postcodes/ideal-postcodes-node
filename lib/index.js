"use strict";

var https = require('https'),
		q = require('querystring');

function Postcodes (api_key) {
	this.api_key = api_key;
	this.base_url = "api.ideal-postcodes.co.uk"
	this.version = "1";
}

Postcodes.prototype.lookupPostcode = function (postcode, callback) {
	var options, url_params, request;

	if (!this.api_key) {
		callback(new Error("Ideal-Postcodes: No API Key provided"), null);
	}
	
	options = {
		hostname: this.base_url,
		port: 443,
		method: 'GET',
		headers: {
			'Accept': 'application/json',
	    'Content-Type': 'application/x-www-form-urlencoded',	
		}
	}

	url_params = {
		api_key: this.api_key
	}

	options.path = "/v" + this.version + "/postcodes/" + 
									q.escape(postcode) + 
									"?" + q.stringify(url_params);


	request = https.request(options, function (response) {
		var data = "";
		response.setEncoding('utf8');

		response.on('data', function (chunk) {
			data += chunk;
		});

		response.on('end', function () {
			try {
				var output = JSON.parse(data);
			} catch (error) {
				return callback(new Error("Invalid JSON"), null);
			}
				
			// Check for empty result (Postcode not found)
			
			if (output.code === 4040) {
				return callback(null, []);
			}
			
			if (response.statusCode !== 200) {
				var error = new Error(output.message + " (" + output.code + ")");
				error.code = response.statusCode;
				return callback(error, null)
			}
			
			return callback(null, output.result);
		});
	});

	request.end();

	request.on('error', function (error) {
		callback(error, null);
	});
}

module.exports = function (api_key) {
	return new Postcodes(api_key);
}
