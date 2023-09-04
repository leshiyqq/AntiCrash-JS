const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Банит пользователя")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("Кто?").setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName("reason")
        .setDescription("Укажите причину")
    ),

    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const reas = interaction.options.getString("reason");

        if (user.id === interaction.user.id) { await interaction.reply("Ты не можешь забанить себя!"); return }
        if (!interaction.guild.members.cache.get(user.id)) { await interaction.reply("Такого пользователя нет на сервере"); return }

        await interaction.channel.guild.members.ban(user.id, { reason: reas });
        const e = new EmbedBuilder()
        .setColor("#8B0000")
        .setTitle("**Успешно!**")
        .setThumbnail(interaction.user.avatarURL())
        .setFooter({ text: `Забанил: ${interaction.user.username}` })
        .setTimestamp()

        if (reas == null) e.setDescription( `**Я забанил - ${user.username}**\n**Его айди - ${user.id}**\n**Причина не указана**` );
        else e.setDescription( `**Я забанил - ${user.username}**\n**Его айди - ${user.id}**\n**По причине - ${reas}**` );

        await interaction.reply({ embeds: [e] });
    }
}
