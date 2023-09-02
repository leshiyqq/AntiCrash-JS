const { SlashCommandBuilder } = require('discord.js');
let pu = require(`${process.cwd()}/models/profileuser.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('take-money')
    .setDescription('Отнять деньги у пользователя')
    .setDMPermission(false)
    .addNumberOption(option =>
        option
        .setName('num')
        .setDescription('Количество')
        .setRequired(true)    
    )
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('Укажите пользователя')    
        .setRequired(true)
    ),

    async execute(interaction) {
        
        if (interaction.user.id !== interaction.guild.ownerId) { await interaction.reply("Вы не овнер!"); return }

        var amount = interaction.options.getNumber('num');
        const user = interaction.options.getUser('user');

        const findUser = await pu.findOne({ uid: user.id });

        var money = Number(findUser.money);

        if (!findUser || !user) { await interaction.reply("Юзер не найден!"); return }

        const res = money -= amount;

        if (0 > res) { await interaction.reply("Разность меньше нуля! Нельзя снять столько денег!"); return }

        await findUser.updateOne({money: res});

        await interaction.reply("Успешно снято!");

    }
}