const { SlashCommandBuilder } = require('discord.js');
const errEmb = require(`${process.cwd()}/models/errEmbed.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Unmute a member')
    .addUserOption(option => 
        option
        .setName('user')
        .setDescription('Who?')
        .setRequired(true)
    ),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = await interaction.guild.members.fetch(user.id)

        if (!member) return await interaction.reply("Этот пользователь не на сервере!");

        try {
            await member.timeout(null);
            await interaction.reply(`Окей я размьютил - ${member.user.username}`);
        } catch (e) {
            if (e.code == 50013) return await interaction.reply(`У меня нет прав чтобы дать мьют - ${member.user.username}`);
            else return await interaction.reply({embeds: [errEmb]});
        }
    }
}