var utils = require("../lib/cli/utils.js");
var assert = require("chai").assert;
var helper = require("./helpers/index.js");

describe("utils", function () {
	describe("stringifyObject", function () {
		it ("should convert an object properties into strings", function () {
			var testObject = {
				"null": null,
				"number": 8,
				"string": "foo",
				"boolean": true,
				"array": [null, 8, "foo", true, {
					"null": null,
					"number": 8,
					"string": "foo",
					"boolean": true
				}],
				"object": {
					"null": null,
					"number": 8,
					"string": "foo",
					"boolean": true
				}
			};
			var result = utils.stringifyObject(testObject);
			assert.equal(result["null"], "");
			assert.equal(result["number"], "8");
			assert.equal(result["string"], "foo");
			assert.equal(result["boolean"], "true");
			assert.equal(result["array"][0], "");
			assert.equal(result["array"][1], "8");
			assert.equal(result["array"][2], "foo");
			assert.equal(result["array"][3], "true");
			assert.equal(result["object"]["null"], "");
			assert.equal(result["object"]["number"], "8");
			assert.equal(result["object"]["string"], "foo");
			assert.equal(result["object"]["boolean"], "true");
		});
	})
});