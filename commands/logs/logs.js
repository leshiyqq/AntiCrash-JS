const { SlashCommandBuilder } = require('discord.js');
let lc = require(`${process.cwd()}/models/logschannel.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('logs')
    .setDescription('Включает или выключает логи на сервере')
    .addBooleanOption(option =>
        option
        .setName('toogle')
        .setDescription('Вкл/выкл')
        .setRequired(true)
    ),
    async execute(interaction) {
        const toogle = interaction.options.getBoolean('toogle');

        const findDocs = await lc.findOne({ gid: interaction.guild.id});

        if (findDocs.logs === toogle) await interaction.reply("Такое значение уже установлено");
        else {
            if (toogle === true) {
                await findDocs.updateOne({ logs: true });
                await interaction.reply("Успешно изменено!");
            } else if (toogle === false) {
                await findDocs.updateOne({ logs: false });
                await interaction.reply("Успешно изменено!");
            }
        }
    }
}