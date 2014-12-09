"use strict";

var helper = require("./helpers/index.js");
var assert = require("chai").assert;

var Postcode = require("../lib/resources/postcodes.js");
var postcodeResource;

describe ("Postcodes Resource", function () {
	describe("get", function () {
		beforeEach(function () {
			postcodeResource = new Postcode({
				host: "localhost",
				port: 1337,
				key: "gandhi"
			});
		});
		it ("returns an array of addresses for valid postcode", function (done) {
			postcodeResource.get(helper.testPostcode, function (error, response) {
				if (error) return done(error);
				assert.equal(response.code, 2000);
				helper.isTestPostcodeResult(response.result);
				done();
			});
		});
		it ("returns a 4040 response for invalid postcode", function (done) {
			postcodeResource.get(helper.invalidPostcode, function (error, response) {
				if (error) return done(error);
				assert.equal(response.code, 4040);
				done();
			});
		});
	});

	describe("queryLocation", function () {
		beforeEach(function () {
			postcodeResource = new Postcode({
				host: "localhost",
				port: 1337,
				key: "gandhi"
			});
		});
		it ("returns an array of postcodes for a valid location", function (done) {
			postcodeResource.queryLocation({
				longitude: -0.20864,
				latitude: 51.48994
			}, function (error, response) {
				if (error) return done(error);
				assert.equal(response.code, 2000);
				assert.isTrue(response.result.length > 0);
				response.result.forEach(function (location) {
					helper.isPostcodeLocationObject(location);
				});
				done();
			});
		});
		it ("accepts a radius attribute", function (done) {
			postcodeResource.queryLocation({
				longitude: -0.20864,
				latitude: 51.48994,
				radius: 150
			}, function (error, initialResponse) {
				if (error) return done(error);
				assert.equal(initialResponse.code, 2000);
				postcodeResource.queryLocation({
					longitude: -0.20864,
					latitude: 51.48994,
					radius: 50
				}, function (error, response) {
					if (error) return done(error);
					assert.equal(response.code, 2000);
					assert.isTrue(initialResponse.result.length > response.result.length);
					done();
				});
			});
		});
		it ("accepts a limit attribute", function (done) {
			postcodeResource.queryLocation({
				longitude: -0.20864,
				latitude: 51.48994,
				limit: 1
			}, function (error, response) {
				if (error) return done(error);
				assert.equal(response.code, 2000);
				assert.equal(response.result.length, 1);
				done();
			});
		});
	});
});