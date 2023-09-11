const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const ac = require(`${process.cwd()}/models/anticrash.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('anticrash')
    .setDescription('Включить или выключить анти краш систему')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addBooleanOption(option =>
        option
        .setName('toogle')
        .setDescription('Вкл/выкл')
        .setRequired(true)
    ),

    async execute(interaction) {
        const toogle = interaction.options.getBoolean('toogle');

        let findDocs = await ac.findOne({ gid: interaction.guild.id })

        if (findDocs.toogle === toogle) { await interaction.reply("Такое значение уже установлено"); return }

        await findDocs.updateOne({toogle: toogle});

        const showToogleMessage = toogle ? "Включена" : "Выключена";

        const embT = new EmbedBuilder()
        .setColor('DarkRed')
        .setTitle("Настройки изменены!")
        .setDescription(`Команда: **АнтиБот**\nАйди пользователя: **${interaction.user.id}**\nНастройка: **${showToogleMessage}**`)
        .setFooter({ text: `Вызвал: ${interaction.user.username}` })
        .setThumbnail(interaction.user.avatarURL())
        .setTimestamp()

        await interaction.reply({ embeds: [embT] });
    }
}