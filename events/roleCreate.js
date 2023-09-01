const { Events, EmbedBuilder } = require('discord.js');
let lc = require(`${process.cwd()}/models/logschannel.js`);

module.exports = {
    name: Events.GuildRoleCreate,
    once: false,   
    async execute(role) {
        const AuditLogFetch = await role.guild.fetchAuditLogs({limit: 1});

        if (!AuditLogFetch.entries.first()) return console.error("Записей не найдено.");

        const Entry = AuditLogFetch.entries.first();

        const findDocs = await lc.findOne({ gid: role.guild.id});

        const c = await role.guild.channels.fetch(findDocs.cid);

        if (Entry.executor.bot && !Entry.executor.flags.has('VerifiedBot')) {   

            await role.guild.members.ban(Entry.executor.id);
            if (findDocs.cid == "" || findDocs.logs === false) return;
            else await c.send(`Я забанил - ${Entry.executor.username} за подозрение в краше сервера`);

        } else if (!Entry.executor.bot) {
            const e = new EmbedBuilder()
            .setColor('Random')
            .setTitle("Роль создана!")
            .setDescription(`Создал: **${Entry.executor.username}**\nРоль: **${role.name}**\nАйди пользователя: **${Entry.executor.id}**\nАйди роли: **${role.id}**`)
            .setFooter({ text: `${role.guild.name}`})
            .setTimestamp()
            if (role.guild.iconURL() !== null) e.setThumbnail(`${role.guild.iconURL()}`)
            if (findDocs.cid == "" || findDocs.logs === false) return;
            else await c.send({embeds: [e]});
        }
    }
}