const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Отправляет помощь по командам"),

    async execute(interaction) {
        const commands = [];
        const foldersPath = path.join(`${process.cwd()}/commands`);
        const commandFolders = fs.readdirSync(foldersPath);

        for (const folder of commandFolders) {
            const commandsPath = path.join(foldersPath, folder);
            const commandsFile = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
            for (const file of commandsFile) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
                commands.push(command);
            }
        }
     
        const prev = new ButtonBuilder()
        .setLabel('<--')
        .setStyle(ButtonStyle.Danger)
        .setCustomId('prev')

        const next = new ButtonBuilder()
        .setLabel('-->')
        .setStyle(ButtonStyle.Success)
        .setCustomId('next')

        const emb = new EmbedBuilder()
        .setTitle("Помощь")
        .setColor("Random")
        .setDescription("Переключайтесь с помощью кнопок!")
        .setFooter({ text: `Вызвал: ${interaction.user.username}` })
        .setTimestamp()

        const embh = new EmbedBuilder()
        .setTitle("Помощь")
        .setColor("Random")
        .setDescription("Переключайтесь с помощью кнопок!")
        .setFooter({ text: `Вызвал: ${interaction.user.username} | page: 1` })
        .setTimestamp()

        for (let i = 0; i < 10; i++) {
            embh.addFields({ name: commands[i].data.name, value: commands[i].data.description, inline: true });
        }
    

        const ButtonRow = new ActionRowBuilder().addComponents(prev, next);

        const reply = await interaction.reply({ embeds: [embh], components: [ButtonRow] });
        let index = 1; // Страницы
        let spage = 0; // Начальные значения с которых будет начинаться перебор массива


        const filter = (i) => i.user.id === interaction.user.id;

        const collector = reply.createMessageComponentCollector({
            componentType: ComponentType.Button,
            filter,
        });

        collector.on('collect', async (inter) => {
            if (inter.customId === 'prev') { 
                await inter.deferUpdate(); // Убираем ожидание ответа

                if (index - 1 == 0) { await interaction.editReply({ embeds: [embh] }); return; } // Если страница идет в -1... То ничего не делаем
                spage -= 10; // Возвращаем на 10 значений назад
                --index; // Возвращаемся на предыдущую страницу

                for (let i = spage; i < index * 10; i++) { 
                    if (commands[i] === undefined) { break; }
                    else emb.addFields({ name: commands[i].data.name, value: commands[i].data.description, inline: true });
                } // Перебираем предыдущую страницу и пишем в эмбед название и описание команд

                emb.setFooter({ text: `Вызвал: ${interaction.user.username} | page: ${index}` });

                await interaction.editReply({ embeds: [emb] });

                emb.data.fields = null; // Очищаем значения
            }
            
            if (inter.customId === 'next') {
                await inter.deferUpdate(); // Убираем ожидание ответа

                if (index * 10 >= commands.length) return; // Если страница больше чем количество комманд (нам это не нужно)... То ничего не делаем
                spage = index * 10; // Добавляем значения старой страницы чтобы можно было перейти на предыдщую
                ++index; // Перемещаемся на следуйщую страницу

                for (let i = spage; i < index * 10; i++) {
                    if (commands[i] === undefined) { break; }
                    else emb.addFields({ name: commands[i].data.name, value: commands[i].data.description, inline: true });
                } // Перебираем предыдущую страницу и пишем в эмбед название и описание команд

                emb.setFooter({ text: `Вызвал: ${interaction.user.username} | page: ${index}` });

                await interaction.editReply({ embeds: [emb] });

                emb.data.fields = null; // Очищаем значения
            }
        });
    }
}
