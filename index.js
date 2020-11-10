const { ShardingManager } = require("discord.js");
const { token } = require("./config.js");

const manager = new ShardingManager("./bot.js", {
	token: token,
	totalShards: "auto",
});

manager.spawn();
manager.on("shardCreate", (shard) => {
	console.log(`Shard Thread launched with ID: ${shard.id}`);
});
manager.on("shardError", (error) => {
	console.log(`A websocket connection encountered an error ${error.stack}`);
});
