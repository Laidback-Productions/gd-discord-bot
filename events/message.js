const { prefix } = require("../config.js");

module.exports = (client, msg) => {
	let args = msg.content.substring(prefix.length).split(" ");
	let command = args.shift().toLowerCase();

	if (msg.channel.type == "dm") return;
	if (!msg.author.bot)
		client.monitor(`${msg.author.username}: ${command} ${args}`);

	if (!msg.content.startsWith(prefix) || msg.author.bot) return;
	if (!client.commands.has(command))
		return msg.channel
			.send("Command not found")
			.then((m) => m.delete({ timeout: 5000 }));

	try {
		client.commands.get(command).execute(client, msg, args);
	} catch (error) {
		msg.channel
			.send(`Command not executed properly. \nError: ${error}`)
			.then((m) => m.delete({ timeout: 5000 }));
	}
};
