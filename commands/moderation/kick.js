const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Выгоняет пользователя')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option
            .setName('user')
            .setDescription('Кто?')
            .setRequired(true)       
        )
        .addStringOption(option =>
            option
            .setName('reason')
            .setDescription('Укажите причину')
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reas = interaction.options.getString('reason');
        if (user.id === interaction.user.id) { await interaction.reply("Вы не можете кикнуть себя!"); return }
        if (!interaction.guild.members.cache.get(user.id)) { await interaction.reply("Такого пользователя нет на сервере"); return }
        await interaction.channel.guild.members.kick(user.id, {reason: reas});
        await interaction.reply(`Без проблем, я кикнул его - ${user.username}`);
    }
}