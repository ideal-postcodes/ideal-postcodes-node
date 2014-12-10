var util = require("util");
var Base = require("./index");
var q = require("querystring");
var errors = require("../errors.js");

function Keys (config) {
	Base.apply(this, arguments);
}

util.inherits(Keys, Base);

Keys.prototype.get = function (key, secretKey, callback) {
	var self = this;
	var path = "/v1/keys/" + q.escape(key);

	if (typeof secretKey === 'function') {
		// Simple check
		callback = secretKey;
	} else {
		var query = {
			user_token: secretKey
		}
		path += "?" + q.stringify(query)
		// Retrieve key info with secret key
	}

	self.request({
		path: path,
		method: "GET"
	}, function (error, response) {
		if (error) return callback(error);
		if (response.code === 2000) {
			return callback(null, response);
		} else {
			return callback(errors.generalError(response));
		}
	});
};
	
module.exports = Keys;