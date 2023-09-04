const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const pu = require(`${process.cwd()}/models/profileuser.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName("transfer")
    .setDescription("Передать деньги пользователю")
    .setDMPermission(false)
    .addNumberOption(option =>
        option
        .setName("num")
        .setDescription("Количество")
        .setRequired(true)
    )
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("Укажите пользователя")
        .setRequired(true)
    ),

    async execute(interaction) {
        const amountTransfer = interaction.options.getNumber("num");
        const user = interaction.options.getUser("user");

        const amount = Math.round(amountTransfer);

        if (amount < 10) { await interaction.reply("Нельзя перевести меньше десяти!"); return }

        if (user.id == interaction.user.id) { await interaction.reply("Нельзя передать деньги самому себе"); return }

        const findUser = await pu.findOne({ uid: user.id }); // Ищем пользователя кому надо перевести деньги
        const findAuthor = await pu.findOne({ uid: interaction.user.id, gid: interaction.guild.id });

        let moneyUser = Number(findUser.money); // Деньги пользователя
        let moneyAuthor = Number(findAuthor.money); // Деньги автора

        if (!findUser || !user || !findAuthor) { await interaction.reply("Юзер не найден"); return }
        if (moneyAuthor < amount) { await interaction.reply("У вас не достаточно денег"); return }

        const com = Math.round((amount / 100) * 20); // Комиссия

        const add = moneyUser += (amount - com); // Добавляем пользователю деньги с коммисией
        await findUser.updateOne({ money: add });

        const take = moneyAuthor -= amount; // Забираем у автора команды деньги
        await findAuthor.updateOne({ money: take });

        const findOwner = await pu.findOne({ uid: interaction.guild.ownerId });
        let moneyOwner = Number(findOwner.money);

        const res = moneyOwner += com; // Добавляем к овнеру комиссию
        await findOwner.updateOne({ money: res });

        const rasCom = Math.round(amount - com); // Разность количества и комиссии
        
        const e = new EmbedBuilder()
        .setColor('Yellow')
        .setTitle("Перевод!")
        .setDescription(`Пользователь: **${interaction.user.username}**\nПользователю: **${user.username}**\nС комиссией: **${rasCom}**`)
        .setFooter({ text: `Перевел: ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
        .setThumbnail(user.avatarURL())
        .setTimestamp()

        await interaction.reply({ embeds: [e] });
    }
}
