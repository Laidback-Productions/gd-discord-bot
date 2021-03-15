const { Structures, GuildMemberManager } = require("discord.js");

Structures.extend("Guild", (Guild) => {
	class CustomGuild extends Guild {
		constructor(client, data) {
			super(client, data);
			console.log(client, data);
		}

		getInfo() {
			return {
				guildName: Guild.name,
				guildMembers: GuildMemberManager.length,
			};
		}
	}
	return CustomGuild;
});
