const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

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
        const member = interaction.guild.members.cache.get(user.id);

        if (member.id === interaction.user.id) { await interaction.reply("Ты не можешь забанить себя!"); return }
        if (!member) { await interaction.reply("Такого пользователя нет на сервере"); return }

        if (member.bannable !== true) return;
        await member.ban({ reason: reas });

        const e = new EmbedBuilder()
        .setColor("DarkRed")
        .setTitle("Успешно!")
        .setThumbnail(interaction.user.avatarURL())
        .setFooter({ text: `Забанил: ${interaction.user.username}` })
        .setTimestamp()

        if (reas == null) e.setDescription( `Я забанил - **${member.user.username}**\nЕго айди - **${member.id}**\n**Причина не указана**` );
        else e.setDescription( `Я забанил - **${member.user.username}**\nЕго айди - **${member.id}**\nПо причине - **${reas}**` );

        await interaction.reply({ embeds: [e] });
    }
}
