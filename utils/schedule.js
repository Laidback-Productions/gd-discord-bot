const Discord = require("discord.js");
const cronJob = require("cron").CronJob;

const { db, handleAdd, handleDelete } = require("../db/database");
const { color, ch_name } = require("../config");
const { lessons } = require("../resources/lessons");

const scheduler = async (client) => {
	client.monitor("Schedule module initialized.", "READY");

	const timeZone = "Europe/Budapest";

	lessons.forEach((ls) => {
		const { enabled, pattern, lesson } = ls;

		if (enabled) {
			handleAdd("scheduled_lessons", ls);
			const job = new cronJob(
				pattern,
				() => {
					schedule(client, ls);
					client.monitor(`Schedule ran at ${pattern}, with ${lesson}lesson`, "DEBUG");
				},
				timeZone,
			).start();
		}
	});

	client.monitor("Lessons scheduled successfully.", "LOG");
};

const schedule = (client, lesson) => {
	const channel = client.channels.cache.find((ch) => ch.name === ch_name);

	const csoportA = "693739523242459146";
	const csoportB = "693739662581301250";

	const avatar = client.user.avatarURL({
		format: "png",
		dynamic: true,
		size: 1024,
	});

	const lessonEmbed = new Discord.MessageEmbed()
		.setColor(color)
		.setTitle(lesson.lesson)
		.setURL(lesson.link)
		.setAuthor(lesson.teacher, avatar, lesson.link)
		.setDescription("Hamarosan kezdődik az óra.\n(Az értesítés 10percig él)")
		.setThumbnail(avatar)
		.addFields(
			// { name: "\u200B", value: "\u200B" },
			{ name: "Óra", value: lesson.lesson, inline: true },
			{
				name: "Csoport",
				value: lesson.group === 1 ? "A csoport" : lesson.group === 2 ? "B Csoport" : "Közös",
				inline: true,
			},
			{ name: "Tanár", value: lesson.teacher, inline: true },
			// { name: "\u200B", value: "\u200B" },
		)
		.setTimestamp()
		.setFooter("All rights reserved. Copyright (c) LAIDBACK", avatar);

	if (lesson.group === 1) {
		channel.send(`<@&${csoportA}>`).then((m) => {
			m.delete({ timeout: 600000 });
		});
	} else if (lesson.group === 2) {
		channel.send(`<@&${csoportB}>`).then((m) => {
			m.delete({ timeout: 600000 });
		});
	} else {
		channel.send(`<@&${csoportA}> <@&${csoportB}>`).then((m) => {
			m.delete({ timeout: 600000 });
		});
	}

	channel.send(lessonEmbed).then((m) => {
		m.delete({ timeout: 600000 });
	});
};

module.exports = { scheduler, schedule };
