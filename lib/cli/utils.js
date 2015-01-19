"use strict";

var utils = module.exports = {};
var Table = require("text-table");
var chalk = require("chalk");

// Returns an object in which all child nodes have been converted to strings

var stringifyObject = function (o) {
	if (o === null) return "";
	if (Array.isArray(o)) {
		return o.map(stringifyObject);
	}
	switch (typeof o) {
		case "string": 
			return o;
		case "number":
		case "boolean":  
			return o.toString();
		case "undefined":
			return "";
		case "object":
			var newObject = {};
			for (var key in o) {
				if (o.hasOwnProperty(key)) {
					newObject[key] = stringifyObject(o[key]);
				}
			}
			return newObject;
		default:
			return "";
	}
};

utils.stringifyObject = stringifyObject;

utils.prettyPrintRecord = function (data) {
	var record = data.record;

	// Print Header
	var header = "[" + new Date(record.meta.time).toTimeString() + "] " + record.response.message;
	var headerStyle = (record.response.httpStatus === 200) ? chalk.bold.green : chalk.bold.red;
	console.log(headerStyle.call(this, header));

	var table = [];
	// Print Overview
	table.push([]);
	table.push([chalk.bold("API Request")]);
	table.push(["Response Code", stringifyObject(record.response.code)]);
	table.push(["JSONP", stringifyObject(record.response.jsonp)]);
	var referer = record.request.referer;
	table.push(["Web Page Request", (referer && referer.length > 0) ? "true" : "false"]);
	table.push(["Content Length (bytes)", record.response.headers["content-length"]]);
	table.push(["Paid Lookup", stringifyObject(!record.meta.free)]);

	// Print Request Details
	table.push([]);
	table.push([chalk.bold("Request Details")]);
	table.push(["URL", stringifyObject(record.request.url)]);
	table.push(["HTTP Referer", (referer && referer.length > 0) ? stringifyObject(referer) : ""]);
	table.push(["IP Address", stringifyObject(record.request.ip)]);
	var queryString = record.request.queryString;
	if (Object.keys(queryString).length > 0) {
		for (var key in queryString) {
			table.push(["[Query String] " + key + "=", queryString[key]]);
		}
	}

	// Print Response Details
	table.push([]);
	table.push([chalk.bold("Response Details")]);
	table.push(["HTTP Status", stringifyObject(record.response.httpStatus)]);
	table.push(["Response Code", stringifyObject(record.response.code)]);
	table.push(["Response Message", stringifyObject(record.response.message)]);
	var headers = record.response.headers;
	for (var key in headers) {
		table.push(["[Response Header] " + key, headers[key]]);
	}

	var t = Table(table);

	console.log(t);

	console.log("\n==================================================\n");
};


