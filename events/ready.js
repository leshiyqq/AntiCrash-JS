const { Events, ActivityType } = require('discord.js');
const pu = require(`${process.cwd()}/models/profileuser.js`);
const ac = require(`${process.cwd()}/models/anticrash.js`);

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`${client.user.username} ready!`);
	    client.user.setPresence({
		    activities: [{
			    name: 'AntiCrash MAIN!',
			    type: ActivityType.Streaming,
			    url: 'https://twitch.tv/leshiytt'
		    }],
	    })
		client.guilds.cache.forEach(async (guild) => {
			guild.members.cache.forEach(async (member) => {
				const findDocs = await pu.findOne({ uid: member.user.id});
				if (!findDocs) {
					const docs = new pu({ uid: member.user.id, gid: member.guild.id, money: "0" });
					docs.save();
				}
			})
		})

        client.guilds.cache.forEach(async (guild) => {
            const findDocs = await ac.findOne({ gid: guild.id })
            if (!findDocs) {
                const docs = new ac({ toogle: true, gid: guild.id});
                docs.save();
            }
        })
	}
}