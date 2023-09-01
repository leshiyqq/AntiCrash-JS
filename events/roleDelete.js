const { Events } = require('discord.js');
let lc = require(`${process.cwd()}/models/logschannel.js`)

module.exports = {
    name: Events.GuildRoleDelete,
    once: false,
    async execute(role) {
        const AuditLogFetch = await role.guild.fetchAuditLogs({limit: 1});
        const findDocs = await lc.findOne({ gid: role.guild.id});

        const Entry = AuditLogFetch.entries.first();

        if (!Entry.executor.bot && !Entry.executor.flags.has('VerifiedBot')) role.guild.members.cache.get(Entry.executor.id);

        if (findDocs.cid == null) return;
        const logc = await role.guild.channels.fetch(findDocs.cid);
        await logc.send(`**${Entry.executor.username}** has deleted a role "**${role.name}**"`);
    }
}