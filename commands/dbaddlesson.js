const { db } = require("../db/database");

module.exports.config = {
	name: "addlesson",
	description: "Adds a lesson",
	category: "lesson",
	usage: "addlesson <lessonname>",
	cooldown: 0,
};

module.exports.execute = (client, msg, args) => {
	msg.channel.send(`Added keys and values: `);
};
