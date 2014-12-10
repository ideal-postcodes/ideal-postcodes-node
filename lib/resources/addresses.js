var util = require("util");
var Base = require("./index");
var q = require("querystring");
var _ = require("lodash");
var errors = require("../errors.js");

function Addresses (config) {
	Base.apply(this, arguments);
}

util.inherits(Addresses, Base);

Addresses.prototype.get = function (udprn, callback) {
	var self = this;
	var query = {
		api_key: self.config.key
	};
	var path = "/v1/addresses/" + q.escape(udprn) + "?" + q.stringify(query);
	self.request({
		path: path,
		method: "GET"
	}, callback);
};

Addresses.prototype.query = function (searchTerm, callback) {
	var self = this;
	var query = {
		api_key: self.config.key
	};
	if (typeof searchTerm === 'string') {
		query.q = searchTerm;
	} else {
		query = _.defaults(searchTerm, query);
	}
	var path = "/v1/addresses?" + q.stringify(query);
	self.request({
		path: path,
		method: "GET"
	}, callback);
};
	
module.exports = Addresses;