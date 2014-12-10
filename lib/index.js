"use strict";

var _ = require("lodash");
var pkg = require("../package.json");
var errors = require("./errors.js");

var resources = {
	postcodes: require("./resources/postcodes.js"),
	keys: require("./resources/keys.js"),
	addresses: require("./resources/addresses.js")
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

IdealPostcodes.prototype.lookupAddress = function (search, callback) {
	if (typeof search === 'object' && !search.query) {
		return callback(new Error("Search term required. Please provide a search query in your query"));
	}
	return this.addresses.query(search, callback);
};

IdealPostcodes.prototype.lookupUdprn = function (udprn, callback) {
	this.addresses.get(udprn, function (error, response) {
		if (error) return callback(error);
		if (response.code === 2000) {
			return callback(null, response.result);
		} else if (response.code === 4044) {
			return callback(null, null);
		} else {
			return helper.generalError(response);
		}
	});
}

IdealPostcodes.prototype.setConfig = function (attribute, value) {
	return this.config[attribute] = value;
};

IdealPostcodes.prototype.keyAvailability = function (callback) {
	this.keys.get(this.config.key, function (error, response) {
		if (error) return callback(error);
		return callback(null, response.result);
	});
};

IdealPostcodes.prototype.keyDetails = function (callback) {
	if (!this.config.secret) {
		return callback(new Error("No Secret Token provided. Please provide this key when initialising the client"));
	}
	this.keys.get(this.config.key, this.config.secret, function (error, response) {
		if (error) return callback(error);
		return callback(null, response.result);
	});
}

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