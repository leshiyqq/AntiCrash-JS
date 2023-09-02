const { SlashCommandBuilder } = require('discord.js');
const errEmb = require(`${process.cwd()}/models/errEmbed.js`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Выгоняет пользователя')
        .addUserOption(option =>
            option
            .setName('user')
            .setDescription('Кто?')
            .setRequired(true)       
        ),

    async execute(interaction) {
        var user = interaction.options.getUser('user');
        if (user.id === interaction.user.id) return interaction.reply("Вы не можете кикнуть себя!");
        if (!interaction.guild.members.cache.get(user.id)) return interaction.reply("Такого пользователя нет на сервере");
        try {
            await interaction.channel.guild.members.kick(user.id);
            await interaction.reply(`Без проблем, я кикнул его - ${user.username}`);
        } catch (e) {
            if (e.code == 50013) interaction.reply(`Я не могу кикнуть ${user.username} из-за нехватки прав`);
            else interaction.reply({embeds: [errEmb]});         
        }
    }
}