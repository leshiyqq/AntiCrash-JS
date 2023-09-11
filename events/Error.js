const { Events } = require('discord.js');

module.exports = {
    name: Events.Error,

    execute(error) {
        if (error.code == 50013) return;
        else if (error.code == 10013) return;
    }
}