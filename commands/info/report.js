const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const DMUserid = require(`${process.cwd()}/config.json`).DMUserid;
const errEmb = require(`${process.cwd()}/models/errEmbed.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('report')
    .setDescription('Пожаловаться на ошибку в боте')
    .addStringOption(option =>
        option
        .setName('message')
        .setDescription('Укажите в чем проявилась ошибка')
        .setRequired(true)
    ),
    async execute(interaction) {
        const message = interaction.options.getString('message');
        const user = interaction.client.users.cache.get(DMUserid);
        if (!user) return;

        const e = new EmbedBuilder()
        .setColor('DarkRed')
        .setTitle("Репорт!")
        .setDescription(`**Текст:** ${message}\n**User ID:** **${interaction.user.id}**\n**From:** **${interaction.guild.name}**`)
        .setFooter({text: `Отправил: ${interaction.user.username}`})
        .setThumbnail(`${interaction.user.avatarURL()}`)
        .setTimestamp()
        try {
            await user.send({embeds: [e]});
            await interaction.reply("Репорт отправлен!");
        } catch (e) {
            await interaction.reply({embeds: [errEmb]});
        }
    }
}