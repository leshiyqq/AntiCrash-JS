const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Показывает информацию про сервер'),
    async execute(interaction) {
        const guild = interaction.client.guilds.cache.get(interaction.guild.id);

        const gc = guild.createdAt;
		const year = gc.getFullYear(), month = gc.getMonth(), date = gc.getDate();
 		const res = `${date}d ${month}m ${year}`;


        const e = new EmbedBuilder()
        .setColor('Random')
        .setTitle("Информация про сервер")
        .addFields({name: "Название", value: guild.name, inline: true})
        .addFields({name: "Дата создания", value: res, inline: true})
        .addFields({name: "Участников", value: `${guild.memberCount}`, inline: true})
        .addFields({name: "Каналов", value: `${guild.channels.channelCountWithoutThreads}`, inline: true})
        .setFooter({ text: `Вызвал: ${interaction.user.username}`, inline: true})
        if (guild.iconURL() !== null) e.setThumbnail(`${guild.iconURL()}`)
        .setTimestamp()
        await interaction.reply({embeds: [e]});
    }
}