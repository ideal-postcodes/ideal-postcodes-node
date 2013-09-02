module.exports = function (client) {

	var assert = require('chai').assert,
			TEST_POSTCODE = "ID1 1QD",
			REAL_POSTCODE = "E16 1SF",
			original_key = client.api_key;

	describe("API Errors", function () {
		beforeEach(function() {
			client.api_key = original_key;
		});

		it ("should throw an error if invalid api key provided", function (done) {
			client.api_key = "BOGUS";
			client.lookupPostcode(TEST_POSTCODE, function (error, result) {
				assert.throws(function () {
					if (error) throw error;
				}, /4010/);
				done();
			});
		});

		// Only works with exhausted token
		//
		it ("should throw an error if token is exhausted", function (done) {
			client.lookupPostcode(REAL_POSTCODE, function (error, result) {
				assert.throws(function () {
					if (error) throw error;
				}, /4020/);
				done();
			});
		});
	});

}

