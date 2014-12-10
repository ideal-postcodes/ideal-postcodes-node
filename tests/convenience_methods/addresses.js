"use strict";

var key;
var IdealPostcodes = require('../../lib/index.js');
var assert = require('chai').assert;
var helper = require("../helpers/");
var testConfig = {
	key: "gandhi",
	host: "localhost",
	port: 1337
};
var idealPostcodes;

describe ("Address resource convenience methods", function () {
	beforeEach(function () {
		idealPostcodes = IdealPostcodes(testConfig);
	});

	describe("#lookupAddress", function () {
		it ("returns address results for query string", function (done) {
			idealPostcodes.lookupAddress("High Street", function (error, searchResults) {
				if (error) return done(error);
				assert.equal(searchResults.code, 2000);
				assert.isArray(searchResults.result.hits);
				searchResults.result.hits.forEach(function (address) {
					helper.isAddressObject(address);
				});
				done();
			});
		});
		it ("returns an error if no query is provided", function (done) {
			idealPostcodes.lookupAddress({}, function (error, results) {
				assert.match(error.message, /search\sterm\srequired/i);
				done();
			});
		});
		it ("returns address results for query object", function (done) {
			idealPostcodes.lookupAddress({ query: "High Street" }, function (error, searchResults) {
				if (error) return done(error);
				assert.equal(searchResults.code, 2000);
				assert.isArray(searchResults.result.hits);
				searchResults.result.hits.forEach(function (address) {
					helper.isAddressObject(address);
				});
				done();
			});
		});
		it ("is sensitive to limit attribute", function (done) {
			idealPostcodes.lookupAddress({ 
				query: "High Street",
				limit: 1
			}, function (error, searchResults) {
				if (error) return done(error);
				assert.equal(searchResults.code, 2000);
				assert.isArray(searchResults.result.hits);
				assert.equal(searchResults.result.hits.length, 1);
				done();
			});
		});
		it ("is sensitive to page attribute", function (done) {
			idealPostcodes.lookupAddress({ 
				query: "High Street",
				page: 2
			}, function (error, searchResults) {
				if (error) return done(error);
				assert.equal(searchResults.code, 2000);
				assert.equal(searchResults.result.page, 2);
				done();
			});
		});
		it ("returns an error if invalid key", function (done) {
			var oldKey = idealPostcodes.config.key;
			idealPostcodes.config.key = "foo";
			idealPostcodes.lookupAddress(helper.invalidKeyPostcode, function (error, result) {
				helper.isInvalidKeyError(error);
				idealPostcodes.config.key = oldKey;
				done();
			});
		});
		it ("returns an error if limit reached", function (done) {
			idealPostcodes.lookupAddress(helper.limitReachedPostcode, function (error, result) {
				helper.isLimitReachedError(error);
				done();
			});
		});
		it ("returns and error if balance is depleted", function (done) {
			idealPostcodes.lookupAddress(helper.balanceDepletedPostcode, function (error, result) {
				helper.isBalanceDepletedError(error);
				done();
			});
		});
	});

	describe("#lookupUdprn", function () {
		it ("returns an address", function (done) {
			idealPostcodes.lookupUdprn(helper.testUdprn, function (error, address) {
				if (error) return done(error);
				helper.isAddressObject(address);
				done();
			});
		});
		it ("returns null if address does not exist", function (done) {
			idealPostcodes.lookupUdprn(helper.invalidUdprn, function (error, address) {
				if (error) return done(error);
				assert.isNull(address);
				done();
			});
		});
		it ("returns an error if invalid key", function (done) {
			var oldKey = idealPostcodes.config.key;
			idealPostcodes.config.key = "foo";
			idealPostcodes.lookupUdprn(helper.testUdprn, function (error, result) {
				helper.isInvalidKeyError(error);
				idealPostcodes.config.key = oldKey;
				done();
			});
		});
		it ("returns an error if limit reached", function (done) {
			idealPostcodes.lookupUdprn(helper.limitReachedUdprn, function (error, result) {
				helper.isLimitReachedError(error);
				done();
			});
		});
		it ("returns and error if balance is depleted", function (done) {
			idealPostcodes.lookupUdprn(helper.balanceDepletedUdprn, function (error, result) {
				helper.isBalanceDepletedError(error);
				done();
			});
		});
	});
});