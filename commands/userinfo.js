const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Send user info of mentioned member')
		.addUserOption(option => 
			option
			.setName('user')
			.setDescription('Choose a user')
		),

	async execute(interaction) {
		var user = interaction.options.getUser('user');
		if (user === null) user = interaction.user;
		var member = interaction.channel.guild.members.cache.get(user.id);
		if (!member) return interaction.reply("Этот пользователь не на сервере");
		
		const userj = user.createdAt;
		const year = userj.getFullYear(), month = userj.getMonth(), date = userj.getDate();
 		const res = `${date}d ${month}m ${year}`;

		const guserj = member.joinedAt;
		const gyear = guserj.getFullYear(), gmonth = guserj.getMonth(), gdate = guserj.getDate();
		const resg = `${gdate}d ${gmonth}m ${gyear}`;

		const emb = new EmbedBuilder()
			.setColor('Random')
			.setTitle('User Info')
			.setThumbnail(user.avatarURL())
			.setTimestamp()
			.setFooter({ text: `Вызвал: ${interaction.user.username}`, iconURL: `${interaction.user.avatarURL()}` })
			.addFields({name: 'Name', value: `${user.username}`, inline: true})
			.addFields({name: 'Joined to Discord', value: `${res}`, inline: true})
			.addFields({name: `Joined to ${interaction.guild.name}`, value: `${resg}`, inline: true})
			.addFields({name: 'isBot?', value: user.bot ? "Yes" : "No", inline: true})
			.addFields({name: 'ID', value: `${user.id}`, inline: true})
		if (member.presence == null) emb.addFields({name: 'Status', value: "offline", inline: true})
		else emb.addFields({name: 'Status', value: member.presence.status, inline: true})
		if (user.flags.toArray() == null || user.flags.toArray() == '') emb.addFields({name: 'Flags', value: "None", inline: true});
		else emb.addFields({name: 'Flags', value: `${user.flags.toArray().join(', ')}`, inline: true});
		
		await interaction.reply({embeds: [emb]});
}}