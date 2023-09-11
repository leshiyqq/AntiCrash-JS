const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Дает мут пользователю')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
    .addUserOption(option => 
        option
        .setName('user')
        .setDescription('Кто?')
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName('duration')
        .setDescription('Вставьте время (1m, 1d...и так далее)')
        .setRequired(true)
    ),
    
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const duration = interaction.options.getString('duration');
        const member = await interaction.guild.members.cache.get(user.id);

        if (!member) { await interaction.reply("Этот пользователь не на сервере"); return }

        if (member.moderatable !== true) return;


        if (duration.includes('d')) {
            let dDate = Number(duration.replace('d', ''));

            if (dDate > 14) return await interaction.reply("Нельзя дать мьют пользователю больше чем на 14 дней!");

            await member.timeout(dDate * 86400 * 1000);

            const embT = new EmbedBuilder()
            .setColor('DarkRed')
            .setTitle("Мьют!")
            .setDescription(`Кому: **${user.username}**\nНа сколько: **${dDate} дней**\nВыдал: **${interaction.user.username}**\nАйди нарушителя: **${user.id}**\nАйди модератора: **${interaction.user.id}**`)
            .setFooter({ text: `Вызвал: ${interaction.user.username}` })
            .setThumbnail(interaction.user.avatarURL())
            .setTimestamp()

            await interaction.reply({ embeds: [embT] });

        } else if (duration.includes('h')) {
            let hDate = Number(duration.replace('h', ''));

            if (hDate > 336) return await interaction.reply("Нельзя дать мьют пользователю больше чем на 14 дней!");

            await member.timeout(hDate * 3600 * 1000);

            const embT = new EmbedBuilder()
            .setColor('DarkRed')
            .setTitle("Мьют!")
            .setDescription(`Кому: **${user.username}**\nНа сколько: **${hDate} часов**\nВыдал: **${interaction.user.username}**\nАйди нарушителя: **${user.id}**\nАйди модератора: **${interaction.user.id}**`)
            .setFooter({ text: `Вызвал: ${interaction.user.username}` })
            .setThumbnail(interaction.user.avatarURL())
            .setTimestamp()

            await interaction.reply({ embeds: [embT] });

        } else if (duration.includes('m')) {
            let mDate = Number(duration.replace('m', ''));

            if (mDate > 20160) return await interaction.reply("Нельзя дать мьют пользователю больше чем на 14 дней!");

            await member.timeout(mDate * 60 * 1000);

            const embT = new EmbedBuilder()
            .setColor('DarkRed')
            .setTitle("Мьют!")
            .setDescription(`Кому: **${user.username}**\nНа сколько: **${mDate} минут**\nВыдал: **${interaction.user.username}**\nАйди нарушителя: **${user.id}**\nАйди модератора: **${interaction.user.id}**`)
            .setFooter({ text: `Вызвал: ${interaction.user.username}` })
            .setThumbnail(interaction.user.avatarURL())
            .setTimestamp()

            await interaction.reply({ embeds: [embT] });
        }
    }
}