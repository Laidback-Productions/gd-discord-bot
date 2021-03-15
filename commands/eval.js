const { ownerID } = require("../config");

module.exports.config = {
	name: "template",
	enabled: false,
	description: "Development Template Command",
	category: "template",
	usage: "template",
	cooldown: 0,
};

module.exports.execute = (client, msg, args) => {
	if (msg.author.id !== ownerID) return;

	const clean = (text) => {
		if (typeof text === "string")
			return text
				.replace(/`/g, "`" + String.fromCharCode(8203))
				.replace(/@/g, "@" + String.fromCharCode(8203));
		else return text;
	};

	try {
		const code = args.join(" ");
		let evaled = eval(code);

		if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

		msg.channel.send(clean(evaled), { code: "xl" });
	} catch (err) {
		msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
	}
};
