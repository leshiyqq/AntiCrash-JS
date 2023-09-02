const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
let pu = require(`${process.cwd()}/models/profileuser.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Показать ваш профиль'),

    async execute(interaction) {

        const findDocs = await pu.findOne({ uid: interaction.user.id });
        const e = new EmbedBuilder()
        .setColor('Random')
        .setTitle("Профиль")
        .setDescription(`Ваш айди: **${findDocs.uid}**\nДеньги: **${findDocs.money}**`)
        .setFooter({ text: `Вызвал: ${interaction.user.username}`})
        if (interaction.user.avatarURL() !== null) e.setThumbnail(`${interaction.user.avatarURL()}`);

        await interaction.reply({embeds: [e]});
        
    }
}