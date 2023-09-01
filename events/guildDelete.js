const { Events, EmbedBuilder } = require('discord.js');
const DMUserid = require(`${process.cwd()}/config.json`).DMUserid;

module.exports = {
    name: Events.GuildDelete,
    once: false,
    async execute(guild) {
        const user = guild.client.users.cache.get(DMUserid);

        const owner = guild.client.users.cache.get(guild.ownerId);

        const e = new EmbedBuilder()
        .setColor('DarkRed')
        .setTitle("Бота выгнали/забанили на сервере!")
        .setDescription(`Сервер: **${guild.name}**\nАйди сервера: **${guild.id}**\nУчастников: **${guild.memberCount}**\nОвнер: **${owner.username}**\nАйди овнера: **${owner.id}**`)
        .setThumbnail(`${guild.iconURL()}`)
        .setTimestamp()

        user.send({embeds: [e]});
    }
}