const { debug } = require("../config");

module.exports = (client, d) => {
	const dbg = debug == "true";
	if (dbg) {
		client.monitor(d, "debug");
	}
};
