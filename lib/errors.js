"use strict";

var errors = {
	"4000": "Invalid Syntax Submitted. Some part of your request was invalid.",
	"4010": "Invalid Key. The key you provided is not valid.",
	"4020": "Key balance depleted. You're out of lookups on your API Key",
	"4021": "Limit Reached. One of your lookup limits has been breached for today."
};

/**
 * Detects whether API has returned an error
 * @param {Object} response - the full JSON response from the API
 * @returns {null,Error} null if valid, an error if not
 */

function detectError (response) {
	// Return an error if invalid format 
	if (!response.code) {
		return invalidResponseError();
	}

	var code = parseInt(response.code, 10);

	if (isNaN(code)) {
		return invalidResponseError();	
	}

	var error = errors[code.toString()]
	return error ? new Error(error) : null;
} 

/**
 * Returns an invalid response error
 * @returns {Error} Invalid response error
 */
function invalidResponseError () {
	return new Error("Invalid JSON return from Ideal Postcodes.");
}

/**
 * Returns a timeout error
 * @param {Number} the timeout duration in milliseconds
 * @returns {Error} Timeout error
 */
function timeoutError (timeout) {
	return new Error("Timeout Error: Request to Ideal Postcodes timed out after " + timeout / 1000 + "s");
}

/**
 * Returns an invalid response error
 * @returns {Error} Invalid response error
 */
function connectionError(message) {
	return new Error("An error occurred connecting to the Ideal Postcodes API. Please check the following error message:\n" + message);
}

module.exports = {
	detect: detectError,
	errors: errors,
	invalidResponseError: invalidResponseError,
	timeoutError: timeoutError,
	connectionError: connectionError
};