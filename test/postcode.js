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


		// Only works with paid up token
		// it ("should provide an empty array if no match found", function (done) {
		// 	client.lookupPostcode("BOGUS", function (error, result) {
		// 		assert.isArray(result);
		// 		assert.isNull(error);
		// 		assert.equal(result.length, 0);
		// 		done();
		// 	})
		// });	
	});
}

