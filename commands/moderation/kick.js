const { SlashCommandBuilder } = require('discord.js');
const errEmb = require(`${process.cwd()}/models/errEmbed.js`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Выгоняет пользователя')
        .setDMPermission(false)
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
        var user = interaction.options.getUser('user');
        const reas = interaction.options.getString('reason');
        if (user.id === interaction.user.id) return interaction.reply("Вы не можете кикнуть себя!");
        if (!interaction.guild.members.cache.get(user.id)) return interaction.reply("Такого пользователя нет на сервере");
        try {
            await interaction.channel.guild.members.kick(user.id, {reason: reas});
            await interaction.reply(`Без проблем, я кикнул его - ${user.username}`);
        } catch (e) {
            if (e.code == 50013) interaction.reply(`Я не могу кикнуть ${user.username} из-за нехватки прав`);
            else interaction.reply({embeds: [errEmb]});         
        }
    }
}