"use strict";

var key;
var IdealPostcodes = require('../../lib/index.js');
var assert = require('chai').assert;
var helper = require("../helpers/");
var httpMock = helper.httpMock;
var testConfig = {
	key: "gandhi",
	host: "localhost",
	port: 1337
};
var idealPostcodes;

describe ("Postcode convenience methods", function () {
	var scope;

	beforeEach(function () {
		idealPostcodes = IdealPostcodes(testConfig);
	});

	afterEach(function () {
		if (scope) {
			assert.isTrue(scope.isDone());
			scope = undefined;
		}
	});

	describe("postcode lookup", function () {
		it ("returns addresses at a postcode", function (done) {
			scope = httpMock.postcodes.success();
			idealPostcodes.lookupPostcode(helper.testPostcode, function (error, result) {
				if (error) return done(error);
				helper.isTestPostcodeResult(result);
				done();
			});
		});
		it ("returns an empty array if postcode does not exist", function (done) {
			scope = httpMock.postcodes.notFound();
			idealPostcodes.lookupPostcode(helper.invalidPostcode, function (error, result) {
				if (error) return done(error);
				assert.isArray(result);
				assert.equal(result.length, 0);
				done();
			});
		})
		it ("returns an error if invalid key", function (done) {
			var oldKey = idealPostcodes.config.key;
			idealPostcodes.config.key = "foo";
			scope = httpMock.postcodes.invalidKey();
			idealPostcodes.lookupPostcode(helper.invalidKeyPostcode, function (error, result) {
				idealPostcodes.config.key = oldKey;
				helper.isInvalidKeyError(error);
				done();
			});
		});
		it ("returns an error if limit reached", function (done) {
			scope = httpMock.postcodes.limitReached();
			idealPostcodes.lookupPostcode(helper.limitReachedPostcode, function (error, result) {
				helper.isLimitReachedError(error);
				done();
			});
		});
		it ("returns and error if balance is depleted", function (done) {
			scope = httpMock.postcodes.depleted();
			idealPostcodes.lookupPostcode(helper.balanceDepletedPostcode, function (error, result) {
				helper.isBalanceDepletedError(error);
				done();
			});
		});
	});

	describe("Postcode radius search method", function () {
		it ("returns a list of nearby postcodes", function (done) {
			scope = httpMock.geolocation.success();
			idealPostcodes.queryLocation({
				longitude: -0.20864,
				latitude: 51.48994
			}, function (error, result) {
				if (error) return done(error);
				assert.isArray(result);
				assert.isTrue(result.length > 1);
				done();
			});
		});
		it ("returns an empty array if no nearby postcodes", function (done) {
			scope = httpMock.geolocation.empty();
			idealPostcodes.queryLocation({
				longitude: 0,
				latitude: 0
			}, function (error, result) {
				if (error) return done(error);
				assert.isArray(result);
				assert.equal(result.length, 0);
				done();
			});
		})
	});
});