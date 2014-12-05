module.exports = function (client) {

	var assert = require('chai').assert,
			test_postcode = "ID1 1QD";


	describe("Successful postcode lookup", function () {
		it ("should provide an array of results for a successful lookup", function (done) {
			client.lookupPostcode(test_postcode, function (error, result) {
				assert.isArray(result);
				assert.isNull(error);
				assert.notEqual(result.length, 0);
				done();
			});
		});
	});
}

