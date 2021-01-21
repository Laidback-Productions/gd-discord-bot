module.exports.config = {
	name: "clearchat",
	description: "Chat clearing command",
	category: "utility",
	usage: "clearchat <n>",
	cooldown: 0,
};

module.exports.execute = (client, msg, args) => {
	if (msg.author.id != msg.guild.ownerID) return;

	const deletionLimit = 25;
	const msgToDelete = Number(args);

	client.monitor(
		`Chat deletion by ${msg.author}, deleted ${msgToDelete} messages.`,
		"LOG",
	);

	if (isFinite(args) && args.length > 0) {
		if (Number(args) <= deletionLimit) {
			const clear = async () => {
				msg.delete();
				let fetched = await msg.channel.messages.fetch({
					limit: msgToDelete,
				});
				msg.channel.bulkDelete(fetched);
			};
			clear();
		} else {
			msg.reply(`You can only delete ${deletionLimit} messages!`);
		}
	} else {
		msg.channel.send("You didn't provide any args.");
	}
};
