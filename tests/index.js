"use strict";

var api_key = "iddqd";
var client = require('../lib/index.js')(api_key);
var assert = require('chai').assert;
var testPostcode = "ID1 1QD";
var realPostcode = "SW1A 2AA";
var helper = require("./helpers/index.js");

describe("Successful postcode lookup", function () {
	it ("returns an array of addresses for a successful lookup", function (done) {
		client.lookupPostcode(testPostcode, function (error, result) {
			assert.isArray(result);
			assert.isNull(error);
			assert.notEqual(result.length, 0);
			done();
		});
	});
	it ("returns an empty array if invalid postcode");
});


describe("API Errors", function () {
	beforeEach(function() {
		client.api_key = api_key;
	});

	it ("returns an error if invalid api key provided", function (done) {
		client.api_key = "BOGUS";
		client.lookupPostcode(testPostcode, function (error, result) {
			assert.isNotNull(error);
			assert.match(error.message, /4010/);
			done();
		});
	});
	it ("returns an error if token balance is depleted");
	it ("returns an error if a daily or individual lookup limit has been breached");
});