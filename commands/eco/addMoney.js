const { SlashCommandBuilder } = require('discord.js');
let pu = require(`${process.cwd()}/models/profileuser.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('add-money')
    .setDescription('Добавьте деньги пользователю')
    .setDMPermission(false)
    .addNumberOption(option => 
        option
        .setName('num')
        .setDescription('Укажите количество')
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

        if (amount > 25000) { await interaction.reply("Слишком большое количество!"); return }

        const findUser = await pu.findOne({ uid: user.id });

        const money = Number(findUser.money);

        if (!findUser || !user) { await interaction.reply("Юзер не найден!"); return }

        if (money > 1000000) { await interaction.reply("У юзера слишком много денег"); return }

        const res = amount += money;

        await findUser.updateOne({money: res});

        await interaction.reply("Успешно зачислено!");

    }
}