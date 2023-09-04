const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const DMUserid = require(`${process.cwd()}/config.json`).DMUserid;

module.exports = {
    data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("Пожаловаться на ошибку в боте")
    .addStringOption(option =>
        option
        .setName("message")
        .setDescription("Укажите в чем проявилась ошибка")
        .setRequired(true)
    ),

    async execute(interaction) {
        const message = interaction.options.getString("message");
        const user = interaction.client.users.cache.get(DMUserid);

        const e = new EmbedBuilder()
        .setColor("DarkRed")
        .setTitle("Репорт!")
        .setThumbnail(interaction.user.avatarURL())
        .setDescription(`Текст: **${message}**\nUser ID: **${interaction.user.id}**\nFrom: **${interaction.guild.name}**`)
        .setFooter({ text: `Отправил: ${interaction.user.username}` })
        .setTimestamp()
        
        await user.send({ embeds: [e] });
        await interaction.reply("Репорт отправлен!");
    }
}
