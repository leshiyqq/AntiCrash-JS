const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("user-info")
    .setDescription("Показывает информацию про пользователя")
    .setDMPermission(false)
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("Выберите пользователя")
    ),

    async execute(interaction) {
        let user = interaction.options.getUser("user");
        if (user === null) user = interaction.user;
        let member = interaction.channel.guild.members.cache.get(user.id);
        if (!member) return interaction.reply("Этот пользователь не на сервере");

        const userj = user.createdAt;
        const year = userj.getFullYear(), month = userj.getMonth(), date = userj.getDate();
        const res = `${date}d ${month}m ${year}`;

        const guserj = member.joinedAt;
        const gyear = guserj.getFullYear(), gmonth = guserj.getMonth(), gdate = guserj.getDate();
        const resg = `${gdate}d ${gmonth}m ${gyear}`;

        const emb = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Информация про пользователя")
        .setFooter({ text: `Вызвал: ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
        .setThumbnail(user.avatarURL())
        .setTimestamp()
        .addFields({ name: "Никнейм", value: `${user.username}`, inline: true })
        .addFields({ name: "Присоединился к Дискорду", value: `${res}`, inline: true })
        .addFields({ name: `Зашел на ${interaction.guild.name}`, value: `${resg}`, inline: true })
        .addFields({ name: "ЭтоБот?", value: user.bot ? "Да" : "Нет", inline: true })
        .addFields({ name: "Айди", value: `${user.id}`, inline: true });

        if (member.presence == null) emb.addFields({ name: "Статус", value: "offline", inline: true });
        else emb.addFields({ name: "Статус", value: member.presence.status, inline: true });

        if (user.flags.toArray() == null || user.flags.toArray() == "") emb.addFields({ name: "Значки", value: "Нету", inline: true });
        else emb.addFields({ name: "Значки", value: `${user.flags.toArray().join(", ")}`, inline: true });

        await interaction.reply({ embeds: [emb] });
    }
}
