const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const lc = require(`${process.cwd()}/models/logschannel.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName("server-info")
    .setDescription("Показывает информацию про сервер")
    .setDMPermission(false),

    async execute(interaction) {
        const guild = interaction.client.guilds.cache.get(interaction.guild.id);

        const gc = guild.createdAt;
        const year = gc.getFullYear(), month = gc.getMonth(), date = gc.getDate();
        const res = `${date}d ${month}m ${year}`;

        const findDocs = await lc.findOne({ gid: interaction.guild.id });
        const logs = findDocs.logs;
        let logs_channel = null;
        if (findDocs.cid !== "") logs_channel = interaction.guild.channels.cache.get(`${findDocs.cid}`);


        const e = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Информация про сервер")
        .setFooter({ text: `Вызвал: ${interaction.user.username}`, iconURL: guild.iconURL(), inline: true })
        .setThumbnail(guild.iconURL())
        .setTimestamp()
        .addFields({ name: "Название", value: guild.name, inline: true })
        .addFields({ name: "Дата создания", value: res, inline: true })
        .addFields({ name: "Участников", value: `${guild.memberCount}`, inline: true })
        .addFields({ name: "Каналов", value: `${guild.channels.channelCountWithoutThreads}`, inline: true })
        .addFields({ name: "Логи", value: logs ? "Включены" : "Отключены", inline: true });

        if (logs_channel !== undefined && logs_channel !== null) e.addFields({ name: "Канал логов", value: logs_channel.name, inline: true });

        await interaction.reply({ embeds: [e] });
    }
}
