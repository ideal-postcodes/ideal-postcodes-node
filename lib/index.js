"use strict";

var _ = require("lodash");
var pkg = require("../package.json");
var errors = require("./errors.js");

var resources = {
	postcodes: require("./resources/postcodes.js")
}

function IdealPostcodes (key, secret) {

	if (!(this instanceof IdealPostcodes)) {
    return new IdealPostcodes(key, secret);
  }

	var config = {
		host: "api.ideal-postcodes.co.uk",
		port: 443,
		timeout: 30000,
		headers: {
			"Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      'User-Agent': 'IdealPostcodes/v1 NodeBindings/' + pkg.version
		},
		version: "1",
		secret: null
	};

	if (typeof key === "string") {
		this.config = config;
		this.config.key = key;
	} else {
		this.config = _.defaults(key, config);
	}

	if (secret) {
		this.setConfig("secret", secret);
		console.log("Set secret")
	}

	this.loadResources();
};

IdealPostcodes.prototype.loadResources = function () {
	var self = this;
	var config = self.config;
	for (var resourceName in resources) {
		self[resourceName] = new resources[resourceName](config);
	}
};

IdealPostcodes.prototype.setConfig = function (attribute, value) {
	return this.config[attribute] = value;
};

IdealPostcodes.prototype.lookupPostcode = function (postcode, callback) {
	this.postcodes.get(postcode, function (error, response) {
		if (error) return callback(error);
		if (response.code === 2000) {
			return callback(null, response.result);
		} else if (response.code === 4040) {
			return callback(null, []);
		} else {
			return callback(errors.generalError(response));
		}
	});
};

IdealPostcodes.prototype.queryLocation = function (location, callback) {
	this.postcodes.queryLocation(location, function (error, response) {
		if (error) return callback(error);
		return callback(null, response.result);
	});
};

module.exports = IdealPostcodes;