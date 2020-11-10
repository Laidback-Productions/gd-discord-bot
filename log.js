const fs = require("fs");
const logStream = fs.createWriteStream("logs/logfile.txt", {
	encoding: "utf-8",
});
const chalk = require("chalk");
const moment = require("moment");

module.exports.log = (content, type = "LOG") => {
	const timestamp = `[${moment().format("YYYY-MM-DD A hh:mm:ss:SSS")}]`;
	type = type.toUpperCase();
	let msg_context = "";

	switch (type) {
		case "LOG": {
			msg_context = `${timestamp} ${chalk.black.blue(type)} ${content}`;
			logStream.write(`${msg_context}\n`);
			return console.log(`${timestamp} ${chalk.black.blue(type)} ${content}`);
		}
		case "WARN": {
			msg_context = `${timestamp} ${chalk.yellow(type)} ${content}`;
			logStream.write(`${msg_context}\n`);
			return console.log(`${timestamp} ${chalk.yellow(type)} ${content}`);
		}
		case "ERROR": {
			msg_context = `${timestamp} ${chalk.red(type)} ${content}`;
			logStream.write(`${msg_context}\n`);
			return console.log(`${timestamp} ${chalk.red(type)} ${content}`);
		}
		case "DEBUG": {
			msg_context = `${timestamp} ${chalk.cyan(type)} ${content}`;
			logStream.write(`${msg_context}\n`);
			return console.log(`${timestamp} ${chalk.cyan(type)} ${content}`);
		}
		case "CMD": {
			msg_context = `${timestamp} ${chalk.gray(type)} ${content}`;
			logStream.write(`${msg_context}\n`);
			return console.log(`${timestamp} ${chalk.gray(type)} ${content}`);
		}
		case "READY": {
			msg_context = `${timestamp} ${chalk.green(type)} ${content}`;
			logStream.write(`${msg_context}\n`);
			return console.log(`${timestamp} ${chalk.green(type)} ${content}`);
		}
		default:
			msg_context = `${timestamp} ${chalk.black.bgYellow(
				"WARN",
			)} Wrong monitor type. Type was: ${chalk.black.bgYellow(
				type,
			)} Content was: ${content}`;
			logStream.write(`${msg_context}\n`);
			return console.log(
				`${timestamp} ${chalk.black.bgYellow(
					"WARN",
				)} Wrong monitor type. Type was: ${chalk.black.bgYellow(
					type,
				)} Content was: ${content}`,
			);
		/*  throw new TypeError(
        "Logger type must be either warn, debug, log, ready, cmd or error."
      ); */
	}
};

//Use this for testing the colors
/* this.log("Monitor initialized.", "LOG");
this.log("Monitor initialized.", "WARN");
this.log("Monitor initialized.", "ERROR");
this.log("Monitor initialized.", "DEBUG");
this.log("Monitor initialized.", "CMD");
this.log("Monitor initialized.", "READY"); */

this.log("Monitor initialized.", "READY");

module.exports.error = (...args) => this.log(...args, "error");

module.exports.warn = (...args) => this.log(...args, "warn");

module.exports.debug = (...args) => this.log(...args, "debug");

module.exports.cmd = (...args) => this.log(...args, "cmd");
