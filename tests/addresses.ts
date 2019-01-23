"use strict";

var key;
import IdealPostcodes from '../lib/index';
import { assert } from "chai";
import * as helper from "./helpers/index";
var httpMock = helper.httpMock;
var testConfig = {
	key: "gandhi",
	host: "localhost",
	port: 1337
};
var idealPostcodes;

describe ("Address resource convenience methods", function () {
	var scope;

	beforeEach(function () {
		idealPostcodes = new IdealPostcodes(testConfig);
	});

	afterEach(function () {
		if (scope) {
			assert.isTrue(scope.isDone());
			scope = undefined;
		}
	});

	describe("#lookupAddress", function () {
		it ("returns address results for query string", function (done) {
			scope = httpMock.addresses.success();
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
			scope = httpMock.addresses.successInverted();
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
			scope = httpMock.addresses.successLimited();
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
			scope = httpMock.addresses.successPaginated();
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
			scope = httpMock.addresses.invalidKey();
			var oldKey = idealPostcodes.config.key;
			idealPostcodes.config.key = "foo";
			idealPostcodes.lookupAddress(helper.invalidKeyPostcode, function (error, result) {
				idealPostcodes.config.key = oldKey;
				helper.isInvalidKeyError(error);
				done();
			});
		});
		it ("returns an error if limit reached", function (done) {
			scope = httpMock.addresses.limitReached();
			idealPostcodes.lookupAddress({
				query: helper.limitReachedPostcode
			}, function (error, result) {
				helper.isLimitReachedError(error);
				done();
			});
		});
		it ("returns an error if balance is depleted", function (done) {
			scope = httpMock.addresses.balanceDepleted();
			idealPostcodes.lookupAddress({
				query: helper.balanceDepletedPostcode
			}, function (error, result) {
				helper.isBalanceDepletedError(error);
				done();
			});
		});
	});

	describe("#lookupUdprn", function () {
		it ("returns an address", function (done) {
			scope = httpMock.udprn.success();
			idealPostcodes.lookupUdprn(helper.testUdprn, function (error, address) {
				if (error) return done(error);
				helper.isAddressObject(address);
				done();
			});
		});
		it ("returns null if address does not exist", function (done) {
			scope = httpMock.udprn.invalid();
			idealPostcodes.lookupUdprn(helper.invalidUdprn, function (error, address) {
				if (error) return done(error);
				assert.isNull(address);
				done();
			});
		});
		it ("returns an error if invalid key", function (done) {
			scope = httpMock.udprn.invalidKey();
			var oldKey = idealPostcodes.config.key;
			idealPostcodes.config.key = "foo";
			idealPostcodes.lookupUdprn(helper.testUdprn, function (error, result) {
				idealPostcodes.config.key = oldKey;
				helper.isInvalidKeyError(error);
				done();
			});
		});
		it ("returns an error if limit reached", function (done) {
			scope = httpMock.udprn.limitReached();
			idealPostcodes.lookupUdprn(helper.limitReachedUdprn, function (error, result) {
				helper.isLimitReachedError(error);
				done();
			});
		});
		it ("returns an error if balance is depleted", function (done) {
			scope = httpMock.udprn.depleted();
			idealPostcodes.lookupUdprn(helper.balanceDepletedUdprn, function (error, result) {
				helper.isBalanceDepletedError(error);
				done();
			});
		});
	});
});

