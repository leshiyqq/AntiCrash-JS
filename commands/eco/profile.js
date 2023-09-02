const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
let pu = require(`${process.cwd()}/models/profileuser.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Показать ваш профиль')
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('Укажите пользователя')    
    ),

    async execute(interaction) {
        var user = interaction.options.getUser('user');
        if (user === null) user = interaction.user;

        const findDocs = await pu.findOne({ uid: user.id });
        const e = new EmbedBuilder()
        .setColor('Random')
        .setTitle("Профиль")
        .setDescription(`Айди: **${findDocs.uid}**\nДеньги: **${findDocs.money}**`)
        .setFooter({ text: `Вызвал: ${interaction.user.username}`})
        if (user.avatarURL() !== null) e.setThumbnail(`${user.avatarURL()}`);

        await interaction.reply({embeds: [e]});
        
    }
}