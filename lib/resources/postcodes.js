var util = require("util");
var Base = require("./index");
var q = require("querystring");

function Postcodes (config) {
	Base.apply(this, arguments);
}

util.inherits(Postcodes, Base);

Postcodes.prototype.get = function (postcode, callback) {
	var self = this;
	var query = {
		api_key: self.config.key
	};
	var path = "/v1/postcodes/" + q.escape(postcode) + "?" + q.stringify(query);
	self.request({
		path: path,
		method: "GET"
	}, callback);
};
	
Postcodes.prototype.queryLocation =  function (geolocation, callback) {
	var self = this;
	var query = {
		api_key: self.config.key,
		lonlat: [geolocation.longitude, geolocation.latitude].join(",")
	};

	if (geolocation.radius) {
		query.radius = geolocation.radius;
	}

	if (geolocation.limit) {
		query.limit = geolocation.limit;
	}

	var path = "/v1/postcodes" + "?" + q.stringify(query);
	self.request({
		path: path,
		method: "GET"
	}, callback);
};


module.exports = Postcodes;