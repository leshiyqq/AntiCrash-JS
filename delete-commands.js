const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');

const clientId = require('./config.json').clientId;
const guildId = require('./config.json').guildId;
const token = require('./config.json').token;

const commands = [];
const commandsPath = path.join(__dirname, 'Commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
};

const rest = new REST({ version: '10' }).setToken(token);

rest.delete(Routes.applicationGuildCommand(clientId, guildId, ''))
	.then(() => console.log('Successfully deleted guild command'))
	.catch(console.error);