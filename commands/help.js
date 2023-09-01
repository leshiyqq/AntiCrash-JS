const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const fs = require('fs');
const path = require('path');
let lc = require(`${process.cwd()}/models/logschannel.js`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Replies help command'),

	async execute(interaction) {
		const emb = new EmbedBuilder()
		.setTitle("Help Command")
		.setColor("Random")
		.setTimestamp()
		.setFooter({text: `Вызвал: ${interaction.user.username}`})
		
		
		
		const commandsPath = path.join(__dirname);
		const commandsName = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

		for (file of commandsName) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			emb.addFields({name: command.data.name, value: command.data.description, inline: true})
		}
		await interaction.reply({embeds: [emb]})
	},
};