"use strict";

var https = require("https");
var qs = require("qs");
var errors = require("../errors.js");

function Base (config) {
	this.config = config;
}

/**
 * Generates a HTTP request
 * @param {Object} options - configuration object requires a path {String} and method {String}
 * @param {Function} callback - invoked upon completion
 */

Base.prototype = {
	request: function (options, callback) {
		var self = this;
		var timeout = self.config.timeout || 30000;
		var headers = self.config.headers || {
			"Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
		};
		var aborted;
		var requestData = options.data || {};
		var data = "";
    var request = https.request({
      host: self.config.host,
      port: self.config.port || 443,
      headers: self.config.headers || headers,
      method: options.method || "GET",
      path: options.path || "/"
    });

    function timeoutHandler () {
    	aborted = true;
    	request.abort();
    	callback.call(self, errors.timeoutError(timeout), null);
    }

    function errorHandler (message) {
    	if (aborted) return null;
    	callback.call(self, errors.connectionError(message), null);
    }

    function responseHandler (response) {
    	response.setEncoding("utf8");
    	response.on("data", function (chunk) {
    		data += chunk;
    	});
    	response.on("end", function () {
    		try {
    			var result = JSON.parse(data);
    		} catch (e) {
    			return callback.call(self, errors.invalidResponseError());
    		}
        var error = errors.detect(result);
        if (error) {
          return callback.call(self, error);
        }
    		return callback.call(self, null, result);
    	});
    }

    request.setTimeout(timeout, timeoutHandler);
    request.on("error", errorHandler);
    request.on("response", responseHandler);
    request.write(qs.stringify(requestData));
    request.end();
	}
}

module.exports = Base;

