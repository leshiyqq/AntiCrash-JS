const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Дает разбан пользователю')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption(option => 
        option
        .setName('userid')
        .setDescription('Вставьте айди пользователя')
        .setRequired(true)
    ),
    async execute(interaction) {
        const userid = interaction.options.getString('userid');

        await interaction.guild.members.unban(userid);

        const e = new EmbedBuilder()
        .setColor("DarkRed")
        .setTitle("Разбан!")
        .setDescription(`Я разбанил по айди - **${userid}**`)
        .setFooter({ text: `Разбанил: ${interaction.user.username}` })
        .setThumbnail(interaction.user.avatarURL())
        .setTimestamp()

        await interaction.reply({ embeds: [e] });
    }
}