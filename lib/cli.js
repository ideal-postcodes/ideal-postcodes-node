"use strict";

var cli = module.exports = {};

var path = require("path");
var chalk = require("chalk");
var Client = require(path.join(__dirname, "cli/client.js"));
var utils = require(path.join(__dirname, "cli/utils.js"));
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
		.on("error", function (error) {
			logError("[Error] " + error.message);
		})
		.on("disconnect", function () {
			debug("[Disconnected] Client now disconnected from server");
		})
		.on("connect_error", function (error) {
			logError("[Connection Error] " + error.message);
		})
		.on("connect_timeout", function () {
			logError("[Connection Error] Connection timeout occurred");
		})
		.on("reconnect", function (attempt) {
			debug("[Reconnection Attempt] Reconnected to server");
		})
		.on("reconnect_attempt", function (attempt) {
			debug("[Reconnection Attempt] Attempting to reconnect to server #" + attempt);
		})
		.on("reconnecting", function () {
			debug("[Reconnection Attempt] Attempting to reconnect to server");
		})
		.on("reconnect_error", function () {
			logError("[Reconnection Error] Unable to reconnect to server");
		})
		.on("reconnect_failed", function () {
			logError("[Reconnection Error] Reconnect failed");
		})
		.on("connect", function () {
			success("[Connected] Now listening for incoming API requests\n");
		})
		.on("logstream", printRecord);
};

