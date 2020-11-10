const { ch_name, color } = require("../config");

const sendMessage = (client, msg, ch) => {
	const channel = client.channels.cache.find((ch) => ch.name === ch_name);

	ch.send(`Test ${color}`);
};

module.exports = {
	sendMessage,
};
