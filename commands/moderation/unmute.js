const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

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

        if (member.moderatable !== true) return;
        await member.timeout(null);

        const e = new EmbedBuilder()
        .setColor("DarkRed")
        .setTitle("Размьют!")
        .setDescription(`Я размьютил - **${user.username}**\nЕго айди - **${user.id}**`)
        .setFooter({ text: `Размьютил: ${interaction.user.username}` })
        .setThumbnail(interaction.user.avatarURL())
        .setTimestamp()

        await interaction.reply({ embeds: [e] });
    }
}