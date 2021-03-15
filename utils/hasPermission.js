// Check if the user has a valid permission
const hasPermission = (client, user, permission) => {
	if (!typeof permission === String) return;
	if (user.hasPermission(permission)) {
		return true;
	} else {
		return false;
	}
};

module.exports = { hasPermission };

/*
 * Usage:
 * if (!hasPermission(client, msg.guild.member(msg.author), "ADMINISTRATOR")) return;
 */
