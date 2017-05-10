"use strict";

var helper = require("./helpers/index.js");
var assert = require("chai").assert;
var httpMock = helper.httpMock;

var Addresses = require("../lib/resources/addresses.js");
var addresses;

var testKey = helper.testKey;
var testSecret = helper.testSecret;

describe ("Addresses Resource", function () {
	var scope;

	beforeEach(function () {
		addresses = new Addresses({
			host: "localhost",
			port: 1337,
			key: testKey
		});
	});

	afterEach(function () {
		if (scope) {
			assert.isTrue(scope.isDone());
			scope = undefined;
		}
	});

	describe ("get", function () {
		it ("returns an address for valid udprn", function (done) {
			scope = httpMock.udprn.success();
			addresses.get(helper.testUdprn, function (error, response) {
				if (error) return done(error);
				assert.equal(response.code, 2000);
				helper.isAddressObject(response.result);
				done();
			});
		});
		it ("returns a 4044 error if no address", function (done) {
			scope = httpMock.udprn.invalid();
			addresses.get(helper.invalidUdprn, function (error, response) {
				assert.equal(response.code, 4044);
				done();
			});
		});
		it ("returns an error if key balance depleted", function (done) {
			scope = httpMock.udprn.depleted();
			addresses.get(helper.balanceDepletedUdprn, function (error, response) {
				helper.isBalanceDepletedError(error)
				done();
			});
		});
		it ("returns an error if a limit is breached", function (done) {
			scope = httpMock.udprn.limitReached();
			addresses.get(helper.limitReachedUdprn, function (error, response) {
				helper.isLimitReachedError(error);
				done();
			});
		});
	});
	describe ("query", function () {
		it ("returns address results for query string", function (done) {
			scope = httpMock.addresses.success();
			addresses.query("High Street", function (error, response) {
				if (error) return done(error);
				assert.equal(response.code, 2000);
				assert.isArray(response.result.hits);
				response.result.hits.forEach(function (address) {
					helper.isAddressObject(address);
				});
				done();
			});
		});
		it ("returns address results for query object", function (done) {
			scope = httpMock.addresses.successInverted();
			addresses.query({ query: "High Street" }, function (error, response) {
				if (error) return done(error);
				assert.equal(response.code, 2000);
				assert.isArray(response.result.hits);
				response.result.hits.forEach(function (address) {
					helper.isAddressObject(address);
				});
				done();
			});
		});
		it ("is sensitive to limit attribute", function (done) {
			scope = httpMock.addresses.successLimited();
			addresses.query({ 
				query: "High Street",
				limit: 1
			}, function (error, response) {
				if (error) return done(error);
				assert.equal(response.code, 2000);
				assert.isArray(response.result.hits);
				assert.equal(response.result.hits.length, 1);
				done();
			});
		});
		it ("is sensitive to page attribute", function (done) {
			scope = httpMock.addresses.successPaginated();
			addresses.query({ 
				query: "High Street",
				page: 2
			}, function (error, response) {
				if (error) return done(error);
				assert.equal(response.code, 2000);
				assert.equal(response.result.page, 2);
				done();
			});
		});
		it ("returns an error if key balance depleted", function (done) {
			scope = httpMock.addresses.balanceDepleted();
			addresses.query({ 
				query: "ID1 CLIP",
			}, function (error, response) {
				helper.isBalanceDepletedError(error);
				done();
			});
		});
		it ("returns an error if a limit is breached", function (done) {
			scope = httpMock.addresses.limitReached();
			addresses.query({ 
				query: "ID1 CHOP",
			}, function (error, response) {
				helper.isLimitReachedError(error);
				done();
			});
		});
	});
});