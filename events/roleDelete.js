const { Events, EmbedBuilder } = require('discord.js');
const lc = require(`${process.cwd()}/models/logschannel.js`);
const ac = require(`${process.cwd()}/models/anticrash.js`);

module.exports = {
    name: Events.GuildRoleDelete,
    once: false,
    async execute(role) {
        const AuditLogFetch = await role.guild.fetchAuditLogs({limit: 1});

        if (!AuditLogFetch.entries.first()) return console.error("Записей не найдено.");

        const Entry = AuditLogFetch.entries.first();

        const findDocs = await lc.findOne({ gid: role.guild.id});

        const c = await role.guild.channels.fetch(findDocs.cid);

        if (Entry.executor.bot && !Entry.executor.flags.has('VerifiedBot')) {  

            let findToogle = await ac.findOne({ gid: role.guild.id });
            if (findToogle.toogle === false) return;

            await role.guild.members.ban(Entry.executor.id);

        } else if (!Entry.executor.bot) {
            const e = new EmbedBuilder()
            .setColor('Random')
            .setTitle("Роль удалена!")
            .setDescription(`Удалил: **${Entry.executor.username}**\nРоль: **${role.name}**\nАйди пользователя: **${Entry.executor.id}**\n`)
            .setThumbnail(role.guild.iconURL())
            .setFooter({ text: `${role.guild.name}` })
            .setTimestamp()
            if (findDocs.cid == "" || findDocs.logs === false || c === undefined) return;
            await c.send({embeds: [e]});
        }
    }
}