const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

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
        await interaction.reply(`Я разбанил человека по айди - ${userid}`);
    }
}