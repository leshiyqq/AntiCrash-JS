const { Events, EmbedBuilder } = require('discord.js');
let lc = require(`${process.cwd()}/models/logschannel.js`);

module.exports = {
	name: Events.ChannelDelete,
	once: false,
	async execute(channel) {
		if (!channel.guild) return false;

	    const AuditLogFetch = await channel.guild.fetchAuditLogs({limit: 1});

		if (!AuditLogFetch.entries.first()) return console.error("Записей не найдено.");

	    const Entry = AuditLogFetch.entries.first();

		const findDocs = await lc.findOne({ gid: channel.guild.id });

		const c = await channel.guild.channels.fetch(findDocs.cid);

	    if (Entry.executor.bot && !Entry.executor.flags.has("VerifiedBot")) {

			await channel.guild.members.ban(Entry.executor.id);
			if (findDocs.cid == "" || findDocs.logs === false) return;
			else await c.send(`Я забанил - ${Entry.executor.username} за подозрение в краше сервера`);

		} else if (!Entry.executor.bot) {
			const e = new EmbedBuilder()
            .setColor('Random')
            .setTitle("Канал удален!")
            .setDescription(`Удалил: **${Entry.executor.username}**\nКанал: **${channel.name}**\nАйди пользователя: **${Entry.executor.id}**`)
            .setFooter({ text: `${channel.guild.name}`})
            .setTimestamp()
			if (channel.guild.iconURL() !== null) e.setThumbnail(`${channel.guild.iconURL()}`);
            if (findDocs.cid == "" || findDocs.logs === false) return;
            else await c.send({embeds: [e]});
        }
    }
};