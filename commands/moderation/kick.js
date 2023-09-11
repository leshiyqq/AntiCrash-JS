const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

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
        const member = interaction.guild.members.cache.get(user.id);

        if (member.id === interaction.user.id) { await interaction.reply("Вы не можете кикнуть себя!"); return }

        if (!member) { await interaction.reply("Такого пользователя нет на сервере"); return }

        if (member.kickable !== true) return;
        await member.kick({reason: reas});

        const e = new EmbedBuilder()
        .setColor('DarkRed')
        .setTitle("Бан!")
        .setFooter({ text: `Кикнул: ${interaction.user.username}` })
        .setThumbnail(interaction.user.avatarURL())
        .setTimestamp()

        if (reas == null) e.setDescription( `Я выгнал - **${member.user.username}**\nЕго айди - **${member.id}**\n**Причина не указана**` );
        else e.setDescription( `Я выгнал - **${member.user.username}**\nЕго айди - **${member.id}**\nПо причине - **${reas}**` );

        await interaction.reply({ embeds: [e] });
    }
}