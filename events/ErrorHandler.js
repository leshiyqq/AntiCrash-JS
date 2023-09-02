const { Events } = require('discord.js');

module.exports = {
    name: Events.Error,
    execute(e) {
        if (e.code == 50013) return;
        else console.log(e);
    } 
}