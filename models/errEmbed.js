const { EmbedBuilder } = require('discord.js');

const errEmb = new EmbedBuilder()
.setTitle("Ошибка!")
.setDescription("**Произошла непредвиденная ошибка!**\n**Если вы хотите отправить сообщение об ошибке используйте команду /report**")
.setColor("Random")
.setTimestamp()

module.exports = errEmb