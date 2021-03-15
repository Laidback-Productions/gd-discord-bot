const { prefix } = require("../config.js");

module.exports = (client, msg) => {
	const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
	const prefixes = msg.content.match(prefixMention) ? msg.content.match(prefixMention)[0] : prefix;

	let args = msg.content.substring(prefixes.length).split(" ");
	let command = args.shift().toLowerCase();

	if (msg.channel.type == "dm") return;
	if (!msg.author.bot) client.monitor(`${msg.author.username}: ${command} ${args}`);

	if (!msg.content.startsWith(prefixes) || msg.author.bot) return;
	if (!client.commands.has(command))
		return msg.channel.send("Command not found").then((m) => m.delete({ timeout: 5000 }));

	try {
		client.commands.get(command).execute(client, msg, args);
	} catch (error) {
		msg.channel
			.send(`Command not found or executed properly. \nError: ${error}`)
			.then((m) => m.delete({ timeout: 5000 }));
	}
};
