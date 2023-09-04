const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Дает размут пользователю')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
    .addUserOption(option => 
        option
        .setName('user')
        .setDescription('Укажите пользователя')
        .setRequired(true)
    ),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = await interaction.guild.members.fetch(user.id);

        if (!member) { await interaction.reply("Этот пользователь не на сервере!"); return }

        await member.timeout(null);
        await interaction.reply(`Окей я размьютил - ${member.user.username}`);
    }
}