const { scheduler } = require("../utils/schedule");

module.exports = (client) => {
	let users = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
	let servers = client.guilds.cache.size;
	let channels = client.channels.cache.size;

	client.user.setActivity("Working.", { type: 2, browser: "DISCORD IOS" });
	client.monitor(`${client.user.username} is ready!`, "ready");
	client.monitor(
		`Ready to serve on ${servers} servers, in ${channels} channels, for ${users} users.`,
		"ready",
	);

	scheduler(client);
};
