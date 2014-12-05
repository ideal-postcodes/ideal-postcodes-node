var api_key = "iddqd";
var client = require('../lib/index.js')(api_key);
var assert = require('chai').assert;
var testPostcode = "ID1 1QD";
var realPostcode = "SW1A 2AA";
var helper = require("./helpers");

describe("Successful postcode lookup", function () {
	it ("should provide an array of results for a successful lookup", function (done) {
		client.lookupPostcode(testPostcode, function (error, result) {
			assert.isArray(result);
			assert.isNull(error);
			assert.notEqual(result.length, 0);
			done();
		});
	});
});


describe("API Errors", function () {
	beforeEach(function() {
		client.api_key = api_key;
	});

	it ("should throw an error if invalid api key provided", function (done) {
		client.api_key = "BOGUS";
		client.lookupPostcode(testPostcode, function (error, result) {
			assert.isNotNull(error);
			assert.match(error.message, /4010/);
			done();
		});
	});

	// Only works with exhausted token
	// it ("should throw an error if token is exhausted", function (done) {
	// 	client.lookupPostcode(realPostcode, function (error, result) {
	// 		assert.throws(function () {
	// 			if (error) throw error;
	// 		}, /4020/);
	// 		done();
	// 	});
	// });
});