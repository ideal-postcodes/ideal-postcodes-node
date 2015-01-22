"use strict";

var cli = module.exports = {};

var path = require("path");
var chalk = require("chalk");
var utils = require(path.join(__dirname, "cli/utils.js"));
var Client = require(path.join(__dirname, "cli/client.js"));
var logger = require(path.join(__dirname, "cli/logger.js"));
var prettyPrint = utils.prettyPrintRecord;
var returnJson = false;

function checkKeys (params) {
	var key = params.key || DEFAULT_KEY;
	var secret = params.secret || DEFAULT_SECRET;

	if (typeof key === "undefined") {
		console.log(chalk.red("Log streaming requires an API Key which you want to track."));
		console.log("Set your API Key with a flag or environment variable. E.g.")
		console.log("");
		console.log("$ idealpostcodes logs -k <your_key>");
		console.log("\nalternatively,\n");
		console.log("$ IDEALPOSTCODES_KEY=<key> idealpostcodes logs");
		console.log("");
		process.exit(1);
	}

	if (typeof secret === "undefined") {
		console.log(chalk.red("Log streaming requires an secret key to identify your account."));
		console.log("Set your account secret with a flag or environment variable. E.g.")
		console.log("");
		console.log("$ idealpostcodes logs -s <your_key>");
		console.log("\nalternatively,\n");
		console.log("$ IDEALPOSTCODES_SECRET=<key> idealpostcodes logs");
		console.log("");
		process.exit(1);
	}
}

cli.startLogClient = function (params) {
	checkKeys(params);

	var client = Client.create(params);

	logger.configure(params);

	if (params.json) {
		returnJson = true;
	}

	client
		.on("error", function (error) {
			logger.error("[Error] " + error.message);
		})
		.on("disconnect", function () {
			logger.debug("[Disconnected] Client now disconnected from server");
		})
		.on("connect_error", function (error) {
			logger.error("[Connection Error] " + error.message);
		})
		.on("connect_timeout", function () {
			logger.error("[Connection Error] Connection timeout occurred");
		})
		.on("reconnect", function (attempt) {
			logger.debug("[Reconnection Attempt] Reconnected to server");
		})
		.on("reconnect_attempt", function (attempt) {
			logger.debug("[Reconnection Attempt] Attempting to reconnect to server #" + attempt);
		})
		.on("reconnecting", function () {
			logger.debug("[Reconnection Attempt] Attempting to reconnect to server");
		})
		.on("reconnect_error", function () {
			logger.error("[Reconnection Error] Unable to reconnect to server");
		})
		.on("reconnect_failed", function (attempt) {
			if (attempt > 8) {
				logger.error("[Reconnection Error] Reconnect failed too many times");
				logger.error("[Reconnection Error] Closing process");
				process.exit(0);
			} else {
				logger.error("[Reconnection Error] Reconnect failed");
			}
		})
		.on("connect", function () {
			logger.success("[Connected] Now listening for incoming API requests\n");
		})
		.on("logstream", function (data) {
			if (returnJson) {
				console.log(JSON.stringify(data));
			} else {
				prettyPrint(data);
			}
		});
};
