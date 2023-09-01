const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`${client.user.username} ready!`);
	    client.user.setPresence({
		    activities: [{
			    name: 'AntiCrash by leshiy | 0.5',
			    type: ActivityType.Streaming,
			    url: 'https://twitch.tv/leshiytt'
		    }],
	    })
	},
};