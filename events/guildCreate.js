const { Events } = require('discord.js');
const lc = require(`${process.cwd()}/models/logschannel.js`);
const pu = require(`${process.cwd()}/models/profileuser.js`);
const ac = require(`${process.cwd()}/models/anticrash.js`);

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
            let findDocs2 = await pu.findOne({ uid: member.id })
            if (!findDocs2) {
                let docs = new pu({uid: member.id, gid: guild.id, money: "0"});
                docs.save();
            }
        })

        let findDocs3 = await ac.findOne({gid: guild.id})

        if (!findDocs3) {
            let docs = new ac({toogle: true, gid: guild.id})
            docs.save();
        }
    }
}