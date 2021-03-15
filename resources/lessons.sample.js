// Sample lesson object for examples

const lessons = [
	{
		id: 1,
		enabled: true,
		pattern: "0 0 8 * * SUN", // This will run every Saturday at 8:00:00 AM once
		group: 2,
		lesson: "TESZT",
		teacher: "Jane Doe",
		link: "https://google.com",
	},
];

module.exports = { lessons };
