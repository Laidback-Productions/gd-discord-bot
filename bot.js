const fs = require("fs");
const { token } = require("./config.js");
const Discord = require("discord.js");
const monitor = require("./log");

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.monitor = monitor.log;

fs.readdir("./commands/", (err, files) => {
	client.monitor(`Loading ${files.length} commands`);
	if (err) return console.error(err);
	files.forEach((file) => {
		if (!file.endsWith(".js")) return;
		let props = require(`./commands/${file}`);
		let commandName = file.split(".")[0];
		/* client.monitor(`Loading command: ${commandName}`); */
		client.commands.set(commandName, props);
	});
});

fs.readdir("./events/", (err, files) => {
	client.monitor(`Loading ${files.length} events`);
	if (err) return console.error(err);
	files.forEach((file) => {
		if (!file.endsWith(".js")) return;
		const event = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		/* client.monitor(`Loading event: ${eventName}`); */
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/${file}`)];
	});
});

// client.on("debug", (e) => client.monitor(e, "debug"));
client.on("error", (e) => client.monitor(e, "error"));
client.on("warn", (e) => client.monitor(e, "warn"));

client.login(token);
