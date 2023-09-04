const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Отправляет пинг бота"),

    async execute(interaction) {
        const e = new EmbedBuilder()
        .setColor("Random")
        .setTitle("**Pong!**")
        .setDescription(`**${Date.now() - interaction.createdTimestamp}ms latency!**\n**${Math.round(interaction.client.ws.ping)}ms API!**`)
        .setThumbnail(interaction.user.avatarURL())
        .setFooter({ text: `Вызвал: ${interaction.user.username}` });
        await interaction.reply({ embeds: [e] });
    }
}
