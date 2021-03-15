const Discord = require("discord.js");
const { color } = require("../config");

module.exports.config = {
	name: "random",
	enabled: true,
	description: "Random message by somebody",
	category: "fun",
	usage: "random <@User>",
	cooldown: 0,
};

module.exports.execute = async (client, msg, args) => {
	let fetchedMessages = new Discord.Collection();
	// TODO: Check if the user is a tagged user
	const taggedUser = msg.mentions.members.first();
	// TODO: Reject self requests
	if (taggedUser.user.id === client.user.id) return;
	if (!taggedUser) return msg.channel.send("You didn't mentioned anybody!");
	// TODO: Check if the user is in the guild
	if (!msg.guild.member(taggedUser))
		return msg.channel.send("The mentioned user is not available in the server.");
	// TODO: Fetch the user's messages (Filter out null and empty spaced messages by cache)
	// TODO: Store messages
	const channel = msg.channel || client.channels.cache.get("723864971213275147");
	await channel.messages.fetch({ limit: 100 }).then((messages) => {
		messages
			.filter((m) => m.content !== "")
			.filter((m) => m.author.id === taggedUser.user.id)
			.forEach((message) => {
				fetchedMessages.set(message.id, message.content);
			});
	});
	// TODO: Random message callback
	const randomMessage = fetchedMessages.random();
	// TODO: Setup embed
	const taggedAvatar = taggedUser.user.avatarURL({
		format: "png",
		dynamic: true,
		size: 1024,
	});
	const clientAvatar = client.user.avatarURL({
		format: "png",
		dynamic: true,
		size: 1024,
	});
	const rndMsgEmbed = new Discord.MessageEmbed()
		.setColor(color)
		.setTitle("Random Message")
		.setAuthor(client.user.username, clientAvatar)
		.setDescription(`${randomMessage}`)
		.setThumbnail(taggedAvatar)
		.setTimestamp()
		.setFooter("All rights reserved. Copyright (c) LAIDBACK", clientAvatar);
	// TODO: Send pretty embed
	msg.channel.send(rndMsgEmbed);
};
