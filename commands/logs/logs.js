const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const lc = require(`${process.cwd()}/models/logschannel.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName("logs")
    .setDescription("Включает или выключает логи на сервере")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addBooleanOption((option) =>
        option
        .setName("toogle")
        .setDescription("Вкл/выкл").setRequired(true)
    ),

    async execute(interaction) {
        const toogle = interaction.options.getBoolean("toogle");

        const findDocs = await lc.findOne({ gid: interaction.guild.id });

        if (findDocs.logs === toogle)  { await interaction.reply("Такое значение уже установлено"); return; }

        const showToogleMessage = toogle ? "Включена" : "Выключена";

        const e = new EmbedBuilder()
        .setColor('DarkRed')
        .setTitle("Настройки изменены!")
        .setDescription(`Команда: **Логи**\nАйди пользователя: **${interaction.user.id}**\nНастройка: **${showToogleMessage}**`)
        .setFooter({ text: `Вызвал: ${interaction.user.username}` })
        .setThumbnail(interaction.user.avatarURL())
        .setTimestamp()

        await findDocs.updateOne({ logs: true });
        await interaction.reply({ embeds: [e] });
    }
}
