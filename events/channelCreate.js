const { Events, EmbedBuilder } = require('discord.js');
const lc = require(`${process.cwd()}/models/logschannel.js`);
const ac = require(`${process.cwd()}/models/anticrash.js`);

module.exports = {
	name: Events.ChannelCreate,
	once: false,
	async execute(channel) {
		if (!channel.guild) return false;

        const AuditLogFetch = await channel.guild.fetchAuditLogs({limit: 1});

        if (!AuditLogFetch.entries.first()) return console.error("Записей не найдено.");

        const Entry = AuditLogFetch.entries.first();

        const findDocs = await lc.findOne({ gid: channel.guild.id });
        
        const c = await channel.guild.channels.fetch(findDocs.cid);

        if (Entry.executor.bot && !Entry.executor.flags.has("VerifiedBot")) {

            let findToogle = await ac.findOne({ gid: channel.guild.id });
            if (findToogle.toogle === false) return;

            await channel.guild.members.ban(Entry.executor.id);

        } else if (!Entry.executor.bot) {
            const e = new EmbedBuilder()
            .setColor('Random')
            .setTitle("Канал создан!")
            .setDescription(`Создал: **${Entry.executor.username}**\nКанал: **${channel.name}**\nАйди пользователя: **${Entry.executor.id}**\nАйди канала: **${channel.id}**`)
            .setThumbnail(channel.guild.iconURL())
            .setFooter({ text: `${channel.guild.name}`})
            .setTimestamp()
            if (findDocs.cid == "" || findDocs.logs === false || c == undefined) return;
            await c.send({embeds: [e]});
        }
    }
}