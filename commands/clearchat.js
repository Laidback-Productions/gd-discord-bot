module.exports.config = {
	name: "clearchat",
	enabled: true,
	description: "Chat clearing command",
	category: "utility",
	usage: "clearchat <n>",
	cooldown: 0,
};

module.exports.execute = (client, msg, args) => {
	if (msg.author.id != msg.guild.ownerID) return;

	const deletionLimit = 25;
	const msgToDelete = Number(args);

	client.monitor(`Chat deletion by ${msg.author}, deleted ${msgToDelete} messages.`, "LOG");

	if (isFinite(args) && args.length > 0) {
		if (Number(args) <= deletionLimit) {
			const clear = async () => {
				msg.delete();
				let fetched = await msg.channel.messages.fetch({
					limit: msgToDelete,
				});
				msg.channel
					.bulkDelete(fetched)
					.then((x) =>
						msg.channel
							.send(`Successfully deleted ${msgToDelete} message(s).`)
							.then((m) => m.delete({ timeout: 5000 })),
					)
					.catch((e) =>
						msg.channel
							.send("14 days old messages are delted already, cannot delete older ones.")
							.then((m) => m.delete({ timeout: 5000 })),
					);
			};
			clear();
		} else {
			msg
				.reply(`You can only delete ${deletionLimit} messages!`)
				.then((m) => m.delete({ timeout: 5000 }));
		}
	} else {
		msg.channel.send("You didn't provide any args.").then((m) => m.delete({ timeout: 5000 }));
	}
};
