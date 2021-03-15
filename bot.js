const fs = require("fs");
const { token } = require("./config.js");
const Discord = require("discord.js");
const monitor = require("./utils/log");

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.monitor = monitor.log;

fs.readdir("./commands/", (err, files) => {
	// Count only JS files instead of folders [...files.filter((f) => f.endsWith(".js"))]
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

client.login(token);
