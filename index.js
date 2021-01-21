const { ShardingManager } = require("discord.js");
const { token } = require("./config.js");

const manager = new ShardingManager("./bot.js", {
	token: token,
	totalShards: "auto",
});

manager.spawn();
manager.on("shardCreate", (shard) => {
	console.log(
		`Shard Thread launched with ID: ${shard.id} out of ${manager.totalShards} totalshards.`,
	);
});

manager.on("shardResume", (shard, replayed) =>
	console.log(
		`Shard ID ${shard.id} resumed connection and replayed ${replayed} events.`,
	),
);
manager.on("shardDeath", (process) => {
	console.log(`A websocket connection error PID: ${process.pid}`);
	if (process.exitCode === null) {
		console.log("Warning shard exited with null zero code.");
	}
});

manager.on("shardDisconnect", (event) => {
	console.log(`Shard disconnected dumping socket.\n ${event}`);
});
manager.on("shardReconnect", () => {
	console.log(`Shard reconnecting`);
});
manager.on("shardError", (error) => {
	console.log(`A websocket connection encountered an error.\n${error}`);
});
