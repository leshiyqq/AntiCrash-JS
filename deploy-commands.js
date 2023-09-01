const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');

const clientId = require('./config.json').clientId;
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

rest.put(Routes.applicationCommands(clientId), {body: commands})
	.then(() => console.log("Succesfully"))
	.catch(console.error)