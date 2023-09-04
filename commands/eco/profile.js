const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const pu = require(`${process.cwd()}/models/profileuser.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Показать ваш профиль")
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("Укажите пользователя")
    ),

    async execute(interaction) {
        let user = interaction.options.getUser("user");
        if (user === null) user = interaction.user;

        const findDocs = await pu.findOne({ uid: user.id, gid: interaction.guild.id });
        
        const e = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Профиль")
        .setDescription(`Айди: **${findDocs.uid}**\nДеньги: **${findDocs.money}**`)
        .setThumbnail(user.avatarURL())
        .setFooter({ text: `Вызвал: ${interaction.user.username}` });

        await interaction.reply({ embeds: [e] });
    }
}
