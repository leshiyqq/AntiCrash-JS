const { Events } = require('discord.js');
let lc = require(`${process.cwd()}/models/logschannel.js`);

module.exports = {
	name: Events.ChannelDelete,
	once: false,
	async execute(channel) {
		if (!channel.guild) return false;

	    const AuditLogFetch = await channel.guild.fetchAuditLogs({limit: 1});

		if (!AuditLogFetch.entries.first()) return console.error(`No entries found.`);

	    const Entry = AuditLogFetch.entries.first();

		const findDocs = lc.findOne({ gid: channel.guild.id });

	    if (Entry.executor.bot && !Entry.executor.flags.has("VerifiedBot")) {

			await channel.guild.members.kick(Entry.executor.id);
            const c = await channel.guild.channels.fetch(findDocs.cid);
			if (findDocs.cid == null) return;
			else await c.send(`Я забанил - ${Entry.executor.username} за подозрение в краше сервера`);

		}
    }
};