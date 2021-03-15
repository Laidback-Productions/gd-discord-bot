const { db, handleGet } = require("../db/database");

module.exports.config = {
	name: "getLesson",
	enabled: true,
	description: "Queries the current lesson",
	category: "lesson",
	usage: "getlesson <lessonname|id>",
	cooldown: 0,
};

module.exports.execute = (client, msg, args) => {
	console.log(handleGet(args));
	const getData = async () => {
		handleGet(args).then((data) => {
			return data;
		});
	};
	msg.channel.send(`Evaluated database: ${getData()}`);
};
