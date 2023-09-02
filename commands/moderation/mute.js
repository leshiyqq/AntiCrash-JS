const { SlashCommandBuilder } = require('discord.js');
const errEmb = require(`${process.cwd()}/models/errEmbed.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Дает мут пользователю')
    .setDMPermission(false)
    .addUserOption(option => 
        option
        .setName('user')
        .setDescription('Кто?')
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName('duration')
        .setDescription('Вставьте время (1m, 1d...и так далее)')
        .setRequired(true)
    ),
    
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const duration = interaction.options.getString('duration');
        const member = await interaction.guild.members.fetch(user.id);

        if (!member) return interaction.reply("Этот пользователь не на сервере");

        try {
            if (duration.includes('d')) {
                let dDate = Number(duration.replace('d', ''));
                if (dDate > 14) return await interaction.reply("Нельзя дать мьют пользователю больше чем на 14 дней!");
                await member.timeout(dDate * 86400 * 1000);
                await interaction.reply(`Без проблем, я замьютил ${member.user.username}`);
            } else if (duration.includes('h')) {
                let hDate = Number(duration.replace('h', ''));
                if (hDate > 336) return await interaction.reply("Нельзя дать мьют пользователю больше чем на 14 дней!");
                await member.timeout(hDate * 3600 * 1000);
                await interaction.reply(`Без проблем, я замьютил ${member.user.username}`);
            } else if (duration.includes('m')) {
                let mDate = Number(duration.replace('m', ''));
                if (mDate > 20160) return await interaction.reply("Нельзя дать мьют пользователю больше чем на 14 дней!");
                await member.timeout(mDate * 60 * 1000);
                await interaction.reply(`Без проблем, я замьютил ${member.user.username}`);
            }
        } catch (e) {
            if (e.code == 50013) return await interaction.reply(`У меня нет прав чтобы дать мьют - ${member.user.username}`);
            else if (e.name == 'RangeError') return await interaction.reply("Время введено неверно!");
            else return await interaction.reply({embeds: [errEmb]});
        }

    }
}