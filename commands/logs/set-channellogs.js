const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const lc = require(`${process.cwd()}/models/logschannel.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName("set-channellogs")
    .setDescription("Ставит канал для логов")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option =>
        option
        .setName("channel")
        .setDescription("Выберите канал")
        .setRequired(true)
    ),

    async execute(interaction) {
        let channel = interaction.options.getChannel("channel");
        if (!channel.guild || channel.type == 4 || channel.type == 2) { await interaction.reply("Это не канал!"); return }

        let findDocs = await lc.findOne({ gid: interaction.guild.id });
        if (findDocs.logs === false) { await interaction.reply("Логи отключены!"); return }

        await findDocs.updateOne({ $set: { cid: channel.id } });
        await interaction.reply(`Успешно, канал ${channel.name} теперь канал для логов!`);
    }
}
