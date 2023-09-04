const { Events } = require('discord.js');
let pu = require(`${process.cwd()}/models/profileuser.js`);

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,

    async execute(member) {
        const findDocs = await pu.findOne({ uid: member.user.id });

        if (!findDocs) {
            let docs = new pu({uid: member.user.id, gid: member.guild.id, money: "0"});
            docs.save();
        }

        if (member.bot && !member.flags.has("VerifiedBot")) {
            await member.ban();
        }

    }
}