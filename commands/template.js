module.exports.config = {
	name: "template",
	enabled: true,
	description: "Development Template Command",
	category: "template",
	usage: "template",
	cooldown: 0,
};

module.exports.execute = (client, msg, args) => {
	msg.channel.send(`Template command ran successfully!`);
};
