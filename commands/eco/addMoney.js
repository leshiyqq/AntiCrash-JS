const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const pu = require(`${process.cwd()}/models/profileuser.js`);

module.exports = {
    data: new SlashCommandBuilder()
    .setName("add-money")
    .setDescription("Добавьте деньги пользователю")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addNumberOption(option =>
        option
        .setName("num")
        .setDescription("Укажите количество")
        .setRequired(true)
    )
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("Укажите пользователя")
        .setRequired(true)
    ),

    async execute(interaction) {
        const amount = interaction.options.getNumber("num");
        const user = interaction.options.getUser("user");

        if (amount > 25000) { await interaction.reply("Слишком большое количество!"); return }

        const findUser = await pu.findOne({ uid: user.id, gid: interaction.guild.id }); // Ищем пользователя кому надо добавить деньги

        let money = Number(findUser.money); // Деньги пользователя

        if (!findUser || !user) { await interaction.reply("Юзер не найден!"); return }

        if (money > 1000000) { await interaction.reply("У юзера слишком много денег"); return }

        const res = (money += amount); // Добавляем деньги пользвателю

        await findUser.updateOne({ money: res }); // Обновляем в бд

        const e = new EmbedBuilder()
        .setColor('DarkRed')
        .setTitle("Зачисление денег!")
        .setDescription(`Пользователь: **${interaction.user.username}**\nПользователю: **${user.username}**\nКоличество: **${amount}**`)
        .setFooter({ text: `Выдал: ${interaction.user.username}`})
        .setThumbnail(user.avatarURL())
        .setTimestamp()

        await interaction.reply({embeds: [e]});
    }
}
