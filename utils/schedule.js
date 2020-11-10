const { color, ch_name } = require("../config");

const scheduler = (client, day) => {
	console.log(`${client} ${day} ${color} ${ch_name} `);
};

module.exports = {
	scheduler,
};
