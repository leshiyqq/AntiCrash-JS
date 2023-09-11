const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const pu = require(`${process.cwd()}/models/profileuser.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName("take-money")
    .setDescription("Отнять деньги у пользователя")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addNumberOption(option =>
        option
        .setName("num")
        .setDescription("Количество").setRequired(true)
    )
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("Укажите пользователя")
        .setRequired(true)
    ),

    async execute(interaction) {
        const amountAuthor = interaction.options.getNumber("num");
        const user = interaction.options.getUser("user");

        const amount = Math.round(amountAuthor);

        const findUser = await pu.findOne({ uid: user.id, gid: interaction.guild.id }); // Ищем пользователя у кого надо отнять деньги

        let money = Number(findUser.money); // Деньги пользователя

        if (!findUser || !user) { await interaction.reply("Юзер не найден!"); return }

        const res = (money -= amount); // Берем деньги у пользователя

        if (0 > res) { await interaction.reply("Разность меньше нуля! Нельзя снять столько денег!"); return }

        await findUser.updateOne({ money: res }); // Обновляем в бд

        const e = new EmbedBuilder()
        .setColor('DarkRed')
        .setTitle("Взятие денег!")
        .setDescription(`Пользователь: **${interaction.user.username}**\n От пользователя: **${user.username}**\nКоличество: **${amount}**`)
        .setFooter({ text: `Взял: ${interaction.user.username}`})
        .setThumbnail(user.avatarURL())
        .setTimestamp()

        await interaction.reply({embeds: [e]});
    }
}
