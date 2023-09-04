const { Events } = require('discord.js');

module.exports = {
    name: Events.Error,
    execute(e) {
        if (e.code == 50013) return;
        else if (e.code == 10003) return;
        else console.log(e);
    } 
}