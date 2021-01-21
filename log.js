const chalk = require("chalk");
const moment = require("moment");

module.exports.log = (content, type = "LOG") => {
	const timestamp = `[${moment().format("YYYY-MM-DD A hh:mm:ss:SSS")}]`;
	type = type.toUpperCase();
	let message = "";

	switch (type) {
		case "LOG": {
			message = `${timestamp} ${chalk.black.blue(type)} ${content}`;
			return console.log(message);
		}
		case "WARN": {
			message = `${timestamp} ${chalk.yellow(type)} ${content}`;
			return console.log(message);
		}
		case "ERROR": {
			message = `${timestamp} ${chalk.red(type)} ${content}`;
			return console.log(message);
		}
		case "DEBUG": {
			message = `${timestamp} ${chalk.cyan(type)} ${content}`;
			return console.log(message);
		}
		case "CMD": {
			message = `${timestamp} ${chalk.gray(type)} ${content}`;
			return console.log(message);
		}
		case "READY": {
			message = `${timestamp} ${chalk.green(type)} ${content}`;
			return console.log(message);
		}
		default:
			message = `${timestamp} ${chalk.black.bgYellow(
				"WARN",
			)} Wrong type: ${chalk.black.bgYellow(type)} Content was: ${content}`;

			return console.log(message);
	}
};

// Use this for testing the colors
/*
this.log("Monitor initialized.", "LOG");
this.log("Monitor initialized.", "WARN");
this.log("Monitor initialized.", "ERROR");
this.log("Monitor initialized.", "DEBUG");
this.log("Monitor initialized.", "CMD");
this.log("Monitor initialized.", "READY");
*/

this.log("Monitor initialized.", "READY");

module.exports.error = (...args) => this.log(...args, "error");

module.exports.warn = (...args) => this.log(...args, "warn");

module.exports.debug = (...args) => this.log(...args, "debug");

module.exports.cmd = (...args) => this.log(...args, "cmd");
