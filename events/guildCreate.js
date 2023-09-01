const { Events } = require('discord.js');
let lc = require(`${process.cwd()}/models/logschannel.js`);

module.exports = {
    name: Events.GuildCreate,
    once: false,
    async execute (guild) {
        let findDocs = await lc.findOne({gid: guild.id})

        if (!findDocs) {
        let docs = new lc({gid: guild.id, cid: ""});
        docs.save();
        }
    }
}