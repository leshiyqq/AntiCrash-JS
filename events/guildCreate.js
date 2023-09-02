const { Events } = require('discord.js');
let lc = require(`${process.cwd()}/models/logschannel.js`);
let pu = require(`${process.cwd()}/models/profileuser.js`);

module.exports = {
    name: Events.GuildCreate,
    once: false,
    async execute (guild) {
        let findDocs = await lc.findOne({gid: guild.id});

        if (!findDocs) {
        let docs = new lc({gid: guild.id, cid: "", logs: false, protect: true});
        docs.save();
        }

        guild.members.cache.forEach(async (member) => {
            let findDocs2 = await pu.findOne({ uid: member.id})
            if (!findDocs2) {
                let docs = new pu({uid: member.id, money: "0"});
                docs.save();
            }
        })
        
    }
}