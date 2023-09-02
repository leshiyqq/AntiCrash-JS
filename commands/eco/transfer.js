const { SlashCommandBuilder } = require('discord.js');
let pu = require(`${process.cwd()}/models/profileuser.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('transfer')
    .setDescription('Передать деньги пользователю')
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
        
        var amount = interaction.options.getNumber('num');
        const user = interaction.options.getUser('user');

        const findUser = await pu.findOne({ uid: user.id });
        const findAuthor = await pu.findOne({ uid: interaction.user.id });

        var moneyUser = Number(findUser.money);
        var moneyAuthor = Number(findAuthor.money);

        if (!findUser || !user || !findAuthor) { await interaction.reply("Юзер не найден"); return }
        if (moneyAuthor < amount) { await interaction.reply("У вас не достаточно денег"); return }

        const com = (amount / 100) * 20; // Комиссия

        const add = moneyUser += (amount - com); // Добавляем пользователю деньги с коммисией
        await findUser.updateOne({money: add});

        const take = moneyAuthor -= amount; // Забираем у автора команды деньги
        await findAuthor.updateOne({money: take});

        
        const findOwner = await pu.findOne({ uid: interaction.guild.ownerId });
        var moneyOwner = Number(findOwner.money);
        const res = moneyOwner += com; // Добавляем к овнеру комиссию
        await findOwner.updateOne({money: res});


        await interaction.reply("Успешно переведено!");

    }
}
