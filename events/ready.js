const Constants = require("discord.js/src/util/Constants.js");
Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`;

module.exports = (client) => {
	let users = client.users.cache.size;
	let servers = client.guilds.cache.size;
	let channels = client.channels.cache.size;

	client.user.setActivity("Working.", { type: 1, browser: "DISCORD IOS" });
	client.monitor(`${client.user.username} is ready!`, "ready");
	client.monitor(
		`Ready to serve on ${servers} servers, in ${channels} channels, for ${users} users.`,
		"ready",
	);
};
