const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.UserUpdate,
    once: false,

    async execute(oldUser, newUser) {
        let channel = await newUser.client.channels.fetch('1146805102808666152');
        const emb = new EmbedBuilder()
        .setColor("Red")
        .setTitle("New avatar profile!")
        .setImage(`${newUser.displayAvatarURL({size: 1024})}`)
        if (oldUser.avatar !== newUser.avatar) await channel.send({embeds: [emb]});
    }
}