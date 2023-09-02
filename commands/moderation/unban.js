const { SlashCommandBuilder } = require('discord.js');
const errEmb = require(`${process.cwd()}/models/errEmbed.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Дает разбан пользователю')
    .setDMPermission(false)
    .addStringOption(option => 
        option
        .setName('userid')
        .setDescription('Вставьте айди пользователя')
        .setRequired(true)
    ),
    async execute(interaction) {
        const userid = interaction.options.getString('userid');

        try {
            await interaction.guild.members.unban(userid);
            await interaction.reply(`Я разбанил человека по айди - ${userid}`);
        } catch (e) {
            if (e.code == 50013) return await interaction.reply("У меня не хватает прав чтобы разбанить человека по айди");
            else if (e.code == 10013) return await interaction.reply("Этот юзер не в бане или был не найден");
            else return await interaction.reply({embeds: [errEmb]}); 
        }
    }
}