const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const client = new Client({ 
	intents: [
	 GatewayIntentBits.Guilds,
	 GatewayIntentBits.GuildMembers,
	 GatewayIntentBits.GuildMessages,
	 GatewayIntentBits.MessageContent,
	 GatewayIntentBits.GuildPresences,
	 GatewayIntentBits.GuildMessageReactions,
	 GatewayIntentBits.GuildIntegrations
	],
});

const token = require('./config.json').token;
const uri = require('./config.json').uri;

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

(async () => {
	try {
		await mongoose.connect(uri, { family: 4 }).catch(e => console.log("Ошибка к подключении базы данных"));
		console.log("Connected to DB.");
	} catch (e) {
		console.log(e);
	}
})();

client.login(token)