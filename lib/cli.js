"use strict";

var cli = module.exports = {};

var path = require("path");
var chalk = require("chalk");
var Client = require(path.join(__dirname, "cli/client.js"));
var utils = require(path.join(__dirname, "cli/utils.js"));
var toString = utils.stringifyObject;
var prettyPrint = utils.prettyPrintRecord;
var quiet = false;
var returnJson = false;

function logError(msg) {
	if (!quiet) {
		console.log(chalk.red(msg));	
	}
}

function debug(msg) {
	if (!quiet) {
		console.log(chalk.blue(msg));
	}
}

function success(msg) {
	if (!quiet) {
		console.log(chalk.green(msg));
	}
}

function printRecord(data) {
	if (returnJson) {
		console.log(JSON.stringify(data));
	} else {
		prettyPrint(data);
	}
}

cli.startLogClient = function (params) {
	var client = Client.create(params);

	if (params.quiet) {
		quiet = true;
	}

	if (params.json) {
		returnJson = true;
	}

	client
		.on("error", logError)
		.on("disconnect", function () {
			debug("Disconnected from server");
		})
		.on("connect_error", function (error) {
			logError("Connection error: " + error);
		})
		.on("connect_timeout", function () {
			logError("Connection timedout");
		})
		.on("reconnect", function (connectionAttempt) {
			debug("Reconnected to server.");
		})
		.on("Reconnecting", function () {
			debug("Attempting to reconnect to server");
		})
		.on("reconnect_error", function () {
			logError("Unable to reconnect to server");
		})
		.on("reconnect_failed", function () {
			logError("Reconnect failed");
		})
		.on("connect", function () {
			success("Now listening for incoming API requests\n");
		})
		.on("record", printRecord);
};

