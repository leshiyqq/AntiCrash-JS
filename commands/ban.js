const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const errEmb = require(`${process.cwd()}/models/errEmbed.js`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Banned a member')
		.addUserOption(option => 
			option
			.setName('member')
			.setDescription('Who?')
            .setRequired(true)
		)
        .addStringOption(option =>
            option
            .setName('reason')
            .setDescription('Input reason here')  
        ),

	async execute(interaction) {
        var user = interaction.options.getUser('member');
        const reas = interaction.options.getString('reason');
        if (user.id === interaction.user.id) return interaction.reply("Ты не можешь забанить себя!");
        if (!interaction.guild.members.cache.get(user.id)) return interaction.reply("Такого пользователя нет на сервере");
        try {
            await interaction.channel.guild.members.ban(user.id, {reason: reas});
            const e = new EmbedBuilder()
            .setColor('#8B0000')
            .setTitle('**Успешно!**')
            .setFooter({text: `Забанил: ${interaction.user.username}`})
            .setThumbnail(`${interaction.user.avatarURL()}`)
            .setTimestamp()
            if (reas == null) e.setDescription(`**Я забанил - ${user.username}**\n**Его айди - ${user.id}**\n**Причина не указана**`)
            else e.setDescription(`**Я забанил - ${user.username}**\n**Его айди - ${user.id}**\n**По причине - ${reas}**`)
            await interaction.reply({embeds: [e]});
        } catch (e) {
            if (e.code == 50013) return await interaction.reply(`Я не могу забанить ${user.username} из-за нехватки прав`);
            else return await interaction.reply({embeds: [errEmb]});
        }
    }
}