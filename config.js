require("dotenv").config();

module.exports = {
	debug: process.env.ENV_DEBUG,
	token: process.env.BOT_TOKEN,
	prefix: process.env.BOT_PREFIX,
	ch_name: process.env.BOT_CH,
	color: process.env.BOT_COLOR,
	ownerID: process.env.OWNER_ID,
};
