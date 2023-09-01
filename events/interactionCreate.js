const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
    async execute(inter) {
        if (!inter.isChatInputCommand()) return

	    const command = inter.client.commands.get(inter.commandName);

	    if (!command) {
		    console.log(`Командa ${inter.commandName} не найдено`);
		    return;
	    }

	    try {
		    await command.execute(inter);
	    } catch (error) {
		    console.log(error);
	    }
    }
}