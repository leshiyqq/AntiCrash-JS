const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const fs = require('fs');
const path = require('path');
let lc = require(`${process.cwd()}/models/logschannel.js`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Отправляет помощь по командам'),

	async execute(interaction) {
		const emb = new EmbedBuilder()
		.setTitle("Помощь")
		.setColor("Random")
		.setTimestamp()
		.setFooter({text: `Вызвал: ${interaction.user.username}`})
		
		
		
		const foldersPath = path.join(`${process.cwd()}/commands`);
		const commandFolders = fs.readdirSync(foldersPath);

		for (const folder of commandFolders) {
			const commandsPath = path.join(foldersPath, folder)
			const commandsFile = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
			for (const file of commandsFile) {
				const filePath = path.join(commandsPath, file);
				const command = require(filePath);
				emb.addFields({name: command.data.name, value: command.data.description, inline: true})
			}
		}
		await interaction.reply({embeds: [emb]})
	},
};