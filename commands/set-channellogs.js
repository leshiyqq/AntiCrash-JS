const { SlashCommandBuilder } = require('discord.js');
const errEmb = require(`${process.cwd()}/models/errEmbed.js`);
let lc = require(`${process.cwd()}/models/logschannel.js`);


module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-channellogs')
        .setDescription('Set channel of logs')
        .addChannelOption(option =>
            option
            .setName('channel')
            .setDescription('Which channel?')
            .setRequired(true)      
        ),

        async execute(interaction) {
            var channel = interaction.options.getChannel('channel');
            if (!channel.guild) return false;
            try {
                let findDocs = await lc.findOne({ gid: interaction.guild.id});
                await findDocs.updateOne({$set:{cid: channel.id}});
                await interaction.reply(`Успешно, канал ${channel.name} теперь канал для логов!`)
            } catch (e) {
                return await interaction.reply({embeds: [errEmb]});
            }
        }
}