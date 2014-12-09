"use strict";

var helper = require("./helpers/index.js");
var assert = require("chai").assert;

var Postcode = require("../lib/resources/postcodes.js");
var postcodeResource;

describe ("Postcodes Resource", function () {
	describe("Get", function () {
		beforeEach(function () {
			postcodeResource = new Postcode({
				host: "localhost",
				port: 1337,
				key: "gandhi"
			});
		});
		it ("returns an array of addresses for valid postcode", function (done) {
			var testPostcode = "ID1 1QD";
			postcodeResource.get(testPostcode, function (error, response) {
				if (error) return done(error);
				assert.equal(response.code, 2000);
				response.result.forEach(function (address) {
					assert.equal(address.postcode, testPostcode);
				})
				done();
			});
		});
		it ("returns an 4040 response for invalid postcode", function () {
			var testPostcode = "ID1 KFA";
			postcodeResource.get(testPostcode, function (error, response) {
				if (error) return done(error);
				assert.equal(response.code, 4040);
				done();
			});
		});
	});
	describe("geolocate", function () {
		it ("returns an array of addresses for valid postcode");
		it ("returns an empty array for invalid postcode");
		it ("accepts a radius attribute");
		it ("returns an error if key is invalid");
	});
});